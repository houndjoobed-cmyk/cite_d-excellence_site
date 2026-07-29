import { MapPin, Navigation } from "lucide-react";
import { CHURCH_INFO } from "@/lib/constants";

export default function LocationSection() {
  return (
    <section className="py-20 px-4 md:px-margin-desktop bg-surface-container-low" id="location">
      <div className="max-w-container-max mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-secondary font-bold text-sm tracking-widest uppercase">
            <MapPin className="w-4 h-4" />
            <span>Où nous trouver</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary">
            Notre Localisation
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base">
            Venez nous rendre visite et participer à nos différents cultes et programmes. 
            Nous serons ravis de vous accueillir à la Cité d'Excellence.
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white p-2 rounded-3xl shadow-xl border border-outline-variant/20 relative overflow-hidden group">
          <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
            <iframe
              src="https://maps.google.com/maps?q=6.416534,2.345901&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-80 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-outline-variant/30 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="font-display font-bold text-primary mb-2">Cité d'Excellence</h3>
            <p className="text-sm text-on-surface-variant mb-4">{CHURCH_INFO.address}</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=6.416534,2.345901"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-secondary-container transition-colors w-full justify-center shadow-md"
            >
              <Navigation className="w-4 h-4" />
              Obtenir l'itinéraire
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
