import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    /* Test configuration */
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}"],
    exclude: ["node_modules", "dist", ".astro"],

    /* Environment */
    environment: "node",

    /* Coverage configuration */
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        ".astro/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/types/**",
      ],
    },

    /* Globals for cleaner test syntax */
    globals: true,

    /* Setup files */
    setupFiles: ["./src/test/setup.ts"],
  },
});
