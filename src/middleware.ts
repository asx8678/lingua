import { defineMiddleware } from "astro:middleware";
import { generateNonce, buildCSPHeader } from "./lib/csp";

export const onRequest = defineMiddleware(async (context, next) => {
  // Generate nonce for this request
  const nonce = generateNonce();

  // Store nonce in locals for use in templates
  context.locals.cspNonce = nonce;

  const response = await next();

  // Apply global security headers to ALL responses
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  // Only apply CSP and HTML-specific processing to HTML responses
  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("text/html")) {
    // Inject nonce into inline scripts and styles
    const html = await response.text();
    const nonceAttr = `nonce="${nonce}"`;

    // Replace inline scripts with nonced versions
    const modifiedHtml = html
      .replace(/<script(?![^>]*\bsrc=)([^>]*)>/gi, `<script ${nonceAttr}$1>`)
      .replace(/<style([^>]*)>/gi, `<style ${nonceAttr}$1>`);

    // Create new response with modified HTML and CSP header
    const newResponse = new Response(modifiedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Add additional HTML-specific headers
    newResponse.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    newResponse.headers.set("Content-Security-Policy", buildCSPHeader(nonce));

    return newResponse;
  }

  return response;
});
