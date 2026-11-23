# Implementation Plan: TCF Canada Official Rules, Exam Format & Full 2h47 Mock Simulation

> **Document ID**: `docs/implementation-plans/2026-11-23-tcf-rules-guidelines-and-exam-simulator.md`  
> **Target Project**: `LF Academy` (`c:\Users\DELL\Desktop\frenc`)  
> **Status**: Approved & In Execution

---

## 1. Problem Definition & Desired Outcome
The user provided the official TCF Canada rules and timing:
- **Total Duration**: Roughly 2 hours 47 minutes across four modules:
  - **Compréhension Orale (Listening)**: 35 minutes, 39 questions, multiple-choice, scored 0–699.
  - **Compréhension Écrite (Reading)**: 60 minutes, 39 questions, multiple-choice, scored 0–699.
  - **Expression Écrite (Writing)**: 60 minutes total across 3 tasks (T1: 60–120 words, T2: 120–150 words, T3: 120–180 words), scored 0–20 (converted to NCLC / 699).
  - **Expression Orale (Speaking)**: ~12–15 minutes across 3 tasks:
    - Task 1 (Guided interview): ~2 minutes, no preparation.
    - Task 2 (Information role play): 2 minutes preparation, 3 minutes 30 seconds speaking.
    - Task 3 (Expressing/defending opinion): 4 minutes 30 seconds speaking.
    - Scored 0–20 (converted to NCLC / 699).

The application must incorporate these exact rules throughout:
1. An interactive **Official TCF Canada Guidelines & Scoring Hub** (`/dashboard/guidelines`).
2. A **Global Rules Quick Guide modal** accessible from test headers.
3. The **Full 2h47m Mock Exam Hub** (`/dashboard/mock-exam`) connecting all 4 modules in sequence.
4. Writing Studio enhancement allowing a 60-minute full 3-task session in Exam Mode.
5. Navigation and Dashboard updates surfacing the official format and NCLC 7 benchmark (+50 CRS points).

---

## 2. Technical Architecture & Component Structure

### A. New Route: `/dashboard/guidelines` (Official Guide Hub)
- Visual module timeline (2h 47 min total).
- Interactive cards for each module detailing:
  - Timing and Question / Task breakdown.
  - Scoring system (0–699 for CO/CE, 0–20 for EE/EO).
  - NCLC level conversion table (NCLC 4 to 10+).
  - Essential exam day rules (one-listen audio policy, word count tolerances, roleplay protocols).
- Express Entry CRS Bonus Simulator: Calculate CRS points gained from NCLC 7+ across all 4 skills.

### B. New Component: `TcfRulesModal.tsx`
- Reusable modal accessible from any test header (`ListeningSimulator`, `ReadingSimulator`, `SpeakingStudio`, `WritingStudio`).
- Quickly displays the official rules, time limits, and scoring for that specific module without interrupting the candidate's test session.

### C. Full Mock Exam Runner: `/dashboard/mock-exam`
- Runs the 4 tests sequentially:
  - Stage 1: Écoute (35 min, 39 questions)
  - Stage 2: Lecture (60 min, 39 questions)
  - Stage 3: Écriture (60 min, 3 tâches)
  - Stage 4: Oral (15 min, 3 tâches)
- Shows cumulative timer and delivers the consolidated TCF Canada Attestation & NCLC Scorecard.

### D. Writing Studio Update (`src/app/dashboard/writing/page.tsx`)
- Add mode selector:
  - 20 min per task OR 60 min session for all 3 tasks.

---

## 3. Phased Execution Roadmap
1. **Phase 1: Implementation Plan Documentation** (this file).
2. **Phase 2: TCF Rules Modal Component** (`src/components/TcfRulesModal.tsx`).
3. **Phase 3: Interactive Guidelines Hub Page** (`src/app/dashboard/guidelines/page.tsx`).
4. **Phase 4: Full Mock Exam Orchestrator** (`src/app/dashboard/mock-exam/page.tsx`).
5. **Phase 5: Writing Studio 60-Minute Exam Option**.
6. **Phase 6: Navigation & Dashboard Links Integration**.
7. **Phase 7: Build Verification, E2E Testing & Git Push**.
