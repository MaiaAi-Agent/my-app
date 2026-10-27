import type { Metadata } from "next";
import ClubLanding from "./ClubLanding";

export const metadata: Metadata = {
  title: "MASC Клуб — підписка на всі матеріали, живі дзвони і ком'юніті",
  description:
    "Клуб MASC: бібліотека курсів і воркшопів, щотижневі живі дзвони, ком'юніті і мастермайнд. Безкоштовний тариф та підписка від 1 190 грн/міс.",
  openGraph: {
    title: "MASC Клуб — бібліотека, живі дзвони і ком'юніті одним підписом",
    description:
      "Обери свій рівень: безкоштовний доступ, Бібліотека, Ком'юніті + Live або All-in з мастермайндом.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function Page() {
  return <ClubLanding />;
}
