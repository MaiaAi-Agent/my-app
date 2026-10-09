export const SOURCE = "ai-agents-testdrive";

export type IconName =
  | "code"
  | "chart"
  | "briefcase"
  | "check"
  | "clock"
  | "bolt"
  | "chat"
  | "bell"
  | "gift";

export const HERO_IMAGE = "/ai-testdrive-hero.png";

export const PROGRAM = [
  {
    day: "День 1",
    icon: "chat" as IconName,
    title: "Консультації",
    text: "Збереш агента в Telegram із пам'ятю та підключеними даними.",
  },
  {
    day: "День 2",
    icon: "bell" as IconName,
    title: "Запис і сповіщення",
    text: "Розшириш систему функціями адміністратора на прикладі запису до лікаря.",
  },
  {
    day: "День 3",
    icon: "chart" as IconName,
    title: "Звіти",
    text: "Налаштуєш логіку агента-аналітика та перевіриш результат.",
  },
];

export const STATS = [
  {
    value: "$500–$3000",
    label: "середній чек за розробку АІ-агента",
  },
  {
    value: "+109%",
    label: "ріст попиту на АІ-агентів за останній рік",
  },
  {
    value: "60%",
    label: "замовників готові працювати з новачками",
  },
];

export const REASONS = [
  {
    icon: "briefcase" as IconName,
    title: "Пробуєш нову професію",
    text: "Розглядаєш нову професію й хочеш спробувати її на практиці.",
  },
  {
    icon: "bolt" as IconName,
    title: "Створюєш власні рішення",
    text: "Користуєшся AI та хочеш навчитися створювати власні рішення.",
  },
  {
    icon: "code" as IconName,
    title: "Шукаєш додатковий дохід",
    text: "Шукаєш напрям для додаткової зайнятості або майбутнього фрилансу.",
  },
];
