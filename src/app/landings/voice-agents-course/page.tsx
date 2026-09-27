import type { Metadata } from "next";
import VoiceWebinarLanding from "./VoiceWebinarLanding";

const title = "Voice AI агенти: прямий ефір із практиками | MASC";
const description =
  "3 ефіри з практиками та розробниками AI-агентів: основи Voice AI, розробка й налаштування, монетизація та кейси. Старт 18 жовтня 2026 о 19:00 (Київ).";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "uk_UA" },
};

export default function Page() {
  return <VoiceWebinarLanding />;
}
