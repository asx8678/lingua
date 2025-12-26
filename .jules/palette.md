## 2024-05-22 - Loading State Patterns
**Learning:** `TestPoziomu.astro` handles loading by manipulating the DOM directly in vanilla JS.
**Action:** When enhancing loading states, ensure both visual (spinner) and accessibility (aria-busy, disabled) attributes are updated. Use `page.evaluate` to mock slow network requests for reliable verification.

## 2024-05-22 - Form Label Association
**Learning:** Some custom form controls in `TestPoziomu.astro` used `<span>` for labels instead of `<label>`, breaking accessibility for screen readers and click-to-focus.
**Action:** Always check that visual labels are semantically associated with their inputs using `<label for="id">` or `aria-labelledby`, even in complex layouts.
