import { AiProvider } from "./base";
import {
  AiChatMessage,
  AiCompletionOptions,
  AiProviderName,
  AiProviderResponse,
  TranscriptionResult,
} from "../types";

export class MockProvider implements AiProvider {
  name: AiProviderName = "local-mock";

  isConfigured(): boolean {
    return true;
  }

  async complete(
    messages: AiChatMessage[],
    options?: AiCompletionOptions
  ): Promise<AiProviderResponse> {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";
    
    // Check if this is a writing or speaking evaluation request
    if (options?.jsonMode) {
      if (lastUserMsg.includes("candidate_response")) {
        const textMatch = lastUserMsg.match(/<candidate_response>([\s\S]*?)<\/candidate_response>/);
        const text = textMatch ? textMatch[1].trim() : "";
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        
        let score = 475;
        let nclc = 7;
        let cefr = "B2";

        if (wordCount < 40) {
          score = 310;
          nclc = 4;
          cefr = "A2";
        } else if (wordCount < 90) {
          score = 380;
          nclc = 6;
          cefr = "B1";
        } else if (wordCount > 140) {
          score = 520;
          nclc = 8;
          cefr = "C1";
        }

        const evaluationMock = {
          overallScore: score,
          nclcLevel: nclc,
          cefrLevel: cefr,
          wordCount,
          summary: `Excellente tentative démontrant une bonne maîtrise des structures syntaxiques fondamentales du français. La réponse correspond bien au registre attendu pour la tâche (Niveau estimé: ${cefr} / NCLC ${nclc}).`,
          criteria: {
            taskCompletion: {
              score: Math.min(20, Math.round(score / 35)),
              comment: `La consigne a été respectée dans son ensemble avec ${wordCount} mots. Le message remplit l'objectif communicatif.`,
            },
            coherenceAndCohesion: {
              score: Math.min(20, Math.round(score / 35)),
              comment: "Enchaînement logique des idées avec présence de connecteurs variés (donc, en effet, par conséquent).",
            },
            lexicalResource: {
              score: Math.min(20, Math.round(score / 35)),
              comment: "Vocabulaire adapté et contextualisé. Bon emploi des termes thématiques sans répétitions excessives.",
            },
            grammaticalAccuracy: {
              score: Math.min(20, Math.round(score / 35)),
              comment: "Bonne maîtrise des accords et des temps de l'indicatif. Quelques tournures méritent d'être perfectionnées.",
            },
          },
          corrections: [
            {
              original: "je suis trés content de vous ecrire",
              improved: "Je suis ravi(e) de vous écrire",
              explanation: "Privilégiez un lexique plus soutenu ('ravi' au lieu de 'content') et veillez aux accents stricts ('très', 'écrire').",
              category: "vocabulary",
            },
            {
              original: "parce que c'est important pour moi",
              improved: "d'autant plus que cet aspect revêt une importance capitale à mes yeux",
              explanation: "Remplacement par une tournure argumentative de niveau C1 pour valoriser le score NCLC.",
              category: "syntax",
            },
          ],
          strengths: [
            "Respect global des consignes et du volume textuel",
            "Clarté du propos et organisation en paragraphes distincts",
          ],
          weaknesses: [
            "Quelques connecteurs logiques supplémentaires renforceraient l'argumentation",
            "Diversifier l'utilisation du subjonctif et du conditionnel",
          ],
          modelAnswer:
            "Madame, Monsieur,\n\nJe me permets de vous contacter afin de vous faire part de mon intérêt pour votre proposition. Ayant pris connaissance des modalités requises, je souhaiterais obtenir quelques précisions supplémentaires. Vous remerciant par avance pour votre retour, je vous prie d'agréer mes salutations distinguées.",
        };

        return {
          content: JSON.stringify(evaluationMock),
          provider: this.name,
          model: "calibrated-tcf-evaluator-v1",
          latencyMs: 120,
        };
      }

      // Default question explanation mock
      const explanationMock = {
        correctOption: "B",
        frenchExplanation:
          "L'option B est la seule qui reflète précisément les propos tenus dans le document audio/écrit sans extrapolation.",
        englishTranslation:
          "Option B is the correct choice because it directly corresponds to the statement made in the passage.",
        keyVocabulary: [
          {
            term: "Demeure",
            translation: "Residence / Home",
            usage: "Il s'agit d'une splendide demeure en bord de mer.",
          },
          {
            term: "Incontournable",
            translation: "Essential / Unmissable",
            usage: "Un événement incontournable de la saison.",
          },
        ],
        trapAnalysis: {
          hasTrap: true,
          trapDescription:
            "Piège phonétique et lexical classique : l'option A reprend un mot identique à l'enregistrement mais avec un sens complètement opposé.",
          distractorBreakdown: {
            A: "Distracteur trompeur utilisant le même mot-clé avec négation subtile.",
            C: "Information non mentionnée dans le document.",
            D: "Contresens sur les dates annoncées.",
          },
        },
        listeningTip:
          "Écoutez attentivement les connecteurs d'opposition (or, cependant, pourtant) qui inversent souvent la première proposition.",
      };

      return {
        content: JSON.stringify(explanationMock),
        provider: this.name,
        model: "calibrated-tcf-evaluator-v1",
        latencyMs: 120,
      };
    }

    return {
      content:
        "Le TCF Canada exige une préparation ciblée sur les 4 compétences. Concentrez-vous particulièrement sur les tâches 2 et 3 qui octroient le plus grand nombre de points NCLC.",
      provider: this.name,
      model: "calibrated-tcf-evaluator-v1",
      latencyMs: 90,
    };
  }

  async transcribe(): Promise<TranscriptionResult> {
    return {
      text: "Bonjour, je me présente pour l'épreuve d'expression orale du TCF Canada. Je suis ingénieur en informatique et j'envisage de m'installer au Canada avec ma famille pour relever de nouveaux défis professionnels.",
      language: "fr",
      provider: "local-whisper-mock",
    };
  }
}
