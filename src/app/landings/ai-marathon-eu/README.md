# AI Marathon EU — лендінг

Україномовний лендінг триденного живого AI-марафону для аудиторії в Європі.

- Маршрут: `/landings/ai-marathon-eu`
- Дати: 13–15 жовтня 2026, 19:00 за Києвом
- Аудиторії: `specialist`, `career`
- Безкоштовна реєстрація: `POST /api/lead`, source `ai-marathon-eu`
- Платний тариф: €39, зовнішня адреса з `NEXT_PUBLIC_PAID_URL`

## Змінні середовища

| Змінна | Обов’язкова | Призначення |
| --- | --- | --- |
| `WEBHOOK_URL` або `NEXT_PUBLIC_WEBHOOK_URL` | так | Серверний webhook для `/api/lead` |
| `NEXT_PUBLIC_PAID_URL` | перед запуском платного тарифу | Посилання на Stripe Checkout; якщо порожнє, кнопки показують «Оплата незабаром» |

Webhook не хардкодиться. Платіжна інтеграція, ключі Stripe та webhook оплати в цьому лендінгу не реалізовані.

## Перед запуском

- [ ] Додати погоджене фото Сергія Кейка замість плейсхолдера.
- [ ] Перевірити вебліцензії Ermilov і Fixel Text.
- [ ] Задати `WEBHOOK_URL` для Preview і Production та перевірити тестову заявку.
- [ ] Задати `NEXT_PUBLIC_PAID_URL` і перевірити повернення після оплати.
- [ ] Перевірити доступ до Zoom і видачу записів та бонусів платному тарифу.
- [ ] Після зміни змінних зробити Redeploy потрібного середовища.

## Перевірка

```bash
pnpm lint
pnpm build
node .claude/skills/masc-landing/scripts/fake-webhook.mjs
WEBHOOK_URL=http://127.0.0.1:3999/hook PORT=3456 pnpm start
node .claude/skills/masc-landing/scripts/check-landing.mjs http://localhost:3456/landings/ai-marathon-eu src/app/landings/ai-marathon-eu
node .claude/skills/masc-landing/scripts/snapshot.mjs http://localhost:3456/landings/ai-marathon-eu src/app/landings/ai-marathon-eu/preview.html
```
