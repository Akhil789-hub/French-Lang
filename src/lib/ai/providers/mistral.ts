import { AiProvider } from "./base";
import {
  AiChatMessage,
  AiCompletionOptions,
  AiProviderName,
  AiProviderResponse,
} from "../types";

export class MistralProvider implements AiProvider {
  name: AiProviderName = "mistral";
  private apiKey: string;
  private defaultModel = "mistral-small-latest";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.MISTRAL_API_KEY || "";
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async complete(
    messages: AiChatMessage[],
    options?: AiCompletionOptions
  ): Promise<AiProviderResponse> {
    if (!this.isConfigured()) {
      throw new Error("MISTRAL_API_KEY is not configured.");
    }

    const startTime = Date.now();
    const payload: Record<string, unknown> = {
      model: this.defaultModel,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: options?.temperature ?? 0.3,
      max_tokens: options?.maxTokens ?? 2048,
    };

    if (options?.jsonMode) {
      payload.response_format = { type: "json_object" };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);

    try {
      const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Mistral API error HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "";

      return {
        content,
        provider: this.name,
        model: this.defaultModel,
        usage: {
          promptTokens: data.usage?.prompt_tokens,
          completionTokens: data.usage?.completion_tokens,
          totalTokens: data.usage?.total_tokens,
        },
        latencyMs: Date.now() - startTime,
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
