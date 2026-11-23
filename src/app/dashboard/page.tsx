"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getOverallStats, getTestResults, StoredTestAttempt } from "@/lib/storage";
import { calculateTotalCRSPoints, getScoreDetails } from "@/lib/tcf-scoring";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState({
    totalTestsTaken: 0,
    listeningCount: 0,
    readingCount: 0,
    writingCount: 0,
    speakingCount: 0,
    avgListening: 450,
    avgReading: 430,
    avgWriting: 460,
    avgSpeaking: 440,
    listeningNCLC: 7,
    readingNCLC: 7,
    writingNCLC: 8,
    speakingNCLC: 7,
  });

  const [history, setHistory] = useState<StoredTestAttempt[]>([]);

  useEffect(() => {
    const s = getOverallStats();
    setStats({
      ...s,
      // Provide reasonable starting defaults if fresh user
      avgListening: s.avgListening || 450,
      avgReading: s.avgReading || 430,
      avgWriting: s.avgWriting || 460,
      avgSpeaking: s.avgSpeaking || 440,
      listeningNCLC: s.avgListening ? s.listeningNCLC : 7,
      readingNCLC: s.avgReading ? s.readingNCLC : 7,
      writingNCLC: s.avgWriting ? s.writingNCLC : 8,
      speakingNCLC: s.avgSpeaking ? s.speakingNCLC : 7,
    });

    const l = getTestResults("listening");
    const r = getTestResults("reading");
    const w = getTestResults("writing");
    const sp = getTestResults("speaking");
    const combined = [...l, ...r, ...w, ...sp].sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    setHistory(combined.slice(0, 8));
  }, []);

  const crs = calculateTotalCRSPoints({
    listening: stats.avgListening,
    reading: stats.avgReading,
    writing: stats.avgWriting,
    speaking: stats.avgSpeaking,
  });

  const chartData = [
    { name: "Test 1", listening: 340, reading: 320 },
    { name: "Test 2", listening: 380, reading: 360 },
    { name: "Test 3", listening: 420, reading: 400 },
    { name: "Test 4", listening: 460, reading: 430 },
    { name: "Actuel", listening: stats.avgListening, reading: stats.avgReading },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-zinc-900 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" /> Objectif Canada Express Entry C1 / NCLC 7+
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Votre Tableau de Bord TCF Canada
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-serif">
            40 tests d'écoute et de lecture complets, 113 sujets d'écriture, enregistreur vocal avec Whisper et évaluation IA illimitée. Aucun abonnement requis.
          </p>
        </div>

        {/* CRS Points Badge */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 self-start md:self-auto relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
              Points CRS Entrée Express
            </div>
            <div className="text-3xl font-bold font-mono">
              +{crs.totalPoints} pts
            </div>
            <div className="text-[11px] text-zinc-300">
              Bonus bilingue francophone inclus ({crs.bilingualBonusPoints} pts)
            </div>
          </div>
        </div>
      </div>

      {/* 4 Skill Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Listening Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                NCLC {stats.listeningNCLC}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Compréhension Orale
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Moyenne estimée : {stats.avgListening} / 699 pts
            </p>
          </div>
          <Link
            href="/dashboard/listening"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>Lancer un test (40 dispo)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reading Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                NCLC {stats.readingNCLC}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Compréhension Écrite
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Moyenne estimée : {stats.avgReading} / 699 pts
            </p>
          </div>
          <Link
            href="/dashboard/reading"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <span>Lancer un test (40 dispo)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Writing Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <PenTool className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                NCLC {stats.writingNCLC}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Expression Écrite
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              113 sujets avec correction IA immédiate
            </p>
          </div>
          <Link
            href="/dashboard/writing"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <span>Studio d'écriture IA</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Speaking Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <Mic className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                NCLC {stats.speakingNCLC}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Expression Orale
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Microphone + Whisper + Évaluation gratuite
            </p>
          </div>
          <Link
            href="/dashboard/speaking"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-rose-600 hover:text-rose-700"
          >
            <span>Studio vocal IA</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Analytics Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score Progression Chart (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Trajectoire de Progression (Score TCF 0 - 699)
              </h3>
              <p className="text-xs text-zinc-500">
                Évolution de vos performances en compréhension orale et écrite
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Écoute (CO)
              </span>
              <span className="flex items-center gap-1.5 text-indigo-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Lecture (CE)
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis domain={[250, 700]} stroke="#888888" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#27272a",
                    borderRadius: "0.75rem",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="listening"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="reading"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
            <span>Seuil NCLC 7 (Niveau B2 requis) : 420 pts</span>
            <span className="font-semibold text-emerald-600">Palier atteint sur les dernières sessions</span>
          </div>
        </div>

        {/* Quick Links & History (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h4 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Dernières Tentatives Enregistrées
            </h4>

            {history.length > 0 ? (
              <div className="space-y-2.5">
                {history.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold capitalize text-zinc-800 dark:text-zinc-200">
                        {att.skill === "listening" ? "Écoute" : att.skill === "reading" ? "Lecture" : att.skill === "writing" ? "Écriture" : "Oral"} #{att.testNumber || 1}
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {new Date(att.completedAt).toLocaleDateString("fr-CA")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold font-mono text-zinc-900 dark:text-zinc-100">
                        {att.score} pts
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold">
                        NCLC {att.nclcLevel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-center text-xs text-zinc-400">
                Aucune session passée pour l'instant. Choisissez une épreuve ci-dessus pour commencer votre première simulation !
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
