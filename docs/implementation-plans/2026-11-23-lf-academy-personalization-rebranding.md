# LF Academy (Learn French) — Personalization & Rebranding Implementation Plan

> **Document ID**: `docs/implementation-plans/2026-11-23-lf-academy-personalization-rebranding.md`  
> **Target Project**: `https://french-lang-mocha.vercel.app` (`Akhil789-hub/French-Lang`)  
> **Brand Name**: **LF Academy** (*Académie Learn French*)  
> **Scope**: Complete brand transformation, bespoke design system, personalized candidate learning pathways, and adaptive AI tutoring.

---

## 1. Existing Implementation Analysis
- **Current State**: The platform functions as a reverse-engineered clone of `fuck-tcf.xyz` with free multi-model AI routing (Groq, Gemini, Cerebras, Mistral, Pollinations) and a live Supabase PostgreSQL backend.
- **Current Aesthetic**: Generic dark/light zinc theme with stock typography, hardcoded exam titles, and identical visual layout to the original source site.
- **Gaps**:
  - No personal identity or memorable brand mark.
  - Lacks personalized candidate onboarding (users cannot set target exam dates, desired NCLC score, or French accents).
  - No adaptive "Mistake Notebook" (*Mon Carnet d'Erreurs*) to review past failed questions.
  - No customized study schedule based on user's remaining prep days.

---

## 2. Problem Definition & Desired Outcome
Transform the platform from an unbranded exam clone into **LF Academy**: an elite, modern, personalized French language academy tailored for Canadian immigration (Express Entry, Arrima, Citizenship) and academic excellence.

### Key Objectives
1. **Premium Academic Identity**: Rebrand to **LF Academy** with custom logo monogram, Canadian-French heritage color palette, and editorial typography.
2. **Personalized Diagnostic & Goal Setting**: An interactive onboarding modal where candidates specify their target exam date, target NCLC band (e.g. NCLC 7 for +50 CRS points), and diagnostic level.
3. **Adaptive "Carnet d'Erreurs" (Personal Mistake Vault)**: Automatically persist questions answered incorrectly or traps fallen into, letting candidates practice specifically on their personal weaknesses.
4. **Daily Customized Study Plan**: Dynamic progress tracker calculating daily study recommendations to reach NCLC 7/8/9 by the candidate's chosen target exam date.
5. **AI Tutor Persona ("Professeur LF" / "Élodie")**: Personalized, empathetic feedback with speech synthesis accents (Metropolitan vs Québécois).

---

## 3. Dependency & File Inspection
- **Branding & Assets**:
  - New brand assets in `src/components/brand/Logo.tsx` (SVG monogram featuring maple leaf accent and modern French serif).
  - Global metadata in `src/app/layout.tsx`.
- **Design System & Theme**:
  - `src/app/globals.css`: Custom CSS variables for LF Academy palette (Deep Parisian Navy, Canadian Crimson, Champagne Gold, Pearl White).
  - Fonts: Integration of `Plus Jakarta Sans` (UI) and `Playfair Display` or `Cinzel` (Academic Headings).
- **Personalization State & Storage**:
  - `src/lib/personalization.ts`: Candidate profile store (name/alias, target exam date, current NCLC, target NCLC, daily goals, accent preference).
  - `src/lib/mistakes.ts`: Storage & PostgreSQL sync for bookmarked questions and failed traps.
- **Frontend Views**:
  - `src/app/page.tsx`: Redesigned LF Academy landing page with interactive CRS score calculator and diagnostic CTA.
  - `src/app/dashboard/page.tsx`: Personalized command center with countdown timer, streak, target goal dial, and personalized recommendations.
  - `src/app/dashboard/mistakes/page.tsx`: Dedicated "Mon Carnet d'Erreurs" review room.
  - `src/components/Navbar.tsx` & `src/components/Footer.tsx`: Modern academy navigation.

---

## 4. Impact Analysis
- **Non-Destructive Guarantee**: All 40 listening tests, 40 reading tests, 113 writing topics, 3 speaking tasks, and the multi-model AI failover router in PostgreSQL remain completely intact and functional.
- **Backward Compatibility**: Existing test attempts stored locally or in Supabase will seamlessly link with the candidate's personalized profile.

---

## 5. Cross-Tier Specification

### A. Design System & Color Palette
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `lf-navy-950` | `#080E1A` | Dark theme surface & hero contrast |
| `lf-navy-900` | `#0F172A` | Primary card background in dark mode |
| `lf-navy-800` | `#1E293B` | Borders & subtle separators |
| `lf-blue-600` | `#2563EB` | Primary interactive royal blue |
| `lf-crimson-600` | `#E11D48` | Canadian maple accent & urgent deadlines |
| `lf-gold-500` | `#D97706` | NCLC 7+ Express Entry bilingual bonus badge |
| `lf-pearl-50` | `#F8FAFC` | Light mode background |

### B. Candidate Profile Schema
```typescript
interface CandidateProfile {
  name: string;
  targetExam: "TCF_CANADA" | "TEF_CANADA" | "DELF_DALF" | "GENERAL";
  targetExamDate?: string; // ISO date
  targetNclc: 5 | 7 | 8 | 9 | 10;
  accentPreference: "metropolitan" | "quebecois";
  dailyStudyMinutes: number;
  streakDays: number;
  lastActiveDate: string;
}
```

### C. Personal Mistake Vault Schema
```typescript
interface SavedMistakeItem {
  id: string;
  skill: "listening" | "reading";
  testId: string;
  questionNumber: number;
  level: string;
  prompt: string;
  wrongAnswerSelected: string;
  correctAnswer: string;
  explanation: string;
  trapAlert: string;
  savedAt: string;
  reviewedTimes: number;
  mastered: boolean;
}
```

---

## 6. Phased Implementation Roadmap

### Phase 1: Brand Identity & Design System
- Create `src/components/brand/Logo.tsx` with customized LF Academy insignia.
- Update `src/app/globals.css` with LF Academy design tokens and font typography.
- Update `src/app/layout.tsx` metadata (titles, descriptions, OpenGraph, icons) for LF Academy.
- Redesign `Navbar` and `Footer` with academic elegance and quick profile pill.

### Phase 2: Candidate Onboarding & Personalization Store
- Build `src/lib/personalization.ts` with local persistence and Supabase sync.
- Implement `src/components/OnboardingModal.tsx` allowing candidates to select their target exam date, target NCLC, and study goals.
- Add an Express Entry CRS Calculator widget estimating points jump from CLB French (e.g. +50 bonus points).

### Phase 3: "Mon Carnet d'Erreurs" (Mistake Vault)
- Implement auto-save trigger in `ListeningSimulator` and `ReadingSimulator` when candidate answers incorrectly.
- Create `/dashboard/mistakes` page allowing candidates to review and replay failed questions until mastered.

### Phase 4: Personalized Dashboard Command Center
- Redesign `/dashboard` with:
  - Personal greeting with exam countdown (*"J-42 avant votre TCF Canada"*).
  - Interactive NCLC Target Dial with projected Canadian CRS score.
  - "Mission du Jour" (e.g. 1 Listening Test + 10 B2 Unique Questions + 1 Mistake Review).
  - Quick access to the 4 skill studios.

### Phase 5: Landing Page Rejuvenation
- Redesign `src/app/page.tsx` for LF Academy:
  - Hero headline: *"LF Academy — Votre Passerelle Gratuite vers le NCLC 7 & l'Immigration Canadienne"*.
  - Live interactive level tester preview.
  - Canadian Express Entry bilingual bonus simulation widget.
  - Modern academic aesthetics, zero-slop visuals, WCAG AA compliant contrast.

### Phase 6: Verification & Production Release
- Full `npm run build` verification.
- Push to GitHub `Akhil789-hub/French-Lang`.
- Verify live on `french-lang-mocha.vercel.app`.

---

## 7. Acceptance Criteria
- [ ] Brand name throughout UI is **LF Academy** (*Learn French Academy*).
- [ ] Custom LF logo and typography appear across all views.
- [ ] Users can set target exam dates and view a live countdown timer.
- [ ] Candidate mistakes are automatically saved and reviewable in a dedicated Mistake Vault.
- [ ] All 40 listening and 40 reading tests remain 100% accessible via PostgreSQL.
- [ ] Multi-model AI failover continues to provide zero-cost, unlimited evaluations.
- [ ] Production build passes with zero TypeScript or rendering errors.
