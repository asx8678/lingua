# Codex Prompt: Visual & Content Improvements for Lingua Website

## Overview
Implement visual enhancements, content decluttering, and add placeholder infrastructure for images/videos across the Lingua language school website.

---

## TASK 1: Create Video/Image Placeholder Infrastructure

### 1.1 Create a new component `src/components/HeroMedia.astro`
```astro
---
interface Props {
  type: 'image' | 'video';
  src: string;
  poster?: string; // for video
  alt: string;
  class?: string;
}

const { type, src, poster, alt, class: className = '' } = Astro.props;
---

{type === 'video' ? (
  <div class={`relative overflow-hidden rounded-3xl ${className}`}>
    <video
      autoplay
      muted
      loop
      playsinline
      poster={poster}
      class="h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
  </div>
) : (
  <img
    src={src}
    alt={alt}
    loading="eager"
    class={`w-full rounded-3xl border border-slate-200 shadow-soft ${className}`}
  />
)}
```

### 1.2 Create placeholder images directory structure
Create empty directories for future assets:
- `public/images/heroes/` - for page-specific hero images
- `public/images/icons/` - for pricing and feature icons
- `public/videos/` - for Sora-generated videos

### 1.3 Create placeholder SVG icons for pricing cards
Create `public/images/icons/person-1.svg`, `person-2.svg`, `person-3.svg` - simple silhouette icons showing 1, 2, and 3 people respectively.

---

## TASK 2: Homepage Improvements (`src/pages/index.astro`)

### 2.1 Update hero highlights to be more catchy
Replace the current `highlights` array:
```javascript
const highlights = [
  "Zajęcia stacjonarne w Legionowie",
  "Lekcje online dopasowane do grafiku",
  "Poziomy od A1 do C1",
];
```

With benefit-focused messaging:
```javascript
const highlights = [
  "Mówisz od pierwszej lekcji",
  "Bezpłatna lekcja próbna",
  "Elastyczne terminy i formy zajęć",
];
```

### 2.2 Add statistics section after hero
Add a new section between hero and "Czego uczymy" with animated counters:
```astro
<section class="border-y border-slate-200 bg-white py-12">
  <div class="container-site">
    <div class="grid gap-8 text-center sm:grid-cols-3">
      <div>
        <div class="text-4xl font-extrabold text-primary">500+</div>
        <div class="mt-2 text-sm text-slate-600">zadowolonych kursantów</div>
      </div>
      <div>
        <div class="text-4xl font-extrabold text-primary">10+</div>
        <div class="mt-2 text-sm text-slate-600">lat doświadczenia</div>
      </div>
      <div>
        <div class="text-4xl font-extrabold text-primary">4.9/5</div>
        <div class="mt-2 text-sm text-slate-600">średnia ocena</div>
      </div>
    </div>
  </div>
</section>
```

### 2.3 Add icons to "Jak pracujemy" steps
Update the steps array to include icons:
```javascript
const steps = [
  {
    icon: "🎯", // or use SVG path
    title: "Rozmowa i diagnoza",
    text: "Poznajemy Twój cel, poziom i preferowany tryb zajęć.",
  },
  {
    icon: "📋",
    title: "Plan nauki i materiały",
    text: "Dostajesz plan na 4–12 tygodni z konkretnymi tematami.",
  },
  {
    icon: "💬",
    title: "Lekcje + feedback",
    text: "Na zajęciach mówisz od pierwszych minut. Po lekcji dostajesz wskazówki.",
  },
];
```

---

## TASK 3: Declutter `angielski-online.astro`

### 3.1 Simplify the page structure
Reduce from 7 sections to 5 by:

1. **Keep Hero** - but simplify the benefits cards (reduce from 3 to show inline)
2. **Merge "Co dostajesz" into hero** - remove as separate section
3. **Keep "Lekcje angielskiego online"** section with format cards
4. **Remove "Kurs angielskiego online"** section - it duplicates content
5. **Keep FAQ**
6. **Keep CTA**

### 3.2 Consolidate overlapping lists
Remove `courseOutcomes` and `courseGoals` arrays entirely. Keep only:
- `benefits` (3 items)
- `lessonFormats` (3 items)
- `faqs`

### 3.3 Simplified page structure:
```astro
<!-- Section 1: Hero with integrated benefits -->
<section class="hero-bg">
  <!-- Hero content with video placeholder -->
  <!-- Benefits as inline chips/badges, not cards -->
</section>

<!-- Section 2: Lesson formats (1:1, mini-grupa, konwersacje) -->
<section class="section">
  <!-- 3 format cards only -->
</section>

<!-- Section 3: How online lessons work (simplified) -->
<section class="section section-muted">
  <!-- 4 simple steps with icons -->
</section>

<!-- Section 4: FAQ -->
<FaqSection ... />

<!-- Section 5: CTA -->
<CTASection ... />
```

---

## TASK 4: Improve `angielski-stacjonarnie.astro`

### 4.1 Reduce "Dla kogo" list from 6 to 4 items
Keep only the most impactful:
```javascript
const forWhom = [
  "Osoby preferujące bezpośredni kontakt z nauczycielem",
  "Uczniowie przygotowujący się do egzaminów",
  "Dorośli rozwijający umiejętności konwersacyjne",
  "Profesjonaliści potrzebujący Business English",
];
```

### 4.2 Enhance location section with visual
Replace the plain text location card with:
```astro
<section class="section section-muted">
  <div class="container-site">
    <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
      <div class="card p-8">
        <h2 class="text-2xl font-extrabold">Nasza lokalizacja</h2>
        <p class="mt-4 text-slate-600">
          Szkoła Lingua znajduje się w centrum Legionowa, z łatwym dojazdem
          komunikacją miejską i dostępnym parkingiem.
        </p>
        <div class="mt-6">
          <a class="btn btn-primary" href="/kontakt">Skontaktuj się z nami</a>
        </div>
      </div>
      <!-- Placeholder for map illustration or photo -->
      <div class="aspect-video rounded-2xl bg-slate-100 flex items-center justify-center">
        <span class="text-slate-400">📍 Mapa/zdjęcie lokalizacji</span>
      </div>
    </div>
  </div>
</section>
```

---

## TASK 5: Improve `o-nas.astro`

### 5.1 Add team/school image placeholder in hero
Update the hero grid to include an image:
```astro
<div class="grid gap-10 lg:grid-cols-2 lg:items-start">
  <div>
    <!-- existing hero text content -->
  </div>

  <!-- Add image placeholder -->
  <div class="relative">
    <div class="aspect-[4/3] rounded-3xl bg-slate-100 flex items-center justify-center border border-slate-200">
      <span class="text-slate-400 text-center p-4">
        📸 Zdjęcie zespołu lub wnętrza szkoły
      </span>
    </div>
  </div>
</div>
```

### 5.2 Move "Jak pracujemy" card below the image placeholder
Keep the process steps but make them more visual with numbered badges.

---

## TASK 6: Improve `cennik.astro`

### 6.1 Add person icons to pricing cards
Update the pricing cards to show visual representation:
```astro
<div class="card p-6">
  <!-- Add icon at top -->
  <div class="mb-4 flex justify-center">
    <div class="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
      <span class="text-2xl">👤</span> <!-- or SVG icon -->
    </div>
  </div>
  <div class="text-xs font-bold uppercase tracking-widest text-slate-500 text-center">{item.title}</div>
  <!-- rest of card content -->
</div>
```

Use different icons:
- 1:1 → single person icon
- Duet → two people icon
- Trójka → three people icon

---

## TASK 7: Improve `kontakt.astro`

### 7.1 Add location visual element
Add a decorative map or location image in the hero section:
```astro
<section class="hero-bg">
  <div class="container-site py-16 sm:py-20">
    <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
      <div>
        <!-- existing content -->

        <!-- Add location visual after the info cards -->
        <div class="mt-8 aspect-video rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200">
          <span class="text-slate-400">📍 Mapa Legionowa</span>
        </div>
      </div>

      <div class="card p-6" id="formularz">
        <!-- existing form -->
      </div>
    </div>
  </div>
</section>
```

---

## TASK 8: Create Video Placeholder Component

### 8.1 Create `src/components/VideoPlaceholder.astro`
For pages where Sora videos will be added later:
```astro
---
interface Props {
  aspectRatio?: 'video' | 'square' | 'portrait';
  label: string;
}

const { aspectRatio = 'video', label } = Astro.props;

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
};
---

<div class={`${aspectClasses[aspectRatio]} rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200 overflow-hidden relative`}>
  <div class="text-center p-6">
    <div class="text-4xl mb-3">🎬</div>
    <span class="text-slate-500 text-sm">{label}</span>
  </div>
  <!-- Animated gradient overlay to indicate video placeholder -->
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
</div>

<style>
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
</style>
```

---

## TASK 9: Update Hero Images Per Page

Replace `/images/hero.svg` references with page-specific placeholders:

| Page | Current | New Path | Description |
|------|---------|----------|-------------|
| `index.astro` | `/images/hero.svg` | `/images/heroes/homepage.jpg` | Classroom/team photo |
| `angielski-stacjonarnie.astro` | `/images/hero.svg` | `/images/heroes/stacjonarnie.jpg` | In-person teaching |
| `angielski-online.astro` | N/A (cards) | `/images/heroes/online.jpg` | Laptop/video call |
| `cennik.astro` | N/A | `/images/heroes/cennik.jpg` | Calculator visual |

For now, create placeholder divs that will be replaced with actual images:
```astro
<div class="relative aspect-[4/3] rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center">
  <span class="text-slate-400">Placeholder: [description]</span>
</div>
```

---

## Summary of Files to Modify

1. `src/components/HeroMedia.astro` - CREATE
2. `src/components/VideoPlaceholder.astro` - CREATE
3. `src/pages/index.astro` - UPDATE (highlights, add stats section)
4. `src/pages/angielski-online.astro` - UPDATE (major declutter)
5. `src/pages/angielski-stacjonarnie.astro` - UPDATE (reduce list, enhance location)
6. `src/pages/o-nas.astro` - UPDATE (add team image placeholder)
7. `src/pages/cennik.astro` - UPDATE (add icons to pricing cards)
8. `src/pages/kontakt.astro` - UPDATE (add map placeholder)

---

## Sora Video Prompts (Reference)

When generating videos with Sora, use these prompts:

1. **Homepage Hero**: "Cozy language school classroom in Poland, warm natural lighting through large windows, books on wooden desk, student writing notes, coffee cup steaming, slow motion, bokeh background, cinematic 4K, 10 second loop"

2. **Online Learning**: "Modern home office setup, person wearing wireless headphones on laptop video call with teacher, floating UI elements with English vocabulary words appearing and disappearing, clean minimal animation, soft blue ambient lighting, 4K"

3. **Stacjonarnie**: "Close-up of teacher and student at desk in language school, pointing at textbook, warm lamp lighting, bookshelves in background, engaged conversation, documentary style, natural colors, 4K"

4. **Abstract Learning**: "Flowing abstract shapes transforming into letters and words, soft gradient colors (blue, purple, orange), smooth organic movement, educational and inspiring mood, seamless loop, 4K"
