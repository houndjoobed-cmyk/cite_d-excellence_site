"use client";

import { useEffect, useState } from "react";
import { fetchAppointments, updateAppointmentStatus, PastoralAppointment } from "@/lib/services/appointmentService";
import { Calendar, Clock, CheckCircle, XCircle, MoreVertical, RefreshCw, Phone, Mail, User } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<PastoralAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const data = await fetchAppointments();
    setAppointments(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "Confirmé" | "Annulé") => {
    const success = await updateAppointmentStatus(id, newStatus);
    if (success) {
      loadData();
    } else {
      alert("Erreur lors de la mise à jour du statut.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmé":
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-max"><CheckCircle className="w-3 h-3"/> Confirmé</span>;
      case "Annulé":
        return <span className="bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-max"><XCircle className="w-3 h-3"/> Annulé</span>;
      default:
        return <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1 w-max"><Clock className="w-3 h-3"/> En attente</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-sm">
        <div>
          <h1 className="font-display font-bold text-2xl text-primary flex items-center gap-2">
            <Calendar className="w-6 h-6 text-secondary" />
            Rendez-vous Pastoraux
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Gérez les demandes de réception (Mercredis : 10h ou 15h).
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2.5 rounded-2xl transition-colors font-bold text-xs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-on-surface-variant">Chargement des rendez-vous...</div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Calendar className="w-12 h-12 text-outline-variant mx-auto" />
            <p className="text-on-surface-variant text-sm">Aucune demande de rendez-vous pour le moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/10">
            {appointments.map((apt) => (
              <div key={apt.id} className="p-5 hover:bg-surface-container-lowest transition-colors flex flex-col md:flex-row gap-6">
                
                {/* Left: Date & Time */}
                <div className="md:w-48 shrink-0 flex flex-col justify-center border-r border-outline-variant/10 pr-6">
                  <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider mb-1">Date demandée</span>
                  <div className="font-display text-lg font-bold text-primary">
                    {new Date(apt.appointmentDate).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" })}
                  </div>
                  <div className="flex items-center gap-2 text-secondary font-bold text-sm mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{apt.appointmentTime}</span>
                  </div>
                </div>

                {/* Middle: Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-on-surface text-base flex items-center gap-2">
                        <User className="w-4 h-4 text-on-surface-variant" /> {apt.fullName}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> {apt.phone}</span>
                        {apt.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> {apt.email}</span>}
                      </div>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>
                  
                  <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                    <span className="text-[10px] uppercase font-bold text-secondary block mb-1">Motif</span>
                    <p className="text-sm text-on-surface">{apt.reason}</p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="md:w-32 shrink-0 flex flex-row md:flex-col justify-end gap-2">
                  {apt.status === "En attente" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(apt.id, "Confirmé")}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-sm"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(apt.id, "Annulé")}
                        className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold py-2 px-3 rounded-xl transition-colors"
                      >
                        Refuser
                      </button>
                    </>
                  )}
                  {apt.status === "Confirmé" && (
                    <button
                        onClick={() => handleUpdateStatus(apt.id, "Annulé")}
                        className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold py-2 px-3 rounded-xl transition-colors"
                      >
                        Annuler
                      </button>
                  )}
                  {apt.status === "Annulé" && (
                    <button
                        onClick={() => handleUpdateStatus(apt.id, "Confirmé")}
                        className="w-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-bold py-2 px-3 rounded-xl transition-colors"
                      >
                        Re-confirmer
                      </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
