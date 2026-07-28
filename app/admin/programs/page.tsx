"use client";

import { useState, useEffect } from "react";
import { Program } from "@/lib/constants";
import { fetchPrograms, createProgram, updateProgram, deleteProgram } from "@/lib/services/programsService";
import { Plus, Trash2, Edit2, Calendar, Clock, MapPin, Loader2 } from "lucide-react";

export default function AdminProgramsPage() {
  const [programList, setProgramList] = useState<Program[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<'Culte' | 'Étude' | 'Prière' | 'Séminaire' | 'Veillée'>("Culte");
  const [day, setDay] = useState("Dimanche");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("Sanctuaire Principal, Cotonou");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await fetchPrograms();
      setProgramList(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleAddProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !day || !time) return;
    setIsSubmitting(true);

    if (editingId) {
      const updatedProg = {
        title,
        category,
        day,
        time,
        location,
        description: description || "Moment de célébration et de prière.",
        icon: category === "Culte" ? "church" : category === "Étude" ? "menu_book" : "fireplace"
      };
      
      const success = await updateProgram(editingId, updatedProg);
      if (success) {
        setProgramList(programList.map(p => p.id === editingId ? { ...p, ...updatedProg } : p));
        closeModal();
      } else {
        alert("Erreur lors de la modification de l'événement.");
      }
    } else {
      const newProg: Program = {
        id: `prog-${Date.now()}`,
        title,
        category,
        day,
        time,
        location,
        description: description || "Moment de célébration et de prière.",
        icon: category === "Culte" ? "church" : category === "Étude" ? "menu_book" : "fireplace"
      };

      const success = await createProgram(newProg);
      if (success) {
        setProgramList([...programList, newProg]);
        closeModal();
      } else {
        alert("Erreur lors de l'enregistrement de l'événement.");
      }
    }
    setIsSubmitting(false);
  };

  const openEditModal = (prog: Program) => {
    setEditingId(prog.id);
    setTitle(prog.title);
    setCategory(prog.category);
    setDay(prog.day);
    setTime(prog.time);
    setLocation(prog.location);
    setDescription(prog.description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setTitle("");
    setTime("");
    setDescription("");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce programme ?")) {
      const success = await deleteProgram(id);
      if (success) {
        setProgramList(programList.filter(p => p.id !== id));
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Gestion des Cultes & Événements</h2>
          <p className="text-xs text-on-surface-variant">Planifiez les rendez-vous hebdomadaires et veillées de prière.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setTitle("");
            setTime("");
            setDescription("");
            setShowModal(true);
          }}
          className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Planifier un événement</span>
        </button>
      </div>

      {/* Programs List Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-on-surface-variant text-sm font-bold">Chargement des événements...</p>
        </div>
      ) : programList.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-outline-variant/20">
          <Calendar className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-on-surface mb-2">Aucun événement planifié</h3>
          <p className="text-sm text-on-surface-variant">Cliquez sur le bouton ci-dessus pour ajouter votre premier programme.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programList.map((prog) => (
            <div key={prog.id} className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
                    {prog.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(prog)}
                      className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-xl transition-colors"
                      title="Modifier"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prog.id)}
                      className="text-rose-600 hover:bg-rose-50 p-1.5 rounded-xl transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-display font-bold text-lg text-on-surface mb-2">{prog.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{prog.description}</p>
              </div>

              <div className="pt-3 border-t border-outline-variant/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>{prog.day} • {prog.time}</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <MapPin className="w-4 h-4 text-secondary/70" />
                  <span>{prog.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Program */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-white/20">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <h3 className="font-display font-bold text-lg text-primary">
                {editingId ? "Modifier le Programme" : "Nouveau Programme / Culte"}
              </h3>
              <button onClick={closeModal} className="text-on-surface-variant hover:text-on-surface font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddProgram} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface mb-1">Titre de l'événement *</label>
                <input
                  type="text"
                  placeholder="Ex: Culte de Célébration & de Victoire"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="Culte">Culte</option>
                    <option value="Étude">Étude Biblique</option>
                    <option value="Prière">Prière</option>
                    <option value="Séminaire">Séminaire</option>
                    <option value="Veillée">Veillée</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Jour *</label>
                  <input
                    type="text"
                    placeholder="Ex: Dimanche"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Horaires *</label>
                  <input
                    type="text"
                    placeholder="Ex: 09:00 - 12:00"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Lieu</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Détails du programme..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                ></textarea>
              </div>

              <div className="pt-3 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-2xl border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-low disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-container shadow-md flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <span>Enregistrer l'événement</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
