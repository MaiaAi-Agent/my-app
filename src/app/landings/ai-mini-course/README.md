# AI Agents mini-course — лендінг

Безкоштовний 3-денний самостійний мінікурс «AI Agents» (SendPulse Education) → продаж курсу «AI Агенти» через менеджера. Контекст, ТЗ і копі: `zveer/masc` → `funnels/ai-mini-course/` (`03-landing.md`, `02-offer.md`, `09-verified-facts.md`).

- Маршрут: `/landings/ai-mini-course` (не корінь `/`).
- Стиль: dark-lime, як `ai-agents-marathon`.

## Файли

| Файл | Що |
| --- | --- |
| `page.tsx` | `metadata` і рендер компонента |
| `MiniCourseLanding.tsx` | Клієнтський компонент: toggle аудиторії, форма, згода, стани |
| `content.ts` | Весь текст. `SOURCE = "ai-mini-course"`; аудиторії `career`, `specialist` |
| `ai-mini-course.module.css` | Стилі (CSS Module, без Tailwind), токени на початку |
| `Icon.tsx`, `AgentGraphic.tsx` | Інлайн SVG |

## Форма

`POST /api/lead` з `{ email, audience, source }` (контракт спільний для всіх лендінгів, не змінювався). Чекбокс згоди обов'язковий на клієнті, але **не передається в payload**: n8n/SendPulse отримує тільки email, аудиторію і `source`. Запис `marketingOptIn` для студента SendPulse треба виставляти в самому workflow (усе, що прийшло з цього `source`, вже дало згоду).

Приклад payload у webhook:

```json
{ "email": "name@company.com", "audience": "career", "source": "ai-mini-course", "timestamp": "2026-10-01T12:00:00.000Z" }
```

## Що зробити перед запуском

- [ ] У n8n workflow для `source = ai-mini-course`: створити студента в SendPulse Education (курс `ai-agents-mini`, id 50412), виставити `marketingOptIn`, записати `audience`, відкрити доступ, надіслати лист/повідомлення з посиланням на бот `@mini_ai_agent_masc_bot` (deep-link з `source`)
- [ ] Тестова заявка з Preview-адреси (з'являється в n8n → Executions)
- [ ] Підтвердити публічний текст «3 дні» (реальний доступ 4 дні: у тексті не вказуємо)
- [ ] Блок спікера (Ярослав Білий) додати після підтвердження біографії
- [ ] Блок «бонус» додати після узгодження формату розбору
- [ ] Політика конфіденційності / посилання в футері `[TBD]`
- [ ] Lighthouse на мобільному > 90
- [ ] Clarity/heatmap і Meta Pixel підключити перед трафіком

## Відступи від еталона `ai-agents-marathon`

- Прибрано «Місця обмежені!», «Без програмування», «Live online», дату старту (немає підстав).
- Додано секції «Що потрібно від тебе» і «Часті питання».
- Додано чекбокс згоди.
