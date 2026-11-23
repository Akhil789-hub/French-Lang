import { SPEAKING_SITUATIONS } from "./speaking-situations";

export interface TCFSpeakingTopic {
  id: string;
  taskNumber: 1 | 2 | 3;
  title: string;
  category?: string;
  prepTimeSeconds: number;
  speakingTimeSeconds: number;
  prompt: string;
  examinerRole?: string;
  candidateRole?: string;
  suggestedQuestionsOrPoints: string[];
  modelAudioTranscript: string;
}

export const SPEAKING_TOPICS: TCFSpeakingTopic[] = SPEAKING_SITUATIONS.map((s) => ({
  id: s.id,
  taskNumber: s.task_number as 1 | 2 | 3,
  title: s.title,
  category: s.category,
  prepTimeSeconds: s.prep_time_seconds,
  speakingTimeSeconds: s.speaking_time_seconds,
  prompt: s.prompt,
  examinerRole: s.examiner_role || undefined,
  candidateRole: s.candidate_role || undefined,
  suggestedQuestionsOrPoints: s.suggested_points,
  modelAudioTranscript: s.model_audio_transcript,
}));
