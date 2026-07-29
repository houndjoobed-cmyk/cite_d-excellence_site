"use client";

import { useState, useEffect } from "react";
import { Sermon } from "@/lib/constants";
import { fetchSermons, createSermon, deleteSermon } from "@/lib/services/sermonsService";
import { uploadMediaFile } from "@/lib/services/storageService";
import { Plus, Trash2, Edit3, Video, Headphones, FileText, Search, Check, Upload, Loader2, Image as ImageIcon } from "lucide-react";

export default function AdminSermonsPage() {
  const [sermonList, setSermonList] = useState<Sermon[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State for new/edit sermon
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [preacher, setPreacher] = useState("Rev. Dr. HOUEKIN");
  const [category, setCategory] = useState<'Vidéo' | 'Audio' | 'PDF' | 'Live'>("Vidéo");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchSermons();
      setSermonList(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleAddSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !preacher) return;
    setIsSubmitting(true);

    let thumbnailUrl = existingThumbnail || "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop";

    if (thumbnailFile) {
      const uploadedUrl = await uploadMediaFile(thumbnailFile, 'sermons');
      if (uploadedUrl) {
        thumbnailUrl = uploadedUrl;
      }
    }

    const sermonData: any = {
      title,
      preacher,
      category,
      thumbnail: thumbnailUrl,
      duration,
      description: description || "Message d'édification spirituelle.",
      videoUrl: videoUrl || undefined
    };

    let success = false;
    let finalSermon: Sermon;

    if (editingId) {
      const { updateSermon } = await import("@/lib/services/sermonsService");
      success = await updateSermon(editingId, sermonData);
      finalSermon = { ...sermonList.find(s => s.id === editingId)!, ...sermonData };
      if (success) {
        setSermonList(sermonList.map(s => s.id === editingId ? finalSermon : s));
      }
    } else {
      sermonData.id = `sermon-${Date.now()}`;
      sermonData.date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
      success = await createSermon(sermonData);
      finalSermon = sermonData as Sermon;
      if (success) {
        setSermonList([finalSermon, ...sermonList]);
      }
    }

    if (success) {
      setShowModal(false);
      resetForm();
    } else {
      alert("Erreur lors de l'enregistrement de la prédication.");
    }
    
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setPreacher("Rev. Dr. HOUEKIN");
    setCategory("Vidéo");
    setDuration("");
    setDescription("");
    setVideoUrl("");
    setThumbnailFile(null);
    setExistingThumbnail(null);
  };

  const openEditModal = (sermon: Sermon) => {
    setEditingId(sermon.id);
    setTitle(sermon.title);
    setPreacher(sermon.preacher);
    setCategory(sermon.category);
    setDuration(sermon.duration || "");
    setDescription(sermon.description || "");
    setVideoUrl(sermon.videoUrl || "");
    setExistingThumbnail(sermon.thumbnail);
    setThumbnailFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) {
      const success = await deleteSermon(id);
      if (success) {
        setSermonList(sermonList.filter(s => s.id !== id));
      }
    }
  };

  const filteredSermons = sermonList.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.preacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Prédications & Enseignements</h2>
          <p className="text-xs text-on-surface-variant">Gérez le catalogue des vidéos, audios et séries de messages.</p>
        </div>

        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une prédication</span>
        </button>
      </div>

      {/* Search & Filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-on-surface-variant ml-2" />
        <input
          type="text"
          placeholder="Rechercher par titre ou prédicateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent text-xs text-on-surface focus:outline-none w-full"
        />
      </div>

      {/* Sermons Table / Cards */}
      <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low border-b border-outline-variant/20 text-on-surface font-bold">
              <tr>
                <th className="p-4">Visual</th>
                <th className="p-4">Titre du Message</th>
                <th className="p-4">Prédicateur</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Durée</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-on-surface-variant font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                    Chargement des messages...
                  </td>
                </tr>
              ) : filteredSermons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-on-surface-variant">
                    Aucune prédication trouvée.
                  </td>
                </tr>
              ) : (
                filteredSermons.map((sermon) => (
                  <tr key={sermon.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4">
                      <img
                        src={sermon.thumbnail}
                        alt={sermon.title}
                        className="w-16 h-10 rounded-xl object-cover border border-outline-variant/20"
                      />
                    </td>
                    <td className="p-4 font-bold text-on-surface max-w-xs">{sermon.title}</td>
                    <td className="p-4">{sermon.preacher}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-[10px]">
                        {sermon.category}
                      </span>
                    </td>
                    <td className="p-4 font-mono">{sermon.duration || "-"}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(sermon)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(sermon.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sermon Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl border border-white/20 relative">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <h3 className="font-display font-bold text-lg text-primary">{editingId ? "Modifier Prédication" : "Nouvelle Prédication"}</h3>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-on-surface-variant hover:text-on-surface font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddSermon} className="space-y-4 text-xs">
              
              {/* Photo Upload Section */}
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shrink-0 border border-outline-variant/30 overflow-hidden relative">
                  {thumbnailFile ? (
                    <img src={URL.createObjectURL(thumbnailFile)} alt="Preview" className="w-full h-full object-cover" />
                  ) : existingThumbnail ? (
                    <img src={existingThumbnail} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-on-surface-variant/50" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="block font-bold text-on-surface mb-1">Affiche / Miniature</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                    className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-container"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Titre du Message *</label>
                <input
                  type="text"
                  placeholder="Ex: L'Autorité du Croyant"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Prédicateur *</label>
                  <input
                    type="text"
                    value={preacher}
                    onChange={(e) => setPreacher(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="Vidéo">Vidéo (YouTube)</option>
                    <option value="Audio">Audio</option>
                    <option value="PDF">Document PDF</option>
                    <option value="Live">En Direct (Live)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Lien Vidéo (YouTube)</label>
                <input
                  type="url"
                  placeholder="Ex: https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Durée (optionnel)</label>
                <input
                  type="text"
                  placeholder="Ex: 1h 15min"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Description / Résumé</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Résumé du message prophétique..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                ></textarea>
              </div>

              <div className="pt-3 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
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
                      <span>Upload en cours...</span>
                    </>
                  ) : (
                    <span>Publier le message</span>
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
