"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import { fetchMessages } from "@/lib/services/messagesService";
import { fetchChurchMembers } from "@/lib/services/churchMembersService";
import { fetchSermons } from "@/lib/services/sermonsService";
import { fetchPrograms } from "@/lib/services/programsService";
import { ContactMessage } from "@/lib/store/adminStore";
import { 
  Video, 
  Calendar, 
  MessageSquare, 
  Users, 
  Plus, 
  ArrowUpRight, 
  Tv,
  FileText
} from "lucide-react";

export default function AdminDashboardPage() {
  const [membersCount, setMembersCount] = useState<number | null>(null);
  const [totalMessages, setTotalMessages] = useState<number | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [sermonsCount, setSermonsCount] = useState<number | null>(null);
  const [programsCount, setProgramsCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [membersData, messagesData, sermonsData, programsData] = await Promise.all([
          fetchChurchMembers(),
          fetchMessages(),
          fetchSermons(),
          fetchPrograms()
        ]);
        
        setMembersCount(membersData.length);
        setTotalMessages(messagesData.length);
        setUnreadMessages(messagesData.filter(m => m.status === "Non lu").length);
        setRecentMessages(messagesData.slice(0, 5)); // Les 5 messages les plus récents
        setSermonsCount(sermonsData.length);
        setProgramsCount(programsData.length);
      } catch (error) {
        console.error("Erreur de chargement des données Dashboard:", error);
      }
    }
    
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Top Banner / Welcome */}
      <div className="bg-primary text-white p-6 md:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-secondary/15 rounded-l-full pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[11px] font-extrabold uppercase rounded-full tracking-wider">
            Système CMS V1.0 Active
          </span>
          <h2 className="font-display font-bold text-2xl md:text-3xl">
            Bienvenue dans le Dashboard Pastoral
          </h2>
          <p className="text-white/80 text-xs md:text-sm max-w-xl">
            Gérez les publications, le suivi des fidèles, l'agenda des cultes et la communication de HOUEKIN MINISTRIES.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10 shrink-0">
          <Link
            href="/admin/sermons"
            className="bg-white text-primary hover:bg-secondary hover:text-white px-4 py-2.5 rounded-2xl font-bold text-xs transition-colors shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une prédication</span>
          </Link>
          <Link
            href="/admin/programs"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2.5 rounded-2xl font-bold text-xs transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Nouveau culte</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Prédications Publiées"
          value={sermonsCount === null ? "..." : sermonsCount}
          change="En ligne"
          isPositive={true}
          icon={Video}
          description="Vidéos, audios et séries de messages"
        />
        <StatCard
          title="Programmes Hebdo"
          value={programsCount === null ? "..." : programsCount}
          change="Actifs"
          isPositive={true}
          icon={Calendar}
          description="Cultes, études et veillées de prière"
        />
        <StatCard
          title="Demandes & Prières"
          value={totalMessages === null ? "..." : totalMessages}
          change={unreadMessages > 0 ? `${unreadMessages} non lus` : "Tout est lu"}
          isPositive={unreadMessages === 0}
          icon={MessageSquare}
          description="Messages reçus depuis le site"
        />
        <StatCard
          title="Fidèles Enregistrés"
          value={membersCount === null ? "..." : membersCount}
          change="Base Supabase"
          isPositive={true}
          icon={Users}
          description="Membres avec cartes d'identité"
        />
      </div>

      {/* Grid: Messages & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recent Messages Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-primary">Dernières Demandes de Prière & Messages</h3>
              <p className="text-xs text-on-surface-variant">Messages envoyés par les visiteurs du site</p>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
            >
              <span>Voir tout</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-outline-variant/10">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-on-surface">{msg.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        msg.status === "Non lu" ? "bg-amber-100 text-amber-800" :
                        msg.status === "En prière" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant line-clamp-1">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-mono shrink-0">{msg.date}</span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-on-surface-variant text-sm font-medium">
                {totalMessages === null ? (
                  <span className="animate-pulse">Chargement des données...</span>
                ) : (
                  "Aucun message n'a encore été reçu."
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Quick Status Widget & Live Direct status */}
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
            <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
              <Tv className="w-4 h-4 text-primary" />
              <span>Statut de la Diffusion Live</span>
            </h3>
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Signal Prêt
                </span>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Lien YouTube configuré</p>
              </div>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-container transition-colors"
              >
                Tester
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md space-y-4">
            <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
              <FileText className="w-4 h-4 text-secondary" />
              <span>Actions Rapides Admin</span>
            </h3>
            <div className="space-y-2 text-xs">
              <Link href="/admin/sermons" className="block p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors font-semibold text-on-surface">
                + Ajouter une vidéo de prédication
              </Link>
              <Link href="/admin/programs" className="block p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors font-semibold text-on-surface">
                + Planifier une veillée de prière
              </Link>
              <Link href="/admin/settings" className="block p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors font-semibold text-on-surface">
                ⚙ Mettre à jour les paramètres
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
