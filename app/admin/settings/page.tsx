"use client";

import { useState, useEffect } from "react";
import { fetchSettings, updateSettings, ChurchSettings } from "@/lib/services/settingsService";
import { Save, CheckCircle2, Building, Smartphone, Landmark, Share2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [churchName, setChurchName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [kkiapayLink, setKkiapayLink] = useState("");
  const [kkiapayUssd, setKkiapayUssd] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await fetchSettings();
      setChurchName(data.churchName);
      setSubtitle(data.subtitle);
      setAddress(data.address);
      setPhone(data.phone);
      setWhatsapp(data.whatsapp);
      setEmail(data.email);
      setKkiapayLink(data.kkiapayLink);
      setKkiapayUssd(data.kkiapayUssd);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSettings: ChurchSettings = {
      id: 'default',
      churchName,
      subtitle,
      address,
      phone,
      whatsapp,
      email,
      kkiapayLink,
      kkiapayUssd
    };

    const success = await updateSettings(newSettings);
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert("Erreur lors de la sauvegarde.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Paramètres Général de l'Église</h2>
          <p className="text-xs text-on-surface-variant">Modifiez les coordonnées, numéros de don et réseaux sociaux.</p>
        </div>

        {saved && (
          <span className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-2xl animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Modifications enregistrées !</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className={`space-y-6 text-xs ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
        
        {/* Section 1: General Info */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-outline-variant/20">
            <Building className="w-4 h-4 text-secondary" />
            <span>Identité & Coordonnées</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">Nom de l'Église</label>
              <input
                type="text"
                value={churchName}
                onChange={(e) => setChurchName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">Sous-titre / Slogan</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">Adresse à Cotonou</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">Téléphone Principal</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">Numéro WhatsApp</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Paiements & Dons (Kkiapay) */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-outline-variant/20">
            <Landmark className="w-4 h-4 text-secondary" />
            <span>Paramètres de Paiement (Kkiapay)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-on-surface mb-1">Lien de paiement Kkiapay</label>
              <input
                type="text"
                value={kkiapayLink}
                onChange={(e) => setKkiapayLink(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 font-mono text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="https://chapchap.kkiapay.me/..."
              />
            </div>

            <div>
              <label className="block font-bold text-on-surface mb-1">Code USSD Kkiapay</label>
              <input
                type="text"
                value={kkiapayUssd}
                onChange={(e) => setKkiapayUssd(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 font-mono text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="*616*..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl text-xs transition-colors shadow-lg flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les paramètres</span>
          </button>
        </div>

      </form>

    </div>
  );
}
