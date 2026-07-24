"use client";

import { useState } from "react";
import { ChurchMember } from "@/lib/store/adminStore";
import { QrCode, Printer, Download, Sparkles, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface MemberCardProps {
  member: ChurchMember;
  onPrint?: () => void;
}

const CardContent = ({ member, isPdfMode = false }: { member: ChurchMember, isPdfMode?: boolean }) => {
  return (
    <div 
      id={isPdfMode ? `pdf-member-card-${member.id}` : `member-card-${member.id}`}
      className={`mx-auto bg-gradient-to-br from-inverse-surface via-primary to-inverse-surface text-white shadow-2xl border-2 border-secondary/40 relative overflow-hidden text-left ${
        isPdfMode 
          ? "w-[450px] rounded-3xl p-6" 
          : "w-full max-w-[450px] rounded-2xl sm:rounded-3xl p-4 sm:p-6"
      }`}
    >
      {/* Holographic background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-container/30 rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-start sm:items-center justify-between pb-4 border-b border-white/20 relative z-10 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/logo.png"
            alt="Logo HOUEKIN MINISTRIES"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow shrink-0"
          />
          <div>
            <span className="font-display font-extrabold text-sm text-white block leading-tight tracking-wide">
              HOUEKIN MINISTRIES
            </span>
            <span className="font-display text-[9px] text-secondary-fixed tracking-widest uppercase block font-semibold">
              LA CITÉ D'EXCELLENCE
            </span>
          </div>
        </div>

        <div className="px-2.5 py-1 bg-secondary text-white text-[9px] font-extrabold uppercase rounded-full tracking-wider shadow-sm shrink-0 self-center sm:self-auto text-center inline-block">
          <Sparkles className="w-2.5 h-2.5 inline-block mr-1 align-text-bottom" />
          <span className={isPdfMode ? "" : "hidden sm:inline"}>CARTE</span> OFFICIELLE
        </div>
      </div>

      {/* Card Body: Photo & Details */}
      <div className="py-5 grid grid-cols-3 gap-4 items-center relative z-10">
        
        {/* Photo Frame */}
        <div className="col-span-1 text-center space-y-1.5 flex justify-center">
          <div className="relative inline-block">
            <img
              src={member.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-2xl border-2 border-secondary shadow-lg mx-auto block"
              crossOrigin="anonymous" // Important for html2canvas
            />
            <div className="absolute -bottom-2 inset-x-0 w-full text-center">
              <span className="inline-block px-2 py-0.5 bg-emerald-600 text-[8px] font-bold text-white rounded-full uppercase tracking-wider shadow whitespace-nowrap">
                {member.status}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="col-span-2 space-y-2 text-xs">
          <div>
            <span className="text-[10px] text-secondary-fixed font-mono uppercase tracking-wider block font-semibold mb-1">
              Matricule Membre
            </span>
            <span className="font-mono font-extrabold text-sm text-white bg-white/10 px-2.5 py-1 rounded-xl border border-white/15 inline-block">
              {member.memberNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-white/70 block">Nom & Prénoms</span>
            <span className="font-display font-extrabold text-sm text-white block leading-tight">
              {member.lastName.toUpperCase()} {member.firstName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-[9px] text-white/60 block">Sexe</span>
              <span className="font-semibold text-white">{member.gender}</span>
            </div>
            <div>
              <span className="text-[9px] text-white/60 block">Né(e) le</span>
              <span className="font-semibold text-white font-mono">{member.birthDate}</span>
            </div>
          </div>

          {member.department && (
            <div>
              <span className="text-[9px] text-white/60 block">Département</span>
              <span className="font-bold text-secondary-fixed text-[11px] block">
                {member.department}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Card Footer: Address & QR Code */}
      <div className="pt-3 border-t border-white/15 flex items-center justify-between relative z-10 text-[10px]">
        <div>
          <span className="text-white/70 block">Quartier & Résidence</span>
          <span className="font-semibold text-white">{member.neighborhood}</span>
        </div>

        {/* Dynamic Verification QR Code */}
        <div className="bg-white p-1.5 rounded-xl shadow-md text-primary inline-block">
          <QrCode className="w-8 h-8" />
        </div>
      </div>

    </div>
  );
};

export default function MemberCard({ member, onPrint }: MemberCardProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleDownloadPDF = async () => {
    // We capture the hidden clone which is strictly 450px wide
    const cardElement = document.getElementById(`pdf-member-card-${member.id}`);
    if (!cardElement) return;

    try {
      setIsExporting(true);
      
      const canvas = await html2canvas(cardElement, {
        scale: 3, // High resolution for printing
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Carte_Membre_${member.lastName.toUpperCase()}_${member.firstName}.pdf`);
      
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de l'exportation du PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Visible responsive card */}
      <CardContent member={member} />

      {/* Hidden fixed-width card for perfect PDF export */}
      <div style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
        <CardContent member={member} isPdfMode={true} />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 pt-2">
        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold rounded-2xl transition-all shadow-sm flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span className="hidden sm:inline">Imprimer</span>
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={isExporting}
          className="px-5 py-2.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-2xl transition-all shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{isExporting ? "Génération PDF..." : "Télécharger PDF"}</span>
        </button>
      </div>
    </div>
  );
}
