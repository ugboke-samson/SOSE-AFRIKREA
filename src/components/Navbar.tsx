import React, { useState } from 'react';
import { ShoppingBag, Search, X, Menu, Phone } from 'lucide-react';
import { SoseAfrikreaLogo } from './SoseAfrikreaLogo';
import { CONCIERGE_PHONE, CONCIERGE_WHATSAPP } from '../data/fashionData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  onOpenSizeGuide: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenConsultation,
  onOpenSizeGuide,
  searchQuery,
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Bespoke Bridal', href: '#collections' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'The Atelier', href: '#atelier' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/92 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single Element Brand Zone */}
          <a
            href="/"
            className="flex items-center gap-3 text-white group whitespace-nowrap shrink-0"
            aria-label="SOSE AFRIKREA Home"
          >
            <SoseAfrikreaLogo
              variant="stacked"
              size="sm"
              color="#c5a880"
              className="text-neutral-200 group-hover:text-white transition-colors"
            />
          </a>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white hover:underline underline-offset-8 decoration-[#c5a880] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenSizeGuide}
              className="hover:text-white hover:underline underline-offset-8 decoration-[#c5a880] transition-colors"
            >
              Size Guide
            </button>
          </nav>

          {/* Zone 3: Functional Actions & Primary Action */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Direct Concierge Contact Link */}
            <a
              href={`https://wa.me/${CONCIERGE_WHATSAPP}?text=Hello%20SOSE%20AFRIKREA%20Atelier,%20I%20would%20like%20to%20place%20a%20bespoke%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-300 hover:text-white border border-neutral-800 hover:border-[#c5a880] transition-colors"
              title="Chat with VIP Concierge"
            >
              <Phone className="w-3 h-3 text-[#c5a880]" />
              <span className="font-mono text-[11px]">{CONCIERGE_PHONE}</span>
            </a>

            {/* Search Affordance */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Order Bag Button with Badge */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="View order bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
              <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline text-neutral-300">
                Order Bag
              </span>
              {cartCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a880] text-[10px] font-mono font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-medium uppercase tracking-wider text-black bg-[#c5a880] hover:bg-[#d6bc98] transition-colors whitespace-nowrap"
            >
              Place Custom Order
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input Row */}
        {isSearchOpen && (
          <div className="py-3 border-t border-neutral-800/80 flex items-center gap-3">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search bridal gowns, bespoke corsetry, silk kaftans, fabrics..."
              className="flex-1 bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs text-neutral-500 hover:text-white"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs text-neutral-400 hover:text-white uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-neutral-800 space-y-4">
            <nav className="flex flex-col space-y-3 text-xs uppercase tracking-widest text-neutral-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-1 hover:text-[#c5a880] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSizeGuide();
                }}
                className="text-left py-1 hover:text-[#c5a880] transition-colors uppercase tracking-widest"
              >
                Size & Measurement Guide
              </button>
            </nav>

            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
              <a
                href={`https://wa.me/${CONCIERGE_WHATSAPP}?text=Hello%20SOSE%20AFRIKREA%20Atelier,%20I%20would%20like%20to%20place%20a%20bespoke%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs border border-neutral-700 text-neutral-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Call Concierge: {CONCIERGE_PHONE}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-widest text-black bg-[#c5a880]"
              >
                Place Custom Order / Fitting
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
