import { existsSync } from "node:fs";
import { join } from "node:path";

const workerEntry = join(process.cwd(), "dist", "_worker.js", "index.js");

if (!existsSync(workerEntry)) {
  console.error("[build] Missing Cloudflare worker entrypoint at dist/_worker.js/index.js.");
  console.error(
    "[build] Astro likely built in static mode. Ensure output is 'server' and the Cloudflare adapter is enabled."
  );
  process.exit(1);
}
