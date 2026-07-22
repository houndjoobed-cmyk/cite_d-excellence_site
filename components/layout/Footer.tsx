"use client";

import Link from "next/link";
import { CHURCH_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail, Send, Facebook, Youtube, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-16">
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo HOUEKIN MINISTRIES"
              className="w-10 h-10 object-contain"
            />
            <div>
              <span className="font-display font-bold text-lg text-primary block leading-tight">
                {CHURCH_INFO.name}
              </span>
              <span className="font-display text-xs text-secondary tracking-widest uppercase block font-semibold">
                {CHURCH_INFO.subtitle}
              </span>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            {CHURCH_INFO.tagline}
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href={CHURCH_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={CHURCH_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={CHURCH_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={CHURCH_INFO.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-display font-bold text-primary mb-5 text-base">Liens Rapides</h4>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                À propos de l'Église
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-primary transition-colors">
                Nos Programmes & Cultes
              </Link>
            </li>
            <li>
              <Link href="/sermons" className="hover:text-primary transition-colors">
                Bibliothèque de Prédications
              </Link>
            </li>
            <li>
              <Link href="/departments" className="hover:text-primary transition-colors">
                Départements & Ministères
              </Link>
            </li>
            <li>
              <Link href="/give" className="hover:text-primary transition-colors font-semibold text-secondary">
                Faire un Don & Soutenir
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h4 className="font-display font-bold text-primary mb-5 text-base">Contact & Localisation</h4>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
              <span>{CHURCH_INFO.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
              <span>{CHURCH_INFO.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
              <span>{CHURCH_INFO.email}</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="font-display font-bold text-primary mb-5 text-base">Newsletter Prophétique</h4>
          <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
            Inscrivez-vous pour recevoir les messages d'édification et l'agenda des conférences.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="bg-surface-container border border-outline-variant/30 rounded-l-xl px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-secondary text-on-surface"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-container text-white px-4 rounded-r-xl transition-colors flex items-center justify-center"
              aria-label="S'abonner"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto mt-12 pt-6 border-t border-outline-variant/20 text-center text-xs text-on-surface-variant/70 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} {CHURCH_INFO.name} - {CHURCH_INFO.subtitle}. Tous droits réservés.</p>
        <p className="font-medium text-secondary">Bâtir une Génération d'Excellence</p>
      </div>
    </footer>
  );
}
