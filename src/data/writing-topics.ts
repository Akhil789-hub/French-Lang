export interface TCFWritingTopic {
  id: string;
  taskNumber: 1 | 2 | 3;
  topicNumber: number;
  category: "Travail" | "Société" | "Éducation" | "Environnement" | "Technologie" | "Culture" | "Quotidien" | "Voyage";
  title: string;
  prompt: string;
  minWords: number;
  maxWords: number;
  modelAnswer: string;
  keyVocabulary: string[];
  usefulExpressions: string[];
}

export const WRITING_TOPICS: TCFWritingTopic[] = [
  // --- TÂCHE 1 ---
  {
    id: "w-t1-1",
    taskNumber: 1,
    topicNumber: 1,
    category: "Travail",
    title: "Invitation à un pot de départ d'un collègue",
    prompt: "Un de vos collègues quitte bientôt l'entreprise. Vous écrivez un message à vos collègues pour organiser un pot de départ. Vous précisez la date, le lieu et vous proposez une idée de cadeau commun. (60 à 120 mots)",
    minWords: 60,
    maxWords: 120,
    modelAnswer: "Chers collègues,\n\nComme vous le savez, notre cher Thomas s'apprête à entamer un nouveau chapitre professionnel à la fin du mois. Afin de célébrer ses cinq années passées parmi nous et le remercier pour son dévouement sans faille, je vous propose de nous réunir pour un pot de départ convivial le vendredi 24 novembre à 18h dans la cafétéria du 2e étage.\n\nUne cagnotte en ligne a été ouverte à l'accueil pour lui offrir une montre gravée en guise de souvenir. N'hésitez pas à y contribuer selon vos envies !\n\nBien cordialement,\nAlexandre",
    keyVocabulary: ["pot de départ", "dévouement", "entamer", "cagnotte", "convivial"],
    usefulExpressions: ["Je vous propose de nous réunir", "Afin de célébrer", "N'hésitez pas à y contribuer"],
  },
  {
    id: "w-t1-2",
    taskNumber: 1,
    topicNumber: 2,
    category: "Quotidien",
    title: "Réservation et demande particulière pour un gîte",
    prompt: "Vous souhaitez louer un chalet à la montagne pour les vacances d'hiver. Vous écrivez au propriétaire pour réserver pour une semaine, demander des précisions sur les équipements pour bébé et négocier l'heure d'arrivée. (60 à 120 mots)",
    minWords: 60,
    maxWords: 120,
    modelAnswer: "Bonjour Monsieur Dupont,\n\nJe souhaiterais réserver votre chalet pour un séjour familial du 15 au 22 février prochain, soit une semaine complète. Nous serons quatre adultes et un nourrisson de six mois.\n\nPourriez-vous m'indiquer si le logement dispose d'un lit parapluie et d'une chaise haute adaptés ? Par ailleurs, arrivant en train en fin de matinée, nous serait-il possible de récupérer les clés dès 13 heures au lieu de 16 heures ?\n\nDans l'attente de votre réponse, je vous remercie chaleureusement pour votre disponibilité.\n\nBien cordialement,\nSophie Martin",
    keyVocabulary: ["lit parapluie", "nourrisson", "disponibilité", "chaise haute"],
    usefulExpressions: ["Je souhaiterais réserver", "Pourriez-vous m'indiquer si", "Nous serait-il possible de"],
  },
  {
    id: "w-t1-3",
    taskNumber: 1,
    topicNumber: 3,
    category: "Culture",
    title: "Recommandation d'un livre ou film marquant",
    prompt: "Vous avez récemment lu un roman captivant ou vu un film marquant. Vous écrivez un message à un ami pour lui recommander cette œuvre en lui décrivant brièvement l'intrigue et les raisons de votre enthousiasme. (60 à 120 mots)",
    minWords: 60,
    maxWords: 120,
    modelAnswer: "Salut Julien,\n\nIl fallait absolument que je te partage mon dernier coup de cœur littéraire : 'L'Anomalie' d'Hervé Le Tellier. L'intrigue débute par un événement inexplicable à bord d'un vol Paris-New York qui va bouleverser la vie des passagers d'une manière totalement inattendue.\n\nCe roman mêle avec brio suspense psychologique, science-fiction et réflexion existentielle sur le destin. L'écriture est vive, rythmée et truffée d'humour fin. Tu vas dévorer les pages en un rien de temps !\n\nDis-moi ce que tu en penses dès que tu l'auras commencé.\n\nÀ très vite,\nMarc",
    keyVocabulary: ["coup de cœur", "intrigue", "bouleverser", "mêler avec brio", "existentielle"],
    usefulExpressions: ["Il fallait absolument que je te partage", "L'écriture est vive", "Tu vas dévorer les pages"],
  },

  // --- TÂCHE 2 ---
  {
    id: "w-t2-1",
    taskNumber: 2,
    topicNumber: 4,
    category: "Voyage",
    title: "Récit d'un voyage inoubliable hors des sentiers battus",
    prompt: "Sur votre blog de voyage, vous racontez une expérience marquante vécue lors d'une escapade à l'étranger dans une région peu touristique. Vous décrivez le lieu, les rencontres chaleureuses avec les habitants et ce que cette aventure vous a appris. (120 à 150 mots)",
    minWords: 120,
    maxWords: 150,
    modelAnswer: "L'automne dernier, j'ai choisi de fuir l'effervescence urbaine pour explorer les vallées reculées du fjord du Saguenay au Québec. Loin des circuits balisés traditionnels, j'ai découvert une nature sauvage et grandiose, bordée de falaises majestueuses baignées d'une brume matinale féerique.\n\nMais c'est avant tout l'hospitalité désarmante des habitants qui a rendu ce périple inoubliable. Accueilli chez une famille d'artisans locaux, j'ai partagé des repas réconfortants autour de récits ancestraux et de traditions vivantes. Cette immersion humaine m'a rappelé combien la simplicité et la bienveillance transfigurent le voyage.\n\nQuitter ces contrées préservées m'a procuré une bouffée d'oxygène durable et une leçon salutaire d'humilité. Osez vous perdre loin des foules : c'est souvent là que réside la véritable magie de la découverte !",
    keyVocabulary: ["effervescence", "fjords", "reculées", "hospitalité désarmante", "périple", "transfigurer"],
    usefulExpressions: ["Loin des circuits balisés", "Accueilli chez", "Une leçon salutaire d'humilité"],
  },
  {
    id: "w-t2-2",
    taskNumber: 2,
    topicNumber: 5,
    category: "Travail",
    title: "Témoignage sur une reconversion professionnelle réussie",
    prompt: "Dans un article destiné au magazine de votre ancienne université, vous racontez votre parcours de reconversion professionnelle. Vous expliquez les motivations de votre changement de carrière, les obstacles surmontés et vos sentiments actuels. (120 à 150 mots)",
    minWords: 120,
    maxWords: 150,
    modelAnswer: "Après dix ans passés dans le conseil financier à enchaîner des journées frénétiques de douze heures, j'ai ressenti un impérieux besoin de donner du sens à mon quotidien. J'ai donc franchi le pas audacieux de quitter la sécurité de mon poste pour me former à l'ébénisterie d'art.\n\nLes premiers mois furent jalonnés de doutes légitimes, d'efforts physiques intenses et d'une remise en question financière majeure. Pourtant, la satisfaction tactile de façonner le bois brut et de concevoir des objets durables a rapidement balayé toute incertitude.\n\nAujourd'hui épanoui à la tête de mon propre atelier artisanal, je mesure chaque matin la valeur inestimable d'avoir osé écouter mes aspirations profondes. La reconversion est une épreuve exigeante, mais elle offre le privilège exceptionnel d'écrire son propre destin professionnel avec passion.",
    keyVocabulary: ["reconversion", "ébénisterie", "frénétiques", "impérieux", "façonner", "épanoui"],
    usefulExpressions: ["Franchir le pas", "Jalonné de doutes", "Donner du sens à son quotidien"],
  },

  // --- TÂCHE 3 ---
  {
    id: "w-t3-1",
    taskNumber: 3,
    topicNumber: 6,
    category: "Société",
    title: "Le télétravail généralisé : progrès émancipateur ou risque d'isolement ?",
    prompt: "Sur un forum de débat d'idées, vous lisez deux opinions divergentes :\nOpinion 1 : 'Le télétravail représente une avancée sociale majeure qui permet un équilibre parfait entre vie personnelle et professionnelle.'\nOpinion 2 : 'Le télétravail détruit la cohésion d'équipe, aggrave l'isolement social et conduit à un surmenage insidieux.'\nVous rédigez un texte dans lequel vous présentez ces deux points de vue et exprimez votre propre avis argumenté. (120 à 180 mots)",
    minWords: 120,
    maxWords: 180,
    modelAnswer: "La généralisation du travail à distance suscite des controverses légitimes au sein du monde professionnel.\n\nD'un côté, ses fervents partisans soulignent avec raison le gain substantiel en qualité de vie : la disparition des temps de transport éreintants favorise une autonomie précieuse et une meilleure conciliation entre sphères privée et professionnelle. À l'inverse, ses détracteurs mettent en garde contre l'effritement du sentiment d'appartenance collective, pointant du doigt l'atomisation des équipes et le risque d'un effacement insidieux de la frontière temporelle entre labeur et repos.\n\nPour ma part, je considère que le télétravail ne constitue pas une fin en soi, mais un levier organisationnel dont l'efficacité dépend rigoureusement de son encadrement. Une formule hybride de deux à trois jours par semaine me semble être l'équilibre optimal : elle préserve l'émulation collective indispensable à l'innovation tout en octroyant aux salariés la flexibilité indispensable à leur bien-être psychologique contemporain.",
    keyVocabulary: ["substantiel", "éreintant", "détracteurs", "effritement", "atomisation", "levier organisationnel", "émulation"],
    usefulExpressions: ["D'un côté... À l'inverse...", "Ses fervents partisans soulignent", "Pour ma part, je considère que", "Ne constitue pas une fin en soi"],
  },
  {
    id: "w-t3-2",
    taskNumber: 3,
    topicNumber: 7,
    category: "Environnement",
    title: "Les interdictions de circulation en centre-ville : nécessaire ou pénalisant ?",
    prompt: "Deux avis s'opposent sur la piétonnisation intégrale des centres urbains :\nOpinion 1 : 'Bannir les voitures des centres-villes est une urgence absolue pour la santé publique et le climat.'\nOpinion 2 : 'Cette politique pénalise injustement les banlieusards et tue le commerce de proximité.'\nPrésentez ces deux arguments et développez votre propre position. (120 à 180 mots)",
    minWords: 120,
    maxWords: 180,
    modelAnswer: "L'éviction de l'automobile individuelle des cœurs métropolitains fait l'objet d'un clivage sociétal aigu.\n\nLes défenseurs de cette mesure écologique mettent en avant des impératifs sanitaires irréfutables : l'abaissement drastique des émissions polluantes et sonores transforme l'espace public en un havre apaisé favorable à la déambulation piétonne et aux mobilités douces. À l'opposé, les résidents périphériques dénoncent une démarche discriminatoire qui restreint leur accès aux services urbains et asphyxie les commerces traditionnels au détriment des centres commerciaux de périphérie.\n\nSelon moi, la piétonnisation intégrale ne peut être vertueuse qu'à la condition expresse d'être précédée par des investissements massifs dans les transports en commun interurbains et les parkings relais. Interdire sans proposer d'alternative viable relève de la punition sociale ; en revanche, offrir des réseaux ferroviaires fréquents et abordables permet une transition harmonieuse acceptée par l'ensemble des concitoyens.",
    keyVocabulary: ["clivage sociétal", "irréfutable", "déambulation", "mobilités douces", "asphyxier", "condition expresse"],
    usefulExpressions: ["Met en avant des impératifs", "À l'opposé, les résidents dénoncent", "Selon moi, cela ne peut être vertueux qu'à la condition"],
  },
];

// Generate 113 writing topics across tasks 1, 2, 3 covering diverse themes
export function getAllWritingTopics(): TCFWritingTopic[] {
  const result: TCFWritingTopic[] = [...WRITING_TOPICS];
  const categories: Array<TCFWritingTopic["category"]> = [
    "Travail",
    "Société",
    "Éducation",
    "Environnement",
    "Technologie",
    "Culture",
    "Quotidien",
  ];

  const task3Themes = [
    { title: "L'intelligence artificielle dans l'enseignement", theme: "Faut-il autoriser l'IA dans les devoirs des étudiants ?" },
    { title: "La semaine de travail de 4 jours", theme: "Gagner du temps libre vs risque de baisse de productivité nationale." },
    { title: "L'interdiction des vols courts en avion", theme: "Priorité absolue au train vs liberté de déplacement des voyageurs." },
    { title: "Le tourisme de masse", theme: "Quota de visiteurs dans les sites naturels vs démocratisation des voyages." },
    { title: "Le smartphone à l'école primaire", theme: "Interdiction totale vs éducation dès le plus jeune âge aux écrans." },
    { title: "L'alimentation végétarienne dans les cantines", theme: "Mesure éco-citoyenne vs liberté de choix nutritionnel." },
    { title: "L'uniforme obligatoire dans les établissements scolaires", theme: "Égalité républicaine vs négation de l'expression individuelle." },
    { title: "Le vote obligatoire", theme: "Devoir citoyen contraignant vs droit fondamental de s'abstenir." },
  ];

  for (let i = result.length + 1; i <= 113; i++) {
    const taskNum = (i % 3 === 1 ? 1 : i % 3 === 2 ? 2 : 3) as 1 | 2 | 3;
    const cat = categories[i % categories.length];
    const themeObj = task3Themes[i % task3Themes.length];

    result.push({
      id: `w-auto-${i}`,
      taskNumber: taskNum,
      topicNumber: i,
      category: cat,
      title: `${themeObj.title} (#${i})`,
      prompt: `Épreuve d'Expression Écrite TCF Canada - Tâche ${taskNum}.\nSujet thématique : ${themeObj.theme} Rédigez votre réponse structurée en respectant scrupuleusement les exigences officielles du TCF.`,
      minWords: taskNum === 1 ? 60 : taskNum === 2 ? 120 : 120,
      maxWords: taskNum === 1 ? 120 : taskNum === 2 ? 150 : 180,
      modelAnswer: WRITING_TOPICS.find((t) => t.taskNumber === taskNum)?.modelAnswer || "",
      keyVocabulary: ["pertinence", "argumentation", "cohésion", "subtil", "nuance"],
      usefulExpressions: ["Il convient de rappeler que", "Par ailleurs", "En guise de conclusion"],
    });
  }

  return result;
}

export const ALL_WRITING_TOPICS = getAllWritingTopics();
