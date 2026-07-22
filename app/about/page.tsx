import { CHURCH_INFO, PASTORS } from "@/lib/constants";
import { Eye, Rocket, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 bg-background">
      {/* Header Banner */}
      <div className="bg-inverse-surface text-white py-16 px-4 md:px-margin-desktop text-center">
        <span className="text-secondary-fixed font-bold text-xs tracking-widest uppercase block mb-2">Notre Histoire & Notre Foi</span>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4">À Propos de {CHURCH_INFO.name}</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
          {CHURCH_INFO.subtitle} — {CHURCH_INFO.tagline}
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-margin-desktop max-w-container-max mx-auto py-16 space-y-16">
        
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-2">Genèse du Ministère</span>
            <h2 className="font-display font-bold text-3xl text-primary mb-4">Notre Histoire</h2>
            <p className="text-on-surface-variant leading-relaxed text-base mb-4">
              Fondé en 2004 à Cotonou (Bénin), HOUEKIN MINISTRIES est né d'une vision divine portée par le Rev. Dr. HOUEKIN : créer un centre d'édification spirituelle où l'Évangile est prêché avec clarté, puissance et vérité.
            </p>
            <p className="text-on-surface-variant leading-relaxed text-base">
              Au fil des ans, l'église a grandi pour devenir "La Cité d'Excellence", un lieu de rassemblement pour des milliers de fidèles recherchant la présence de Dieu et le développement de leur potentiel.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop"
              alt="Histoire de l'église"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-secondary/20 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary">Notre Vision</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Manifester la gloire de Dieu dans les nations et élever une génération d'hommes et de femmes influents, guidés par le Saint-Esprit et ancrés dans l'excellence en tout temps.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-secondary/20 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary">Notre Mission</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Former des disciples accomplis à travers la prédication de la parole de foi, la prière continue, l'exercice des dons spirituels et l'impact social concret.
            </p>
          </div>
        </div>

        {/* Pastoral Team */}
        <div>
          <div className="text-center mb-12">
            <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-2">Serviteurs de Dieu</span>
            <h2 className="font-display font-bold text-3xl text-primary">L'Équipe Pastorale</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PASTORS.map((pastor, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-md flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={pastor.photo}
                  alt={pastor.name}
                  className="w-28 h-28 rounded-2xl object-cover shadow-sm flex-shrink-0"
                />
                <div>
                  <h3 className="font-display font-bold text-xl text-on-surface">{pastor.name}</h3>
                  <span className="text-xs font-semibold text-secondary block mb-2">{pastor.role}</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{pastor.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
