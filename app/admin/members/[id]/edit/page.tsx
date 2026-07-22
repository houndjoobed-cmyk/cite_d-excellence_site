"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { fetchChurchMembers, updateChurchMember } from "@/lib/services/churchMembersService";
import { ChurchMember } from "@/lib/store/adminStore";
import PhotoUploader from "@/components/members/PhotoUploader";
import { ArrowLeft, Save, CheckCircle2, AlertCircle } from "lucide-react";

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Partial<ChurchMember>>({});

  useEffect(() => {
    async function loadMember() {
      const allMembers = await fetchChurchMembers();
      const found = allMembers.find(m => m.id === id);
      if (found) {
        setFormData(found);
      }
      setLoading(false);
    }
    if (id) loadMember();
  }, [id]);

  const handleChange = (field: keyof ChurchMember, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lastName || !formData.firstName) {
      setError("Le nom et le prénom sont obligatoires.");
      return;
    }
    setError("");
    setSaving(true);
    const { success } = await updateChurchMember(id, formData);
    setSaving(false);
    if (success) {
      setSaved(true);
      setTimeout(() => router.push("/admin/members"), 2000);
    } else {
      setError("Erreur lors de la mise à jour.");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-on-surface-variant">Chargement des informations...</div>;
  }

  if (!formData.id) {
    return <div className="text-center py-20 text-rose-600 font-bold">Membre introuvable.</div>;
  }

  if (saved) {
    return (
      <div className="max-w-xl mx-auto mt-20 bg-white p-10 rounded-3xl shadow-xl text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-bold text-primary">Informations Mises à Jour</h2>
        <p className="text-on-surface-variant">Redirection vers l'annuaire...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/admin/members" className="p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="font-display font-bold text-xl text-primary">Modifier : {formData.firstName} {formData.lastName}</h2>
            <p className="text-xs text-on-surface-variant">Matricule: {formData.memberNumber}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 flex items-center gap-2 text-rose-800 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl border border-outline-variant/20 space-y-8">
        
        {/* Section 1: Identité */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-primary border-b pb-2">1. Identité</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Nom</label>
              <input type="text" value={formData.lastName || ""} onChange={e => handleChange("lastName", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Prénom(s)</label>
              <input type="text" value={formData.firstName || ""} onChange={e => handleChange("firstName", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" required />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Sexe</label>
              <select value={formData.gender || ""} onChange={e => handleChange("gender", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Date de naissance</label>
              <input type="date" value={formData.birthDate || ""} onChange={e => handleChange("birthDate", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Situation Matrimoniale</label>
              <select value={formData.maritalStatus || ""} onChange={e => handleChange("maritalStatus", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="Célibataire">Célibataire</option>
                <option value="Marié(e)">Marié(e)</option>
                <option value="Veuf/Veuve">Veuf / Veuve</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Profession</label>
              <input type="text" value={formData.profession || ""} onChange={e => handleChange("profession", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Niveau d'études</label>
              <select value={formData.educationLevel || ""} onChange={e => handleChange("educationLevel", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="">Sélectionner</option>
                <option value="Primaire">Primaire</option>
                <option value="Secondaire">Secondaire / Collège</option>
                <option value="BAC">BAC</option>
                <option value="Licence">Licence</option>
                <option value="Master / DESS">Master / DESS</option>
                <option value="Doctorat">Doctorat</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Domaine d'Activité / Filière</label>
              <input type="text" value={formData.activityDomain || ""} onChange={e => handleChange("activityDomain", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Origine Ethnique</label>
              <input type="text" value={formData.ethnicOrigin || ""} onChange={e => handleChange("ethnicOrigin", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
          <PhotoUploader value={formData.photoUrl || ""} onChange={url => handleChange("photoUrl", url)} />
        </div>

        {/* Section 2: Coordonnées & Urgence */}
        <div className="space-y-4 pt-4 border-t border-outline-variant/20">
          <h3 className="font-bold text-lg text-primary border-b pb-2">2. Coordonnées & Urgence</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Téléphone</label>
              <input type="tel" value={formData.phone || ""} onChange={e => handleChange("phone", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Adresse Email</label>
              <input type="email" value={formData.email || ""} onChange={e => handleChange("email", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Quartier</label>
              <input type="text" value={formData.neighborhood || ""} onChange={e => handleChange("neighborhood", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Adresse Détaillée</label>
              <input type="text" value={formData.address || ""} onChange={e => handleChange("address", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div className="sm:col-span-2 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
              <h4 className="font-bold text-xs text-rose-900 mb-3 uppercase tracking-wider">Contact d'urgence</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 text-rose-900">Nom complet</label>
                  <input type="text" value={formData.emergencyContactName || ""} onChange={e => handleChange("emergencyContactName", e.target.value)} className="w-full bg-white border border-rose-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 text-rose-900">Numéro de téléphone</label>
                  <input type="tel" value={formData.emergencyContactPhone || ""} onChange={e => handleChange("emergencyContactPhone", e.target.value)} className="w-full bg-white border border-rose-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Parcours Spirituel */}
        <div className="space-y-4 pt-4 border-t border-outline-variant/20">
          <h3 className="font-bold text-lg text-primary border-b pb-2">3. Parcours Spirituel</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Date d'arrivée</label>
              <input type="date" value={formData.churchArrivalDate || ""} onChange={e => handleChange("churchArrivalDate", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Date de conversion</label>
              <input type="date" value={formData.conversionDate || ""} onChange={e => handleChange("conversionDate", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Situation Baptismale</label>
              <select value={formData.baptismStatus || ""} onChange={e => {
                handleChange("baptismStatus", e.target.value);
                if (e.target.value !== "Oui") handleChange("baptismDate", "");
              }} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="">Sélectionner</option>
                <option value="Oui">Oui, je suis baptisé(e) par immersion</option>
                <option value="Non">Non, pas encore</option>
              </select>
            </div>
            {formData.baptismStatus === "Oui" && (
              <div className="animate-fade-in">
                <label className="block text-xs font-bold mb-1">Date de baptême</label>
                <input type="date" value={formData.baptismDate || ""} onChange={e => handleChange("baptismDate", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
            )}
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold mb-1">Dons spirituels</label>
              <textarea rows={2} value={formData.spiritualGifts || ""} onChange={e => handleChange("spiritualGifts", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
        </div>

        {/* Section 4: Église & Département */}
        <div className="space-y-4 pt-4 border-t border-outline-variant/20">
          <h3 className="font-bold text-lg text-primary border-b pb-2">4. Église & Département</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Département</label>
              <select value={formData.department || ""} onChange={e => handleChange("department", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="Média & Communication">Média & Communication</option>
                <option value="Louange & Adoration">Louange & Adoration</option>
                <option value="Accueil & Protocole">Accueil & Protocole</option>
                <option value="Intercession & Prières">Intercession & Prières</option>
                <option value="Département des Femmes">Département des Femmes</option>
                <option value="Jeunesse d'Excellence">Jeunesse d'Excellence</option>
                <option value="École du Dimanche (Enfants)">École du Dimanche (Enfants)</option>
                <option value="Aucun / Fidèle membre">Aucun / Fidèle membre</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Statut</label>
              <select value={formData.status || ""} onChange={e => handleChange("status", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary">
                <option value="Membre Actif">Membre Actif</option>
                <option value="Nouveau">Nouveau Fidèle</option>
                <option value="Ancien">Ancien d'Église</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Responsable de cellule</label>
              <input type="text" value={formData.cellLeader || ""} onChange={e => handleChange("cellLeader", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Cellule ou Groupe</label>
              <input type="text" value={formData.cellGroup || ""} onChange={e => handleChange("cellGroup", e.target.value)} className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t flex justify-end">
          <button type="submit" disabled={saving} className="px-8 py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-xl flex items-center gap-2 shadow-md disabled:opacity-50">
            <Save className="w-5 h-5" />
            <span>{saving ? "Sauvegarde..." : "Enregistrer les modifications"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
