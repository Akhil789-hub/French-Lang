"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Clock, BookOpen, X, CheckCircle2, AlertTriangle, ArrowRight, Flag } from "lucide-react";

interface ModeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  testId: string;
  testNumber: number;
  testType: "listening" | "reading";
  durationMinutes: number;
  totalQuestions?: number;
}

export function ModeSelectionModal({
  isOpen,
  onClose,
  testId,
  testNumber,
  testType,
  durationMinutes,
  totalQuestions = 39,
}: ModeSelectionModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const basePath = testType === "listening" ? "/dashboard/listening" : "/dashboard/reading";

  const handleSelectMode = (mode: "exam" | "review") => {
    onClose();
    router.push(`${basePath}/${testId}?mode=${mode}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0B132B] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-7 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
            {testType === "listening" ? "Compréhension Orale" : "Compréhension Écrite"} · Test #{testNumber}
          </span>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50">
            Comment voulez-vous vous entraîner ?
          </h2>
          <p className="text-zinc-500 text-xs mt-1">
            Choisissez entre les conditions réelles d'examen ou l'apprentissage guidé sans limite de temps.
          </p>
        </div>

        {/* Mode Options */}
        <div className="space-y-3.5">
          {/* 1. Exam Mode */}
          <button
            onClick={() => handleSelectMode("exam")}
            className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-amber-50/20 dark:hover:bg-amber-950/20 transition-all group"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      Mode Examen Officiel
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      {durationMinutes} min
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                  {totalQuestions} questions sous minuteur strict. Aucune réponse ni explication n'est dévoilée avant la fin. Vous pouvez marquer les questions incertaines.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    ⏳ Minuteur {durationMinutes} min
                  </span>
                  <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    🚫 Sans spoiler
                  </span>
                  <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    ❓ Marquer pour révision
                  </span>
                </div>
              </div>
            </div>
          </button>

          {/* 2. Review / Practice Mode */}
          <button
            onClick={() => handleSelectMode("review")}
            className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition-all group"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      Mode Révision & Pratique
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      Sans chrono
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                  Avancez à votre rythme. Dès que vous répondez, la bonne réponse, la transcription audio, la traduction et le piège officiel vous sont immédiatement révélés.
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    ✅ Correction instantanée
                  </span>
                  <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    💡 Analyse des pièges
                  </span>
                  <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                    🔄 À votre propre rythme
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
