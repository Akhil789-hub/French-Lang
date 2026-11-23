import { NextRequest, NextResponse } from "next/server";
import { aiRouter } from "@/lib/ai/router";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Fichier audio manquant ou invalide." },
        { status: 400 }
      );
    }

    const mimeType = file.type || "audio/webm";
    const result = await aiRouter.transcribeWithFallback(file, mimeType);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors de la transcription audio.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
