import Image from "next/image";
import Link from "next/link";
import { Eye, Rocket, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 px-4 md:px-margin-desktop max-w-container-max mx-auto overflow-hidden" id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Visual & Impact Badge */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-48 h-48 bg-secondary/15 rounded-full blur-3xl" />
          
          <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop"
              alt="Dirigeants de HOUEKIN MINISTRIES"
              className="w-full h-[450px] object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -right-4 md:right-6 glass-card px-6 py-4 rounded-2xl shadow-xl border border-secondary/30 z-20 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-white font-display font-extrabold text-xl shadow-md">
              20+
            </div>
            <div>
              <span className="text-primary font-extrabold text-xl block leading-tight">Années d'Impact</span>
              <span className="text-on-surface-variant text-xs font-semibold">Transformant des vies au Bénin</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Values */}
        <div>
          <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-2">Notre Vision & Mission</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-6">
            Bâtir une Génération d'Excellence
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed">
            HOUEKIN MINISTRIES est plus qu'une église ; c'est un centre de transformation spirituelle et sociale où nous équipons les croyants pour manifester la gloire de Dieu dans toutes les sphères de la société.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-secondary/30 transition-all">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl h-fit">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-on-surface">Notre Vision</h4>
                <p className="text-on-surface-variant text-sm mt-1">Influencer le monde par l'Évangile de la Gloire de Dieu et bâtir des leaders d'impact.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 hover:border-secondary/30 transition-all">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl h-fit">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-on-surface">Notre Mission</h4>
                <p className="text-on-surface-variant text-sm mt-1">Formes des disciples affermis, marchant dans l'excellence divine, l'amour et la puissance de la parole.</p>
              </div>
            </div>
          </div>

          {/* Timeline Frise */}
          <div className="pt-6 border-t border-outline-variant/20">
            <h4 className="text-primary font-bold text-sm uppercase tracking-wider mb-6">Jalons Historiques</h4>
            <div className="grid grid-cols-3 gap-4 text-center relative">
              <div className="space-y-1">
                <span className="w-3 h-3 bg-primary rounded-full block mx-auto shadow-md"></span>
                <p className="text-xs font-bold text-primary">2004</p>
                <p className="text-[11px] text-on-surface-variant">Fondation</p>
              </div>
              <div className="space-y-1">
                <span className="w-3 h-3 bg-primary rounded-full block mx-auto shadow-md"></span>
                <p className="text-xs font-bold text-primary">2012</p>
                <p className="text-[11px] text-on-surface-variant">Expansion</p>
              </div>
              <div className="space-y-1">
                <span className="w-3 h-3 bg-secondary rounded-full block mx-auto shadow-md"></span>
                <p className="text-xs font-bold text-secondary">2026</p>
                <p className="text-[11px] text-on-surface-variant">Cité d'Excellence</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-container transition-colors"
            >
              <span>En savoir plus sur notre église</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
