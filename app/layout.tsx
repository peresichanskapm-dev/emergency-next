import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import "./globals.scss";

export const metadata: Metadata = {
  title: "emergency+ — Протоколи терапії ускладнень",
  description: "Прекурс про ускладнення в естетичній медицині.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
