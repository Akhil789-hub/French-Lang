import { AiProvider } from "./base";
import {
  AiChatMessage,
  AiCompletionOptions,
  AiProviderName,
  AiProviderResponse,
} from "../types";

export class GeminiProvider implements AiProvider {
  name: AiProviderName = "gemini";
  private apiKey: string;
  private defaultModel = "gemini-2.0-flash";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || "";
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async complete(
    messages: AiChatMessage[],
    options?: AiCompletionOptions
  ): Promise<AiProviderResponse> {
    if (!this.isConfigured()) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const startTime = Date.now();
    const systemInstruction = messages.find((m) => m.role === "system");
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const body: Record<string, unknown> = {
      contents,
      generationConfig: {
        temperature: options?.temperature ?? 0.3,
        maxOutputTokens: options?.maxTokens ?? 2048,
        responseMimeType: options?.jsonMode ? "application/json" : "text/plain",
      },
    };

    if (systemInstruction) {
      body.systemInstruction = {
        parts: [{ text: systemInstruction.content }],
      };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.defaultModel}:generateContent?key=${this.apiKey}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Gemini API error HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      return {
        content: text,
        provider: this.name,
        model: this.defaultModel,
        usage: {
          promptTokens: data.usageMetadata?.promptTokenCount,
          completionTokens: data.usageMetadata?.candidatesTokenCount,
          totalTokens: data.usageMetadata?.totalTokenCount,
        },
        latencyMs: Date.now() - startTime,
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
