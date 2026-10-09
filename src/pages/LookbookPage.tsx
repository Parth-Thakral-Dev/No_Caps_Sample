import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LOOKBOOK_ITEMS, PRODUCTS } from '../data/products';
import { ArrowUpRight, Maximize2, X, Eye } from 'lucide-react';
import { FASHION_EASING, imageCurtainReveal } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';

export const LookbookPage: React.FC = () => {
  const { isDark } = useTheme();
  const [viewMode, setViewMode] = useState<'story' | 'grid'>('story');
  const [selectedPlate, setSelectedPlate] = useState<(typeof LOOKBOOK_ITEMS)[0] | null>(null);

  const contactSheet = [
    { image: '/images/atelier_loom.jpg', label: 'FRAME 01 // PATTERN DRAFTING' },
    { image: '/images/atelier_weave.jpg', label: 'FRAME 02 // 320 GSM WEAVE' },
    { image: '/images/hero_model.jpg', label: 'FRAME 03 // TOKYO HERO TEST' },
    { image: '/images/lookbook_plate_5.jpg', label: 'FRAME 04 // BERLIN MONOLITH' },
    { image: '/images/lookbook_plate_6.jpg', label: 'FRAME 05 // INDUSTRIAL RUNWAY' },
    { image: '/images/streetwear_white.jpg', label: 'FRAME 06 // CHALK BONE CUT' },
    { image: '/images/streetwear_distressed.jpg', label: 'FRAME 07 // RAW SEAM FINISH' },
  ];

  return (
    <div className={`min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300 ${
      isDark ? 'bg-[#09090b] text-white' : 'bg-[#fafaf8] text-[#09090b]'
    }`}>
      {/* 1. Header with Staggered Mask Reveal */}
      <div className={`border-b pb-8 pt-4 transition-colors ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-zinc-500 uppercase tracking-widest">
              <span>EDITORIAL CAMPAIGN</span>
              <span>//</span>
              <span className="text-zinc-400">SERIES SS25: DISTORTION</span>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, ease: FASHION_EASING }}
                className={`font-display font-extrabold text-4xl sm:text-6xl tracking-tight uppercase ${
                  isDark ? 'text-white' : 'text-[#09090b]'
                }`}
              >
                LOOKBOOK: DISTORTION
              </motion.h1>
            </div>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-xl mt-2 leading-relaxed">
              Captured on location across Tokyo, Berlin, and Mumbai. An exploration of heavy draping, brutalist architectural structures, and raw cotton textures.
            </p>
          </div>

          {/* Controls: Mode Switcher & Plate Count */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className={`hidden sm:inline-block px-3 py-1.5 border text-[11px] ${
              isDark ? 'bg-zinc-900 border-white/10 text-zinc-400' : 'bg-zinc-100 border-black/10 text-zinc-700'
            }`}>
              {LOOKBOOK_ITEMS.length} EDITORIAL PLATES
            </span>

            {/* Layout Toggle */}
            <div className={`flex border p-0.5 ${isDark ? 'border-white/15 bg-zinc-950' : 'border-black/15 bg-white'}`}>
              <button
                onClick={() => setViewMode('story')}
                className={`px-3 py-1 uppercase text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                  viewMode === 'story'
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                EDITORIAL STORY
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 uppercase text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                DUAL GRID
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MODE: EDITORIAL STORY VIEW (High-impact single plate flow with interactive hotspots) */}
      {viewMode === 'story' && (
        <div className="space-y-28 pt-16">
          {LOOKBOOK_ITEMS.map((item, index) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: FASHION_EASING }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-b pb-20 ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                {/* Image Plate with Interactive Hotspots & Curtain Reveal */}
                <div className={`lg:col-span-8 relative group ${isReversed ? 'lg:order-2' : ''}`}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "100px" }}
                    variants={imageCurtainReveal}
                    className={`relative aspect-[4/5] sm:aspect-[16/11] border overflow-hidden shadow-2xl cursor-pointer ${
                      isDark ? 'bg-zinc-900 border-white/15' : 'bg-zinc-100 border-black/15'
                    }`}
                    onClick={() => setSelectedPlate(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                    {/* Interactive Hotspot Tag on Model */}
                    {product && (
                      <div
                        className="absolute z-20"
                        style={{ top: item.tagPosition.top, left: item.tagPosition.left }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative group/tag">
                          {/* Pulsing Hotspot Pin */}
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm cursor-pointer shadow-2xl shadow-white/40 border border-black"
                          >
                            +
                          </motion.div>

                          {/* Hover Popup Card */}
                          <div className={`absolute left-10 -top-12 w-64 p-4 shadow-2xl backdrop-blur-md opacity-0 group-hover/tag:opacity-100 transition-all duration-300 pointer-events-auto border z-30 ${
                            isDark ? 'bg-zinc-950/95 border-white/20' : 'bg-white/95 border-black/20 text-[#09090b]'
                          }`}>
                            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">FEATURED SILHOUETTE</span>
                            <p className="font-heading font-bold text-xs mt-0.5">{product.name}</p>
                            <p className="font-mono text-xs font-bold mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                            <div className="mt-2.5 pt-2 border-t border-zinc-700/30 flex items-center justify-between">
                              <span className="font-mono text-[10px] text-zinc-400">{product.gsm} GSM</span>
                              <Link
                                to={`/product/${product.id}`}
                                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 ${
                                  isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                                }`}
                              >
                                VIEW PIECE ↗
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Metadata Bar */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-zinc-300 border-t border-white/20 pt-2 backdrop-blur-sm pointer-events-none">
                      <span className="truncate pr-2">{item.subtitle}</span>
                      <span className="shrink-0">PLATE 0{index + 1}</span>
                    </div>

                    {/* Quick Lightbox Zoom Trigger Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/20 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Narrative Statement & Product Card */}
                <div className={`lg:col-span-4 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                    <span>PLATE SERIES</span>
                    <span>//</span>
                    <span className="font-bold text-zinc-400">0{index + 1} OF 0{LOOKBOOK_ITEMS.length}</span>
                  </div>

                  <h3 className={`font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight ${
                    isDark ? 'text-white' : 'text-[#09090b]'
                  }`}>
                    {item.title}
                  </h3>

                  <blockquote className={`border-l-2 pl-4 text-xs sm:text-sm font-mono italic leading-relaxed ${
                    isDark ? 'border-white text-zinc-300' : 'border-black text-zinc-700'
                  }`}>
                    "{item.statement}"
                  </blockquote>

                  {product && (
                    <div className={`border p-5 space-y-4 shadow-xl ${
                      isDark ? 'bg-zinc-950 border-white/10' : 'bg-white border-black/10'
                    }`}>
                      <div className="flex gap-4 items-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-20 object-cover bg-zinc-900 border border-white/10 shrink-0"
                        />
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] text-zinc-500 uppercase">{product.gsm} GSM FABRIC</span>
                          <h4 className={`font-heading font-bold text-xs line-clamp-1 ${
                            isDark ? 'text-white' : 'text-[#09090b]'
                          }`}>
                            {product.name}
                          </h4>
                          <p className="font-mono text-xs font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          to={`/product/${product.id}`}
                          className={`w-full py-2.5 font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
                            isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                          }`}
                        >
                          <span>INSPECT SILHOUETTE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 3. MODE: DUAL HIGH-FASHION GRID VIEW */}
      {viewMode === 'grid' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-12"
        >
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: FASHION_EASING }}
              className={`group border overflow-hidden cursor-pointer shadow-xl ${
                isDark ? 'bg-zinc-950 border-white/10 hover:border-white/30' : 'bg-white border-black/10 hover:border-black/30'
              }`}
              onClick={() => setSelectedPlate(item)}
            >
              <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 px-2 py-0.5 font-mono text-[9px] text-white">
                  PLATE 0{idx + 1}
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/20 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[11px] text-zinc-300">
                  <p className="font-bold text-white uppercase">{item.title}</p>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 4. BEHIND THE SCENES: ATELIER CONTACT SHEET FILMSTRIP */}
      <div className={`mt-24 pt-16 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              PRODUCTION ARCHIVE
            </span>
            <h3 className={`font-display font-extrabold text-2xl sm:text-3xl uppercase ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}>
              ATELIER CONTACT SHEET // 35MM
            </h3>
          </div>
          <span className="font-mono text-xs text-zinc-500">RAW ANALOG ARCHIVE // MUMBAI & BERLIN</span>
        </div>

        {/* Scrollable Horizontal Reel with Hover Zoom */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar">
          {contactSheet.map((frame, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className={`shrink-0 w-64 border overflow-hidden shadow-lg ${
                isDark ? 'bg-zinc-950 border-white/10' : 'bg-white border-black/10'
              }`}
            >
              <div className="aspect-[4/3] bg-zinc-900 overflow-hidden relative group">
                <img
                  src={frame.image}
                  alt={frame.label}
                  className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-3 font-mono text-[10px] text-zinc-400 border-t border-white/10 flex justify-between">
                <span className="truncate">{frame.label}</span>
                <span className="shrink-0 text-zinc-500 font-bold">#35mm</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. LIGHTBOX MODAL FOR FULLSCREEN PLATE INSPECTION */}
      <AnimatePresence>
        {selectedPlate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPlate(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: FASHION_EASING }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-zinc-950 border border-white/20 overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlate(null)}
                className="absolute top-4 right-4 z-20 bg-black/80 border border-white/20 p-2 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image View */}
              <div className="md:w-3/5 bg-zinc-900 relative aspect-[4/5] md:aspect-auto">
                <img
                  src={selectedPlate.image}
                  alt={selectedPlate.title}
                  className="w-full h-full object-contain md:object-cover grayscale contrast-125"
                />
              </div>

              {/* Sidebar Info */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-white font-mono">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span>SERIES SS25</span>
                    <span>//</span>
                    <span>{selectedPlate.subtitle}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl uppercase">
                    {selectedPlate.title}
                  </h3>

                  <blockquote className="border-l-2 border-white pl-3 text-xs text-zinc-300 italic">
                    "{selectedPlate.statement}"
                  </blockquote>

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <span className="text-[10px] text-zinc-500 uppercase block">FEATURED SILHOUETTE:</span>
                    <p className="font-bold text-sm text-white">{selectedPlate.productName}</p>
                    <p className="text-sm font-bold text-zinc-200">₹{selectedPlate.productPrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Link
                    to={`/product/${selectedPlate.productId}`}
                    onClick={() => setSelectedPlate(null)}
                    className="block w-full text-center bg-white text-black py-3.5 font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                  >
                    INSPECT GARMENT DETAILS ↗
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Footer CTA */}
      <div className={`text-center py-20 border-t mt-16 space-y-4 ${
        isDark ? 'border-white/10' : 'border-black/10'
      }`}>
        <h3 className={`font-display font-extrabold text-2xl sm:text-4xl uppercase ${
          isDark ? 'text-white' : 'text-[#09090b]'
        }`}>
          WANT TO EXPLORE ALL 12 SILHOUETTES?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 font-sans max-w-md mx-auto leading-relaxed">
          Every piece in this lookbook is produced in strictly limited runs of 150 units. No restocks once sold out.
        </p>
        <div className="pt-2">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              to="/shop"
              className={`inline-flex items-center gap-2 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-xl ${
                isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              <span>ENTER STORE CATALOGUE ↗</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
