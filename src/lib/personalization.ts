export interface CandidateProfile {
  name: string;
  targetExam: "TCF_CANADA" | "TEF_CANADA" | "ARRIMA" | "GENERAL";
  targetExamDate?: string; // YYYY-MM-DD
  targetNclc: 5 | 7 | 8 | 9 | 10;
  accentPreference: "metropolitan" | "quebecois";
  dailyStudyMinutes: number;
  streakDays: number;
  lastActiveDate: string;
  onboarded: boolean;
}

const STORAGE_KEY = "lf_academy_candidate_profile";

export const DEFAULT_PROFILE: CandidateProfile = {
  name: "Candidat",
  targetExam: "TCF_CANADA",
  targetExamDate: undefined,
  targetNclc: 7, // Official Canadian Express Entry Bilingual threshold
  accentPreference: "metropolitan",
  dailyStudyMinutes: 45,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
  onboarded: false,
};

export function getCandidateProfile(): CandidateProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch (e) {
    console.error("Error reading candidate profile:", e);
    return DEFAULT_PROFILE;
  }
}

export function saveCandidateProfile(
  updates: Partial<CandidateProfile>
): CandidateProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  try {
    const current = getCandidateProfile();
    const today = new Date().toISOString().split("T")[0];

    // Compute streak
    let streak = current.streakDays;
    if (current.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];
      if (current.lastActiveDate === yesterday) {
        streak += 1;
      } else {
        streak = 1;
      }
    }

    const updated: CandidateProfile = {
      ...current,
      ...updates,
      streakDays: updates.streakDays ?? streak,
      lastActiveDate: today,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error saving candidate profile:", e);
    return DEFAULT_PROFILE;
  }
}

export function calculateDaysRemaining(examDate?: string): number | null {
  if (!examDate) return null;
  const target = new Date(examDate).getTime();
  const now = new Date().getTime();
  const diffMs = target - now;
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

/**
 * Calculates Canadian Express Entry Comprehensive Ranking System (CRS) French points
 * - NCLC 7+ in all 4 skills + CLB 5+ English = +50 Bonus CRS Points
 * - NCLC 7+ in French alone = +25 Bonus CRS Points
 */
export function calculateCrsBonus(targetNclc: number): {
  bonusPoints: number;
  maxSkillPoints: number;
  totalFrenchAdvantage: number;
} {
  if (targetNclc >= 7) {
    return {
      bonusPoints: 50,
      maxSkillPoints: 136, // Maximum first official language points
      totalFrenchAdvantage: 186, // Up to +186 CRS points for bilingual applicants
    };
  } else if (targetNclc >= 5) {
    return {
      bonusPoints: 25,
      maxSkillPoints: 64,
      totalFrenchAdvantage: 89,
    };
  }
  return {
    bonusPoints: 0,
    maxSkillPoints: 32,
    totalFrenchAdvantage: 32,
  };
}
