"use client";

import { useState, useEffect } from "react";
import { fetchGallery, createGalleryMedia, deleteGalleryMedia, GalleryMedia } from "@/lib/services/galleryService";
import { Plus, Trash2, Image, Video, Loader2 } from "lucide-react";

export default function AdminGalleryPage() {
  const [mediaList, setMediaList] = useState<GalleryMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function loadData() {
      const data = await fetchGallery();
      setMediaList(data);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) return;
    setIsSubmitting(true);

    const newMedia: GalleryMedia = {
      id: `m-${Date.now()}`,
      title,
      image,
      type: "Photo"
    };

    const success = await createGalleryMedia(newMedia);
    if (success) {
      setMediaList([newMedia, ...mediaList]);
      setShowModal(false);
      setTitle("");
      setImage("");
    } else {
      alert("Erreur lors de l'enregistrement de l'image.");
    }
    
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      const success = await deleteGalleryMedia(id);
      if (success) {
        setMediaList(mediaList.filter(m => m.id !== id));
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md">
        <div>
          <h2 className="font-display font-bold text-xl text-primary">Gestion de la Galerie Médias</h2>
          <p className="text-xs text-on-surface-variant">Ajoutez et gérez les photos et souvenirs des rassemblements de l'église.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une photo</span>
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : mediaList.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-outline-variant/20 shadow-md text-center text-on-surface-variant">
          Aucune image dans la galerie.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-outline-variant/20 shadow-md relative group">
            <div className="aspect-square relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 p-2 bg-rose-600 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="font-bold text-xs text-on-surface line-clamp-1">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-white/20">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/20">
              <h3 className="font-display font-bold text-lg text-primary">Ajouter une Photo</h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant font-bold text-sm">✕</button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface mb-1">Titre / Légende</label>
                <input
                  type="text"
                  placeholder="Ex: Culte Spécial d'Action de Grâce"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Lien Image (URL)</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="pt-3 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-2xl border border-outline-variant/30 text-on-surface-variant font-bold hover:bg-surface-container-low"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-container shadow-md disabled:opacity-70 flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Ajouter</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
