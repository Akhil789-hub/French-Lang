import { AiRouter } from "../src/lib/ai/router";
import { TCFEvaluationSchema } from "../src/lib/ai/types";
import { getWritingEvaluationPrompt, TCF_SYSTEM_INSTRUCTION_BASE } from "../src/lib/ai/prompts";
import { calculateTotalCRSPoints, getScoreDetails } from "../src/lib/tcf-scoring";

async function runVerification() {
  console.log("=== 1. Testing TCF Scoring and CRS Calculation Engine ===");
  const testScores = [
    { score: 290, expectedCefr: "A1", expectedNclc: 4 },
    { score: 350, expectedCefr: "A2", expectedNclc: 5 },
    { score: 400, expectedCefr: "B1", expectedNclc: 6 },
    { score: 440, expectedCefr: "B2", expectedNclc: 7 },
    { score: 520, expectedCefr: "C1", expectedNclc: 9 },
    { score: 650, expectedCefr: "C2", expectedNclc: 10 },
  ];

  for (const t of testScores) {
    const details = getScoreDetails(t.score);
    console.log(
      `Score ${t.score} -> NCLC ${details.nclc} (Expected: ${t.expectedNclc}), CEFR: ${details.cefr} (Expected: ${t.expectedCefr})`
    );
    if (details.nclc !== t.expectedNclc) {
      throw new Error(`Scoring calculation mismatch for ${t.score}`);
    }
  }

  const crsBilingual = calculateTotalCRSPoints({
    listening: 450,
    reading: 450,
    writing: 450,
    speaking: 450,
  });
  console.log("Bilingual NCLC 7+ Express Entry Points:", crsBilingual);
  if (crsBilingual.bilingualBonusPoints !== 50) {
    throw new Error("CRS Bilingual bonus points calculation failed.");
  }
  console.log("✓ TCF Scoring Engine Verified successfully.\n");

  console.log("=== 2. Testing AI Router Failover & Schema Validation ===");
  const router = AiRouter.getInstance();
  const prompt = getWritingEvaluationPrompt(
    1,
    "Invitez un ami à un dîner d'anniversaire",
    "Salut Thomas, je t'écris pour t'inviter à mon anniversaire samedi soir à 20h chez moi. Nous serons une dizaine d'amis proches et nous préparerons un délicieux repas. Dis-moi si tu peux venir avant jeudi !"
  );

  const evaluationResult = await router.completeWithFallback(
    [
      { role: "system", content: TCF_SYSTEM_INSTRUCTION_BASE },
      { role: "user", content: prompt },
    ],
    { jsonMode: true, temperature: 0.2 },
    TCFEvaluationSchema
  );

  console.log("AI Provider Responded:", evaluationResult.response.provider);
  console.log("Model Used:", evaluationResult.response.model);
  console.log("Latency:", evaluationResult.response.latencyMs, "ms");
  console.log("Overall Score:", evaluationResult.data.overallScore);
  console.log("NCLC Level:", evaluationResult.data.nclcLevel);
  console.log("CEFR Level:", evaluationResult.data.cefrLevel);
  console.log("Summary:", evaluationResult.data.summary.substring(0, 100) + "...");
  console.log("Strengths:", evaluationResult.data.strengths);
  console.log("Criteria Task Completion:", evaluationResult.data.criteria.taskCompletion);

  if (
    evaluationResult.data.overallScore < 0 ||
    evaluationResult.data.overallScore > 699
  ) {
    throw new Error("TCF overall score out of official range.");
  }

  console.log("✓ AI Router and Schema Validation Verified successfully.\n");

  console.log("=== 3. Testing Speech Transcription Pipeline ===");
  const dummyBuffer = Buffer.from("dummy audio content for test");
  const transcription = await router.transcribeWithFallback(dummyBuffer, "audio/webm");
  console.log("Transcription Output:", transcription.text);
  console.log("Transcription Provider:", transcription.provider);
  if (!transcription.text) {
    throw new Error("Transcription test failed.");
  }
  console.log("✓ Speech-to-Text Pipeline Verified successfully.\n");

  console.log("🎉 ALL AUTOMATED VERIFICATION CHECKS PASSED!");
}

runVerification().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
