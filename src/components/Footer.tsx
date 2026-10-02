import React, { useState } from 'react';
import { SoseAfrikreaLogo } from './SoseAfrikreaLogo';
import { Check, MapPin, Phone, MessageSquare } from 'lucide-react';
import { CONCIERGE_PHONE, CONCIERGE_WHATSAPP, ATELIER_LOCATION } from '../data/fashionData';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenSizeGuide,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#070707] text-neutral-300 border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col items-start">
              <SoseAfrikreaLogo variant="full" size="md" color="#c5a880" />
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm pt-2">
              SOSE AFRIKREA is a luxury African haute couture fashion house honoring indigenous Edo and African textile craftsmanship with architectural corsetry and bespoke precision tailoring.
            </p>
            <div className="space-y-2 text-xs text-neutral-300 pt-2 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <span>{ATELIER_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                <a
                  href={`tel:${CONCIERGE_PHONE.replace(/\s+/g, '')}`}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  VIP Atelier Concierge: {CONCIERGE_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${CONCIERGE_WHATSAPP}?text=Hello%20SOSE%20AFRIKREA%20Atelier,%20I%20would%20like%20to%20order%20a%20garment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: Chat with Head Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880]">
              Collections & Ordering
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Haute Bridal Couture
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Occasion & Gala Eveningwear
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Power Suiting & Corsetry
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-white transition-colors">
                  Ready to Ship (Benin City Hub)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="hover:text-white transition-colors text-left"
                >
                  Place Bespoke Order / Private Fitting
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors text-left"
                >
                  Size & Silhouette Measurement Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Private Salon Circle */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880]">
              Private Salon Circle
            </h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Inscribe your email for confidential previews of upcoming bridal and runway drops, priority atelier production slots, and private salon viewings in Benin City.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-neutral-900 border border-[#c5a880]/40 text-xs text-neutral-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c5a880]" />
                <span>You are now inscribed in the SOSE AFRIKREA salon ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#141414] border border-neutral-800 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c5a880] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#d6bc98] transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} SOSE AFRIKREA HAUTE COUTURE · Benin City, Edo State, Nigeria.</p>
          <div className="flex items-center gap-6">
            <span>Bespoke on Demand</span>
            <span>Tailored to Measure</span>
            <span>Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
