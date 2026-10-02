import React from 'react';
import { Scissors, Sparkles, ShieldCheck, Globe, Clock, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/fashionData';

interface AtelierCraftsmanshipProps {
  onOpenConsultation: () => void;
}

export const AtelierCraftsmanship: React.FC<AtelierCraftsmanshipProps> = ({
  onOpenConsultation,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Private Client Profiling',
      desc: 'An intimate 1-on-1 dialogue exploring your event, silhouette aspirations, movement needs, and aesthetic vision.',
      icon: Clock,
    },
    {
      num: '02',
      title: 'Artisanal Fabric Curation',
      desc: 'Hand-loomed West African Aso-Oke, French Chantilly laces, pure mulberry silks, and custom Swarovski crystal beadwork palettes.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Architectural Patterning & Toile',
      desc: 'Precision 24-bone corsetry and sculpted toiles fitted to your individual posture and curves down to the half-millimeter.',
      icon: Scissors,
    },
    {
      num: '04',
      title: 'Archival White-Glove Delivery',
      desc: 'Carefully steamed, packed in temperature-resistant archival presentation trunks, and couriered securely worldwide.',
      icon: Globe,
    },
  ];

  return (
    <section id="atelier" className="py-20 md:py-28 bg-[#0c0c0c] text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heritage Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a880] block">
              The SOSE AFRIKREA Atelier
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
              Where Benin Heritage Meets Haute Couture Engineering
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              <p>
                Rooted in Benin City, Edo State, Nigeria, SOSE AFRIKREA stands at the vanguard of contemporary African luxury fashion. We honor the legendary sculptural artistry and royal regalia of the ancient Benin Kingdom—reimagined through the lens of classical haute couture and architectural corsetry.
              </p>
              <p>
                Every bespoke creation is tailored to order by master artisans in our Benin City atelier. Patrons can order whenever needed, with custom measurements or standard sizing tailored to your vision.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 bg-[#c5a880] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#d6bc98] transition-colors"
              >
                Schedule Private Fitting
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-neutral-900 border border-neutral-800 overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
                alt="Atelier Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-lg text-white">Benin City Atelier, Edo State</p>
                <p className="text-[11px] text-neutral-400 font-mono tracking-wider uppercase">
                  Master Pattern Cutters & Hand-Embroidery Artisans
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Bespoke Journey */}
        <div className="border-t border-neutral-800/80 pt-16 mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a880] block mb-2">
              The Bespoke Process
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-white font-normal">
              From First Sketch to Red Carpet
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-neutral-950 border border-neutral-800/80 p-6 flex flex-col justify-between hover:border-[#c5a880]/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-light text-[#c5a880]">
                        {st.num}
                      </span>
                      <Icon className="w-5 h-5 text-neutral-500" />
                    </div>
                    <h4 className="font-serif text-lg text-white mb-2">
                      {st.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="border-t border-neutral-800/80 pt-16">
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a880] block mb-2">
              Client Chronicles
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
              Words From Our Patrons
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/40 border border-neutral-800/80 p-6 flex flex-col justify-between"
              >
                <p className="font-serif text-sm text-neutral-200 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="border-t border-neutral-800 pt-4">
                  <p className="text-xs font-semibold text-white uppercase tracking-wider">
                    {t.author}
                  </p>
                  <p className="text-[11px] text-[#c5a880] mt-0.5">{t.role} · {t.location}</p>
                  <p className="text-[10px] text-neutral-500 font-mono mt-1">{t.gown}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
