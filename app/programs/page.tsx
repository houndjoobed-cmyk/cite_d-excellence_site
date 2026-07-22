import { fetchPrograms } from "@/lib/services/programsService";
import { Clock, MapPin, Calendar } from "lucide-react";

export const revalidate = 60; // Revalider toutes les minutes

export default async function ProgramsPage() {
  const programs = await fetchPrograms();

  return (
    <div className="py-12 bg-background">
      <div className="bg-inverse-surface text-white py-16 px-4 md:px-margin-desktop text-center">
        <span className="text-secondary-fixed font-bold text-xs tracking-widest uppercase block mb-2">Rencontres & Cultes</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4">Nos Programmes</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base">
          Découvrez nos cultes dominicaux, études bibliques et veillées de prière.
        </p>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto py-16 grid md:grid-cols-3 gap-8">
        {programs.map((program) => (
          <div key={program.id} className="bg-white p-8 rounded-3xl border border-secondary/20 shadow-md flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 bg-surface-container text-xs font-bold text-secondary rounded-full inline-block mb-4">
                {program.category}
              </span>
              <h2 className="font-display font-bold text-2xl text-primary mb-3">{program.title}</h2>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{program.description}</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-outline-variant/20">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Clock className="w-4 h-4 text-secondary" />
                <span>{program.day} • {program.time}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs">
                <MapPin className="w-4 h-4 text-secondary/70" />
                <span>{program.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
