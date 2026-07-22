"use client";

import { useState } from "react";
import { CHURCH_INFO } from "@/lib/constants";
import { submitContactMessage } from "@/lib/services/messagesService";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Sujet de prière / Accompagnement");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);
    await submitContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-background">
      <div className="bg-inverse-surface text-white py-16 px-4 md:px-margin-desktop text-center">
        <span className="text-secondary-fixed font-bold text-xs tracking-widest uppercase block mb-2">Restons en Contact</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4">Contactez-nous</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base">
          Nous sommes à votre écoute pour toute question, sujet de prière ou demande d'information.
        </p>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto py-16 grid md:grid-cols-2 gap-12">
        
        {/* Contact Information & Map */}
        <div className="space-y-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-primary mb-4">Nos Coordonnées</h2>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Rendez-nous visite ou contactez notre secrétariat pastoral du Lundi au Samedi.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-outline-variant/30 shadow-sm">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-on-surface">Adresse</h4>
                  <p className="text-on-surface-variant text-xs">{CHURCH_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-outline-variant/30 shadow-sm">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-on-surface">Téléphone</h4>
                  <p className="text-on-surface-variant text-xs">{CHURCH_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-outline-variant/30 shadow-sm">
                <MessageCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-on-surface">WhatsApp</h4>
                  <p className="text-on-surface-variant text-xs">{CHURCH_INFO.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-outline-variant/30 shadow-sm">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-on-surface">Email</h4>
                  <p className="text-on-surface-variant text-xs">{CHURCH_INFO.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="rounded-3xl overflow-hidden border-2 border-outline-variant/30 shadow-md h-64 bg-surface-container-low flex items-center justify-center text-center p-6">
            <div className="space-y-2">
              <MapPin className="w-8 h-8 text-primary mx-auto" />
              <p className="font-display font-bold text-sm text-on-surface">Sanctuaire Principal - HOUEKIN MINISTRIES</p>
              <p className="text-xs text-on-surface-variant">Cotonou, Bénin</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-3xl border border-secondary/20 shadow-lg space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-display font-bold text-2xl text-primary">Message Envoyé !</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                Merci <strong className="text-on-surface">{name}</strong>. Votre message et sujet de prière ont bien été transmis à l'équipe pastorale.
              </p>
              <button
                onClick={() => { setSubmitted(false); setMessage(""); }}
                className="px-6 py-2.5 bg-surface-container-low text-on-surface font-bold text-xs rounded-2xl hover:bg-surface-container"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="font-display font-bold text-2xl text-primary">Envoyez-nous un Message</h3>
                <p className="text-xs text-on-surface-variant mt-1">Remplissez ce formulaire et notre équipe vous répondra rapidement.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Nom complet *</label>
                  <input
                    type="text"
                    placeholder="Votre nom et prénom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">Adresse Email</label>
                  <input
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="+229 XX XX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">Sujet</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                  >
                    <option>Sujet de prière / Accompagnement</option>
                    <option>Visite à l'église</option>
                    <option>Renseignement général</option>
                    <option>Rejoindre un département</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-on-surface mb-1">Votre Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Écrivez votre message ici..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-full text-xs hover:bg-primary-container transition-colors shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                >
                  {loading ? (
                    <span>Enregistrement en cours...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
