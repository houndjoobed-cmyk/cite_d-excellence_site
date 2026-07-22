import Link from "next/link";
import { CHURCH_INFO } from "@/lib/constants";
import { PlayCircle, Calendar, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 bg-inverse-surface">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-overlay z-10" />
        <div 
          className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1920&auto=format&fit=crop')`
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 text-center text-white px-4 md:px-margin-desktop max-w-4xl mx-auto fade-in">
        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/40 text-secondary-fixed text-xs md:text-sm font-semibold tracking-wider uppercase mb-6">
          Maison de prière & de transformation
        </span>
        
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight mb-4 drop-shadow-lg">
          Bienvenue à <span className="gold-text-gradient">{CHURCH_INFO.name}</span>
        </h1>
        
        <p className="font-display text-xl sm:text-2xl md:text-3xl text-secondary-fixed mb-6 tracking-widest uppercase font-semibold">
          {CHURCH_INFO.subtitle}
        </p>

        <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          {CHURCH_INFO.description}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={CHURCH_INFO.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-container text-white rounded-full font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <PlayCircle className="w-6 h-6 text-secondary-fixed" />
            <span>Regarder le direct</span>
          </a>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-4 border-2 border-white/40 backdrop-blur-md text-white rounded-full font-bold text-base hover:bg-white/10 hover:border-white transition-all flex items-center justify-center gap-2"
          >
            <span>Découvrir l'église</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Floating Service Card */}
      <div className="absolute bottom-8 right-8 hidden lg:block z-30 max-w-xs">
        <div className="glass-card p-5 rounded-2xl shadow-2xl flex items-center gap-4 border-l-4 border-secondary">
          <div className="bg-primary text-white p-3 rounded-xl shadow-md">
            <Calendar className="w-6 h-6 text-secondary-fixed" />
          </div>
          <div>
            <p className="text-on-surface-variant font-bold text-xs uppercase tracking-wider">Prochain Culte</p>
            <p className="text-primary font-extrabold text-lg">Dimanche à 09h00</p>
            <p className="text-on-surface text-xs font-medium opacity-80">Culte d'Excellence & de Percée</p>
          </div>
        </div>
      </div>
    </section>
  );
}
