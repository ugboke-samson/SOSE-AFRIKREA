import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { LookbookSection } from './components/LookbookSection';
import { AtelierCraftsmanship } from './components/AtelierCraftsmanship';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BespokeConsultationModal } from './components/BespokeConsultationModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { PRODUCTS, Product, CONCIERGE_PHONE, CONCIERGE_WHATSAPP, ATELIER_LOCATION } from './data/fashionData';
import { Check, Phone, MessageSquare } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Order bag state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationProduct, setConsultationProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Quick feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    customMeasurements?: { bust: string; waist: string; hips: string; height: string }
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${Date.now()}`,
          product,
          size,
          color,
          quantity,
          customMeasurements,
        },
      ];
    });

    showToast(`Added ${product.name} (${size}) to order bag`);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0] || 'UK 10';
    const defaultColor = product.colors[0]?.name || 'Standard';
    handleAddToCart(product, defaultSize, defaultColor, 1);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index].quantity = newQty;
      }
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenConsultationForProduct = (product?: Product) => {
    setConsultationProduct(product || null);
    setIsConsultationOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f5f3ef] selection:bg-[#c5a880] selection:text-black flex flex-col font-sans">
      {/* Top Banner Notice: Benin City, Edo State · Nigeria & VIP Concierge */}
      <div className="bg-[#141414] border-b border-neutral-800 text-[11px] py-2 px-4 text-center text-neutral-300 font-mono tracking-wider flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="text-[#c5a880] font-semibold">SOSE AFRIKREA ATELIER</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <span>{ATELIER_LOCATION}</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <a
          href={`tel:${CONCIERGE_PHONE.replace(/\s+/g, '')}`}
          className="flex items-center gap-1 text-white hover:text-[#c5a880] transition-colors"
        >
          <Phone className="w-3 h-3 text-[#c5a880]" />
          <span>VIP Concierge: {CONCIERGE_PHONE}</span>
        </a>
        <span aria-hidden="true" className="hidden md:inline">·</span>
        <span className="text-neutral-400 hidden md:inline">Bespoke Orders on Demand</span>
      </div>

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => handleOpenConsultationForProduct()}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenConsultation={() => handleOpenConsultationForProduct()}
          onExploreCollections={scrollToCollections}
        />

        <ProductGrid
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
          onOpenConsultation={(p) => handleOpenConsultationForProduct(p)}
          searchQuery={searchQuery}
        />

        <LookbookSection
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        <AtelierCraftsmanship
          onOpenConsultation={() => handleOpenConsultationForProduct()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultationForProduct()}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Modals & Slide-Overs */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenConsultation={(p) => handleOpenConsultationForProduct(p)}
      />

      <BespokeConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => {
          setIsConsultationOpen(false);
          setConsultationProduct(null);
        }}
        initialProduct={consultationProduct}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenConsultation={() => handleOpenConsultationForProduct()}
      />

      {/* Instant Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161616] border border-[#c5a880] text-white px-4 py-3 shadow-2xl flex items-center gap-3 animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-[#c5a880] text-black flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-serif tracking-wide">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-[11px] text-[#c5a880] underline font-mono ml-2 uppercase"
          >
            View Bag
          </button>
        </div>
      )}
    </div>
  );
}
