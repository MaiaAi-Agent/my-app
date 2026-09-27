# Задача: Побудувати Landing Page для MASC вебінару / курсу / марафону

## Контекст

Ти будуєш лендінг-сторінку для **MASC Automation School** на **Vercel** (Next.js 16). Репозиторій: https://github.com/MaiaAi-Agent/my-app

**Еталон (копіюй цю структуру, не пиши з нуля):** `src/app/landings/voice-agents-course/` — це готовий лендінг з оранжевим дизайном (dark-amber), 3 аудиторіями, формою реєстрації.

---

## Крок 1: Спроси в користувача (5 питань)

1. **Назва кампанії & slug** (напр. `webinar-22-09`, `quiz-marketing`, `course-name`). Чи це буде головна сторінка (`/`) або під-сторінка (`/landings/<slug>`)?
2. **Оффер:** формат (вебінар / марафон / курс / квіз), тривалість, ціна або «безкоштовно», дата старту.
3. **Аудиторії (2–4):** ключ (`freelancers`, `digital`, `business` або твої), назва кнопки, опис у формі, заголовок + 1–2 речення для кожної.
4. **Програма / контент:** що буде всередині? (пункти по днях, модулях, або список тем)
5. **Дизайн-пресет:** який колір? (`dark-lime` = жовто-зелений, `dark-amber` = оранжевий [за замовчуванням], `light-cream`, `light-green`)

---

## Крок 2: Підготовка репо

```bash
git fetch origin main && git checkout main && git pull origin main
git checkout -b feat/<slug>-landing origin/main
cp -r src/app/landings/voice-agents-course src/app/landings/<slug>
cd src/app/landings/<slug>
```

---

## Крок 3: Заповни контент

Редагуй файли (в цьому порядку):

### 3.1 `content.ts` — весь текст
```typescript
export const SOURCE = '<slug>';  // e.g., 'webinar-22-09'
export const CAMPAIGN = { 
  name: 'Назва кампанії', 
  startDate: 'дата (e.g., "22 September 2024")',
  startTime: 'час (e.g., "19:00")',
  timezone: 'UTC+3',
  format: 'Live Webinar' // або 'Course', 'Marathon', тощо
};
export const HERO = { 
  badge: 'Бейдж (e.g., "🔊 Live Webinar")',
  title: 'Заголовок (max 10 слів, дієслово на початку)',
  subtitle: 'Підзаголовок (1–2 речення)',
  cta: 'Текст кнопки (e.g., "Записатися на вебінар")',
  note: 'Дрібна примітка (e.g., "Місця обмежені!")'
};
export const SPEAKERS = [
  { name: 'Ім\'я', role: 'Роль', specialty: 'Спеціальність' }
];
export const BENEFITS = [
  { icon: 'емодзі', title: 'Заголовок', description: 'Опис' }
  // 3 benefit-картки
];
export const AUDIENCES = {
  <key1>: { 
    key: '<key1>', 
    buttonLabel: 'Текст кнопки (e.g., "Фрілансер")',
    formLabel: 'Текст у select (e.g., "Я фрілансер")',
    title: 'Заголовок секції',
    description: 'Опис для цієї аудиторії (1–2 речення)'
  },
  // ... ще 1–3 аудиторії
};
export const CURRICULUM = [
  {
    day: 1,
    title: 'День 1: Тема',
    topics: ['пункт 1', 'пункт 2', 'пункт 3']
  }
  // ... День 2, День 3, тощо
];
export const FOOTER = { 
  text: 'MASC | Люди. Ідеї. AI-агенти.',
  tagline: 'Реальні навички для реальних задач.'
};
```

### 3.2 `VoiceAgentsCourseLanding.tsx` → Перейменуй на `<Name>Landing.tsx`
Замінь **весь текст на inline styles** (як в `voice-agents-course`):
- Імпортуй `content.ts`
- Замінь `HERO.title`, `AUDIENCES`, `CURRICULUM`, `SPEAKERS`, `BENEFITS` на свої
- **Не чіпай логіку форми** (`handleSubmit`, state management)
- Не використовуй CSS Modules — тільки `<style dangerouslySetInnerHTML>`

### 3.3 `voice-agents-course.module.css` → Видалити або переймнувати
**Краще видалити** — стилі вже в компоненті (inline).

```bash
rm voice-agents-course.module.css
```

### 3.4 `page.tsx` — Оновити metadata
```typescript
export const metadata: Metadata = {
  title: 'Назва Кампанії | MASC',
  description: 'Коротке описання (1 речення)',
};
```

### 3.5 `facebook-creatives.md` — 9 ad-варіацій
По 3 варіанти реклами на кожну аудиторію:

```markdown
# Facebook Ad Creatives — [Назва Кампанії]

## Audience 1: [Назва] (3 variants)

### Variant 1: Problem → Solution
**Headline:** ...
**Primary Text:** ...
**CTA:** ...

### Variant 2: ...
...

### Variant 3: ...
...

## Audience 2: [Назва] (3 variants)
...
```

**Правила текстів:**
- ❌ Без вигаданих цифр і гарантій (немає «10x», «заощадиш 15 год» без дозволу)
- ✅ Benefit-focused, не feature-focused
- ✅ Заголовок ≤10 слів, дієслово на початку

### 3.6 `README.md` — Документація для розробників
```markdown
# [Campaign Name] Landing Page

## Campaign
- **Name:** ...
- **Start:** ... 
- **Format:** ...
- **Audiences:** ...
- **Design Preset:** ...

## Setup
\`\`\`bash
npm run build
\`\`\`

## Testing
\`\`\`bash
PORT=3456 npm run dev
\`\`\`

## Deployment
Branch: `feat/<slug>-landing`
Preview: Auto on push
Production: Merge to `main`
```

---

## Крок 4: Перевірка локально

```bash
npm run build
# ✅ Має бути: "○ (Static) prerendered as static content"
# ❌ Не має бути помилок TypeScript
```

---

## Крок 5: Commit & Push

```bash
git add src/app/landings/<slug>/
git commit -m "feat: add <slug> landing page

- Campaign: <description>
- Audiences: <list>
- Design: <preset>
- Form: /api/lead webhook integration"

git push -u origin feat/<slug>-landing
```

---

## Крок 6: Vercel Preview & Merge

1. **PR автоматично створить Preview** на Vercel (адреса типу `my-xxxx-maia-ai2.vercel.app`)
2. **Тестуй на Preview:**
   - Заповни форму → перевір що лід потрапляє в n8n
   - Перемикай аудиторії → перевір синхронізацію з select
   - Мобільно & десктопно

3. **Merge PR** → Production автоматично

---

## Критичні Правила

### ❌ Не робити:
- ❌ CSS Modules (`.module.css`) — тільки inline `<style>`
- ❌ UI-бібліотеки (lucide-react, shadcn)
- ❌ Таблиці, складне верстання
- ❌ Хардкодовані webhook URLs (використовувати `/api/lead`)
- ❌ Вигадані цифри без дозволу користувача

### ✅ Обов'язково:
- ✅ Inline styles (як в `voice-agents-course`)
- ✅ Форма через `/api/lead` POST
- ✅ Синхронізація toggle-кнопок з select
- ✅ Стани форми: loading → success → form reset (через 5 с)
- ✅ Metadata для SEO (`title`, `description`)
- ✅ 9 facebook-креативів (3 на аудиторію)
- ✅ TypeScript без помилок

---

## Фінальний Звіт Користувачу

Коротко повідомляй:

1. ✅ **Гілка:** `feat/<slug>-landing`
2. 🔗 **GitHub PR:** [посилання]
3. 🌐 **Preview:** [Vercel адреса]
4. 📸 **Скріншоти:** [mobile + desktop, якщо є]
5. ⚠️ **Припущення** (що взяв без дозволу)
6. 📋 **Чеклист перед запуском:**
   - [ ] Тестова заявка в n8n
   - [ ] Дата старту залита у контент
   - [ ] Логотип (якщо потрібен)
   - [ ] Домен (якщо потрібен)
   - [ ] Facebook-креативи які запускати першими?

---

## Приклад: Voice Agents Course

**Вход від користувача:**
> webinar, Вчера провели потужний живий ефір-дискусію з практиками та розробниками AI-агентів. Хочеш навчитися створювати Voice-агентів та заробляти на цьому? Жива група, старт 18 жовтня. Всі 3 аудиторії. dark-amber.

**Вихід:** `/src/app/landings/voice-agents-course/`
- Готовий лендінг на Vercel
- 3 аудиторії (freelancers, digital, business)
- Оранжевий дизайн
- 9 facebook-креативів

---

## Питання? Контакти

- n8n webhook: `https://n8n.mageek.club/webhook/site-lead` (протестовано)
- Репо: `https://github.com/MaiaAi-Agent/my-app`
- Еталон: `src/app/landings/voice-agents-course/`
- API: `src/app/api/lead/route.ts` (спільна для всіх лендінгів)
