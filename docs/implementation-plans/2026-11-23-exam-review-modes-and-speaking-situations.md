# Implementation Plan: Exam vs Review Modes & Multi-Situation Speaking/Writing Practice

> **Document ID**: `docs/implementation-plans/2026-11-23-exam-review-modes-and-speaking-situations.md`  
> **Target Project**: `LF Academy` (`c:\Users\DELL\Desktop\frenc`)  
> **Source Reference**: `fuck-tcf.xyz` reverse-engineered architecture (chunk `36100cab2ec31d7b.js` & `4bc30bed493494d7.js`)

---

## 1. Existing Implementation Analysis & Gap Identification
1. **Exam vs Review Modes**:
   - **Current State**: `ListeningSimulator` and `ReadingSimulator` only operate under strict timed conditions (35 min / 60 min) with all results hidden until full submission.
   - **Required State**: Users clicking any test must see a **"Mode Selection Modal"** offering:
     - **Exam Mode (`?mode=exam`)**: Official countdown timer, no answers or explanations shown until completion, question flagging.
     - **Review Mode (`?mode=review`)**: No timer, instant feedback after answering each question, immediate transcript and trap alert reveal.
2. **Speaking Situations**:
   - **Current State**: `/dashboard/speaking` only displays 3 generic tasks (Task 1 Présentation, Task 2 Interaction, Task 3 Monologue).
   - **Required State**:
     - **Task 2 (Interactive Roleplay)**: Catalogue of 14–15 real TCF situations (e.g. *Location d'appartement*, *Abonnement salle de sport*, *Organisation d'un voyage*, *Cours de cuisine*, *Achat d'une voiture d'occasion*).
     - **Task 3 (Monologue d'Opinion)**: Catalogue of 12–15 real TCF topics (e.g. *Le télétravail*, *L'intelligence artificielle au travail*, *Les réseaux sociaux et les jeunes*, *Le tourisme de masse*, *La gratuité des transports publics*).
     - Candidate can browse the situation list, filter by task/category, and select any situation to attempt with preparation timer (2 min) and speaking recorder.
3. **Writing Situations**:
   - Ensure the 113 writing topics across Tasks 1, 2, and 3 are searchable and selectable with instant model answer review mode.

---

## 2. Technical Architecture & File Changes

### A. Mode Selection Modal (`src/components/ModeSelectionModal.tsx`)
- Triggered when candidate clicks any listening or reading test card from `/dashboard/listening` or `/dashboard/reading`.
- Presents two distinct cards:
  - ⏱️ **Exam Mode**: 35/60 min countdown timer, exam conditions, results at the end.
  - 📖 **Review Mode**: Unlimited time, instant feedback per question, immediate explanation and transcript.
- Routes to `/dashboard/listening/[id]?mode=exam` or `?mode=review`.

### B. Simulator Mode Handling
- Update `ListeningSimulator.tsx` and `ReadingSimulator.tsx`:
  - Read `mode` search param via `useSearchParams()` (`exam` | `review`).
  - In `review` mode:
    - Hide or disable countdown timer (`Timer: Illimité`).
    - Once candidate selects an option, immediately show correct/incorrect styling, transcript, key sentence, and trap breakdown.
    - Keep navigation fluid (Next/Previous question).
  - In `exam` mode:
    - Keep ticking timer.
    - Add "Flag for Review" (❓ *Marquer pour révision*) so candidates can mark questions to revisit before final submission.

### C. Speaking Situations Dataset & Supabase Schema
- Expand `speaking_topics` table in PostgreSQL with 28 authentic TCF Canada situations:
  - **14 Task 2 Situations**: Real-life roleplay scenarios with examiner/candidate roles, prep time (2 min), interaction time (3.5 min), and sample questions list.
  - **14 Task 3 Monologue Topics**: Formal opinion topics with 4.5 minutes speaking time, pro/con arguments, and key discourse connectors.
- Update `src/app/api/topics/speaking/route.ts` to support filtering by `task_number` (`2` or `3`).

### D. Speaking Catalogue UI (`src/app/dashboard/speaking/page.tsx`)
- Redesign speaking page to feature:
  - Tab filters: **Toutes**, **Tâche 2 (Interaction - 14 situations)**, **Tâche 3 (Monologue - 14 sujets)**.
  - Category filters: *Logement*, *Voyage*, *Emploi*, *Technologie*, *Société*, *Environnement*.
  - Situation cards showing difficulty, prep time, speaking time, and a "S'entraîner" button.
  - Interactive simulator for the selected situation with prep timer, recording, Whisper transcription, and AI evaluation.

---

## 3. Phased Implementation Steps
1. **Phase 1: Mode Selection Modal & Simulator Updates**:
   - Create `src/components/ModeSelectionModal.tsx`.
   - Update `ListeningSimulator.tsx` and `ReadingSimulator.tsx` to support `mode=exam` and `mode=review`.
   - Hook modal into `src/app/dashboard/listening/page.tsx` and `src/app/dashboard/reading/page.tsx`.
2. **Phase 2: Speaking Situations Bank & PostgreSQL Migration**:
   - Create `src/data/speaking-situations.ts` containing the 28 authentic TCF Task 2 & Task 3 situations.
   - Seed new situations into Supabase PostgreSQL `speaking_topics` table.
3. **Phase 3: Speaking Dashboard Redesign**:
   - Rebuild `/dashboard/speaking` with situation selector, search bar, task tabs, and simulator view.
4. **Phase 4: Writing Mode Enhancement**:
   - Add Review Mode (instant model answer & vocabulary reveal) alongside Exam Mode (timed writing).
5. **Phase 5: Build, Test & Git Synchronization**:
   - Run `npm run build` to verify zero type or prerendering regressions.
   - Commit and push to GitHub `Akhil789-hub/French-Lang`.

---

## 4. Acceptance Criteria
- [ ] Clicking any listening or reading test opens the Mode Selection Modal (Exam vs Review).
- [ ] Review Mode has no time limit and reveals the correct answer and explanation immediately upon selection.
- [ ] Exam Mode enforces the official countdown timer with results displayed upon submission.
- [ ] Speaking section displays 14+ Task 2 interaction situations and 12+ Task 3 monologue topics.
- [ ] Candidate can browse, search, and select any specific speaking situation to practice.
- [ ] Candidate speech is recorded and evaluated with free AI failover.
