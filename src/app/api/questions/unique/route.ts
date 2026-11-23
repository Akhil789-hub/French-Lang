import { NextRequest, NextResponse } from "next/server";
import { getUniqueQuestionsFromDb } from "@/lib/db";
import { CefrLevel } from "@/lib/ai/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const skill = (searchParams.get("skill") || "listening") as "listening" | "reading";
    const level = (searchParams.get("level") || "B2") as CefrLevel;

    const list = await getUniqueQuestionsFromDb(skill, level);
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
