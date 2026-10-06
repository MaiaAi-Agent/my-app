const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9_-]{1,40}$/;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const UTM_VALUE_RE = /^[\p{L}\p{N}_\-.~%+:| ]{1,100}$/u;

function parseUtm(raw: unknown): Record<string, string> | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const input = raw as Record<string, unknown>;
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = input[key];
    if (typeof value === "string" && UTM_VALUE_RE.test(value)) {
      utm[key] = value;
    }
  }
  return Object.keys(utm).length ? utm : undefined;
}

function webhookUrl() {
  const env = process.env;
  return env.WEBHOOK_URL || env[["NEXT_PUBLIC", "WEBHOOK_URL"].join("_")];
}

export async function POST(request: Request) {
  const url = webhookUrl();
  if (!url) {
    console.error(
      "[testdrive-lead] WEBHOOK_URL / NEXT_PUBLIC_WEBHOOK_URL is not set",
    );
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    source?: unknown;
    utm?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const source = typeof body.source === "string" ? body.source : "";

  if (
    name.length < 2 ||
    name.length > 100 ||
    !EMAIL_RE.test(email) ||
    email.length > 200 ||
    phone.length < 7 ||
    phone.length > 20 ||
    !SLUG_RE.test(source)
  ) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const payload: Record<string, unknown> = {
    name,
    email,
    phone,
    source,
    timestamp: new Date().toISOString(),
  };
  const utm = parseUtm(body.utm);
  if (utm) payload.utm = utm;

  try {
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!upstream.ok) {
      console.error(
        `[testdrive-lead] webhook responded ${upstream.status}`,
      );
      return Response.json({ error: "upstream_error" }, { status: 503 });
    }
  } catch (err) {
    console.error("[testdrive-lead] webhook request failed:", err);
    return Response.json({ error: "upstream_error" }, { status: 503 });
  }

  return Response.json({ ok: true });
}
