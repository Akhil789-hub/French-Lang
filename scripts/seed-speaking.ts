import { createClient } from "@supabase/supabase-js";
import { SPEAKING_SITUATIONS } from "../src/data/speaking-situations";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://csxkcbivpoowjmdcemvs.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeGtjYml2cG9vd2ptZGNlbXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzNTIzNzYsImV4cCI6MjExMDkyODM3Nn0.qgUejhxY3UfRyoD0u68yDalcSloMzFzl4UUzZwPRvP0";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log(`Starting seed of ${SPEAKING_SITUATIONS.length} speaking situations...`);

  for (const s of SPEAKING_SITUATIONS) {
    const { error } = await supabase.from("speaking_topics").upsert(
      {
        id: s.id,
        task_number: s.task_number,
        title: s.title,
        category: s.category,
        prep_time_seconds: s.prep_time_seconds,
        speaking_time_seconds: s.speaking_time_seconds,
        prompt: s.prompt,
        candidate_role: s.candidate_role,
        examiner_role: s.examiner_role,
        suggested_points: s.suggested_points,
        model_audio_transcript: s.model_audio_transcript,
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error(`Failed to upsert ${s.id}:`, error.message);
    } else {
      console.log(`✓ Upserted ${s.id} - ${s.title}`);
    }
  }

  const { count, error: countErr } = await supabase
    .from("speaking_topics")
    .select("*", { count: "exact", head: true });

  if (countErr) {
    console.error("Count error:", countErr);
  } else {
    console.log(`\n🎉 Total speaking topics in PostgreSQL: ${count}`);
  }
}

run().catch(console.error);
