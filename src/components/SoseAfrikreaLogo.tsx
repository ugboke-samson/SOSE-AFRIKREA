import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'monogram' | 'full' | 'stacked';
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SoseAfrikreaLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  color = 'currentColor',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { h: 32, text: 'text-[9px] tracking-[0.3em]' },
    md: { h: 48, text: 'text-[11px] tracking-[0.35em]' },
    lg: { h: 64, text: 'text-[13px] tracking-[0.4em]' },
    xl: { h: 96, text: 'text-[16px] tracking-[0.45em]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {variant !== 'monogram' && (
        <span
          className={`font-sans font-medium uppercase text-neutral-200 transition-colors ${currentSize.text} mb-1.5`}
          style={{ letterSpacing: '0.38em' }}
        >
          SOSE AFRIKREA
        </span>
      )}

      {/* High-fidelity Vector Representation of the Sose Afrikrea Intertwined SA Ligature */}
      <svg
        viewBox="0 0 280 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto transition-transform duration-300"
        style={{ height: `${currentSize.h}px` }}
        role="img"
        aria-label="SOSE AFRIKREA Monogram"
      >
        <g stroke={color} fill="none">
          {/* Flourish Base Curve connecting S under A */}
          <path
            d="M 64 120 C 35 120 22 138 22 154 C 22 176 48 190 85 190 C 130 190 180 162 230 148 C 265 138 274 152 274 162 C 274 178 250 196 215 198"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* S Left Swash Loop */}
          <path
            d="M 64 120 C 45 120 25 105 25 86 C 25 64 52 50 82 50 C 95 50 115 54 126 62"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Core 'S' Letterform with Couture High Contrast Calligraphy */}
          <path
            d="M 124 58 C 115 52 98 48 82 48 C 50 48 30 65 30 86 C 30 108 50 120 78 128 C 112 138 128 148 128 168 C 128 188 106 200 78 200 C 56 200 38 190 32 180"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* S Solid Spine / Stem for luxury Bodoni feel */}
          <path
            d="M 126 60 C 104 52 82 66 70 82 C 60 98 62 114 80 124 C 108 138 124 150 122 168 C 120 184 100 196 78 196 C 58 196 42 184 38 178"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Core 'A' Right Diagonal Bold Stem */}
          <path
            d="M 174 46 L 236 174"
            strokeWidth="6"
            strokeLinecap="square"
          />
          {/* A Serif Foot Right */}
          <path
            d="M 218 174 L 254 174"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Core 'A' Left Hairline Diagonal */}
          <path
            d="M 174 46 L 128 174"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Elegant Inner Loop / Needle Motif of A */}
          <path
            d="M 174 46 C 160 75 145 110 145 130 C 145 152 162 166 182 166 C 204 166 220 146 220 126 C 220 102 195 85 178 85 C 166 85 160 92 160 102 C 160 114 172 122 184 122"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Pearl / Thread Knot Accents */}
          <circle cx="160" cy="102" r="3.2" fill={color} />
          <circle cx="126" cy="62" r="2.5" fill={color} />
        </g>

        {/* Serif Finesse on S Top Finial */}
        <path
          d="M 120 54 L 132 60 L 122 66 Z"
          fill={color}
        />
      </svg>
    </div>
  );
};
