# Bolt's Journal

## 2024-05-22 - Initial Setup
**Learning:** This is the first run.
**Action:** Start by exploring the codebase.

## 2024-05-22 - Avoid `cache: 'no-store'` for large static assets
**Learning:** `fetch(url, { cache: 'no-store' })` overrides server-side caching headers (like `Cache-Control`) and forces a network download on every request. For large files (e.g., 400KB+ JSON), this significantly impacts bandwidth and latency for repeat visitors.
**Action:** Use `fetch(url)` (default) to respect standard HTTP caching headers, or `force-cache` if appropriate. Only use `no-store` for sensitive or highly dynamic data that must never be cached.
