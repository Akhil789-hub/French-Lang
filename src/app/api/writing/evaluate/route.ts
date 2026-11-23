import { NextRequest, NextResponse } from "next/server";
import { aiRouter } from "@/lib/ai/router";
import {
  TCF_SYSTEM_INSTRUCTION_BASE,
  getWritingEvaluationPrompt,
} from "@/lib/ai/prompts";
import { TCFEvaluationSchema } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { taskNumber = 1, topic = "", submission = "" } = body;

    if (!submission || typeof submission !== "string" || submission.trim().length < 5) {
      return NextResponse.json(
        { error: "Veuillez fournir un texte d'au moins quelques mots à évaluer." },
        { status: 400 }
      );
    }

    const prompt = getWritingEvaluationPrompt(taskNumber, topic, submission);

    const result = await aiRouter.completeWithFallback(
      [
        { role: "system", content: TCF_SYSTEM_INSTRUCTION_BASE },
        { role: "user", content: prompt },
      ],
      { jsonMode: true, temperature: 0.2 },
      TCFEvaluationSchema
    );

    return NextResponse.json({
      success: true,
      data: result.data,
      meta: {
        provider: result.response.provider,
        model: result.response.model,
        latencyMs: result.response.latencyMs,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur lors de l'évaluation.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
