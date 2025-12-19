import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  trailingSlash: "never",
  integrations: [tailwind({ applyBaseStyles: false })],
  adapter: cloudflare({
    // Enables local Cloudflare runtime emulation when using `astro dev`.
    // If you don't need Cloudflare bindings locally, you can remove this.
    platformProxy: { enabled: true },
  }),
});
