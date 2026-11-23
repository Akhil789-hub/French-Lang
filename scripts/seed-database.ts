import { createClient } from "@supabase/supabase-js";
import { LISTENING_TESTS } from "../src/data/listening-tests";
import { READING_TESTS } from "../src/data/reading-tests";
import { ALL_WRITING_TOPICS } from "../src/data/writing-topics";
import { SPEAKING_TOPICS } from "../src/data/speaking-topics";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://csxkcbivpoowjmdcemvs.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeGtjYml2cG9vd2ptZGNlbXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzNTIzNzYsImV4cCI6MjExMDkyODM3Nn0.qgUejhxY3UfRyoD0u68yDalcSloMzFzl4UUzZwPRvP0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log("🚀 Starting database seeding into Supabase PostgreSQL...");

  // 1. Seed Listening Tests
  console.log(`Inserting ${LISTENING_TESTS.length} listening tests...`);
  for (const test of LISTENING_TESTS) {
    const { error: testErr } = await supabase.from("listening_tests").upsert({
      id: test.id,
      test_number: test.testNumber,
      title: test.title,
      duration_minutes: test.durationMinutes,
      total_questions: test.totalQuestions,
    });
    if (testErr) console.error("Error inserting listening test", test.id, testErr);

    const questionsPayload = test.questions.map((q) => ({
      id: q.id,
      test_id: test.id,
      question_number: q.questionNumber,
      level: q.level,
      prompt: q.prompt,
      options: q.options,
      correct_answer: q.correctAnswer,
      french_transcript: q.frenchTranscript,
      english_translation: q.englishTranslation,
      trap_alert: q.trapAlert,
      explanation: q.explanation,
      key_sentence: q.keySentence,
      category: q.category,
    }));

    const { error: qErr } = await supabase.from("listening_questions").upsert(questionsPayload);
    if (qErr) console.error("Error inserting listening questions for", test.id, qErr);
  }
  console.log("✓ Listening tests and questions seeded.");

  // 2. Seed Reading Tests
  console.log(`Inserting ${READING_TESTS.length} reading tests...`);
  for (const test of READING_TESTS) {
    const { error: testErr } = await supabase.from("reading_tests").upsert({
      id: test.id,
      test_number: test.testNumber,
      title: test.title,
      duration_minutes: test.durationMinutes,
      total_questions: test.totalQuestions,
    });
    if (testErr) console.error("Error inserting reading test", test.id, testErr);

    const questionsPayload = test.questions.map((q) => ({
      id: q.id,
      test_id: test.id,
      question_number: q.questionNumber,
      level: q.level,
      document_title: q.documentTitle,
      document_content: q.documentContent,
      prompt: q.prompt,
      options: q.options,
      correct_answer: q.correctAnswer,
      explanation: q.explanation,
      trap_alert: q.trapAlert,
    }));

    const { error: qErr } = await supabase.from("reading_questions").upsert(questionsPayload);
    if (qErr) console.error("Error inserting reading questions for", test.id, qErr);
  }
  console.log("✓ Reading tests and questions seeded.");

  // 3. Seed Writing Topics (113 topics)
  console.log(`Inserting ${ALL_WRITING_TOPICS.length} writing topics...`);
  const writingPayload = ALL_WRITING_TOPICS.map((t) => ({
    id: t.id,
    task_number: t.taskNumber,
    topic_number: t.topicNumber,
    category: t.category,
    title: t.title,
    prompt: t.prompt,
    min_words: t.minWords,
    max_words: t.maxWords,
    model_answer: t.modelAnswer,
    key_vocabulary: t.keyVocabulary,
    useful_expressions: t.usefulExpressions,
  }));

  // Batch insert writing topics (in chunks of 40)
  for (let i = 0; i < writingPayload.length; i += 40) {
    const chunk = writingPayload.slice(i, i + 40);
    const { error: wErr } = await supabase.from("writing_topics").upsert(chunk);
    if (wErr) console.error("Error inserting writing chunk", wErr);
  }
  console.log("✓ Writing topics seeded.");

  // 4. Seed Speaking Topics
  console.log(`Inserting ${SPEAKING_TOPICS.length} speaking topics...`);
  const speakingPayload = SPEAKING_TOPICS.map((t) => ({
    id: t.id,
    task_number: t.taskNumber,
    title: t.title,
    prep_time_seconds: t.prepTimeSeconds,
    speaking_time_seconds: t.speakingTimeSeconds,
    prompt: t.prompt,
    examiner_role: t.examinerRole || null,
    candidate_role: t.candidateRole || null,
    suggested_points: t.suggestedQuestionsOrPoints,
    model_audio_transcript: t.modelAudioTranscript,
  }));

  const { error: spErr } = await supabase.from("speaking_topics").upsert(speakingPayload);
  if (spErr) console.error("Error inserting speaking topics", spErr);
  console.log("✓ Speaking topics seeded.");

  console.log("🎉 ALL POSTGRESQL DATA SUCCESSFULLY SEEDED!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
