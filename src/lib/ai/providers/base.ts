import {
  AiChatMessage,
  AiCompletionOptions,
  AiProviderName,
  AiProviderResponse,
  TranscriptionResult,
} from "../types";

export interface AiProvider {
  name: AiProviderName;
  isConfigured(): boolean;
  complete(
    messages: AiChatMessage[],
    options?: AiCompletionOptions
  ): Promise<AiProviderResponse>;
  transcribe?(
    audioBuffer: Buffer | Blob,
    mimeType: string
  ): Promise<TranscriptionResult>;
}
