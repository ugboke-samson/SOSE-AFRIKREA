import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Sparkles, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { Product, CONCIERGE_PHONE, CONCIERGE_WHATSAPP, ATELIER_LOCATION } from '../data/fashionData';

interface BespokeConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
}

export const BespokeConsultationModal: React.FC<BespokeConsultationModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    consultationType: 'benin-city-atelier', // 'benin-city-atelier' | 'virtual-vip'
    serviceType: initialProduct ? initialProduct.name : 'Bridal Haute Couture',
    eventDate: '',
    preferredDate: '',
    preferredTime: '11:00 AM',
    notes: initialProduct ? `Inquiring specifically about ${initialProduct.name}.` : '',
  });

  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SA-VIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setStep('confirmed');
  };

  const handleReset = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#111111] border border-neutral-800 text-neutral-100 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#c5a880]">
                Private Atelier Appointments
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                Book Your Bespoke Consultation
              </h2>
              <p className="text-xs text-neutral-400 mt-2">
                Meet with our master couturiers in Benin City, Edo State, or join a virtual session from anywhere.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Consultation Location Format */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  1. Consultation Experience & Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`flex flex-col p-3 border cursor-pointer transition-all ${
                      formData.consultationType === 'benin-city-atelier'
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="consultationType"
                      value="benin-city-atelier"
                      checked={formData.consultationType === 'benin-city-atelier'}
                      onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-1.5 font-medium text-neutral-200">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>Benin City Flagship Atelier</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1">{ATELIER_LOCATION}</span>
                  </label>

                  <label
                    className={`flex flex-col p-3 border cursor-pointer transition-all ${
                      formData.consultationType === 'virtual-vip'
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="consultationType"
                      value="virtual-vip"
                      checked={formData.consultationType === 'virtual-vip'}
                      onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-1.5 font-medium text-neutral-200">
                      <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>Virtual VIP Video Consultation</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1">1-on-1 Video Fitting & Swatches</span>
                  </label>
                </div>
              </div>

              {/* Service Type & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Couture Category *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="Bridal Haute Couture">Bridal Haute Couture (Gown + Veil)</option>
                    <option value="Aso Ebi & Royal Wedding Guest">Aso Ebi & Royal Wedding Guest</option>
                    <option value="Red Carpet & Gala Eveningwear">Red Carpet & Gala Eveningwear</option>
                    <option value="Bespoke Power Suiting & Corsetry">Bespoke Power Suiting & Corsetry</option>
                    <option value="Order on Demand Inquiries">Order on Demand Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Wedding or Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Preferred Consultation Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                  >
                    <option value="10:00 AM">10:00 AM West Africa Time (WAT)</option>
                    <option value="11:30 AM">11:30 AM West Africa Time (WAT)</option>
                    <option value="02:00 PM">02:00 PM West Africa Time (WAT)</option>
                    <option value="03:30 PM">03:30 PM West Africa Time (WAT)</option>
                    <option value="05:00 PM">05:00 PM West Africa Time (WAT)</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 815..."
                    className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Vision Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                  Design Vision & Custom Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about the silhouette, fabrics, or any inspirations you have..."
                  className="w-full bg-[#181818] border border-neutral-700 px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c5a880] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#d6bc98] transition-colors"
                >
                  Confirm Atelier Appointment Request
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 mt-2">
                  <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>VIP Atelier Concierge: {CONCIERGE_PHONE}</span>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#c5a880]">
                Appointment Reserved
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                We Look Forward to Welcoming You
              </h3>
            </div>

            <div className="p-5 bg-neutral-900/80 border border-neutral-800 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Booking Reference</span>
                <span className="font-mono text-[#c5a880] font-semibold">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Client</span>
                <span className="text-white font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Service</span>
                <span className="text-white">{formData.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Location</span>
                <span className="text-white">
                  {formData.consultationType === 'benin-city-atelier'
                    ? 'Benin City Flagship Atelier'
                    : 'Virtual VIP Video Session'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Scheduled Date & Time</span>
                <span className="text-white">{formData.preferredDate || 'Upcoming Date'} at {formData.preferredTime}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${CONCIERGE_WHATSAPP}?text=Hello%20Atelier,%20I%20have%20booked%20consultation%20${bookingRef}%20for%20${encodeURIComponent(formData.fullName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Concierge on WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="px-6 py-3 border border-neutral-700 text-white text-xs tracking-widest uppercase hover:border-[#c5a880] transition-colors"
              >
                Done & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
