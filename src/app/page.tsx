import Link from "next/link";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Sparkles,
  ArrowRight,
  Award,
  BookmarkCheck,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Flame,
  Globe2,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FCFCFD] dark:bg-[#080E1A] text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Top Academic Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-900 to-slate-950 text-white text-[11px] font-mono py-2.5 text-center px-4 font-bold tracking-wider uppercase border-b border-blue-900/50 flex items-center justify-center gap-2">
        <span>🇨🇦 LF ACADEMY</span>
        <span className="opacity-40">|</span>
        <span>OBJECTIF NCLC 7+ & BONUS EXPRESS ENTRY (+50 CRS)</span>
        <span className="opacity-40">|</span>
        <span className="text-emerald-400">100% GRATUIT</span>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-20 text-center max-w-5xl mx-auto space-y-8">
        {/* Subtle Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-red-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>L'Académie Numérique pour la Maîtrise du Français & l'Immigration Canadienne</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.12]">
          Votre Passerelle d'Excellence vers le{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-rose-600">
            Canada & le NCLC 7+
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-serif leading-relaxed">
          40 tests d'écoute et de lecture complets, 113 sujets d'écriture guidés et studio vocal interactif. Propulsé par une IA multi-modèle gratuite, un carnet d'erreurs personnalisé et zéro frais d'abonnement.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/25 transition-all active:scale-95"
          >
            <span>Accéder à l'Espace Candidat</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/dashboard/listening"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 shadow-sm transition"
          >
            <Headphones className="w-5 h-5 text-blue-600" />
            <span>Tester les 40 Épreuves d'Écoute</span>
          </Link>
        </div>

        {/* Proof Metrics Grid */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-zinc-200 dark:border-zinc-800 text-left">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
            <div className="font-mono text-3xl font-extrabold text-blue-600 dark:text-blue-400">40</div>
            <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">Tests Complets d'Écoute</div>
            <div className="text-[11px] text-zinc-500">1 560 questions avec audio & pièges</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
            <div className="font-mono text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">40</div>
            <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">Tests de Lecture</div>
            <div className="text-[11px] text-zinc-500">1 599 questions A1 à C2 officielles</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
            <div className="font-mono text-3xl font-extrabold text-amber-600 dark:text-amber-400">+50</div>
            <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">Points CRS Express Entry</div>
            <div className="text-[11px] text-zinc-500">Bonus francophone légal garanti</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
            <div className="font-mono text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">0$</div>
            <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-1">Paywall ou Abonnement</div>
            <div className="text-[11px] text-zinc-500">Multi-IA sans friction illimitée</div>
          </div>
        </div>
      </section>

      {/* Express Entry Canadian Advantage Spotlight */}
      <section className="py-16 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent border-y border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-900">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Loi sur l'Immigration Canadienne (IRCC)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              Pourquoi le niveau NCLC 7 en français change tout pour votre Résidence Permanente
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              Le Canada accorde une priorité nationale absolue aux candidats francophones. En validant un score de niveau B2+ (NCLC 7) dans les quatre épreuves du TCF Canada :
            </p>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>+50 points bonus directs</strong> ajoutés à votre profil Entrée Express</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Éligibilité aux <strong>tirages de catégories francophones</strong> (avec des scores CRS souvent inférieurs de 80 à 100 points aux tirages généraux)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Accès direct aux programmes provinciaux (Ontario Francophone, Entrée Express Nouveau-Brunswick, Arrima QC)</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-zinc-400">
                Simulation Gain de Points CRS
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                Bilinguisme Actif
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">Sans Français (Anglais seul CLB 9) :</span>
                <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">~ 470 pts</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-zinc-400 h-full w-[75%]" />
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                  Avec LF Academy (Français NCLC 7+) :
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  ~ 532 pts (+62 pts)
                </span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full w-[95%]" />
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                <span>Démarrer mon entraînement NCLC 7</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Pillar Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
            L'Arsenal Pédagogique le Plus Complet du Web
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-serif">
            Tout est conçu pour reproduire fidèlement l'environnement officiel du TCF Canada et vous faire progresser sans aucune friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-blue-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              40 Épreuves d'Écoute
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              39 questions par test (A1 à C2). Audio haute fidélité, transcription intégrale en français et anglais, phrase clé repère et explication détaillée du piège officiel.
            </p>
            <Link
              href="/dashboard/listening"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline pt-2"
            >
              <span>Accéder aux 40 tests</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-indigo-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              40 Épreuves de Lecture
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              Documents authentiques : affiches, courriels, articles d'opinion, extraits littéraires et essais sociologiques. Minuteur officiel de 60 minutes.
            </p>
            <Link
              href="/dashboard/reading"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:underline pt-2"
            >
              <span>Accéder aux 40 tests</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              113 Sujets d'Écriture Guidés
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              Tâches 1, 2 et 3 avec comptage de mots en temps réel, expressions idiomatiques suggérées, modèles de réponses types et correction IA immédiate.
            </p>
            <Link
              href="/dashboard/writing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:underline pt-2"
            >
              <span>Accéder aux 113 sujets</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-rose-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Studio Vocal avec Whisper STT
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              Entraînez-vous aux 3 tâches de l'oral (présentation, demande d'informations, argumentation) avec enregistrement vocal direct et transcription automatique.
            </p>
            <Link
              href="/dashboard/speaking"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:underline pt-2"
            >
              <span>Lancer le studio vocal</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 5 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Mon Carnet d'Erreurs Automatisé
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              Toute erreur commise en écoute ou en lecture est immédiatement archivée dans votre carnet personnel pour vous permettre de travailler vos pièges récurrents.
            </p>
            <Link
              href="/dashboard/mistakes"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:underline pt-2"
            >
              <span>Consulter mon carnet</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 6 */}
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-purple-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Multi-Modèle IA & Zéro Quota
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
              Routage transparent entre plusieurs fournisseurs d'IA gratuits (Groq, Gemini, Cerebras, Mistral, Pollinations). Retries illimités, zéro paywall.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:underline pt-2"
            >
              <span>En savoir plus</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#080E1A] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo href="/" size="sm" />

          <div className="text-xs text-zinc-500 text-center md:text-right space-y-1">
            <p>LF Academy (Learn French) · Plateforme libre d'apprentissage et de préparation aux examens.</p>
            <p className="text-[11px] text-zinc-400">
              Conçu pour les candidats à l'immigration canadienne (Entrée Express, Arrima, Citoyenneté).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
