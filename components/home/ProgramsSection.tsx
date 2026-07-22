import { fetchPrograms } from "@/lib/services/programsService";
import { Church, BookOpen, Flame, Clock, MapPin } from "lucide-react";

export default async function ProgramsSection() {
  const programs = await fetchPrograms();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "church":
        return <Church className="w-8 h-8 text-secondary" />;
      case "menu_book":
        return <BookOpen className="w-8 h-8 text-secondary" />;
      case "fireplace":
        return <Flame className="w-8 h-8 text-secondary" />;
      default:
        return <Church className="w-8 h-8 text-secondary" />;
    }
  };

  return (
    <section className="py-20 bg-surface-container-low" id="programs">
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto text-center mb-14">
        <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-2">Agenda Spécial</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4">
          Nos Rendez-vous Hebdomadaires
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
          Rejoignez-nous pour des moments intenses de célébration, d'enseignement biblique et de prière prophétique.
        </p>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto grid md:grid-cols-3 gap-8">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-transparent hover:border-secondary group flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {getIcon(program.icon || "church")}
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-secondary mb-3">
                {program.category}
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                {program.description}
              </p>
            </div>

            <div className="pt-4 border-t border-outline-variant/20 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>{program.day} | {program.time}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                <MapPin className="w-4 h-4 text-secondary/70 flex-shrink-0" />
                <span>{program.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
