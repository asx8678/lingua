/**
 * Content Security Policy utilities
 * Generates nonces and CSP headers for secure inline scripts
 */

/**
 * Generate a cryptographically secure random nonce
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

/**
 * Build CSP header value with nonce support
 */
export function buildCSPHeader(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-ancestors 'none'",
  ].join("; ");
}

/**
 * Nonce context key for Astro locals
 */
export const NONCE_KEY = "cspNonce" as const;
