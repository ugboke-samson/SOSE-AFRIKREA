import React, { useState } from 'react';
import { Product } from '../data/fashionData';
import { Eye, Plus, Check, Scissors } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onOpenConsultation: (product: Product) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onQuickAdd,
  onOpenConsultation,
  searchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name'>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'bridal', label: 'Haute Bridal' },
    { id: 'ready-to-wear', label: 'Ready-to-Wear' },
    { id: 'occasion', label: 'Occasion & Gala' },
    { id: 'corsetry', label: 'Corsetry' },
    { id: 'ready-to-ship', label: 'Ready to Ship' },
  ];

  // Filtering
  const filteredProducts = products
    .filter((item) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'ready-to-ship'
          ? item.isReadyToShip
          : item.category === activeCategory;

      const matchesSearch = searchQuery.trim()
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.collection.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const handleQuickAddClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onQuickAdd(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="collections" className="py-20 md:py-28 bg-[#0c0c0c] text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a880] block mb-2">
            The Collections Archive
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-normal">
            Bespoke African Couture
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-light leading-relaxed">
            Every piece is tailored to your individual silhouette in our Benin City atelier. Order whenever you need, and our couturiers will craft or dispatch your selection directly.
          </p>
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-800 pb-5 mb-10 gap-4">
          {/* Functional category filter tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs tracking-wider uppercase whitespace-nowrap transition-colors border ${
                  activeCategory === cat.id
                    ? 'border-[#c5a880] bg-[#c5a880]/15 text-white font-medium'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-neutral-400">
            <span className="uppercase tracking-wider">Order View:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-neutral-200 focus:outline-none focus:border-[#c5a880]"
            >
              <option value="featured">Featured Runway Pieces</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Search Notice */}
        {searchQuery.trim() && (
          <div className="mb-6 text-xs text-neutral-400">
            Showing creations for "<span className="text-white font-medium">{searchQuery}</span>" ({filteredProducts.length} items)
          </div>
        )}

        {/* Product Cards Grid (Zero-Pill, NO AMOUNTS) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 bg-neutral-950 p-8 space-y-3">
            <p className="font-serif text-xl text-neutral-300">No creations found</p>
            <p className="text-xs text-neutral-500">
              Try adjusting your filter or submit a custom bespoke commission request.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
              }}
              className="px-5 py-2 text-xs uppercase tracking-wider bg-neutral-800 text-white hover:bg-neutral-700"
            >
              View All Creations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group cursor-pointer flex flex-col bg-[#111111] border border-neutral-800/80 hover:border-[#c5a880]/60 transition-all duration-300"
                >
                  {/* Image Frame with Dual Hover Preview */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                    />

                    {/* Secondary Image on Hover if available */}
                    {product.secondaryImage && (
                      <img
                        src={product.secondaryImage}
                        alt={`${product.name} detail`}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    )}

                    {/* Order Status Ribbon */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
                      {product.isBespokeOnly ? (
                        <span className="text-[10px] font-mono tracking-widest uppercase bg-black/85 backdrop-blur-md px-2 py-0.5 text-[#c5a880] border border-[#c5a880]/30">
                          Bespoke on Demand
                        </span>
                      ) : product.isReadyToShip ? (
                        <span className="text-[10px] font-mono tracking-widest uppercase bg-[#c5a880] px-2 py-0.5 text-black font-semibold">
                          Ready to Ship
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono tracking-widest uppercase bg-black/85 backdrop-blur-md px-2 py-0.5 text-neutral-300 border border-neutral-700">
                          Tailored to Measure
                        </span>
                      )}
                    </div>

                    {/* Quick Action Overlay Bar */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="flex-1 py-2 bg-neutral-900/90 hover:bg-black text-white text-[11px] uppercase tracking-wider border border-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect & Order</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAddClick(e, product)}
                        className="py-2 px-3 bg-[#c5a880] hover:bg-[#d6bc98] text-black text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                        title="Add to order bag"
                      >
                        {isAdded ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                        <span>{isAdded ? 'Added' : 'Order'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Metadata (NO AMOUNTS) */}
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#c5a880] mb-1">
                        <span>{product.collection}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.orderType}</span>
                      </div>

                      <h3 className="font-serif text-lg text-white font-normal group-hover:text-[#c5a880] transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2 font-light">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#c5a880]">
                        <Scissors className="w-3 h-3" />
                        <span className="font-mono text-[11px] tracking-wide uppercase">
                          Order Whenever Needed
                        </span>
                      </div>

                      <span className="text-[11px] text-neutral-400 group-hover:text-white transition-colors">
                        Place Order →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
