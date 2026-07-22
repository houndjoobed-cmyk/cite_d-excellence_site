import { DEPARTMENTS } from "@/lib/constants";
import { Users, Clock, MapPin } from "lucide-react";

export default function DepartmentsPage() {
  return (
    <div className="py-12 bg-background">
      <div className="bg-inverse-surface text-white py-16 px-4 md:px-margin-desktop text-center">
        <span className="text-secondary-fixed font-bold text-xs tracking-widest uppercase block mb-2">Servir avec Excellence</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4">Nos Départements</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base">
          Chaque membre possède des dons uniques. Trouvez le ministère qui correspond à votre appel.
        </p>
      </div>

      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEPARTMENTS.map((dept) => (
          <div key={dept.id} className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-md flex flex-col justify-between hover:border-secondary transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-on-surface mb-2">{dept.name}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{dept.description}</p>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 space-y-1">
              <p className="text-xs font-semibold text-secondary">{dept.meetingDay}</p>
              <p className="text-[11px] text-on-surface-variant">Lieu: {dept.location}</p>
              <p className="text-[11px] text-primary font-medium">Resp: {dept.leader}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
