import { fetchSermons } from "@/lib/services/sermonsService";
import { Play, Download, Search } from "lucide-react";

export const revalidate = 60; // Revalider toutes les minutes

export default async function SermonsPage() {
  const sermons = await fetchSermons();

  return (
    <div className="py-12 bg-background">
      <div className="bg-inverse-surface text-white py-16 px-4 md:px-margin-desktop text-center">
        <span className="text-secondary-fixed font-bold text-xs tracking-widest uppercase block mb-2">Médiathèque</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4">Bibliothèque de Prédications</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base">
          Accédez à l'ensemble de nos séries de messages en vidéo, audio et documents PDF.
        </p>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon) => (
            <div key={sermon.id} className="bg-white rounded-3xl overflow-hidden border border-outline-variant/30 shadow-md group">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-primary text-white px-2.5 py-1 rounded text-xs font-bold uppercase">
                  {sermon.category}
                </div>
                {sermon.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-0.5 rounded text-xs font-mono">
                    {sermon.duration}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-display font-bold text-lg text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                  {sermon.title}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2">{sermon.description}</p>
                <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center text-xs text-secondary font-semibold">
                  <span>{sermon.preacher}</span>
                  <span>{sermon.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
