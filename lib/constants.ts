export interface Program {
  id: string;
  title: string;
  category: 'Culte' | 'Étude' | 'Prière' | 'Séminaire' | 'Veillée';
  day: string;
  time: string;
  location: string;
  description: string;
  icon: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  category: 'Vidéo' | 'Audio' | 'PDF' | 'Live';
  thumbnail: string;
  duration: string;
  description: string;
}

export interface Department {
  id: string;
  name: string;
  leader: string;
  meetingDay: string;
  location: string;
  description: string;
  icon: string;
}

export interface Pastor {
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export const CHURCH_INFO = {
  name: "HOUEKIN MINISTRIES",
  subtitle: "La Cité d'Excellence",
  tagline: "Bâtir une génération d'excellence par la Puissance du Saint-Esprit.",
  description: "Un lieu où la foi rencontre l'excellence, et où chaque vie est transformée par la puissance de la parole de Dieu.",
  address: "Cotonou, Bénin",
  phone: "+229 21 00 00 00",
  whatsapp: "+229 90 00 00 00",
  email: "contact@houekin.org",
  foundingYear: 2004,
  yearsOfImpact: "20+",
  liveUrl: "https://youtube.com",
  socials: {
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/22990000000",
  },
  donations: {
    kkiapayLink: "https://chapchap.kkiapay.me/742aF0blmCbflT4H-1186",
    kkiapayUssd: "*616*41*1186*montant#"
  }
};

export const PROGRAMS: Program[] = [
  {
    id: "culte-dimanche",
    title: "Culte d'Excellence & de Percée",
    category: "Culte",
    day: "Dimanche",
    time: "09:00 - 12:00",
    location: "Sanctuaire Principal, Cotonou",
    description: "Célébration, louange prophétique et message transformateur pour bien commencer la semaine.",
    icon: "church"
  },
  {
    id: "ecole-du-sabbat",
    title: "École du Sabbat & Étude Biblique",
    category: "Étude",
    day: "Mercredi",
    time: "18:30 - 20:30",
    location: "Salle d'Édification",
    description: "Approfondissement des Écritures et étude biblique thématique pour la croissance spirituelle.",
    icon: "menu_book"
  },
  {
    id: "nuit-de-priere",
    title: "Nuit de Prière & d'Intercession",
    category: "Veillée",
    day: "Vendredi",
    time: "22:00 - 04:00",
    location: "Sanctuaire Principal",
    description: "Combat spirituel intense et intercession prophétique pour briser tous les jougs.",
    icon: "fireplace"
  }
];

export const SERMONS: Sermon[] = [
  {
    id: "onction-dimension-nouvelle",
    title: "L'Onction pour une Dimension Nouvelle",
    preacher: "Rev. Dr. Houekin",
    date: "15 Juillet 2026",
    category: "Vidéo",
    thumbnail: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1200&auto=format&fit=crop",
    duration: "1h 15min",
    description: "Découvrez comment activer la puissance de Dieu pour transformer vos défis en témoignages de gloire."
  },
  {
    id: "autorite-croyant",
    title: "L'Autorité du Croyant dans les Temps de Crise",
    preacher: "Rev. Dr. Houekin",
    date: "08 Juillet 2026",
    category: "Vidéo",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    duration: "58min",
    description: "Marcher dans la domination spirituelle que Christ nous a acquise à la croix."
  },
  {
    id: "prosperite-biblique",
    title: "Secrets pour une Prospérité Biblique Durable",
    preacher: "Pasteur Invité",
    date: "01 Juillet 2026",
    category: "Vidéo",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    duration: "1h 05min",
    description: "Principes du royaume pour la gestion financière et la multiplication des bénédictions."
  },
  {
    id: "puissance-parole",
    title: "La Puissance de la Parole Déclarée",
    preacher: "Équipe Pastorale",
    date: "24 Juin 2026",
    category: "Audio",
    thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop",
    duration: "45min",
    description: "Comment vos paroles façonnent votre réalité spirituelle et matérielle."
  },
  {
    id: "louange-vraie",
    title: "Entrer dans la Présence: Louange Vraie",
    preacher: "Direction de Louange",
    date: "17 Juin 2026",
    category: "Vidéo",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    duration: "1h 30min",
    description: "Adoration en esprit et en vérité qui attire la présence manifeste de Dieu."
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: "jeunesse",
    name: "Jeunesse d'Excellence",
    leader: "Resp. Emmanuel G.",
    meetingDay: "Samedi à 16:00",
    location: "Salle Annexe",
    description: "Rassemblement dynamique des jeunes pour développer leurs talents, leur foi et leur leadership.",
    icon: "groups"
  },
  {
    id: "chorale",
    name: "Chorale & Louange Prophétique",
    leader: "Chantre Sarah K.",
    meetingDay: "Jeudi à 18:30",
    location: "Sanctuaire Principal",
    description: "Ministère de louange conduisant le peuple dans l'adoration et la présence de Dieu.",
    icon: "music_note"
  },
  {
    id: "femmes",
    name: "Département des Femmes de Valeur",
    leader: "Pasteur Mme Houekin",
    meetingDay: "1er Samedi du mois",
    location: "Grande Salle",
    description: "Soutenir, équiper et inspirer les femmes dans leurs foyers, carrières et ministères.",
    icon: "woman"
  },
  {
    id: "hommes",
    name: "Hommes d'Impact & d'Honneur",
    leader: "Diacre Marc T.",
    meetingDay: "2ème Samedi du mois",
    location: "Salle de Conférence",
    description: "Bâtir des hommes intègres, piliers dans leurs familles et dans la communauté.",
    icon: "man"
  },
  {
    id: "enfants",
    name: "ÉCODIM (Église des Enfants)",
    leader: "Monitrice Grace A.",
    meetingDay: "Dimanche à 09:00",
    location: "Salles Écodim",
    description: "Enseignement ludique et spirituel adapté aux enfants de 3 à 12 ans.",
    icon: "child_care"
  },
  {
    id: "intercession",
    name: "Armée d'Intercession",
    leader: "Responsable Paulin N.",
    meetingDay: "Mardi à 18:00",
    location: "Chambre de Prière",
    description: "Veille spirituelle et prière continue pour les membres, les dirigeants et la nation.",
    icon: "volunteer_activism"
  },
  {
    id: "media",
    name: "Média & Communication",
    leader: "Ing. David H.",
    meetingDay: "Mardi à 19:00",
    location: "Studio Média",
    description: "Captation vidéo, diffusion live, graphisme et gestion des réseaux sociaux.",
    icon: "videocam"
  },
  {
    id: "protocole",
    name: "Protocole & Accueil",
    leader: "Diaconesse Blandine O.",
    meetingDay: "Samedi à 17:00",
    location: "Hall d'Accueil",
    description: "Accueil chaleureux, orientation des visiteurs et organisation des assemblées.",
    icon: "diversity_3"
  }
];

export const PASTORS: Pastor[] = [
  {
    name: "Rev. Dr. HOUEKIN",
    role: "Pasteur Principal & Visionnaire",
    bio: "Fondateur de HOUEKIN MINISTRIES, passionné par la prédication de la parole de foi et le développement du potentiel spirituel des croyants.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Pasteur Grace HOUEKIN",
    role: "Co-Pasteure & Responsable des Femmes",
    bio: "Engagée dans l'accompagnement des familles, l'intercession et l'épanouissement des femmes de valeur dans le royaume.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
  }
];
