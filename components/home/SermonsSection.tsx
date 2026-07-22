"use client";

import { useState } from "react";
import Link from "next/link";
import { SERMONS, CHURCH_INFO } from "@/lib/constants";
import { Play, ArrowRight, Video, Headphones, FileText, Tv } from "lucide-react";

export default function SermonsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const categories = ["Tous", "Vidéo", "Audio", "PDF", "Live"];

  const filteredSermons = activeCategory === "Tous"
    ? SERMONS
    : SERMONS.filter(s => s.category === activeCategory);

  const featuredSermon = SERMONS[0];

  return (
    <section className="py-20 bg-inverse-surface text-white overflow-hidden" id="sermons">
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-secondary-fixed font-bold text-xs tracking-widest uppercase block mb-2">Bibliothèque Digitale</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-2">
            Prédications & Messages Prophétiques
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            Écoutez, regardez et téléchargez les enseignements inspirés de nos serviteurs de Dieu.
          </p>
        </div>

        <Link
          href="/sermons"
          className="text-secondary-fixed hover:text-white font-bold text-sm flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          <span>Voir tout le catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto mb-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? "bg-secondary text-white shadow-lg scale-105"
                : "bg-white/10 hover:bg-white/20 text-white/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Main Sermon Hero */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto mb-14">
        <div className="relative rounded-3xl overflow-hidden aspect-video md:aspect-[21/9] group cursor-pointer border border-white/10 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${featuredSermon.thumbnail}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex items-end p-6 md:p-12">
            <div className="max-w-2xl">
              <span className="bg-primary px-3 py-1 rounded text-xs font-extrabold uppercase mb-3 inline-block tracking-wider">
                Dernière Sortie • {featuredSermon.duration}
              </span>
              <h3 className="font-display font-bold text-2xl md:text-4xl text-white mb-3 leading-tight">
                {featuredSermon.title}
              </h3>
              <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-2">
                {featuredSermon.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={CHURCH_INFO.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black hover:bg-secondary hover:text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Regarder la vidéo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sermons Horizontal Grid */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {filteredSermons.slice(1).map((sermon) => (
          <div key={sermon.id} className="space-y-3 group cursor-pointer">
            <div className="aspect-video rounded-2xl overflow-hidden relative border border-white/10 shadow-md">
              <img
                src={sermon.thumbnail}
                alt={sermon.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-xl">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white/90">
                {sermon.duration}
              </span>
            </div>
            <div>
              <p className="font-display font-bold text-sm text-white line-clamp-1 group-hover:text-secondary-fixed transition-colors">
                {sermon.title}
              </p>
              <p className="text-xs text-white/60 mt-1">
                {sermon.preacher} • {sermon.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
