export interface SpeakingSituation {
  id: string;
  task_number: number;
  title: string;
  category: string;
  prep_time_seconds: number;
  speaking_time_seconds: number;
  prompt: string;
  candidate_role: string | null;
  examiner_role: string | null;
  suggested_points: string[];
  model_audio_transcript: string;
}

export const SPEAKING_SITUATIONS: SpeakingSituation[] = [
  // --- TÂCHE 1 : ENTRETIEN DIRIGÉ (2 min) ---
  {
    id: "sp-t1-1",
    task_number: 1,
    title: "Entretien dirigé : Présentation personnelle et projet d'immigration",
    category: "Immigration",
    prep_time_seconds: 0,
    speaking_time_seconds: 120,
    prompt:
      "Parlez de vous, de vos études ou de votre profession actuelle, de vos centres d'intérêt et des raisons qui motivent votre projet d'installation au Canada.",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Quel est votre parcours académique et professionnel principal ?",
      "Quelles sont vos passions et loisirs en dehors du travail ?",
      "Pourquoi avez-vous choisi le Canada et en particulier les provinces francophones ?",
      "Comment envisagez-vous votre intégration socio-professionnelle sur place ?",
    ],
    model_audio_transcript:
      "Bonjour, je m'appelle Julien. Je suis diplômé en génie logiciel et j'exerce comme chef de projet technique depuis maintenant six ans. En parallèle, je suis un grand passionné de randonnée en plein air et de photographie de paysages naturels. Mon projet d'immigration au Canada s'inscrit dans une double volonté : d'une part, apporter mon expertise dans un écosystème technologique dynamique comme celui de Montréal ou de Toronto, et d'autre part, offrir à ma famille un cadre de vie sécurisant, multiculturel et en harmonie avec les grands espaces canadiens.",
  },

  // --- TÂCHE 2 : INTERACTION / POSE DE QUESTIONS (15 SITUATIONS) ---
  {
    id: "sp-t2-1",
    task_number: 2,
    title: "Inscription à un cours de perfectionnement linguistique",
    category: "Éducation",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous avez vu une annonce pour des cours de français des affaires. Vous téléphonez au responsable de l'institut pour obtenir des renseignements détaillés (tarifs, horaires, tests de niveau, prise en charge). Vous posez au moins une dizaine de questions variées.",
    candidate_role: "Candidat souhaitant s'inscrire à une session intensive",
    examiner_role: "Responsable des admissions d'un institut de langues",
    suggested_points: [
      "Quelles sont les dates de début et la durée de la prochaine session ?",
      "Existe-t-il un test d'évaluation de niveau préalable à l'inscription ?",
      "Quel est le nombre maximum d'apprenants par groupe ?",
      "Les cours se déroulent-ils en présentiel, en ligne ou en format hybride ?",
      "Quels sont les tarifs et proposez-vous des facilités de paiement échelonné ?",
      "Une attestation officielle certifiée est-elle délivrée à la fin du cursus ?",
    ],
    model_audio_transcript:
      "— Bonjour monsieur, je vous contacte suite à votre annonce parue dans la revue économique concernant votre programme de français des affaires.\n— Pourriez-vous tout d'abord me préciser la date de lancement de la prochaine cohorte intensive ?\n— Très bien, et quel est le volume horaire hebdomadaire prévu ? Les cours ont-ils lieu en présentiel ou proposez-vous une formule hybride ?\n— Organisez-vous une évaluation diagnostique préalable pour déterminer notre niveau initial ?\n— Par ailleurs, quel est le montant des frais d'inscription et ces formations sont-elles éligibles au compte personnel de formation ?\n— Enfin, délivrez-vous une attestation officielle de compétences à l'issue du cursus ? Je vous remercie pour ces précisions.",
  },
  {
    id: "sp-t2-2",
    task_number: 2,
    title: "Location d'un appartement meublé au centre-ville",
    category: "Logement",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous cherchez un logement et vous voyez une annonce pour un deux-pièces meublé. Vous contactez le propriétaire pour poser des questions sur les caractéristiques du bien, les charges incluses, les transports à proximité et les conditions de bail.",
    candidate_role: "Locataire potentiel à la recherche d'un deux-pièces",
    examiner_role: "Propriétaire bailleur de l'appartement",
    suggested_points: [
      "Quelle est la superficie exacte et à quel étage l'appartement est-il situé ?",
      "L'immeuble dispose-t-il d'un ascenseur et d'un local à vélos ?",
      "Quels équipements électroménagers sont compris dans la cuisine meublée ?",
      "Le montant du loyer mensuel inclut-il le chauffage, l'eau et l'accès à internet ?",
      "Quelle est la station de métro la plus proche et à quelle distance se trouve-t-elle ?",
      "Quel est le montant du dépôt de garantie et quelle est la durée minimale du bail ?",
      "Est-il possible de convenir d'une visite sur place dès cette fin de semaine ?",
    ],
    model_audio_transcript:
      "— Bonjour madame, je vous appelle au sujet de l'appartement de deux pièces que vous louez en centre-ville.\n— Pourriez-vous m'indiquer la surface totale exacte du logement et à quel étage il se trouve ?\n— Y a-t-il un ascenseur dans l'immeuble ?\n— Concernant les meubles et l'équipement, la cuisine est-elle pourvue d'un lave-vaisselle et d'un lave-linge ?\n— Le loyer affiché comprend-il les charges de copropriété, ainsi que l'eau et le chauffage collectif ?\n— Quelles sont les lignes de transports en commun les plus proches pour rejoindre le centre rapidement ?\n— Enfin, quel est le montant de la caution demandée et seriez-vous disponible pour une visite demain après-midi ?",
  },
  {
    id: "sp-t2-3",
    task_number: 2,
    title: "Adhésion à une salle de sport & centre de remise en forme",
    category: "Sport & Santé",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous souhaitez vous remettre en forme. Vous vous rendez à l'accueil d'un club de sport pour demander des informations complètes sur les équipements, les cours collectifs, le coaching personnalisé et les formules d'abonnement.",
    candidate_role: "Nouveau client désireux de s'inscrire",
    examiner_role: "Conseiller d'accueil de la salle de sport",
    suggested_points: [
      "Quelles sont les plages d'ouverture du club en semaine et le week-end ?",
      "Quels types de cours collectifs proposez-vous au quotidien (yoga, spinning, pilates) ?",
      "Faut-il réserver sa place à l'avance pour assister aux cours collectifs ?",
      "Proposez-vous un bilan de santé et un programme d'entraînement personnalisé avec un coach ?",
      "La salle dispose-t-elle d'un espace aquatique ou d'un sauna/hammam ?",
      "Quelles sont vos formules d'abonnement : au mois, à l'année ou sans engagement ?",
      "Est-il envisageable d'effectuer une séance d'essai gratuite avant de s'engager ?",
    ],
    model_audio_transcript:
      "— Bonjour, je souhaite reprendre une activité sportive régulière et j'aimerais avoir quelques renseignements sur vos prestations.\n— Tout d'abord, quels sont vos horaires d'ouverture le matin et en soirée ?\n— Quels cours collectifs sont programmés chaque semaine et sont-ils accessibles à tous les niveaux ?\n— Faut-il s'inscrire au préalable via une application mobile pour chaque séance ?\n— Proposez-vous les services d'un entraîneur personnel pour établir un programme adapté ?\n— Vos vestiaires sont-ils équipés d'un sauna ou d'un espace détente ?\n— Enfin, quel est le tarif d'un abonnement mensuel sans engagement et offrez-vous une séance d'essai découverte ?",
  },
  {
    id: "sp-t2-4",
    task_number: 2,
    title: "Renseignements sur un circuit touristique organisé au Québec",
    category: "Voyage",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous prévoyez un voyage au Québec pour découvrir la région des Laurentides et le parc de la Mauricie. Vous téléphonez à une agence de voyages spécialisée pour vous renseigner sur l'itinéraire, les hébergements, le transport et les activités d'hiver.",
    candidate_role: "Voyageur préparant un séjour au Canada",
    examiner_role: "Agent de voyages expert des séjours au Canada",
    suggested_points: [
      "Quelle est la durée globale du circuit et quelles villes sont visitées ?",
      "Le transport intérieur s'effectue-t-il en autocar climatisé ou en train ?",
      "Quel est le standard des hôtels retenus pour l'hébergement ?",
      "Quelles activités de plein air sont incluses (motoneige, traîneau à chiens, raquettes) ?",
      "Les repas sont-ils en pension complète ou en demi-pension ?",
      "Faut-il souscrire une assurance voyage complémentaire spécifique ?",
      "Y a-t-il un guide francophone qui accompagne le groupe pendant toute la durée du séjour ?",
    ],
    model_audio_transcript:
      "— Bonjour, je prépare un voyage au Québec pour l'hiver prochain et j'ai repéré votre circuit dans les Laurentides.\n— Pourriez-vous me détailler le parcours prévu et les étapes principales ?\n— Quel est le mode de transport privilégié entre les différentes étapes ?\n— Quelles activités typiquement hivernales, comme le traîneau à chiens ou la pêche sur glace, sont comprises dans le forfait ?\n— Les repas sont-ils inclus dans le tarif global ou doit-on prévoir un budget supplémentaire ?\n— Quel est le nombre maximum de participants par groupe d'excursion ?\n— Enfin, quelles sont les modalités d'annulation en cas d'imprévu météorologique ?",
  },
  {
    id: "sp-t2-5",
    task_number: 2,
    title: "Inscription à un atelier de cuisine gastronomique",
    category: "Loisirs",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous avez lu une brochure annonçant l'ouverture d'ateliers culinaires animés par un chef réputé. Vous appelez l'école de cuisine pour poser des questions sur les thèmes abordés, le matériel fourni, le coût et la dégustation des plats.",
    candidate_role: "Amateur de cuisine intéressé par un atelier thématique",
    examiner_role: "Responsable des inscriptions de l'école de cuisine",
    suggested_points: [
      "Quels thèmes culinaires proposez-vous ce trimestre (pâtisserie, cuisine du terroir, végétarienne) ?",
      "Quelle est la durée habituelle d'un atelier et à quelle heure commence-t-il ?",
      "Le matériel de cuisine et les ingrédients frais sont-ils entièrement fournis ?",
      "Les participants dégustent-ils les créations sur place ou emportent-ils leurs plats chez eux ?",
      "Quel est l'effectif maximal d'élèves par poste de travail ?",
      "Le cours est-il adapté aux personnes débutantes qui n'ont pas d'expérience préalable ?",
      "Existe-t-il des cartes cadeaux ou des formules forfaitaires pour plusieurs séances ?",
    ],
    model_audio_transcript:
      "— Bonjour, j'ai découvert votre brochure pour les ateliers de cuisine et je souhaiterais obtenir quelques précisions.\n— Quels sont les thèmes proposés pour les cours du samedi matin ?\n— Combien de temps dure une séance en moyenne ?\n— Fournissez-vous l'ensemble des ustensiles, des tabliers et des ingrédients frais ?\n— Les participants ont-ils l'opportunité de partager et déguster les plats cuisinés sur place avec le chef ?\n— Quel est le nombre de personnes par plan de travail pour garantir un bon apprentissage ?\n— Enfin, proposez-vous des tarifs dégressifs si l'on s'inscrit à un cycle de plusieurs séances ?",
  },
  {
    id: "sp-t2-6",
    task_number: 2,
    title: "Achat d'une automobile d'occasion auprès d'un particulier",
    category: "Transports",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous avez vu une annonce pour une voiture d'occasion récente. Vous téléphonez au vendeur pour vérifier l'état général du véhicule, son historique d'entretien, son kilométrage, et convenir d'un rendez-vous pour un essai routier.",
    candidate_role: "Acheteur potentiel recherchant une citadine fiable",
    examiner_role: "Vendeur particulier de la voiture",
    suggested_points: [
      "De quelle année date le véhicule et quel est son kilométrage exact au compteur ?",
      "Avez-vous le carnet d'entretien à jour avec toutes les factures de révision ?",
      "La voiture a-t-elle déjà subi un accident ou des réparations majeures de carrosserie ?",
      "Le contrôle technique a-t-il été validé récemment, il y a moins de six mois ?",
      "Quel est l'état d'usure des pneumatiques et des freins ?",
      "Le véhicule est-il vendu avec un jeu de pneus d'hiver supplémentaires ?",
      "Le prix affiché est-il négociable et pouvons-nous convenir d'un essai routier ce samedi ?",
    ],
    model_audio_transcript:
      "— Bonjour monsieur, je vous contacte concernant votre annonce de vente pour la Peugeot 208.\n— Pourriez-vous me confirmer son année de première mise en circulation et son kilométrage actuel ?\n— Possédez-vous l'historique complet des révisions et le carnet d'entretien tamponné par un garage certifié ?\n— Le dernier contrôle technique date-t-il de moins de six mois et mentionne-t-il des défaillances mineures ?\n— La voiture a-t-elle déjà été accidentée ou a-t-elle connu des pannes mécaniques significatives ?\n— Les pneus actuels sont-ils en bon état ou devront-ils être changés prochainement ?\n— Enfin, seriez-vous ouvert à une légère négociation et quand serions-nous en mesure de faire un essai ?",
  },
  {
    id: "sp-t2-7",
    task_number: 2,
    title: "Candidature comme bénévole dans une ONG écologique",
    category: "Écologie",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous souhaitez consacrer du temps libre à la protection de l'environnement. Vous contactez la coordinatrice d'une association locale pour vous renseigner sur les missions bénévoles, le temps d'engagement requis et les actions menées sur le terrain.",
    candidate_role: "Citoyen engagé souhaitant devenir bénévole",
    examiner_role: "Coordinatrice des projets d'une association environnementale",
    suggested_points: [
      "Quelles sont les principales actions menées par votre association (nettoyage, sensibilisation, plantation) ?",
      "Combien d'heures par semaine ou par mois demandez-vous à vos membres bénévoles ?",
      "Proposez-vous une formation initiale pour les nouveaux arrivants ?",
      "Est-il obligatoire d'avoir des compétences spécifiques en écologie ou en animation ?",
      "Les actions ont-elles lieu principalement en semaine ou le samedi ?",
      "Comment se déroule le processus d'intégration d'un nouveau volontaire ?",
      "Prévoyez-vous une réunion d'accueil ou d'information dans les prochains jours ?",
    ],
    model_audio_transcript:
      "— Bonjour, je m'intéresse beaucoup aux initiatives environnementales de votre association et je souhaiterais m'engager comme bénévole.\n— Quelles sont les actions prioritaires que vous menez actuellement sur le terrain ?\n— Quel volume horaire hebdomadaire ou mensuel préconisez-vous pour les membres volontaires ?\n— Organisez-vous des sessions d'initiation pour nous former aux protocoles d'intervention ?\n— Faut-il avoir des connaissances particulières en biodiversité ou le bénévolat est-il ouvert à tous ?\n— Les activités se déroulent-elles majoritairement le week-end ou également en soirée ?\n— Pourrais-je assister à votre prochaine réunion générale pour rencontrer l'équipe ?",
  },
  {
    id: "sp-t2-8",
    task_number: 2,
    title: "Location d'un poste dans un espace de travail partagé (coworking)",
    category: "Travail",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Travailleur indépendant, vous cherchez un lieu professionnel pour exercer votre activité. Vous appelez le gestionnaire d'un espace de coworking pour poser des questions sur les tarifs, la connexion internet, les salles de réunion et les services inclus.",
    candidate_role: "Freelance en quête d'un poste de travail flexible",
    examiner_role: "Gestionnaire de communauté d'un espace de coworking",
    suggested_points: [
      "Quelles formules proposez-vous : poste nomade (open space) ou bureau dédié fermé ?",
      "Quel est le débit de la connexion internet fibre et disposez-vous d'une ligne de secours ?",
      "L'accès à l'espace est-il possible 24h/24 et 7j/7 grâce à un badge sécurisé ?",
      "Le forfait inclut-il des crédits d'heures pour réserver des salles de réunion avec écran ?",
      "Les services comme l'impression, le café et la domiciliation d'entreprise sont-ils compris ?",
      "Faut-il payer un dépôt de garantie ou un préavis en cas de résiliation du contrat ?",
      "Est-il possible de venir tester les installations lors d'une journée de découverte offerte ?",
    ],
    model_audio_transcript:
      "— Bonjour, je travaille comme consultant indépendant et j'aimerais obtenir des détails sur vos espaces de travail partagés.\n— Quelles sont les différences de tarifs entre un poste nomade en espace ouvert et un bureau fermé ?\n— Quelle est la vitesse de votre connexion internet et le réseau est-il sécurisé pour le télétravail ?\n— Les adhérents ont-ils accès aux locaux le week-end et en dehors des heures habituelles de bureau ?\n— Combien d'heures de salle de réunion sont allouées mensuellement avec l'abonnement standard ?\n— Les consommables comme les imprimantes et les boissons chaudes sont-ils en libre accès ?\n— Enfin, proposez-vous une journée d'essai gratuite pour tester l'ambiance et le confort sonore ?",
  },
  {
    id: "sp-t2-9",
    task_number: 2,
    title: "Recherche d'une garde d'enfants à domicile (baby-sitting régulier)",
    category: "Famille",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous cherchez une personne de confiance pour garder vos deux enfants après l'école (16h30 - 19h00). Vous téléphonez à une candidate qui a déposé une petite annonce dans un commerce pour vérifier ses compétences, ses disponibilités et ses tarifs.",
    candidate_role: "Parent recherchant une garde d'enfants périscolaire",
    examiner_role: "Étudiante ou professionnelle proposant ses services de garde",
    suggested_points: [
      "Quelle est votre expérience préalable dans la garde d'enfants de cet âge (6 et 8 ans) ?",
      "Avez-vous suivi une formation aux premiers secours (PSC1 ou équivalent) ?",
      "Êtes-vous disponible tous les jours de la semaine de 16h30 à 19h de façon pérenne ?",
      "Pouvez-vous aider les enfants à faire leurs devoirs scolaires et vérifier les leçons ?",
      "Quelles activités d'éveil ou manuelles avez-vous l'habitude de leur proposer à la maison ?",
      "Quel est votre tarif horaire net et pouvez-vous fournir des références d'anciens employeurs ?",
      "Seriez-vous d'accord pour que nous fassions une première rencontre à notre domicile ?",
    ],
    model_audio_transcript:
      "— Bonjour, je vous appelle au sujet de votre annonce de garde d'enfants affichée à la boulangerie.\n— Depuis combien de temps exercez-vous comme garde d'enfants et auprès de quelles tranches d'âge ?\n— Possédez-vous un brevet de secourisme d'urgence valide ?\n— Seriez-vous en mesure d'assurer la sortie d'école à 16h30 quatre jours par semaine sans interruption ?\n— Êtes-vous à l'aise pour encadrer l'aide aux devoirs pour un niveau de primaire ?\n— Quels jeux ou activités calmes aimez-vous organiser avant le retour des parents ?\n— Quel est votre taux horaire et seriez-vous disponible pour une première entrevue ce jeudi ?",
  },
  {
    id: "sp-t2-10",
    task_number: 2,
    title: "Adoption responsable d'un animal de compagnie en refuge",
    category: "Société",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous souhaitez adopter un chien ou un chat dans un refuge animalier. Vous vous entretenez avec le responsable du refuge pour vous renseigner sur les démarches administratives, l'état de santé des animaux, les frais d'adoption et le suivi post-adoption.",
    candidate_role: "Futur adoptant responsable",
    examiner_role: "Responsable des adoptions d'un refuge protecteur des animaux",
    suggested_points: [
      "Quels documents justificatifs (domicile, revenus) faut-il fournir pour constituer le dossier ?",
      "Les animaux proposés à l'adoption sont-ils déjà vaccinés, identifiés par puce et stérilisés ?",
      "Comment évaluez-vous le caractère et la compatibilité de l'animal avec des enfants ou d'autres animaux ?",
      "Quelle est la contribution financière demandée pour couvrir les soins vétérinaires initiaux ?",
      "Une période d'adaptation ou d'essai est-elle prévue pour s'assurer de la bonne cohabitation ?",
      "Effectuez-vous des visites de contrôle au domicile des adoptants après l'accueil ?",
      "Est-il possible de venir promener les chiens le samedi pour faire connaissance ?",
    ],
    model_audio_transcript:
      "— Bonjour, j'envisage d'adopter un compagnon à quatre pattes et je viens m'informer sur vos démarches.\n— Quelles pièces justificatives devez-vous examiner avant de valider une adoption ?\n— Tous les animaux recueillis sont-ils à jour dans leurs vaccins, pucés électroniquement et stérilisés ?\n— Avez-vous des informations précises sur le passé et le tempérament de chaque animal ?\n— Quel est le montant de la participation financière requise pour les frais de santé engagés ?\n— Prévoyez-vous une période de pré-adoption afin de vérifier que l'animal s'acclimate bien à son nouvel environnement ?\n— Enfin, peut-on planifier un moment pour rencontrer les animaux et les promener dans le parc ?",
  },
  {
    id: "sp-t2-11",
    task_number: 2,
    title: "Organisation d'un dîner d'anniversaire dans un restaurant",
    category: "Événements",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous prévoyez de célébrer les 40 ans d'un ami proche avec une vingtaine d'invités. Vous contactez le gérant d'un restaurant gastronomique pour privatiser un espace, choisir un menu de groupe, convenir des boissons et des animations musicales.",
    candidate_role: "Organisateur de la réception d'anniversaire",
    examiner_role: "Directeur de salle du restaurant",
    suggested_points: [
      "Disposez-vous d'un salon privatif pouvant accueillir confortablement une vingtaine de convives ?",
      "Proposez-vous un menu de groupe tout compris avec entrée, plat, dessert et accords mets-vins ?",
      "Est-il possible de composer des alternatives végétariennes ou sans allergènes pour certains invités ?",
      "Pouvons-nous apporter notre propre gâteau d'anniversaire et appliquez-vous un droit de bouchon ?",
      "Est-il permis de diffuser notre propre liste musicale ou d'installer du matériel de projection vidéo ?",
      "Quelles sont les conditions de versement d'arrhes pour bloquer définitivement la date ?",
      "Jusqu'à quelle heure pouvons-nous prolonger la soirée dans l'établissement ?",
    ],
    model_audio_transcript:
      "— Bonjour, je souhaite organiser un repas pour fêter un anniversaire avec une vingtaine de personnes le mois prochain.\n— Auriez-vous une salle semi-privatisée disponible pour la soirée du samedi 15 ?\n— Quelles formules de menu groupe préconisez-vous et quel est le coût moyen par personne ?\n— Adaptez-vous les plats pour les convives ayant des régimes alimentaires particuliers comme le sans gluten ?\n— Autorisez-vous les clients à apporter une pièce montée extérieure et des bouteilles de champagne ?\n— Serait-il envisageable de brancher un vidéoprojecteur pour projeter un court film commémoratif ?\n— Enfin, quel pourcentage d'acompte demandez-vous lors de la réservation ?",
  },
  {
    id: "sp-t2-12",
    task_number: 2,
    title: "Inscription à un stage de céramique et tournage de poterie",
    category: "Culture",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Vous souhaitez découvrir l'art de la poterie. Vous contactez un atelier artisanal pour vous renseigner sur les stages de week-end, les techniques de modelage enseignées, la cuisson des pièces et le tarif tout compris.",
    candidate_role: "Débutant enthousiaste pour un stage d'artisanat",
    examiner_role: "Maître artisan céramiste",
    suggested_points: [
      "Quelles techniques concrètes sont abordées lors du stage d'initiation (tour de potier, estampage, émaillage) ?",
      "Le stage est-il adapté à une personne qui n'a jamais manipulé de l'argile ?",
      "L'argile, les émaux de couleur et le matériel de modelage sont-ils inclus dans le prix ?",
      "Combien de temps faut-il attendre pour que les créations sèchent et soient cuites au four ?",
      "Combien de pièces finalisées chaque participant peut-il conserver et emporter chez lui ?",
      "Quels vêtements confortables recommandez-vous de porter pendant l'atelier ?",
      "Quel est le nombre d'élèves par session pour assurer un suivi individualisé ?",
    ],
    model_audio_transcript:
      "— Bonjour, j'ai vu votre vitrine d'artisanat et je serais très intéressé par votre stage d'initiation à la poterie.\n— Quelles techniques manuelles et de tournage enseignez-vous durant le week-end découverte ?\n— Ce cours convient-il à un novice complet sans habileté technique préalable ?\n— La terre, les pigments et les outils de façonnage sont-ils entièrement fournis par l'atelier ?\n— Quel est le délai nécessaire pour la double cuisson au four avant que nous puissions récupérer nos objets ?\n— Y a-t-il une limite quant au nombre de bols ou tasses que l'on peut concevoir ?\n— Enfin, combien de places sont ouvertes par atelier pour préserver la convivialité ?",
  },
  {
    id: "sp-t2-13",
    task_number: 2,
    title: "Abonnement et services d'une médiathèque municipale",
    category: "Culture",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Nouvellement installé dans un quartier, vous vous rendez à la médiathèque centrale pour vous inscrire. Vous demandez à la bibliothécaire des détails sur le nombre d'ouvrages empruntables, l'offre numérique, les conférences et les clubs de lecture.",
    candidate_role: "Nouveau résident de la commune",
    examiner_role: "Bibliothécaire responsable du secteur prêts",
    suggested_points: [
      "Quels documents doit-on présenter pour ouvrir un compte lecteur (justificatif de domicile, pièce d'identité) ?",
      "Combien de livres, revues et disques peut-on emprunter simultanément et pour quelle durée ?",
      "L'adhésion donne-t-elle accès à des ressources en ligne comme la presse numérique et les livres audio ?",
      "Des pénalités financières sont-elles appliquées en cas de retour tardif des documents ?",
      "Organisez-vous des rencontres avec des auteurs, des ateliers d'écriture ou des cercles de lecture ?",
      "La médiathèque offre-t-elle un accès au réseau wifi et à des postes informatiques avec imprimante ?",
      "L'inscription annuelle est-elle gratuite pour les habitants de la commune ?",
    ],
    model_audio_transcript:
      "— Bonjour, je viens de m'installer dans le quartier et je désire m'inscrire à la médiathèque municipale.\n— Quelles pièces officielles dois-je fournir pour créer ma carte de lecteur ?\n— Combien de documents physiques puis-je emprunter à la fois et quelle est la durée maximale de prêt autorisée ?\n— Proposez-vous un portail internet pour réserver des ouvrages ou renouveler ses prêts à distance ?\n— L'abonnement ouvre-t-il droit au téléchargement légal de livres numériques et à la consultation de quotidiens ?\n— Vos espaces de travail sont-ils pourvus d'une connexion internet sans fil et de prises pour ordinateurs ?\n— Enfin, quelle est la tarification annuelle appliquée aux résidents locaux ?",
  },
  {
    id: "sp-t2-14",
    task_number: 2,
    title: "Cours particuliers de piano à domicile pour adulte",
    category: "Éducation",
    prep_time_seconds: 120,
    speaking_time_seconds: 210,
    prompt:
      "Adulte, vous désirez commencer l'apprentissage du piano. Vous appelez un professeur de musique qui a publié une annonce pour connaître sa méthode pédagogique, sa disponibilité, ses tarifs et s'il est impératif de savoir lire le solfège.",
    candidate_role: "Apprenant adulte débutant",
    examiner_role: "Professeur de piano diplômé du conservatoire",
    suggested_points: [
      "Acceptez-vous d'enseigner à des adultes grands débutants sans passé musical ?",
      "La maîtrise du solfège traditionnel est-elle un prérequis ou l'apprentissage de la lecture est-il progressif ?",
      "Quels répertoires musicaux abordez-vous (classique, jazz, variétés modernes) ?",
      "Vous déplacez-vous au domicile de l'élève ou les cours ont-ils lieu dans votre studio de musique ?",
      "Un piano acoustique est-il indispensable ou un clavier numérique lesté convient-il au début ?",
      "Quelle est la durée recommandée par séance (45 min ou 1 heure) et quel est votre honoraire horaire ?",
      "Est-il possible d'organiser une première leçon d'évaluation sans engagement à long terme ?",
    ],
    model_audio_transcript:
      "— Bonjour, j'ai vu votre annonce de cours de piano et j'ai toujours eu le rêve d'apprendre cet instrument à l'âge adulte.\n— Proposez-vous une méthode d'enseignement adaptée aux débutants sans aucune base musicale ?\n— Intégrez-vous l'apprentissage de la théorie et des notes directement au fil de la pratique des morceaux ?\n— Quel style musical privilégiez-vous durant les premières semaines d'apprentissage ?\n— Est-il envisageable que les cours soient dispensés à mon domicile ou recevez-vous chez vous ?\n— Faut-il obligatoirement posséder un véritable piano droit ou un clavier numérique avec toucher lourd suffit-il ?\n— Enfin, quel est votre tarif horaire et pourrions-nous faire une première séance d'essai cette semaine ?",
  },

  // --- TÂCHE 3 : MONOLOGUE D'OPINION / ARGUMENTATION (15 SUJETS) ---
  {
    id: "sp-t3-1",
    task_number: 3,
    title: "Les études universitaires sont-elles encore indispensables au succès ?",
    category: "Éducation",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Certains affirment qu'avec l'essor des formations en ligne et de l'auto-apprentissage, le diplôme universitaire traditionnel a perdu de sa pertinence. D'autres soutiennent au contraire que l'université demeure le socle irremplaçable de la réussite sociale et de la pensée critique. Qu'en pensez-vous ? Développez votre argumentation avec des exemples concrets.",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : poser le débat contemporain sur la valeur des diplômes académiques",
      "Thèse 1 : l'essor indéniable des formations courtes, des bootcamps et de la méritocratie autodidacte",
      "Thèse 2 : la valeur irremplaçable de l'université pour la recherche, la rigueur critique et la cohésion",
      "Nuance : l'inadéquation fréquente entre certains cursus théoriques et les besoins du marché de l'emploi",
      "Conclusion personnelle : plaidoyer pour un modèle hybride valorisant compétences et socle intellectuel",
    ],
    model_audio_transcript:
      "La question de la pertinence des études supérieures à l'ère numérique suscite de vives controverses contemporaines. D'un côté, il est indéniable que la prolifération des plateformes de formation en libre accès et des certifications professionnelles accélérées offre une flexibilité sans précédent, permettant à de nombreux autodidactes d'intégrer rapidement le marché du travail, notamment dans le secteur technologique. Néanmoins, il me paraît essentiel de rappeler que l'université ne se réduit pas à une simple courroie de transmission technique. Elle constitue avant tout un lieu d'émulation intellectuelle, où s'acquièrent la rigueur méthodologique, l'esprit critique et la capacité à appréhender la complexité du monde. En conclusion, si les filières courtes et l'autoformation sont des compléments précieux, l'institution universitaire demeure à mes yeux le pilier fondamental de la cohésion républicaine et de la recherche scientifique fondamentale.",
  },
  {
    id: "sp-t3-2",
    task_number: 3,
    title: "Le télétravail : gain de liberté ou risque accru d'isolement social ?",
    category: "Travail",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "La généralisation du travail à distance a profondément transformé le monde professionnel. Si beaucoup y voient un gain inestimable de flexibilité et de conciliation entre vie privée et vie professionnelle, d'autres alertent sur la dissolution du collectif et l'isolement des salariés. Quel est votre point de vue ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : la transition massive vers le télétravail post-pandémie",
      "Arguments favorables : réduction du temps de transport, productivité accrue, équilibre familial",
      "Arguments défavorables : frontière floue entre vie privée et pro, sédentarité, sentiment de solitude",
      "Impact managérial : perte de transmission de la culture d'entreprise et difficulté d'onboarding",
      "Synthèse et prise de position : la supériorité d'un modèle hybride équilibré (2 à 3 jours par semaine)",
    ],
    model_audio_transcript:
      "Le recours massif au travail à distance représente indéniablement l'une des mutations sociétales les plus marquantes de notre époque. Pour une large proportion de salariés, cette modalité a apporté un soulagement considérable en éliminant les temps de transport quotidiens éreintants et en offrant une autonomie appréciable dans la gestion de leur agenda. Cependant, il serait imprudent d'ignorer les revers de cette médaille numérique. L'éloignement physique continu fragilise souvent le sentiment d'appartenance, réduit la sérendipité des échanges informels à la machine à café et peut plonger certains collaborateurs dans un isolement psychologique délétère. De surcroît, la porosité grandissante entre la sphère intime et les impératifs professionnels engendre un risque d'hyperconnexion. Selon moi, l'avenir du travail réside dans une formule hybride maîtrisée, conjuguant le confort du foyer et l'émulation collective du bureau.",
  },
  {
    id: "sp-t3-3",
    task_number: 3,
    title: "L'intelligence artificielle : menace existentielle ou formidable levier de progrès ?",
    category: "Technologie",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "L'essor fulgurant des modèles d'intelligence artificielle générative bouleverse de nombreux secteurs d'activité. Faut-il craindre une destruction massive d'emplois qualifiés et une perte de contrôle humain, ou s'agit-il au contraire d'une opportunité historique pour décupler la créativité et la recherche médicale ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : la révolution des agents et modèles d'IA dans notre quotidien",
      "Opportunités remarquables : avancées médicales, automatisation des tâches répétitives, aide à la décision",
      "Risques majeurs : précarisation de certains métiers intellectuels, biais algorithmiques, désinformation",
      "La question éthique et la régulation gouvernementale nécessaire",
      "Conclusion : l'IA comme amplificateur de l'ingéniosité humaine sous strict encadrement déontologique",
    ],
    model_audio_transcript:
      "L'émergence spectaculaire des technologies d'intelligence artificielle suscite à la fois une immense fascination et de légitimes inquiétudes. Sur le plan scientifique et économique, les perspectives sont vertigineuses : en médecine, l'IA accélère la découverte de molécules thérapeutiques et affine le diagnostic précoce de pathologies lourdes. En entreprise, elle automatise les tâches chronophages pour libérer du temps dédié à l'innovation. Toutefois, ces bienfaits ne doivent pas occulter les risques réels. La substitution algorithmique menace non seulement des emplois d'exécution mais également des professions intellectuelles et artistiques. En outre, la prolifération de contenus fallacieux et le manque de transparence des modèles posent un défi démocratique majeur. Pour ma part, je considère que l'intelligence artificielle doit être appréhendée comme un outil au service de l'humain et non l'inverse, ce qui exige une régulation éthique et juridique vigoureuse.",
  },
  {
    id: "sp-t3-4",
    task_number: 3,
    title: "La gratuité totale des transports en commun dans les grandes métropoles",
    category: "Transports",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Plusieurs villes dans le monde ont fait le choix de rendre leurs réseaux de bus, tramway et métro totalement gratuits pour tous les usagers. Cette politique est-elle la solution miracle pour lutter contre la pollution automobile et renforcer la justice sociale, ou constitue-t-elle un gouffre financier préjudiciable à la qualité du service ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : les défis écologiques urbains et la proposition de transports gratuits",
      "Bénéfices : gain de pouvoir d'achat, incitation forte à délaisser la voiture individuelle, désengorgement",
      "Inconvénients : manque à gagner financier colossal pour investir dans de nouvelles infrastructures",
      "Risques de dégradation : saturation des rames, baisse de propreté et de ponctualité",
      "Alternative : gratuité ciblée pour les étudiants, précaires et aînés plutôt que généralisée",
    ],
    model_audio_transcript:
      "L'idée de rendre les transports collectifs entièrement gratuits pour l'ensemble des citoyens est une proposition séduisante qui s'inscrit au cœur des débats sur la transition écologique. Elle présente incontestablement des vertus d'équité sociale indéniables, en redonnant un pouvoir d'achat précieux aux ménages modestes et en incitant une part des automobilistes à abandonner leur véhicule personnel au profit d'une mobilité décarbonée. Néanmoins, lorsque l'on analyse les retours d'expérience dans les métropoles de grande taille, le bilan financier s'avère beaucoup plus complexe. La suppression des recettes de billetterie prive souvent les collectivités locales des ressources financières nécessaires pour moderniser le matériel roulant, étendre les lignes vers la banlieue et garantir une sécurité optimale. Dès lors, il me semble préférable d'opter pour une tarification solidaire et progressive plutôt qu'une gratuité aveugle qui risquerait de détériorer la qualité générale du service.",
  },
  {
    id: "sp-t3-5",
    task_number: 3,
    title: "L'impact des réseaux sociaux sur les relations humaines et la jeunesse",
    category: "Société",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Les plateformes sociales numériques ont connecté la planète entière en temps réel. Pourtant, de plus en plus d'études soulignent une augmentation de l'anxiété, de la comparaison sociale et de l'isolement chez les jeunes. Pensez-vous que les réseaux sociaux enrichissent ou appauvrissent nos véritables liens humains ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : omniprésence des smartphones et plateformes de partage dans la société",
      "Aspects positifs : maintien des liens au-delà des frontières géographiques, solidarité, accès à l'info",
      "Dérives observées : tyrannie de l'apparence, cyberharcèlement, déficit d'attention et d'empathie",
      "La question des algorithmes d'addiction conçus pour capter le temps d'écran",
      "Plaidoyer : éducation précoce aux médias numériques et préservation des temps de rencontre réelle",
    ],
    model_audio_transcript:
      "S'il est indéniable que les réseaux sociaux ont révolutionné notre manière de communiquer en abolissant les distances géographiques, leur impact sur la psychologie humaine suscite de vives inquiétudes. D'un côté, ces outils permettent de maintenir le lien avec des proches expatriés et d'agréger des communautés d'intérêts bienveillantes. Mais de l'autre côté, force est de constater qu'ils favorisent une culture de la superficialité et de l'hyper-comparaison sociale. Chez les adolescents en particulier, la quête compulsive de validation par le biais des 'mentions j'aime' nourrit des syndromes d'anxiété et de baisse de l'estime de soi. De plus, la multiplication des contacts virtuels se substitue trop souvent aux relations physiques authentiques, qui exigent de l'écoute et du temps long. Je suis convaincu que nous devons réapprendre à nous déconnecter pour préserver l'essence même de nos échanges humains.",
  },
  {
    id: "sp-t3-6",
    task_number: 3,
    title: "Le surtourisme : faut-il instaurer des quotas stricts sur les sites naturels et historiques ?",
    category: "Environnement",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Venise, les calanques de Marseille, les parcs nationaux canadiens : confrontés à des flux massifs de visiteurs, de plus en plus de sites imposent des réservations obligatoires ou des droits d'entrée payants. La limitation de l'accès touristique est-elle une nécessité écologique ou une atteinte à la liberté de voyager ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : explosion des flux touristiques mondiaux dopés par les vols à bas coût",
      "Conséquences alarmantes : érosion des sols, pollution plastique, flambée immobilière pour les locaux",
      "La légitimité des quotas : protéger la biodiversité et garantir une expérience de visite qualitative",
      "Critique : risque d'un tourisme à deux vitesses réservé aux personnes aisées ou aux initiés",
      "Recommandation : régulation intelligente par la désaisonnalisation et la valorisation de destinations secondaires",
    ],
    model_audio_transcript:
      "Le phénomène du surtourisme est devenu une menace critique tant pour les écosystèmes naturels vulnérables que pour la qualité de vie des populations locales. Dans des cités historiques ou des sanctuaires naturels, l'afflux incontrôlé de milliers de visiteurs quotidiens entraîne la dégradation accélérée du patrimoine, la pollution des milieux aquatiques et une flambée insoutenable des loyers qui chasse les résidents permanents. Face à cette urgence, l'instauration de jauges maximales et de réservations préalables apparaît comme une réponse courageuse et indispensable. Certains objectent que cela restreint la liberté de mouvement universelle ; toutefois, sans régulation stricte, ces joyaux naturels finiront par être irrémédiablement détruits et perdus pour les générations futures. Protéger un site par des quotas n'est pas un acte d'exclusion, mais un acte de sauvegarde patrimoniale responsable.",
  },
  {
    id: "sp-t3-7",
    task_number: 3,
    title: "La semaine de travail de quatre jours sans baisse de salaire",
    category: "Travail",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Plusieurs pays et entreprises ont expérimenté avec succès la semaine de quatre jours (32 heures payées 35 ou 40). Est-ce selon vous le modèle d'avenir pour améliorer le bien-être et la productivité, ou une mesure intenable pour l'économie et la compétitivité ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : l'évolution historique du temps de travail et la quête de sens des salariés",
      "Avantages constatés lors des expérimentations : réduction du stress, motivation accrue, empreinte carbone moindre",
      "Limites sectorielles : difficultés d'application dans les hôpitaux, le commerce de détail ou l'artisanat",
      "Les risques d'intensification excessive du travail sur les quatre journées actives",
      "Positionnement : encourager la mesure dans les secteurs adaptés tout en tenant compte de la faisabilité opérationnelle",
    ],
    model_audio_transcript:
      "La perspective d'une semaine professionnelle de quatre jours sans diminution de rémunération suscite un engouement croissant et bouscule nos certitudes managériales. Les multiples expérimentations menées récemment, notamment au Royaume-Uni ou en Islande, ont démontré des résultats remarquables : un taux de fatigue en nette baisse, un moral des équipes revigoré et, paradoxalement, une productivité maintenue voire accrue grâce à une meilleure concentration. En outre, disposer de trois jours de repos permet de consacrer du temps à ses enfants, à des engagements bénévoles ou à sa santé physique. Cependant, il faut se garder de toute naïveté quant à sa généralisation aveugle : des secteurs en tension comme la santé publique, l'enseignement ou les usines manufacturières ne peuvent condenser leur activité sans recruter massivement. En conclusion, il s'agit d'une trajectoire prometteuse qu'il convient d'adapter branche par branche avec pragmatisme.",
  },
  {
    id: "sp-t3-8",
    task_number: 3,
    title: "L'uniforme obligatoire à l'école : égalité des chances ou privation de liberté ?",
    category: "Éducation",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Le port d'une tenue scolaire unique ou de l'uniforme fait régulièrement son retour dans le débat éducatif. Ses partisans y voient un moyen d'effacer les marqueurs sociaux et de lutter contre le harcèlement vestimentaire. Ses détracteurs jugent la mesure passéiste et inefficace. Quel est votre avis ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : le contexte récurrent du retour de l'uniforme dans les écoles républicaines",
      "Arguments des partisans : réduction de la pression des marques de luxe, sentiment de communauté, apaisement",
      "Arguments des opposants : mesure cosmétique qui n'efface pas les vraies inégalités économiques et scolaires",
      "L'enjeu de l'expression de l'individualité et du style chez les jeunes",
      "Conclusion personnelle : la priorité doit aller aux moyens pédagogiques et au tutorat plutôt qu'au vêtement",
    ],
    model_audio_transcript:
      "Le débat relatif à l'obligation de l'uniforme scolaire ressurgit périodiquement comme un remède potentiel aux tensions qui traversent l'école. L'argument majeur en sa faveur repose sur l'atténuation visible des disparités socio-économiques : en interdisant la surenchère des marques de mode onéreuses, on réduirait les jugements entre pairs et certaines formes de moqueries ou de harcèlement. De plus, la tenue commune peut susciter un sentiment d'appartenance institutionnelle. Pour autant, je demeure profondément convaincu que cette solution relève de l'illusion d'optique. Le port d'un vêtement identique n'efface en rien les inégalités réelles de conditions de vie, de soutien parental ou d'accès à la culture à la maison. De surcroît, l'école doit être le lieu où s'apprend le respect de la différence plutôt que la standardisation forcée. Concentrer nos efforts budgétaires sur la baisse des effectifs par classe me paraît infiniment plus urgent.",
  },
  {
    id: "sp-t3-9",
    task_number: 3,
    title: "La sanction financière pour inciter au tri sélectif et au zéro déchet",
    category: "Environnement",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Face à l'urgence climatique et à l'amoncellement des déchets plastiques, certains gouvernements proposent d'instaurer des taxes variables sur le poids des poubelles ou des amendes salées pour non-respect du recyclage. La contrainte financière est-elle la seule manière efficace de changer les comportements citoyens ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : le défi critique de la surproduction de déchets ménagers et industriels",
      "Efficacité du principe 'pollueur-payeur' : l'impact psychologique immédiat du portefeuille",
      "Limites d'équité : risque de pénaliser injustement les foyers modestes ou les familles nombreuses",
      "Le risque d'incivilités et de dépôts sauvages pour contourner la taxe incitative",
      "Nécessité de combiner coercition, pédagogie citoyenne et contraintes fortes sur les industriels du suremballage",
    ],
    model_audio_transcript:
      "La question de l'adoption de sanctions pécuniaires pour encourager le recyclage soulève le dilemme classique entre pédagogie et coercition environnementale. L'expérience montre que la tarification incitative au poids ou l'application de contraventions directes pour mauvais tri provoquent une prise de conscience brutale et efficace, poussant rapidement les ménages à réduire leurs emballages superflus. Néanmoins, faire reposer tout le fardeau écologique sur le seul portefeuille des ménages soulève de sérieuses réserves d'ordre éthique. Tout d'abord, ce sont les fabricants et la grande distribution qui inondent le marché de barquettes plastiques non recyclables que le consommateur subit au quotidien. Ensuite, des sanctions excessives risquent de provoquer des dépôts sauvages en forêt pour éviter la facture. Par conséquent, si le signal financier a sa place, il doit impérativement s'accompagner d'une interdiction légale stricte du suremballage industriel.",
  },
  {
    id: "sp-t3-10",
    task_number: 3,
    title: "Le livre numérique va-t-il signer la disparition définitive du livre papier ?",
    category: "Culture",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Avec les liseuses électroniques, les tablettes et les liseuses audios, l'accès à la littérature est devenu instantané et nomade. Le livre papier traditionnel est-il condamné à devenir un objet de musée pour collectionneurs nostalgiques ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : la coexistence des formats de lecture depuis deux décennies",
      "Points forts du livre numérique : légèreté en déplacement, stockage de milliers d'œuvres, accessibilité visuelle",
      "La résistance remarquable de l'objet physique : texture du papier, odeur, repos visuel hors écran",
      "L'économie des librairies indépendantes comme lieux de convivialité et de conseil humain",
      "Conclusion : une complémentarité harmonieuse plutôt qu'une éviction radicale",
    ],
    model_audio_transcript:
      "Lors de l'apparition des premières liseuses numériques il y a une quinzaine d'années, de nombreux observateurs prédisaient avec assurance la disparition imminente du livre papier. Pourtant, l'histoire a démenti ces prophéties catastrophistes. Il est vrai que le format numérique offre des commodités remarquables : emporter une bibliothèque entière dans un sac de voyage et ajuster la taille de la police pour un meilleur confort de lecture est un atout indéniable. Cependant, le livre relié possède une dimension sensorielle et affective irremplaçable. L'odeur du papier imprimé, le bruissement des pages que l'on tourne et le plaisir d'exposer un bel ouvrage dans sa bibliothèque constituent des composantes essentielles de l'expérience littéraire. De plus, à une époque saturée par la lumière bleue des écrans, le livre physique offre un précieux havre de déconnexion. Les deux supports ne s'excluent pas, ils se complètent idéalement.",
  },
  {
    id: "sp-t3-11",
    task_number: 3,
    title: "L'interdiction stricte des smartphones jusqu'à l'âge de 15 ans",
    category: "Éducation & Santé",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "De plus en plus de médecins, pédopsychiatres et gouvernements recommandent de proscrire les smartphones connectés et les réseaux sociaux aux enfants et adolescents de moins de 15 ans. Est-ce une mesure de salubrité publique nécessaire ou une interdiction irréaliste dans un monde ultra-connecté ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : le constat médical sur l'exposition précoce aux écrans et le sommeil détérioré",
      "Bénéfices de l'interdiction : protection du développement cérébral, préservation des jeux physiques et de la socialisation",
      "Difficultés d'application : contrôle parental complexe, sentiment d'exclusion chez l'adolescent",
      "Le risque de créer un tabou renforçant l'attrait secret pour l'objet interdit",
      "Conclusion : privilégier l'accès progressif avec des téléphones basiques sans navigateur plutôt qu'un déni total",
    ],
    model_audio_transcript:
      "La question de l'âge d'accès aux téléphones intelligents chez les mineurs est devenue l'un des enjeux de santé publique les plus cruciaux de notre siècle. Les rapports médicaux sont unanimes : l'exposition massive et non encadrée des jeunes adolescents aux écrans interactifs perturbe profondément les cycles de sommeil, altère les capacités d'attention soutenue et favorise des sédentarités précoces. Dès lors, poser une barrière d'âge claire autour de 15 ans relève d'une mesure de protection élémentaire face à des plateformes conçues spécifiquement pour créer une dépendance dopaminergique. Certes, les parents soulignent souvent l'argument de la sécurité pour pouvoir contacter leur enfant lorsqu'il se déplace seul ; mais pour cela, un téléphone basique doté uniquement d'appels et de SMS suffit amplement. Protéger l'enfance de la captation attentionnelle n'est pas de l'obscurantisme, c'est un impératif de santé collective.",
  },
  {
    id: "sp-t3-12",
    task_number: 3,
    title: "Le covoiturage quotidien pour les trajets domicile-travail",
    category: "Transports & Écologie",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "L'auto-solisme reste la règle sur nos routes : la grande majorité des véhicules ne transporte qu'une seule personne pour se rendre au travail. Le covoiturage régulier peut-il réellement s'imposer face aux contraintes d'horaires et d'imprévus de chacun ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : les embouteillages quotidiens et l'absurdité écologique de rouler seul dans sa voiture",
      "Atouts du covoiturage de proximité : partage significatif des frais de carburant et réduction des émissions de CO2",
      "Freins concrets : rigidité des plannings, réunions imprévues tardives, contrainte de récupérer des enfants à l'école",
      "Le rôle des incitations publiques : voies réservées, primes financières et applications de mise en relation dédiées",
      "Bilan : une pratique pleine d'avenir à condition d'être soutenue par des infrastructures adaptées",
    ],
    model_audio_transcript:
      "Dans la plupart des zones périurbaines où l'offre de transports en commun demeure insuffisante, l'auto-solisme constitue une aberration à la fois économique et environnementale. Voir des millions de véhicules rouler avec quatre sièges vides dans des embouteillages interminables illustre l'urgence de développer le covoiturage du quotidien. Sur le plan pratique, partager un trajet avec des collègues ou des voisins permet de diviser par deux ou trois son budget mensuel d'essence tout en réduisant l'empreinte carbone globale. Pourquoi alors cette pratique peine-t-elle à se généraliser ? La réponse réside dans la peur légitime de perdre sa flexibilité : comment faire en cas d'urgence familiale ou d'heures supplémentaires imprévues ? C'est pourquoi les pouvoirs publics doivent créer des voies de circulation spécifiquement réservées aux voitures partagées et garantir des solutions de retour garanti en taxi en cas d'aléa.",
  },
  {
    id: "sp-t3-13",
    task_number: 3,
    title: "L'apprentissage d'une langue étrangère dès l'école maternelle",
    category: "Éducation",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Certains spécialistes affirment que le cerveau des très jeunes enfants possède une plasticité exceptionnelle pour assimiler naturellement une seconde langue sans accent. D'autres craignent une surcharge cognitive préjudiciable à la maîtrise de la langue maternelle. Qu'en pensez-vous ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : la découverte précoce des langues dans un monde globalisé",
      "Avantages neurobiologiques : plasticité auditive, imprégnation intuitive par le chant et le jeu",
      "L'absence d'inhibition psychologique chez le tout-petit face à l'apprentissage de nouveaux sons",
      "Réfutation des craintes de confusion linguistique : les enfants bilingues développent une meilleure agilité mentale",
      "Conditions sine qua non : une pédagogie strictement ludique sans notation académique précoce",
    ],
    model_audio_transcript:
      "L'introduction précoce d'une deuxième langue dès les premières années de scolarité à la maternelle constitue un formidable levier d'ouverture intellectuelle. Les recherches contemporaines en neurosciences ont largement prouvé que le cerveau de la petite enfance bénéficie d'une plasticité auditive unique, lui permettant de discriminer et reproduire des phonèmes étrangers avec une aisance qui disparaît en grande partie après la puberté. Loin de retarder l'acquisition de la langue maternelle, cet éveil linguistique stimule les capacités métalinguistiques et développe une souplesse cognitive précieuse pour tous les apprentissages ultérieurs. Bien entendu, il ne saurait être question d'imposer des cours magistraux de grammaire à cet âge tendre : l'assimilation doit s'opérer de façon ludique, par le biais de comptines, de contes illustrés et d'activités motrices. C'est un cadeau inestimable pour leur avenir de citoyens du monde.",
  },
  {
    id: "sp-t3-14",
    task_number: 3,
    title: "Le sport au travail : doit-il être financé et encouragé par les employeurs ?",
    category: "Santé & Entreprise",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "La sédentarité au bureau est responsable de nombreux troubles musculo-squelettiques et de burn-outs. Les entreprises devraient-elles aménager des plages horaires et des installations sportives pour leurs salariés sur leur temps de travail ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : les ravages du travail assis prolongé sur la santé des collaborateurs",
      "Gains pour l'entreprise : baisse de l'absentéisme, diminution du stress, renforcement de la cohésion d'équipe",
      "Gains pour le salarié : bien-être psychique, vitalité, conciliation plus aisée d'un mode de vie sain",
      "Limites potentielles : coût d'aménagement des douches et des salles de sport, respect de la sphère privée",
      "Conclusion : un investissement hautement rentable pour la marque employeur et la santé publique",
    ],
    model_audio_transcript:
      "Face à l'explosion des maladies chroniques liées à la sédentarité prolongée derrière les écrans, la promotion de l'activité physique sur le lieu de travail est une démarche d'une pertinence absolue. Pour les employeurs, considérer le sport comme une perte de temps productive relève d'une vision archaïque et myope. De multiples études économiques ont prouvé que la pratique sportive régulière au sein de l'entreprise réduit l'absentéisme de manière spectaculaire, prévient les troubles musculo-squelettiques et stimule l'énergie créative des équipes. De plus, faire du sport entre collègues brise les barrières hiérarchiques rigides et consolide la solidarité interne. Certes, toutes les petites entreprises n'ont pas les moyens d'installer un gymnase dans leurs locaux, mais aménager des horaires flexibles et offrir un abonnement subventionné est à la portée de tous. Le bien-être physique des salariés est le garant le plus sûr de la vitalité économique durable d'une organisation.",
  },
  {
    id: "sp-t3-15",
    task_number: 3,
    title: "L'évaluation et la notation anonyme des enseignants par les élèves",
    category: "Éducation",
    prep_time_seconds: 0,
    speaking_time_seconds: 270,
    prompt:
      "Dans certaines universités et lycées, les étudiants remplissent chaque fin de semestre un questionnaire anonyme pour noter la pédagogie, la disponibilité et la clarté de leurs professeurs. Est-ce un outil d'amélioration salutaire ou une dérive consumériste dangereuse ?",
    candidate_role: null,
    examiner_role: null,
    suggested_points: [
      "Introduction : la pratique du feedback étudiant inspirée du monde anglo-saxon",
      "Bénéfices : responsabilisation des équipes, détection des lacunes pédagogiques, écoute de la parole apprenante",
      "Dangers réels : démagogie des enseignants pour plaire, notation punitive des profs exigeants, consumérisme scolaire",
      "Impact sur l'autorité et la sérénité du corps enseignant",
      "Bilan : conserver le retour qualitatif constructif tout en refusant le classement quantitatif simpliste",
    ],
    model_audio_transcript:
      "La question de l'évaluation des enseignants par leurs propres élèves suscite de vifs débats éthiques au sein du monde éducatif. D'un côté, il est légitime de donner la parole aux apprenants : un retour constructif et bienveillant peut aider un pédagogue à ajuster son rythme de parole, à clarifier ses supports de cours ou à diversifier ses exemples concrets. Cependant, transformer ce dialogue en une notation quantitative anonyme comporte de graves dérives. Le risque principal est de transformer la relation d'apprentissage en une relation purement marchande et consumériste, où l'élève se positionne comme un client mécontent. Cela peut inciter certains professeurs à faire preuve d'une coupable démagogie en baissant le niveau d'exigence ou en surévaluant les notes pour s'assurer des commentaires favorables. En conclusion, si le dialogue pédagogique doit être encouragé, il ne doit jamais se muer en un tribunal anonyme dégradant l'autorité magistrale.",
  },
];
