import maman from "@/assets/maman.jpg";
import papa from "@/assets/papa.jpg";
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
  videoUrl?: string;
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
  address: "Abomey-calavi, Bénin",
  phone: "+229 01 65 18 56 30",
  whatsapp: "+229 01 65 18 56 30",
  email: "citedexcellence01@gmail.com",
  foundingYear: 2004,
  yearsOfImpact: "20+",
  liveUrl: "https://www.youtube.com/@Cit%C3%A9dexcellencehm",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61577961128556",
    youtube: "https://www.youtube.com/@Cit%C3%A9dexcellencehm",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/2290165185630",
  },
  donations: {
    kkiapayLink: "https://chapchap.kkiapay.me/742aF0blmCbflT4H-1186",
    kkiapayUssd: "*616*41*1186*montant#"
  }
};

export const PROGRAMS: Program[] = [
  {
    id: "culte-dimanche",
    title: "Culte de Gloire et de Prophétie",
    category: "Culte",
    day: "Dimanche",
    time: "09:00 - 11h:30",
    location: "Abomey-calavi, Bénin",
    description: "Célébration, louange prophétique et message transformateur pour bien commencer la semaine.",
    icon: "church"
  },
  {
    id: "Culte",
    title: "Culte de Famille",
    category: "Culte",
    day: "Mercredi",
    time: "19h:00 - 21h:00",
    location: "Abomey-calavi, Bénin",
    description: "Approfondissement des Écritures et étude biblique thématique pour la croissance spirituelle.",
    icon: "menu_book"
  },
  {
    id: "Ecole des leaders",
    title: "Ecole des leaders",
    category: "Étude",
    day: "jeudi",
    time: "19h:30 - 22h:00",
    location: "Abomey-calavi, Bénin",
    description: "Approfondissement des Écritures et étude biblique thématique pour la croissance spirituelle.",
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
    name: "Espace Jeune D'Impact",
    leader: "Resp. AP Joachim.",
    meetingDay: "Samedi à 15h:00",
    location: "Abomey-calavi, Bénin",
    description: "Rassemblement dynamique des jeunes pour développer leurs talents, leur foi et leur leadership.",
    icon: "groups"
  },
  {
    id: "chorale",
    name: "Groupe musical",
    leader: "Resp. Fr DJOSSOU.",
    meetingDay: "Samedi à 18h:00",
    location: "Abomey-calavi, Bénin",
    description: "Ministère de louange conduisant le peuple dans l'adoration et la présence de Dieu.",
    icon: "music_note"
  },
  {
    id: "femmes",
    name: "Femmes d'excellence",
    leader: "Pasteur Orphelia ALLADAYE",
    meetingDay: "Mardi 09h-00",
    location: "Abomey-calavi, Bénin",
    description: "Soutenir, équiper et inspirer les femmes dans leurs foyers, carrières et ministères.",
    icon: "woman"
  },

  {
    id: "enfants",
    name: "Église des Enfants",
    leader: "Monitrice Jacqueline AHONON.",
    meetingDay: "Mercredi 15h00-17h00",
    location: "Abomey-calavi, Bénin",
    description: "Enseignement ludique et spirituel adapté aux enfants de 3 à 12 ans.",
    icon: "child_care"
  },
  {
    id: "intercession",
    name: "Groupe d'Intercession",
    leader: "Responsable .",
    meetingDay: "Mardi à 18h:00",
    location: "Abomey-calavi, Bénin",
    description: "Veille spirituelle et prière continue pour les membres, les dirigeants et la nation.",
    icon: "volunteer_activism"
  },
  {
    id: "media",
    name: "Média & Communication",
    leader: "Res Fr Ezechiel.",
    meetingDay: "Toute la semaine",
    location: "Abomey-calavi, Bénin",
    description: "Captation vidéo, diffusion live, graphisme et gestion des réseaux sociaux.",
    icon: "videocam"
  },
  {
    id: "hotesses",
    name: "Hôtesses & Accueil",
    leader: "Sr Merveille AGANNI .",
    meetingDay: "Tout les dimanche",
    location: "Hall d'Accueil",
    description: "Accueil chaleureux, orientation des visiteurs et organisation des assemblées.",
    icon: "diversity_3"
  },
  {
    id: "protocole",
    name: "Protocole",
    leader: "Resp. Fr Prince.",
    meetingDay: "Tout les diamnche",
    location: "Abomey-calavi, Bénin",
    description: "Assurer la sécurité et le bon déroulement des cultes et des réunions de la semaine.",
    icon: "groups"
  },
  {
    id: "evangelisation",
    name: "Evangélisation",
    leader: "Responsable Evangélisation",
    meetingDay: "Samedi",
    location: "Abomey-calavi, Bénin",
    description: "Proclamation de l'Évangile, sorties d'évangélisation et conquête des âmes.",
    icon: "campaign"
  },
  {
    id: "nettoyage",
    name: "Nettoyage",
    leader: "Responsable Nettoyage",
    meetingDay: "Samedi",
    location: "Abomey-calavi, Bénin",
    description: "Entretien, propreté et aménagement des locaux de l'église pour accueillir la présence de Dieu.",
    icon: "cleaning_services"
  }
];

export const PASTORS: Pastor[] = [
  {
    name: "Rev. Dr. HOUEKIN HANGBE Fidèle",
    role: "Pasteur Principal & Visionnaire",
    bio: "Fondateur de HOUEKIN MINISTRIES, passionné par la prédication de la parole de foi et le développement du potentiel spirituel des croyants.",
    photo: papa.src
  },
  {
    name: "Rev. Dr. HOUEKIN HANGBE Augustine",
    role: "Pasteure ",
    bio: "Engagée dans l'accompagnement des familles, l'intercession et l'épanouissement des femmes de valeur dans le royaume.",
    photo: maman.src
  }
];
