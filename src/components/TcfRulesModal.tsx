"use client";

import React, { useState } from "react";
import {
  X,
  Clock,
  Award,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ShieldAlert,
  Info,
} from "lucide-react";

interface TcfRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: "listening" | "reading" | "writing" | "speaking" | "all";
}

export function TcfRulesModal({
  isOpen,
  onClose,
  defaultModule = "all",
}: TcfRulesModalProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "listening" | "reading" | "writing" | "speaking"
  >(defaultModule);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0B1324] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-zinc-900 dark:text-zinc-50">
                Règles & Format Officiel du TCF Canada
              </h2>
              <p className="text-[11px] font-mono text-zinc-500">
                Durée Totale : ~2h 47 min · 4 Épreuves Obligatoires (NCLC 7+ = +50 CRS)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto text-xs font-semibold">
          {[
            { id: "all", label: "Vue Globale (2h 47m)", icon: Clock },
            { id: "listening", label: "Compréhension Orale (35m)", icon: Headphones },
            { id: "reading", label: "Compréhension Écrite (60m)", icon: BookOpen },
            { id: "writing", label: "Expression Écrite (60m)", icon: PenTool },
            { id: "speaking", label: "Expression Orale (12-15m)", icon: Mic },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3 py-2 border-b-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                    : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-zinc-700 dark:text-zinc-300">
          {/* TAB: ALL / VUE GLOBALE */}
          {(activeTab === "all" || activeTab === "listening") && (
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-blue-900 dark:text-blue-300">
                  <Headphones className="w-4 h-4 text-blue-600" />
                  <span>1. Compréhension Orale (CO)</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-bold">
                  35 minutes · 39 questions · 0 à 699 pts
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                <li><strong className="text-zinc-900 dark:text-zinc-100">39 questions à choix multiple (QCM)</strong> avec 4 propositions de réponse (A, B, C, D) et une seule bonne réponse.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">L'enregistrement audio n'est diffusé qu'une seule fois</strong> (aucune réécoute en examen officiel).</li>
                <li>Progression de niveau du niveau <strong>A1 au niveau C2</strong> (questions 1 à 15 : A1-A2, 16 à 29 : B1-B2, 30 à 39 : C1-C2).</li>
                <li>Aucun point négatif en cas de mauvaise réponse : répondez toujours à chaque question.</li>
                <li><strong className="text-emerald-600 dark:text-emerald-400">Seuil NCLC 7 (Express Entry)</strong> : 458 à 502 points (~30/39 questions correctes).</li>
              </ul>
            </div>
          )}

          {(activeTab === "all" || activeTab === "reading") && (
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-indigo-900 dark:text-indigo-300">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>2. Compréhension Écrite (CE)</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-bold">
                  60 minutes · 39 questions · 0 à 699 pts
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                <li><strong className="text-zinc-900 dark:text-zinc-100">39 questions QCM</strong> portant sur des documents de la vie quotidienne, des articles de presse, des graphiques et des essais littéraires/sociologiques.</li>
                <li><strong className="text-zinc-900 dark:text-zinc-100">Gestion autonome du temps</strong> (60 minutes au total, ~1 min 30 par question). Vous pouvez naviguer librement entre les questions.</li>
                <li>Progression du niveau <strong>A1 au C2</strong> : textes courts et annonces au début, articles d'analyse complexes et textes abstraits à la fin.</li>
                <li><strong className="text-emerald-600 dark:text-emerald-400">Seuil NCLC 7 (Express Entry)</strong> : 453 à 498 points (~30/39 questions correctes).</li>
              </ul>
            </div>
          )}

          {(activeTab === "all" || activeTab === "writing") && (
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-emerald-900 dark:text-emerald-300">
                  <PenTool className="w-4 h-4 text-emerald-600" />
                  <span>3. Expression Écrite (EE)</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold">
                  60 minutes au total · 3 tâches obligatoires · 0 à 20 pts
                </span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-emerald-900/40">
                  <strong className="text-zinc-900 dark:text-zinc-100">Tâche 1 (Message/Courriel amical)</strong> : <strong>60 à 120 mots</strong>. Décrire, raconter, inviter ou remercier un proche.
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-emerald-900/40">
                  <strong className="text-zinc-900 dark:text-zinc-100">Tâche 2 (Article de blog / Récit d'expérience)</strong> : <strong>120 à 150 mots</strong>. Raconter une expérience personnelle et donner ses impressions.
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-emerald-900/40">
                  <strong className="text-zinc-900 dark:text-zinc-100">Tâche 3 (Essai argumentatif comparant deux points de vue)</strong> : <strong>120 à 180 mots</strong>. Synthétiser deux opinions opposées puis défendre son point de vue personnel argumenté.
                </div>
              </div>
              <p className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900">
                ⚠️ <strong>Pénalité de longueur :</strong> Si le nombre de mots est inférieur à la limite minimale (ex: moins de 60 mots en Tâche 1), une pénalité sévère de points est systématiquement appliquée.
              </p>
              <div className="text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                Seuil NCLC 7 (Express Entry) : 10 à 11 / 20.
              </div>
            </div>
          )}

          {(activeTab === "all" || activeTab === "speaking") && (
            <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-rose-900 dark:text-rose-300">
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>4. Expression Orale (EO)</span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-bold">
                  12 à 15 minutes au total · 3 tâches interactives · 0 à 20 pts
                </span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-900/40">
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-zinc-900 dark:text-zinc-100">Tâche 1 : Entretien dirigé</span>
                    <span className="font-mono text-zinc-500">~2 minutes · Sans préparation</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">Présentation personnelle, parcours professionnel, loisirs et motivation pour le Canada.</p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-900/40">
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-zinc-900 dark:text-zinc-100">Tâche 2 : Exercice en interaction (Jeu de rôle)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">2 min préparation · 3 min 30 s expression</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">Vous posez au moins 10 à 15 questions variées à l'examinateur pour obtenir des renseignements sur une annonce (logement, cours, voyage, achat).</p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-900/40">
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="text-zinc-900 dark:text-zinc-100">Tâche 3 : Expression d'un point de vue (Monologue)</span>
                    <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">4 min 30 s expression continue</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">Argumenter et structurer une prise de position nuancée sur un sujet de société (télétravail, IA, écologie, transports).</p>
                </div>
              </div>
              <div className="text-rose-700 dark:text-rose-300 font-mono font-bold">
                Seuil NCLC 7 (Express Entry) : 10 à 11 / 20.
              </div>
            </div>
          )}

          {/* NCLC Canadian Matrix Table */}
          <div className="pt-2">
            <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-50 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Tableau de Conversion NCLC (Niveau de Compétence Linguistique Canadien)</span>
            </h4>
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="p-2.5 font-bold">Niveau NCLC</th>
                    <th className="p-2.5 font-bold">CEFR</th>
                    <th className="p-2.5 font-bold">Écoute (0-699)</th>
                    <th className="p-2.5 font-bold">Lecture (0-699)</th>
                    <th className="p-2.5 font-bold">Écriture (0-20)</th>
                    <th className="p-2.5 font-bold">Oral (0-20)</th>
                    <th className="p-2.5 font-bold text-emerald-600">Points Entrée Express</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr className="bg-emerald-50/50 dark:bg-emerald-950/20 font-bold">
                    <td className="p-2.5 text-emerald-700 dark:text-emerald-400">NCLC 7 ⭐ (Cible)</td>
                    <td className="p-2.5">B2</td>
                    <td className="p-2.5">458 - 502</td>
                    <td className="p-2.5">453 - 498</td>
                    <td className="p-2.5">10 - 11</td>
                    <td className="p-2.5">10 - 11</td>
                    <td className="p-2.5 text-emerald-600">+50 Points Bonus CRS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">NCLC 8</td>
                    <td className="p-2.5">B2+</td>
                    <td className="p-2.5">503 - 522</td>
                    <td className="p-2.5">499 - 523</td>
                    <td className="p-2.5">12 - 13</td>
                    <td className="p-2.5">12 - 13</td>
                    <td className="p-2.5 text-zinc-500">+50 Points Bonus CRS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">NCLC 9</td>
                    <td className="p-2.5">C1</td>
                    <td className="p-2.5">523 - 548</td>
                    <td className="p-2.5">524 - 548</td>
                    <td className="p-2.5">14 - 15</td>
                    <td className="p-2.5">14 - 15</td>
                    <td className="p-2.5 text-zinc-500">+50 Points Bonus CRS</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">NCLC 10+</td>
                    <td className="p-2.5">C2</td>
                    <td className="p-2.5">549 - 699</td>
                    <td className="p-2.5">549 - 699</td>
                    <td className="p-2.5">16 - 20</td>
                    <td className="p-2.5">16 - 20</td>
                    <td className="p-2.5 text-zinc-500">+50 Points Bonus CRS</td>
                  </tr>
                  <tr className="text-zinc-400">
                    <td className="p-2.5">NCLC 6</td>
                    <td className="p-2.5">B1+</td>
                    <td className="p-2.5">398 - 457</td>
                    <td className="p-2.5">406 - 452</td>
                    <td className="p-2.5">7 - 9</td>
                    <td className="p-2.5">7 - 9</td>
                    <td className="p-2.5 text-zinc-400">Pas de bonus (+0)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
          <span className="text-[11px] font-mono text-zinc-500">
            LF Academy · Conforme aux directives officielles France Éducation International & IRCC
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition active:scale-95"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
