"use client";

import React, { useState, useEffect } from "react";
import {
  PenTool,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  RotateCcw,
  Clock,
  Layers,
  ChevronRight,
  Loader2,
  Lightbulb,
} from "lucide-react";
import { TCFWritingTopic } from "@/data/writing-topics";
import { TCFEvaluationResult } from "@/lib/ai/types";
import { saveTestResult } from "@/lib/storage";

export default function WritingStudioPage() {
  const [topics, setTopics] = useState<TCFWritingTopic[]>([]);
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [selectedTask, setSelectedTask] = useState<1 | 2 | 3>(1);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [submissionText, setSubmissionText] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<TCFEvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  // Fetch topics from PostgreSQL backend
  useEffect(() => {
    async function fetchTopics() {
      setLoadingTopics(true);
      try {
        const res = await fetch("/api/topics/writing");
        const json = await res.json();
        if (json.success && json.data) {
          setTopics(json.data);
          const first = json.data.find((t: TCFWritingTopic) => t.taskNumber === 1);
          if (first) setSelectedTopicId(first.id);
        }
      } catch (err) {
        console.error("Failed to fetch writing topics from PostgreSQL:", err);
      } finally {
        setLoadingTopics(false);
      }
    }
    fetchTopics();
  }, []);

  const activeTopics = topics.filter((t) => t.taskNumber === selectedTask);
  const currentTopic = topics.find((t) => t.id === selectedTopicId) || activeTopics[0];

  const words = submissionText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const minWords = currentTopic?.minWords || 60;
  const maxWords = currentTopic?.maxWords || 120;
  const isWordCountValid = wordCount >= minWords && wordCount <= maxWords;
  const isTooShort = wordCount < minWords && wordCount > 0;

  const handleEvaluate = async () => {
    if (!currentTopic) return;
    if (wordCount < 10) {
      setError("Veuillez rédiger au moins quelques phrases avant de lancer l'évaluation.");
      return;
    }

    setIsEvaluating(true);
    setError(null);

    try {
      const res = await fetch("/api/writing/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskNumber: currentTopic.taskNumber,
          topic: currentTopic.prompt,
          submission: submissionText,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Échec de l'évaluation par l'IA.");
      }

      setEvaluation(json.data);
      saveTestResult("writing", {
        testId: currentTopic.id,
        testNumber: currentTopic.topicNumber,
        score: json.data.overallScore,
        nclcLevel: json.data.nclcLevel,
        cefrLevel: json.data.cefrLevel,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur inattendue");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-8">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-sm font-semibold uppercase tracking-wider mb-2">
          <PenTool className="w-4 h-4" /> Studio d'Expression Écrite (EE) TCF Canada
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
              113 Sujets d'Écriture avec Évaluation IA Illimitée
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm sm:text-base max-w-2xl">
              Données stockées sur PostgreSQL. Entraînez-vous sans aucune restriction de jetons. Correction morphosyntaxique, score NCLC estimé (0 à 699) et modèles C1 pour chaque sujet.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5" /> Retries Illimités & Gratuits
            </span>
          </div>
        </div>
      </div>

      {/* Task Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6 overflow-x-auto">
        {[
          { task: 1, label: "Tâche 1 : Message / Courriel (60-120 mots)" },
          { task: 2, label: "Tâche 2 : Récit d'expérience (120-150 mots)" },
          { task: 3, label: "Tâche 3 : Essai argumentatif (120-180 mots)" },
        ].map((t) => (
          <button
            key={t.task}
            onClick={() => {
              setSelectedTask(t.task as 1 | 2 | 3);
              const firstTopic = topics.find((item) => item.taskNumber === t.task);
              if (firstTopic) setSelectedTopicId(firstTopic.id);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
              selectedTask === t.task
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loadingTopics ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
          <p className="text-sm font-mono text-zinc-500">Chargement des 113 sujets depuis Supabase PostgreSQL...</p>
        </div>
      ) : currentTopic ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editor Area (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  TÂCHE {currentTopic.taskNumber} · {currentTopic.category}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Requis : {currentTopic.minWords} à {currentTopic.maxWords} mots
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {currentTopic.title}
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 font-serif">
                {currentTopic.prompt}
              </p>

              {currentTopic.keyVocabulary && currentTopic.keyVocabulary.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs font-medium text-zinc-400 mr-1">Vocabulaire utile :</span>
                  {currentTopic.keyVocabulary.map((word, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Votre Rédaction
                </label>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      isWordCountValid
                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                        : isTooShort
                        ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                        : "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800"
                    }`}
                  >
                    {wordCount} mots (requis : {currentTopic.minWords}-{currentTopic.maxWords})
                  </span>
                </div>
              </div>

              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Rédigez ici votre réponse en français en soignant votre argumentation, vos connecteurs logiques et vos accords..."
                rows={12}
                className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />

              {error && (
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  {showModelAnswer ? "Masquer Modèle C1" : "Voir Réponse Modèle C1"}
                </button>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || wordCount < 10}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Évaluation IA en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Évaluer avec l'IA
                    </>
                  )}
                </button>
              </div>

              {showModelAnswer && (
                <div className="mt-4 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Modèle de Réponse Exemplaire (Niveau C1/C2)
                  </div>
                  <p className="text-sm font-serif text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed">
                    {currentTopic.modelAnswer}
                  </p>
                </div>
              )}
            </div>

            {/* AI Evaluation Results Panel */}
            {evaluation && (
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-500/40 shadow-xl space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                      <Award className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                        Évaluation Certifiée TCF Canada
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
                        Score : {evaluation.overallScore} / 699 · NCLC {evaluation.nclcLevel} ({evaluation.cefrLevel})
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {evaluation.wordCount} mots comptabilisés
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
                  {evaluation.summary}
                </p>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Barème Officiel par Critère (Sur 20)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(evaluation.criteria).map(([k, val]) => (
                      <div
                        key={k}
                        className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs"
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span className="capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400">
                            {val.score} / 20
                          </span>
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">{val.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {evaluation.corrections && evaluation.corrections.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                      Corrections Précises & Améliorations C1
                    </h4>
                    <div className="space-y-2.5">
                      {evaluation.corrections.map((corr, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5"
                        >
                          <div className="text-red-600 dark:text-red-400 line-through">
                            {corr.original}
                          </div>
                          <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            ➔ {corr.improved}
                          </div>
                          <div className="text-zinc-500 text-[11px]">{corr.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Topic Selector Matrix (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24 max-h-[80vh] flex flex-col">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                Catalogue Tâche {selectedTask} ({activeTopics.length} sujets)
              </h4>
              <p className="text-[11px] font-mono text-emerald-600 mb-3">
                ✓ Synchronisé avec Supabase PostgreSQL
              </p>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {activeTopics.map((topic) => {
                  const isSelected = topic.id === selectedTopicId;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setSelectedTopicId(topic.id);
                        setSubmissionText("");
                        setEvaluation(null);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-1">
                        <span>SUJET #{topic.topicNumber}</span>
                        <span>{topic.category}</span>
                      </div>
                      <div className="line-clamp-2">{topic.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
