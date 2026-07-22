export default function GalleryPage() {
  const photos = [
    { title: "Culte d'Excellence", image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop" },
    { title: "Louange & Adoration", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
    { title: "Nuit de Prière", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" },
    { title: "Rassemblement de la Jeunesse", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop" },
    { title: "Conférence d'Impact", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop" },
    { title: "Chorale Prophétique", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="py-12 bg-background">
      <div className="bg-inverse-surface text-white py-16 px-4 md:px-margin-desktop text-center">
        <span className="text-secondary-fixed font-bold text-xs tracking-widest uppercase block mb-2">Moments Forts</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4">Galerie Photos & Vidéos</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base">
          Revivez en images les rassemblements, célébrations et moments de grâce à la Cité d'Excellence.
        </p>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto py-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((item, idx) => (
          <div key={idx} className="rounded-3xl overflow-hidden shadow-md group relative cursor-pointer aspect-square">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <p className="text-white font-display font-bold text-lg">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
