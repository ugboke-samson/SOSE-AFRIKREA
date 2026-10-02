import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { Product, CONCIERGE_PHONE, CONCIERGE_WHATSAPP, ATELIER_LOCATION } from '../data/fashionData';

export interface CartItem {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  customMeasurements?: {
    bust?: string;
    waist?: string;
    hips?: string;
    height?: string;
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOpenConsultation: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenConsultation,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [orderRef, setOrderRef] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Benin City',
    stateCountry: 'Edo State, Nigeria',
    eventDate: '',
    specialNotes: '',
  });

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SA-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setCheckoutStep('success');
  };

  const handleFinishCheckout = () => {
    setIsCheckingOut(false);
    setCheckoutStep('form');
    onClearCart();
    onClose();
  };

  // WhatsApp order dispatch summary
  const generateWhatsAppOrderText = () => {
    const itemsList = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (Size: ${it.size}, Color: ${it.color}, Qty: ${it.quantity}${
            it.customMeasurements?.bust ? ` | Custom B:${it.customMeasurements.bust}, W:${it.customMeasurements.waist}, H:${it.customMeasurements.hips}` : ''
          })`
      )
      .join('\n');

    return encodeURIComponent(
      `Hello SOSE AFRIKREA Atelier (Benin City),\nI would like to place an order for the following creations:\n\n${itemsList}\n\nPlease confirm availability and measurements.`
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#111111] border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
              <div>
                <h2 className="font-serif text-lg tracking-wide uppercase">Your Order Bag</h2>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {ATELIER_LOCATION}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isCheckingOut ? (
              checkoutStep === 'form' ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="border-b border-neutral-800 pb-3 mb-4">
                    <h3 className="font-serif text-lg text-[#c5a880] uppercase tracking-wider">
                      Place Your Order on Demand
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Our Benin City atelier contacts you promptly via phone/WhatsApp to confirm measurements and delivery date.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Osasere Imasuen"
                      className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 815..."
                        className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@domain.com"
                        className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Delivery Address *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address, residence, or suite"
                      className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Benin City, Lagos, Abuja..."
                        className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                        State / Country *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.stateCountry}
                        onChange={(e) => setFormData({ ...formData, stateCountry: e.target.value })}
                        placeholder="Edo State, Nigeria / International"
                        className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Event Date or Target Delivery Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Tailoring & Fitting Notes
                    </label>
                    <textarea
                      rows={2}
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      placeholder="e.g. Specific hem length, preferred fabric shade, urgent dispatch..."
                      className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#c5a880] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#d6bc98] transition-colors"
                    >
                      Submit Bespoke Order
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full mt-2 py-2 text-xs text-neutral-400 hover:text-white uppercase tracking-wider"
                    >
                      Back to Bag Review
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a880]/10 flex items-center justify-center text-[#c5a880]">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#f3e7d3]">Order Registered</h3>
                  <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.fullName}</span>. 
                    Your order <span className="font-mono text-[#c5a880]">{orderRef}</span> has been routed to our Benin City atelier.
                  </p>
                  <div className="p-4 bg-neutral-900/60 border border-neutral-800 text-left text-xs space-y-2 text-neutral-300">
                    <p className="font-semibold text-[#c5a880] uppercase tracking-wider">Atelier Concierge Contact</p>
                    <p>Phone / WhatsApp: <strong className="text-white font-mono">{CONCIERGE_PHONE}</strong></p>
                    <p>Location: {ATELIER_LOCATION}</p>
                    <p>Delivery: Dispatch arranged to {formData.city}, {formData.stateCountry}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={`https://wa.me/${CONCIERGE_WHATSAPP}?text=Hello%20Atelier,%20I%20just%20placed%20order%20${orderRef}%20for%20${encodeURIComponent(formData.fullName)}.%20Please%20confirm.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-[#25D366] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </a>

                    <button
                      onClick={handleFinishCheckout}
                      className="w-full py-2.5 border border-neutral-700 text-neutral-300 text-xs tracking-wider uppercase hover:text-white"
                    >
                      Return to Boutique
                    </button>
                  </div>
                </div>
              )
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="font-serif text-lg text-neutral-300">Your order bag is currently empty</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Browse our creations and select pieces to order whenever you need them.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-neutral-800 text-neutral-200 text-xs uppercase tracking-wider hover:bg-neutral-700 transition-colors"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div
                    key={`${item.id}-${item.size}-${idx}`}
                    className="flex gap-4 pb-4 border-b border-neutral-800/80 items-start"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-26 object-cover bg-neutral-900 border border-neutral-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-neutral-100 truncate">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                        <span>Size: <strong className="text-neutral-200">{item.size}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>{item.color}</span>
                      </div>

                      {item.customMeasurements && (
                        <div className="mt-1 text-[10px] text-[#c5a880] bg-[#c5a880]/10 p-1 rounded-sm border border-[#c5a880]/20">
                          Bespoke Fit (B: {item.customMeasurements.bust || '-'}, W: {item.customMeasurements.waist || '-'}, H: {item.customMeasurements.hips || '-'})
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-neutral-700">
                          <button
                            onClick={() => onUpdateQuantity(idx, -1)}
                            className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono tabular-nums text-neutral-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, 1)}
                            className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[11px] uppercase tracking-wider text-[#c5a880]">
                            Order on Demand
                          </span>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions (NO AMOUNTS) */}
          {!isCheckingOut && items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-[#141414] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Pieces</span>
                  <span className="font-mono text-white">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} Creation(s)
                  </span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Production & Delivery</span>
                  <span className="text-[#c5a880]">Handcrafted in Benin City</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 bg-[#c5a880] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#d6bc98] transition-colors flex items-center justify-center gap-2"
                >
                  Proceed with Order Details
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${CONCIERGE_WHATSAPP}?text=${generateWhatsAppOrderText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366]/30 text-white text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Order Directly via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    onOpenConsultation();
                  }}
                  className="w-full py-2.5 border border-neutral-700 text-neutral-300 text-xs tracking-wider uppercase hover:border-[#c5a880] hover:text-white transition-colors"
                >
                  Book Private Fitting Consultation
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Benin City Atelier · Direct Concierge Support</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
