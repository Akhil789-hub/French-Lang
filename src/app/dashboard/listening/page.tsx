"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Headphones, CheckCircle2, ChevronRight, Award, Clock } from "lucide-react";
import { LISTENING_TESTS } from "@/data/listening-tests";
import { getTestResults, StoredTestAttempt } from "@/lib/storage";

export default function ListeningCatalogPage() {
  const [attempts, setAttempts] = useState<Record<string, StoredTestAttempt>>({});

  useEffect(() => {
    const list = getTestResults("listening");
    const map: Record<string, StoredTestAttempt> = {};
    for (const att of list) {
      if (!map[att.testId]) {
        map[att.testId] = att;
      }
    }
    setAttempts(map);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold uppercase tracking-wider mb-2">
            <Headphones className="w-4 h-4" /> Compréhension Orale (CO)
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            40 Tests Complets d'Écoute TCF Canada
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base">
            Chaque test comporte 39 questions (A1 à C2). Après avoir répondu : transcription intégrale en français et anglais, phrase clé repère et explication détaillée du piège officiel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/unique-listening"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            Mode Questions Uniques (A1-C2)
          </Link>
        </div>
      </div>

      {/* Grid of 40 Tests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {LISTENING_TESTS.map((test) => {
          const attempt = attempts[test.id];
          const isDone = Boolean(attempt);

          return (
            <Link
              key={test.id}
              href={`/dashboard/listening/${test.id}`}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-lg dark:hover:border-blue-500/50 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    TEST #{test.testNumber}
                  </span>

                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" /> NCLC {attempt.nclcLevel} ({attempt.score} pts)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                      <Clock className="w-3 h-3" /> 35 min
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {test.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  39 questions · Niveaux A1 à C2 · Audio inclus
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>{isDone ? "Reprendre le test" : "Commencer le test"}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
