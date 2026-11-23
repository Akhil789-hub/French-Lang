"use client";

import React, { useState } from "react";
import { Sparkles, AlertTriangle, BookA, Globe, Lightbulb, X, Loader2 } from "lucide-react";
import { TCFExplanationResult } from "@/lib/ai/types";

interface AiExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionNumber: number;
  questionPrompt: string;
  options: Record<string, string>;
  correctKey: string;
  userSelectedKey?: string;
  transcriptOrContext?: string;
  preloadedExplanation?: string;
  preloadedTrapAlert?: string;
  testType?: "listening" | "reading";
}

export function AiExplainerModal({
  isOpen,
  onClose,
  questionNumber,
  questionPrompt,
  options,
  correctKey,
  userSelectedKey,
  transcriptOrContext,
  preloadedExplanation,
  preloadedTrapAlert,
  testType = "listening",
}: AiExplainerModalProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TCFExplanationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAiDeepAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/test/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testType,
          questionNumber,
          questionPrompt,
          options,
          correctKey,
          transcriptOrContext,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Impossible d'obtenir l'explication.");
      }
      setData(json.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Analyse & Détection de Piège — Question {questionNumber}
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Explication pédagogique certifiée TCF Canada
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Review Snippet */}
        <div className="bg-zinc-50 dark:bg-zinc-950/60 rounded-xl p-4 border border-zinc-200/80 dark:border-zinc-800 mb-6">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
            {questionPrompt}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {Object.entries(options).map(([k, v]) => (
              <div
                key={k}
                className={`p-2 rounded-lg border font-mono ${
                  k === correctKey
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-bold"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <span className="font-bold mr-1.5">{k})</span> {v}
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Explanation from Bank */}
        {preloadedExplanation && (
          <div className="mb-4">
            <h4 className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Pourquoi l'option {correctKey} est la bonne réponse :
            </h4>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-amber-50/50 dark:bg-amber-950/20 p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
              {preloadedExplanation}
            </p>
          </div>
        )}

        {/* Trap Alert */}
        {preloadedTrapAlert && (
          <div className="mb-6">
            <h4 className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 mb-1.5">
              <AlertTriangle className="w-4 h-4" />
              Détection du Piège TCF (Attention aux fausses pistes) :
            </h4>
            <p className="text-sm text-red-950 dark:text-red-200/90 leading-relaxed bg-red-50 dark:bg-red-950/30 p-3.5 rounded-xl border border-red-200 dark:border-red-900/50">
              {preloadedTrapAlert}
            </p>
          </div>
        )}

        {/* AI Deep Analysis Section */}
        {data && (
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in">
            {/* English Translation */}
            <div className="bg-blue-50/60 dark:bg-blue-950/30 rounded-xl p-3.5 border border-blue-200/60 dark:border-blue-900/40">
              <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-1">
                <Globe className="w-3.5 h-3.5" /> English Translation & Summary
              </h5>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {data.englishTranslation}
              </p>
            </div>

            {/* Key Vocabulary */}
            {data.keyVocabulary && data.keyVocabulary.length > 0 && (
              <div>
                <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  <BookA className="w-3.5 h-3.5 text-blue-500" /> Vocabulaire Clé & Collocations
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.keyVocabulary.map((v, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs"
                    >
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {v.term} — <span className="font-normal italic text-blue-600 dark:text-blue-400">{v.translation}</span>
                      </div>
                      <div className="text-zinc-500 dark:text-zinc-400 mt-0.5">{v.usage}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs my-3">
            {error}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-5 border-t border-zinc-100 dark:border-zinc-800 mt-6">
          {!data ? (
            <button
              onClick={fetchAiDeepAnalysis}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyse IA approfondie en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Approfondir avec le Tuteur IA (Multi-Modèle)
                </>
              )}
            </button>
          ) : (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              ✓ Analyse IA générée avec succès
            </span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
