# AI Agents Marathon — лендінг

Безкоштовний 3-денний онлайн-марафон з AI-агентів для non-technical спеціалістів.

- Маршрут: `/landings/ai-agents-marathon`, також віддається як корінь `/` (див. `src/app/page.tsx`).
- Сегменти: IT-спеціалісти (`switcher`), Digital-маркетери (`digital`), Власники бізнесу (`business`).
- CTA: «Розпочати марафон (безкоштовно)».

## Файли

| Файл | Що в ньому |
| --- | --- |
| `page.tsx` | Серверна сторінка + `metadata` (SEO/OG) |
| `MarathonLanding.tsx` | Клієнтський компонент: toggle аудиторії, форма, стани |
| `content.ts` | Весь копірайт: сегменти, переваги, програма. Правити текст — тут |
| `marathon.module.css` | Стилі (CSS Module, без Tailwind). Кольори — токени на початку файлу |
| `Icon.tsx`, `AgentGraphic.tsx` | Інлайн-SVG іконки та ілюстрація в hero (без зовнішніх бібліотек) |
| `preview.html` | Статичний знімок сторінки без JS — для швидкого перегляду/погодження |
| `facebook-creatives.md` | 9 варіантів реклами для FB/IG |

## Дизайн

Стиль узято з наявних сторінок MASC (next.masc.space/ads/ai-agents/vsl-ai-agent-lime-1, webinar-22-09): темний фон `#0a0b0c`, лаймовий акцент `#e4ff3a`, картки з тонкою рамкою і радіусом 16px, заголовки секцій з лаймовою рискою, pill-CTA зі стрілкою, чіпи формату. Шрифти: Manrope (текст) і Unbounded (hero, цифри) через `next/font` у `src/app/layout.tsx`. Кольори сегментів з брифу (blue/purple/green) свідомо замінено одним брендовим акцентом.

## Змінні середовища (Vercel → Settings → Environment Variables)

| Змінна | Обов'язкова | Приклад |
| --- | --- | --- |
| `NEXT_PUBLIC_WEBHOOK_URL` або `WEBHOOK_URL` | так | `https://n8n.mageek.club/webhook/site-lead` |
| `NEXT_PUBLIC_MARATHON_START` | ні | `13 жовтня` → у формі: «Стартує 13 жовтня. Місця обмежені!» |

Адреса webhook читається на сервері під час запиту (`src/app/api/lead/route.ts`), тож у браузер не потрапляє. Після зміни у Vercel достатньо Redeploy; змінна має бути ввімкнена для того середовища (Production / Preview), яке тестуєте.

`NEXT_PUBLIC_MARATHON_START` вшивається під час збірки — після зміни теж Redeploy. Без неї під формою: «Місця обмежені! Дату старту надішлемо на email.»

## Webhook

Браузер шле `POST /api/lead` (той самий домен — CORS налаштовувати не треба), сервер валідує дані й пересилає в n8n:

```json
{ "email": "name@company.com", "audience": "switcher", "source": "ai-agents-marathon", "timestamp": "2026-09-27T12:00:00.000Z" }
```

| Відповідь `/api/lead` | Що бачить користувач | Причина |
| --- | --- | --- |
| 200 | «Дякуємо! Перевір email» | n8n відповів 2xx |
| 503 `not_configured` | «Реєстрація тимчасово недоступна» | змінна webhook не задана для цього деплою |
| 502 `upstream` | «Не вдалося надіслати заявку» | n8n недоступний або відповів не 2xx (деталі в Vercel → Logs, префікс `[lead]`) |
| 400 `invalid` | «Не вдалося надіслати заявку» | невалідні дані |

## Локально

```bash
pnpm install
WEBHOOK_URL=https://... pnpm dev
pnpm lint && pnpm build
```

## Чеклист перед запуском

- [ ] `NEXT_PUBLIC_WEBHOOK_URL` задано у Vercel, тестова заявка видна в логах n8n
- [ ] Дата старту (`NEXT_PUBLIC_MARATHON_START`) задана
- [ ] Лист-підтвердження після реєстрації налаштований (сторінка обіцяє «Перевір email»)
- [ ] Lighthouse 85+ на прод-домені
- [ ] Перевірено на 320 / 768 / 1280 px

## Перевірено

- `pnpm lint`, `pnpm build` — без помилок, сторінка статично пререндериться.
- У браузері (Playwright): без горизонтального скролу на 375 і 1280 px; toggle ↔ select синхронізуються в обидва боки; невалідний email дає помилку; успішна відправка показує «Дякуємо! Перевір email» і через 5 с повертає форму; payload на тестовий webhook прийшов у форматі вище.
