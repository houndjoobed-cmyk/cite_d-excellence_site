"use client";

import { useState } from "react";
import Link from "next/link";
import { CHURCH_INFO, DEPARTMENTS } from "@/lib/constants";
import { registerMemberCandidate } from "@/lib/services/membersService";
import { 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Send,
  MessageCircle
} from "lucide-react";

export default function JoinDepartmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [selectedDept, setSelectedDept] = useState("Média & Communication");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("Dimanche matin");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setLoading(true);
    await registerMemberCandidate({
      fullName,
      email,
      phone,
      neighborhood,
      department: selectedDept,
      skills,
      availability
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 px-4 md:px-margin-desktop relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed font-extrabold text-xs tracking-wider uppercase rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Engagez vos Talents
          </span>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">
            Rejoignez un Département & Servez avec Excellence
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Chaque membre a une grâce unique pour impacter le Royaume. Découvrez nos départements et mettez vos dons au service de la communauté à Cotonou.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 md:px-margin-desktop">
        
        {submitted ? (
          /* Confirmation State */
          <div className="bg-white rounded-3xl p-8 md:p-12 text-center space-y-6 border border-outline-variant/20 shadow-xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-primary">
              Candidature Transmise avec Succès !
            </h2>
            <p className="text-sm text-on-surface-variant max-w-lg mx-auto leading-relaxed">
              Que le Seigneur bénisse votre disposition de cœur, <strong className="text-on-surface">{fullName}</strong>. Notre équipe responsable du département <strong className="text-secondary">{selectedDept}</strong> prendra contact avec vous dans les 48h.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${CHURCH_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour Pasteur, je viens de postuler pour rejoindre le département ${selectedDept}. Mon nom est ${fullName}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmer directement sur WhatsApp</span>
              </a>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 bg-surface-container-low hover:bg-surface-container text-on-surface font-bold rounded-2xl text-xs transition-colors"
              >
                Retourner à l'Accueil
              </Link>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-outline-variant/20 space-y-8">
            
            {/* Step 1: Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
                <span className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">1</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-primary">Vos Coordonnées</h3>
                  <p className="text-xs text-on-surface-variant">Pour que le responsable de département puisse vous contacter</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Nom & Prénom *</label>
                  <input
                    type="text"
                    placeholder="Ex: Jean DOSSOU"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="+229 97 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Adresse Email</label>
                  <input
                    type="email"
                    placeholder="jean@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Quartier / Ville à Cotonou</label>
                  <input
                    type="text"
                    placeholder="Ex: Fidjrossè / Cadjehoun / Akpakpa"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Department Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
                <span className="w-8 h-8 rounded-full bg-secondary text-white font-bold flex items-center justify-center text-xs">2</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-primary">Choix du Département</h3>
                  <p className="text-xs text-on-surface-variant">Sélectionnez le ministère dans lequel vous souhaitez servir</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {DEPARTMENTS.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() => setSelectedDept(dept.name)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-1 ${
                      selectedDept === dept.name
                        ? "border-secondary bg-secondary/10 shadow-md"
                        : "border-outline-variant/20 hover:border-outline-variant/50 bg-surface-container-low"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-on-surface">{dept.name}</span>
                      {selectedDept === dept.name && <CheckCircle2 className="w-4 h-4 text-secondary" />}
                    </div>
                    <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Skills & Availability */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
                <span className="w-8 h-8 rounded-full bg-tertiary text-white font-bold flex items-center justify-center text-xs">3</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-primary">Vos Talents & Disponibilités</h3>
                  <p className="text-xs text-on-surface-variant">Décrivez vos compétences pratiques et vos disponibilités</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Compétences / Expériences (Optionnel)</label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Expérience en prise de vue, chant, accueil du public, secourisme..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Disponibilités Préférées</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                  >
                    <option value="Dimanche matin">Cultes dominicaux (Dimanche matin)</option>
                    <option value="Vendredi soir">Veillées de prière (Vendredi soir)</option>
                    <option value="Mercredi soir">Étude biblique (Mercredi soir)</option>
                    <option value="Flexible">Disponibilité flexible selon les besoins</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Soumettre ma Candidature d'Engagement</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
