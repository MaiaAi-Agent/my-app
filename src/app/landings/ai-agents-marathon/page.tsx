import type { Metadata } from "next";
import MarathonLanding from "./MarathonLanding";

export const metadata: Metadata = {
  title: "3-Денний Марафон AI Агентів | MASC",
  description: "Навчись будувати AI-агентів за 3 дні. Без коду. Безкоштовно.",
  openGraph: {
    title: "3-Денний Марафон AI Агентів | MASC",
    description: "Навчись будувати AI-агентів за 3 дні. Без коду. Безкоштовно.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function Page() {
  return <MarathonLanding />;
}
