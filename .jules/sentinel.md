# Sentinel Journal

This journal tracks CRITICAL security learnings, vulnerabilities, and patterns specific to this codebase.

## Format
`## YYYY-MM-DD - [Title]`
`**Vulnerability:** [What you found]`
`**Learning:** [Why it existed]`
`**Prevention:** [How to avoid next time]`

## 2025-12-26 - CSP Hardening
**Vulnerability:** Missing `base-uri`, `object-src`, and `form-action` in Content Security Policy allowed potential Base Tag Hijacking and unrestricted form submissions.
**Learning:** Default CSP configurations often overlook these directives, focusing mainly on `script-src` and `style-src`.
**Prevention:** Always strictly define `base-uri 'self'`, `object-src 'none'`, and `form-action 'self'` in `src/lib/csp.ts` to reduce attack surface.
