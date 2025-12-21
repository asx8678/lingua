# Repository Guidelines

## Project Structure & Module Organization

- `src/pages/` contains Astro routes; API endpoints live in `src/pages/api/`.
- `src/components/` holds reusable UI blocks (PascalCase `.astro` files).
- `src/layouts/` provides page layout shells.
- `src/content/` stores Markdown blog posts.
- `src/data/` and `src/config/` contain JSON/TS data and site constants.
- `src/styles/` hosts global styles (Tailwind entry at `src/styles/global.css`).
- `public/` includes static assets like `/images/*.svg` and `/cennik-lingua.pdf`.
- `dist/` is build output (generated, do not edit).

## Build, Test, and Development Commands

- `npm run dev` starts the local Astro dev server (default `http://localhost:4321`).
- `npm run build` generates a production build in `dist/`.
- `npm run preview` serves the built site locally.
- `npm run check` / `npm run lint` run `astro check` (type + content validation).
- `npm run format` / `npm run format:check` run Prettier across the repo.
- `npm run cf:dev` builds then runs a Workers preview via Wrangler.
- `npm run cf:deploy` builds then deploys to Cloudflare Workers.

## Coding Style & Naming Conventions

- Use 2-space indentation; rely on Prettier for formatting.
- `.astro` pages are kebab-case (e.g., `src/pages/angielski-online.astro`).
- Components use PascalCase filenames (e.g., `src/components/PriceCalculator.astro`).
- Keep Tailwind classes readable; prefer small, composable components.

## Testing Guidelines

- No dedicated unit test framework is configured.
- Run `npm run check` and `npm run build` before submitting changes.
- If you add tests, document the tool and location in this file.

## Commit & Pull Request Guidelines

- Commit messages are short, imperative, and sentence case (e.g., "Enable workers.dev and preview URLs").
- PRs should include a brief summary, the commands run, and screenshots for UI changes.
- If you add or change env vars, update `.env.example` and note it in the PR.

## Configuration & Deployment Notes

- Public contact settings live in `.env` (`PUBLIC_CONTACT_*` keys).
- Cloudflare config is in `wrangler.toml` or `wrangler.jsonc`; update `compatibility_date` before deploys.
