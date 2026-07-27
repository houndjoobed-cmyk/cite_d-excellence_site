"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChurchMember } from "@/lib/store/adminStore";
import { fetchChurchMembers, deleteChurchMember } from "@/lib/services/churchMembersService";
import MemberDetailsModal from "@/components/members/MemberDetailsModal";
import { Search, Plus, CreditCard, Trash2, MapPin, Users, UserPlus, Edit2, Download } from "lucide-react";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<ChurchMember[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("Tous");
  const [selectedMember, setSelectedMember] = useState<ChurchMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchChurchMembers();
      setMembers(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    setMembers(members.filter(m => m.id !== id));
    await deleteChurchMember(id);
  };

  const filteredMembers = members.filter(m => {
    const matchesDept = selectedDept === "Tous" || m.department === selectedDept;
    const matchesSearch = `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.memberNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleExportCSV = () => {
    if (members.length === 0) return;

    // Headers
    const headers = [
      "Matricule", "Nom", "Prénom", "Sexe", "Date de naissance", "Téléphone", "Email",
      "Quartier", "Adresse", "Profession", "Filière / Domaine", "Origine Ethnique", "Situation Matrimoniale", "Département", "Statut",
      "Contact d'urgence (Nom)", "Contact d'urgence (Tél)",
      "Date d'arrivée", "Date de conversion", "Situation Baptismale", "Date de baptême"
    ];

    // Data Rows
    const rows = members.map(m => [
      m.memberNumber,
      m.lastName,
      m.firstName,
      m.gender || "",
      m.birthDate || "",
      m.phone || "",
      m.email || "",
      m.neighborhood || "",
      m.address || "",
      m.profession || "",
      m.activityDomain || "",
      m.ethnicOrigin || "",
      m.maritalStatus || "",
      m.department || "",
      m.status || "",
      m.emergencyContactName || "",
      m.emergencyContactPhone || m.emergencyContact || "",
      m.churchArrivalDate || "",
      m.conversionDate || "",
      m.baptismStatus || "",
      m.baptismDate || ""
    ]);

    // Construct CSV
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(str => `"${String(str).replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    // Download
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Fideles_Houekin_Ministries_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Annuaire Pastoral & Cartes des Fidèles</h2>
          <p className="text-xs text-on-surface-variant">
            {isLoading 
              ? "Chargement des données en cours..."
              : members.length > 0
                ? `${members.length} fidèle(s) enregistré(s) dans la base de données.`
                : "Aucun fidèle enregistré. Commencez par ajouter un membre."
            }
          </p>
        </div>

        <div className="flex gap-2">
          {members.length > 0 && (
            <button
              onClick={handleExportCSV}
              className="bg-surface-container-low hover:bg-surface-container text-primary border border-outline-variant/30 px-5 py-3 rounded-2xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
              title="Télécharger la liste Excel/CSV"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Excel</span>
            </button>
          )}
          <Link
            href="/admin/members/new"
            className="bg-primary hover:bg-primary-container text-white px-5 py-3 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Membre & Carte</span>
          </Link>
        </div>
      </div>

      {/* Search & Filters — only show if there are members */}
      {members.length > 0 && (
        <div className="bg-white p-4 rounded-3xl border border-outline-variant/20 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-surface-container-low px-3 py-2 rounded-2xl border border-outline-variant/20 flex items-center gap-2 text-xs">
            <Search className="w-4 h-4 text-on-surface-variant ml-1" />
            <input
              type="text"
              placeholder="Rechercher par nom, matricule HM-2026, quartier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-on-surface font-medium"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/20 rounded-2xl px-4 py-2 text-xs font-semibold text-on-surface focus:outline-none"
          >
            <option value="Tous">Tous les Départements</option>
            <option value="Média & Communication">Média & Communication</option>
            <option value="Louange & Adoration">Louange & Adoration</option>
            <option value="Accueil & Protocole">Accueil & Protocole</option>
            <option value="Intercession & Prières">Intercession & Prières</option>
            <option value="Département des Femmes">Département des Femmes</option>
            <option value="Jeunesse d'Excellence">Jeunesse d'Excellence</option>
            <option value="École du Dimanche (Enfants)">École du Dimanche</option>
            <option value="Aucun / Fidèle membre">Aucun / Fidèle membre</option>
          </select>
        </div>
      )}

      {/* Skeleton Loading State */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md flex flex-col justify-between space-y-4 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 rounded-2xl bg-surface-container-low shrink-0 border-2 border-outline-variant/10"></div>
                <div className="space-y-2 w-full pt-1">
                  <div className="h-3 bg-surface-container-low rounded-md w-1/4"></div>
                  <div className="h-4 bg-surface-container-low rounded-md w-3/4"></div>
                  <div className="h-3 bg-surface-container-low rounded-md w-1/3"></div>
                  <div className="h-3 bg-surface-container-low rounded-md w-1/2 mt-2"></div>
                </div>
              </div>
              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <div className="h-5 bg-surface-container-low rounded-xl w-24"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-28 bg-surface-container-low rounded-xl"></div>
                  <div className="h-8 w-8 bg-surface-container-low rounded-xl"></div>
                  <div className="h-8 w-8 bg-surface-container-low rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && members.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-outline-variant/20 shadow-md text-center space-y-4">
          <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto">
            <UserPlus className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-primary">Aucun fidèle enregistré</h3>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            La base de données est vide. Cliquez sur le bouton ci-dessous pour enregistrer votre premier fidèle et générer sa carte d'identité officielle.
          </p>
          <Link
            href="/admin/members/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-2xl font-bold text-xs transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Enregistrer le premier fidèle</span>
          </Link>
        </div>
      )}

      {/* Members Grid */}
      {!isLoading && filteredMembers.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md flex flex-col justify-between space-y-4 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-start gap-4">
                {member.photoUrl ? (
                  <img
                    src={member.photoUrl}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-16 h-20 rounded-2xl object-cover border-2 border-secondary shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-16 h-20 rounded-2xl bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center text-secondary font-display font-bold text-lg shrink-0">
                    {member.firstName?.[0]}{member.lastName?.[0]}
                  </div>
                )}
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-mono font-bold rounded-md inline-block">
                    {member.memberNumber}
                  </span>
                  <h3 className="font-display font-bold text-base text-primary leading-tight">
                    {member.lastName.toUpperCase()} {member.firstName}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-medium">{member.profession}</p>
                  <div className="flex items-center gap-1 text-[11px] text-on-surface-variant pt-1">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span>{member.neighborhood}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 bg-surface-container-low text-on-surface font-bold rounded-xl text-[10px]">
                  {member.department || "Fidèle membre"}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}
                    className="px-3.5 py-1.5 bg-primary text-white font-bold rounded-xl text-[11px] hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Voir Fiche & Carte</span>
                  </button>
                  <Link
                    href={`/admin/members/${member.id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleDelete(member.id); }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Member Details & Card Modal */}
      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

    </div>
  );
}
