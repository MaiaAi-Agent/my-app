# Voice Agents Course — лендінг

3-денний курс у живій групі: як створювати надійних Voice AI агентів і монетизувати ці навички. Спікери — Сергій і Алекс (практики та розробники AI-агентів).

- Маршрут: `/landings/voice-agents-course`, також головна `/` (див. `src/app/page.tsx`). Марафон AI-агентів лишається на `/landings/ai-agents-marathon`.
- Старт: 18 жовтня, 19:00 (Київ) — константа `START` у `content.ts`.
- Сегменти: `freelancers`, `digital-specialists`, `business-owners`.
- Пресет дизайну: **dark-amber** (як `/webinar-22-09`).

## Файли

| Файл | Що в ньому |
| --- | --- |
| `page.tsx` | Серверна сторінка + `metadata` |
| `VoiceCourseLanding.tsx` | Клієнтський компонент: перемикач аудиторії, форма |
| `content.ts` | Весь текст, дата, спікери, програма. Правити текст — тут |
| `voice.module.css` | Стилі, токени кольорів на початку `.page` |
| `Icon.tsx`, `VoiceGraphic.tsx` | Інлайн-SVG іконки й ілюстрація |
| `preview.html` | Статичний знімок (скрипт `.claude/skills/masc-landing/scripts/snapshot.mjs`) |
| `facebook-creatives.md` | 9 варіантів реклами |

## Заявки

Форма → `POST /api/lead` → n8n (`NEXT_PUBLIC_WEBHOOK_URL` / `WEBHOOK_URL` у Vercel, спільна для всіх лендінгів). Payload: `{ email, audience, source: "voice-agents-course", timestamp }`. Щоб розділяти заявки курсу й марафону в n8n — фільтруй за `source`.

## Перед запуском

- [ ] Підтвердити рік старту (у брифі був 2024 — на сторінці рік не вказано)
- [ ] Ціна: на сторінці не згадується; якщо курс безкоштовний — додати чіп «Безкоштовно»
- [ ] Прізвища, фото й коротке bio спікерів (зараз — ініціали й роль)
- [ ] Підпункти програми дописано від назв днів — перевірити
- [ ] Лист-підтвердження в n8n для `source = voice-agents-course`
- [ ] Тестова заявка з Preview дійшла в n8n
