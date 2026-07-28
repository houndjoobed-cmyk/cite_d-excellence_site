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
  // Theme selection based on ministry (spiritualGifts)
  const ministry = (member.spiritualGifts || "").toLowerCase().trim();
  const isPasteurPrincipal = ministry.includes("pasteur principal");
  const isPastoral = (ministry.includes("pasteur") || ministry.includes("assistant")) && !isPasteurPrincipal;
  const isNormalMember = !isPasteurPrincipal && !isPastoral;

  // Base setup (Red - Pasteurs, Assistant, Junior)
  let themeBg = "bg-gradient-to-br from-[#4a0a0a] via-[#8a0000] to-[#2a0000]";
  let themeBorderTop = "border border-[#D4AF37]/20";
  let themeAccent = "text-[#D4AF37]"; // Gold text in red card
  let themeBadgeBg = "bg-[#7a6215] text-white"; // Gold badge in red card
  let themeAccentBg = "bg-white/10";
  let themeAccentBorder = "border-[#D4AF37]/30";
  let themeGlow = "bg-[#D4AF37]/10";
  let themeHex = "#D4AF37";
  let themeQRColor = "930000";
  let qrBgColor = "FFFFFF"; // White QR background

  if (isPasteurPrincipal) {
    // Gold
    themeBg = "bg-gradient-to-br from-[#6b5811] via-[#b08d13] to-[#261d02]";
    themeBorderTop = "border border-[#D4AF37]/30";
    themeAccent = "text-[#fceb9f]"; // Lighter gold text for contrast
    themeBadgeBg = "bg-[#917415] text-white"; 
    themeAccentBg = "bg-white/10";
    themeAccentBorder = "border-[#e8ce71]/40";
    themeGlow = "bg-[#fceb9f]/15";
    themeHex = "#e8ce71";
    themeQRColor = "930000";
    qrBgColor = "FFFFFF"; // White QR background
  } else if (isNormalMember) {
    // Blue (Light Blue)
    themeBg = "bg-gradient-to-br from-[#021124] via-[#042859] to-[#010914]";
    themeBorderTop = "border border-[#38BDF8]/20";
    themeAccent = "text-[#38BDF8]";
    themeBadgeBg = "bg-[#042859] text-white";
    themeAccentBg = "bg-white/10";
    themeAccentBorder = "border-[#38BDF8]/30";
    themeGlow = "bg-[#38BDF8]/10";
    themeHex = "#38BDF8";
    themeQRColor = "042859";
    qrBgColor = "FFFFFF"; // White QR background
  }

  return (
    <div 
      id={isPdfMode ? `pdf-member-card-${member.id}` : `member-card-${member.id}`}
      className={`mx-auto ${themeBg} text-white shadow-2xl relative overflow-hidden text-left ${themeBorderTop} ${
        isPdfMode 
          ? "w-[450px] rounded-3xl p-6" 
          : "w-full max-w-[450px] rounded-2xl sm:rounded-3xl p-4 sm:p-6"
      }`}
    >
      {/* Holographic background glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${themeGlow} rounded-full blur-3xl pointer-events-none`} />
      <div className={`absolute -bottom-10 -left-10 w-48 h-48 ${themeGlow} rounded-full blur-2xl pointer-events-none`} />

      {/* Card Header */}
      <div className={`flex items-start sm:items-center justify-between pb-4 border-b ${themeAccentBorder} relative z-10 gap-2`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src="/logo.png"
            alt="Logo HOUEKIN MINISTRIES"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow shrink-0"
          />
          <div>
            <span className={`font-display font-extrabold text-sm ${themeAccent} block leading-tight tracking-wide`}>
              HOUEKIN MINISTRIES
            </span>
            <span className={`font-display text-[9px] ${themeAccent} opacity-70 tracking-widest uppercase block font-semibold`}>
              LA CITÉ D'EXCELLENCE
            </span>
          </div>
        </div>

        <div className={`px-2.5 py-1 ${themeBadgeBg} text-[9px] font-extrabold uppercase rounded-full tracking-wider shadow-sm shrink-0 self-center sm:self-auto text-center inline-block border ${themeAccentBorder}`}>
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
              className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-2xl border-2 shadow-lg mx-auto block"
              style={{ borderColor: themeHex }}
              crossOrigin="anonymous"
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
            <span className={`text-[10px] ${themeAccent} font-mono uppercase tracking-wider block font-semibold mb-1`}>
              Matricule Membre
            </span>
            <span className={`font-mono font-extrabold text-sm text-white bg-white/5 px-2.5 py-1 rounded-xl border ${themeAccentBorder} inline-block`}>
              {member.memberNumber}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-white/50 block">Nom & Prénoms</span>
            <span className="font-display font-extrabold text-sm text-white block leading-tight">
              {member.lastName.toUpperCase()} {member.firstName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-[9px] text-white/40 block">Sexe</span>
              <span className="font-semibold text-white">{member.gender}</span>
            </div>
            <div>
              <span className="text-[9px] text-white/40 block">Né(e) le</span>
              <span className="font-semibold text-white font-mono">{member.birthDate}</span>
            </div>
          </div>

          {ministry ? (
            <div>
              <span className="text-[9px] text-white/40 block">Ministère</span>
              <span className={`font-bold ${themeAccent} text-[11px] block uppercase tracking-wider`}>
                {ministry}
              </span>
            </div>
          ) : member.department ? (
            <div>
              <span className="text-[9px] text-white/40 block">Département</span>
              <span className={`font-bold ${themeAccent} text-[11px] block`}>
                {member.department}
              </span>
            </div>
          ) : null}
        </div>

      </div>

      {/* Card Footer: Address & QR Code */}
      <div className={`pt-3 border-t ${themeAccentBorder} flex items-center justify-between relative z-10 text-[10px]`}>
        <div>
          <span className="text-white/50 block">Quartier & Résidence</span>
          <span className="font-semibold text-white">{member.neighborhood}</span>
        </div>

        {/* Dynamic Verification QR Code */}
        <div className={`${themeAccentBg} p-1.5 rounded-xl shadow-md inline-block border ${themeAccentBorder}`}>
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://cite-d-excellence-site.vercel.app/members/verify/${member.memberNumber}`)}&color=${themeQRColor}&bgcolor=${qrBgColor}`} 
            alt="QR Code Vérification"
            className="w-10 h-10 rounded-sm"
            crossOrigin="anonymous"
          />
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
