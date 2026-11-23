"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ChevronRight, Clock, Loader2 } from "lucide-react";
import { getTestResults, StoredTestAttempt } from "@/lib/storage";
import { ModeSelectionModal } from "@/components/ModeSelectionModal";

interface ReadingTestItem {
  id: string;
  testNumber: number;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
}

export default function ReadingCatalogPage() {
  const [tests, setTests] = useState<ReadingTestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState<Record<string, StoredTestAttempt>>({});
  const [modalTest, setModalTest] = useState<ReadingTestItem | null>(null);

  useEffect(() => {
    // 1. Fetch tests from PostgreSQL via API
    fetch("/api/tests/reading")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setTests(json.data);
        }
      })
      .catch((err) => console.error("Error loading tests from PostgreSQL:", err))
      .finally(() => setLoading(false));

    // 2. Load stored local attempts
    const list = getTestResults("reading");
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
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-sm font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" /> Compréhension Écrite (CE)
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            40 Tests Complets de Lecture TCF Canada
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base">
            60 minutes par épreuve. 39 questions progressives de A1 à C2. Choisissez entre le <strong>Mode Examen</strong> (60 min chronométré) et le <strong>Mode Révision</strong> (sans chrono, explications immédiates).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/unique-reading"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            Mode Questions Uniques (A1-C2)
          </Link>
        </div>
      </div>

      {/* Grid of Tests from PostgreSQL */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-500">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-sm font-medium">Chargement des 40 tests depuis PostgreSQL...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tests.map((test) => {
            const attempt = attempts[test.id];
            const isDone = Boolean(attempt);

            return (
              <button
                key={test.id}
                onClick={() => setModalTest(test)}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 hover:shadow-lg dark:hover:border-indigo-500/50 transition-all duration-200 text-left cursor-pointer"
              >
                <div className="w-full">
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
                        <Clock className="w-3 h-3" /> {test.durationMinutes || 60} min
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {test.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {test.totalQuestions || 39} questions · Niveaux A1 à C2 · Documents authentiques
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 w-full">
                  <span>{isDone ? "Choisir le mode (Rejouer)" : "Choisir le mode (Lancer)"}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Mode Selection Modal */}
      {modalTest && (
        <ModeSelectionModal
          isOpen={Boolean(modalTest)}
          onClose={() => setModalTest(null)}
          testId={modalTest.id}
          testNumber={modalTest.testNumber}
          testType="reading"
          durationMinutes={modalTest.durationMinutes || 60}
          totalQuestions={modalTest.totalQuestions || 39}
        />
      )}
    </div>
  );
}
