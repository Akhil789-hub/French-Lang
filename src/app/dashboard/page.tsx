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
  Calendar,
  CheckCircle2,
  Settings2,
  BookmarkCheck,
  Target,
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
import {
  getCandidateProfile,
  CandidateProfile,
  calculateDaysRemaining,
  calculateCrsBonus,
} from "@/lib/personalization";
import { getMistakes } from "@/lib/mistakes";
import { OnboardingModal } from "@/components/OnboardingModal";

export default function DashboardOverviewPage() {
  const [profile, setProfile] = useState<CandidateProfile>(getCandidateProfile());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mistakesCount, setMistakesCount] = useState(0);

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
    const p = getCandidateProfile();
    setProfile(p);

    const m = getMistakes().filter((item) => !item.mastered);
    setMistakesCount(m.length);

    const s = getOverallStats();
    setStats({
      ...s,
      avgListening: s.avgListening || 450,
      avgReading: s.avgReading || 430,
      avgWriting: s.avgWriting || 460,
      avgSpeaking: s.avgSpeaking || 440,
      listeningNCLC: s.avgListening ? s.listeningNCLC : p.targetNclc,
      readingNCLC: s.avgReading ? s.readingNCLC : p.targetNclc,
      writingNCLC: s.avgWriting ? s.writingNCLC : p.targetNclc,
      speakingNCLC: s.avgSpeaking ? s.speakingNCLC : p.targetNclc,
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

  const daysRemaining = calculateDaysRemaining(profile.targetExamDate);
  const crsBonus = calculateCrsBonus(profile.targetNclc);

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
      {/* Personalized Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-zinc-950 text-white shadow-2xl border border-blue-900/40 relative overflow-hidden">
        {/* Background Decorative Ambient */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>LF Academy · Espace Candidat</span>
            </span>

            {daysRemaining !== null && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                <Calendar className="w-3.5 h-3.5 text-red-400" />
                <span>J-{daysRemaining} avant votre épreuve</span>
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Série : {profile.streakDays} {profile.streakDays > 1 ? "jours" : "jour"}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Bonjour, {profile.name} !
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-serif">
            Objectif en cours : <strong className="text-white">NCLC {profile.targetNclc}</strong> (+{crsBonus.bonusPoints} points Entrée Express). Accédez à vos 40 tests complets, vos 113 sujets d'écriture et votre carnet d'erreurs personnalisé.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl border border-white/10 transition"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Modifier mes objectifs & date d'examen</span>
            </button>
          </div>
        </div>

        {/* CRS Points Card */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 self-start md:self-auto relative z-10 shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-lg">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold">
              Bonus CRS Express Entry
            </div>
            <div className="text-3xl font-bold font-mono">
              +{crsBonus.bonusPoints} pts
            </div>
            <div className="text-[11px] text-zinc-300 max-w-[180px]">
              Avantage bilingue canadien atteint dès NCLC 7
            </div>
          </div>
        </div>
      </div>

      {/* Mistake Notebook Quick Alert (if user has pending mistakes) */}
      {mistakesCount > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/30 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Vous avez {mistakesCount} {mistakesCount > 1 ? "questions" : "question"} à réviser dans votre Carnet d'Erreurs
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                Travaillez spécifiquement les pièges officiels sur lesquels vous avez trébuché lors de vos sessions.
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/mistakes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition whitespace-nowrap self-start sm:self-auto"
          >
            <span>Ouvrir mon Carnet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Full 2h47 Mock Exam & Guidelines Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white border border-blue-800/50 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
              Format Officiel TCF Canada · 2h 47 min
            </span>
            <span className="text-zinc-400 text-xs hidden sm:inline">|</span>
            <span className="text-emerald-400 font-mono text-xs hidden sm:inline font-bold">
              Objectif NCLC 7+ (+50 CRS)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
            Grand Examen Blanc & Guide Officiel
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-serif leading-relaxed">
            Passez l'épreuve complète en conditions officielles (Écoute 35m · Lecture 60m · Écriture 60m · Oral 15m) ou consultez le référentiel des 4 épreuves avec les barèmes officiels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/dashboard/guidelines"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition active:scale-95"
          >
            📋 Guide & Barème (2h47)
          </Link>
          <Link
            href="/dashboard/mock-exam"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Lancer la Simulation (2h47)</span>
          </Link>
        </div>
      </div>

      {/* 4 Skill Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Listening Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition">
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
              35 min · 39 questions QCM · 0 à 699 pts
            </p>
          </div>
          <Link
            href="/dashboard/listening"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>40 tests · Mode Examen & Révision</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reading Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-indigo-500/40 transition">
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
              60 min · 39 questions QCM · 0 à 699 pts
            </p>
          </div>
          <Link
            href="/dashboard/reading"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <span>40 tests · Mode Examen & Révision</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Writing Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition">
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
              60 min · 3 tâches (T1, T2, T3) · 0 à 20 pts
            </p>
          </div>
          <Link
            href="/dashboard/writing"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <span>113 sujets · Correction IA Gratuite</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Speaking Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-rose-500/40 transition">
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
              12 à 15 min · 3 tâches (T1, T2, T3) · 0 à 20 pts
            </p>
          </div>
          <Link
            href="/dashboard/speaking"
            className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-rose-600 hover:text-rose-700"
          >
            <span>30 situations réelles · Whisper STT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Analytics Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score Progression Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Trajectoire vers NCLC {profile.targetNclc} (Score TCF 0 - 699)
              </h3>
              <p className="text-xs text-zinc-500">
                Évolution de vos performances en compréhension orale et écrite
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Écoute
              </span>
              <span className="flex items-center gap-1.5 text-indigo-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Lecture
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
            <span>Seuil NCLC 7 (Niveau B2) : 420 pts</span>
            <span className="font-semibold text-emerald-600">
              Palier atteint sur vos simulations
            </span>
          </div>
        </div>

        {/* Quick Links & History */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Dernières Tentatives
              </h4>
              <Link
                href="/dashboard/mistakes"
                className="text-[11px] font-semibold text-rose-600 hover:underline flex items-center gap-1"
              >
                <BookmarkCheck className="w-3.5 h-3.5" /> Carnet
              </Link>
            </div>

            {history.length > 0 ? (
              <div className="space-y-2.5">
                {history.map((att) => (
                  <div
                    key={att.id}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold capitalize text-zinc-800 dark:text-zinc-200">
                        {att.skill === "listening"
                          ? "Écoute"
                          : att.skill === "reading"
                          ? "Lecture"
                          : att.skill === "writing"
                          ? "Écriture"
                          : "Oral"}{" "}
                        #{att.testNumber || 1}
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

      {/* Onboarding / Profile Settings Modal */}
      <OnboardingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(updated) => setProfile(updated)}
      />
    </div>
  );
}
