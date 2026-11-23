import { NextRequest, NextResponse } from "next/server";
import { aiRouter } from "@/lib/ai/router";
import {
  TCF_SYSTEM_INSTRUCTION_BASE,
  getQuestionExplanationPrompt,
} from "@/lib/ai/prompts";
import { TCFExplanationSchema } from "@/lib/ai/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      testType = "listening",
      questionNumber = 1,
      questionPrompt = "",
      options = {},
      correctKey = "A",
      transcriptOrContext = "",
    } = body;

    const prompt = getQuestionExplanationPrompt(
      testType,
      questionNumber,
      questionPrompt,
      options,
      correctKey,
      transcriptOrContext
    );

    const result = await aiRouter.completeWithFallback(
      [
        { role: "system", content: TCF_SYSTEM_INSTRUCTION_BASE },
        { role: "user", content: prompt },
      ],
      { jsonMode: true, temperature: 0.1 },
      TCFExplanationSchema
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
    const message = err instanceof Error ? err.message : "Erreur lors de l'explication.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
