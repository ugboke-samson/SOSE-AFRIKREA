import React, { useState } from 'react';
import { LOOKBOOK_COLLECTIONS, LookbookItem, Product } from '../data/fashionData';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectProduct,
  products,
}) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const activeLook = LOOKBOOK_COLLECTIONS[activeLookIndex];

  const handleOpenProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      onSelectProduct(prod);
    }
  };

  return (
    <section id="lookbook" className="py-20 md:py-28 bg-[#0a0a0a] text-neutral-100 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-neutral-800/80 pb-6 gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a880] block mb-2">
              Editorial Campaigns & Lookbook
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-normal">
              Lagos to the World
            </h2>
          </div>

          {/* Campaign Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {LOOKBOOK_COLLECTIONS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-4 py-2 text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                  activeLookIndex === idx
                    ? 'border-[#c5a880] bg-[#c5a880]/10 text-white font-medium'
                    : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {look.title}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Editorial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual with Hotspot Pins */}
          <div className="lg:col-span-8 relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-neutral-900 border border-neutral-800 group">
            <img
              src={activeLook.image}
              alt={activeLook.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Hotspot Pins */}
            {activeLook.products.map((item) => (
              <button
                key={item.productId}
                onClick={() => handleOpenProduct(item.productId)}
                style={{ top: `${item.y}%`, left: `${item.x}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 group/pin"
                title={`View ${item.productName}`}
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-[#c5a880] text-black items-center justify-center shadow-lg">
                    <Eye className="w-3 h-3 text-black" />
                  </span>
                </span>
                <span className="hidden sm:inline-block bg-black/90 backdrop-blur-md border border-[#c5a880]/40 text-neutral-100 text-[11px] px-3 py-1 tracking-wider whitespace-nowrap opacity-90 group-hover/pin:opacity-100 transition-opacity">
                  {item.productName}
                </span>
              </button>
            ))}

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a880]">
                  {activeLook.season}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white mt-1">
                  {activeLook.title}
                </h3>
              </div>
              <span className="text-xs text-neutral-400 hidden sm:block">
                Click pin to inspect garment
              </span>
            </div>
          </div>

          {/* Editorial Notes Column */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">
            <div className="border-l-2 border-[#c5a880] pl-4 py-1">
              <span className="text-xs font-mono tracking-widest uppercase text-[#c5a880]">
                Curator's Notes
              </span>
              <p className="font-serif text-xl text-neutral-100 italic mt-1">
                "{activeLook.tagline}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {activeLook.description}
            </p>

            {/* Featured Product In This Look */}
            {activeLook.products.length > 0 && (
              <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                  Highlighted In This Editorial:
                </span>
                {activeLook.products.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between">
                    <span className="font-serif text-sm text-white">{item.productName}</span>
                    <button
                      onClick={() => handleOpenProduct(item.productId)}
                      className="text-xs text-[#c5a880] hover:text-[#e4cfb4] flex items-center gap-1 font-medium tracking-wider uppercase"
                    >
                      Shop Look
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <a
                href="#collections"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a880] hover:text-white transition-colors"
              >
                <span>View Full Runway Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
