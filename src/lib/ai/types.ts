import { z } from "zod";

export type AiProviderName =
  | "groq"
  | "gemini"
  | "cerebras"
  | "mistral"
  | "openrouter"
  | "puter"
  | "local-mock";

export interface AiChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AiCompletionOptions {
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export interface AiProviderResponse {
  content: string;
  provider: AiProviderName;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  latencyMs: number;
}

// ============================================================================
// Official TCF Canada & CEFR Grading Grids
// ============================================================================
export const CefrLevelEnum = z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]);
export type CefrLevel = z.infer<typeof CefrLevelEnum>;

export const TCFEvaluationSchema = z.object({
  overallScore: z.number().min(0).max(699), // Official TCF scale: 0 to 699
  nclcLevel: z.number().min(3).max(10),     // Niveaux de compétence linguistique canadiens (CLB 3 to 10+)
  cefrLevel: CefrLevelEnum,
  wordCount: z.number().optional(),
  summary: z.string(),
  criteria: z.object({
    taskCompletion: z.object({
      score: z.number().min(0).max(20),
      comment: z.string(),
    }),
    coherenceAndCohesion: z.object({
      score: z.number().min(0).max(20),
      comment: z.string(),
    }),
    lexicalResource: z.object({
      score: z.number().min(0).max(20),
      comment: z.string(),
    }),
    grammaticalAccuracy: z.object({
      score: z.number().min(0).max(20),
      comment: z.string(),
    }),
  }),
  corrections: z.array(
    z.object({
      original: z.string(),
      improved: z.string(),
      explanation: z.string(),
      category: z.enum(["grammar", "vocabulary", "spelling", "syntax", "punctuation"]),
    })
  ),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  modelAnswer: z.string(),
});

export type TCFEvaluationResult = z.infer<typeof TCFEvaluationSchema>;

export const TCFExplanationSchema = z.object({
  correctOption: z.string(),
  frenchExplanation: z.string(),
  englishTranslation: z.string(),
  keyVocabulary: z.array(
    z.object({
      term: z.string(),
      translation: z.string(),
      usage: z.string(),
    })
  ),
  trapAnalysis: z.object({
    hasTrap: z.boolean(),
    trapDescription: z.string(),
    distractorBreakdown: z.record(z.string(), z.string()).optional(),
  }),
  listeningTip: z.string().optional(),
});

export type TCFExplanationResult = z.infer<typeof TCFExplanationSchema>;

export interface TranscriptionResult {
  text: string;
  language: string;
  duration?: number;
  provider: string;
}
