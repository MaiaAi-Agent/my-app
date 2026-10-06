const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9() .\-]{7,25}$/;
const FORM_SOURCE_RE = /^(page|popup)$/;
const CAMPAIGN_SOURCE = "masc-ai-business";
const DEFAULT_AUDIENCE = "business";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_placement", "fbclid"] as const;
const UTM_RE = /^[^\u0000-\u001F\u007F]{1,200}$/;

function attribution(body: RequestBody) {
  return Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = body[key];
      return typeof value === "string" && UTM_RE.test(value.trim()) ? [[key, value.trim()]] : [];
    }),
  );
}

function webhookUrl() {
  const env = process.env;
  return env.WEBHOOK_URL || env[["NEXT_PUBLIC", "WEBHOOK_URL"].join("_")];
}

type RequestBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  source?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_content?: unknown;
  utm_term?: unknown;
  utm_placement?: unknown;
  fbclid?: unknown;
};

export async function POST(request: Request) {
  const url = webhookUrl();
  if (!url) {
    console.error("[business-test-drive-register] WEBHOOK_URL / NEXT_PUBLIC_WEBHOOK_URL is not set");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const formType = typeof body.source === "string" ? body.source : "";

  if (!name || !EMAIL_RE.test(email) || !PHONE_RE.test(phone) || !FORM_SOURCE_RE.test(formType)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        source: CAMPAIGN_SOURCE,
        form_type: formType,
        audience: DEFAULT_AUDIENCE,
        timestamp: new Date().toISOString(),
        ...attribution(body),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`[business-test-drive-register] webhook responded ${res.status}`);
      return Response.json({ error: "upstream" }, { status: 502 });
    }
  } catch (error) {
    console.error("[business-test-drive-register] webhook request failed", error);
    return Response.json({ error: "upstream" }, { status: 502 });
  }

  return Response.json({ success: true });
}
