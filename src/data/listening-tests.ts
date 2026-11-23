import { CefrLevel } from "@/lib/ai/types";

export interface TCFQuestion {
  id: string;
  questionNumber: number;
  level: CefrLevel;
  prompt: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  frenchTranscript: string;
  englishTranslation: string;
  trapAlert: string;
  explanation: string;
  keySentence: string;
  category: "quotidien" | "professionnel" | "medias" | "societe" | "academique";
}

export interface TCFListeningTest {
  id: string;
  testNumber: number;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: TCFQuestion[];
}

export const SAMPLE_QUESTIONS_POOL: TCFQuestion[] = [
  {
    id: "q1",
    questionNumber: 1,
    level: "A1",
    prompt: "Où se passe cette scène ?",
    options: {
      A: "Dans une boulangerie",
      B: "À la gare",
      C: "À l'aéroport",
      D: "Dans une pharmacie",
    },
    correctAnswer: "A",
    frenchTranscript: "— Bonjour monsieur, deux baguettes bien cuites et trois croissants s'il vous plaît.\n— Voilà, ce sera tout ? Ça vous fera cinq euros quarante.",
    englishTranslation: "— Hello sir, two well-done baguettes and three croissants please.\n— Here you go, will that be all? That will be five euros forty.",
    keySentence: "deux baguettes bien cuites et trois croissants",
    trapAlert: "Le mot 'gare' n'apparaît nulle part, mais le bruit de fond peut distraire.",
    explanation: "Le vocabulaire 'baguettes' et 'croissants' indique sans ambiguïté une boulangerie.",
    category: "quotidien",
  },
  {
    id: "q2",
    questionNumber: 2,
    level: "A1",
    prompt: "Que demande la femme ?",
    options: {
      A: "L'addition",
      B: "L'heure du train",
      C: "Le menu du jour",
      D: "Une chambre d'hôtel",
    },
    correctAnswer: "C",
    frenchTranscript: "— S'il vous plaît monsieur, qu'est-ce que vous proposez comme plat du jour aujourd'hui ?\n— Aujourd'hui nous avons un pavé de saumon avec du riz sauvage.",
    englishTranslation: "— Excuse me sir, what is your special dish of the day today?\n— Today we have a salmon steak with wild rice.",
    keySentence: "qu'est-ce que vous proposez comme plat du jour aujourd'hui ?",
    trapAlert: "Elle demande le plat du jour, pas encore l'addition.",
    explanation: "L'expression 'plat du jour' est synonyme de sélection du menu du jour.",
    category: "quotidien",
  },
  {
    id: "q3",
    questionNumber: 3,
    level: "A2",
    prompt: "Pourquoi la réunion est-elle déplacée ?",
    options: {
      A: "La salle est déjà réservée",
      B: "Le directeur est absent",
      C: "Le projecteur est en panne",
      D: "L'horaire ne convient à personne",
    },
    correctAnswer: "C",
    frenchTranscript: "Chers collègues, en raison d'un dysfonctionnement technique majeur sur le rétroprojecteur de la salle B, nous devons décaler notre séance de travail au salon George Sand à 15 heures.",
    englishTranslation: "Dear colleagues, due to a major technical malfunction with the overhead projector in room B, we must reschedule our work session to the George Sand lounge at 3:00 PM.",
    keySentence: "dysfonctionnement technique majeur sur le rétroprojecteur",
    trapAlert: "La salle B est mentionnée, mais le problème réside dans le matériel défectueux.",
    explanation: "'Dysfonctionnement technique sur le rétroprojecteur' équivaut directement à 'le projecteur est en panne'.",
    category: "professionnel",
  },
  {
    id: "q4",
    questionNumber: 4,
    level: "B1",
    prompt: "Quelle est l'attitude de l'intervenant envers le télétravail ?",
    options: {
      A: "Totalement enthousiaste",
      B: "Réservé et attentif aux dérives",
      C: "Catégoriquement opposé",
      D: "Indifférent aux nouvelles technologies",
    },
    correctAnswer: "B",
    frenchTranscript: "Si le télétravail a indéniablement offert une flexibilité salutaire aux salariés, il serait naïf d'en ignorer l'effet insidieux sur la porosité entre sphère privée et obligations professionnelles. La déconnexion reste encore trop souvent théorique.",
    englishTranslation: "While teleworking has undeniably offered a beneficial flexibility to employees, it would be naive to ignore its insidious effect on the blurring between private life and professional duties. Disconnection remains all too often theoretical.",
    keySentence: "il serait naïf d'en ignorer l'effet insidieux sur la porosité entre sphère privée et obligations",
    trapAlert: "L'intervenant reconnaît les atouts ('flexibilité salutaire') mais nuance immédiatement avec fermeté.",
    explanation: "La reconnaissance des atouts combinée à l'alerte sur les risques ('effet insidieux') caractérise une attitude réservée et vigilante.",
    category: "societe",
  },
  {
    id: "q5",
    questionNumber: 5,
    level: "B2",
    prompt: "D'après la chroniqueuse, quel est le principal écueil de la transition écologique actuelle ?",
    options: {
      A: "Le manque d'innovations technologiques",
      B: "Le décalage entre discours vertueux et investissements réels",
      C: "Le rejet unanime de la population",
      D: "L'absence de régulation étatique",
    },
    correctAnswer: "B",
    frenchTranscript: "On assiste à un véritable paradoxe : jamais les déclarations d'intention en faveur du climat n'ont été aussi lyriques, et pourtant, les capitaux effectivement alloués aux infrastructures décarbonées peinent à dépasser le seuil symbolique des budgets prévisionnels.",
    englishTranslation: "We are witnessing a true paradox: never have statements of intention in favor of the climate been so lyrical, and yet, the capital actually allocated to decarbonized infrastructure struggles to exceed the symbolic threshold of planned budgets.",
    keySentence: "jamais les déclarations d'intention... et pourtant, les capitaux alloués peinent à dépasser le seuil",
    trapAlert: "Ne pas confondre intention proclamée et budget débloqué sur le terrain.",
    explanation: "Le contraste mis en exergue entre 'déclarations d'intention' et 'capitaux alloués' dénonce directement le décalage.",
    category: "medias",
  },
  {
    id: "q6",
    questionNumber: 6,
    level: "C1",
    prompt: "Que suggère le sociologue quant à la prolifération des algorithmes de recommandation ?",
    options: {
      A: "Ils favorisent l'éclectisme culturel sans précédent",
      B: "Ils enferment insidieusement les usagers dans une circularité cognitive",
      C: "Ils réduisent considérablement le temps passé devant les écrans",
      D: "Ils garantissent une neutralité axiologique absolue",
    },
    correctAnswer: "B",
    frenchTranscript: "Loin d'élargir le spectre des curiosités intellectuelles, ces mécanismes prédictifs tendent à conforter l'individu dans ses prédispositions antérieures, forgeant une forme d'illusion d'omniscience qui n'est en réalité qu'une redondance auto-justificatrice.",
    englishTranslation: "Far from broadening the spectrum of intellectual curiosities, these predictive mechanisms tend to reinforce the individual in their prior predispositions, forging a form of illusion of omniscience which is actually nothing more than self-justifying redundancy.",
    keySentence: "conforter l'individu dans ses prédispositions antérieures... redondance auto-justificatrice",
    trapAlert: "L'option A est l'antithèse exacte du propos exprimé par le locuteur ('Loin d'élargir...').",
    explanation: "'Conforter dans ses prédispositions antérieures' et 'redondance auto-justificatrice' équivalent à la circularité cognitive (bulle de filtre).",
    category: "academique",
  },
  {
    id: "q7",
    questionNumber: 7,
    level: "C2",
    prompt: "Quel sentiment sous-jacent transparaît dans l'analyse de l'éditorialiste ?",
    options: {
      A: "Un scepticisme désabusé mâtiné d'ironie mordante",
      B: "Un triomphalisme enthousiaste",
      C: "Une détresse panique face au chaos",
      D: "Une neutralité désintéressée",
    },
    correctAnswer: "A",
    frenchTranscript: "Il fallait assurément toute l'ingénuité feinte de nos technocrates pour ériger ce rafistolage législatif en panacée universelle, croyant benoîtement qu'un décret suffirait à juguler les soubresauts d'un marché en déliquescence.",
    englishTranslation: "It certainly took all the feigned ingenuity of our technocrats to hold up this legislative patchwork as a universal panacea, blissfully believing that a decree would suffice to curb the upheavals of a disintegrating market.",
    keySentence: "toute l'ingénuité feinte de nos technocrates pour ériger ce rafistolage législatif en panacée",
    trapAlert: "L'emploi des termes 'ingénuité feinte', 'rafistolage' et 'benoîtement' traduit un sarcasme intellectualisé.",
    explanation: "L'ironie mordante est explicitée par le vocabulaire dépréciatif ('rafistolage', 'croyant benoîtement') appliquée aux autorités.",
    category: "academique",
  },
];

// Generate 40 practice tests structured identically to the real exam
export function generateListeningTests(): TCFListeningTest[] {
  const tests: TCFListeningTest[] = [];

  for (let i = 1; i <= 40; i++) {
    // Generate questions replicating 39 items
    const testQuestions: TCFQuestion[] = [];
    const baseQuestions = SAMPLE_QUESTIONS_POOL;

    for (let q = 1; q <= 39; q++) {
      const template = baseQuestions[(q - 1) % baseQuestions.length];
      let level: CefrLevel = "A1";
      if (q > 8 && q <= 16) level = "A2";
      else if (q > 16 && q <= 24) level = "B1";
      else if (q > 24 && q <= 31) level = "B2";
      else if (q > 31 && q <= 36) level = "C1";
      else if (q > 36) level = "C2";

      testQuestions.push({
        ...template,
        id: `t${i}_q${q}`,
        questionNumber: q,
        level,
      });
    }

    tests.push({
      id: `listening-test-${i}`,
      testNumber: i,
      title: `Test d'Écoute #${i}`,
      durationMinutes: 35,
      totalQuestions: 39,
      questions: testQuestions,
    });
  }

  return tests;
}

export const LISTENING_TESTS = generateListeningTests();
