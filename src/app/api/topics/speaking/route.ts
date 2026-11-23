import { NextResponse } from "next/server";
import { getSpeakingTopicsFromDb } from "@/lib/db";

export async function GET() {
  try {
    const list = await getSpeakingTopicsFromDb();
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
