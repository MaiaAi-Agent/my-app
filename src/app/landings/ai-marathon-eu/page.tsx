import type { Metadata } from "next";
import { ermilov, fixel } from "./fonts";
import MarathonEuLanding from "./MarathonEuLanding";

const TITLE = "AI-марафон: 3 живі ефіри 13–15 жовтня | MASC";
const DESCRIPTION =
  "13–15 жовтня, 3 живі ефіри. Знайдеш свою рутину, яку варто віддати AI, і зберешся одну автоматизацію на своїй задачі.";

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
      <MarathonEuLanding />
    </div>
  );
}
