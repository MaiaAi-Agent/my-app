import type { Metadata } from "next";
import AiMarathonLanding from "./AiMarathonLanding";

const TITLE = "3-денний марафон AI-агентів для спеціалістів | MASC";
const DESCRIPTION =
  "Три живі вечори, 13–15 жовтня: знайдеш задачу для AI-агента і зберемо першого агента на твоєму прикладі. Безкоштовний тариф.";

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
  return <AiMarathonLanding variant="eu" />;
}
