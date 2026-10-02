import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { SIZE_CHART } from '../data/fashionData';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [userBust, setUserBust] = useState<string>('');
  const [userWaist, setUserWaist] = useState<string>('');
  const [userHip, setUserHip] = useState<string>('');

  if (!isOpen) return null;

  // Simple sizing recommendation helper
  const getRecommendation = () => {
    const bustNum = parseFloat(userBust);
    const waistNum = parseFloat(userWaist);

    if (isNaN(bustNum) || isNaN(waistNum)) return null;

    const bustInches = unit === 'cm' ? bustNum / 2.54 : bustNum;
    const waistInches = unit === 'cm' ? waistNum / 2.54 : waistNum;

    if (bustInches <= 32 && waistInches <= 25) return 'UK 6';
    if (bustInches <= 34 && waistInches <= 27) return 'UK 8';
    if (bustInches <= 36 && waistInches <= 29) return 'UK 10';
    if (bustInches <= 38 && waistInches <= 31) return 'UK 12';
    if (bustInches <= 41 && waistInches <= 34) return 'UK 14';
    if (bustInches <= 44 && waistInches <= 37) return 'UK 16';
    if (bustInches <= 47 && waistInches <= 40) return 'UK 18';
    if (bustInches <= 50 && waistInches <= 43) return 'UK 20';
    return 'Custom Bespoke Pattern Required';
  };

  const recommended = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-[#121212] border border-neutral-800 text-neutral-100 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-800 pb-4 mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880]">
              <Ruler className="w-3.5 h-3.5" />
              <span>Atelier Size & Silhouette Guide</span>
            </div>
            <h2 className="font-serif text-2xl text-white mt-1">Sizing Matrix</h2>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 self-start sm:self-auto">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                unit === 'inches'
                  ? 'bg-[#c5a880] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                unit === 'cm'
                  ? 'bg-[#c5a880] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Interactive Size Recommender */}
        <div className="mb-6 p-4 bg-neutral-950 border border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-medium text-white mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Find Your Exact Sose Afrikrea Fit</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">
                Bust ({unit})
              </label>
              <input
                type="number"
                value={userBust}
                onChange={(e) => setUserBust(e.target.value)}
                placeholder={unit === 'inches' ? '36' : '91'}
                className="w-full bg-[#181818] border border-neutral-700 px-3 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">
                Waist ({unit})
              </label>
              <input
                type="number"
                value={userWaist}
                onChange={(e) => setUserWaist(e.target.value)}
                placeholder={unit === 'inches' ? '28' : '71'}
                className="w-full bg-[#181818] border border-neutral-700 px-3 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">
                Hips ({unit})
              </label>
              <input
                type="number"
                value={userHip}
                onChange={(e) => setUserHip(e.target.value)}
                placeholder={unit === 'inches' ? '40' : '101'}
                className="w-full bg-[#181818] border border-neutral-700 px-3 py-1.5 text-white"
              />
            </div>
          </div>

          {recommended && (
            <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-300">
                Recommended Standard Size: <strong className="text-[#c5a880] text-sm">{recommended}</strong>
              </span>
              {onSelectSize && recommended.startsWith('UK') && (
                <button
                  onClick={() => {
                    onSelectSize(recommended);
                    onClose();
                  }}
                  className="px-3 py-1 bg-[#c5a880] text-black text-xs font-semibold uppercase tracking-wider"
                >
                  Apply {recommended}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-400">
                <th className="py-2.5 px-3">UK</th>
                <th className="py-2.5 px-3">US</th>
                <th className="py-2.5 px-3">EU</th>
                <th className="py-2.5 px-3">Bust ({unit})</th>
                <th className="py-2.5 px-3">Waist ({unit})</th>
                <th className="py-2.5 px-3">Hip ({unit})</th>
                {onSelectSize && <th className="py-2.5 px-3 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-200">
              {SIZE_CHART.map((row) => {
                const isSelected = recommended === row.uk;
                return (
                  <tr
                    key={row.uk}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#c5a880]/15 text-white font-semibold' : 'hover:bg-neutral-900/50'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-white">{row.uk}</td>
                    <td className="py-2.5 px-3 text-neutral-400">{row.us}</td>
                    <td className="py-2.5 px-3 text-neutral-400">{row.eu}</td>
                    <td className="py-2.5 px-3">
                      {unit === 'inches' ? row.bustIn : row.bustCm}
                    </td>
                    <td className="py-2.5 px-3">
                      {unit === 'inches' ? row.waistIn : row.waistCm}
                    </td>
                    <td className="py-2.5 px-3">
                      {unit === 'inches' ? row.hipIn : row.hipCm}
                    </td>
                    {onSelectSize && (
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => {
                            onSelectSize(row.uk);
                            onClose();
                          }}
                          className="px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider border border-neutral-700 hover:border-[#c5a880] text-neutral-300 hover:text-white"
                        >
                          Select
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* How to Measure Instructions */}
        <div className="mt-6 pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
          <div>
            <strong className="text-white block mb-1">01. Bust</strong>
            Measure around the fullest part of your chest, keeping the tape level across your shoulder blades.
          </div>
          <div>
            <strong className="text-white block mb-1">02. Waist</strong>
            Measure around the natural narrowest circumference of your torso, typically 1-2 inches above the navel.
          </div>
          <div>
            <strong className="text-white block mb-1">03. Hips</strong>
            Stand with heels together and measure around the fullest point of your hips and rear.
          </div>
        </div>
      </div>
    </div>
  );
};
