import { CHURCH_INFO, PASTORS } from "@/lib/constants";
import { Eye, Rocket, ShieldCheck, Heart } from "lucide-react";
import parents from "@/assets/parent.png";


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
              Fondé en 2022 à Abomey-Calavi au Bénin, La Cité d'Excellence est né d'une vision divine portée par le Rev. Dr. HOUEKIN HANGBE Fidèle et son épouse : créer un centre d'édification spirituelle où l'Évangile est prêché avec clarté, puissance et vérité.
            </p>
            <p className="text-on-surface-variant leading-relaxed text-base">
              Au fil des ans, l'église a grandi pour devenir "HOUEKIN HOUEKIN MINISTRIES La Cité d'Excellence", un lieu de rassemblement pour des milliers de fidèles recherchant la présence de Dieu et le développement de leur potentiel.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src={parents.src}
              alt="Histoire de l'église"
              className="w-full h-82 object-cover"
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
              Et ce que tu as entendu de moi en présence de beaucoup de témoins, confie-le à des hommes fidèles, qui soient capables de l'enseigner à leur tour à d'autres. (2 Timothée 2 : 2).C'est cette parole qui est le fondement de notre vision.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-secondary/20 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary">Notre Mission</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              <p> *Glorifier Dieu en formant des disciples qui exaltent Dieu, partagent activement l'évangile et servent fidèlement Christ et les autres.</p>
              <p> *Edifier les autres croyants.</p>
              <p> *Evangeliser en commençant dans nôtre localité.</p>
              <p> *Etendre la formation des disciples au monde entier.</p>
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
