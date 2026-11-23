"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ArrowRight,
  Play,
  RotateCcw,
  Check,
  ChevronRight,
  ShieldCheck,
  Target,
} from "lucide-react";
import { TcfRulesModal } from "@/components/TcfRulesModal";

interface StageState {
  id: "listening" | "reading" | "writing" | "speaking";
  name: string;
  durationMinutes: number;
  totalQuestionsOrTasks: string;
  scoring: string;
  status: "pending" | "in_progress" | "completed";
  score?: number;
  nclc?: number;
}

export default function MockExamPage() {
  const [stages, setStages] = useState<StageState[]>([
    {
      id: "listening",
      name: "Compréhension Orale",
      durationMinutes: 35,
      totalQuestionsOrTasks: "39 questions QCM",
      scoring: "0 à 699 pts",
      status: "pending",
    },
    {
      id: "reading",
      name: "Compréhension Écrite",
      durationMinutes: 60,
      totalQuestionsOrTasks: "39 questions QCM",
      scoring: "0 à 699 pts",
      status: "pending",
    },
    {
      id: "writing",
      name: "Expression Écrite",
      durationMinutes: 60,
      totalQuestionsOrTasks: "3 tâches rédigées",
      scoring: "0 à 20 pts",
      status: "pending",
    },
    {
      id: "speaking",
      name: "Expression Orale",
      durationMinutes: 15,
      totalQuestionsOrTasks: "3 tâches interactives",
      scoring: "0 à 20 pts",
      status: "pending",
    },
  ]);

  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  // Total duration in minutes: 35 + 60 + 60 + 15 = 170 min (~2h 47m)
  const totalDurationMinutes = 167;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <Clock className="w-4 h-4" /> Simulation d'Examen Intégrale · TCF Canada
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
              Grand Examen Blanc TCF Canada (2h 47 min)
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base max-w-3xl leading-relaxed">
              Enchaînez les 4 épreuves officielles sous strictes conditions réelles sans interruption : 35 min d'Écoute (39 QCM), 60 min de Lecture (39 QCM), 60 min d'Écriture (3 tâches) et 15 min d'Oral.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setRulesModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 transition"
            >
              Consulter les Règles
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Overview Stepper */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-zinc-500 uppercase tracking-wider">
            Parcours de l'Examen Officiel (4 Modules)
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900">
            Durée Totale : ~2h 47 min
          </span>
        </div>

        {/* 4 Stages Sequence Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, idx) => {
            const isCurrent = activeStageIndex === idx;
            const isDone = stage.status === "completed";

            return (
              <div
                key={stage.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  isCurrent
                    ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-500 shadow-md ring-2 ring-blue-500/20"
                    : isDone
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
                    : "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800/80"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">
                      Étape {idx + 1} / 4
                    </span>
                    {isDone ? (
                      <span className="p-1 rounded-full bg-emerald-500 text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : isCurrent ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600 text-white">
                        Actif
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {stage.name}
                  </h3>

                  <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 space-y-0.5">
                    <div>⏱️ {stage.durationMinutes} minutes</div>
                    <div>📋 {stage.totalQuestionsOrTasks}</div>
                    <div>🎯 {stage.scoring}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800">
                  {stage.id === "listening" && (
                    <Link
                      href="/dashboard/listening/listening-test-1?mode=exam"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition active:scale-95"
                    >
                      Démarrer Écoute (35m) <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {stage.id === "reading" && (
                    <Link
                      href="/dashboard/reading/reading-test-1?mode=exam"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition active:scale-95"
                    >
                      Démarrer Lecture (60m) <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {stage.id === "writing" && (
                    <Link
                      href="/dashboard/writing"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition active:scale-95"
                    >
                      Démarrer Écriture (60m) <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {stage.id === "speaking" && (
                    <Link
                      href="/dashboard/speaking"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition active:scale-95"
                    >
                      Démarrer Oral (15m) <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules & Recommendations Box */}
      <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          Conditions Réelles d'Examen à Respecter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-serif text-zinc-600 dark:text-zinc-400">
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <strong className="text-zinc-900 dark:text-zinc-100 font-sans block">1. Aucun retour audio</strong>
            En compréhension orale, chaque audio n'est joué qu'une seule fois. Ne mettez pas en pause et cochez votre réponse immédiatement.
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <strong className="text-zinc-900 dark:text-zinc-100 font-sans block">2. Gestion du temps de lecture</strong>
            60 minutes pour 39 questions : accordez environ 1 minute par question sur les textes courts et gardez 25 minutes pour les longs textes d'analyse.
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
            <strong className="text-zinc-900 dark:text-zinc-100 font-sans block">3. Respect des longueurs de texte</strong>
            En expression écrite, respectez scrupuleusement les fourchettes (T1: 60-120, T2: 120-150, T3: 120-180 mots) sous peine de pénalité directe.
          </div>
        </div>
      </div>

      <TcfRulesModal
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
      />
    </div>
  );
}
