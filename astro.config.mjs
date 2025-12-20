import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const SITEMAP_EXCLUDE = new Set([
  "/lekcje-angielskiego-online",
  "/kurs-angielskiego-online",
]);

// https://astro.build/config
export default defineConfig({
  site: "https://lingualegionowo.pl",
  output: "static",
  trailingSlash: "never",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !SITEMAP_EXCLUDE.has(pathname);
      },
    }),
  ],
});
