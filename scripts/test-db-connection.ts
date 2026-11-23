import {
  getListeningTestsFromDb,
  getReadingTestsFromDb,
  getWritingTopicsFromDb,
  getSpeakingTopicsFromDb,
  getUniqueQuestionsFromDb,
} from "../src/lib/db";

async function verifyDb() {
  console.log("=== Verifying Supabase PostgreSQL Backend ===");

  const listening = await getListeningTestsFromDb();
  console.log(`✓ Fetched ${listening.length} listening tests from PostgreSQL.`);
  if (listening.length !== 40) throw new Error("Expected 40 listening tests");

  const reading = await getReadingTestsFromDb();
  console.log(`✓ Fetched ${reading.length} reading tests from PostgreSQL.`);
  if (reading.length !== 40) throw new Error("Expected 40 reading tests");

  const writing = await getWritingTopicsFromDb();
  console.log(`✓ Fetched ${writing.length} writing topics from PostgreSQL.`);
  if (writing.length !== 113) throw new Error("Expected 113 writing topics");

  const speaking = await getSpeakingTopicsFromDb();
  console.log(`✓ Fetched ${speaking.length} speaking topics from PostgreSQL.`);
  if (speaking.length !== 3) throw new Error("Expected 3 speaking topics");

  const uniqueB2 = await getUniqueQuestionsFromDb("listening", "B2");
  console.log(`✓ Fetched ${uniqueB2.length} unique B2 listening questions from PostgreSQL.`);

  console.log("🎉 ALL SUPABASE POSTGRESQL DATA QUERIES VERIFIED SUCCESSFULLY!");
}

verifyDb().catch((e) => {
  console.error("Database verification failed:", e);
  process.exit(1);
});
