import type { Metadata } from "next";
import MiniCourseLanding from "./MiniCourseLanding";

const TITLE = "Безкоштовний мінікурс «AI Agents» | MASC";
const DESCRIPTION =
  "Спробуй роботу AI-автоматизатора на віртуальному клієнті: 3 дні, 3 практики, створиш першого AI-агента в Telegram. Безкоштовно.";

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
  return <MiniCourseLanding />;
}
