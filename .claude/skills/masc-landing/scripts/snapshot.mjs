// Write a JS-free static snapshot of a running landing (for quick review).
// Usage: node snapshot.mjs <url> <out.html>
import { writeFileSync } from "node:fs";
import { loadChromium } from "./_playwright.mjs";

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error("Usage: node snapshot.mjs <url> <out.html>");
  process.exit(2);
}

const browser = await loadChromium().launch({
  executablePath: process.env.CHROMIUM_PATH,
});
const page = await browser.newPage();
await page.goto(url);
const html = await page.evaluate(async (src) => {
  const css = [];
  for (const l of document.querySelectorAll('link[rel="stylesheet"]')) {
    css.push(await (await fetch(l.href)).text());
  }
  const doc = document.documentElement.cloneNode(true);
  for (const e of doc.querySelectorAll(
    'script, link[rel="stylesheet"], link[as]',
  )) {
    e.remove();
  }
  const style = document.createElement("style");
  style.textContent = css.join("\n");
  doc.querySelector("head").appendChild(style);
  return `<!DOCTYPE html>\n<!-- Static snapshot of ${src} (no JS: toggle and form are not interactive). Regenerate with .claude/skills/masc-landing/scripts/snapshot.mjs -->\n${doc.outerHTML}`;
}, new URL(url).pathname);
writeFileSync(out, html);
await browser.close();
console.log(`wrote ${out}`);
