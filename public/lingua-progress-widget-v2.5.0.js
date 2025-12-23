/*!
 * LinguaProgressWidget — embeddable animated progress widget
 * Version: 2.5.0
 * License: MIT (modify + self-host)
 */
(function (global) {
  'use strict';

  var VERSION = '2.5.0';
  var STYLE_ID = 'llw-style-v2';

  // If same version is already loaded, do nothing.
  if (global.LinguaProgressWidget && global.LinguaProgressWidget.__version__ === VERSION) return;

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }

  function createEl(tag, attrs) {
    var el = document.createElement(tag);
    if (!attrs) return el;
    Object.keys(attrs).forEach(function (k) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else if (k === 'html') el.innerHTML = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    return el;
  }

  function prefersReducedMotion() {
    return !!(global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function resolveToRgbString(colorLike) {
    var probe = document.createElement('span');
    probe.style.color = '';
    probe.style.color = colorLike;
    probe.style.display = 'none';
    var host = document.body || document.documentElement;
    host.appendChild(probe);
    var out = getComputedStyle(probe).color || '';
    if (probe && probe.parentNode) probe.parentNode.removeChild(probe);
    return out;
  }

  function parseRgb(rgbString) {
    if (!rgbString) return null;
    var m = rgbString.match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)/i);
    if (!m) return null;
    return {
      r: clamp(parseFloat(m[1]), 0, 255),
      g: clamp(parseFloat(m[2]), 0, 255),
      b: clamp(parseFloat(m[3]), 0, 255),
      a: (m[4] === undefined) ? 1 : clamp(parseFloat(m[4]), 0, 1)
    };
  }

  function rgbToCss(rgb, alphaOverride) {
    var a = (alphaOverride === undefined) ? rgb.a : alphaOverride;
    return 'rgba(' + Math.round(rgb.r) + ',' + Math.round(rgb.g) + ',' + Math.round(rgb.b) + ',' + clamp(a, 0, 1) + ')';
  }

  function mixRgb(a, b, t) {
    t = clamp(t, 0, 1);
    return {
      r: a.r + (b.r - a.r) * t,
      g: a.g + (b.g - a.g) * t,
      b: a.b + (b.b - a.b) * t,
      a: a.a + (b.a - a.a) * t
    };
  }

  function relLuminance(rgb) {
    function lin(c) {
      c = c / 255;
      return (c <= 0.03928) ? (c / 12.92) : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    var R = lin(rgb.r), G = lin(rgb.g), B = lin(rgb.b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  function contrastRatio(aRgb, bRgb) {
    // WCAG contrast ratio between two opaque colors.
    var L1 = relLuminance(aRgb) + 0.05;
    var L2 = relLuminance(bRgb) + 0.05;
    return (L1 > L2) ? (L1 / L2) : (L2 / L1);
  }

  function pickReadableTextOn(bgRgb) {
    // Pick white vs near-black based on better contrast.
    var white = { r: 255, g: 255, b: 255, a: 1 };
    var nearBlack = { r: 17, g: 24, b: 39, a: 1 };
    var crWhite = contrastRatio(bgRgb, white);
    var crDark = contrastRatio(bgRgb, nearBlack);
    return (crWhite >= crDark) ? 'rgb(255,255,255)' : 'rgb(17,24,39)';
  }


  function safeGetProp(style, prop) {
    try { return (style.getPropertyValue(prop) || '').trim(); } catch (e) { return ''; }
  }

  function readCssVar(names) {
    var root = document.documentElement;
    var s = getComputedStyle(root);
    for (var i = 0; i < names.length; i++) {
      var v = safeGetProp(s, names[i]);
      if (v) return v;
    }
    return '';
  }

  function isTransparentColor(c) {
    return !c || c === 'transparent' || c === 'rgba(0, 0, 0, 0)';
  }

  function scoreCtaCandidate(el) {
    // Prefer prominent call-to-action buttons.
    var cs = getComputedStyle(el);
    var txt = (el.textContent || el.value || '').trim();
    var bg = cs.backgroundColor || '';
    var color = cs.color || '';
    var fw = parseInt(cs.fontWeight, 10) || 400;
    var br = parseFloat(cs.borderRadius) || 0;
    var padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) || 0;
    var h = el.getBoundingClientRect ? el.getBoundingClientRect().height : 0;

    var score = 0;
    if (txt) score += 1;
    if (/um[óo]w konsultacj|porozmawiaj|kontakt|zapisz|book|consultation|contact/i.test(txt)) score += 8;
    if (/cta|button|btn|primary|accent|wp-block-button__link/i.test(el.className || '')) score += 3;

    if (!isTransparentColor(bg)) score += 6;
    if (!isTransparentColor(color)) score += 1;

    if (fw >= 600) score += 2;
    if (br >= 10) score += 1;
    if (padX >= 18) score += 1;
    if (h >= 34) score += 1;

    // Penalize tiny nav links
    if (h && h < 26) score -= 2;

    return {
      score: score,
      bg: bg,
      color: color,
      radius: cs.borderRadius || ''
    };
  }

  function detectAccentAndRadius() {
    // 1) WordPress preset variables (common)
    var wpPrimary = readCssVar([
      '--wp--preset--color--primary',
      '--wp--preset--color--accent',
      '--wp--preset--color--secondary',
      '--wp--preset--color--contrast'
    ]);
    if (wpPrimary) {
      return {
        accent: resolveToRgbString(wpPrimary),
        accentText: '',
        radius: ''
      };
    }

    // 2) Common site variables
    var sitePrimary = readCssVar([
      '--primary',
      '--primary-color',
      '--accent',
      '--accent-color',
      '--brand',
      '--brand-color',
      '--color-primary',
      '--color-accent',
      '--main-color'
    ]);
    if (sitePrimary) {
      return {
        accent: resolveToRgbString(sitePrimary),
        accentText: '',
        radius: ''
      };
    }

    // 3) Search for CTA button/link
    var candidates = Array.prototype.slice.call(document.querySelectorAll('a,button,input[type="submit"],input[type="button"]'));
    var best = null;
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (!el || !el.getBoundingClientRect) continue;
      var rect = el.getBoundingClientRect();
      if (!rect || rect.width < 40 || rect.height < 18) continue;
      var s = scoreCtaCandidate(el);
      if (!best || s.score > best.score) best = { el: el, s: s };
    }

    if (best) {
      var accent = !isTransparentColor(best.s.bg) ? best.s.bg : best.s.color;
      return {
        accent: accent ? resolveToRgbString(accent) : '',
        accentText: best.s.color || '',
        radius: best.s.radius || ''
      };
    }

    // fallback
    return { accent: 'rgb(37,99,235)', accentText: '', radius: '' };
  }

  function detectBaseColors() {
    var body = document.body;
    var cs = getComputedStyle(body);
    var bg = cs.backgroundColor || 'rgb(255,255,255)';
    if (isTransparentColor(bg)) bg = 'rgb(255,255,255)';
    var text = cs.color || 'rgb(17,24,39)';
    var font = cs.fontFamily || '';
    return { bg: bg, text: text, font: font };
  }

  function numFromCssPx(v, fallback) {
    if (!v) return fallback;
    var m = String(v).match(/([0-9.]+)/);
    if (!m) return fallback;
    return parseFloat(m[1]);
  }


  function parseBoolish(v, fallback) {
    if (v === undefined || v === null) return fallback;
    if (typeof v === 'boolean') return v;
    var s = String(v).toLowerCase().trim();
    if (s === '') return fallback;
    if (s === '1' || s === 'true' || s === 'yes' || s === 'on') return true;
    if (s === '0' || s === 'false' || s === 'no' || s === 'off') return false;
    return fallback;
  }

  function normalizeExamplesMode(v) {
    var s = (v === undefined || v === null) ? '' : String(v).toLowerCase().trim();
    if (!s) return 'single';
    if (s === 'all' || s === 'categories' || s === 'category' || s === 'compare') return 'categories';
    return 'single';
  }

  function ensureStyles() {
    var style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = [
      '.llw-root{',
      '  --llw-accent: rgb(37,99,235);',
      '  --llw-accent-soft: rgba(37,99,235,.14);',
      '  --llw-accent-faint: rgba(37,99,235,.08);',
      '  --llw-bg: rgb(255,255,255);',
      '  --llw-text: rgb(17,24,39);',
      '  --llw-muted: rgba(17,24,39,.72);',
      '  --llw-border: rgba(17,24,39,.12);',
      '  --llw-card: rgba(255,255,255,.92);',
      '  --llw-card2: rgba(255,255,255,0.68);',
      '  --llw-surface: rgba(255,255,255,.72);',
      '  --llw-surface-strong: rgba(255,255,255,.80);',
      '  --llw-focus: rgba(37,99,235,.35);',
      '  --llw-cta-text: #fff;',
      '  --llw-canvas-h: 200px;',
      '  --llw-canvas-h-sm: 220px;',
      '  --llw-shadow: 0 14px 36px rgba(0,0,0,.10);',
      '  --llw-radius: 18px;',
      '  --llw-font: inherit;',
      '  font-family: var(--llw-font);',
      '  color: var(--llw-text);',
      '  width: 100%;',
      '  -webkit-font-smoothing: antialiased;',
      '  -moz-osx-font-smoothing: grayscale;',
      '}',
      '.llw-card{',
      '  position:relative;',
      '  border-radius: var(--llw-radius);',
      '  border: 1px solid var(--llw-border);',
      '  background: linear-gradient(180deg, var(--llw-card), var(--llw-card2));',
      '  box-shadow: var(--llw-shadow);',
      '  overflow:hidden;',
      '  padding: 18px;',
      '}',
      '.llw-card:before{',
      '  content:"";',
      '  position:absolute; inset:-2px;',
      '  background: radial-gradient(800px 260px at 18% 10%, var(--llw-accent-soft), transparent 60%),',
      '              radial-gradient(700px 260px at 88% 0%, var(--llw-accent-faint), transparent 55%);',
      '  pointer-events:none;',
      '  filter:saturate(1.05);',
      '}',
      '.llw-card > *{position:relative; z-index:1;}',
      '.llw-header{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;}',
      '.llw-title{margin:0;font-size:20px;line-height:1.15;letter-spacing:-.01em;}',
      '.llw-subtitle{margin:6px 0 0;color:var(--llw-muted);font-size:14px;max-width:62ch;line-height:1.35;}',
      '.llw-badges{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;}',
      '.llw-badge{',
      '  display:inline-flex;align-items:center;gap:8px;',
      '  padding:6px 10px;',
      '  border-radius:999px;',
      '  border:1px solid var(--llw-border);',
      '  background: rgba(127,127,127,.06);',
      '  font-size:12px;',
      '  color: var(--llw-muted);',
      '}',
      '.llw-dot{width:8px;height:8px;border-radius:999px;background:var(--llw-accent);box-shadow:0 0 0 4px rgba(0,0,0,.04);}',
      '.llw-cta{',
      '  display:inline-flex;align-items:center;gap:10px;',
      '  text-decoration:none;',
      '  background: var(--llw-accent);',
      '  color: var(--llw-cta-text);',
      '  padding: 11px 14px;',
      '  border-radius: 999px;',
      '  font-weight: 800;',
      '  font-size: 14px;',
      '  letter-spacing: .01em;',
      '  white-space: nowrap;',
      '  box-shadow: 0 14px 22px rgba(0,0,0,.12);',
      '  transform: translateZ(0);',
      '  transition: filter 140ms ease, transform 140ms ease;',
      '}',
      '.llw-cta:hover{filter:brightness(.98);transform:translateY(-1px);}',
      '.llw-cta:active{transform:translateY(0px) scale(.99);}',
      '.llw-cta:focus{outline:3px solid var(--llw-focus);outline-offset:3px;}',
      '',
      '.llw-body{',
      '  margin-top:16px;',
      '  display:grid;',
      '  grid-template-columns:1fr;',
      '  grid-template-areas:',
      '    "stage"',
      '    "stepper"',
      '    "controls"',
      '    "tabs"',
      '    "meters"',
      '    "panel";',
      '  grid-auto-rows: max-content;',
      '  gap:12px;',
      '}',
      '.llw-no-header .llw-body{margin-top:0;}',
      '.llw-stage{grid-area:stage;}',
      '.llw-stepper{grid-area:stepper;}',
      '.llw-controls{grid-area:controls;}',
      '.llw-tabs{grid-area:tabs;}',
      '.llw-meters{grid-area:meters;}',
      '.llw-panel{grid-area:panel;}',
      '.llw-split .llw-body{',
      '  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);',
      '  grid-template-areas:',
      '    "stage panel"',
      '    "stepper panel"',
      '    "controls panel"',
      '    "tabs panel"',
      '    "meters panel";',
      '  align-items:start;',
      '}',
      '@media (max-width:920px){',
      '  .llw-split .llw-body{',
      '    grid-template-columns:1fr;',
      '    grid-template-areas:',
      '      "stage"',
      '      "stepper"',
      '      "controls"',
      '      "tabs"',
      '      "meters"',
      '      "panel";',
      '  }',
      '}',
      '',
      '.llw-stage{position:relative;border-radius: calc(var(--llw-radius) - 6px);border:1px solid var(--llw-border);overflow:hidden;touch-action: pan-y;background: var(--llw-bg);}',
      '.llw-stage-bg{position:absolute;inset:0;background:linear-gradient(135deg, var(--llw-accent-faint), transparent 55%),',
      '                              radial-gradient(600px 280px at 85% 20%, var(--llw-accent-soft), transparent 60%);pointer-events:none;z-index:0;}',
      '.llw-canvas{display:block;width:100%;height:var(--llw-canvas-h);position:relative;z-index:1;}',
      '.llw-overlay{position:absolute;inset:0;pointer-events:none;z-index:3;}',
      '.llw-topbar{position:absolute;left:12px;right:12px;top:10px;display:flex;justify-content:space-between;gap:10px;align-items:center;}',
      '.llw-stat{pointer-events:none;display:inline-flex;align-items:center;gap:8px;padding:8px 10px;border-radius:999px;border:1px solid var(--llw-border);background: var(--llw-surface);backdrop-filter: blur(10px);font-size:12px;color:var(--llw-muted);}',
      '.llw-stat strong{color:var(--llw-text);font-weight:900;}',
      '.llw-nodes{position:absolute;inset:0;pointer-events:none;z-index:2;}',
      '.llw-node{',
      '  pointer-events:auto;',
      '  position:absolute;',
      '  transform: translate(-50%,-50%);',
      '  border-radius: 999px;',
      '  border: 1px solid var(--llw-border);',
      '  background: var(--llw-surface-strong);',
      '  backdrop-filter: blur(10px);',
      '  color: var(--llw-text);',
      '  font-weight: 900;',
      '  font-size: 12px;',
      '  padding: 7px 10px;',
      '  cursor: pointer;',
      '  user-select: none;',
      '  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;',
      '}',
      '.llw-node:hover{transform:translate(-50%,-50%) scale(1.06);}',
      '.llw-node:active{transform:translate(-50%,-50%) scale(1.02);}',
      '.llw-node:focus{outline:3px solid var(--llw-focus);outline-offset:3px;}',
      '.llw-node[aria-selected="true"]{border-color: rgba(0,0,0,.08);box-shadow:0 0 0 5px rgba(0,0,0,.06), 0 12px 22px rgba(0,0,0,.10);}',
      '',
      '.llw-stepper{',
      '  display:flex;',
      '  align-items:center;',
      '  gap:10px;',
      '  padding:10px 10px;',
      '  border:1px solid var(--llw-border);',
      '  border-radius: calc(var(--llw-radius) - 6px);',
      '  background: var(--llw-surface);',
      '  backdrop-filter: blur(10px);',
      '}',
      '.llw-stepper-label{font-size:12px;font-weight:800;color:var(--llw-muted);letter-spacing:.01em;white-space:nowrap;}',
      '.llw-stepper-list{display:flex;gap:8px;flex:1;overflow-x:auto;padding:2px 2px;scroll-snap-type:x mandatory;scrollbar-width:thin;}',
      '.llw-stepper-list::-webkit-scrollbar{height:8px;}',
      '.llw-stepper-list::-webkit-scrollbar-thumb{background: rgba(127,127,127,.25);border-radius:999px;}',
      '.llw-step{',
      '  scroll-snap-align:center;',
      '  border:1px solid var(--llw-border);',
      '  background: var(--llw-surface-strong);',
      '  backdrop-filter: blur(10px);',
      '  border-radius:999px;',
      '  padding:7px 10px;',
      '  font-size:12px;',
      '  font-weight:900;',
      '  color: var(--llw-muted);',
      '  cursor:pointer;',
      '  user-select:none;',
      '  transition: transform 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;',
      '}',
      '.llw-step:hover{transform: translateY(-1px);}',
      '.llw-step:active{transform: translateY(0px) scale(.99);}',
      '.llw-step:focus{outline:3px solid var(--llw-focus);outline-offset:3px;}',
      '.llw-step[aria-selected="true"]{background: var(--llw-accent); color:var(--llw-cta-text); border-color: rgba(0,0,0,.05); box-shadow: 0 12px 20px rgba(0,0,0,.12);} ',
      '.llw-step[data-unlocked="true"]:not([aria-selected="true"]){box-shadow:0 0 0 4px var(--llw-accent-soft); color: var(--llw-text);} ',
      '.llw-stepper-nav{display:flex;gap:6px;align-items:center;}',
      '.llw-stepper-btn{',
      '  border:1px solid var(--llw-border);',
      '  background: var(--llw-surface-strong);',
      '  backdrop-filter: blur(10px);',
      '  border-radius:12px;',
      '  padding:7px 9px;',
      '  font-weight:900;',
      '  font-size:12px;',
      '  color: var(--llw-muted);',
      '  cursor:pointer;',
      '  transition: transform 160ms ease, background 160ms ease;',
      '}',
      '.llw-stepper-btn:hover{transform: translateY(-1px);}',
      '.llw-stepper-btn:active{transform: translateY(0px) scale(.99);}',
      '.llw-stepper-btn:disabled{opacity:.45;cursor:not-allowed;transform:none;}',
      '.llw-stepper-btn:focus{outline:3px solid var(--llw-focus);outline-offset:3px;}',
      '',
      '.llw-controls{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}',
      '.llw-range{flex:1;min-width:240px;}',
      '.llw-range label{display:flex;justify-content:space-between;font-size:12px;color:var(--llw-muted);margin-bottom:6px;}',
      '.llw-range input[type="range"]{width:100%;accent-color: var(--llw-accent);}',
      '.llw-toggle{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--llw-muted);} ',
      '.llw-toggle input{accent-color: var(--llw-accent);}',
      '.llw-tabs{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}',
      '.llw-tabs-label{font-size:12px;font-weight:800;color:var(--llw-muted);letter-spacing:.01em;margin-right:2px;opacity:.92;}',
      '.llw-tab{',
      '  border:1px solid var(--llw-border);',
      '  background: var(--llw-surface);',
      '  backdrop-filter: blur(10px);',
      '  border-radius: 999px;',
      '  padding: 6px 9px;',
      '  font-size: 12px;',
      '  font-weight: 800;',
      '  color: var(--llw-muted);',
      '  cursor:pointer;',
      '  transition: transform 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;',
      '}',
      '.llw-tab:hover{transform: translateY(-1px);}',
      '.llw-tab:active{transform: translateY(0px) scale(.99);}',
      '.llw-tab:focus{outline:3px solid var(--llw-focus);outline-offset:3px;}',
      '.llw-tab[aria-selected="true"]{background: var(--llw-accent); color:var(--llw-cta-text); border-color: rgba(0,0,0,.05);} ',
      '.llw-meters{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;}',
      '.llw-meter{border:1px solid var(--llw-border);background: var(--llw-surface);backdrop-filter: blur(10px);border-radius: 14px;padding:10px;}',
      '.llw-meter-h{display:flex;justify-content:space-between;gap:10px;font-size:12px;color:var(--llw-muted);}',
      '.llw-meter-h strong{color:var(--llw-text);font-weight:900;}',
      '.llw-bar{margin-top:8px;height:8px;border-radius:999px;background: rgba(127,127,127,.14);overflow:hidden;}',
      '.llw-bar > i{display:block;height:100%;width:0%;background: linear-gradient(90deg, var(--llw-accent), rgba(255,255,255,.35));border-radius:999px;transition: width 320ms ease;}',
      '.llw-panel{border:1px solid var(--llw-border);border-radius: calc(var(--llw-radius) - 6px);padding: 12px;background: var(--llw-surface);backdrop-filter: blur(10px);} ',
      '.llw-panel h3{margin:0;font-size:14px;letter-spacing:-.01em;}',
      '.llw-panel p{margin:6px 0 0;color:var(--llw-muted);font-size:13px;line-height:1.38;}',
      '.llw-grid{margin-top:12px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;}',
      '.llw-split .llw-grid{grid-template-columns:1fr;}',
      '.llw-split .llw-tile{display:grid;grid-template-columns:28px 1fr;column-gap:10px;row-gap:4px;}',
      '.llw-split .llw-tile .llw-ico{grid-row:1 / span 2;margin-top:2px;}',
      '.llw-split .llw-tile .llw-tt{margin-top:0;}',
      '.llw-split .llw-tile .llw-tx{margin-top:0;}',
      '.llw-tile{border:1px solid var(--llw-border);border-radius: 14px;padding: 10px;background: var(--llw-surface-strong);backdrop-filter: blur(10px);transition: transform 180ms ease, box-shadow 180ms ease;}',
      '.llw-tile:hover{transform: translateY(-2px);box-shadow: 0 14px 22px rgba(0,0,0,.08);} ',
      '.llw-tile .llw-ico{font-size:18px;line-height:1;}',
      '.llw-tile .llw-tt{margin-top:7px;font-weight:900;font-size:13px;}',
      '.llw-tile .llw-tx{margin-top:4px;color:var(--llw-muted);font-size:12px;line-height:1.35;}',
      '.llw-cats{margin-top:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}',
      '.llw-split .llw-cats{grid-template-columns:1fr;}',
      '.llw-cat{border:1px solid var(--llw-border);background: var(--llw-surface);backdrop-filter: blur(10px);border-radius:14px;padding:10px;}',
      '.llw-cat.is-active{border-color: rgba(0,0,0,.05);box-shadow:0 0 0 4px var(--llw-accent-soft);} ',
      '.llw-cat-h{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;}',
      '.llw-cat-btn{display:flex;align-items:center;gap:8px;border:0;background:transparent;color:var(--llw-text);font-weight:900;font-size:13px;cursor:pointer;padding:2px 4px;border-radius:10px;}',
      '.llw-cat-btn:focus{outline:3px solid var(--llw-focus);outline-offset:3px;}',
      '.llw-cat-pill{font-size:11px;font-weight:900;color:var(--llw-muted);border:1px solid var(--llw-border);background: rgba(127,127,127,.06);padding:4px 8px;border-radius:999px;}',
      '.llw-cat-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;}',
      '.llw-cat-item{display:flex;gap:8px;align-items:flex-start;}',
      '.llw-cat-ico{font-size:16px;line-height:1;margin-top:1px;}',
      '.llw-cat-tt{font-weight:900;font-size:12px;line-height:1.2;}',
      '.llw-cat-tx{margin-top:2px;color:var(--llw-muted);font-size:12px;line-height:1.3;}',
      '.llw-cat-more{margin-top:8px;}',
      '.llw-cat-more summary{cursor:pointer;color:var(--llw-muted);font-size:12px;font-weight:900;list-style:none;}',
      '.llw-cat-more summary::-webkit-details-marker{display:none;}',
      '.llw-cat-more summary:focus{outline:3px solid var(--llw-focus);outline-offset:3px;}',
      '.llw-cat-empty{color:var(--llw-muted);font-size:12px;line-height:1.35;}',
      '.llw-fade-in{animation: llwFadeIn 260ms ease both;}',
      '@keyframes llwFadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}',
      '@media (max-width:860px){.llw-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.llw-cats{grid-template-columns:1fr;}}',
      '@media (max-width:560px){',
      '  .llw-header{flex-direction:column;align-items:flex-start;}',
      '  .llw-cta{width:100%;justify-content:center;}',
      '  .llw-grid{grid-template-columns:1fr;}',
      '  .llw-canvas{height:var(--llw-canvas-h-sm);}',
      '  .llw-meters{grid-template-columns:repeat(2,minmax(0,1fr));}',
      '}',
      '@media (prefers-reduced-motion: reduce){',
      '  .llw-cta,.llw-node,.llw-tab,.llw-tile,.llw-step,.llw-stepper-btn{transition:none !important;}',
      '  .llw-fade-in{animation:none !important;}',
      '}'
    ].join('\n');
  }
  function defaultData(lang) {
    var isEn = (lang || 'pl').toLowerCase().startsWith('en');

    var tracks = [
      { id: 'everyday', icon: '☕', label: isEn ? 'Everyday' : 'Na co dzień' },
      { id: 'travel', icon: '✈️', label: isEn ? 'Travel' : 'Podróże' },
      { id: 'work', icon: '💼', label: isEn ? 'Work' : 'Praca' },
      { id: 'exam', icon: '🎓', label: isEn ? 'Exams' : 'Egzaminy' }
    ];

    function mk(icon, title, text) { return { icon: icon, title: title, text: text }; }

    // More scenarios per level + per track.
    var levels = [
      {
        id: 'A1',
        title: isEn ? 'Start speaking' : 'Start mówienia',
        desc: isEn
          ? 'You build basics fast — and start using English right away.'
          : 'Szybko budujesz podstawy i od razu zaczynasz używać angielskiego.',
        scenarios: {
          everyday: [
            mk('👋', isEn ? 'Introduce yourself' : 'Przedstawiasz się', isEn ? 'Name, where you are from, what you do.' : 'Imię, skąd jesteś, czym się zajmujesz.'),
            mk('🧾', isEn ? 'Simple requests' : 'Proste prośby', isEn ? '“Can I…?”, “I need…”, “Where is…?”' : '„Czy mogę…?”, „Potrzebuję…”, „Gdzie jest…?”'),
            mk('☕', isEn ? 'Ordering' : 'Zamawianie', isEn ? 'Coffee, food, basic preferences.' : 'Kawa, jedzenie, proste preferencje.'),
            mk('📅', isEn ? 'Dates & numbers' : 'Daty i liczby', isEn ? 'Time, prices, phone number, schedule.' : 'Godzina, ceny, numer telefonu, plan.'),
            mk('🎧', isEn ? 'Listening warm‑up' : 'Pierwsze rozumienie', isEn ? 'Catch key words in short sentences.' : 'Wyłapujesz kluczowe słowa w krótkich zdaniach.'),
            mk('✅', isEn ? 'Confidence boost' : 'Więcej pewności', isEn ? 'You stop freezing when you speak.' : 'Przestajesz „blokować się” w mówieniu.')
          ],
          travel: [
            mk('🛂', isEn ? 'Airport basics' : 'Lotnisko — podstawy', isEn ? 'Check‑in, gate, simple questions.' : 'Odprawa, bramka, proste pytania.'),
            mk('🏨', isEn ? 'Hotel check‑in' : 'Hotel — zameldowanie', isEn ? 'Reservation, ID, breakfast hours.' : 'Rezerwacja, dokument, godziny śniadania.'),
            mk('🗺️', isEn ? 'Asking directions' : 'Pytasz o drogę', isEn ? 'Where is…, how to get to…' : 'Gdzie jest…, jak dojść do…'),
            mk('🍽️', isEn ? 'Restaurant' : 'Restauracja', isEn ? 'Order, ask about ingredients.' : 'Zamawiasz, pytasz o składniki.'),
            mk('🚑', isEn ? 'Emergency basics' : 'Awaryjnie', isEn ? 'Simple help phrases.' : 'Najprostsze zwroty, gdy potrzebujesz pomocy.'),
            mk('📱', isEn ? 'Tickets & apps' : 'Bilety i aplikacje', isEn ? 'Basic messages, confirmations.' : 'Proste wiadomości i potwierdzenia.')
          ],
          work: [
            mk('🤝', isEn ? 'First impressions' : 'Pierwsze wrażenie', isEn ? 'Say hello, introduce your role.' : 'Witasz się, mówisz czym się zajmujesz.'),
            mk('📨', isEn ? 'Short messages' : 'Krótkie wiadomości', isEn ? 'Basic email / chat replies.' : 'Proste odpowiedzi w mailu / komunikatorze.'),
            mk('🗓️', isEn ? 'Scheduling' : 'Ustalanie terminu', isEn ? 'Simple meeting time suggestions.' : 'Propozycje godzin spotkania.'),
            mk('🧩', isEn ? 'Common phrases' : 'Zwroty w pracy', isEn ? '“I will check”, “One moment”, “Please…”' : '„Sprawdzę”, „Chwileczkę”, „Proszę…”.'),
            mk('📞', isEn ? 'Basic calls' : 'Proste rozmowy', isEn ? 'Answer / transfer / take a note.' : 'Odbierasz, przekierowujesz, notujesz.'),
            mk('✅', isEn ? 'Clear next steps' : 'Ustalenia', isEn ? 'Confirm who does what.' : 'Potwierdzasz kto co robi.')
          ],
          exam: [
            mk('🔤', isEn ? 'Core vocabulary' : 'Podstawowe słownictwo', isEn ? 'Everyday topics and phrases.' : 'Codzienne tematy i zwroty.'),
            mk('📚', isEn ? 'Grammar foundation' : 'Fundament gramatyki', isEn ? 'Present, simple past basics.' : 'Teraźniejszość, podstawy przeszłości.'),
            mk('🎧', isEn ? 'Short listening' : 'Krótkie słuchanie', isEn ? 'Pick key information.' : 'Wybierasz kluczowe informacje.'),
            mk('✍️', isEn ? 'Mini writing' : 'Mini pisanie', isEn ? 'Simple sentences, short notes.' : 'Proste zdania, krótkie notatki.'),
            mk('🧠', isEn ? 'Study routine' : 'Rutyna nauki', isEn ? 'You know what to do each week.' : 'Wiesz co robić tydzień po tygodniu.'),
            mk('✅', isEn ? 'First checkpoints' : 'Pierwsze testy', isEn ? 'You track progress and errors.' : 'Śledzisz postęp i najczęstsze błędy.')
          ]
        }
      },
      {
        id: 'A2',
        title: isEn ? 'Handle typical situations' : 'Typowe sytuacje bez stresu',
        desc: isEn
          ? 'You speak in full sentences and understand more in context.'
          : 'Mówisz pełnymi zdaniami i rozumiesz więcej z kontekstu.',
        scenarios: {
          everyday: [
            mk('🧑‍🤝‍🧑', isEn ? 'Small talk' : 'Small talk', isEn ? 'Family, hobbies, weekend plans.' : 'Rodzina, hobby, plany na weekend.'),
            mk('🛍️', isEn ? 'Shopping' : 'Zakupy', isEn ? 'Sizes, returns, asking for options.' : 'Rozmiary, zwroty, wybór opcji.'),
            mk('🏙️', isEn ? 'City life' : 'Miasto', isEn ? 'Transport, tickets, asking for help.' : 'Transport, bilety, prosisz o pomoc.'),
            mk('📱', isEn ? 'Messaging' : 'Wiadomości', isEn ? 'Write clear short messages.' : 'Piszesz krótkie, jasne wiadomości.'),
            mk('🎧', isEn ? 'Longer listening' : 'Dłuższe słuchanie', isEn ? 'You understand short dialogues.' : 'Rozumiesz krótkie dialogi.'),
            mk('🧭', isEn ? 'Explaining needs' : 'Wyjaśniasz potrzeby', isEn ? 'You can describe simple problems.' : 'Opisujesz proste problemy.')
          ],
          travel: [
            mk('🧳', isEn ? 'Travel planning' : 'Planowanie wyjazdu', isEn ? 'Ask about tickets, times, baggage.' : 'Pytasz o bilety, godziny, bagaż.'),
            mk('🏨', isEn ? 'Fix a problem' : 'Rozwiązujesz problem', isEn ? 'Room, noise, towel, late check‑in.' : 'Pokój, hałas, ręcznik, późne zameldowanie.'),
            mk('🚇', isEn ? 'Transport' : 'Transport', isEn ? 'Buy tickets, understand announcements.' : 'Kupujesz bilety, rozumiesz komunikaty.'),
            mk('🍲', isEn ? 'Food choices' : 'Wybór jedzenia', isEn ? 'Allergies, preferences, recommendations.' : 'Alergie, preferencje, rekomendacje.'),
            mk('📸', isEn ? 'Tours & attractions' : 'Atrakcje', isEn ? 'Ask about schedule and rules.' : 'Pytasz o harmonogram i zasady.'),
            mk('🗺️', isEn ? 'Local tips' : 'Lokalne podpowiedzi', isEn ? 'Ask for places and suggestions.' : 'Pytasz o miejsca i polecenia.')
          ],
          work: [
            mk('📨', isEn ? 'Emails that work' : 'Maile, które działają', isEn ? 'Short structure + polite tone.' : 'Krótka struktura + uprzejmy ton.'),
            mk('🗓️', isEn ? 'Meeting basics' : 'Spotkania', isEn ? 'Confirm time, agenda, next steps.' : 'Potwierdzasz czas, agendę, ustalenia.'),
            mk('🧾', isEn ? 'Instructions' : 'Instrukcje', isEn ? 'Follow simple procedures.' : 'Rozumiesz proste procedury.'),
            mk('🤝', isEn ? 'Colleague chat' : 'Rozmowa z zespołem', isEn ? 'Small talk and friendly tone.' : 'Small talk i swobodniejszy ton.'),
            mk('📞', isEn ? 'Call handling' : 'Telefon', isEn ? 'Explain you will call back, take notes.' : 'Mówisz, że oddzwonisz, notujesz.'),
            mk('✅', isEn ? 'Task updates' : 'Status zadań', isEn ? 'Say what’s done / blocked / next.' : 'Mówisz: zrobione / blokada / co dalej.')
          ],
          exam: [
            mk('📚', isEn ? 'A2 checkpoints' : 'Testy A2', isEn ? 'You know the task types.' : 'Znasz typy zadań.'),
            mk('🧠', isEn ? 'Grammar in use' : 'Gramatyka w praktyce', isEn ? 'Questions, past, basic connectors.' : 'Pytania, przeszłość, podstawowe łączniki.'),
            mk('🎧', isEn ? 'Listening strategies' : 'Strategie słuchania', isEn ? 'Catch intent and details.' : 'Wyłapujesz intencję i szczegóły.'),
            mk('✍️', isEn ? 'Emails & notes' : 'Maile i notatki', isEn ? 'Short message, invitation, reply.' : 'Krótka wiadomość, zaproszenie, odpowiedź.'),
            mk('🗣️', isEn ? 'Speaking tasks' : 'Mówienie', isEn ? 'Simple picture / topic prompts.' : 'Proste zadania na obrazek / temat.'),
            mk('✅', isEn ? 'Fewer mistakes' : 'Mniej błędów', isEn ? 'You know your typical errors.' : 'Wiesz, jakie masz typowe błędy.')
          ]
        }
      },
      {
        id: 'B1',
        title: isEn ? 'Useful English' : 'Angielski, który działa',
        desc: isEn
          ? 'English becomes a tool: you communicate and understand in real life.'
          : 'Angielski staje się narzędziem: komunikujesz się w realnych sytuacjach.',
        scenarios: {
          everyday: [
            mk('🗣️', isEn ? 'Opinions' : 'Opinie', isEn ? 'Say what you think and why.' : 'Mówisz, co myślisz i dlaczego.'),
            mk('🎬', isEn ? 'Media' : 'Media', isEn ? 'YouTube, series, podcasts with less translating.' : 'YouTube, seriale, podcasty — mniej tłumaczenia.'),
            mk('🧑‍🤝‍🧑', isEn ? 'New people' : 'Nowe znajomości', isEn ? 'Longer conversations and follow‑up questions.' : 'Dłuższe rozmowy i dopytywanie.'),
            mk('📅', isEn ? 'Planning' : 'Planowanie', isEn ? 'Make plans, negotiate time, agree.' : 'Umawiasz się, ustalasz czas, potwierdzasz.'),
            mk('🧠', isEn ? 'Learning speed' : 'Szybsza nauka', isEn ? 'You learn from context and patterns.' : 'Uczysz się z kontekstu i schematów.'),
            mk('✨', isEn ? 'Natural phrases' : 'Naturalne zwroty', isEn ? 'More fluency, fewer pauses.' : 'Większa płynność, mniej pauz.')
          ],
          travel: [
            mk('🧭', isEn ? 'Explaining problems' : 'Tłumaczysz problemy', isEn ? 'Lost luggage, delay, complaint.' : 'Zagubiony bagaż, opóźnienie, reklamacja.'),
            mk('🚗', isEn ? 'Rentals' : 'Wypożyczalnie', isEn ? 'Car rules, insurance, deposits.' : 'Zasady, ubezpieczenie, kaucja.'),
            mk('🏞️', isEn ? 'Tours' : 'Wycieczki', isEn ? 'Ask questions and understand guides.' : 'Pytasz i rozumiesz przewodnika.'),
            mk('🧾', isEn ? 'Bills & receipts' : 'Rachunki', isEn ? 'Check bills, ask to split, explain.' : 'Sprawdzasz rachunek, prosisz o podział.'),
            mk('🗣️', isEn ? 'Local conversations' : 'Rozmowy z ludźmi', isEn ? 'More natural chats with locals.' : 'Swobodniejsze rozmowy na miejscu.'),
            mk('🌦️', isEn ? 'Unexpected changes' : 'Nieoczekiwane zmiany', isEn ? 'You adapt, ask alternatives.' : 'Reagujesz i szukasz alternatyw.')
          ],
          work: [
            mk('🗣️', isEn ? 'Meetings' : 'Spotkania', isEn ? 'Follow the discussion and comment.' : 'Nadążasz i zabierasz głos.'),
            mk('📨', isEn ? 'Structured emails' : 'Maile z strukturą', isEn ? 'Clear context → action → deadline.' : 'Kontekst → działanie → termin.'),
            mk('🧑‍💻', isEn ? 'Tools & docs' : 'Narzędzia i dokumenty', isEn ? 'Tickets, specs, instructions.' : 'Zgłoszenia, specyfikacje, instrukcje.'),
            mk('🤝', isEn ? 'Client basics' : 'Kontakt z klientem', isEn ? 'Simple calls, confirmations.' : 'Proste rozmowy i potwierdzenia.'),
            mk('📈', isEn ? 'Updates' : 'Raportowanie', isEn ? 'Explain progress and blockers.' : 'Opisujesz postępy i blokady.'),
            mk('✅', isEn ? 'Less stress' : 'Mniej stresu', isEn ? 'You understand without guessing.' : 'Rozumiesz bez zgadywania.')
          ],
          exam: [
            mk('🧪', isEn ? 'B1 tasks' : 'Zadania B1', isEn ? 'Reading, listening, speaking formats.' : 'Czytanie, słuchanie, mówienie — formaty.'),
            mk('✍️', isEn ? 'Longer writing' : 'Dłuższe pisanie', isEn ? 'Email, story, short opinion.' : 'Mail, opowiadanie, krótka opinia.'),
            mk('🎧', isEn ? 'Longer listening' : 'Dłuższe słuchanie', isEn ? 'You track details over time.' : 'Utrzymujesz uwagę na szczegółach.'),
            mk('🗣️', isEn ? 'Speaking fluency' : 'Płynność mówienia', isEn ? 'Answer with examples, explain reasons.' : 'Odpowiadasz z przykładami i uzasadnieniem.'),
            mk('📚', isEn ? 'Error reduction' : 'Mniej błędów', isEn ? 'You correct patterns, not single mistakes.' : 'Poprawiasz schematy, nie pojedyncze błędy.'),
            mk('✅', isEn ? 'Mock exams' : 'Próbne testy', isEn ? 'You know your score trajectory.' : 'Widzisz trend wyników.')
          ]
        }
      },
      {
        id: 'B2',
        title: isEn ? 'Career boost' : 'Boost kariery',
        desc: isEn
          ? 'You express complex ideas clearly and react fast in conversations.'
          : 'Jasno mówisz o złożonych rzeczach i szybciej reagujesz w rozmowie.',
        scenarios: {
          everyday: [
            mk('🎙️', isEn ? 'Long conversations' : 'Długie rozmowy', isEn ? 'You keep flow and ask follow‑ups.' : 'Utrzymujesz flow i dopytujesz.'),
            mk('😂', isEn ? 'Humor & tone' : 'Humor i ton', isEn ? 'You get jokes and nuance.' : 'Łapiesz żarty i niuanse.'),
            mk('🎬', isEn ? 'No subtitles' : 'Bez napisów', isEn ? 'Most series and videos feel easy.' : 'Większość seriali jest „na luzie”.'),
            mk('🧠', isEn ? 'Vocabulary depth' : 'Głębsze słownictwo', isEn ? 'Synonyms, phrasing, precision.' : 'Synonimy, sformułowania, precyzja.'),
            mk('🗣️', isEn ? 'Debates' : 'Dyskusje', isEn ? 'You argue politely and clearly.' : 'Dyskutujesz kulturalnie i jasno.'),
            mk('✨', isEn ? 'Fluency' : 'Płynność', isEn ? 'You sound natural in many topics.' : 'Brzmisz naturalnie w wielu tematach.')
          ],
          travel: [
            mk('🛂', isEn ? 'Complex situations' : 'Trudne sytuacje', isEn ? 'Delays, cancellations, claims.' : 'Opóźnienia, odwołania, reklamacje.'),
            mk('🏛️', isEn ? 'Formal places' : 'Formalnie', isEn ? 'Offices, documents, rules.' : 'Urzędy, dokumenty, regulaminy.'),
            mk('🤝', isEn ? 'Negotiating' : 'Negocjacje', isEn ? 'Discuss price, terms, upgrades.' : 'Ceny, warunki, upgrady.'),
            mk('🧭', isEn ? 'Deep recommendations' : 'Polecenia', isEn ? 'Ask locals for detailed tips.' : 'Pytasz o konkretne rekomendacje.'),
            mk('🎤', isEn ? 'Group travel' : 'W grupie', isEn ? 'Coordinate, explain, lead.' : 'Koordynujesz, tłumaczysz, prowadzisz.'),
            mk('📚', isEn ? 'Culture & history' : 'Kultura i historia', isEn ? 'You understand museum tours.' : 'Rozumiesz treści w muzeach i na trasach.')
          ],
          work: [
            mk('🧑‍💻', isEn ? 'Presentations' : 'Prezentacje', isEn ? 'Explain ideas, handle questions.' : 'Wyjaśniasz i odpowiadasz na pytania.'),
            mk('🤝', isEn ? 'Clients & partners' : 'Klienci i partnerzy', isEn ? 'Calls, follow‑ups, negotiations.' : 'Rozmowy, follow‑upy, negocjacje.'),
            mk('🧾', isEn ? 'Documentation' : 'Dokumentacja', isEn ? 'Write clear docs and reports.' : 'Piszesz klarowne opisy i raporty.'),
            mk('🎯', isEn ? 'Job interviews' : 'Rekrutacje', isEn ? 'Tell your story and strengths.' : 'Opowiadasz o doświadczeniu i mocnych stronach.'),
            mk('📈', isEn ? 'Leadership' : 'Prowadzenie', isEn ? 'Guide meetings and decisions.' : 'Prowadzisz spotkania i ustalenia.'),
            mk('✅', isEn ? 'Professional tone' : 'Profesjonalny ton', isEn ? 'You sound confident and precise.' : 'Brzmisz pewnie i precyzyjnie.')
          ],
          exam: [
            mk('📚', isEn ? 'B2 exam formats' : 'Format B2', isEn ? 'Reading/writing at speed.' : 'Czytanie/pisanie w tempie.'),
            mk('✍️', isEn ? 'Essays' : 'Wypracowania', isEn ? 'Arguments, structure, connectors.' : 'Argumenty, struktura, łączniki.'),
            mk('🎧', isEn ? 'Advanced listening' : 'Zaawansowane słuchanie', isEn ? 'Different accents and speed.' : 'Różne akcenty i tempo.'),
            mk('🗣️', isEn ? 'Speaking performance' : 'Mówienie', isEn ? 'Organize answers on the fly.' : 'Układasz odpowiedzi „w locie”.'),
            mk('🧠', isEn ? 'Precision' : 'Precyzja', isEn ? 'Register, nuance, phrasing.' : 'Rejestr, niuanse, dobór słów.'),
            mk('✅', isEn ? 'Exam strategy' : 'Strategia', isEn ? 'You optimize time and score.' : 'Optymalizujesz czas i wynik.')
          ]
        }
      },
      {
        id: 'C1',
        title: isEn ? 'Fluency & precision' : 'Płynność i precyzja',
        desc: isEn
          ? 'You operate naturally: nuance, persuasion, advanced vocabulary.'
          : 'Działasz naturalnie: niuanse, perswazja, zaawansowane słownictwo.',
        scenarios: {
          everyday: [
            mk('🧠', isEn ? 'Nuance' : 'Niuanse', isEn ? 'You say exactly what you mean.' : 'Mówisz dokładnie to, co masz na myśli.'),
            mk('🗣️', isEn ? 'Storytelling' : 'Storytelling', isEn ? 'You tell stories with detail.' : 'Opowiadasz z detalami i klimatem.'),
            mk('✨', isEn ? 'Idioms' : 'Idiomy', isEn ? 'You understand and use idioms.' : 'Rozumiesz i używasz idiomów.'),
            mk('🎙️', isEn ? 'Natural speed' : 'Naturalne tempo', isEn ? 'You keep up with fast speech.' : 'Nadążasz za szybkim mówieniem.'),
            mk('🌍', isEn ? 'Global content' : 'Globalne treści', isEn ? 'Articles, talks, courses in English.' : 'Artykuły, wystąpienia, kursy po angielsku.'),
            mk('✅', isEn ? 'Confidence' : 'Pewność', isEn ? 'You feel comfortable in any topic.' : 'Czujesz się swobodnie w każdym temacie.')
          ],
          travel: [
            mk('🏛️', isEn ? 'Formal communication' : 'Formalnie', isEn ? 'Contracts, policies, complaints.' : 'Umowy, regulaminy, reklamacje.'),
            mk('🤝', isEn ? 'Negotiations' : 'Negocjacje', isEn ? 'You negotiate terms confidently.' : 'Negocjujesz warunki z pewnością.'),
            mk('🧭', isEn ? 'Guiding others' : 'Prowadzisz innych', isEn ? 'You help others in English.' : 'Pomagasz innym po angielsku.'),
            mk('🎤', isEn ? 'Public speaking' : 'Wystąpienia', isEn ? 'Speak in groups without stress.' : 'Mówisz w grupie bez stresu.'),
            mk('📚', isEn ? 'Culture depth' : 'Kultura', isEn ? 'History, art, deep conversations.' : 'Historia, sztuka, głębsze rozmowy.'),
            mk('✅', isEn ? 'No language barrier' : 'Bez bariery', isEn ? 'English stops being an obstacle.' : 'Angielski przestaje być przeszkodą.')
          ],
          work: [
            mk('🏛️', isEn ? 'Negotiations' : 'Negocjacje', isEn ? 'You persuade and defend decisions.' : 'Przekonujesz i bronisz decyzji.'),
            mk('🧾', isEn ? 'High‑stakes writing' : 'Ważne dokumenty', isEn ? 'Proposals, policies, contracts.' : 'Oferty, procedury, umowy.'),
            mk('🌍', isEn ? 'International role' : 'Międzynarodowo', isEn ? 'Lead cross‑country projects.' : 'Prowadzisz projekty międzynarodowe.'),
            mk('🎤', isEn ? 'Conferences' : 'Konferencje', isEn ? 'Talks, Q&A, networking.' : 'Wystąpienia, Q&A, networking.'),
            mk('🧠', isEn ? 'Precision' : 'Precyzja', isEn ? 'You choose words and tone expertly.' : 'Świadomie dobierasz słowa i ton.'),
            mk('✅', isEn ? 'Executive presence' : 'Profesjonalizm', isEn ? 'You sound senior and convincing.' : 'Brzmisz „seniorowo” i wiarygodnie.')
          ],
          exam: [
            mk('📚', isEn ? 'Advanced reading' : 'Zaawansowane czytanie', isEn ? 'Complex texts with nuance.' : 'Złożone teksty z niuansami.'),
            mk('✍️', isEn ? 'Academic writing' : 'Pisanie akademickie', isEn ? 'Clarity, argumentation, style.' : 'Jasność, argumentacja, styl.'),
            mk('🎧', isEn ? 'Complex listening' : 'Trudne słuchanie', isEn ? 'Fast speech, accents, opinions.' : 'Szybka mowa, akcenty, opinie.'),
            mk('🗣️', isEn ? 'Advanced speaking' : 'Zaawansowane mówienie', isEn ? 'Nuanced answers and discourse.' : 'Niuans i spójna wypowiedź.'),
            mk('🧠', isEn ? 'Exam-level tactics' : 'Taktyka', isEn ? 'Consistency and scoring.' : 'Stabilność i punktacja.'),
            mk('✅', isEn ? 'C1 readiness' : 'Gotowość C1', isEn ? 'You perform under pressure.' : 'Dajesz radę „pod presją”.')
          ]
        }
      }
    ];

    return { tracks: tracks, levels: levels };
  }

  function makeWidget(targetEl, options) {
    ensureStyles();

    var opts = options || {};
    var lang = (opts.lang || 'pl');
    var uid = 'llw-' + Math.random().toString(36).slice(2, 9);

    // Theme detection (matches host website)
    var base = detectBaseColors();
    var ar = detectAccentAndRadius();

    var accent = opts.accentColor ? resolveToRgbString(opts.accentColor) : (ar.accent ? resolveToRgbString(ar.accent) : '');
    if (!accent) accent = 'rgb(37,99,235)';

    var bg = opts.backgroundColor ? resolveToRgbString(opts.backgroundColor) : base.bg;
    var text = opts.textColor ? resolveToRgbString(opts.textColor) : base.text;

    var font = opts.fontFamily || base.font || 'inherit';

    var accentRgb = parseRgb(accent) || { r: 37, g: 99, b: 235, a: 1 };
    var bgRgb = parseRgb(bg) || { r: 255, g: 255, b: 255, a: 1 };
    var textRgb = parseRgb(text) || { r: 17, g: 24, b: 39, a: 1 };

    var isDark = relLuminance(bgRgb) < 0.22;

    // Radius: try to follow the site's button radius if available.
    var radiusPx = opts.radiusPx || numFromCssPx(ar.radius, NaN);
    if (!isFinite(radiusPx) || radiusPx <= 0) radiusPx = 18;

    // Derived colors
    var border = isDark ? 'rgba(255,255,255,.18)' : 'rgba(17,24,39,.12)';
    var muted = isDark ? 'rgba(255,255,255,.72)' : 'rgba(17,24,39,.72)';
    var shadow = isDark ? '0 16px 40px rgba(0,0,0,.55)' : '0 14px 36px rgba(0,0,0,.10)';
    var card = opts.cardColor
      ? resolveToRgbString(opts.cardColor)
      : (isDark ? 'rgba(17,20,30,.72)' : 'rgba(255,255,255,.92)');

    // Glass surfaces + focus ring + contrast-aware text
    var card2 = isDark ? 'rgba(17,20,30,.56)' : 'rgba(255,255,255,0.68)';
    var surface = isDark ? 'rgba(17,20,30,.56)' : 'rgba(255,255,255,.72)';
    var surfaceStrong = isDark ? 'rgba(17,20,30,.72)' : 'rgba(255,255,255,.80)';
    var focus = rgbToCss(accentRgb, isDark ? 0.55 : 0.35);
    var ctaTextColor = pickReadableTextOn(accentRgb);


    // Accent tints
    var accentSoft = rgbToCss(accentRgb, isDark ? 0.20 : 0.14);
    var accentFaint = rgbToCss(accentRgb, isDark ? 0.12 : 0.08);

    // Copy + data
    var isEn = lang.toLowerCase().startsWith('en');
    var data = defaultData(lang);
    var tracks = (Array.isArray(opts.tracks) && opts.tracks.length) ? opts.tracks
      : ((Array.isArray(opts.categories) && opts.categories.length) ? opts.categories : data.tracks);
    var levels = (Array.isArray(opts.levels) && opts.levels.length) ? opts.levels : data.levels;

    // Initial selections
    var initialTrack = opts.track || opts.category || tracks[0].id;

    // Examples view + visibility options
    var examplesMode = normalizeExamplesMode(opts.examplesMode || opts.examples);
    var maxScenarios = (opts.maxScenarios !== undefined && opts.maxScenarios !== null)
      ? parseInt(opts.maxScenarios, 10)
      : (examplesMode === 'categories' ? 4 : 6);
    if (!isFinite(maxScenarios) || maxScenarios <= 0) maxScenarios = 999;

    var showHeader = parseBoolish(opts.showHeader, true);
    var showControls = parseBoolish(opts.showControls, true);
    var showStepper = (opts.showStepper !== undefined) ? parseBoolish(opts.showStepper, true) : showControls;
    var layoutMode = (opts.layout || opts.layoutMode || 'auto');
    var enableSeek = (opts.enableSeek !== undefined) ? parseBoolish(opts.enableSeek, true) : true;
    var enableDrag = (opts.enableDrag !== undefined) ? parseBoolish(opts.enableDrag, true) : true;
    var showTabs = (opts.showTabs !== undefined) ? parseBoolish(opts.showTabs, true) : (examplesMode === 'single');
    var showMeters = (opts.showMeters !== undefined) ? parseBoolish(opts.showMeters, true) : (examplesMode === 'single');
    var lockTrack = parseBoolish(opts.lockTrack, false);
    var showCta = (opts.showCta !== undefined) ? parseBoolish(opts.showCta, true) : true;

    // Layout: 'auto' (default), 'split', 'stack'
    layoutMode = String(layoutMode || 'auto').toLowerCase().trim();
    if (layoutMode !== 'auto' && layoutMode !== 'split' && layoutMode !== 'stack') layoutMode = 'auto';
    var splitThreshold = (opts.splitThreshold !== undefined && opts.splitThreshold !== null)
      ? parseInt(opts.splitThreshold, 10)
      : 920;
    if (!isFinite(splitThreshold) || splitThreshold < 640) splitThreshold = 920;

    if (lockTrack) showTabs = false;

    // Optional: per-widget canvas height
    var canvasHeight = (opts.canvasHeight !== undefined && opts.canvasHeight !== null) ? parseFloat(opts.canvasHeight) : NaN;
    var canvasHeightSm = (opts.canvasHeightMobile !== undefined && opts.canvasHeightMobile !== null) ? parseFloat(opts.canvasHeightMobile) : NaN;

    // Optional: start at a specific CEFR level (A1/A2/B1/B2/C1)
    var initialIndex = 0;
    if (opts.startLevel) {
      var sl = String(opts.startLevel).toLowerCase().trim();
      for (var si = 0; si < levels.length; si++) {
        if (String(levels[si].id || '').toLowerCase() === sl) { initialIndex = si; break; }
      }
    }

    // CTA
    var ctaHref = (opts.ctaHref !== undefined) ? opts.ctaHref : '/kontakt';
    var ctaText = (opts.ctaText !== undefined) ? opts.ctaText : (isEn ? 'Book a consultation' : 'Umów konsultację');

    var title = opts.title || (isEn ? 'Your English Progress Journey' : 'Twoja droga do angielskiego');
    var subtitle = opts.subtitle || (isEn
      ? 'Pick a goal track. Drag the slider or click a level. Watch what English unlocks.'
      : 'Wybierz cel. Przesuń suwak lub kliknij poziom. Zobacz, co odblokowuje angielski.');

    // Root
    var root = createEl('div', { class: 'llw-root' });
    root.style.setProperty('--llw-accent', rgbToCss(accentRgb, 1));
    root.style.setProperty('--llw-accent-soft', accentSoft);
    root.style.setProperty('--llw-accent-faint', accentFaint);
    root.style.setProperty('--llw-bg', rgbToCss(bgRgb, 1));
    root.style.setProperty('--llw-text', rgbToCss(textRgb, 1));
    root.style.setProperty('--llw-muted', muted);
    root.style.setProperty('--llw-border', border);
    root.style.setProperty('--llw-card', card);
    root.style.setProperty('--llw-card2', card2);
    root.style.setProperty('--llw-surface', surface);
    root.style.setProperty('--llw-surface-strong', surfaceStrong);
    root.style.setProperty('--llw-focus', focus);
    root.style.setProperty('--llw-cta-text', ctaTextColor);
    root.style.setProperty('--llw-shadow', shadow);
    root.style.setProperty('--llw-radius', radiusPx + 'px');
    root.style.setProperty('--llw-font', font);
    if (isFinite(canvasHeight) && canvasHeight > 120) root.style.setProperty('--llw-canvas-h', canvasHeight + 'px');
    if (isFinite(canvasHeightSm) && canvasHeightSm > 120) root.style.setProperty('--llw-canvas-h-sm', canvasHeightSm + 'px');

    // Card
    var cardEl = createEl('div', { class: 'llw-card', role: 'region', 'aria-label': title });

    // Header
    var header = createEl('div', { class: 'llw-header' });
    var headerText = createEl('div');
    headerText.appendChild(createEl('h3', { class: 'llw-title', text: title }));
    headerText.appendChild(createEl('p', { class: 'llw-subtitle', text: subtitle }));

    var badges = createEl('div', { class: 'llw-badges' });
    var badge1 = createEl('div', { class: 'llw-badge' });
    badge1.appendChild(createEl('span', { class: 'llw-dot', 'aria-hidden': 'true' }));
    badge1.appendChild(createEl('span', { text: isEn ? 'Levels A1 → C1' : 'Poziomy A1 → C1' }));
    badges.appendChild(badge1);

    var badge2 = createEl('div', { class: 'llw-badge' });
    badge2.appendChild(createEl('span', { text: isEn ? 'Interactive' : 'Interaktywnie' }));
    badges.appendChild(badge2);

    headerText.appendChild(badges);
    header.appendChild(headerText);

    if (showCta && ctaHref && ctaText) {
      var cta = createEl('a', { class: 'llw-cta', href: ctaHref });
      cta.appendChild(createEl('span', { text: ctaText }));
      cta.appendChild(createEl('span', { text: '→', 'aria-hidden': 'true' }));
      header.appendChild(cta);
    }

    cardEl.appendChild(header);

    if (!showHeader) {
      header.style.display = 'none';
      cardEl.classList.add('llw-no-header');
    }

    // Body layout wrapper
    var body = createEl('div', { class: 'llw-body' });
    cardEl.appendChild(body);

    // Stage
    var stage = createEl('div', { class: 'llw-stage' });
    var stageBg = createEl('div', { class: 'llw-stage-bg' });
    var canvas = createEl('canvas', { class: 'llw-canvas' });
    canvas.setAttribute('aria-hidden', 'true');

    var overlay = createEl('div', { class: 'llw-overlay' });
    var topbar = createEl('div', { class: 'llw-topbar' });

    var statLevel = createEl('div', { class: 'llw-stat' });
    var statLevelLabel = createEl('span', { text: isEn ? 'Current: ' : 'Aktualnie: ' });
    var statLevelStrong = createEl('strong', { text: 'A1' });
    statLevel.appendChild(statLevelLabel);
    statLevel.appendChild(statLevelStrong);

    var statProgress = createEl('div', { class: 'llw-stat' });
    var statProgressLabel = createEl('span', { text: isEn ? 'Progress: ' : 'Progres: ' });
    var statProgressStrong = createEl('strong', { text: '0%' });
    statProgress.appendChild(statProgressLabel);
    statProgress.appendChild(statProgressStrong);

    topbar.appendChild(statLevel);
    topbar.appendChild(statProgress);
    overlay.appendChild(topbar);

    var nodesWrap = createEl('div', {
      class: 'llw-nodes',
      role: 'tablist',
      'aria-label': isEn ? 'Levels' : 'Poziomy'
    });

    stage.appendChild(stageBg);
    stage.appendChild(canvas);
    stage.appendChild(nodesWrap);
    stage.appendChild(overlay);

    body.appendChild(stage);

    // Stepper (level navigation)
    var stepper = createEl('div', { class: 'llw-stepper', role: 'navigation', 'aria-label': isEn ? 'Levels' : 'Poziomy' });
    var stepperLabel = createEl('span', { class: 'llw-stepper-label', text: isEn ? 'Levels' : 'Poziomy' });
    var stepperList = createEl('div', { class: 'llw-stepper-list', role: 'tablist', 'aria-label': isEn ? 'Levels' : 'Poziomy' });
    var stepperNav = createEl('div', { class: 'llw-stepper-nav' });
    var stepperPrev = createEl('button', { type: 'button', class: 'llw-stepper-btn', 'aria-label': isEn ? 'Previous level' : 'Poprzedni poziom' });
    stepperPrev.appendChild(createEl('span', { text: '←', 'aria-hidden': 'true' }));
    var stepperNext = createEl('button', { type: 'button', class: 'llw-stepper-btn', 'aria-label': isEn ? 'Next level' : 'Następny poziom' });
    stepperNext.appendChild(createEl('span', { text: '→', 'aria-hidden': 'true' }));
    stepperNav.appendChild(stepperPrev);
    stepperNav.appendChild(stepperNext);
    stepper.appendChild(stepperLabel);
    stepper.appendChild(stepperList);
    stepper.appendChild(stepperNav);
    body.appendChild(stepper);
    if (!showStepper) {
      stepper.style.display = 'none';
      stepper.setAttribute('aria-hidden', 'true');
    }

    var stepButtons = [];

    // Controls
    var controls = createEl('div', { class: 'llw-controls' });

    var rangeId = uid + '-range';
    var toggleId = uid + '-auto';

    var rangeWrap = createEl('div', { class: 'llw-range' });
    var labelRow = createEl('label', { 'for': rangeId });
    labelRow.appendChild(createEl('span', { text: isEn ? 'Start' : 'Start' }));
    labelRow.appendChild(createEl('span', { text: levels[levels.length - 1].id + '+' }));
    rangeWrap.appendChild(labelRow);

    var range = createEl('input', {
      id: rangeId,
      type: 'range',
      min: '0',
      max: '100',
      value: '0',
      step: '1',
      'aria-label': isEn ? 'Progress' : 'Progres'
    });
    rangeWrap.appendChild(range);

    var toggleWrap = createEl('label', { class: 'llw-toggle', 'for': toggleId });

    var autoDefault = (opts.autoplay !== undefined) ? !!opts.autoplay : !prefersReducedMotion();
    if (prefersReducedMotion()) autoDefault = false;

    var toggle = createEl('input', { id: toggleId, type: 'checkbox' });
    toggle.checked = autoDefault;

    toggleWrap.appendChild(toggle);
    toggleWrap.appendChild(createEl('span', { text: isEn ? 'Slow autoplay' : 'Powolna animacja' }));

    controls.appendChild(rangeWrap);
    controls.appendChild(toggleWrap);

    body.appendChild(controls);

    if (!showControls) {
      controls.style.display = 'none';
    }

// Tabs (goal tracks)
    var tabs = createEl('div', { class: 'llw-tabs', role: 'tablist', 'aria-label': isEn ? 'Categories' : 'Kategorie' });
    body.appendChild(tabs);

    if (!showTabs) {
      tabs.style.display = 'none';
    }

    // Meters (skill bars)
    var meters = createEl('div', { class: 'llw-meters' });
    var meterDefs = [
      { id: 'speaking', label: isEn ? 'Speaking' : 'Mówienie', icon: '🗣️' },
      { id: 'listening', label: isEn ? 'Listening' : 'Słuchanie', icon: '🎧' },
      { id: 'reading', label: isEn ? 'Reading' : 'Czytanie', icon: '📖' },
      { id: 'writing', label: isEn ? 'Writing' : 'Pisanie', icon: '✍️' }
    ];
    var meterEls = {};
    for (var mi = 0; mi < meterDefs.length; mi++) {
      var md = meterDefs[mi];
      var mEl = createEl('div', { class: 'llw-meter' });
      var mh = createEl('div', { class: 'llw-meter-h' });

      var left = createEl('span');
      left.appendChild(createEl('span', { text: md.icon + ' ', 'aria-hidden': 'true' }));
      left.appendChild(createEl('strong', { text: md.label }));

      var right = createEl('span');
      var rightStrong = createEl('strong', { text: '0%' });
      right.appendChild(rightStrong);

      mh.appendChild(left);
      mh.appendChild(right);

      var bar = createEl('div', { class: 'llw-bar' });
      var fill = createEl('i');
      bar.appendChild(fill);

      mEl.appendChild(mh);
      mEl.appendChild(bar);
      meters.appendChild(mEl);

      meterEls[md.id] = { root: mEl, value: rightStrong, fill: fill, last: -1 };
    }
    body.appendChild(meters);

    if (!showMeters) {
      meters.style.display = 'none';
      meters.setAttribute('aria-hidden', 'true');
    }

// Panel (details)
    var panel = createEl('div', { class: 'llw-panel' });
    panel.setAttribute('aria-live', 'polite');

    var panelTitle = createEl('h3');
    var panelDesc = createEl('p');
    var grid = createEl('div', { class: 'llw-grid' });

    panel.appendChild(panelTitle);
    panel.appendChild(panelDesc);
    panel.appendChild(grid);

    body.appendChild(panel);

    // Mount
    root.appendChild(cardEl);
    targetEl.innerHTML = '';
    targetEl.appendChild(root);

    // --- State + geometry ---
    var state = {
      running: false,
      visible: true,
      didInit: false,
      userInteracted: false,
      progress: 0.02,
      progressTarget: 0.02,
      auto: toggle.checked && !prefersReducedMotion(),
      autoStep: 0,
      autoPhase: 'hold',
      autoTimer: 0,
      autoDone: false,
      direction: 1,
      selectedIndex: initialIndex,
      renderedIndex: -1,
      renderedTrack: '',
      renderedMode: '',
      renderedUnlockedIndex: -1,
      lastProgressPct: -1,
      lastUnlockedIndex: -1,
      track: initialTrack,
      confetti: [],
      bgDots: [],
      isSplit: false,
      dragging: false,
      dragPointerId: null,
      touchSeek: null,
      touchMoved: false
    };

    var geom = {
      w: 0, h: 0, dpr: 1,
      p0: null, p1: null, p2: null, p3: null,
      stops: [],
      samples: []
    };

    function computeStops() {
      var count = levels.length;
      var stops = [];
      for (var i = 0; i < count; i++) {
        var t = (count === 1) ? 0.5 : (i / (count - 1));
        // Margin from ends
        t = 0.08 + t * 0.84;
        stops.push(t);
      }
      geom.stops = stops;
    }

    function bezierPoint(t) {
      var p0 = geom.p0, p1 = geom.p1, p2 = geom.p2, p3 = geom.p3;
      var u = 1 - t;
      var tt = t * t;
      var uu = u * u;
      var uuu = uu * u;
      var ttt = tt * t;
      var x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
      var y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
      return { x: x, y: y };
    }

    function bezierTangent(t) {
      var p0 = geom.p0, p1 = geom.p1, p2 = geom.p2, p3 = geom.p3;
      var u = 1 - t;
      var x = 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
      var y = 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
      return { x: x, y: y };
    }

    function nearestIndexForProgress(p) {
      var best = 0;
      for (var i = 0; i < geom.stops.length; i++) {
        if (p >= geom.stops[i] - 0.0001) best = i;
      }
      return best;
    }

    function updateUnlockedStyles() {
      var buttons = nodesWrap.querySelectorAll('button.llw-node');
      for (var i = 0; i < buttons.length; i++) {
        var unlocked = state.progress >= geom.stops[i] - 0.0001;
        if (unlocked) {
          buttons[i].style.background = rgbToCss(accentRgb, isDark ? 0.22 : 0.14);
          buttons[i].style.borderColor = rgbToCss(accentRgb, 0.55);
        } else {
          buttons[i].style.background = '';
          buttons[i].style.borderColor = '';
        }
      }

      // Stepper unlocked state
      for (var si = 0; si < stepButtons.length; si++) {
        var u = state.progress >= geom.stops[si] - 0.0001;
        if (stepButtons[si]) stepButtons[si].setAttribute('data-unlocked', u ? 'true' : 'false');
      }
    }

    function focusNodeByIndex(i) {
      var bs = nodesWrap.querySelectorAll('button.llw-node');
      if (bs && bs[i]) {
        try { bs[i].focus(); } catch (e) {}
      }
    }

    function focusStepByIndex(i) {
      if (!stepButtons || !stepButtons.length) return;
      i = clamp(i, 0, stepButtons.length - 1);
      try { stepButtons[i].focus(); } catch (e) {}
    }

    function scrollStepIntoView(i) {
      if (!stepButtons || !stepButtons.length) return;
      i = clamp(i, 0, stepButtons.length - 1);
      var el = stepButtons[i];
      if (!el || !el.scrollIntoView) return;
      try { el.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) {}
    }

    function updateStepperNav(idx) {
      if (!stepperPrev || !stepperNext) return;
      stepperPrev.disabled = (idx <= 0);
      stepperNext.disabled = (idx >= levels.length - 1);
    }

    function goToLevel(newIdx, focusKind, withConfetti, doScroll) {
      newIdx = clamp(newIdx, 0, levels.length - 1);
      state.userInteracted = true;
      state.auto = false;
      toggle.checked = false;

      if (!geom.stops || !geom.stops.length) computeStops();
      var t = geom.stops[newIdx] || 0.02;

      state.progressTarget = clamp(t, 0.02, 0.98);
      range.value = String(Math.round(state.progressTarget * 100));
      setSelectedIndex(newIdx, true);

      if (withConfetti) {
        try { spawnConfettiAt(bezierPoint(state.progressTarget), 16); } catch (e) {}
      }

      if (doScroll) scrollStepIntoView(newIdx);

      if (focusKind === 'node') focusNodeByIndex(newIdx);
      if (focusKind === 'step') focusStepByIndex(newIdx);
    }

    function seekToProgress(t, withAnim) {
      state.userInteracted = true;
      state.auto = false;
      toggle.checked = false;

      state.progressTarget = clamp(t, 0.02, 0.98);
      range.value = String(Math.round(state.progressTarget * 100));

      var idx = nearestIndexForProgress(state.progressTarget);
      setSelectedIndex(idx, !!withAnim);
    }

    function setSelectedIndex(idx, withAnim) {
      idx = clamp(idx, 0, levels.length - 1);

      var contentTrackKey = (examplesMode === 'single') ? state.track : '__all__';

      // Avoid rebuilding the panel on every animation frame.
      if (!withAnim && idx === state.renderedIndex && contentTrackKey === state.renderedTrack && examplesMode === state.renderedMode) {
        state.selectedIndex = idx;
        return;
      }

      state.selectedIndex = idx;
      state.renderedIndex = idx;
      state.renderedTrack = contentTrackKey;
      state.renderedMode = examplesMode;

      // Topbar
      var lvl = levels[idx];
      statLevelStrong.textContent = lvl.id;

      // Node aria
      var buttons = nodesWrap.querySelectorAll('button.llw-node');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-selected', (i === idx) ? 'true' : 'false');
      }

      // Stepper aria
      for (var si = 0; si < stepButtons.length; si++) {
        var selectedStep = (si === idx);
        if (stepButtons[si]) {
          stepButtons[si].setAttribute('aria-selected', selectedStep ? 'true' : 'false');
          stepButtons[si].tabIndex = selectedStep ? 0 : -1;
        }
      }
      updateStepperNav(idx);

      // Panel
      var titlePrefix = isEn ? ('Level ' + lvl.id + ' — ') : ('Poziom ' + lvl.id + ' — ');
      panelTitle.textContent = titlePrefix + (lvl.title || '');
      panelDesc.textContent = lvl.desc || '';

      // Examples
      if (examplesMode === 'categories') {
        grid.className = 'llw-cats';
        grid.innerHTML = '';

        for (var ti = 0; ti < tracks.length; ti++) {
          var tr = tracks[ti];

          var catCard = createEl('div', { class: 'llw-cat' });
          catCard.setAttribute('data-track', tr.id);
          if (tr.id === state.track) catCard.classList.add('is-active');

          var catHead = createEl('div', { class: 'llw-cat-h' });

          var catBtn = createEl('button', {
            type: 'button',
            class: 'llw-cat-btn',
            'data-track': tr.id,
            'aria-pressed': (tr.id === state.track) ? 'true' : 'false',
            'aria-label': (isEn ? 'Select category: ' : 'Wybierz kategorię: ') + (tr.label || tr.id)
          });
          catBtn.appendChild(createEl('span', { class: 'llw-cat-ico', text: (tr.icon || '✨'), 'aria-hidden': 'true' }));
          catBtn.appendChild(createEl('span', { text: tr.label || tr.id }));
          catBtn.addEventListener('click', function () {
            var t = this.getAttribute('data-track');
            if (!t) return;
            state.userInteracted = true;
            setTrack(t);
          });

          catHead.appendChild(catBtn);

          var pillText = (tr.id === state.track) ? (isEn ? 'Selected' : 'Wybrane') : (isEn ? 'Examples' : 'Przykłady');
          catHead.appendChild(createEl('span', { class: 'llw-cat-pill', text: pillText, 'aria-hidden': 'true' }));

          catCard.appendChild(catHead);

          var scenariosRaw = (lvl.scenarios && lvl.scenarios[tr.id]) ? lvl.scenarios[tr.id] : [];
          var scenarios = Array.isArray(scenariosRaw) ? scenariosRaw : [];

          if (!scenarios.length) {
            catCard.appendChild(createEl('div', { class: 'llw-cat-empty', text: isEn ? 'No examples for this category.' : 'Brak przykładów dla tej kategorii.' }));
          } else {
            var first = scenarios;
            var extra = [];

            if (maxScenarios && maxScenarios < scenarios.length) {
              first = scenarios.slice(0, maxScenarios);
              extra = scenarios.slice(maxScenarios);
            }

            var ul = createEl('ul', { class: 'llw-cat-list' });
            for (var si = 0; si < first.length; si++) {
              ul.appendChild(renderCatItem(first[si]));
            }
            catCard.appendChild(ul);

            if (extra.length) {
              var details = createEl('details', { class: 'llw-cat-more' });
              var summaryText = isEn ? ('Show more (' + extra.length + ')') : ('Pokaż więcej (' + extra.length + ')');
              details.appendChild(createEl('summary', { text: summaryText }));
              var ul2 = createEl('ul', { class: 'llw-cat-list' });
              for (var sj = 0; sj < extra.length; sj++) {
                ul2.appendChild(renderCatItem(extra[sj]));
              }
              details.appendChild(ul2);
              catCard.appendChild(details);
            }
          }

          grid.appendChild(catCard);
        }
      } else {
        grid.className = 'llw-grid';

        // Tiles: depends on track (with fallback to "everyday" to avoid empty state)
        var scenarios = [];
        if (lvl.scenarios && Array.isArray(lvl.scenarios[state.track])) scenarios = lvl.scenarios[state.track];
        else if (lvl.scenarios && Array.isArray(lvl.scenarios.everyday)) scenarios = lvl.scenarios.everyday;

        if (maxScenarios && maxScenarios < scenarios.length) scenarios = scenarios.slice(0, maxScenarios);

        grid.innerHTML = '';
        for (var s = 0; s < scenarios.length; s++) {
          var tile = createEl('div', { class: 'llw-tile' });
          if (withAnim && !prefersReducedMotion()) tile.classList.add('llw-fade-in');
          tile.appendChild(createEl('div', { class: 'llw-ico', text: scenarios[s].icon || '✨' }));
          tile.appendChild(createEl('div', { class: 'llw-tt', text: scenarios[s].title || '' }));
          tile.appendChild(createEl('div', { class: 'llw-tx', text: scenarios[s].text || '' }));
          grid.appendChild(tile);
        }
      }

      updateCategoryHighlights();
    }

    function renderCatItem(sc) {
      var li = createEl('li', { class: 'llw-cat-item' });
      li.appendChild(createEl('span', { class: 'llw-cat-ico', text: sc.icon || '✨', 'aria-hidden': 'true' }));
      var box = createEl('div');
      box.appendChild(createEl('div', { class: 'llw-cat-tt', text: sc.title || '' }));
      if (sc.text) box.appendChild(createEl('div', { class: 'llw-cat-tx', text: sc.text }));
      li.appendChild(box);
      return li;
    }

    function updateCategoryHighlights() {
      if (examplesMode !== 'categories') return;
      var cards = grid.querySelectorAll('.llw-cat');
      for (var i = 0; i < cards.length; i++) {
        var tid = cards[i].getAttribute('data-track');
        var active = (tid === state.track);

        if (active) cards[i].classList.add('is-active');
        else cards[i].classList.remove('is-active');

        var btn = cards[i].querySelector('button.llw-cat-btn');
        if (btn) btn.setAttribute('aria-pressed', active ? 'true' : 'false');

        var pill = cards[i].querySelector('.llw-cat-pill');
        if (pill) pill.textContent = active ? (isEn ? 'Selected' : 'Wybrane') : (isEn ? 'Examples' : 'Przykłady');
      }
    }

function setTrack(trackId) {
      // Validate
      var ok = false;
      for (var i = 0; i < tracks.length; i++) if (tracks[i].id === trackId) ok = true;
      if (!ok) trackId = tracks[0].id;

      if (lockTrack && state.track && trackId !== state.track) return;

      state.track = trackId;

      // Tabs aria + roving tabIndex
      var tbs = tabs.querySelectorAll('button.llw-tab');
      for (var k = 0; k < tbs.length; k++) {
        var selected = (tbs[k].getAttribute('data-track') === trackId);
        tbs[k].setAttribute('aria-selected', selected ? 'true' : 'false');
        tbs[k].tabIndex = selected ? 0 : -1;
      }

      if (examplesMode === 'single') {
        setSelectedIndex(state.selectedIndex, true);
      } else {
        updateCategoryHighlights();
      }

      updateMeters();
      if (state.didInit && !prefersReducedMotion()) spawnConfettiAt(bezierPoint(clamp(state.progress, 0.02, 0.98)), 14);
    }

    function updateMeters() {
      if (!showMeters) return;
      var p = clamp(state.progress, 0.02, 0.98);
      var weights = {
        everyday: { speaking: 0.28, listening: 0.26, reading: 0.22, writing: 0.24 },
        travel: { speaking: 0.34, listening: 0.34, reading: 0.16, writing: 0.16 },
        work: { speaking: 0.30, listening: 0.22, reading: 0.22, writing: 0.26 },
        exam: { speaking: 0.18, listening: 0.22, reading: 0.30, writing: 0.30 }
      };
      var w = weights[state.track] || weights.everyday;

      function curve(x) {
        // Ease-out curve for nicer growth.
        return 1 - Math.pow(1 - x, 1.35);
      }

      // Scale to 0..100
      var base = 0.12; // starting capability
      var span = 0.88; // growth span
      var vSpeak = clamp(base + span * curve(p) * (w.speaking / 0.34), 0, 1);
      var vListen = clamp(base + span * curve(p) * (w.listening / 0.34), 0, 1);
      var vRead = clamp(base + span * curve(p) * (w.reading / 0.30), 0, 1);
      var vWrite = clamp(base + span * curve(p) * (w.writing / 0.30), 0, 1);

      var values = { speaking: vSpeak, listening: vListen, reading: vRead, writing: vWrite };

      Object.keys(meterEls).forEach(function (id) {
        var pct = Math.round(values[id] * 100);
        if (meterEls[id].last === pct) return;
        meterEls[id].last = pct;
        meterEls[id].value.textContent = pct + '%';
        meterEls[id].fill.style.width = pct + '%';
      });
    }

    // Stepper init (levels)
    stepperList.innerHTML = '';
    stepButtons.length = 0;

    function focusStepInList(i) {
      focusStepByIndex(i);
      scrollStepIntoView(i);
    }

    for (var li = 0; li < levels.length; li++) {
      var isSel = (li === state.selectedIndex);
      var sb = createEl('button', {
        class: 'llw-step',
        type: 'button',
        role: 'tab',
        'data-index': String(li),
        'aria-selected': isSel ? 'true' : 'false',
        'aria-label': (isEn ? 'Select level ' : 'Wybierz poziom ') + levels[li].id
      });
      sb.tabIndex = isSel ? 0 : -1;
      sb.textContent = levels[li].id;
      sb.title = (levels[li].id + ' — ' + (levels[li].title || ''));

      (function (idx) {
        sb.addEventListener('click', function () {
          goToLevel(idx, 'step', true, true);
        });

        sb.addEventListener('keydown', function (ev) {
          var key = ev.key || ev.code;

          if (key === 'ArrowRight' || key === 'ArrowDown') {
            ev.preventDefault();
            goToLevel(idx + 1, 'step', false, true);
            return;
          }

          if (key === 'ArrowLeft' || key === 'ArrowUp') {
            ev.preventDefault();
            goToLevel(idx - 1, 'step', false, true);
            return;
          }

          if (key === 'Home') {
            ev.preventDefault();
            goToLevel(0, 'step', false, true);
            return;
          }

          if (key === 'End') {
            ev.preventDefault();
            goToLevel(levels.length - 1, 'step', false, true);
            return;
          }
        });
      })(li);

      stepperList.appendChild(sb);
      stepButtons.push(sb);
    }

    stepperPrev.addEventListener('click', function () {
      goToLevel(state.selectedIndex - 1, 'step', false, true);
    });
    stepperNext.addEventListener('click', function () {
      goToLevel(state.selectedIndex + 1, 'step', false, true);
    });
    updateStepperNav(state.selectedIndex);


    // Tabs init
    tabs.innerHTML = '';
    var tabsLabel = createEl('span', { class: 'llw-tabs-label', text: isEn ? 'Categories:' : 'Kategorie:', 'aria-hidden': 'true' });
    tabs.appendChild(tabsLabel);

    function focusTabByIndex(i) {
      var tbs = tabs.querySelectorAll('button.llw-tab');
      if (!tbs || !tbs.length) return;
      i = clamp(i, 0, tbs.length - 1);
      try { tbs[i].focus(); } catch (e) {}
    }

    for (var ti = 0; ti < tracks.length; ti++) {
      var tr = tracks[ti];
      var isSelected = (tr.id === state.track);

      var btn = createEl('button', {
        class: 'llw-tab',
        type: 'button',
        'data-track': tr.id,
        role: 'tab',
        'aria-selected': isSelected ? 'true' : 'false',
        'aria-label': (isEn ? 'Category: ' : 'Kategoria: ') + tr.label
      });

      // Roving tab index: only the selected tab is tabbable.
      btn.tabIndex = isSelected ? 0 : -1;

      btn.appendChild(createEl('span', { text: (tr.icon ? (tr.icon + ' ') : '') + tr.label }));

      (function (id, idx) {
        btn.addEventListener('click', function () {
          state.userInteracted = true;
          state.auto = false;
          toggle.checked = false;
          setTrack(id);
          focusTabByIndex(idx);
        });

        btn.addEventListener('keydown', function (ev) {
          var key = ev.key || ev.code;

          if (key === 'ArrowRight' || key === 'ArrowDown') {
            ev.preventDefault();
            var next = idx + 1;
            if (next >= tracks.length) next = 0;
            state.userInteracted = true;
            state.auto = false;
            toggle.checked = false;
            setTrack(tracks[next].id);
            focusTabByIndex(next);
            return;
          }

          if (key === 'ArrowLeft' || key === 'ArrowUp') {
            ev.preventDefault();
            var prev = idx - 1;
            if (prev < 0) prev = tracks.length - 1;
            state.userInteracted = true;
            state.auto = false;
            toggle.checked = false;
            setTrack(tracks[prev].id);
            focusTabByIndex(prev);
            return;
          }

          if (key === 'Home') {
            ev.preventDefault();
            state.userInteracted = true;
            state.auto = false;
            toggle.checked = false;
            setTrack(tracks[0].id);
            focusTabByIndex(0);
            return;
          }

          if (key === 'End') {
            ev.preventDefault();
            state.userInteracted = true;
            state.auto = false;
            toggle.checked = false;
            setTrack(tracks[tracks.length - 1].id);
            focusTabByIndex(tracks.length - 1);
            return;
          }
        });
      })(tr.id, ti);

      tabs.appendChild(btn);
    }

// Canvas stuff
    var ctx = canvas.getContext('2d');

    function initBgDots() {
      state.bgDots = [];
      if (prefersReducedMotion()) return;
      var n = 34;
      for (var i = 0; i < n; i++) {
        state.bgDots.push({
          x: Math.random(),
          y: Math.random(),
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          r: 0.8 + Math.random() * 1.8,
          a: 0.10 + Math.random() * 0.12
        });
      }
    }

    function spawnConfettiAt(pos, count) {
      if (prefersReducedMotion()) return;
      var c = count || 10;
      for (var i = 0; i < c; i++) {
        state.confetti.push({
          x: pos.x,
          y: pos.y,
          vx: (Math.random() - 0.5) * 160,
          vy: (Math.random() - 0.8) * 180,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 8,
          life: 0.9 + Math.random() * 0.7,
          age: 0,
          size: 3 + Math.random() * 3.2
        });
      }
    }

    function updateLayoutClass() {
      if (layoutMode === 'stack') {
        if (state.isSplit) {
          state.isSplit = false;
          root.classList.remove('llw-split');
        }
        return;
      }

      var w = 0;
      try { w = root.getBoundingClientRect().width; } catch (e) { w = 0; }
      var shouldSplit = (layoutMode === 'split') || (layoutMode === 'auto' && w >= splitThreshold);
      if (shouldSplit !== state.isSplit) {
        state.isSplit = shouldSplit;
        if (shouldSplit) root.classList.add('llw-split');
        else root.classList.remove('llw-split');
      }
    }

    function layout() {
      updateLayoutClass();
      var rect = stage.getBoundingClientRect();
      var dpr = global.devicePixelRatio || 1;
      geom.dpr = dpr;
      geom.w = Math.max(320, rect.width);
      geom.h = Math.max(180, rect.height);

      canvas.width = Math.floor(geom.w * dpr);
      canvas.height = Math.floor(geom.h * dpr);

      // Bezier control points (tight vertical fit)
      // We reserve space for the top stats bar, then use the remaining height.
      var pad = 38;
      var topbarH = 0;
      try { topbarH = topbar.getBoundingClientRect().height || 0; } catch (e) { topbarH = 0; }

      // Topbar sits at top:10px. Keep a small buffer so the curve never touches the pills.
      var topSafe = 10 + topbarH + 8;
      topSafe = clamp(topSafe, 34, geom.h * 0.48);

      // Keep some breathing room at the bottom as well.
      var bottomSafe = Math.max(14, Math.min(22, geom.h * 0.18));

      var yMin = topSafe;
      var yMax = geom.h - bottomSafe;
      if (yMax - yMin < 90) {
        // If the stage is very short, relax the safe areas a bit.
        yMin = Math.min(yMin, Math.max(30, geom.h * 0.22));
        yMax = Math.max(yMax, Math.min(geom.h - 12, geom.h * 0.92));
      }

      function yAt(n) { return yMin + (yMax - yMin) * n; }

      geom.p0 = { x: pad, y: yAt(0.74) };
      geom.p1 = { x: geom.w * 0.26, y: yAt(0.12) };
      geom.p2 = { x: geom.w * 0.74, y: yAt(0.88) };
      geom.p3 = { x: geom.w - pad, y: yAt(0.28) };

      computeStops();

      // Precompute samples for stage seeking (click/tap/drag)
      geom.samples = [];
      var sampleN = 180;
      for (var ssi = 0; ssi <= sampleN; ssi++) {
        var tt = ssi / sampleN;
        var pp = bezierPoint(tt);
        geom.samples.push({ t: tt, x: pp.x, y: pp.y });
      }

      // Keep autoplay state consistent after resize / relayout
      state.autoStep = clamp(state.autoStep, 0, geom.stops.length - 1);
      if (state.autoPhase === 'hold' && state.auto && !state.userInteracted && !state.autoDone) {
        state.progressTarget = geom.stops[state.autoStep];
      }

      // Place nodes
      nodesWrap.innerHTML = '';
      for (var i = 0; i < levels.length; i++) {
        var pt = bezierPoint(geom.stops[i]);
        var b = createEl('button', {
          class: 'llw-node',
          type: 'button',
          role: 'tab',
          text: levels[i].id
        });
        b.style.left = pt.x + 'px';
        b.style.top = pt.y + 'px';
        b.title = (levels[i].id + ' — ' + (levels[i].title || ''));
        b.setAttribute('aria-selected', (i === state.selectedIndex) ? 'true' : 'false');
        b.setAttribute('aria-label', (isEn ? 'Select level ' : 'Wybierz poziom ') + levels[i].id);

        (function (idx) {
          function goTo(newIdx, shouldFocus, withConfetti) {
            newIdx = clamp(newIdx, 0, levels.length - 1);
            state.userInteracted = true;
            state.auto = false;
            toggle.checked = false;
            var t = geom.stops[newIdx];
            state.progressTarget = t;
            range.value = String(Math.round(state.progressTarget * 100));
            setSelectedIndex(newIdx, true);
            if (withConfetti) spawnConfettiAt(bezierPoint(t), 16);

            if (shouldFocus) {
              var bs = nodesWrap.querySelectorAll('button.llw-node');
              if (bs && bs[newIdx]) {
                try { bs[newIdx].focus(); } catch (e) {}
              }
            }
          }

          b.addEventListener('click', function () { goTo(idx, false, true); });

          b.addEventListener('keydown', function (ev) {
            var key = ev.key || ev.code;

            if (key === 'ArrowRight' || key === 'ArrowDown') {
              ev.preventDefault();
              goTo(idx + 1, true, false);
              return;
            }

            if (key === 'ArrowLeft' || key === 'ArrowUp') {
              ev.preventDefault();
              goTo(idx - 1, true, false);
              return;
            }

            if (key === 'Home') {
              ev.preventDefault();
              goTo(0, true, false);
              return;
            }

            if (key === 'End') {
              ev.preventDefault();
              goTo(levels.length - 1, true, false);
              return;
            }
          });
        })(i);

        nodesWrap.appendChild(b);
      }

      updateUnlockedStyles();
      updateMeters();
      setSelectedIndex(state.selectedIndex, false);
    }

    // Stage seek (click/tap/drag on the path)
    function stageLocalPoint(ev) {
      var r = stage.getBoundingClientRect();
      return {
        x: clamp((ev.clientX - r.left), 0, r.width),
        y: clamp((ev.clientY - r.top), 0, r.height)
      };
    }

    function stageNearestT(x, y) {
      var bestT = state.progressTarget;
      var bestD = Infinity;
      var samples = geom.samples || [];
      for (var i = 0; i < samples.length; i++) {
        var dx = samples[i].x - x;
        var dy = samples[i].y - y;
        var d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          bestT = samples[i].t;
        }
      }
      return clamp(bestT, 0.02, 0.98);
    }

    function stageSeekFromEvent(ev, withAnim) {
      if (!geom.samples || !geom.samples.length) {
        try { layout(); } catch (e) {}
      }
      if (!geom.samples || !geom.samples.length) return;
      var p = stageLocalPoint(ev);
      var t = stageNearestT(p.x, p.y);
      seekToProgress(t, withAnim);
    }

    if (enableSeek) {
      stage.addEventListener('pointerdown', function (ev) {
        if (ev.button !== undefined && ev.button !== 0) return;

        // Don't interfere with explicit node clicks.
        if (ev.target && ev.target.closest && ev.target.closest('.llw-node')) return;

        if (ev.pointerType === 'touch') {
          state.touchSeek = { id: ev.pointerId, x: ev.clientX, y: ev.clientY };
          state.touchMoved = false;
          return;
        }

        // Mouse/pen
        if (!enableDrag) {
          stageSeekFromEvent(ev, true);
          return;
        }

        state.dragging = true;
        state.dragPointerId = ev.pointerId;
        try { stage.setPointerCapture(ev.pointerId); } catch (e) {}
        stageSeekFromEvent(ev, false);
      });

      stage.addEventListener('pointermove', function (ev) {
        if (state.dragging && ev.pointerId === state.dragPointerId) {
          stageSeekFromEvent(ev, false);
          return;
        }

        if (state.touchSeek && ev.pointerId === state.touchSeek.id) {
          var dx = ev.clientX - state.touchSeek.x;
          var dy = ev.clientY - state.touchSeek.y;
          if (dx * dx + dy * dy > 144) state.touchMoved = true; // >12px
        }
      });

      stage.addEventListener('pointerup', function (ev) {
        if (state.dragging && ev.pointerId === state.dragPointerId) {
          state.dragging = false;
          state.dragPointerId = null;
          try { stage.releasePointerCapture(ev.pointerId); } catch (e) {}
          stageSeekFromEvent(ev, true);
          return;
        }

        if (state.touchSeek && ev.pointerId === state.touchSeek.id) {
          var moved = state.touchMoved;
          state.touchSeek = null;
          state.touchMoved = false;
          if (!moved) stageSeekFromEvent(ev, true);
        }
      });

      stage.addEventListener('pointercancel', function (ev) {
        if (state.dragging && ev.pointerId === state.dragPointerId) {
          state.dragging = false;
          state.dragPointerId = null;
        }
        if (state.touchSeek && ev.pointerId === state.touchSeek.id) {
          state.touchSeek = null;
          state.touchMoved = false;
        }
      });
    }


    // Animation
    var lastTs = 0;

    function draw(ts) {
      if (!state.running) return;
      if (!ts) ts = 0;
      var dt = Math.min(0.033, Math.max(0.008, (ts - lastTs) / 1000 || 1 / 60));
      lastTs = ts;

      // Smooth progress
      var easing = state.userInteracted ? 0.16 : 0.10;
      state.progress = state.progress + (state.progressTarget - state.progress) * easing;

      // Auto animation (slow step-by-step) until user interacts
if (state.auto && !state.userInteracted && !state.autoDone) {
  var HOLD_SEC = 4.8;   // pause per level (readable)
  var MOVE_SEC = 2.6;   // time to move to next level
  var lastIdx = geom.stops.length - 1;

  // Safety: layout must be ready.
  if (lastIdx >= 0) {
    state.autoStep = clamp(state.autoStep, 0, lastIdx);

    if (state.autoPhase === 'hold') {
      state.progressTarget = geom.stops[state.autoStep];
      state.autoTimer += dt;

      if (state.autoTimer >= HOLD_SEC) {
        if (state.autoStep >= lastIdx) {
          // End of autoplay: stop at the final level.
          state.autoDone = true;
          state.auto = false;
          toggle.checked = false;
        } else {
          state.autoPhase = 'move';
          state.autoTimer = 0;
        }
      }
    } else { // move
      var fromT = geom.stops[state.autoStep];
      var toT = geom.stops[state.autoStep + 1];

      state.autoTimer += dt;
      var pMove = clamp(state.autoTimer / MOVE_SEC, 0, 1);

      // Ease-in-out for smoother movement
      var pEase = (pMove < 0.5)
        ? (2 * pMove * pMove)
        : (1 - Math.pow(-2 * pMove + 2, 2) / 2);

      state.progressTarget = fromT + (toT - fromT) * pEase;

      if (pMove >= 1) {
        state.autoStep += 1;
        state.autoPhase = 'hold';
        state.autoTimer = 0;
      }
    }

    range.value = String(Math.round(state.progressTarget * 100));
  }
}

      var idx = nearestIndexForProgress(state.progress);
      var unlockedIdx = -1;
      for (var ui = 0; ui < geom.stops.length; ui++) {
        if (state.progress >= geom.stops[ui] - 0.0001) unlockedIdx = ui;
      }
      if (!state.userInteracted) {
        setSelectedIndex(idx, false);
      }

      // Unlock confetti bursts when reaching new nodes
      if (unlockedIdx > state.lastUnlockedIndex) {
        for (var u = state.lastUnlockedIndex + 1; u <= unlockedIdx; u++) {
          if (u >= 0) spawnConfettiAt(bezierPoint(geom.stops[u]), 18);
        }
        state.lastUnlockedIndex = unlockedIdx;
      }

      // Update topbar progress (avoid DOM churn)
      var pct = Math.round(clamp(state.progress, 0, 1) * 100);
      if (pct !== state.lastProgressPct) {
        state.lastProgressPct = pct;
        statProgressStrong.textContent = pct + '%';
      }

      // Update unlocked visuals only when unlock state changes
      if (unlockedIdx !== state.renderedUnlockedIndex) {
        state.renderedUnlockedIndex = unlockedIdx;
        updateUnlockedStyles();
      }

      updateMeters();

      // ---- Canvas render ----
      ctx.setTransform(geom.dpr, 0, 0, geom.dpr, 0, 0);
      ctx.clearRect(0, 0, geom.w, geom.h);

      // Background handled by CSS (transparent canvas)

      // Floating dots
      if (!prefersReducedMotion() && state.bgDots.length) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (var bi = 0; bi < state.bgDots.length; bi++) {
          var d = state.bgDots[bi];
          d.x += d.vx * dt;
          d.y += d.vy * dt;
          if (d.x < -0.1) d.x = 1.1; if (d.x > 1.1) d.x = -0.1;
          if (d.y < -0.1) d.y = 1.1; if (d.y > 1.1) d.y = -0.1;

          var px = d.x * geom.w;
          var py = d.y * geom.h;
          ctx.beginPath();
          ctx.arc(px, py, d.r, 0, Math.PI * 2);
          ctx.fillStyle = rgbToCss(accentRgb, d.a);
          ctx.fill();
        }
        ctx.restore();
      }

      // Accent glow around rocket
      var rocketT = clamp(state.progress, 0.02, 0.98);
      var rocketPos = bezierPoint(rocketT);

      var glow = ctx.createRadialGradient(rocketPos.x, rocketPos.y, 0, rocketPos.x, rocketPos.y, geom.w * 0.55);
      glow.addColorStop(0, rgbToCss(accentRgb, isDark ? 0.20 : 0.14));
      glow.addColorStop(1, rgbToCss(accentRgb, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, geom.w, geom.h);
      // Track line (base + progress) — boosted contrast + layered stroke
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (ctx.setLineDash) ctx.setLineDash([]);

      // Base rail (single path, stroked in layers for readability)
      ctx.beginPath();
      ctx.moveTo(geom.p0.x, geom.p0.y);
      ctx.bezierCurveTo(geom.p1.x, geom.p1.y, geom.p2.x, geom.p2.y, geom.p3.x, geom.p3.y);

      // Depth shadow (subtle)
      ctx.strokeStyle = isDark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 14;
      ctx.stroke();

      // Rail base
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.20)' : 'rgba(17,24,39,0.15)';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Inner highlight
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Progress path (gradient + glow) — sampled polyline so we can stop at rocketT
      var grad = ctx.createLinearGradient(geom.p0.x, geom.p0.y, geom.p3.x, geom.p3.y);
      grad.addColorStop(0, rgbToCss(accentRgb, 0.55));
      grad.addColorStop(0.55, rgbToCss(accentRgb, 0.95));
      grad.addColorStop(1, rgbToCss(accentRgb, 0.72));

      var samples = geom.samples;
      var sampleN = (samples && samples.length) ? (samples.length - 1) : 0;
      var endIdx = sampleN ? Math.floor(rocketT * sampleN) : 0;
      if (endIdx < 1) endIdx = 1;
      if (endIdx > sampleN) endIdx = sampleN;

      ctx.beginPath();
      if (samples && samples.length) {
        ctx.moveTo(samples[0].x, samples[0].y);
        for (var si = 1; si <= endIdx; si++) ctx.lineTo(samples[si].x, samples[si].y);
      } else {
        // Fallback (should not happen): direct sampling
        var steps = 90;
        for (var s = 0; s <= steps; s++) {
          var tt = (s / steps) * rocketT;
          var p = bezierPoint(tt);
          if (s === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.lineTo(rocketPos.x, rocketPos.y);

      // Glow under progress
      ctx.strokeStyle = rgbToCss(accentRgb, isDark ? 0.30 : 0.22);
      ctx.lineWidth = 18;
      ctx.stroke();

      // Main progress stroke
      ctx.strokeStyle = grad;
      ctx.lineWidth = 10;
      ctx.stroke();

      // Specular highlight
      ctx.strokeStyle = 'rgba(255,255,255,' + (isDark ? 0.20 : 0.30) + ')';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Dashed hint of remaining path (future)
      if (ctx.setLineDash && samples && samples.length && endIdx < sampleN) {
        ctx.save();
        ctx.setLineDash([4, 10]);
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(17,24,39,0.10)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rocketPos.x, rocketPos.y);
        for (var ri = endIdx + 1; ri <= sampleN; ri++) ctx.lineTo(samples[ri].x, samples[ri].y);
        ctx.stroke();
        ctx.restore();
      }

      // Node dots
      for (var i = 0; i < geom.stops.length; i++) {
        var pt = bezierPoint(geom.stops[i]);
        var unlocked = state.progress >= geom.stops[i] - 0.0001;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = unlocked ? rgbToCss(accentRgb, 0.95) : (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(17,24,39,0.20)');
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
        ctx.strokeStyle = unlocked ? rgbToCss(accentRgb, 0.22) : (isDark ? 'rgba(255,255,255,0.10)' : 'rgba(17,24,39,0.08)');
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Rocket (paper plane)
      var tan = bezierTangent(rocketT);
      var ang = Math.atan2(tan.y, tan.x);

      ctx.save();
      ctx.translate(rocketPos.x, rocketPos.y);
      ctx.rotate(ang);

      // subtle scale pulse
      var pulse = prefersReducedMotion() ? 1 : (1 + Math.sin(ts / 180) * 0.03);
      ctx.scale(pulse, pulse);

      // body
      ctx.fillStyle = rgbToCss(accentRgb, 1);
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-11, -8);
      ctx.lineTo(-2, 0);
      ctx.lineTo(-11, 8);
      ctx.closePath();
      ctx.fill();

      // highlight
      ctx.fillStyle = 'rgba(255,255,255,' + (isDark ? 0.18 : 0.35) + ')';
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-7, -5);
      ctx.lineTo(-1, 0);
      ctx.lineTo(-7, 5);
      ctx.closePath();
      ctx.fill();

      // exhaust spark
      if (!prefersReducedMotion()) {
        ctx.fillStyle = rgbToCss(accentRgb, 0.25);
        for (var e = 0; e < 5; e++) {
          ctx.beginPath();
          ctx.arc(-16 - e * 5 - Math.sin(ts / 120 + e) * 1.2, (Math.random() - 0.5) * 5, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      // Confetti
      if (!prefersReducedMotion() && state.confetti.length) {
        for (var ci = state.confetti.length - 1; ci >= 0; ci--) {
          var c = state.confetti[ci];
          c.age += dt;
          c.x += c.vx * dt;
          c.y += c.vy * dt;
          c.vx *= 0.985;
          c.vy = c.vy * 0.985 + 120 * dt; // gravity
          c.rot += c.vr * dt;

          var lifeLeft = 1 - (c.age / c.life);
          if (lifeLeft <= 0) { state.confetti.splice(ci, 1); continue; }

          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate(c.rot);
          ctx.globalAlpha = 0.55 * lifeLeft;

          // rectangle confetti
          ctx.fillStyle = rgbToCss(accentRgb, 0.85);
          ctx.fillRect(-c.size, -c.size * 0.45, c.size * 2, c.size * 0.9);

          // tiny accent highlight
          ctx.globalAlpha = 0.25 * lifeLeft;
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.fillRect(-c.size * 0.65, -c.size * 0.22, c.size * 1.3, c.size * 0.44);

          ctx.restore();
        }
      }

      global.requestAnimationFrame(draw);
    }

    function start() {
      if (state.running) return;
      state.running = true;
      lastTs = 0;
      global.requestAnimationFrame(draw);
    }

    function stop() { state.running = false; }

    // Slider
    range.addEventListener('input', function () {
      state.userInteracted = true;
      state.auto = false;
      toggle.checked = false;
      var v = clamp(parseInt(range.value, 10) || 0, 0, 100);
      state.progressTarget = clamp(v / 100, 0.02, 0.98);
      setSelectedIndex(nearestIndexForProgress(state.progressTarget), true);
    });

    // Auto toggle
toggle.addEventListener('change', function () {
  state.auto = toggle.checked && !prefersReducedMotion();

  if (state.auto && !state.userInteracted) {
    // Restart slow autoplay sequence from the nearest current level.
    state.autoDone = false;
    state.autoPhase = 'hold';
    state.autoTimer = 0;

    if (geom.stops && geom.stops.length) {
      state.autoStep = nearestIndexForProgress(state.progress);
      state.progressTarget = geom.stops[state.autoStep];
    } else {
      state.progressTarget = clamp(state.progressTarget, 0.02, 0.98);
    }
  }
});

    // Visibility
    if ('IntersectionObserver' in global) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          state.visible = e.isIntersecting && e.intersectionRatio > 0.2;
          if (state.visible) start(); else stop();
        });
      }, { threshold: [0, 0.2, 0.6, 1] });
      io.observe(root);
    } else {
      start();
    }

    // Resize
    var ro = null;
    if ('ResizeObserver' in global) {
      ro = new ResizeObserver(function () { layout(); });
      ro.observe(stage);
    } else {
      global.addEventListener('resize', layout);
    }

    // Init
    initBgDots();
    layout();

    // Start position (optional)
    var startIdx = clamp(initialIndex, 0, levels.length - 1);
    var startT = (geom.stops && geom.stops[startIdx] !== undefined) ? geom.stops[startIdx] : geom.stops[0];

    state.progress = startT;
    state.progressTarget = startT;

    // Prevent initial unlock confetti bursts (important when startLevel > A1)
    var unlockedInit = -1;
    for (var ui = 0; ui < geom.stops.length; ui++) {
      if (state.progress >= geom.stops[ui] - 0.0001) unlockedInit = ui;
    }
    state.lastUnlockedIndex = unlockedInit;
    state.renderedUnlockedIndex = unlockedInit;
    updateUnlockedStyles();

    // Sync UI
    setTrack(state.track);

    // Autoplay continues from the starting level
    state.autoStep = startIdx;
    state.autoPhase = 'hold';
    state.autoTimer = 0;
    state.autoDone = false;

    range.value = String(Math.round(state.progressTarget * 100));

    state.didInit = true;

    start();

    return {
      el: root,
      destroy: function () {
        stop();
        if (ro) ro.disconnect();
        try { targetEl.innerHTML = ''; } catch (e) {}
      }
    };
  }

  // Public API
  var mounted = new WeakMap();

  function mount(target, options) {
    var el = null;
    if (typeof target === 'string') el = document.querySelector(target);
    else if (target && target.nodeType === 1) el = target;

    if (!el) throw new Error('LinguaProgressWidget: target not found');

    var existing = mounted.get(el);
    if (existing && existing.destroy) existing.destroy();

    var inst = makeWidget(el, options || {});
    mounted.set(el, inst);
    return inst;
  }

  function autoMount() {
    var els = document.querySelectorAll('[data-lingua-progress-widget]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (mounted.get(el)) continue;

      var opts = {};
      var lang = el.getAttribute('data-lang');
      if (lang) opts.lang = lang;

      var accent = el.getAttribute('data-accent');
      if (accent) opts.accentColor = accent;

      var bg = el.getAttribute('data-bg');
      if (bg) opts.backgroundColor = bg;

      var text = el.getAttribute('data-text');
      if (text) opts.textColor = text;

      var ctaHref = el.getAttribute('data-cta-href');
      if (ctaHref !== null) opts.ctaHref = ctaHref;

      var ctaText = el.getAttribute('data-cta-text');
      if (ctaText) opts.ctaText = ctaText;

      var title = el.getAttribute('data-title');
      if (title) opts.title = title;

      var subtitle = el.getAttribute('data-subtitle');
      if (subtitle) opts.subtitle = subtitle;

      var track = el.getAttribute('data-track');
      if (track) opts.track = track;

      // Aliases / extra options
      var category = el.getAttribute('data-category');
      if (category && !opts.track) opts.category = category;

      var examples = el.getAttribute('data-examples');
      if (examples === null) examples = el.getAttribute('data-examples-mode');
      if (examples === null) examples = el.getAttribute('data-view');
      if (examples !== null) opts.examplesMode = examples;

      var maxSc = el.getAttribute('data-max-scenarios');
      if (maxSc) opts.maxScenarios = parseInt(maxSc, 10);

      var showHeader = el.getAttribute('data-show-header');
      if (showHeader !== null) opts.showHeader = parseBoolish(showHeader, true);

      var showControls = el.getAttribute('data-show-controls');
      if (showControls !== null) opts.showControls = parseBoolish(showControls, true);

      var showStepper = el.getAttribute('data-show-stepper');
      if (showStepper !== null) opts.showStepper = parseBoolish(showStepper, true);

      var layout = el.getAttribute('data-layout');
      if (layout !== null) opts.layout = layout;

      var splitTh = el.getAttribute('data-split-threshold');
      if (splitTh !== null) opts.splitThreshold = parseInt(splitTh, 10);

      var enableSeek = el.getAttribute('data-enable-seek');
      if (enableSeek === null) enableSeek = el.getAttribute('data-seek');
      if (enableSeek !== null) opts.enableSeek = parseBoolish(enableSeek, true);

      var enableDrag = el.getAttribute('data-enable-drag');
      if (enableDrag === null) enableDrag = el.getAttribute('data-drag');
      if (enableDrag !== null) opts.enableDrag = parseBoolish(enableDrag, true);

      var showTabs = el.getAttribute('data-show-tabs');
      if (showTabs !== null) opts.showTabs = parseBoolish(showTabs, true);

      var showMeters = el.getAttribute('data-show-meters');
      if (showMeters !== null) opts.showMeters = parseBoolish(showMeters, true);

      var lockTrack = el.getAttribute('data-lock-track');
      if (lockTrack !== null) opts.lockTrack = parseBoolish(lockTrack, false);

      var showCta = el.getAttribute('data-show-cta');
      if (showCta !== null) opts.showCta = parseBoolish(showCta, true);

      var canvasH = el.getAttribute('data-canvas-h');
      if (canvasH === null) canvasH = el.getAttribute('data-canvas-height');
      if (canvasH) opts.canvasHeight = parseFloat(canvasH);

      var canvasHSm = el.getAttribute('data-canvas-h-sm');
      if (canvasHSm === null) canvasHSm = el.getAttribute('data-canvas-height-sm');
      if (canvasHSm) opts.canvasHeightMobile = parseFloat(canvasHSm);

      var startLevel = el.getAttribute('data-start-level');
      if (startLevel) opts.startLevel = startLevel;

      // Optional: data-autoplay / data-auto (0/false/no/off disables)
      var autoplay = el.getAttribute('data-autoplay');
      if (autoplay === null) autoplay = el.getAttribute('data-auto');
      if (autoplay !== null) {
        var v = String(autoplay).toLowerCase().trim();
        opts.autoplay = !(v === '0' || v === 'false' || v === 'no' || v === 'off');
      }

      var radius = el.getAttribute('data-radius');
      if (radius) opts.radiusPx = parseFloat(radius);

      mount(el, opts);
    }
  }

  global.LinguaProgressWidget = {
    __version__: VERSION,
    mount: mount,
    autoMount: autoMount
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
})(window);
