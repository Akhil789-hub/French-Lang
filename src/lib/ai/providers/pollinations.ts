import { AiProvider } from "./base";
import {
  AiChatMessage,
  AiCompletionOptions,
  AiProviderName,
  AiProviderResponse,
} from "../types";

export class PollinationsProvider implements AiProvider {
  name: AiProviderName = "openrouter"; // Maps to standard provider or free cloud tier

  isConfigured(): boolean {
    return true; // Zero-auth, always available without requiring an API key
  }

  async complete(
    messages: AiChatMessage[],
    options?: AiCompletionOptions
  ): Promise<AiProviderResponse> {
    const startTime = Date.now();
    const payload = {
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      model: "openai",
      jsonMode: Boolean(options?.jsonMode),
      temperature: options?.temperature ?? 0.2,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "TCF-Prep-Platform/1.0",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Pollinations API HTTP ${res.status}: ${errorText}`);
      }

      const content = await res.text();

      return {
        content,
        provider: "openrouter",
        model: "pollinations-free-cluster",
        latencyMs: Date.now() - startTime,
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
