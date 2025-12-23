/**
 * Application-wide constants
 * Centralizes magic strings and configuration values
 */

// Local storage keys for client-side throttling
export const STORAGE_KEYS = {
  contactThrottle: "lingua-contact-throttle",
  signupThrottle: "lingua-signup-throttle",
} as const;

// Throttle duration in milliseconds
export const THROTTLE_MS = 60 * 1000; // 60 seconds

// Form honeypot field name
export const HONEYPOT_FIELD = "website";

// Response time text (used in multiple places)
export const RESPONSE_TIME_TEXT = "1–2 dni roboczych";

// API endpoints
export const API_ENDPOINTS = {
  contact: "/api/kontakt",
  signup: "/api/zapisy",
} as const;

// CSS class names for form states
export const FORM_CLASSES = {
  hidden: "hidden",
  loading: "inline-flex",
  error: "border-rose-200 bg-rose-50 text-rose-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
} as const;

// Aria attributes
export const ARIA_ATTRS = {
  invalid: "aria-invalid",
  busy: "aria-busy",
  live: "aria-live",
  expanded: "aria-expanded",
} as const;

// Nonce attribute name for CSP
export const CSP_NONCE_ATTR = "data-csp-nonce";
