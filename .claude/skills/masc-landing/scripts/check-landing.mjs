// Smoke-test a MASC landing: layout at 375/1280, audience sync, form states.
// Usage: node check-landing.mjs <url> [outDir=.]
// Needs the app running with WEBHOOK_URL pointing at fake-webhook.mjs.
import { loadChromium } from "./_playwright.mjs";

const [url, outDir = "."] = process.argv.slice(2);
if (!url) {
  console.error("Usage: node check-landing.mjs <url> [outDir]");
  process.exit(2);
}

const failures = [];
const check = (ok, msg) => {
  console.log(`${ok ? "✓" : "✗"} ${msg}`);
  if (!ok) failures.push(msg);
};

const browser = await loadChromium().launch({
  executablePath: process.env.CHROMIUM_PATH,
});
try {
  for (const [w, h, name] of [
    [375, 800, "mobile"],
    [1280, 900, "desktop"],
  ]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(url);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    check(sw <= w, `${name}: no horizontal scroll (${sw}px)`);
    await page.screenshot({
      path: `${outDir}/landing-${name}.png`,
      fullPage: true,
    });
    if (name !== "desktop") continue;

    const toggles = page.locator("fieldset button");
    const select = page.locator("form select");
    const n = await toggles.count();
    check(n >= 2, `audience toggle has ${n} buttons`);
    await toggles.nth(n - 1).click();
    const lastValue = await select
      .locator("option")
      .nth(n - 1)
      .getAttribute("value");
    check((await select.inputValue()) === lastValue, "toggle → select sync");
    await select.selectOption({ index: 0 });
    check(
      (await toggles.nth(0).getAttribute("aria-pressed")) === "true",
      "select → toggle sync",
    );

    const email = page.locator('form input[type="email"]');
    await email.fill("not-an-email");
    await page.locator('form button[type="submit"]').click();
    check(
      await page.locator('form [role="alert"]').isVisible(),
      "invalid email shows error",
    );

    await email.fill("test@example.com");
    await page
      .locator('form input[type="checkbox"]')
      .check()
      .catch(() => {});
    await page.locator('form button[type="submit"]').click();
    const ok = await page
      .locator("output")
      .waitFor({ timeout: 10_000 })
      .then(() => true)
      .catch(() => false);
    check(ok, "valid email shows success state");
    if (ok) {
      await page.waitForTimeout(5_500);
      check(await page.locator("form").isVisible(), "form returns after 5 s");
    } else {
      const alert = await page
        .locator('form [role="alert"]')
        .textContent()
        .catch(() => "");
      console.log(`  error shown: ${alert}`);
    }
  }
} finally {
  await browser.close();
}

console.log(
  failures.length
    ? `\n${failures.length} check(s) failed`
    : "\nall checks passed",
);
process.exit(failures.length ? 1 : 0);
