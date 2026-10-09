import localFont from "next/font/local";

// MASC SPACE: файли з zveer/masc → design/system/fonts (лише конвертовано в WOFF2 без змін гліфів).
// Ermilov — тільки hero-заголовок і великі цифри, від ~48px.
export const ermilov = localFont({
  src: "./fonts/Ermilov-Bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-ermilov",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});

export const fixel = localFont({
  src: [
    { path: "./fonts/FixelText-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/FixelText-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "./fonts/FixelText-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/FixelText-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "./fonts/FixelText-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-fixel",
  fallback: ["Inter", "system-ui", "sans-serif"],
});
