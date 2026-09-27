const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Shared by every landing: each sends its own `source` slug and audience keys.
const SLUG_RE = /^[a-z0-9_-]{1,40}$/;

// Read at request time. A dynamic lookup keeps Next.js from inlining the
// NEXT_PUBLIC_ value at build time, so a changed Vercel env var only needs
// a redeploy, and the webhook URL never ships to the browser.
function webhookUrl() {
  const env = process.env;
  return env.WEBHOOK_URL || env[["NEXT_PUBLIC", "WEBHOOK_URL"].join("_")];
}

export async function POST(request: Request) {
  const url = webhookUrl();
  if (!url) {
    console.error("[lead] WEBHOOK_URL / NEXT_PUBLIC_WEBHOOK_URL is not set");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { email?: unknown; audience?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const audience = typeof body.audience === "string" ? body.audience : "";
  const source = typeof body.source === "string" ? body.source : "";
  if (
    !EMAIL_RE.test(email) ||
    !SLUG_RE.test(audience) ||
    !SLUG_RE.test(source)
  ) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        audience,
        source,
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[lead] webhook responded ${res.status}`);
      return Response.json({ error: "upstream" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] webhook request failed", err);
    return Response.json({ error: "upstream" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
