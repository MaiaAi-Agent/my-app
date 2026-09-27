// Resolve Playwright from the project, then from the global install.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const candidates = [
  "playwright",
  "/opt/node22/lib/node_modules/playwright",
  `${process.env.npm_config_prefix ?? ""}/lib/node_modules/playwright`,
];

export function loadChromium() {
  for (const c of candidates) {
    try {
      return require(c).chromium;
    } catch {}
  }
  throw new Error(
    "Playwright not found. Install it (npm i -g playwright) or run in the cloud sandbox.",
  );
}
