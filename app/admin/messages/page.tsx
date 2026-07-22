"use client";

import { useState, useEffect } from "react";
import { INITIAL_MESSAGES, ContactMessage } from "@/lib/store/adminStore";
import { fetchMessages, updateMessageStatus, deleteMessage as deleteMessageService } from "@/lib/services/messagesService";
import { MessageSquare, Phone, Mail, CheckCircle2, Clock, Filter, Trash2 } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [selectedStatus, setSelectedStatus] = useState<string>("Tous");
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(INITIAL_MESSAGES[0] || null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchMessages();
      if (data && data.length > 0) {
        setMessages(data);
        setActiveMessage(prev => prev || data[0]);
      }
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'Non lu' | 'En prière' | 'Traité') => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage({ ...activeMessage, status: newStatus });
    }
    await updateMessageStatus(id, newStatus);
  };

  const deleteMessage = async (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    if (activeMessage?.id === id) {
      setActiveMessage(updated[0] || null);
    }
    await deleteMessageService(id);
  };

  const filteredMessages = selectedStatus === "Tous"
    ? messages
    : messages.filter(m => m.status === selectedStatus);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Messagerie & Demandes de Prière</h2>
          <p className="text-xs text-on-surface-variant">Consultez et répondez aux messages envoyés par les visiteurs du site.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 text-xs">
          {["Tous", "Non lu", "En prière", "Traité"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-full font-bold transition-all ${
                selectedStatus === status
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Message List & Detail Pane */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column: Messages List */}
        <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-md p-4 space-y-3 max-h-[600px] overflow-y-auto">
          {filteredMessages.length === 0 ? (
            <p className="text-xs text-on-surface-variant text-center py-8">Aucun message trouvé.</p>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setActiveMessage(msg)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all space-y-2 ${
                  activeMessage?.id === msg.id
                    ? "border-secondary bg-secondary/5 shadow-sm"
                    : "border-outline-variant/20 hover:border-outline-variant/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-on-surface">{msg.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    msg.status === "Non lu" ? "bg-amber-100 text-amber-800" :
                    msg.status === "En prière" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {msg.status}
                  </span>
                </div>
                <p className="font-semibold text-xs text-primary">{msg.subject}</p>
                <p className="text-xs text-on-surface-variant line-clamp-2">{msg.message}</p>
                <span className="text-[10px] text-on-surface-variant/70 font-mono block text-right">{msg.date}</span>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Detailed View Pane */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-outline-variant/20 shadow-md p-6 flex flex-col justify-between">
          {activeMessage ? (
            <div className="space-y-6">
              
              {/* Detail Header */}
              <div className="flex justify-between items-start pb-4 border-b border-outline-variant/20">
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">{activeMessage.subject}</h3>
                  <p className="text-xs text-on-surface font-semibold mt-1">De : {activeMessage.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(activeMessage.id, 'En prière')}
                    className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-xl text-xs font-bold hover:bg-blue-200 transition-colors"
                  >
                    Marquer "En prière"
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(activeMessage.id, 'Traité')}
                    className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-200 transition-colors"
                  >
                    Marquer "Traité"
                  </button>
                  <button
                    onClick={() => deleteMessage(activeMessage.id)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sender Metadata */}
              <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-2xl text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span>{activeMessage.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>{activeMessage.phone}</span>
                </div>
              </div>

              {/* Full Message Text */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Message :</span>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-xs text-on-surface leading-relaxed whitespace-pre-wrap">
                  {activeMessage.message}
                </div>
              </div>

              {/* Quick WhatsApp Link Action */}
              <div className="pt-4 border-t border-outline-variant/20 flex gap-3">
                <a
                  href={`https://wa.me/${activeMessage.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-colors shadow-sm"
                >
                  Répondre sur WhatsApp
                </a>
                <a
                  href={`mailto:${activeMessage.email}`}
                  className="px-4 py-2.5 bg-secondary text-white rounded-2xl text-xs font-bold hover:bg-tertiary transition-colors shadow-sm"
                >
                  Envoyer un Email
                </a>
              </div>

            </div>
          ) : (
            <div className="text-center py-20 text-on-surface-variant text-xs">
              Sélectionnez un message dans la liste pour afficher les détails.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
