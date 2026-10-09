import type { Metadata } from "next";
import TestdriveLanding from "./TestdriveLanding";

export const metadata: Metadata = {
  title: "Безкоштовний тест-драйв: AI-агенти для клієнтів | MASC",
  description:
    "Три дні практики з AI-агентами: консультації, запис і сповіщення, звіти. Старт 13 жовтня. Безкоштовно.",
  openGraph: {
    title: "Безкоштовний тест-драйв: AI-агенти для клієнтів | MASC",
    description:
      "Три дні практики з AI-агентами: консультації, запис і сповіщення, звіти. Старт 13 жовтня. Безкоштовно.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function Page() {
  return <TestdriveLanding />;
}
