"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Headphones, Sparkles, Filter, CheckCircle2, ArrowRight } from "lucide-react";
import { getUniqueListeningByLevel } from "@/data/unique-questions";
import { CefrLevel } from "@/lib/ai/types";
import { AudioPlayer } from "@/components/AudioPlayer";
import { AiExplainerModal } from "@/components/AiExplainerModal";

export default function UniqueListeningPage() {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>("B2");
  const uniqueMap = getUniqueListeningByLevel();
  const questions = uniqueMap[selectedLevel];
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const currentQ = questions[activeQIndex] || questions[0];

  const levels: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" /> Banque de Questions Uniques Dédupliquées
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
              Écoute Dédupliquée par Niveau CECRL
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm sm:text-base max-w-2xl">
              Le TCF recycle fréquemment les questions d'une session à l'autre. Entraînez-vous uniquement sur les questions uniques classées de A1 à C2. Zéro temps perdu.
            </p>
          </div>

          <Link
            href="/dashboard/unique-reading"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200"
          >
            Passer à la Lecture Unique →
          </Link>
        </div>
      </div>

      {/* Level Filters (A1 to C2) */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 overflow-x-auto">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2 font-mono">
          <Filter className="w-3.5 h-3.5" /> Filtrer :
        </span>
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setSelectedLevel(lvl);
              setActiveQIndex(0);
              setSelectedOption(null);
              setHasChecked(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
              selectedLevel === lvl
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Niveau {lvl}
          </button>
        ))}
      </div>

      {/* Question Card */}
      {currentQ ? (
        <div className="max-w-3xl mx-auto space-y-6">
          <AudioPlayer
            speechText={currentQ.frenchTranscript}
            title={`Question Unique (Niveau ${currentQ.level})`}
          />

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                QUESTION DÉDUPLIQUÉE · NIVEAU {currentQ.level}
              </span>
              <button
                onClick={() => setAiModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" /> Analyse du piège IA
              </button>
            </div>

            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {currentQ.prompt}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {Object.entries(currentQ.options).map(([k, v]) => {
                const isSelected = selectedOption === k;
                const isCorrect = currentQ.correctAnswer === k;

                let style =
                  "border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40";

                if (isSelected && !hasChecked) {
                  style = "border-blue-600 bg-blue-50 dark:bg-blue-950/40 font-bold";
                }

                if (hasChecked) {
                  if (isCorrect) {
                    style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold";
                  } else if (isSelected && !isCorrect) {
                    style = "border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 line-through";
                  }
                }

                return (
                  <button
                    key={k}
                    onClick={() => {
                      if (!hasChecked) setSelectedOption(k);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${style}`}
                  >
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs">
                        {k}
                      </span>
                      <span>{v}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Check Button & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {!hasChecked ? (
                <button
                  onClick={() => setHasChecked(true)}
                  disabled={!selectedOption}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 transition"
                >
                  Vérifier ma réponse
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Bonne réponse : {currentQ.correctAnswer}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedOption(null);
                      setHasChecked(false);
                      setActiveQIndex((prev) => (prev + 1) % questions.length);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90"
                  >
                    Question suivante <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-12 text-zinc-500">
          Aucune question trouvée pour ce niveau.
        </div>
      )}

      {/* AI Explainer Modal */}
      {currentQ && (
        <AiExplainerModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          questionNumber={currentQ.questionNumber}
          questionPrompt={currentQ.prompt}
          options={currentQ.options}
          correctKey={currentQ.correctAnswer}
          transcriptOrContext={currentQ.frenchTranscript}
          preloadedExplanation={currentQ.explanation}
          preloadedTrapAlert={currentQ.trapAlert}
          testType="listening"
        />
      )}
    </div>
  );
}
