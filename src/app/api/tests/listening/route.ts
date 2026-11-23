import { NextRequest, NextResponse } from "next/server";
import { getListeningTestsFromDb, getListeningTestByIdFromDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const test = await getListeningTestByIdFromDb(id);
      if (!test) {
        return NextResponse.json({ success: false, error: "Test non trouvé" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: test });
    }

    const list = await getListeningTestsFromDb();
    return NextResponse.json({ success: true, data: list });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
