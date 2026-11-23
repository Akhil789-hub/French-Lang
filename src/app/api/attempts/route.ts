import { NextRequest, NextResponse } from "next/server";
import { saveAttemptToPostgres, getUserAttemptsFromPostgres } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await saveAttemptToPostgres(body);
    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const skill = searchParams.get("skill") || undefined;
    const list = await getUserAttemptsFromPostgres(skill);
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
