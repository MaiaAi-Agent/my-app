import localFont from "next/font/local";

export const ermilov = localFont({
  src: "./fonts/Ermilov-Bold.otf",
  variable: "--font-ermilov",
  weight: "700",
  display: "swap",
});

export const fixel = localFont({
  src: [
    { path: "./fonts/FixelText-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/FixelText-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "./fonts/FixelText-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/FixelText-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "./fonts/FixelText-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-fixel",
  display: "swap",
});
