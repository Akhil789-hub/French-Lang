import { CefrLevel } from "./ai/types";

export interface NclcMapping {
  nclc: number;
  minScore: number;
  maxScore: number;
  cefr: CefrLevel;
  description: string;
  crsPointsSingle: number; // Express Entry First Language per skill (Single applicant)
  crsPointsMarried: number; // Express Entry First Language per skill (With spouse)
}

/**
 * Official TCF Canada score conversion table to NCLC (Niveaux de compétence linguistique canadiens)
 * Source: Immigration, Réfugiés et Citoyenneté Canada (IRCC)
 */
export const TCF_NCLC_SCALE: NclcMapping[] = [
  {
    nclc: 10,
    minScore: 549,
    maxScore: 699,
    cefr: "C2",
    description: "Maîtrise approfondie et spontanée de la langue",
    crsPointsSingle: 34,
    crsPointsMarried: 32,
  },
  {
    nclc: 9,
    minScore: 504,
    maxScore: 548,
    cefr: "C1",
    description: "Compétence avancée efficace et fluide",
    crsPointsSingle: 31,
    crsPointsMarried: 29,
  },
  {
    nclc: 8,
    minScore: 458,
    maxScore: 503,
    cefr: "B2",
    description: "Compétence intermédiaire supérieure très solide",
    crsPointsSingle: 23,
    crsPointsMarried: 22,
  },
  {
    nclc: 7,
    minScore: 420,
    maxScore: 457,
    cefr: "B2",
    description: "Seuil d'autonomie clé pour les points Express Entry Canada",
    crsPointsSingle: 17,
    crsPointsMarried: 16,
  },
  {
    nclc: 6,
    minScore: 369,
    maxScore: 419,
    cefr: "B1",
    description: "Utilisateur indépendant à l'aise dans les situations courantes",
    crsPointsSingle: 9,
    crsPointsMarried: 8,
  },
  {
    nclc: 5,
    minScore: 331,
    maxScore: 368,
    cefr: "A2",
    description: "Élémentaire avancé, compréhension des points essentiels",
    crsPointsSingle: 6,
    crsPointsMarried: 6,
  },
  {
    nclc: 4,
    minScore: 285,
    maxScore: 330,
    cefr: "A1",
    description: "Niveau débutant supérieur",
    crsPointsSingle: 0,
    crsPointsMarried: 0,
  },
];

export function getScoreDetails(score: number): NclcMapping {
  const clamped = Math.max(0, Math.min(699, score));
  for (const tier of TCF_NCLC_SCALE) {
    if (clamped >= tier.minScore) {
      return tier;
    }
  }
  return TCF_NCLC_SCALE[TCF_NCLC_SCALE.length - 1];
}

export function calculateTotalCRSPoints(scores: {
  listening?: number;
  reading?: number;
  writing?: number;
  speaking?: number;
}): {
  basePoints: number;
  bilingualBonusPoints: number;
  totalPoints: number;
} {
  const listening = getScoreDetails(scores.listening || 0);
  const reading = getScoreDetails(scores.reading || 0);
  const writing = getScoreDetails(scores.writing || 0);
  const speaking = getScoreDetails(scores.speaking || 0);

  const basePoints =
    listening.crsPointsSingle +
    reading.crsPointsSingle +
    writing.crsPointsSingle +
    speaking.crsPointsSingle;

  // Canadian Express Entry Francophone bonus points:
  // If all 4 French skills are NCLC 7 or higher, applicant receives an additional 50 bonus CRS points!
  const isAllNclc7Plus =
    listening.nclc >= 7 &&
    reading.nclc >= 7 &&
    writing.nclc >= 7 &&
    speaking.nclc >= 7;

  const bilingualBonusPoints = isAllNclc7Plus ? 50 : 0;

  return {
    basePoints,
    bilingualBonusPoints,
    totalPoints: basePoints + bilingualBonusPoints,
  };
}
