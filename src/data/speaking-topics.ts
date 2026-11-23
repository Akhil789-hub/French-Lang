export interface TCFSpeakingTopic {
  id: string;
  taskNumber: 1 | 2 | 3;
  title: string;
  prepTimeSeconds: number;
  speakingTimeSeconds: number;
  prompt: string;
  examinerRole?: string;
  candidateRole?: string;
  suggestedQuestionsOrPoints: string[];
  modelAudioTranscript: string;
}

export const SPEAKING_TOPICS: TCFSpeakingTopic[] = [
  {
    id: "sp-t1-1",
    taskNumber: 1,
    title: "Entretien dirigé : Présentation personnelle et projet d'immigration",
    prepTimeSeconds: 0,
    speakingTimeSeconds: 120, // 2 minutes
    prompt: "Parlez de vous, de vos études ou de votre profession actuelle, de vos centres d'intérêt et des raisons qui motivent votre projet d'installation au Canada.",
    suggestedQuestionsOrPoints: [
      "Quel est votre parcours professionnel principal ?",
      "Quelles sont vos passions en dehors du travail ?",
      "Pourquoi avez-vous choisi le Canada pour votre avenir ?",
    ],
    modelAudioTranscript: "Bonjour, je m'appelle Julien. Je suis diplômé en génie logiciel et j'exerce comme chef de projet technique depuis maintenant six ans. En parallèle, je suis un grand passionné de randonnée en plein air et de photographie de paysages naturels. Mon projet d'immigration au Canada s'inscrit dans une double volonté : d'une part, apporter mon expertise dans un écosystème technologique dynamique comme celui de Montréal ou de Toronto, et d'autre part, offrir à ma famille un cadre de vie sécurisant, multiculturel et en harmonie avec les grands espaces canadiens.",
  },
  {
    id: "sp-t2-1",
    taskNumber: 2,
    title: "Exercice en interaction : Inscription à un cours de perfectionnement linguistique",
    prepTimeSeconds: 120, // 2 minutes prep
    speakingTimeSeconds: 210, // 3 min 30 sec interaction
    examinerRole: "Responsable des admissions d'un institut de langues",
    candidateRole: "Candidat souhaitant s'inscrire à une session intensive",
    prompt: "Vous avez vu une annonce pour des cours de français des affaires. Vous téléphonez au responsable de l'institut pour obtenir des renseignements détaillés (tarifs, horaires, tests de niveau, prise en charge). Vous posez au moins une dizaine de questions variées.",
    suggestedQuestionsOrPoints: [
      "Quelles sont les dates de la prochaine session intensive ?",
      "Existe-t-il un test de positionnement préalable ?",
      "Quel est l'effectif maximal par groupe ?",
      "Des facilités de paiement sont-elles proposées ?",
    ],
    modelAudioTranscript: "— Bonjour monsieur, je vous contacte suite à votre annonce parue dans la revue économique concernant votre programme de français des affaires.\n— Pourriez-vous tout d'abord me préciser la date de lancement de la prochaine cohorte intensive ?\n— Très bien, et quel est le volume horaire hebdomadaire prévu ? Les cours ont-ils lieu en présentiel ou proposez-vous une formule hybride ?\n— Organisez-vous une évaluation diagnostique préalable pour déterminer notre niveau initial ?\n— Par ailleurs, quel est le montant des frais d'inscription et ces formations sont-elles éligibles au compte personnel de formation ?\n— Enfin, délivrez-vous une attestation officielle de compétences à l'issue du cursus ? Je vous remercie pour ces précisions.",
  },
  {
    id: "sp-t3-1",
    taskNumber: 3,
    title: "Expression d'un point de vue : Les études universitaires sont-elles encore indispensables ?",
    prepTimeSeconds: 0,
    speakingTimeSeconds: 270, // 4 min 30 sec
    prompt: "Certains affirment qu'avec l'essor des formations en ligne et de l'auto-apprentissage, le diplôme universitaire traditionnel a perdu de sa pertinence. D'autres soutiennent au contraire que l'université demeure le socle irremplaçable de la réussite sociale et de la pensée critique. Qu'en pensez-vous ? Développez votre argumentation avec des exemples concrets.",
    suggestedQuestionsOrPoints: [
      "Introduction : poser le problème et la problématique sociétale",
      "Partie 1 : la démocratisation des compétences via les parcours alternatifs",
      "Partie 2 : la valeur pérenne de la formation académique universitaire",
      "Synthèse et prise de position personnelle argumentée",
    ],
    modelAudioTranscript: "La question de la pertinence des études supérieures à l'ère numérique suscite de vives controverses contemporaines. D'un côté, il est indéniable que la prolifération des plateformes de formation en libre accès et des certifications professionnelles accélérées offre une flexibilité sans précédent, permettant à de nombreux autodidactes d'intégrer rapidement le marché du travail, notamment dans le secteur technologique. Néanmoins, il me paraît essentiel de rappeler que l'université ne se réduit pas à une simple courroie de transmission technique. Elle constitue avant tout un lieu d'émulation intellectuelle, où s'acquièrent la rigueur méthodologique, l'esprit critique et la capacité à appréhender la complexité du monde. En conclusion, si les filières courtes et l'autoformation sont des compléments précieux, l'institution universitaire demeure à mes yeux le pilier fondamental de la cohésion républicaine et de la recherche scientifique fondamentale.",
  },
];
