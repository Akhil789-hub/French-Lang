import { supabase } from "./supabase";
import { TCFListeningTest, TCFQuestion } from "@/data/listening-tests";
import { TCFReadingTest, TCFReadingQuestion } from "@/data/reading-tests";
import { TCFWritingTopic } from "@/data/writing-topics";
import { TCFSpeakingTopic } from "@/data/speaking-topics";
import { CefrLevel } from "./ai/types";

// ============================================================================
// 1. Listening Tests & Questions from PostgreSQL
// ============================================================================
export async function getListeningTestsFromDb(): Promise<Array<{ id: string; testNumber: number; title: string; durationMinutes: number; totalQuestions: number }>> {
  const { data, error } = await supabase
    .from("listening_tests")
    .select("id, test_number, title, duration_minutes, total_questions")
    .order("test_number", { ascending: true });

  if (error || !data) {
    console.error("Error fetching listening tests from PostgreSQL:", error);
    return [];
  }

  return data.map((t) => ({
    id: t.id,
    testNumber: t.test_number,
    title: t.title,
    durationMinutes: t.duration_minutes,
    totalQuestions: t.total_questions,
  }));
}

export async function getListeningTestByIdFromDb(testId: string): Promise<TCFListeningTest | null> {
  const { data: test, error: testErr } = await supabase
    .from("listening_tests")
    .select("*")
    .eq("id", testId)
    .single();

  if (testErr || !test) return null;

  const { data: questions, error: qErr } = await supabase
    .from("listening_questions")
    .select("*")
    .eq("test_id", testId)
    .order("question_number", { ascending: true });

  if (qErr || !questions) return null;

  return {
    id: test.id,
    testNumber: test.test_number,
    title: test.title,
    durationMinutes: test.duration_minutes,
    totalQuestions: test.total_questions,
    questions: questions.map((q) => ({
      id: q.id,
      questionNumber: q.question_number,
      level: q.level as CefrLevel,
      prompt: q.prompt,
      options: q.options,
      correctAnswer: q.correct_answer,
      frenchTranscript: q.french_transcript,
      englishTranslation: q.english_translation,
      trapAlert: q.trap_alert,
      explanation: q.explanation,
      keySentence: q.key_sentence,
      category: q.category,
    })),
  };
}

// ============================================================================
// 2. Reading Tests & Questions from PostgreSQL
// ============================================================================
export async function getReadingTestsFromDb(): Promise<Array<{ id: string; testNumber: number; title: string; durationMinutes: number; totalQuestions: number }>> {
  const { data, error } = await supabase
    .from("reading_tests")
    .select("id, test_number, title, duration_minutes, total_questions")
    .order("test_number", { ascending: true });

  if (error || !data) {
    console.error("Error fetching reading tests from PostgreSQL:", error);
    return [];
  }

  return data.map((t) => ({
    id: t.id,
    testNumber: t.test_number,
    title: t.title,
    durationMinutes: t.duration_minutes,
    totalQuestions: t.total_questions,
  }));
}

export async function getReadingTestByIdFromDb(testId: string): Promise<TCFReadingTest | null> {
  const { data: test, error: testErr } = await supabase
    .from("reading_tests")
    .select("*")
    .eq("id", testId)
    .single();

  if (testErr || !test) return null;

  const { data: questions, error: qErr } = await supabase
    .from("reading_questions")
    .select("*")
    .eq("test_id", testId)
    .order("question_number", { ascending: true });

  if (qErr || !questions) return null;

  return {
    id: test.id,
    testNumber: test.test_number,
    title: test.title,
    durationMinutes: test.duration_minutes,
    totalQuestions: test.total_questions,
    questions: questions.map((q) => ({
      id: q.id,
      questionNumber: q.question_number,
      level: q.level as CefrLevel,
      documentTitle: q.document_title,
      documentContent: q.document_content,
      prompt: q.prompt,
      options: q.options,
      correctAnswer: q.correct_answer,
      explanation: q.explanation,
      trapAlert: q.trap_alert,
    })),
  };
}

// ============================================================================
// 3. Writing Topics from PostgreSQL
// ============================================================================
export async function getWritingTopicsFromDb(taskNumber?: number): Promise<TCFWritingTopic[]> {
  let query = supabase.from("writing_topics").select("*").order("topic_number", { ascending: true });
  if (taskNumber) {
    query = query.eq("task_number", taskNumber);
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("Error fetching writing topics from PostgreSQL:", error);
    return [];
  }

  return data.map((t) => ({
    id: t.id,
    taskNumber: t.task_number as 1 | 2 | 3,
    topicNumber: t.topic_number,
    category: t.category,
    title: t.title,
    prompt: t.prompt,
    minWords: t.min_words,
    maxWords: t.max_words,
    modelAnswer: t.model_answer,
    keyVocabulary: t.key_vocabulary,
    usefulExpressions: t.useful_expressions,
  }));
}

// ============================================================================
// 4. Speaking Topics from PostgreSQL
// ============================================================================
export async function getSpeakingTopicsFromDb(): Promise<TCFSpeakingTopic[]> {
  const { data, error } = await supabase
    .from("speaking_topics")
    .select("*")
    .order("task_number", { ascending: true });

  if (error || !data) {
    console.error("Error fetching speaking topics from PostgreSQL:", error);
    return [];
  }

  return data.map((t) => ({
    id: t.id,
    taskNumber: t.task_number as 1 | 2 | 3,
    title: t.title,
    category: t.category || "Général",
    prepTimeSeconds: t.prep_time_seconds,
    speakingTimeSeconds: t.speaking_time_seconds,
    prompt: t.prompt,
    examinerRole: t.examiner_role,
    candidateRole: t.candidate_role,
    suggestedQuestionsOrPoints: t.suggested_points,
    modelAudioTranscript: t.model_audio_transcript,
  }));
}

// ============================================================================
// 5. Unique Questions by CEFR Level from PostgreSQL
// ============================================================================
export async function getUniqueQuestionsFromDb(skill: "listening" | "reading", level: CefrLevel) {
  const table = skill === "listening" ? "listening_questions" : "reading_questions";
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("level", level)
    .limit(30);

  if (error || !data) {
    console.error("Error fetching unique questions from PostgreSQL:", error);
    return [];
  }

  if (skill === "listening") {
    return data.map((q) => ({
      id: q.id,
      questionNumber: q.question_number,
      level: q.level as CefrLevel,
      prompt: q.prompt,
      options: q.options,
      correctAnswer: q.correct_answer,
      frenchTranscript: q.french_transcript,
      englishTranslation: q.english_translation,
      trapAlert: q.trap_alert,
      explanation: q.explanation,
      keySentence: q.key_sentence,
      category: q.category,
    }));
  } else {
    return data.map((q) => ({
      id: q.id,
      questionNumber: q.question_number,
      level: q.level as CefrLevel,
      documentTitle: q.document_title,
      documentContent: q.document_content,
      prompt: q.prompt,
      options: q.options,
      correctAnswer: q.correct_answer,
      explanation: q.explanation,
      trapAlert: q.trap_alert,
    }));
  }
}

// ============================================================================
// 6. User Test Attempts & AI Evaluations to PostgreSQL
// ============================================================================
export async function saveAttemptToPostgres(attempt: {
  testId: string;
  skill: string;
  testNumber?: number;
  score: number;
  nclcLevel: number;
  cefrLevel: string;
  totalQuestions?: number;
  correctCount?: number;
  wrongCount?: number;
  skippedCount?: number;
  answers?: Record<string, string>;
}) {
  const { data, error } = await supabase.from("user_test_attempts").insert({
    test_id: attempt.testId,
    skill: attempt.skill,
    test_number: attempt.testNumber,
    score: attempt.score,
    nclc_level: attempt.nclcLevel,
    cefr_level: attempt.cefrLevel,
    total_questions: attempt.totalQuestions,
    correct_count: attempt.correctCount,
    wrong_count: attempt.wrongCount,
    skipped_count: attempt.skippedCount,
    user_answers: attempt.answers || {},
  }).select().single();

  if (error) {
    console.error("Error saving attempt to PostgreSQL:", error);
  }
  return data;
}

export async function getUserAttemptsFromPostgres(skill?: string) {
  let query = supabase.from("user_test_attempts").select("*").order("created_at", { ascending: false }).limit(50);
  if (skill) {
    query = query.eq("skill", skill);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching attempts from PostgreSQL:", error);
    return [];
  }
  return data || [];
}
