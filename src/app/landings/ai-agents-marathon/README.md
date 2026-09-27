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
| `marathon.module.css` | Стилі (CSS Module, без Tailwind) |
| `preview.html` | Статичний знімок сторінки без JS — для швидкого перегляду/погодження |
| `facebook-creatives.md` | 9 варіантів реклами для FB/IG |

## Змінні середовища (Vercel → Settings → Environment Variables)

| Змінна | Обов'язкова | Приклад |
| --- | --- | --- |
| `NEXT_PUBLIC_WEBHOOK_URL` | так | `https://n8n.mageek.club/webhook/site-lead` |
| `NEXT_PUBLIC_MARATHON_START` | ні | `13 жовтня` → у формі: «Стартує 13 жовтня. Місця обмежені!» |

Без `NEXT_PUBLIC_WEBHOOK_URL` форма показує помилку «Реєстрація тимчасово недоступна» і пише в консоль. Змінні `NEXT_PUBLIC_*` вшиваються під час збірки — після зміни треба передеплоїти.

Без `NEXT_PUBLIC_MARATHON_START` під формою: «Місця обмежені! Дату старту надішлемо на email.»

## Webhook

`POST` з браузера, `Content-Type: application/json`:

```json
{ "email": "name@company.com", "audience": "switcher", "source": "ai-agents-marathon", "timestamp": "2026-09-27T12:00:00.000Z" }
```

Успіх — будь-яка 2xx відповідь. Інакше користувач бачить повідомлення про помилку і може повторити.

**CORS:** запит іде напряму з браузера на домен n8n, тому в Webhook-ноді n8n треба дозволити origin лендінгу (Options → Allowed Origins (CORS): `https://<домен-лендінгу>` або `*`). Без цього браузер заблокує запит, і форма покаже помилку.

## Локально

```bash
pnpm install
NEXT_PUBLIC_WEBHOOK_URL=https://... pnpm dev
pnpm lint && pnpm build
```

## Чеклист перед запуском

- [ ] `NEXT_PUBLIC_WEBHOOK_URL` задано у Vercel, тестова заявка видна в логах n8n
- [ ] CORS у Webhook-ноді n8n налаштовано
- [ ] Дата старту (`NEXT_PUBLIC_MARATHON_START`) задана
- [ ] Лист-підтвердження після реєстрації налаштований (сторінка обіцяє «Перевір email»)
- [ ] Lighthouse 85+ на прод-домені
- [ ] Перевірено на 320 / 768 / 1280 px

## Перевірено

- `pnpm lint`, `pnpm build` — без помилок, сторінка статично пререндериться.
- У браузері (Playwright): без горизонтального скролу на 375 і 1280 px; toggle ↔ select синхронізуються в обидва боки; невалідний email дає помилку; успішна відправка показує «Дякуємо! Перевір email» і через 5 с повертає форму; payload на тестовий webhook прийшов у форматі вище.
