import { NextRequest, NextResponse } from "next/server";
import { getWritingTopicsFromDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskNumber = searchParams.get("task");
    const parsedTask = taskNumber ? parseInt(taskNumber, 10) : undefined;

    const list = await getWritingTopicsFromDb(parsedTask);
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
