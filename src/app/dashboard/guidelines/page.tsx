"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Award,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Target,
  FileText,
  Calculator,
  ChevronRight,
} from "lucide-react";

export default function TcfGuidelinesPage() {
  const [selectedSkill, setSelectedSkill] = useState<
    "all" | "listening" | "reading" | "writing" | "speaking"
  >("all");

  // CRS Points Bonus Simulator State
  const [coScore, setCoScore] = useState<number>(460);
  const [ceScore, setCeScore] = useState<number>(460);
  const [eeScore, setEeScore] = useState<number>(11);
  const [eoScore, setEoScore] = useState<number>(11);

  // Helper NCLC calculation
  const getCoNclc = (score: number) => {
    if (score >= 549) return 10;
    if (score >= 523) return 9;
    if (score >= 503) return 8;
    if (score >= 458) return 7;
    if (score >= 398) return 6;
    if (score >= 331) return 5;
    return 4;
  };

  const getCeNclc = (score: number) => {
    if (score >= 549) return 10;
    if (score >= 524) return 9;
    if (score >= 499) return 8;
    if (score >= 453) return 7;
    if (score >= 406) return 6;
    if (score >= 342) return 5;
    return 4;
  };

  const getEeNclc = (score: number) => {
    if (score >= 16) return 10;
    if (score >= 14) return 9;
    if (score >= 12) return 8;
    if (score >= 10) return 7;
    if (score >= 7) return 6;
    if (score >= 4) return 5;
    return 4;
  };

  const getEoNclc = (score: number) => {
    if (score >= 16) return 10;
    if (score >= 14) return 9;
    if (score >= 12) return 8;
    if (score >= 10) return 7;
    if (score >= 7) return 6;
    if (score >= 4) return 5;
    return 4;
  };

  const nclcCo = getCoNclc(coScore);
  const nclcCe = getCeNclc(ceScore);
  const nclcEe = getEeNclc(eeScore);
  const nclcEo = getEoNclc(eoScore);

  const qualifiesFor50Crs =
    nclcCo >= 7 && nclcCe >= 7 && nclcEe >= 7 && nclcEo >= 7;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Clock className="w-4 h-4" /> Référentiel Officiel France Éducation International & IRCC
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
              Format, Barème & Règles Officielles du TCF Canada
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base max-w-3xl leading-relaxed">
              Durée totale estimée à <strong>2 heures et 47 minutes</strong> réparties sur 4 épreuves obligatoires. Maîtrisez le déroulement minute par minute, les critères d'évaluation et le seuil NCLC 7 pour décrocher vos <strong>+50 points bonus Entrée Express</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/mock-exam"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Lancer la Simulation Complète (2h47)
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards of the 4 Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Module 1: CO */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-900/60 shadow-sm hover:shadow-md transition space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
              Épreuve 1 · QCM
            </span>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Compréhension Orale
            </h3>
          </div>
          <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
            <div>⏱️ <strong>35 minutes</strong></div>
            <div>❓ <strong>39 questions</strong> (A1 à C2)</div>
            <div>🎯 Score : <strong>0 à 699 pts</strong></div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">
              Seuil NCLC 7 : 458 - 502 pts
            </div>
          </div>
          <p className="text-xs text-zinc-500 font-serif leading-relaxed">
            Audio diffusé une seule fois. Documents audio de la vie courante et émissions radio.
          </p>
        </div>

        {/* Module 2: CE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-900/60 shadow-sm hover:shadow-md transition space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
              Épreuve 2 · QCM
            </span>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Compréhension Écrite
            </h3>
          </div>
          <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
            <div>⏱️ <strong>60 minutes</strong></div>
            <div>❓ <strong>39 questions</strong> (A1 à C2)</div>
            <div>🎯 Score : <strong>0 à 699 pts</strong></div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">
              Seuil NCLC 7 : 453 - 498 pts
            </div>
          </div>
          <p className="text-xs text-zinc-500 font-serif leading-relaxed">
            Lecture autonome. Messages simples, articles de presse, synthèses et analyses d'auteurs.
          </p>
        </div>

        {/* Module 3: EE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/60 shadow-sm hover:shadow-md transition space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
              Épreuve 3 · Rédaction
            </span>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Expression Écrite
            </h3>
          </div>
          <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
            <div>⏱️ <strong>60 minutes</strong> au total</div>
            <div>✍️ <strong>3 tâches</strong> (T1, T2, T3)</div>
            <div>🎯 Score : <strong>0 à 20 pts</strong></div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">
              Seuil NCLC 7 : 10 à 11 / 20
            </div>
          </div>
          <p className="text-xs text-zinc-500 font-serif leading-relaxed">
            T1 (60-120 mots), T2 (120-150 mots), T3 (120-180 mots). Respect strict des longueurs requis.
          </p>
        </div>

        {/* Module 4: EO */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-200 dark:border-rose-900/60 shadow-sm hover:shadow-md transition space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold text-rose-600 uppercase tracking-widest block">
              Épreuve 4 · Oral
            </span>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Expression Orale
            </h3>
          </div>
          <div className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
            <div>⏱️ <strong>12 à 15 minutes</strong></div>
            <div>🗣️ <strong>3 tâches</strong> interactives</div>
            <div>🎯 Score : <strong>0 à 20 pts</strong></div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold">
              Seuil NCLC 7 : 10 à 11 / 20
            </div>
          </div>
          <p className="text-xs text-zinc-500 font-serif leading-relaxed">
            T1 (~2 min sans prépa), T2 (2 min prépa + 3m30s questions), T3 (4m30s monologue argumenté).
          </p>
        </div>
      </div>

      {/* Deep-Dive Module Breakdown */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-zinc-950 dark:text-zinc-50">
          Détail Minute par Minute des 4 Épreuves
        </h2>

        {/* Detailed Breakdown Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Detailed Writing Panel */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <PenTool className="w-5 h-5 text-emerald-600" />
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Expression Écrite (60 minutes · 3 tâches)
              </h3>
            </div>
            <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300 font-serif">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-100">
                  <span>Tâche 1 : Message ou courriel amical</span>
                  <span className="font-mono text-emerald-600">60 à 120 mots (~15 min)</span>
                </div>
                <p className="text-zinc-500">
                  Rédiger un courriel pour inviter, remercier, féliciter ou informer un ami. Ton informel, salutations et formules de congé adaptées.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-100">
                  <span>Tâche 2 : Article de blog / Récit personnel</span>
                  <span className="font-mono text-emerald-600">120 à 150 mots (~20 min)</span>
                </div>
                <p className="text-zinc-500">
                  Raconter une expérience vécue (voyage, déménagement, découverte d'un passe-temps) et exprimer ses émotions et recommandations.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-100">
                  <span>Tâche 3 : Essai argumentatif comparatif</span>
                  <span className="font-mono text-emerald-600">120 à 180 mots (~25 min)</span>
                </div>
                <p className="text-zinc-500">
                  Comparer deux avis divergents extraits d'un forum ou journal, puis développer votre opinion personnelle argumentée avec des connecteurs logiques.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Speaking Panel */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <Mic className="w-5 h-5 text-rose-600" />
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Expression Orale (12 à 15 minutes · 3 tâches)
              </h3>
            </div>
            <div className="space-y-3 text-xs text-zinc-700 dark:text-zinc-300 font-serif">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-100">
                  <span>Tâche 1 : Entretien dirigé</span>
                  <span className="font-mono text-rose-600">~2 min · 0 min prépa</span>
                </div>
                <p className="text-zinc-500">
                  L'examinateur vous interroge sur votre identité, votre travail, votre cadre de vie et vos motivations d'installation au Canada.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-100">
                  <span>Tâche 2 : Interaction / Jeu de rôle</span>
                  <span className="font-mono text-blue-600">2 min prépa · 3 min 30 s oral</span>
                </div>
                <p className="text-zinc-500">
                  À partir d'un document déclencheur (annonce), vous posez 10 à 15 questions précises et variées à l'examinateur pour obtenir toutes les informations.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <div className="flex items-center justify-between font-bold text-zinc-900 dark:text-zinc-100">
                  <span>Tâche 3 : Monologue d'argumentation</span>
                  <span className="font-mono text-rose-600">4 min 30 s continu</span>
                </div>
                <p className="text-zinc-500">
                  Présenter son point de vue sur une question de société complexe, structurer une thèse, une antithèse et une conclusion sans être interrompu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive NCLC & CRS Points Bonus Calculator */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#080E1A] to-[#121E38] text-white border border-blue-900/50 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                Simulateur de Bonus Express Entry (+50 CRS)
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Ajustez vos scores pour vérifier l'éligibilité au bonus fédéral NCLC 7
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border ${
                qualifiesFor50Crs
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/40"
              }`}
            >
              {qualifiesFor50Crs
                ? "🎉 +50 POINTS CRS VALIDÉS"
                : "⚠️ NCLC 7 REQUIS DANS LES 4 ÉPREUVES"}
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* CO Slider */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">Écoute (CO)</span>
              <span className="font-mono text-blue-400 font-bold">
                {coScore} / 699 (NCLC {nclcCo})
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="699"
              value={coScore}
              onChange={(e) => setCoScore(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="text-[10px] font-mono text-zinc-500">Seuil NCLC 7 : ≥ 458</div>
          </div>

          {/* CE Slider */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">Lecture (CE)</span>
              <span className="font-mono text-indigo-400 font-bold">
                {ceScore} / 699 (NCLC {nclcCe})
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="699"
              value={ceScore}
              onChange={(e) => setCeScore(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="text-[10px] font-mono text-zinc-500">Seuil NCLC 7 : ≥ 453</div>
          </div>

          {/* EE Slider */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">Écriture (EE)</span>
              <span className="font-mono text-emerald-400 font-bold">
                {eeScore} / 20 (NCLC {nclcEe})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={eeScore}
              onChange={(e) => setEeScore(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="text-[10px] font-mono text-zinc-500">Seuil NCLC 7 : ≥ 10/20</div>
          </div>

          {/* EO Slider */}
          <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-zinc-300">Oral (EO)</span>
              <span className="font-mono text-rose-400 font-bold">
                {eoScore} / 20 (NCLC {nclcEo})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={eoScore}
              onChange={(e) => setEoScore(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="text-[10px] font-mono text-zinc-500">Seuil NCLC 7 : ≥ 10/20</div>
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-serif leading-relaxed">
          💡 <strong>Règle officielle Immigration Canada :</strong> Pour obtenir le bonus maximal de <strong>+50 points</strong> sous le système Entrée Express (CRS), vous devez impérativement obtenir au minimum le niveau <strong>NCLC 7 dans chacune des 4 compétences linguistiques</strong> sans aucune exception.
        </p>
      </div>

      {/* Quick Launch Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <Link
          href="/dashboard/listening"
          className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm transition"
        >
          <span>40 Tests d'Écoute (35 min)</span>
          <ChevronRight className="w-4 h-4 text-blue-500" />
        </Link>
        <Link
          href="/dashboard/reading"
          className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm transition"
        >
          <span>40 Tests de Lecture (60 min)</span>
          <ChevronRight className="w-4 h-4 text-indigo-500" />
        </Link>
        <Link
          href="/dashboard/writing"
          className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm transition"
        >
          <span>113 Sujets d'Écriture (60 min)</span>
          <ChevronRight className="w-4 h-4 text-emerald-500" />
        </Link>
        <Link
          href="/dashboard/speaking"
          className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-rose-500 flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-sm transition"
        >
          <span>30 Situations d'Oral (15 min)</span>
          <ChevronRight className="w-4 h-4 text-rose-500" />
        </Link>
      </div>
    </div>
  );
}
