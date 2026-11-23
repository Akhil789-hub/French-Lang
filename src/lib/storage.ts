import { CefrLevel } from "./ai/types";
import { getScoreDetails } from "./tcf-scoring";

export interface StoredTestAttempt {
  id: string;
  testId: string;
  skill: "listening" | "reading" | "writing" | "speaking";
  testNumber?: number;
  score: number;
  totalQuestions?: number;
  correctCount?: number;
  wrongCount?: number;
  skippedCount?: number;
  nclcLevel: number;
  cefrLevel: CefrLevel;
  answers?: Record<number, string>;
  completedAt: string;
}

const STORAGE_KEYS = {
  LISTENING_RESULTS: "tcf_listening_results_v1",
  READING_RESULTS: "tcf_reading_results_v1",
  WRITING_RESULTS: "tcf_writing_results_v1",
  SPEAKING_RESULTS: "tcf_speaking_results_v1",
};

function getStorageSafe<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorageSafe(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

export function saveTestResult(
  skill: "listening" | "reading" | "writing" | "speaking",
  data: Omit<StoredTestAttempt, "id" | "completedAt" | "skill">
): StoredTestAttempt {
  const key =
    skill === "listening"
      ? STORAGE_KEYS.LISTENING_RESULTS
      : skill === "reading"
      ? STORAGE_KEYS.READING_RESULTS
      : skill === "writing"
      ? STORAGE_KEYS.WRITING_RESULTS
      : STORAGE_KEYS.SPEAKING_RESULTS;

  const existing = getStorageSafe<StoredTestAttempt[]>(key, []);
  const attempt: StoredTestAttempt = {
    ...data,
    id: `${skill}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    skill,
    completedAt: new Date().toISOString(),
  };

  const updated = [attempt, ...existing].slice(0, 50);
  setStorageSafe(key, updated);

  // Sync to PostgreSQL backend asynchronously
  if (typeof window !== "undefined") {
    fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        testId: data.testId,
        skill,
        testNumber: data.testNumber,
        score: data.score,
        nclcLevel: data.nclcLevel,
        cefrLevel: data.cefrLevel,
        totalQuestions: data.totalQuestions,
        correctCount: data.correctCount,
        wrongCount: data.wrongCount,
        skippedCount: data.skippedCount,
        answers: data.answers,
      }),
    }).catch((err) => console.error("PostgreSQL sync error:", err));
  }

  return attempt;
}

export function getTestResults(
  skill: "listening" | "reading" | "writing" | "speaking"
): StoredTestAttempt[] {
  const key =
    skill === "listening"
      ? STORAGE_KEYS.LISTENING_RESULTS
      : skill === "reading"
      ? STORAGE_KEYS.READING_RESULTS
      : skill === "writing"
      ? STORAGE_KEYS.WRITING_RESULTS
      : STORAGE_KEYS.SPEAKING_RESULTS;

  return getStorageSafe<StoredTestAttempt[]>(key, []);
}

export function getOverallStats() {
  const listening = getTestResults("listening");
  const reading = getTestResults("reading");
  const writing = getTestResults("writing");
  const speaking = getTestResults("speaking");

  const calcAverage = (list: StoredTestAttempt[]) => {
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / list.length);
  };

  const avgListening = calcAverage(listening);
  const avgReading = calcAverage(reading);
  const avgWriting = calcAverage(writing);
  const avgSpeaking = calcAverage(speaking);

  return {
    totalTestsTaken: listening.length + reading.length + writing.length + speaking.length,
    listeningCount: listening.length,
    readingCount: reading.length,
    writingCount: writing.length,
    speakingCount: speaking.length,
    avgListening,
    avgReading,
    avgWriting,
    avgSpeaking,
    listeningNCLC: getScoreDetails(avgListening).nclc,
    readingNCLC: getScoreDetails(avgReading).nclc,
    writingNCLC: getScoreDetails(avgWriting).nclc,
    speakingNCLC: getScoreDetails(avgSpeaking).nclc,
  };
}
