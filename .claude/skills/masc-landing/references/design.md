# MASC visual presets

Derived from the live pages on next.masc.space (screenshots, Sept 2026). The reference implementation (`src/app/landings/ai-agents-marathon/marathon.module.css`) is the **dark-lime** preset — copy its CSS and swap tokens for the others.

## Shared language (all presets)

- Max content width ~1120px, 16px side gutter; sections separated by a 1px border line, 56px (mobile) / 80px (desktop) vertical padding.
- Cards: 1px subtle border, radius 16px, flat surface a notch lighter than the page.
- Section heading (h2): bold 800, tight tracking (-0.03em), **32×3px accent bar under it**.
- Accent word inside headings (`<span class="accent">`), e.g. «Що буде **на ефірі**».
- Hero: small uppercase badge with a glowing dot → big headline (Unbounded 800, uppercase, accent word) → 1–2 sentence subtitle → chips (date / time / «Live online» / «Безкоштовно»; filled accent chip for date) → primary CTA → small grey note.
- Primary CTA: filled accent, radius 14px, 56px tall, bold, trailing arrow icon, soft accent glow shadow. Header CTA: outlined accent pill with arrow.
- Icon tiles: 48px rounded square, border, accent-colored stroke icon.
- «Для кого» block: 3 icon cards («…для тебе, якщо ти…»), selected card gets accent border.
- Steps/program: numbered «01 02 03» in display font, accent color.
- Footer: `MASC | Люди. Ідеї. AI-агенти. / Реальні навички для реальних задач.` + underlined accent link on the right.
- Fonts: Manrope (body, via `next/font`, `latin`+`cyrillic`) + Unbounded 800 (hero, numbers). Exact brand fonts unconfirmed — if the user provides them, replace in `src/app/layout.tsx`.
- Logo: the real one is an egg mark + «Marketing Automation School». Until an SVG is provided, use text «MASC» + two-line tag.

## Presets

| Preset | Seen on | bg | surface | border | text / text-2 | accent | accent ink |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **dark-lime** (default for AI agents) | `/ads/ai-agents/vsl-ai-agent-lime-1` | `#0a0b0c` | `#111415` | `#252a2c` | `#f4f5f0` / `#b3b8b2` | `#e4ff3a` | `#0a0b0c` |
| **dark-amber** (webinars, B2B audit) | `/webinar-22-09`, `/ai_for_team_audit` | `#0e0e0f` | `#161617` | `#2a2a2c` | `#f5f3ee` / `#b5b1a8` | `#f7a91c` (gradient to `#ffcf3f` on CTA) | `#1a1206` |
| **light-cream** (quiz) | `/quiz` | `#efeae4` | `#fdfbf8` (big card, radius 32px, soft shadow) | `#e3ddd5` | `#1c1c1c` / `#6b6b6b` | `#f7a91c` → `#ffc933` gradient | `#1c1c1c` |
| **light-green** (mass B2C, freelance) | `/ads/marketing-automation/simulator-am-white-green-2-pulse-quiz` | `#f3fbef` | `#e9eaee` rows with white icon tile | `#dfe6db` | `#161616` / `#3a3a3a` | `#23a40a` (full-width band, pill CTA with darker bottom edge) | `#ffffff` |

Hex values for presets other than dark-lime are eyeballed from screenshots — tell the user they're approximate and ask for the designer's palette if precision matters.

Light presets: page is a centered mobile-width column (~700px) on desktop, emoji-style 3D icons in white tiles, uppercase extended headline with the key phrase in accent color. Don't mix presets within one page.
