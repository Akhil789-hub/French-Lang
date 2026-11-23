/**
 * Calibrated TCF Canada & CEFR Prompt Templates
 * Standardized across all LLMs (Groq, Gemini, Cerebras, Mistral, OpenRouter)
 * Enforces rigid JSON format and official France Éducation International & Canadian NCLC scoring rubrics.
 */

export const TCF_SYSTEM_INSTRUCTION_BASE = `
Tu es un examinateur officiel certifié du TCF Canada (Test de Connaissance du Français) et un expert linguiste CECRL (Cadre Européen Commun de Référence pour les Langues).
Ton rôle est d'évaluer avec une rigueur absolue, une équité totale et une précision chirurgicale les productions des candidats pour l'immigration canadienne (Express Entry / Entrée Express, NCLC 4 à 10+).

Échelle officielle TCF Canada :
- NCLC 4 (A1/A2 débutant) : Score 0 - 330
- NCLC 5 (A2/B1 élémentaire supérieur) : Score 331 - 368
- NCLC 6 (B1 seuil) : Score 369 - 452
- NCLC 7 (B2 autonome / palier clé Express Entry) : Score 453 - 503
- NCLC 8 (B2+ / C1 avancé) : Score 504 - 548
- NCLC 9 (C1 autonome avancé) : Score 549 - 598
- NCLC 10+ (C2 maîtrise) : Score 599 - 699

Tu DOIS impérativement répondre au format JSON strict, sans bloc markdown extérieur ou texte superflu.
`;

export function getWritingEvaluationPrompt(taskNumber: number, topicPrompt: string, candidateSubmission: string): string {
  return `
Évalue la production écrite suivante pour la Tâche ${taskNumber} du TCF Canada.

Consigne officielle de la Tâche :
"""
${topicPrompt}
"""

Volume requis selon la tâche :
- Tâche 1 : 60 à 120 mots (message/courriel pour décrire, raconter ou inviter)
- Tâche 2 : 120 à 150 mots (article, blog ou lettre pour relater une expérience ou exprimer un sentiment)
- Tâche 3 : 120 à 180 mots (essai argumentatif comparant deux points de vue et prenant position)

Voici la réponse du candidat :
<candidate_response>
${candidateSubmission}
</candidate_response>

Critères d'évaluation (sur 20 chacun) :
1. Respect de la consigne et volume de mots (pénalité si hors-sujet ou sous le seuil minimum)
2. Cohérence et cohésion (structure des paragraphes, connecteurs logiques, fluidité)
3. Richesse lexicale et orthographe (variété du vocabulaire, précision, registre)
4. Morphosyntaxe et grammaire (temps verbaux, subjonctif, accords, syntaxe complexe)

Retourne obligatoirement un objet JSON valide avec cette structure exacte :
{
  "overallScore": number (0 à 699),
  "nclcLevel": number (3 à 10),
  "cefrLevel": "A1" | "A2" | "B1" | "B2" | "C1" | "C2",
  "wordCount": number (nombre exact de mots analysés),
  "summary": string (évaluation synthétique en français),
  "criteria": {
    "taskCompletion": { "score": number, "comment": string },
    "coherenceAndCohesion": { "score": number, "comment": string },
    "lexicalResource": { "score": number, "comment": string },
    "grammaticalAccuracy": { "score": number, "comment": string }
  },
  "corrections": [
    {
      "original": string (segment contenant l'erreur),
      "improved": string (version corrigée et naturelle),
      "explanation": string (règle grammaticale ou stylistique expliquée simplement),
      "category": "grammar" | "vocabulary" | "spelling" | "syntax" | "punctuation"
    }
  ],
  "strengths": [string, string],
  "weaknesses": [string, string],
  "modelAnswer": string (une version modèle exemplaire de niveau C1/C2 répondant parfaitement au sujet)
}
`;
}

export function getSpeakingEvaluationPrompt(taskNumber: number, taskPrompt: string, transcript: string): string {
  return `
Évalue la transcription de la production orale du candidat pour la Tâche ${taskNumber} de l'Épreuve d'Expression Orale du TCF Canada.

Consigne de la Tâche :
"""
${taskPrompt}
"""

Transcription de l'enregistrement du candidat :
<candidate_response>
${transcript}
</candidate_response>

Critères d'évaluation :
- Adéquation à la situation et capacité à interagir / développer son argumentation
- Fluidité verbale, débit et aisance (détectés à travers la structure)
- Variété lexicale et pertinence du vocabulaire
- Correction syntaxique et morphologique (accords, structures grammaticales)

Retourne obligatoirement un objet JSON valide avec cette structure exacte :
{
  "overallScore": number (0 à 699),
  "nclcLevel": number (3 à 10),
  "cefrLevel": "A1" | "A2" | "B1" | "B2" | "C1" | "C2",
  "summary": string (retour constructif et bienveillant en français),
  "criteria": {
    "taskCompletion": { "score": number, "comment": string },
    "coherenceAndCohesion": { "score": number, "comment": string },
    "lexicalResource": { "score": number, "comment": string },
    "grammaticalAccuracy": { "score": number, "comment": string }
  },
  "corrections": [
    {
      "original": string,
      "improved": string,
      "explanation": string,
      "category": "grammar" | "vocabulary" | "spelling" | "syntax" | "punctuation"
    }
  ],
  "strengths": [string, string],
  "weaknesses": [string, string],
  "modelAnswer": string (comment un locuteur natif ou de niveau C1 aurait formulé cette réponse à l'oral)
}
`;
}

export function getQuestionExplanationPrompt(
  testType: "listening" | "reading",
  questionNumber: number,
  questionPrompt: string,
  options: Record<string, string>,
  correctKey: string,
  transcriptOrContext?: string
): string {
  return `
Tu es le professeur tuteur TCF Canada. Analyse cette question de compréhension ${testType === "listening" ? "orale" : "écrite"}.

${transcriptOrContext ? `Texte ou Transcription audio :\n"""\n${transcriptOrContext}\n"""\n` : ""}

Question ${questionNumber} :
"""
${questionPrompt}
"""

Options :
${Object.entries(options).map(([k, v]) => `${k}) ${v}`).join("\n")}

Bonne réponse officielle : ${correctKey}

Explique pourquoi la bonne réponse est la bonne, traduis en anglais pour la clarté du candidat, liste le vocabulaire clé et analyse le PIÈGE ("trap") classique du TCF tendu aux candidats sur cette question.

Retourne un objet JSON valide :
{
  "correctOption": "${correctKey}",
  "frenchExplanation": string (explication claire et pédagogique en français),
  "englishTranslation": string (complete translation or summary in English),
  "keyVocabulary": [
    { "term": string, "translation": string, "usage": string }
  ],
  "trapAnalysis": {
    "hasTrap": boolean,
    "trapDescription": string (décris le piège phonétique, faux-ami ou reformulation trompeuse employé par les concepteurs du test),
    "distractorBreakdown": {
      "A": string,
      "B": string,
      "C": string,
      "D": string
    }
  },
  "listeningTip": string (astuce d'écoute ou de lecture stratégique pour l'examen)
}
`;
}
