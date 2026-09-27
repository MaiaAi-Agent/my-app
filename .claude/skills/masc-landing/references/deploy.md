# Deploy a MASC landing (Vercel project `maia-ai2/my-app`)

Vercel is connected to this repo: every push to a branch gets a **Preview** deployment (link posted by `vercel[bot]` in the PR), `main` deploys to **Production**.

## Env vars (Vercel → project → Settings → Environment Variables)

| Var | Needed | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_WEBHOOK_URL` (or `WEBHOOK_URL`) | yes | n8n webhook, e.g. `https://n8n.mageek.club/webhook/site-lead`. Read server-side in `/api/lead` at request time; never reaches the browser |
| `NEXT_PUBLIC_MARATHON_START` (per-landing date vars) | no | Inlined at **build** time |

Tell the user explicitly:
1. Tick **Production and Preview** (All Preview branches). Most «Реєстрація тимчасово недоступна» reports are a var set for Production only while testing a Preview.
2. Env changes only apply to **new** deployments → Deployments → the right row → «⋯» → Redeploy. Redeploying a Production row does nothing for the branch preview, and vice versa.
3. No CORS setup in n8n is needed (browser only talks to its own `/api/lead`).

## Testing before merge

- Open the **branch's Preview** row (commit message of the latest push, branch icon), not the Production rows — those show `main`.
- If Chrome warns «Did you mean claude.ai?» (branch name in hostname), use the deployment's hash URL `my-xxxxxxxx-maia-ai2.vercel.app` from its page, or click Ignore — it's their own team.
- Submit a test email → expect «Дякуємо! Перевір email» and a new execution in n8n.

## Launch

1. Merge the PR → Production deploy is automatic.
2. Custom domain: Settings → Domains → add e.g. `marathon.masc.space`, then a CNAME at the `masc.space` DNS to the value Vercel shows. A path on the main site (`masc.space/<slug>`) is a different project (`Trust60/nextjs-masc`) — needs the page ported there or a rewrite in that project.
3. Pre-launch checklist: confirmation email in n8n (the page promises «Перевір email»), start date var, real logo SVG, Lighthouse ≥85 on the production URL, UTM links in `facebook-creatives.md` point to the final domain.

You (Claude) can push, open/merge PRs. You cannot touch Vercel settings, n8n or DNS — give the user exact clicks.
