import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "BeReading — Onde os Livros Ganham Vida",
  description:
    "A plataforma premium de engajamento em leitura para escolas. Transforme livros físicos em jornadas interativas.",
  keywords: ["leitura", "educação", "escolas", "engajamento", "edtech"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
