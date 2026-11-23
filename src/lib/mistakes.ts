export interface SavedMistakeItem {
  id: string;
  skill: "listening" | "reading";
  testId: string;
  questionNumber: number;
  level: string;
  prompt: string;
  options: Record<string, string>;
  selectedAnswer: string;
  correctAnswer: string;
  explanation?: string;
  trapAlert?: string;
  contextText?: string; // transcript or reading passage
  savedAt: string;
  reviewedTimes: number;
  mastered: boolean;
}

const STORAGE_KEY = "lf_academy_mistake_vault";

export function getMistakes(skill?: "listening" | "reading"): SavedMistakeItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: SavedMistakeItem[] = JSON.parse(raw);
    if (skill) {
      return list.filter((m) => m.skill === skill);
    }
    return list;
  } catch (e) {
    console.error("Error reading mistake vault:", e);
    return [];
  }
}

export function saveMistake(
  item: Omit<SavedMistakeItem, "id" | "savedAt" | "reviewedTimes" | "mastered">
): SavedMistakeItem {
  if (typeof window === "undefined") {
    return {
      ...item,
      id: "temp",
      savedAt: new Date().toISOString(),
      reviewedTimes: 0,
      mastered: false,
    };
  }

  try {
    const list = getMistakes();
    const existingIndex = list.findIndex(
      (m) =>
        m.skill === item.skill &&
        m.testId === item.testId &&
        m.questionNumber === item.questionNumber
    );

    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      list[existingIndex] = {
        ...list[existingIndex],
        selectedAnswer: item.selectedAnswer,
        savedAt: now,
        mastered: false,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return list[existingIndex];
    } else {
      const newMistake: SavedMistakeItem = {
        ...item,
        id: `${item.skill}-${item.testId}-q${item.questionNumber}-${Date.now()}`,
        savedAt: now,
        reviewedTimes: 0,
        mastered: false,
      };
      list.unshift(newMistake);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return newMistake;
    }
  } catch (e) {
    console.error("Error saving mistake to vault:", e);
    return {
      ...item,
      id: "err",
      savedAt: new Date().toISOString(),
      reviewedTimes: 0,
      mastered: false,
    };
  }
}

export function markMistakeMastered(id: string, mastered = true): void {
  if (typeof window === "undefined") return;

  try {
    const list = getMistakes();
    const updated = list.map((m) =>
      m.id === id ? { ...m, mastered, reviewedTimes: m.reviewedTimes + 1 } : m
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error updating mistake:", e);
  }
}

export function deleteMistake(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const list = getMistakes().filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Error deleting mistake:", e);
  }
}
