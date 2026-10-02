export interface Product {
  id: string;
  name: string;
  category: 'bridal' | 'ready-to-wear' | 'occasion' | 'ready-to-ship' | 'corsetry';
  collection: string;
  orderType: string;
  description: string;
  details: string[];
  fabric: string;
  leadTime: string;
  image: string;
  secondaryImage?: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  featured?: boolean;
  isBespokeOnly?: boolean;
  isReadyToShip?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  season: string;
  tagline: string;
  description: string;
  image: string;
  products: {
    productId: string;
    productName: string;
    x: number;
    y: number;
  }[];
}

export const ATELIER_LOCATION = "Benin City, Edo State · Nigeria";
export const CONCIERGE_PHONE = "+234 815 249 1946";
export const CONCIERGE_WHATSAPP = "2348152491946";

export const PRODUCTS: Product[] = [
  {
    id: 'amina-bridal-gown',
    name: 'The Queen Amina Corset Gown',
    category: 'bridal',
    collection: 'Haute Bridal Couture',
    orderType: 'Bespoke Order on Demand',
    description: 'An architectural marvel of Nigerian bridal couture. Sculpted boned corsetry overlaid with hand-placed French Chantilly lace, embellished with over 12,000 iridescent Swarovski pearls and Austrian crystals, cascading into an opulent silk organza cathedral train.',
    details: [
      'Built-in 24-bone cupped corset with waist cinching harness',
      'Hand-beaded pearl illusion neckline and cathedral train (2.8m)',
      'Detachable royal overskirt for effortless reception transition',
      'Includes complimentary matching bridal veil with scallop lace trim'
    ],
    fabric: 'French Chantilly Lace, Heavy Silk Organza, Duchess Satin Lining',
    leadTime: 'Bespoke Atelier Production (Tailored to your date)',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85',
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'Custom Bespoke'],
    colors: [
      { name: 'Warm Ivory', hex: '#FDFBF7' },
      { name: 'Champagne Gold', hex: '#F3E7D3' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    featured: true,
    isBespokeOnly: true,
    rating: 5.0,
    reviewCount: 19
  },
  {
    id: 'moremi-emerald-couture',
    name: 'The Moremi Emerald Damask Gown',
    category: 'occasion',
    collection: 'Autumn / Winter Couture',
    orderType: 'Order on Demand',
    description: 'Regal African high fashion at its pinnacle. Tailored in sumptuous forest emerald silk damask with hand-threaded gold bullion embroidery along the architectural shoulder sculpt and asymmetric hip cascade.',
    details: [
      'Architectural shoulder silhouette engineered with invisible crinoline structure',
      'Asymmetric draping contouring the natural waistline',
      'Hand-finished gold bullion thread embellishments',
      'Concealed rear couture zipper with bespoke cloth buttons'
    ],
    fabric: 'Bespoke Emerald Silk Damask, Gold Lurex Weft, Silk Habotai Lining',
    leadTime: 'Crafted to Order on Demand',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'Custom Bespoke'],
    colors: [
      { name: 'Royal Emerald', hex: '#0B472A' },
      { name: 'Midnight Onyx', hex: '#111111' },
      { name: 'Imperial Crimson', hex: '#63101C' }
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 24
  },
  {
    id: 'zaria-jacquard-suit',
    name: 'The Zaria Jacquard Tuxedo Suit',
    category: 'ready-to-wear',
    collection: 'Power & Poise RTW',
    orderType: 'Ready to Ship / Made to Order',
    description: 'A sovereign statement of tailored feminine power. Sharp double-breasted jacket crafted in textured Nigerian geometric bronze jacquard, complemented by high-waisted cigarette trousers with satin tuxedo side stripes.',
    details: [
      'Tailored peak lapels in black duchess satin',
      'Signature SA engraved 24K gold-plated crested buttons',
      'Functional internal passport/lipstick pocket',
      'High-rise cigarette trouser with satin piping'
    ],
    fabric: 'Heavy Bronze Geometric Jacquard, Satin Contrast Trim',
    leadTime: 'Immediate Dispatch or Tailored to Measure',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    colors: [
      { name: 'Bronze Ochre', hex: '#8F572C' },
      { name: 'Obsidian Black', hex: '#1C1C1E' }
    ],
    featured: true,
    isReadyToShip: true,
    rating: 4.8,
    reviewCount: 31
  },
  {
    id: 'adire-sapphire-mermaid',
    name: 'The Adire Royal Mermaid Gown',
    category: 'bridal',
    collection: 'Aso Ebi Luxe',
    orderType: 'Bespoke Order on Demand',
    description: 'Honoring Yoruba & Edo textile heritage through contemporary haute couture. Traditional hand-resisted indigo Adire Eleko motifs reimagined on fluid micro-crepe with shimmering sapphire crystal cutwork and a structured godet hemline.',
    details: [
      'Authentic artisanal hand-drawn motif placement',
      'Deep sweetheart plunge with modesty illusion mesh',
      'Couture horsehair hem providing dramatic bell flare',
      'Finished with hand-sewn micro crystal beads'
    ],
    fabric: 'Artisanal Silk Adire, French Illusion Tulle, Silk Crepe',
    leadTime: 'Handmade to Order upon Request',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'UK 18', 'Custom Bespoke'],
    colors: [
      { name: 'Indigo Sapphire', hex: '#14213D' },
      { name: 'Rich Amethyst', hex: '#3C1B40' }
    ],
    featured: false,
    rating: 5.0,
    reviewCount: 14
  },
  {
    id: 'eko-pleated-midi',
    name: 'The Eko Pleated Silk Midi Dress',
    category: 'ready-to-wear',
    collection: 'Everyday by SOSE',
    orderType: 'Order on Demand',
    description: 'Sun-drenched Nigerian elegance for the modern muse. Masterfully accordion-pleated silk crepe de chine in warm ochre, featuring a high cowl neckline and an architectural obi belt that cinches the waist with effortless ease.',
    details: [
      'Permanent razor-edge sunburst pleating',
      'Reversible detachable Obi tie-belt',
      'Side inseam pockets and keyhole back closure',
      'Effortless day-to-night styling silhouette'
    ],
    fabric: '100% Pure Mulberry Silk Crepe de Chine',
    leadTime: 'Available for Immediate Order (Dispatches in 24-48H)',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    colors: [
      { name: 'Burnt Ochre', hex: '#C77D43' },
      { name: 'Terracotta Clay', hex: '#A84B29' },
      { name: 'Bone Ivory', hex: '#EDE8DF' }
    ],
    featured: true,
    isReadyToShip: true,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'idia-corset-peplum',
    name: 'The Queen Idia Sculpted Corset',
    category: 'corsetry',
    collection: 'The Benin Monogram Archive',
    orderType: 'Bespoke Order on Demand',
    description: 'An iconic tribute to the legendary Queen Mother Idia of Great Benin. Handcrafted in our Benin City atelier with traditional boning techniques, structured peplum flare, and intricate corded gold lace embroidery across the chest plate.',
    details: [
      '18-spiral steel boning for comfortable lumbar support and waist reduction',
      'Traditional lace-up back with modesty panel for custom sizing versatility',
      'Lined in breathable moisture-wicking organic cotton twill',
      'Pairs seamlessly with tailored trousers or full evening ball skirts'
    ],
    fabric: 'African Raw Silk Dupioni, Metallic Gold Filigree Lace',
    leadTime: 'Crafted to Order in Benin City',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85',
    sizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16', 'Custom Bespoke'],
    colors: [
      { name: 'Antique Gold & Black', hex: '#D4AF37' },
      { name: 'Pure Noir', hex: '#0D0D0D' }
    ],
    featured: false,
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: 'sahara-liquid-gold-column',
    name: 'The Sahara Liquid Gold Column Gown',
    category: 'occasion',
    collection: 'Autumn / Winter Couture',
    orderType: 'Order on Demand',
    description: 'A showstopping red carpet statement dress. Liquid shimmering metallic lamé sculpted into a seamless column gown, featuring a dramatic high-neck collar that dissolves into a floor-sweeping cape scarf.',
    details: [
      'Sculptural floor-grazing flowing shoulder cape (1.9m length)',
      'High side split tailored for confident movement',
      'Fully lined in soft stretch silk georgette',
      'Engineered internal body-shaping foundation'
    ],
    fabric: 'Liquid Metallic Gold Lamé, Stretch Silk Georgette',
    leadTime: 'Order on Demand (Tailored to your measurements)',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    sizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    colors: [
      { name: 'Liquid Gold', hex: '#E5C158' },
      { name: 'Liquid Bronze', hex: '#9E6838' },
      { name: 'Molten Silver', hex: '#D8D8D8' }
    ],
    featured: true,
    rating: 5.0,
    reviewCount: 22
  },
  {
    id: 'savannah-silk-kaftan',
    name: 'The Savannah Boubou Kaftan',
    category: 'ready-to-ship',
    collection: 'Everyday by SOSE',
    orderType: 'Ready to Ship',
    description: 'Contemporary interpretation of the majestic West African Boubou. Cut from fluid silk twill with geometric hand-embroidered neckline and subtle side vents, evoking effortless grandeur at resort or evening gatherings.',
    details: [
      'Relaxed, fluid one-size silhouette draping UK 8 to UK 20 effortlessly',
      'Includes optional inner ties for tailored waist definition',
      'Intricate gold chainstitch neck and cuff detailing',
      'Dispatched directly from our Benin City atelier'
    ],
    fabric: 'Heavy Silk Twill with Metallic Thread Embroidery',
    leadTime: 'Ready to Ship (Dispatches in 24 Hours)',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85',
    sizes: ['One Size (Fits UK 8 - UK 20)'],
    colors: [
      { name: 'Onyx & Gold', hex: '#1A1A1A' },
      { name: 'Royal Ivory', hex: '#FAF6EE' },
      { name: 'Lagoon Turquoise', hex: '#1C6E7D' }
    ],
    featured: false,
    isReadyToShip: true,
    rating: 4.9,
    reviewCount: 39
  }
];

export const LOOKBOOK_COLLECTIONS: LookbookItem[] = [
  {
    id: 'look-1-royal-amina',
    title: 'The Sovereign Bride',
    season: 'Autumn / Winter Couture',
    tagline: 'Sculptural corsetry meeting hand-loomed heritage',
    description: 'Captured at our private salon in Benin City. An ode to African royalty featuring 24-bone bespoke corsetry, French chantilly lace, and 12,000 hand-placed Swarovski pearls.',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1400&q=85',
    products: [
      { productId: 'amina-bridal-gown', productName: 'The Queen Amina Corset Gown', x: 50, y: 45 }
    ]
  },
  {
    id: 'look-2-emerald-dynasty',
    title: 'Emerald Dynasty',
    season: 'Occasion & Red Carpet',
    tagline: 'Architectural shoulders and rich African damask',
    description: 'A study in volume and commanding presence. Hand-woven gold bullion threads woven into forest emerald silk for red carpets worldwide.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1400&q=85',
    products: [
      { productId: 'moremi-emerald-couture', productName: 'The Moremi Emerald Damask Gown', x: 48, y: 52 }
    ]
  },
  {
    id: 'look-3-zaria-poise',
    title: 'Modern Power & Poise',
    season: 'Ready-to-Wear Signature',
    tagline: 'Precision tailored Nigerian bronze jacquard',
    description: 'Fusing bespoke sartorial tailoring with vibrant West African geometric jacquard weaves, crested with 24K gold monogram buttons.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
    products: [
      { productId: 'zaria-jacquard-suit', productName: 'The Zaria Jacquard Tuxedo Suit', x: 52, y: 40 }
    ]
  }
];

export const SIZE_CHART = [
  { uk: 'UK 6', us: 'US 2', eu: 'EU 34', bustIn: '31 - 32"', waistIn: '24 - 25"', hipIn: '34 - 35"', bustCm: '78-82', waistCm: '60-64', hipCm: '86-90' },
  { uk: 'UK 8', us: 'US 4', eu: 'EU 36', bustIn: '33 - 34"', waistIn: '26 - 27"', hipIn: '36 - 37"', bustCm: '83-87', waistCm: '65-69', hipCm: '91-95' },
  { uk: 'UK 10', us: 'US 6', eu: 'EU 38', bustIn: '35 - 36"', waistIn: '28 - 29"', hipIn: '38 - 39"', bustCm: '88-92', waistCm: '70-74', hipCm: '96-100' },
  { uk: 'UK 12', us: 'US 8', eu: 'EU 40', bustIn: '37 - 38"', waistIn: '30 - 31"', hipIn: '40 - 41"', bustCm: '93-97', waistCm: '75-79', hipCm: '101-105' },
  { uk: 'UK 14', us: 'US 10', eu: 'EU 42', bustIn: '39 - 41"', waistIn: '32 - 34"', hipIn: '42 - 44"', bustCm: '98-103', waistCm: '80-86', hipCm: '106-111' },
  { uk: 'UK 16', us: 'US 12', eu: 'EU 44', bustIn: '42 - 44"', waistIn: '35 - 37"', hipIn: '45 - 47"', bustCm: '104-111', waistCm: '87-94', hipCm: '112-119' },
  { uk: 'UK 18', us: 'US 14', eu: 'EU 46', bustIn: '45 - 47"', waistIn: '38 - 40"', hipIn: '48 - 50"', bustCm: '112-119', waistCm: '95-102', hipCm: '120-127' },
  { uk: 'UK 20', us: 'US 16', eu: 'EU 48', bustIn: '48 - 50"', waistIn: '41 - 43"', hipIn: '51 - 53"', bustCm: '120-127', waistCm: '103-110', hipCm: '128-135' }
];

export const TESTIMONIALS = [
  {
    quote: "SOSE AFRIKREA created my dream wedding gown at their Benin City atelier. The corsetry was so supportive yet comfortable that I danced until 4am without a single adjustment. Truly the pinnacle of African haute couture.",
    author: "Dr. Osasere Imasuen",
    role: "Bride & Physician",
    location: "Benin City & London",
    gown: "Bespoke Queen Amina Bridal Gown"
  },
  {
    quote: "The craftsmanship in the Queen Idia corset and Zaria suit reflects the royal majesty of Benin heritage. The atelier team took my measurements, tailored every seam to perfection, and delivered right on schedule.",
    author: "Folashade Alakija-Smith",
    role: "Managing Director, Global Ventures",
    location: "Abuja & Edo State",
    gown: "The Zaria Jacquard Suit"
  },
  {
    quote: "Ordering directly from the atelier via WhatsApp was effortless. They handled my exact bespoke measurements and dispatched the gown with white-glove packaging. It fits like a second skin.",
    author: "Zainab K. Mensah",
    role: "Art Curator & Collector",
    location: "New York & Lagos",
    gown: "Moremi Emerald Damask Gown"
  }
];
