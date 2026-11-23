import Link from "next/link";
import {
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Top Notice Bar */}
      <div className="bg-emerald-600 text-white text-xs font-mono py-2 text-center px-4 font-bold tracking-wide">
        🎉 100% GRATUIT & SANS LIMITATION · MULTI-MODÈLE IA INTÉGRÉ · RETRIES ILLIMITÉS
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          Pour tous ceux qui refusent de payer 30$/mois pour les mêmes tests recyclés
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
          Ils facturent 30$/mois pour 40 tests.
          <br />
          <span className="text-blue-600 dark:text-blue-400 underline decoration-blue-500/30 underline-offset-8">
            Voici les 40. Entièrement gratuits.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-serif leading-relaxed">
          Compréhension orale, lecture, écriture et expression orale. Atteignez le niveau C1 et débloquez jusqu'à 50 points bonus Express Entry pour le Canada. Nous avons définitivement supprimé le paywall.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95"
          >
            Commencer Maintenant Gratuitement <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/dashboard/speaking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 transition"
          >
            <Mic className="w-5 h-5 text-rose-500" /> Tester l'Oral IA
          </Link>
        </div>

        {/* Proof metrics */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-zinc-200 dark:border-zinc-800 text-left">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
            <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">40 Tests</div>
            <div className="text-xs text-zinc-500 mt-0.5">Écoute & Lecture complètes</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
            <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">113 Sujets</div>
            <div className="text-xs text-zinc-500 mt-0.5">Écriture Tâches 1, 2, 3</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
            <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">0$ Paywall</div>
            <div className="text-xs text-zinc-500 mt-0.5">Aucun jeton payant imposé</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
            <div className="font-mono text-2xl font-bold text-zinc-900 dark:text-zinc-100">Multi-IA</div>
            <div className="text-xs text-zinc-500 mt-0.5">Failover transparent & illimité</div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
              Tout ce dont vous avez besoin pour décrocher le C1
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-serif">
              Les plateformes concurrentes vous vendent des abonnements mensuels récurrents. Nous vous donnons le simulateur le plus complet avec une IA sans aucune friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
                40 Tests d'Écoute Réels
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                39 questions par test. Après avoir répondu : transcription en français et en anglais, phrase clé mise en évidence et analyse chirurgicale du piège officiel.
              </p>
              <Link
                href="/dashboard/listening"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-2"
              >
                Explorer l'écoute →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
                40 Tests de Lecture
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                Documents authentiques de A1 à C2. Mode split-screen réaliste, chronomètre de 60 minutes et explications détaillées pour progresser sans hésiter.
              </p>
              <Link
                href="/dashboard/reading"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-2"
              >
                Explorer la lecture →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
                113 Sujets d'Écriture
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                Tâches 1, 2 et 3. Compteur de mots en temps réel, barème officiel sur 20, modèle exemplaire C1 et correction IA avec suggestions de formulations avancées.
              </p>
              <Link
                href="/dashboard/writing"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2"
              >
                Explorer l'écriture →
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Studio Vocal & Whisper STT
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                Parlez directement dans votre micro. Transcription instantanée et retour détaillé sur votre fluidité, grammaire et aisance lexicale. Sans abonnement payant.
              </p>
              <Link
                href="/dashboard/speaking"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline pt-2"
              >
                Explorer la pratique orale →
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Questions Dédupliquées (A1-C2)
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                Filtrez uniquement les questions uniques qui reviennent fréquemment dans les sessions officielles du TCF Canada. Économisez des centaines d'heures.
              </p>
              <Link
                href="/dashboard/unique-listening"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                Explorer la banque unique →
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Routeur Multi-IA Silencieux
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                Groq, Google AI Studio, Cerebras, Mistral et OpenRouter. Si un quota gratuit est temporairement atteint, le système bascule automatiquement sans interruption.
              </p>
              <span className="text-xs font-mono font-bold text-emerald-600">
                ✓ Haute disponibilité continue
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 dark:text-white">
          Notre Motivation : Stop aux Tarifs Exorbitants
        </h2>

        <div className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 font-serif leading-relaxed space-y-4 text-left p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <p>
            Chaque année, des dizaines de milliers de candidats à l'immigration canadienne dépensent des centaines de dollars pour accéder à des questions recyclées que les concepteurs de tests réutilisent en boucle.
          </p>
          <p>
            Sur d'autres sites, même après avoir payé un abonnement mensuel, la pratique orale est bridée par des systèmes de jetons payants supplémentaires ou des formulaires Stripe contraignants.
          </p>
          <p>
            <strong>fuck-tcf</strong> a été conçu avec un objectif limpide : briser ce modèle prédateur. Grâce aux modèles d'IA ultra-rapides et gratuits (Llama 3.3, Whisper, Gemini Flash), nous fournissons une préparation d'élite à 0$ de façon illimitée.
          </p>
        </div>

        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-xl hover:opacity-90 transition active:scale-95"
          >
            Rejoindre la Préparation Gratuite <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong>fuck-tcf</strong> · Plateforme libre et ouverte de préparation au TCF Canada.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/dashboard/listening" className="hover:underline">Écoute</Link>
            <Link href="/dashboard/reading" className="hover:underline">Lecture</Link>
            <Link href="/dashboard/writing" className="hover:underline">Écriture</Link>
            <Link href="/dashboard/speaking" className="hover:underline">Oral</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
