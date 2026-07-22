import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { Users, Music, User, Baby, Heart, Video, ShieldCheck, ArrowRight } from "lucide-react";

export default function DepartmentsSection() {
  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case "groups":
        return <Users className="w-6 h-6 text-primary" />;
      case "music_note":
        return <Music className="w-6 h-6 text-primary" />;
      case "woman":
        return <User className="w-6 h-6 text-primary" />;
      case "man":
        return <User className="w-6 h-6 text-primary" />;
      case "child_care":
        return <Baby className="w-6 h-6 text-primary" />;
      case "volunteer_activism":
        return <Heart className="w-6 h-6 text-primary" />;
      case "videocam":
        return <Video className="w-6 h-6 text-primary" />;
      case "diversity_3":
        return <ShieldCheck className="w-6 h-6 text-primary" />;
      default:
        return <Users className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <section className="py-20 bg-background" id="departments">
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto text-center mb-14">
        <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-2">Vie de la Communauté</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-primary mb-4">
          Nos Départements & Ministères
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
          Découvrez nos différents ministères et trouvez votre place pour servir et vous épanouir spirituellement.
        </p>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEPARTMENTS.map((dept) => (
          <div
            key={dept.id}
            className="glass-card p-6 rounded-3xl border border-secondary/15 hover:border-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                {getDepartmentIcon(dept.icon)}
              </div>
              <h3 className="font-display font-bold text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">
                {dept.name}
              </h3>
              <p className="text-on-surface-variant text-xs mb-4 leading-relaxed line-clamp-3">
                {dept.description}
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20">
              <p className="text-xs font-semibold text-secondary">{dept.meetingDay}</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">{dept.leader}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/departments"
          className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-full font-bold text-sm hover:bg-tertiary transition-colors shadow-md"
        >
          <span>Rejoindre un département</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
