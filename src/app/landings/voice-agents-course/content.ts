export type Audience =
  | "freelancers"
  | "digital-specialists"
  | "business-owners";

export const SOURCE = "voice-agents-course";

export const START = { date: "25 жовтня 2026", time: "19:00 (Київ)" };

export type IconName =
  | "laptop"
  | "chart"
  | "store"
  | "wave"
  | "gear"
  | "coins"
  | "flag"
  | "target"
  | "arrow"
  | "check";

export const AUDIENCES: Record<
  Audience,
  { formLabel: string; icon: IconName; title: string; text: string }
> = {
  freelancers: {
    formLabel: "Фрілансер",
    icon: "laptop",
    title: "Фрілансеру",
    text: "Щоб побачити, як додати Voice-агентів до своїх послуг і з якими задачами клієнтів з ними працювати.",
  },
  "digital-specialists": {
    formLabel: "Діджитал-спеціаліст",
    icon: "chart",
    title: "Діджитал-спеціалісту",
    text: "Щоб зрозуміти, де голосові агенти знімають рутину в маркетингу й продажах і як налаштувати їх надійно, а не «для демо».",
  },
  "business-owners": {
    formLabel: "Власник малого бізнесу",
    icon: "store",
    title: "Власнику малого бізнесу",
    text: "Щоб розібратися, які дзвінки й процеси можна віддати агенту і як платити за процес, а не за «цікаву фічу».",
  },
};

export const AUDIENCE_ORDER: Audience[] = [
  "freelancers",
  "digital-specialists",
  "business-owners",
];

export const AGENDA: {
  day: string;
  icon: IconName;
  title: string;
  text: string;
}[] = [
  {
    day: "Ефір 1",
    icon: "wave",
    title: "Основи Voice AI агентів",
    text: "Як влаштований голосовий агент: розпізнавання мови, LLM, синтез голосу. Де такі агенти доречні, а де — ні.",
  },
  {
    day: "Ефір 2",
    icon: "gear",
    title: "Розробка та налаштування",
    text: "Збираємо агента крок за кроком: сценарії розмови, інтеграції, тестування.",
  },
  {
    day: "Ефір 3",
    icon: "coins",
    title: "Монетизація та кейси",
    text: "Як упакувати Voice-агента в послугу для бізнесу. Кейси з практики спікерів.",
  },
];

export const OUTCOMES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "flag",
    title: "Як це працює",
    text: "З яких частин складається голосовий агент і чим він відрізняється від чат-бота.",
  },
  {
    icon: "target",
    title: "Що будувати",
    text: "Які задачі бізнес реально готовий автоматизувати голосом.",
  },
  {
    icon: "gear",
    title: "Як зробити надійно",
    text: "Що відрізняє робочого агента від демо: сценарії, тести, інтеграції.",
  },
  {
    icon: "coins",
    title: "Як продавати",
    text: "Як перетворити навичку на послугу, за яку платять за процес.",
  },
];

export const SPEAKERS = [
  {
    initial: "С",
    name: "Сергій",
    role: "Практик, будує AI-агентів",
    tags: ["AI-агенти", "Практика"],
    photo: "https://v3b.fal.media/files/b/0aac3943/WenLELzBkZbOVLS1_aQzc_LdpM1hk1.png",
  },
  {
    initial: "А",
    name: "Алекс",
    role: "Розробник AI-агентів",
    tags: ["AI-агенти", "Розробка"],
    photo: "https://v3b.fal.media/files/b/0aac3944/seURUqi5cepDrOxRGVUNd_gjq6Uv26.png",
  },
];

export const HERO_IMAGE = "https://v3b.fal.media/files/b/0aac3943/AlyF98WF5vKRI0IhZI8xI_mq72a3fJ.png";

export const COMMUNITY_PHOTOS = [
  {
    src: "https://mageek.club/wp-content/uploads/2024/09/image-4.jpg",
    alt: "MASC — навчання в спільноті",
  },
  {
    src: "https://mageek.club/wp-content/uploads/2024/09/image-3.jpg",
    alt: "MASC — практика і результати",
  },
  {
    src: "https://mageek.club/wp-content/uploads/2024/09/image-1-1.jpg",
    alt: "MASC — живі ефіри та воркшопи",
  },
  {
    src: "https://mageek.club/wp-content/uploads/2024/09/Photo.jpg",
    alt: "MASC — спільнота автоматизаторів",
  },
];
