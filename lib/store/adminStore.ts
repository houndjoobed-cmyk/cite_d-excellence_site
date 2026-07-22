import { SERMONS, PROGRAMS, Sermon, Program, CHURCH_INFO } from "@/lib/constants";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'Non lu' | 'En prière' | 'Traité';
}

export interface ChurchMember {
  id: string;
  memberNumber: string; // ex: HM-2026-0042
  lastName: string;
  firstName: string;
  gender: 'Homme' | 'Femme';
  birthDate: string;
  photoUrl: string;
  maritalStatus: 'Célibataire' | 'Marié(e)' | 'Veuf/Veuve' | 'Divorcé(e)';
  profession: string;
  educationLevel?: string;
  address: string;
  neighborhood: string;
  phone: string;
  email?: string;
  emergencyContact: string; // Nom & Tél
  churchArrivalDate?: string;
  department?: string;
  cellLeader?: string;
  cellGroup?: string;
  baptismDate?: string;
  conversionDate?: string;
  spiritualGifts?: string;
  status: 'Nouveau' | 'Membre Actif' | 'Ancien';
  registrationDate: string;
}

export interface MemberCandidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  neighborhood: string;
  department: string;
  skills: string;
  availability: string;
  registrationDate: string;
  status: 'Nouveau' | 'Contacté' | 'En formation' | 'Intégré';
}

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Jean-Baptiste K.",
    email: "jean.k@example.com",
    phone: "+229 97 12 34 56",
    subject: "Sujet de prière / Accompagnement",
    message: "Bonjour Pasteur, je demande une prière d'intercession pour ma famille et mon entreprise cette semaine.",
    date: "21 Juillet 2026",
    status: "Non lu"
  },
  {
    id: "msg-2",
    name: "Amiélé O.",
    email: "amiele.o@example.com",
    phone: "+229 95 98 76 54",
    subject: "Visite à l'église",
    message: "Je serai présente au culte d'excellence ce dimanche avec mes enfants. Merci pour l'accueil !",
    date: "20 Juillet 2026",
    status: "En prière"
  },
  {
    id: "msg-3",
    name: "Mathieu T.",
    email: "mathieu.t@example.com",
    phone: "+229 61 00 11 22",
    subject: "Rejoindre un département",
    message: "Je souhaite intégrer le département Média & Communication. Je suis graphiste de profession.",
    date: "18 Juillet 2026",
    status: "Traité"
  }
];

export const INITIAL_CHURCH_MEMBERS: ChurchMember[] = [];

export const INITIAL_MEMBERS: MemberCandidate[] = [
  {
    id: "mem-1",
    fullName: "Grâce ADJAVO",
    email: "grace.adjavo@example.com",
    phone: "+229 97 88 44 11",
    neighborhood: "Fidjrossè, Cotonou",
    department: "Média & Communication",
    skills: "Montage vidéo, Photographie, Réseaux sociaux",
    availability: "Dimanche matin & Samedi après-midi",
    registrationDate: "21 Juillet 2026",
    status: "Nouveau"
  }
];
