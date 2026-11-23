"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Sparkles,
  RotateCcw,
  Headphones,
  BookOpen,
  Filter,
  ArrowRight,
} from "lucide-react";
import {
  getMistakes,
  markMistakeMastered,
  deleteMistake,
  SavedMistakeItem,
} from "@/lib/mistakes";
import { AiExplainerModal } from "@/components/AiExplainerModal";

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<SavedMistakeItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "listening" | "reading" | "unmastered" | "mastered"
  >("all");
  const [activeModalMistake, setActiveModalMistake] =
    useState<SavedMistakeItem | null>(null);

  useEffect(() => {
    setMistakes(getMistakes());
  }, []);

  const totalCount = mistakes.length;
  const masteredCount = mistakes.filter((m) => m.mastered).length;
  const pendingCount = totalCount - masteredCount;

  const filteredMistakes = mistakes.filter((m) => {
    if (activeFilter === "listening") return m.skill === "listening";
    if (activeFilter === "reading") return m.skill === "reading";
    if (activeFilter === "unmastered") return !m.mastered;
    if (activeFilter === "mastered") return m.mastered;
    return true;
  });

  const handleToggleMastery = (id: string, currentStatus: boolean) => {
    markMistakeMastered(id, !currentStatus);
    setMistakes(getMistakes());
  };

  const handleDelete = (id: string) => {
    deleteMistake(id);
    setMistakes(getMistakes());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <BookmarkCheck className="w-4 h-4" /> Espace Révision Personnalisé
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Mon Carnet d'Erreurs & Pièges TCF
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl text-sm sm:text-base">
            Chaque question manquée lors de vos épreuves est automatiquement archivée ici. Révisez les pièges officiels récurrents jusqu'à la maîtrise parfaite.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            <div className="text-center">
              <span className="block text-xl font-bold font-mono text-rose-600 dark:text-rose-400">
                {pendingCount}
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-zinc-500">
                À Réviser
              </span>
            </div>
            <div className="w-[1px] h-8 bg-zinc-300 dark:bg-zinc-700" />
            <div className="text-center">
              <span className="block text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {masteredCount}
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-zinc-500">
                Maîtrisées
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8 overflow-x-auto">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-400 mr-2 font-mono">
          <Filter className="w-3.5 h-3.5" /> Filtrer :
        </span>
        {[
          { id: "all", label: `Toutes (${totalCount})` },
          { id: "unmastered", label: `Non maîtrisées (${pendingCount})` },
          { id: "mastered", label: `Maîtrisées (${masteredCount})` },
          { id: "listening", label: "Compréhension Orale" },
          { id: "reading", label: "Compréhension Écrite" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
              activeFilter === tab.id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mistakes List */}
      {filteredMistakes.length > 0 ? (
        <div className="space-y-6">
          {filteredMistakes.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all ${
                item.mastered
                  ? "bg-zinc-50/60 dark:bg-zinc-900/40 border-emerald-500/30 opacity-75"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase ${
                      item.skill === "listening"
                        ? "bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                        : "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900"
                    }`}
                  >
                    {item.skill === "listening" ? (
                      <Headphones className="w-3 h-3" />
                    ) : (
                      <BookOpen className="w-3 h-3" />
                    )}
                    {item.skill === "listening" ? "Écoute" : "Lecture"} · Q{item.questionNumber}
                  </span>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold">
                    Niveau {item.level}
                  </span>

                  {item.mastered && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                      <CheckCircle2 className="w-3 h-3" /> Maîtrisé
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleMastery(item.id, item.mastered)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                      item.mastered
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {item.mastered ? "Marquer à réviser" : "Marquer comme maîtrisé"}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveModalMistake(item)}
                    className="p-1.5 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition"
                    title="Explication détaillée par l'IA"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition"
                    title="Supprimer du carnet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                {item.prompt}
              </h3>

              {/* Context if available */}
              {item.contextText && (
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif mb-4">
                  <div className="text-[10px] uppercase font-mono font-bold text-zinc-400 mb-1">
                    Contexte / Transcription :
                  </div>
                  {item.contextText}
                </div>
              )}

              {/* Answers Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                  <span className="block text-[10px] uppercase font-mono font-bold text-rose-600 dark:text-rose-400 mb-1">
                    Votre Réponse (Erronée) :
                  </span>
                  <div className="text-xs font-semibold text-rose-900 dark:text-rose-200">
                    Option {item.selectedAnswer}: {item.options[item.selectedAnswer] || "Non sélectionné"}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
                  <span className="block text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    Réponse Exacte :
                  </span>
                  <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                    Option {item.correctAnswer}: {item.options[item.correctAnswer] || item.correctAnswer}
                  </div>
                </div>
              </div>

              {/* Trap breakdown & pedagogical explanation */}
              {item.trapAlert && (
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Piège officiel TCF : </span>
                    {item.trapAlert}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 p-8">
          <BookmarkCheck className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            Votre Carnet d'Erreurs est Vide
          </h3>
          <p className="text-zinc-500 text-sm mt-1 max-w-md mx-auto">
            Lorsque vous vous entraînez sur l'un des 40 tests complets, toute réponse manquée est automatiquement archivée ici pour un travail ciblé.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard/listening"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <Headphones className="w-4 h-4" />
              <span>Tester la Compréhension Orale</span>
            </Link>
            <Link
              href="/dashboard/reading"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Tester la Compréhension Écrite</span>
            </Link>
          </div>
        </div>
      )}

      {/* AI Explainer Modal */}
      {activeModalMistake && (
        <AiExplainerModal
          isOpen={Boolean(activeModalMistake)}
          onClose={() => setActiveModalMistake(null)}
          questionNumber={activeModalMistake.questionNumber}
          questionPrompt={activeModalMistake.prompt}
          options={activeModalMistake.options}
          correctKey={activeModalMistake.correctAnswer}
          userSelectedKey={activeModalMistake.selectedAnswer}
          transcriptOrContext={activeModalMistake.contextText}
          preloadedExplanation={activeModalMistake.explanation}
          preloadedTrapAlert={activeModalMistake.trapAlert}
          testType={activeModalMistake.skill}
        />
      )}
    </div>
  );
}
