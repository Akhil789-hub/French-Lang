"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Calendar,
  Target,
  Award,
  Check,
  X,
  Volume2,
  ArrowRight,
} from "lucide-react";
import {
  CandidateProfile,
  getCandidateProfile,
  saveCandidateProfile,
  calculateCrsBonus,
} from "@/lib/personalization";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (profile: CandidateProfile) => void;
}

export function OnboardingModal({ isOpen, onClose, onSave }: OnboardingModalProps) {
  const [profile, setProfile] = useState<CandidateProfile>(getCandidateProfile());
  const [name, setName] = useState(profile.name === "Candidat" ? "" : profile.name);
  const [targetExam, setTargetExam] = useState<CandidateProfile["targetExam"]>(
    profile.targetExam
  );
  const [targetNclc, setTargetNclc] = useState<CandidateProfile["targetNclc"]>(
    profile.targetNclc
  );
  const [targetExamDate, setTargetExamDate] = useState(profile.targetExamDate || "");
  const [accent, setAccent] = useState<CandidateProfile["accentPreference"]>(
    profile.accentPreference
  );

  useEffect(() => {
    if (isOpen) {
      const p = getCandidateProfile();
      setProfile(p);
      setName(p.name === "Candidat" ? "" : p.name);
      setTargetExam(p.targetExam);
      setTargetNclc(p.targetNclc);
      setTargetExamDate(p.targetExamDate || "");
      setAccent(p.accentPreference);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const crsDetails = calculateCrsBonus(targetNclc);

  const handleSave = () => {
    const updated = saveCandidateProfile({
      name: name.trim() || "Candidat",
      targetExam,
      targetNclc,
      targetExamDate: targetExamDate || undefined,
      accentPreference: accent,
      onboarded: true,
    });
    if (onSave) onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Personnalisation LF Academy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Configurez Votre Parcours
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-1">
            Adaptez les simulateurs, le calendrier d'entraînement et le suivi de points Express Entry à vos ambitions.
          </p>
        </div>

        {/* Form Body */}
        <div className="space-y-5">
          {/* 1. Name */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
              Votre Prénom ou Pseudonyme
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Sarah, Alex..."
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* 2. Target Exam */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
              Épreuve Cible
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: "TCF_CANADA", label: "TCF Canada", sub: "Entrée Express & Citoyenneté" },
                { id: "TEF_CANADA", label: "TEF Canada", sub: "Épreuves Équivalentes IRCC" },
                { id: "ARRIMA", label: "Arrima Québec", sub: "Immigration Provinciale QC" },
                { id: "GENERAL", label: "Perfectionnement", sub: "Bilinguisme Professionnel" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTargetExam(opt.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    targetExam === opt.id
                      ? "border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 shadow-sm"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/50"
                  }`}
                >
                  <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">
                    {opt.label}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Target NCLC Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                Palier NCLC Visé
              </label>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                +{crsDetails.bonusPoints} points CRS Entrée Express
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { lvl: 5, label: "NCLC 5 (B1)" },
                { lvl: 7, label: "NCLC 7 (B2+)*" },
                { lvl: 8, label: "NCLC 8 (C1)" },
                { lvl: 10, label: "NCLC 10 (C2)" },
              ].map((item) => (
                <button
                  key={item.lvl}
                  type="button"
                  onClick={() => setTargetNclc(item.lvl as any)}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-mono font-bold transition-all ${
                    targetNclc === item.lvl
                      ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1.5">
              * NCLC 7 est le seuil légal canadien débloquant le bonus francophone maximal (+50 pts) dans le bassin Entrée Express.
            </p>
          </div>

          {/* 4. Target Exam Date */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
              Date Prévue de Votre Examen (Optionnel)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="date"
                value={targetExamDate}
                onChange={(e) => setTargetExamDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* 5. Accent Preference */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 mb-2">
              Variante Audio Préférée
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccent("metropolitan")}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition ${
                  accent === "metropolitan"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>Français Métropolitain</span>
              </button>
              <button
                type="button"
                onClick={() => setAccent("quebecois")}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition ${
                  accent === "quebecois"
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>Français Canadien (QC)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Plus tard
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 transition-all active:scale-95"
          >
            <span>Enregistrer mon profil</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
