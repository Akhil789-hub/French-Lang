import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Suspense fallback={<header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
