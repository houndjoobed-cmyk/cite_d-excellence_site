"use client";

import { useState } from "react";
import { ChurchMember } from "@/lib/store/adminStore";
import MemberCard from "./MemberCard";
import { 
  X, 
  CreditCard, 
  UserCheck, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  Church, 
  ShieldCheck, 
  HeartHandshake,
  MessageCircle,
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles
} from "lucide-react";

interface MemberDetailsModalProps {
  member: ChurchMember;
  onClose: () => void;
}

export default function MemberDetailsModal({ member, onClose }: MemberDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'card' | 'details'>('card');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl border border-white/20 relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Tabs */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'card'
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Carte du Fidèle</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'details'
                  ? "bg-secondary text-white shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Fiche Détaillée Complète</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab 1: ID Card View */}
        {activeTab === 'card' && (
          <div className="space-y-4 text-center">
            <MemberCard member={member} />
          </div>
        )}

        {/* Tab 2: Full Member File (All 22 Fields) */}
        {activeTab === 'details' && (
          <div className="space-y-6 text-xs text-on-surface leading-relaxed animate-fade-in">
            
            {/* Top Profile Summary */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-3xl bg-surface-container-low border border-outline-variant/20">
              <img
                src={member.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"}
                alt={`${member.firstName} ${member.lastName}`}
                className="w-20 h-24 object-cover rounded-2xl border-2 border-secondary shadow-md shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left">
                <span className="px-2.5 py-0.5 bg-secondary text-white text-[10px] font-mono font-extrabold rounded-full">
                  {member.memberNumber}
                </span>
                <h3 className="font-display font-extrabold text-xl text-primary">
                  {member.lastName.toUpperCase()} {member.firstName}
                </h3>
                <p className="text-on-surface-variant font-medium">{member.profession} • {member.maritalStatus}</p>
                <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                    {member.status}
                  </span>
                  {member.department && (
                    <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary rounded-full font-bold text-[10px]">
                      {member.department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 1: Identité Personnelle */}
            <div className="bg-white p-5 rounded-3xl border border-outline-variant/20 space-y-3">
              <h4 className="font-display font-bold text-sm text-primary border-b border-outline-variant/10 pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>1. Identité & État Civil</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Nom & Prénoms</span>
                  <span className="font-bold text-on-surface">{member.lastName.toUpperCase()} {member.firstName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Sexe</span>
                  <span className="font-bold text-on-surface">{member.gender}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Date de Naissance</span>
                  <span className="font-bold text-on-surface font-mono">{member.birthDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Situation Matrimoniale</span>
                  <span className="font-bold text-on-surface">{member.maritalStatus}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Profession</span>
                  <span className="font-bold text-on-surface">{member.profession}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Niveau d'études</span>
                  <span className="font-bold text-on-surface">{member.educationLevel || "Non renseigné"}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Coordonnées & Urgence */}
            <div className="bg-white p-5 rounded-3xl border border-outline-variant/20 space-y-3">
              <h4 className="font-display font-bold text-sm text-primary border-b border-outline-variant/10 pb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>2. Coordonnées & Contacts d'Urgence</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Téléphone / WhatsApp</span>
                  <span className="font-bold text-on-surface flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-secondary" />
                    <span>{member.phone}</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Adresse Email</span>
                  <span className="font-bold text-on-surface">{member.email || "Non renseignée"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Quartier / Ville à Cotonou</span>
                  <span className="font-bold text-on-surface">{member.neighborhood}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Adresse Détaillée</span>
                  <span className="font-bold text-on-surface">{member.address}</span>
                </div>
              </div>

              <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 mt-2">
                <span className="text-[10px] font-bold text-rose-900 block">Contact en cas d'urgence :</span>
                <span className="font-bold text-rose-950 text-xs">{member.emergencyContact}</span>
              </div>
            </div>

            {/* Section 3: Parcours Spirituel */}
            <div className="bg-white p-5 rounded-3xl border border-outline-variant/20 space-y-3">
              <h4 className="font-display font-bold text-sm text-primary border-b border-outline-variant/10 pb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span>3. Parcours Spirituel</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Date d'arrivée</span>
                  <span className="font-bold text-on-surface">{member.churchArrivalDate || "Non renseignée"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Date de Conversion</span>
                  <span className="font-bold text-on-surface">{member.conversionDate || "Non renseignée"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Baptême par immersion</span>
                  <span className="font-bold text-on-surface">{member.baptismDate || "Non renseignée"}</span>
                </div>
              </div>
              {member.spiritualGifts && (
                <div className="pt-2">
                  <span className="text-[10px] text-on-surface-variant block">Dons spirituels & Ministères :</span>
                  <span className="font-medium text-on-surface">{member.spiritualGifts}</span>
                </div>
              )}
            </div>

            {/* Section 4: Église & Cellule */}
            <div className="bg-white p-5 rounded-3xl border border-outline-variant/20 space-y-3">
              <h4 className="font-display font-bold text-sm text-primary border-b border-outline-variant/10 pb-2 flex items-center gap-2">
                <Church className="w-4 h-4 text-secondary" />
                <span>4. Engagement dans l'Église & Cellule</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Département principal</span>
                  <span className="font-bold text-secondary">{member.department || "Aucun"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Responsable de cellule</span>
                  <span className="font-bold text-on-surface">{member.cellLeader || "Non attribué"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Cellule de maison</span>
                  <span className="font-bold text-on-surface">{member.cellGroup || "Aucune"}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact Action Button */}
            <div className="pt-2 flex justify-end">
              <a
                href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${member.firstName}, message du secrétariat HOUEKIN MINISTRIES concernant votre fiche membre.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs transition-colors shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contacter sur WhatsApp ({member.phone})</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
