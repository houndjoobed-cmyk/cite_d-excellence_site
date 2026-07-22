"use client";

import { useState } from "react";
import { submitAppointment } from "@/lib/services/appointmentService";
import { Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function AppointmentPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState<"10:00" | "15:00" | "">("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setError("");
    
    if (val) {
      const selected = new Date(val);
      // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday
      if (selected.getDay() !== 3) {
        setError("Le pasteur reçoit uniquement les Mercredis. Veuillez choisir un mercredi valide.");
        setAppointmentDate("");
        return;
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setError("Vous ne pouvez pas choisir une date passée.");
        setAppointmentDate("");
        return;
      }
    }
    
    setAppointmentDate(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !reason || !appointmentDate || !appointmentTime) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    await submitAppointment({
      fullName,
      phone,
      reason,
      appointmentDate,
      appointmentTime
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-surface min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-4 md:px-margin-desktop">
        
        <div className="text-center mb-10 space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-primary">Prendre Rendez-vous</h1>
          <p className="text-on-surface-variant max-w-lg mx-auto text-sm leading-relaxed">
            Le secrétariat pastoral vous permet de réserver un créneau pour échanger avec le pasteur.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white p-10 rounded-3xl border border-secondary/20 shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary">Demande Envoyée !</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Merci <strong>{fullName}</strong>. Votre demande de rendez-vous pour le <strong>{new Date(appointmentDate).toLocaleDateString("fr-FR")} à {appointmentTime}</strong> a bien été transmise à notre équipe.
            </p>
            <p className="text-xs text-on-surface bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 inline-block">
              Le secrétariat pastoral vous contactera bientôt au <strong>{phone}</strong> pour confirmer votre créneau.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setReason("");
                  setAppointmentDate("");
                  setAppointmentTime("");
                }}
                className="px-6 py-3 bg-surface-container text-on-surface font-bold text-xs rounded-2xl hover:bg-surface-container-high transition-colors"
              >
                Faire une nouvelle demande
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 md:p-10 rounded-3xl border border-outline-variant/20 shadow-xl">
            
            <div className="bg-tertiary/10 border border-tertiary/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <Info className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
              <div className="text-xs text-on-surface font-medium leading-relaxed">
                <strong>Attention :</strong> Les réceptions pastorales se font <strong>uniquement les Mercredis</strong> à 10h00 ou à 15h00. (Les mercredis soir étant consacrés au Culte de Famille de 19h à 21h).
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 mb-6 flex items-start gap-3 text-xs font-bold animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-secondary" /> Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: ADJAVO Grâce"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-secondary" /> Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+229 97 00 00 00"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface">Motif de la rencontre *</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Expliquez brièvement l'objet de votre rendez-vous (conseil, prière, etc.)"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/20 grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-secondary" /> Date (Mercredi uniquement) *
                  </label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={handleDateChange}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-secondary" /> Heure *
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setAppointmentTime("10:00")}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border ${
                        appointmentTime === "10:00" 
                          ? "bg-primary text-white border-primary shadow-md" 
                          : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:border-primary/50"
                      }`}
                    >
                      10H00
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppointmentTime("15:00")}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all border ${
                        appointmentTime === "15:00" 
                          ? "bg-primary text-white border-primary shadow-md" 
                          : "bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:border-primary/50"
                      }`}
                    >
                      15H00
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-bold rounded-2xl text-sm hover:bg-primary-container transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                >
                  {loading ? "Enregistrement..." : "Soumettre ma demande"}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
