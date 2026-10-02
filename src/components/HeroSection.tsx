import React from 'react';
import { ArrowRight, Sparkles, Scissors, Globe } from 'lucide-react';
import { SoseAfrikreaLogo } from './SoseAfrikreaLogo';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onExploreCollections: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onExploreCollections,
}) => {
  return (
    <div className="relative min-h-[92vh] flex items-center justify-center bg-[#080808] overflow-hidden text-neutral-100">
      {/* Background Editorial Visual with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
          alt="SOSE AFRIKREA Haute Couture Campaign"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top opacity-40 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for WCAG AA compliance (4.5:1 text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center">
        {/* Monogram Crest in Gold */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-500">
          <SoseAfrikreaLogo variant="monogram" color="#c5a880" size="lg" />
        </div>

        {/* Campaign Kicker (Zero-Pill clean typography) */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-[0.35em] uppercase text-[#c5a880] mb-4">
          <span>Haute Couture Collection 2026</span>
          <span aria-hidden="true">·</span>
          <span>Benin City, Edo State</span>
        </div>

        {/* Balanced Headline (no orphan words) */}
        <h1
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] max-w-4xl"
          style={{ textWrap: 'balance' as any }}
        >
          The Architecture of <br className="hidden sm:block" />
          <span className="italic font-normal text-[#f5ebd7]">African Haute Couture</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-neutral-300 max-w-2xl font-light leading-relaxed">
          Sculptural corsetry, regal hand-loomed textiles, and bespoke bridal masterpieces. Handcrafted by master pattern cutters in Benin City, Edo State, Nigeria. Available to order whenever you need.
        </p>

        {/* Action Controls */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreCollections}
            className="w-full sm:w-auto px-8 py-4 bg-[#c5a880] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#d8c09e] transition-all flex items-center justify-center gap-2 group shadow-xl"
          >
            <span>Explore Creations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-4 bg-black/60 backdrop-blur-md border border-neutral-700 hover:border-[#c5a880] text-neutral-200 hover:text-white text-xs tracking-widest uppercase transition-all"
          >
            Book Private Fitting
          </button>
        </div>

        {/* Trust & Craftsmanship Proof Ribbon */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <span className="font-serif text-lg text-white font-medium">Bespoke Bridal</span>
            <p className="text-[11px] text-neutral-400">Custom 24-bone corsetry</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg text-white font-medium">Order on Demand</span>
            <p className="text-[11px] text-neutral-400">Order whenever you need</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg text-white font-medium">Benin City Atelier</span>
            <p className="text-[11px] text-neutral-400">Edo State, Nigeria</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-lg text-white font-medium">VIP Concierge</span>
            <p className="text-[11px] text-neutral-400">+234 815 249 1946</p>
          </div>
        </div>
      </div>
    </div>
  );
};
