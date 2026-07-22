"use client";

import Link from "next/link";
import { CHURCH_INFO, DEPARTMENTS, PASTORS } from "@/lib/constants";
import { Users, Calendar, BookOpen, Heart, ArrowRight, ShieldCheck, Download } from "lucide-react";

export default function MembersCommunityPage() {
  const pastor = PASTORS[0];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="bg-surface-container-low py-16 px-4 md:px-margin-desktop rounded-b-3xl border-b border-outline-variant/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="px-4 py-1.5 bg-secondary/10 text-secondary font-extrabold text-xs tracking-wider uppercase rounded-full inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Espace Fidèles & Bénévoles
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-primary leading-tight">
            Bienvenue dans la Communauté de la Cité d'Excellence
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Retrouvez ici le guide du nouveau membre, les réunions de départements et les ressources d'édification spirituelle.
          </p>
        </div>
      </section>

      {/* Main Grid: Resources & Guide */}
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop space-y-12">
        
        {/* Pastoral Welcome Banner */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-xl flex flex-col md:flex-row items-center gap-6">
          <img
            src={pastor.photo}
            alt={pastor.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-secondary shadow-md shrink-0"
          />
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Mot du Pasteur Principal</span>
            <h2 className="font-display font-bold text-xl md:text-2xl text-primary">
              « Votre présence enrichit la Maison de Dieu »
            </h2>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
              Nous croyons que chaque croyant a reçu des talents pour édifier le Corps du Christ. Que vous soyez nouveau ou membre fidèle, votre engagement est une bénédiction pour HOUEKIN MINISTRIES.
            </p>
            <div className="pt-2">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-2xl hover:bg-primary-container transition-colors shadow-md"
              >
                <span>Rejoindre un département</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
            <div className="p-3 bg-secondary/10 text-secondary w-fit rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">Manuel du Nouveau Membre</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Découvrez la vision, la confession de foi et le fonctionnement des ministères de l'église.
            </p>
            <button className="text-xs font-bold text-secondary hover:underline flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger le Guide PDF</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
            <div className="p-3 bg-primary/10 text-primary w-fit rounded-2xl">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">Réunions de Départements</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Répétitions de chorale le vendredi soir, réunions médias le samedi et veillées d'intercession.
            </p>
            <Link href="/programs" className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5">
              <span>Voir le calendrier complet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
            <div className="p-3 bg-tertiary/10 text-tertiary w-fit rounded-2xl">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary">Assistance & Suivi Pastoral</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Besoin d'un entretien pastoral, d'un baptême ou d'un accompagnement personnalisé ?
            </p>
            <Link href="/contact" className="text-xs font-bold text-tertiary hover:underline flex items-center gap-1.5">
              <span>Demander un entretien</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
