import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LF Academy | Learn French & TCF/TEF Canada Immigration Platform",
  description:
    "Académie d'excellence pour le français et l'immigration canadienne (Entrée Express NCLC 7+). 40 tests complets d'écoute et de lecture, 113 sujets d'expression écrite et simulation orale avec IA illimitée et carnet d'erreurs personnalisé.",
  keywords: [
    "LF Academy",
    "Learn French",
    "TCF Canada",
    "TEF Canada",
    "Entrée Express",
    "NCLC 7",
    "Immigration Canada",
    "Compréhension Orale",
    "Compréhension Écrite",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${outfit.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FCFCFD] dark:bg-[#080E1A] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-600 selection:text-white">
        <Suspense fallback={<header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#080E1A]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
