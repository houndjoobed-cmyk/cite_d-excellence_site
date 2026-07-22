"use client";

import { CreditCard, Smartphone, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export default function GivePage() {
  return (
    <ConditionalLayout>
      <main className="min-h-screen bg-surface pb-24">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1B2B48 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          </div>
          
          <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop relative z-10 text-center">
            <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest inline-block mb-6">
              Soutenir l'œuvre
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-primary max-w-3xl mx-auto leading-tight mb-6">
              Donner avec <span className="text-secondary">Joie</span>
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base max-w-2xl mx-auto">
              "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie." — <span className="font-bold text-primary">2 Corinthiens 9:7</span>
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 md:px-margin-desktop relative z-20 -mt-10">
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Card 1: Paiement Mobile / En Ligne (Kkiapay) */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-outline-variant/20 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl text-primary mb-3">
                Paiement Mobile & Carte
              </h2>
              <p className="text-on-surface-variant text-sm mb-8 flex-grow">
                Faites votre don en toute sécurité via Mobile Money (MTN, Moov, Celtiis) ou par carte bancaire.
              </p>
              
              <a 
                href="https://chapchap.kkiapay.me/742aF0blmCbflT4H-1186" 
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
              <h2 className="font-display font-bold text-2xl text-primary mb-3">
                Paiement par Code USSD
              </h2>
              <p className="text-on-surface-variant text-sm mb-8 flex-grow">
                Vous n'avez pas de connexion internet ? Tapez simplement ce code sur votre téléphone.
              </p>
              
              <div className="w-full bg-surface-container-low border border-outline-variant/30 py-4 px-4 rounded-2xl mb-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 font-mono font-bold text-xl md:text-2xl tracking-widest text-primary flex items-center justify-center">
                  *616*41*1186*<span className="text-secondary mx-1 text-sm md:text-lg">montant</span>#
                </span>
              </div>
              
              <p className="text-xs text-on-surface-variant font-medium">
                Saisissez le code puis validez pour finaliser l'opération.
              </p>
            </div>

          </div>

          {/* Bottom Message */}
          <div className="mt-12 bg-primary text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <Heart className="w-12 h-12 text-secondary mx-auto mb-6 opacity-90" />
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 relative z-10">
              Votre générosité fait la différence
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base relative z-10">
              Chaque don, qu'il soit petit ou grand, contribue à l'avancement du Royaume de Dieu, à l'organisation de nos cultes et au soutien de nos différentes actions d'évangélisation. Que Dieu vous bénisse abondamment.
            </p>
          </div>

        </section>
      </main>
    </ConditionalLayout>
  );
}
