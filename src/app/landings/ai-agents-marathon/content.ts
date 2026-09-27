export type Audience = "switcher" | "digital" | "business";

export const SOURCE = "ai-agents-marathon";

export type IconName =
  | "code"
  | "chart"
  | "briefcase"
  | "check"
  | "clock"
  | "bolt";

export const AUDIENCES: Record<
  Audience,
  {
    label: string;
    formLabel: string;
    icon: IconName;
    title: string;
    text: string;
  }
> = {
  switcher: {
    label: "IT-спеціалістам",
    formLabel: "IT-спеціаліст",
    icon: "code",
    title: "Автоматизуй без коду",
    text: "За 3 дні розберешся, як працюють AI-агенти, і збереш свого першого — без програмування. Сильний перший крок у новий напрям.",
  },
  digital: {
    label: "Digital-маркетерам",
    formLabel: "Digital-фахівець",
    icon: "chart",
    title: "Масштабуй кампанії з AI-агентами",
    text: "Передай агентам звіти, збір даних і рутинні задачі з контентом — і звільни час на стратегію та креатив.",
  },
  business: {
    label: "Власникам бізнесу",
    formLabel: "Власник бізнесу",
    icon: "briefcase",
    title: "Автоматизуй рутину в компанії",
    text: "Побачиш, які процеси в твоєму бізнесі можна передати AI-агентам, і як запустити першу автоматизацію без великого бюджету.",
  },
};

export const AUDIENCE_ORDER: Audience[] = ["switcher", "digital", "business"];

export const BENEFITS = [
  {
    icon: "check" as IconName,
    title: "Без програмування",
    text: "Базових навичок роботи з комп'ютером достатньо.",
  },
  {
    icon: "clock" as IconName,
    title: "3 дні, інтенсивно",
    text: "Коротко, по суті, без води — одразу практика.",
  },
  {
    icon: "bolt" as IconName,
    title: "Практичні приклади",
    text: "Будуємо агентів на реальних задачах, а не на слайдах.",
  },
];

export const PROGRAM = [
  {
    day: "День 1",
    title: "Основи AI + вибір інструмента",
    topics: [
      "Що таке AI-агент і чим він відрізняється від чат-бота",
      "Які задачі варто автоматизувати першими",
      "Як обрати інструмент під свою задачу",
    ],
  },
  {
    day: "День 2",
    title: "Будуємо першого агента",
    topics: [
      "Збираємо агента крок за кроком разом з Богданом",
      "Промпти, інструменти та пам'ять агента",
      "Тестуємо на реальному сценарії",
    ],
  },
  {
    day: "День 3",
    title: "Інтеграція",
    topics: [
      "Підключення через API",
      "Інтеграції зі Slack і Google",
      "Автоматизація процесу в n8n",
    ],
  },
];
