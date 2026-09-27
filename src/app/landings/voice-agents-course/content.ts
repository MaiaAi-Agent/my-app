export type Audience =
  | "freelancers"
  | "digital-specialists"
  | "business-owners";

export const SOURCE = "voice-agents-course";

export const START = { date: "18 жовтня 2026", time: "19:00 (Київ)" };

export type IconName =
  | "laptop"
  | "chart"
  | "store"
  | "users"
  | "clock"
  | "mic"
  | "arrow"
  | "check";

export const AUDIENCES: Record<
  Audience,
  { formLabel: string; icon: IconName; title: string; text: string }
> = {
  freelancers: {
    formLabel: "Фрілансер",
    icon: "laptop",
    title: "Додай Voice-агентів до своїх послуг",
    text: "Навчишся будувати голосових агентів під задачі клієнтів і розберешся, як упакувати це в послугу для бізнесу.",
  },
  "digital-specialists": {
    formLabel: "Діджитал-спеціаліст",
    icon: "chart",
    title: "Автоматизуй дзвінки та комунікацію",
    text: "Побачиш, де Voice-агенти знімають рутину в маркетингу й продажах, і як налаштувати їх так, щоб вони працювали надійно, а не «для демо».",
  },
  "business-owners": {
    formLabel: "Власник малого бізнесу",
    icon: "store",
    title: "Передай рутинні дзвінки агенту",
    text: "Зрозумієш, які процеси у твоєму бізнесі можна віддати голосовому агенту і з чого почати, щоб платити за процес, а не за «цікаву фічу».",
  },
};

export const AUDIENCE_ORDER: Audience[] = [
  "freelancers",
  "digital-specialists",
  "business-owners",
];

export const FORMAT: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "users",
    title: "Жива група",
    text: "Заняття наживо: питаєш спікерів і розбираєш свої задачі в ефірі.",
  },
  {
    icon: "clock",
    title: "3 дні",
    text: "Від основ Voice AI до налаштованого агента і розмови про монетизацію.",
  },
  {
    icon: "mic",
    title: "Від практиків",
    text: "Ведуть люди, які будують AI-агентів для реальних процесів.",
  },
];

export const PROGRAM = [
  {
    day: "День 1",
    title: "Основи Voice AI агентів",
    topics: [
      "Як влаштований голосовий агент: розпізнавання мови, LLM, синтез голосу",
      "Де Voice-агенти доречні, а де — ні",
    ],
  },
  {
    day: "День 2",
    title: "Розробка та налаштування",
    topics: [
      "Збираємо агента крок за кроком",
      "Сценарії розмови, інтеграції, тестування",
    ],
  },
  {
    day: "День 3",
    title: "Монетизація та кейси",
    topics: [
      "Як упакувати Voice-агента в послугу для бізнесу",
      "Кейси з практики спікерів",
    ],
  },
];

export const SPEAKERS = [
  {
    initial: "С",
    name: "Сергій",
    role: "Практик, будує AI-агентів",
    tags: ["AI-агенти", "Практика"],
  },
  {
    initial: "А",
    name: "Алекс",
    role: "Розробник AI-агентів",
    tags: ["AI-агенти", "Розробка"],
  },
];
