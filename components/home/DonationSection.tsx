import Link from "next/link";
import { CHURCH_INFO } from "@/lib/constants";
import { Smartphone, CreditCard, Heart, ArrowRight, ShieldCheck } from "lucide-react";

export default function DonationSection() {
  return (
    <section className="py-20 bg-surface-container-low relative overflow-hidden" id="give">
      <div className="absolute inset-0 bg-primary/5">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1B2B48 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>
      
      <div className="px-4 md:px-margin-desktop max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-2">Générosité & Partenariat</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4">
            Soutenir l'Œuvre du Royaume
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
            Votre générosité nous permet d'impacter des milliers de vies, de propager l'Évangile et de réaliser les projets de la Cité d'Excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Card 1: Paiement Mobile / En Ligne (Kkiapay) */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-outline-variant/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <CreditCard className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary mb-3">
              Paiement Mobile & Carte
            </h3>
            <p className="text-on-surface-variant text-sm mb-8 flex-grow">
              Faites votre don en toute sécurité via Mobile Money (MTN, Moov, Celtiis) ou par carte bancaire.
            </p>
            
            <a 
              href={CHURCH_INFO.donations.kkiapayLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-primary hover:bg-primary-container text-white py-4 rounded-2xl font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Faire mon don en ligne</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-on-surface-variant/60 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Paiement sécurisé par Kkiapay</span>
            </div>
          </div>

          {/* Card 2: Paiement USSD */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-outline-variant/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
              <Smartphone className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary mb-3">
              Paiement par Code USSD
            </h3>
            <p className="text-on-surface-variant text-sm mb-8 flex-grow">
              Vous n'avez pas de connexion internet ? Tapez simplement ce code sur votre téléphone.
            </p>
            
            <div className="w-full bg-surface-container-low border border-outline-variant/30 py-4 px-4 rounded-2xl mb-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 font-mono font-bold text-xl md:text-2xl tracking-widest text-primary flex items-center justify-center">
                {CHURCH_INFO.donations.kkiapayUssd.split('montant')[0]}<span className="text-secondary mx-1 text-sm md:text-lg">montant</span>{CHURCH_INFO.donations.kkiapayUssd.split('montant')[1]}
              </span>
            </div>
            
            <p className="text-xs text-on-surface-variant font-medium">
              Saisissez le code puis validez pour finaliser l'opération.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
