import { getChurchMemberByNumber } from "@/lib/services/churchMembersService";
import { CheckCircle, AlertTriangle, ShieldCheck, MapPin, Calendar, Briefcase, Phone, UserCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function VerifyMemberPage({ params }: { params: Promise<{ memberNumber: string }> }) {
  const resolvedParams = await params;
  const member = await getChurchMemberByNumber(resolvedParams.memberNumber);

  if (!member) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-red-100 p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-display font-bold text-on-surface">Carte Invalide</h1>
          <p className="text-on-surface-variant">
            Ce matricule ({resolvedParams.memberNumber}) n'existe pas dans la base de données de HOUEKIN MINISTRIES.
          </p>
          <Link href="/" className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-xl font-bold">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-surface-variant">
        
        {/* Header Success */}
        <div className="bg-emerald-600 pt-8 px-6 pb-20 text-white text-center space-y-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <ShieldCheck className="w-16 h-16 mx-auto mb-2 text-white drop-shadow-md" />
          <h1 className="text-2xl font-display font-bold">Membre Vérifié</h1>
          <p className="text-emerald-100 font-medium">Carte officielle valide</p>
        </div>

        {/* Member Info */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col items-center gap-4 border-b border-surface-variant pb-6">
            <img
              src={member.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"}
              alt={`${member.firstName} ${member.lastName}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg -mt-16 z-10 bg-white"
            />
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-surface-container text-on-surface-variant text-xs font-bold rounded-full mb-2 font-mono">
                {member.memberNumber}
              </div>
              <h2 className="text-2xl font-display font-bold text-on-surface leading-tight">
                {member.lastName.toUpperCase()} {member.firstName}
              </h2>
              <p className="text-primary font-bold mt-1 text-sm">{member.status}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant/70">Département</p>
                <p className="font-semibold text-on-surface">{member.department || "Aucun"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant/70">Quartier</p>
                <p className="font-semibold text-on-surface">{member.neighborhood || "Non renseigné"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-on-surface-variant">
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant/70">Membre depuis</p>
                <p className="font-semibold text-on-surface">{member.registrationDate || "Non renseigné"}</p>
              </div>
            </div>
          </div>

          {/* Action buttons (only useful if admin is logged in, but we can display a generic one for now) */}
          <div className="pt-6 border-t border-surface-variant">
            <button className="w-full py-3.5 bg-secondary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary-container hover:text-secondary-fixed transition-colors shadow-sm">
              <UserCheck className="w-5 h-5" />
              Pointer la présence
            </button>
            <p className="text-center text-[10px] text-on-surface-variant mt-3">
              *Le pointage nécessite d'être connecté en tant que responsable.
            </p>
          </div>
        </div>

      </div>
      
      <div className="mt-8 text-center text-on-surface-variant/60 text-xs font-medium space-y-1">
        <p>HOUEKIN MINISTRIES - La Cité d'Excellence</p>
        <p>&copy; {new Date().getFullYear()} Tous droits réservés.</p>
      </div>
    </div>
  );
}
