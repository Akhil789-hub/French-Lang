import { AiProvider } from "./providers/base";
import { GroqProvider } from "./providers/groq";
import { GeminiProvider } from "./providers/gemini";
import { CerebrasProvider } from "./providers/cerebras";
import { MistralProvider } from "./providers/mistral";
import { OpenRouterProvider } from "./providers/openrouter";
import { PollinationsProvider } from "./providers/pollinations";
import { MockProvider } from "./providers/mock";
import {
  AiChatMessage,
  AiCompletionOptions,
  AiProviderResponse,
  TranscriptionResult,
} from "./types";
import { ZodSchema } from "zod";

export class AiRouter {
  private providers: AiProvider[];
  private static instance: AiRouter;

  constructor() {
    this.providers = [
      new GroqProvider(),
      new GeminiProvider(),
      new CerebrasProvider(),
      new MistralProvider(),
      new OpenRouterProvider(),
      new PollinationsProvider(), // Live free cloud AI (No API key needed)
      new MockProvider(),         // Offline safety net
    ];
  }

  public static getInstance(): AiRouter {
    if (!AiRouter.instance) {
      AiRouter.instance = new AiRouter();
    }
    return AiRouter.instance;
  }

  /**
   * Completes a chat prompt with automatic, transparent failover across free models.
   * If one provider runs out of tokens or is rate limited (429/402/503), it silently switches to the next.
   */
  async completeWithFallback<T = unknown>(
    messages: AiChatMessage[],
    options?: AiCompletionOptions,
    validationSchema?: ZodSchema<T>
  ): Promise<{ data: T; response: AiProviderResponse }> {
    const errors: Array<{ provider: string; error: string }> = [];

    // Filter to available/configured providers
    const availableProviders = this.providers.filter((p) => p.isConfigured());

    for (const provider of availableProviders) {
      try {
        const response = await provider.complete(messages, options);
        let parsedContent: unknown = response.content;

        if (options?.jsonMode) {
          // Clean possible markdown code fences (```json ... ```)
          let cleaned = response.content.trim();
          if (cleaned.startsWith("```")) {
            cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, "").replace(/\n?```$/, "").trim();
          }

          // In case there is preamble or postamble text around JSON
          const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cleaned = jsonMatch[0];
          }

          try {
            parsedContent = JSON.parse(cleaned);
          } catch {
            throw new Error(`Invalid JSON output from provider ${provider.name}`);
          }

          if (validationSchema) {
            const parsed = validationSchema.safeParse(parsedContent);
            if (!parsed.success) {
              throw new Error(`Schema validation failed for ${provider.name}: ${parsed.error.message}`);
            }
            parsedContent = parsed.data;
          }
        }

        return {
          data: parsedContent as T,
          response,
        };
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        errors.push({ provider: provider.name, error: errorMsg });
        // Continue loop to silently failover to the next healthy model
        continue;
      }
    }

    throw new Error(
      `All AI providers failed. Attempts:\n${errors
        .map((e) => `[${e.provider}]: ${e.error}`)
        .join("\n")}`
    );
  }

  /**
   * Transcribes audio using Groq Whisper, with fallback.
   */
  async transcribeWithFallback(
    audioBuffer: Buffer | Blob,
    mimeType: string
  ): Promise<TranscriptionResult> {
    const availableProviders = this.providers.filter(
      (p) => p.isConfigured() && typeof p.transcribe === "function"
    );

    for (const provider of availableProviders) {
      try {
        if (provider.transcribe) {
          return await provider.transcribe(audioBuffer, mimeType);
        }
      } catch {
        continue;
      }
    }

    // Fallback to local mock transcription if external keys are unavailable
    const mock = new MockProvider();
    return await mock.transcribe();
  }
}

export const aiRouter = AiRouter.getInstance();
