# Voice Agents Course Landing Page

## Campaign
- **Name:** Voice Agents Course
- **Start:** October 18, 2024
- **Format:** Live Group
- **Audiences:** Freelancers, Digital Specialists, Business/Other
- **Speakers:** Sergei & Alex

## Files
- `content.ts` — All text content (audiences, curriculum, etc.)
- `VoiceAgentsCourseLanding.tsx` — React component
- `voice-agents-course.module.css` — Styles (dark-amber preset)
- `page.tsx` — Next.js page & metadata
- `facebook-creatives.md` — Ad variations

## Setup
```bash
npm run build
npm run lint
```

## Testing
```bash
WEBHOOK_URL=http://127.0.0.1:3999/hook PORT=3456 npm run dev
node .claude/skills/masc-landing/scripts/check-landing.mjs http://localhost:3456/landings/voice-agents-course .
```

## Vercel
- Environment: `WEBHOOK_URL` must be set
- Branch: `feat/voice-agents-course-landing`
- Preview: Auto-generated on push
- Production: Merge to `main`
