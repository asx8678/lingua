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
  const isProd = import.meta.env.PROD;

  const policy = [
    "default-src 'self'",
    "base-uri 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://www.google-analytics.com`,
    `style-src 'self' 'unsafe-inline'`,
    "img-src 'self' data: https:",
    "font-src 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "frame-ancestors 'none'",
  ];

  if (isProd) {
    policy.push("upgrade-insecure-requests");
  }

  return policy.join("; ");
}

/**
 * Nonce context key for Astro locals
 */
export const NONCE_KEY = "cspNonce" as const;
