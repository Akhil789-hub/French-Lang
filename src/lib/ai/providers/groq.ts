import { AiProvider } from "./base";
import {
  AiChatMessage,
  AiCompletionOptions,
  AiProviderName,
  AiProviderResponse,
  TranscriptionResult,
} from "../types";

export class GroqProvider implements AiProvider {
  name: AiProviderName = "groq";
  private apiKey: string;
  private defaultModel = "llama-3.3-70b-versatile";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || "";
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async complete(
    messages: AiChatMessage[],
    options?: AiCompletionOptions
  ): Promise<AiProviderResponse> {
    if (!this.isConfigured()) {
      throw new Error("GROQ_API_KEY is not configured.");
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
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
        throw new Error(`Groq API error HTTP ${res.status}: ${errorText}`);
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

  async transcribe(
    audioBuffer: Buffer | Blob,
    mimeType: string
  ): Promise<TranscriptionResult> {
    if (!this.isConfigured()) {
      throw new Error("GROQ_API_KEY is not configured for transcription.");
    }

    const formData = new FormData();
    const blob =
      audioBuffer instanceof Blob
        ? audioBuffer
        : new Blob([new Uint8Array(audioBuffer)], { type: mimeType });

    formData.append("file", blob, "speaking_recording.webm");
    formData.append("model", "whisper-large-v3");
    formData.append("language", "fr");
    formData.append("response_format", "json");

    const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Groq Whisper transcription error (${res.status}): ${err}`);
    }

    const json = await res.json();
    return {
      text: json.text || "",
      language: "fr",
      provider: "groq-whisper-large-v3",
    };
  }
}
