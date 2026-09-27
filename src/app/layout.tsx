import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MASC Automation School",
  description: "Навчання автоматизації та AI-агентам: n8n, Make, Claude Code.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
