import type { Metadata } from "next";
import VoiceCourseLanding from "./VoiceCourseLanding";

const title = "Voice Agents Course — 3 дні в живій групі | MASC";
const description =
  "Навчись створювати надійних Voice AI агентів: від основ до налаштування і монетизації. Старт 18 жовтня 2026 о 19:00 (Київ).";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "uk_UA" },
};

export default function Page() {
  return <VoiceCourseLanding />;
}
