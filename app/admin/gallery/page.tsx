"use client";

import { useState } from "react";
import { Plus, Trash2, Image, Video } from "lucide-react";

export default function AdminGalleryPage() {
  const [mediaList, setMediaList] = useState([
    { id: "m-1", title: "Culte d'Excellence", image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop", type: "Photo" },
    { id: "m-2", title: "Louange & Adoration", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop", type: "Photo" },
    { id: "m-3", title: "Nuit de Prière", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", type: "Photo" },
    { id: "m-4", title: "Jeunesse d'Excellence", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop", type: "Photo" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) return;

    setMediaList([...mediaList, {
      id: `m-${Date.now()}`,
      title,
      image,
      type: "Photo"
    }]);

    setShowModal(false);
    setTitle("");
    setImage("");
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter(m => m.id !== id));
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
                  className="px-6 py-2.5 rounded-2xl bg-primary text-white font-bold hover:bg-primary-container shadow-md"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
