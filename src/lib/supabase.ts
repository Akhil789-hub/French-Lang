import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://csxkcbivpoowjmdcemvs.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeGtjYml2cG9vd2ptZGNlbXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzNTIzNzYsImV4cCI6MjExMDkyODM3Nn0.qgUejhxY3UfRyoD0u68yDalcSloMzFzl4UUzZwPRvP0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
