# Тест-драйв «AI-агенти для клієнтів»

- Формат: безкоштовний тест-драйв, 3 дні. Старт: 13 жовтня.
- Landing: `/landings/ai-agents-testdrive`
- Форма: ім'я + email + телефон → `POST /api/testdrive-lead` → `WEBHOOK_URL`
- `SOURCE`: `ai-agents-testdrive` (для n8n rules table)
- Дизайн: dark-lime, hero-зображення `public/ai-testdrive-hero.png`
- Meta creatives: `facebook-creatives.md` (9 варіантів)

## Перед запуском

- `WEBHOOK_URL` у Vercel env vars (вже заданий проєктно)
- Рядок у rules table: `source=ai-agents-testdrive`, форма передає `name/email/phone` + utm
