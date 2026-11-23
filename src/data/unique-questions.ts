import { CefrLevel } from "@/lib/ai/types";
import { SAMPLE_QUESTIONS_POOL, TCFQuestion } from "./listening-tests";
import { SAMPLE_READING_POOL, TCFReadingQuestion } from "./reading-tests";

export interface UniqueQuestionsByLevel<T> {
  level: CefrLevel;
  title: string;
  count: number;
  questions: T[];
}

export function getUniqueListeningByLevel(): Record<CefrLevel, TCFQuestion[]> {
  const map: Record<CefrLevel, TCFQuestion[]> = {
    A1: [],
    A2: [],
    B1: [],
    B2: [],
    C1: [],
    C2: [],
  };

  SAMPLE_QUESTIONS_POOL.forEach((q, idx) => {
    map[q.level].push({
      ...q,
      id: `uniq-co-${q.level}-${idx + 1}`,
    });
  });

  return map;
}

export function getUniqueReadingByLevel(): Record<CefrLevel, TCFReadingQuestion[]> {
  const map: Record<CefrLevel, TCFReadingQuestion[]> = {
    A1: [],
    A2: [],
    B1: [],
    B2: [],
    C1: [],
    C2: [],
  };

  SAMPLE_READING_POOL.forEach((q, idx) => {
    map[q.level].push({
      ...q,
      id: `uniq-ce-${q.level}-${idx + 1}`,
    });
  });

  return map;
}
