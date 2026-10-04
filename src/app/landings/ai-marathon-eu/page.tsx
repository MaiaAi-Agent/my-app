import type { Metadata } from "next";
import AiMarathonEuLanding from "./AiMarathonEuLanding";
import { ermilov, fixel } from "./fonts";

const TITLE = "AI-марафон: збери першого AI-агента за 3 вечори | MASC";
const DESCRIPTION =
  "13–15 жовтня 2026 о 19:00 за Києвом. Три живі ефіри про AI-автоматизацію на власній задачі.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "uk_UA",
  },
};

export default function Page() {
  return (
    <div className={`${ermilov.variable} ${fixel.variable}`}>
      <AiMarathonEuLanding />
    </div>
  );
}
