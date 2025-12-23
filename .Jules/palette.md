## 2024-05-23 - Animating Native Details Element with Tailwind
**Learning:** Native `<details>` element state can be styled in Tailwind using the `group` class on the `<details>` element and `group-open:` modifiers on descendants. This allows for complex animations (like hamburger to X) without JavaScript state management for styling.
**Action:** Use `details.group` and `group-open:` for future accessible disclosure widgets instead of custom JS toggles where possible.
