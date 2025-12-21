import { defineMiddleware } from "astro:middleware";
import { generateNonce, buildCSPHeader } from "./lib/csp";

export const onRequest = defineMiddleware(async (context, next) => {
  // Generate nonce for this request
  const nonce = generateNonce();

  // Store nonce in locals for use in templates
  context.locals.cspNonce = nonce;

  const response = await next();

  // Only apply CSP to HTML responses
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

    // Security headers
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
    newResponse.headers.set("X-Frame-Options", "DENY");
    newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newResponse.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    newResponse.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    newResponse.headers.set("Content-Security-Policy", buildCSPHeader(nonce));

    return newResponse;
  }

  // For non-HTML responses, just add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
});
