import React, { useState } from 'react';
import { X, Ruler, Check, Shield, Clock, Sparkles, Phone, MessageSquare } from 'lucide-react';
import { Product, CONCIERGE_PHONE, CONCIERGE_WHATSAPP } from '../data/fashionData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    size: string,
    color: string,
    quantity: number,
    customMeasurements?: { bust: string; waist: string; hips: string; height: string }
  ) => void;
  onOpenSizeGuide: () => void;
  onOpenConsultation: (initialProduct?: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
  onOpenConsultation,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'UK 10');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [showCustomFitForm, setShowCustomFitForm] = useState<boolean>(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  // Custom bespoke measurements
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: '',
  });

  const handleAdd = () => {
    onAddToCart(
      product,
      selectedSize,
      selectedColor,
      quantity,
      showCustomFitForm ? measurements : undefined
    );
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
      onClose();
    }, 900);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SOSE AFRIKREA Atelier, I would like to order "${product.name}" in size ${selectedSize} (${selectedColor}). Please advise on production and measurements.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-[#121212] border border-neutral-800 text-neutral-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black text-neutral-300 hover:text-white rounded-full transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery Column */}
        <div className="md:w-1/2 flex flex-col bg-[#0a0a0a] border-r border-neutral-800/80">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-all duration-500"
            />
            {product.isBespokeOnly && (
              <span className="absolute top-4 left-4 bg-black/85 backdrop-blur-md border border-[#c5a880]/40 text-[#c5a880] text-[10px] tracking-widest uppercase px-2.5 py-1">
                Bespoke Atelier Creation
              </span>
            )}
            {product.isReadyToShip && (
              <span className="absolute top-4 left-4 bg-[#c5a880] text-black font-semibold text-[10px] tracking-widest uppercase px-2.5 py-1">
                Ready to Ship · Dispatch from Benin City
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.secondaryImage && (
            <div className="flex gap-2 p-3 bg-neutral-950 border-t border-neutral-800/80">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-14 h-16 border overflow-hidden transition-all ${
                  activeImage === product.image ? 'border-[#c5a880]' : 'border-neutral-800 opacity-60'
                }`}
              >
                <img
                  src={product.image}
                  alt="Front view"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                onClick={() => setActiveImage(product.secondaryImage!)}
                className={`w-14 h-16 border overflow-hidden transition-all ${
                  activeImage === product.secondaryImage ? 'border-[#c5a880]' : 'border-neutral-800 opacity-60'
                }`}
              >
                <img
                  src={product.secondaryImage}
                  alt="Detail view"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Module (NO AMOUNTS) */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[92vh]">
          <div className="space-y-5">
            {/* Collection & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#c5a880]">
                <span>{product.collection}</span>
                <span aria-hidden="true">·</span>
                <span>{product.orderType}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-normal text-white mt-1">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-xs text-neutral-300">
                <span className="text-[#c5a880] uppercase tracking-wider font-mono">
                  Order whenever you need it
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-400">Benin City Atelier</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  Atelier Palette: <strong className="text-white font-normal">{selectedColor}</strong>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                        selectedColor === color.name
                          ? 'border-[#c5a880] ring-2 ring-[#c5a880]/30 scale-110'
                          : 'border-neutral-700 hover:border-neutral-500'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-neutral-400">
                  Select Size
                </label>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-xs text-[#c5a880] hover:text-[#d6bc98] flex items-center gap-1.5 underline decoration-[#c5a880]/40 transition-colors"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Silhouette Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedSize(sz);
                      if (sz === 'Custom Bespoke') setShowCustomFitForm(true);
                    }}
                    className={`py-2 px-1 text-xs font-mono transition-all text-center ${
                      selectedSize === sz
                        ? 'bg-[#c5a880] text-black font-semibold shadow-sm'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Sizing Accordion / Inputs */}
            <div className="border border-neutral-800/80 bg-neutral-950 p-3.5">
              <button
                type="button"
                onClick={() => setShowCustomFitForm(!showCustomFitForm)}
                className="w-full flex items-center justify-between text-xs text-neutral-300 hover:text-white"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Provide Custom Bespoke Measurements</span>
                </div>
                <span className="text-[#c5a880] font-mono">{showCustomFitForm ? '−' : '+'}</span>
              </button>

              {showCustomFitForm && (
                <div className="mt-3 pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] uppercase text-neutral-400">Bust (inches/cm)</label>
                    <input
                      type="text"
                      placeholder="e.g. 36 in"
                      value={measurements.bust}
                      onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                      className="w-full mt-1 bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-neutral-400">Waist (inches/cm)</label>
                    <input
                      type="text"
                      placeholder="e.g. 28 in"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                      className="w-full mt-1 bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-neutral-400">Hips (inches/cm)</label>
                    <input
                      type="text"
                      placeholder="e.g. 40 in"
                      value={measurements.hips}
                      onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                      className="w-full mt-1 bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-neutral-400">Height / Heel Height</label>
                    <input
                      type="text"
                      placeholder="e.g. 5'8 + heels"
                      value={measurements.height}
                      onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                      className="w-full mt-1 bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Garment Highlights */}
            <div className="space-y-2 pt-2 border-t border-neutral-800 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white">Production Schedule:</span> {product.leadTime}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white">Fabrication:</span> {product.fabric}
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-neutral-800 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-[#c5a880] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#d6bc98] transition-colors flex items-center justify-center gap-2"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Order Bag</span>
                  </>
                ) : (
                  <span>Order This Creation</span>
                )}
              </button>

              <a
                href={`https://wa.me/${CONCIERGE_WHATSAPP}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366]/30 text-white text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                title="Direct WhatsApp Order"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Atelier</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <span>Atelier Concierge: {CONCIERGE_PHONE}</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenConsultation(product);
                }}
                className="text-[#c5a880] hover:underline"
              >
                Book Benin City Fitting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
