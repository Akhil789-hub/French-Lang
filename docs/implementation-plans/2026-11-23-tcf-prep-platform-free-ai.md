# Implementation Plan: Production-Grade TCF Canada Preparation Platform with Zero-Cost Multi-Model AI Routing

> **Document ID**: `docs/implementation-plans/2026-11-23-tcf-prep-platform-free-ai.md`  
> **Date**: 2026-11-23  
> **Status**: PROPOSED (Awaiting User Review & Approval)  
> **Target Architecture**: Next.js 15 (App Router, TypeScript Strict), Tailwind CSS, Lucide Icons, Web Audio API, Hybrid Free AI Adapter Pool (Groq, Google AI Studio, Cerebras, OpenRouter, Cloudflare Workers AI, Mistral)

---

## 1. Existing Implementation Analysis & Reverse Engineering Audit

Through reverse engineering `https://fuck-tcf.xyz/` (Next.js bundle decomposition, asset route inspection, and client chunk tracing), the following architecture and feature set were uncovered:

### 1.1 Reverse Engineered Modules from `fuck-tcf.xyz`
1. **Homepage & Landing Experience**:
   - Contrarian value proposition ("They charge $30/month for 40 tests. Here are all 40. Free.").
   - Navigation: Features, Manifesto, Pricing, Sign-in.
   - Feature grid highlighting Listening (40 tests + transcripts/translations/trap explanations), Reading (40 tests + question explanations), Writing (113 topics across Tâches 1, 2, 3 + sample answers), and Speaking with instant feedback.
2. **Dashboard Layout & Subroutes**:
   - `/dashboard`: High-level progress chart (Recharts), test attempt history, NCLC/CLB score trajectories, and CRS point calculator.
   - `/dashboard/listening`: Full catalog of 40 Listening tests with audio tracks, question navigator, and trap analysis.
   - `/dashboard/reading`: Full catalog of 40 Reading comprehension tests (39 questions each, A1–C2).
   - `/dashboard/writing`: 113 standardized writing topics with model answers and evaluation prompts.
   - `/dashboard/speaking`: Interactive microphone recorder with speech-to-text and AI evaluation.
   - `/dashboard/unique-listening` & `/dashboard/unique-reading`: Deduplicated question bank categorized by CEFR level (`A1, A2, B1, B2, C1, C2`).
3. **Identified Limitations on `fuck-tcf.xyz`**:
   - **Paywall / Token Gate**: Speaking feedback is locked behind a paid barrier (`Speaking practice is live [Paid]`, `/api/stripe/checkout`, `/api/speaking/plans`, token top-up modals).
   - **Single Vendor AI Dependency**: Tied to OpenAI (`https://api.openai.com/v1/realtime/calls`) with paid token constraints.
   - **Vendor Lock-in**: Dependent on Firebase Auth and Firestore for tracking progress.

### 1.2 Resource Integration from `alphaSeclab/awesome-reverse-engineering` & `OuterSpacee/free-ai-apis`
- Using client-side asset tracing and static AST decompilation techniques to map all data schemas, audio asset pipelines, and evaluation rubric criteria.
- Leveraging `OuterSpacee/free-ai-apis` to establish a **multi-provider free AI routing layer** with zero token paywalls and unlimited retries.

---

## 2. Problem Definition & Desired Outcome

### Functional Requirements
1. **Exact Functional & Visual Parity with `fuck-tcf.xyz`**:
   - Complete exam simulation for all 4 skills: Listening (CO), Reading (CE), Writing (EE), and Speaking (EO).
   - Deduplicated "Unique Questions" practice mode filtered by CEFR level (A1 to C2).
   - Rich answer reviews with French audio transcripts, English translations, "Trap Alert" (détection de pièges), and grammatical reasoning.
   - Full NCLC (1 to 10+) and CEFR (A1 to C2) score calculation engine mapped to Canada Express Entry CRS points.
2. **Zero Limitation & Unlimited Retries**:
   - Complete removal of payment gates, token restrictions, or credit limits.
   - Users can generate speaking evaluations, writing critiques, and exam explanations infinitely.
3. **Automated Multi-Model Failover & Seamless Routing**:
   - Smart model orchestrator that routes requests through a tiered pool of free AI providers.
   - Automatic, silent circuit breaker: if a provider returns HTTP 429 (Rate Limit), quota exhaustion, or timeout, it immediately falls back to the next provider in the chain without frontend errors or interruptions.
4. **Specialized TCF AI Evaluation Agent**:
   - System prompts calibrated against official France Éducation International and IRCC (Immigration, Refugees and Citizenship Canada) marking grids.
   - Uniform, structured JSON output regardless of which model processes the request.

---

## 3. Dependency & File Inspection

### Target Tech Stack
- **Framework**: Next.js 15+ (App Router), React 19, TypeScript (strict mode).
- **Styling**: Tailwind CSS, `@tailwindcss/typography`, Lucide React icons.
- **Audio & Media**: Web Audio API, MediaRecorder API (client-side recording & playback).
- **State & Storage**: Lightweight Zustand / React Context with LocalStorage/IndexedDB persistence + optional Supabase backend.
- **Data Visualization**: Recharts (for score trajectories and CLB distribution).
- **Validation**: Zod (for strict structured LLM output schemas and request validation).

### Free AI Provider Pool Matrix (from `free-ai-apis`)
| Provider | Role | Free Tier Capacity | Latency | Primary Use Case |
|---|---|---|---|---|
| **Groq** | Primary LLM & STT | 30 req/min, 1K req/day (Llama 3.3 70B, Whisper v3) | ~200ms | Real-time speech transcription & instant writing evaluation |
| **Google AI Studio** | Secondary LLM | 15 req/min, 1,500 req/day (Gemini 2.0 Flash) | ~400ms | Deep grammatical analysis & long-context French comprehension |
| **Cerebras** | Tertiary LLM | 1M tokens/day, 5 req/min (Llama 3.3 70B) | ~150ms | Ultra-fast failover for batch scoring & question explanations |
| **OpenRouter** | Quota Fallback | 20 req/min, 50–1000 req/day (`:free` models) | ~600ms | High-availability fallback across open-source models |
| **Mistral AI** | European Lang Specialist | Daily free tier (Mistral Small / Codestral) | ~350ms | Native French linguistic nuance verification |
| **Cloudflare Workers AI** | Serverless Edge Fallback | 10,000 Neurons/day free (`@cf/openai/whisper`, `llama-3.3-70b`) | ~300ms | Edge STT and fallback generation |
| **Puter.js** | Emergency Zero-Auth Fallback | Free, no API key required | ~800ms | Infinite retry safety net if all API keys are exhausted |

---

## 4. Impact Analysis & Blast Radius

- **No External Paid Services**: Eliminates Stripe, Firebase paid billing, and paid OpenAI API accounts.
- **Privacy & Security**: Audio recordings and user essay drafts processed ephemerally; no PII stored or logged.
- **Fault Tolerance**: Network failures or individual provider outages are completely shielded from the user via the multi-tier circuit breaker.

---

## 5. Cross-Tier Technical Specification

### 5.1 Architecture Diagram
```
+-----------------------------------------------------------------------+
|                             USER FRONTEND                             |
|  - Listening Test Simulator (Audio Player, Time Sync, Trap Highlights) |
|  - Reading Test Interface (39 QCM, Split Passage View, Timer)         |
|  - Writing Studio (Word Counter, Timer, Tâches 1-3 Prompts)          |
|  - Speaking Studio (Web Audio Recorder, Live Waveform, Retries)       |
|  - Dashboard & Analytics (NCLC Score Graph, CRS Point Calculator)     |
+-----------------------------------▲-----------------------------------+
                                    │ HTTP / SSE Stream
+-----------------------------------▼-----------------------------------+
|                           NEXT.JS API ROUTES                          |
|  - /api/speaking/transcribe  (Audio -> Text)                          |
|  - /api/speaking/evaluate    (Audio Transcript -> TCF Speaking Score) |
|  - /api/writing/evaluate     (Draft Text -> TCF Writing Score)        |
|  - /api/test/explain         (Question + Trap Breakdown)              |
+-----------------------------------▲-----------------------------------+
                                    │
+-----------------------------------▼-----------------------------------+
|               AI ADAPTER & CIRCUIT BREAKER ENGINE                     |
|  1. Request Normalizer (Strict Prompt Templates & XML Boundaries)     |
|  2. Dynamic Failover Router:                                          |
|     [Groq] -> [Google AI Studio] -> [Cerebras] -> [Mistral] -> [OpenRouter] -> [Puter]
|  3. Structured Output Validator (Zod Schema Validation & Auto-Repair) |
|  4. In-Memory / Local Cache (Prevents Redundant Token Consumption)    |
+-----------------------------------------------------------------------+
```

### 5.2 Speaking & Writing Evaluation Schemas (Zod)
```typescript
export const TCFEvaluationSchema = z.object({
  overallScore: z.number().min(0).max(699), // TCF Official scale: 0-699
  nclcLevel: z.number().min(3).max(10),     // NCLC 3 to 10+
  cefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  criteria: z.object({
    taskCompletion: z.object({ score: z.number(), feedback: z.string() }),
    coherenceAndCohesion: z.object({ score: z.number(), feedback: z.string() }),
    lexicalResource: z.object({ score: z.number(), feedback: z.string() }),
    grammaticalAccuracy: z.object({ score: z.number(), feedback: z.string() })
  }),
  corrections: z.array(z.object({
    original: z.string(),
    improved: z.string(),
    explanation: z.string(),
    category: z.enum(['grammar', 'vocabulary', 'spelling', 'structure'])
  })),
  strengths: z.array(z.string()),
  priorityImprovements: z.array(z.string()),
  modelAnswer: z.string().optional()
});
```

---

## 6. Security & Performance Implications

- **API Key Masking**: All AI API keys (`GROQ_API_KEY`, `GEMINI_API_KEY`, `CEREBRAS_API_KEY`, etc.) remain server-side.
- **Prompt Injection Defense**: All user submissions wrapped in strict boundary tags (`<candidate_response>...</candidate_response>`) with system instructions prohibiting meta-prompt hijacking.
- **Audio Payload Sanitation**: In-memory audio validation (format verification: `audio/webm`, `audio/mp4`, `audio/wav`, max size: 10MB, max duration: 5 minutes per speaking task).
- **Rate-Limit Resilience**: Client exponential backoff + backend round-robin load distribution.

---

## 7. Edge Cases & Failure Scenarios

1. **Microphone Permission Denied / Safari WebAudio Incompatibilities**:
   - Provide standard fallback audio upload button + clear visual browser permission instructions.
2. **All API Keys Rate-Limited Concurrently**:
   - Router activates zero-key fallback tier (Puter.js client-side proxy) ensuring uninterrupted service.
3. **Malformed LLM Output**:
   - Schema validation loop: if output fails Zod parsing, automatic one-shot repair prompt is executed or fallback model invoked.
4. **Audio Length Discrepancies**:
   - Automatically split audio if over 25MB, or downsample client-side to 16kHz mono WAV for fast Whisper processing.

---

## 8. Phased Implementation Roadmap (Phrased Slices)

### Phase 1: Project Scaffolding & Multi-Model AI Routing Engine
- **Step 1.1**: Initialize Next.js 15 project with TypeScript, Tailwind CSS, Lucide icons, and modern app directory layout.
- **Step 1.2**: Implement `AiProviderAdapter` interface and specific drivers (`GroqProvider`, `GeminiProvider`, `CerebrasProvider`, `MistralProvider`, `OpenRouterProvider`, `PuterProvider`).
- **Step 1.3**: Build the **Circuit Breaker / Failover Router** (`lib/ai/router.ts`) with automatic retries, fallback cascading, and exponential backoff.
- **Step 1.4**: Implement Speech-to-Text adapter with Groq Whisper & Cloudflare Whisper.

### Phase 2: Comprehensive TCF Canada Data Engine & Content Store
- **Step 2.1**: Construct the Listening Comprehension bank (40 mock exams, 39 questions each with transcripts, translations, and trap explanations).
- **Step 2.2**: Construct the Reading Comprehension bank (40 mock exams, 39 questions each with passage documents and detailed rationale).
- **Step 2.3**: Assemble the Writing Bank (113 topics across Tâches 1, 2, and 3 with official model answers and grading rubrics).
- **Step 2.4**: Assemble the Speaking Bank (Tâche 1 personal interview, Tâche 2 interaction/questions, Tâche 3 argumentative monologue).
- **Step 2.5**: Deduplicate and tag questions for the CEFR-level practice engine (`unique-listening` & `unique-reading`).

### Phase 3: Core Exam Simulation & Interactive Frontend Modules
- **Step 3.1**: Build the Navigation, Header, Dark/Light Mode theme switcher, and Landing page matching the clean aesthetic of `fuck-tcf.xyz`.
- **Step 3.2**: Build the **Listening Simulator**: Audio player (scrubber, speed control 0.75x–1.5x, auto-next), question navigation grid, and post-submission review drawer (French transcript, English translation, trap highlights).
- **Step 3.3**: Build the **Reading Simulator**: Split-pane view (passage text on left, questions on right), countdown timer (60 min), and instant answer explanations.
- **Step 3.4**: Build the **Unique Questions Practice Mode** with CEFR level filters (A1, A2, B1, B2, C1, C2) and custom question counts.

### Phase 4: Free AI-Powered Writing & Speaking Evaluation Engines
- **Step 4.1**: Build the **Writing Studio**: Multi-task prompt selector (Tâche 1: 60–120 words, Tâche 2: 120–150 words, Tâche 3: 120–180 words), live word counter, and instant AI Evaluation button.
- **Step 4.2**: Implement `/api/writing/evaluate` with TCF scoring rubric, CEFR/NCLC alignment, grammar fixes, and vocabulary enrichment.
- **Step 4.3**: Build the **Speaking Studio**: In-browser audio recorder (Web Audio API / MediaRecorder) with audio waveform visualizer and re-record capability.
- **Step 4.4**: Implement `/api/speaking/transcribe` & `/api/speaking/evaluate`: Instant transcription + CEFR assessment on fluency, phonetics, grammar, and coherence.
- **Step 4.5**: Implement the AI Explainer Drawer for any listening/reading question to answer learner questions interactively.

### Phase 5: Student Analytics, Scoring Calculators & Production Verification
- **Step 5.1**: Build the Student Dashboard: Score history line charts (Recharts), CLB/NCLC level tracking, and Express Entry CRS French points calculator.
- **Step 5.2**: Local persistence layer (IndexedDB/LocalStorage) allowing 100% offline-first test taking and score preservation.
- **Step 5.3**: End-to-end verification: test simulations, audio transcription verification, AI provider failover testing under simulated 429 errors.
- **Step 5.4**: Production build verification (`npm run build`, linting, strict TypeScript checks).

---

## 9. Verifiable Acceptance Criteria

- [ ] Complete UI & aesthetic parity with `fuck-tcf.xyz` (Typography, layout, exam simulator, dark mode).
- [ ] 40 Listening tests and 40 Reading tests accessible with interactive question navigator.
- [ ] French transcripts, English translations, and "Trap Warnings" render upon question completion.
- [ ] Writing evaluation works seamlessly, outputting exact TCF scores (0–699), NCLC level, and line-by-line grammar feedback.
- [ ] Speaking evaluation records browser audio, transcribes it via Whisper, and delivers detailed rubric feedback.
- [ ] Zero paid token limits: User can retry speaking and writing tests without ever being prompted to pay.
- [ ] Multi-model fallback functions: If Primary API key is rate-limited or disabled, requests switch to Secondary model seamlessly with zero error shown to the user.
- [ ] Clean production build without TypeScript or linting errors.

---

## 10. Testing & Verification Procedures

1. **AI Failover Integration Test**:
   - Send test requests through `AiRouter` with simulated `429 Too Many Requests` on Provider 1 to confirm automatic routing to Provider 2.
2. **Audio Pipeline Test**:
   - Record test sample audio in browser and verify Whisper STT output quality and latency.
3. **Scoring Calibration Test**:
   - Submit sample TCF essays (A2, B2, C1) to confirm model rubric evaluation matches official CEFR guidelines.
4. **Production Build Check**:
   - Execute `npm run build` to confirm zero static generation or compilation issues.
