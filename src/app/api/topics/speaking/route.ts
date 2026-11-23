import { NextRequest, NextResponse } from "next/server";
import { getSpeakingTopicsFromDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskParam = searchParams.get("task");
    const categoryParam = searchParams.get("category");

    let list = await getSpeakingTopicsFromDb();

    if (taskParam) {
      const taskNum = parseInt(taskParam, 10);
      if (!isNaN(taskNum)) {
        list = list.filter((t) => t.taskNumber === taskNum);
      }
    }

    if (categoryParam && categoryParam !== "all") {
      list = list.filter(
        (t) => t.category?.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    return NextResponse.json({ success: true, data: list, count: list.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
