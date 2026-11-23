import { CefrLevel } from "@/lib/ai/types";

export interface TCFReadingQuestion {
  id: string;
  questionNumber: number;
  level: CefrLevel;
  documentTitle: string;
  documentContent: string;
  prompt: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  trapAlert: string;
}

export interface TCFReadingTest {
  id: string;
  testNumber: number;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: TCFReadingQuestion[];
}

export const SAMPLE_READING_POOL: TCFReadingQuestion[] = [
  {
    id: "rq1",
    questionNumber: 1,
    level: "A1",
    documentTitle: "Avis à la clientèle - Piscine municipale",
    documentContent: "Fermeture exceptionnelle du bassin olympique pour travaux de maintenance le jeudi 14 novembre de 8h à 14h. Réouverture normale des vestiaires à 14h15.",
    prompt: "À quelle heure rouvre la piscine le 14 novembre ?",
    options: {
      A: "À 8h00",
      B: "À 14h00",
      C: "À 14h15",
      D: "Elle reste fermée toute la journée",
    },
    correctAnswer: "C",
    explanation: "Le texte précise textuellement : 'Réouverture normale des vestiaires à 14h15'.",
    trapAlert: "8h et 14h sont les heures de fermeture pour travaux, ne pas les confondre avec la réouverture.",
  },
  {
    id: "rq2",
    questionNumber: 2,
    level: "A2",
    documentTitle: "Courriel de confirmation - Librairie du Centre",
    documentContent: "Votre commande N° 45892 est prête. Vous pouvez la retirer en magasin muni d'une pièce d'identité sous 10 jours ouvrés. Au-delà, les articles seront remis en rayon et remboursés.",
    prompt: "Que se passe-t-il si le client ne vient pas chercher sa commande dans les 10 jours ?",
    options: {
      A: "Il doit payer des frais de garde supplémentaires",
      B: "Il reçoit ses articles directement par la poste",
      C: "Il est remboursé et la commande est annulée",
      D: "Son compte client est définitivement suspendu",
    },
    correctAnswer: "C",
    explanation: "'les articles seront remis en rayon et remboursés' signifie que la commande est annulée et son montant restitué.",
    trapAlert: "Aucune pénalité financière n'est infligée, le remboursement est automatique.",
  },
  {
    id: "rq3",
    questionNumber: 3,
    level: "B1",
    documentTitle: "Chronique environnementale : Le boom des ressourceries",
    documentContent: "Face au gaspillage industriel, les ressourceries de quartier s'imposent comme une alternative vertueuse. Cependant, nombre d'entre elles font face à un afflux massif d'objets irréparables que les déchetteries traditionnelles refusent de traiter, menaçant l'équilibre financier de ces associations bénévoles.",
    prompt: "Quelle difficulté majeure rencontrent actuellement les ressourceries ?",
    options: {
      A: "Le désintérêt grandissant des consommateurs locaux",
      B: "L'obligation de transformer tous leurs bénévoles en salariés",
      C: "L'encombrement causé par des dons d'objets inutilisables",
      D: "Une interdiction gouvernementale de revendre du matériel d'occasion",
    },
    correctAnswer: "C",
    explanation: "Le texte stipule qu'elles 'font face à un afflux massif d'objets irréparables', ce qui crée un encombrement et pèse sur leurs finances.",
    trapAlert: "Les consommateurs ne se désintéressent pas du concept, au contraire le modèle attire un afflux excessif d'encombrants non valorisables.",
  },
  {
    id: "rq4",
    questionNumber: 4,
    level: "B2",
    documentTitle: "Tribune sociologique : L'illusion de l'hyperconnexion",
    documentContent: "La promesse initiale du tout-numérique résidait dans l'abolition des distances et l'émancipation intellectuelle. Or, force est de constater que la surabondance informationnelle engendre une désaffection paradoxale envers l'esprit critique. La vérification factuelle cède le pas à l'immédiateté émotionnelle, transformant le citoyen éclairé en consommateur compulsif de flux éphémères.",
    prompt: "Selon l'auteur, quelle est la conséquence fâcheuse du trop-plein d'informations ?",
    options: {
      A: "Une disparition totale des réseaux sociaux",
      B: "L'affaiblissement de la rigueur critique au profit des réactions affectives spontanées",
      C: "Une hausse spectaculaire du niveau de scolarisation générale",
      D: "Le rétablissement d'un dialogue démocratique apaisé",
    },
    correctAnswer: "B",
    explanation: "L'auteur déplore que 'la vérification factuelle cède le pas à l'immédiateté émotionnelle', ce qui amoindrit l'esprit critique au bénéfice de l'affect.",
    trapAlert: "L'option C est contredite par l'ensemble du réquisitoire formulé par l'auteur.",
  },
  {
    id: "rq5",
    questionNumber: 5,
    level: "C1",
    documentTitle: "Essai philosophique : Des artefacts et de la mémoire",
    documentContent: "En déléguant notre mémoire aux dispositifs mnémotechniques dématérialisés, nous ne nous contentons pas d'alléger notre charge cognitive ; nous altérons subrepticement la texture même de notre historicité. La mémoire humaine n'a jamais été un simple stockage passif de données, mais un travail perpétuel de sédimentation et d'oubli créateur. L'archivage exhaustif et instantané risque d'annihiler cette respiration vitale de la conscience.",
    prompt: "Quelle thèse principale sous-tend cette réflexion ?",
    options: {
      A: "L'informatique a enfin résolu les défaillances de la mémoire organique",
      B: "L'oubli est une composante indispensable de la maturation intellectuelle humaine qui se trouve menacée par la numérisation intégrale",
      C: "Les ordinateurs disposent d'une conscience plus fine que celle des historiens",
      D: "L'humanité doit renoncer immédiatement à l'écriture",
    },
    correctAnswer: "B",
    explanation: "L'auteur défend l'idée que l'oubli est un processus dynamique ('oubli créateur', 'respiration vitale') que le stockage numérique illimité et instantané compromet.",
    trapAlert: "Attention au contresens : le numérique n'est pas célébré comme un progrès libérateur, mais interrogé comme une menace ontologique.",
  },
  {
    id: "rq6",
    questionNumber: 6,
    level: "C2",
    documentTitle: "Critique épistémologique : Le mirage de l'objectivité algorithmique",
    documentContent: "Revendiquer la neutralité axiologique d'un modèle stochastique relève soit de la tartufferie intellectuelle, soit d'une cécité méthodologique confondante. Tout système algorithmique cristallise en son sein les postulats épistémiques et les biais téléologiques de ses concepteurs, maquillés sous l'apparat faussement immaculé de la formalisation mathématique.",
    prompt: "Quel est le reproche fondamental adressé par l'auteur aux promoteurs des algorithmes dits 'neutres' ?",
    options: {
      A: "Leur incapacité technique à effectuer des calculs de probabilité complexes",
      B: "Le fait de dissimuler des partis pris idéologiques et humains derrière une façade d'impartialité mathématique",
      C: "Leur refus obstiné de commercialiser leurs innovations au grand public",
      D: "Leur attachement anachronique aux méthodes artisanales",
    },
    correctAnswer: "B",
    explanation: "L'auteur dénonce la 'fausse neutralité' : les algorithmes incarnent les préjugés et orientations ('postulats épistémiques', 'biais téléologiques') dissimulés sous une apparence mathématique rigoureuse.",
    trapAlert: "Le texte ne critique pas la puissance de calcul (A), mais l'alibi moral et idéologique (B).",
  },
];

export function generateReadingTests(): TCFReadingTest[] {
  const tests: TCFReadingTest[] = [];

  for (let i = 1; i <= 40; i++) {
    const testQuestions: TCFReadingQuestion[] = [];
    const pool = SAMPLE_READING_POOL;

    for (let q = 1; q <= 39; q++) {
      const template = pool[(q - 1) % pool.length];
      let level: CefrLevel = "A1";
      if (q > 8 && q <= 16) level = "A2";
      else if (q > 16 && q <= 24) level = "B1";
      else if (q > 24 && q <= 31) level = "B2";
      else if (q > 31 && q <= 36) level = "C1";
      else if (q > 36) level = "C2";

      testQuestions.push({
        ...template,
        id: `reading_t${i}_q${q}`,
        questionNumber: q,
        level,
      });
    }

    tests.push({
      id: `reading-test-${i}`,
      testNumber: i,
      title: `Test de Lecture #${i}`,
      durationMinutes: 60,
      totalQuestions: 39,
      questions: testQuestions,
    });
  }

  return tests;
}

export const READING_TESTS = generateReadingTests();
