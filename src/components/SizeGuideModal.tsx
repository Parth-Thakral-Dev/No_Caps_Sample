import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Check } from 'lucide-react';
import { SIZE_CHART } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0d0d11] border border-white/10 text-white shadow-2xl p-6 sm:p-8"
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1"
                aria-label="Close size guide"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                <Ruler className="w-4 h-4 text-white" />
                <span>ARCHITECTURAL FIT SPECIFICATIONS</span>
              </div>
              <h3 className="font-display font-bold text-2xl tracking-tight mb-2">
                NO CAPS® OVERSIZED SIZE MATRIX
              </h3>
              <p className="text-xs text-zinc-400 font-sans mb-6">
                Our silhouettes are intentionally engineered with exaggerated drop shoulders and wide chest profiles. If you prefer a tailored fit, size down one full size.
              </p>

              {/* Unit Toggle */}
              <div className="flex justify-end mb-3">
                <div className="inline-flex border border-white/10 p-0.5 bg-zinc-900 font-mono text-xs">
                  <button
                    onClick={() => setUnit('in')}
                    className={`px-3 py-1 transition-colors ${unit === 'in' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    INCHES
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 transition-colors ${unit === 'cm' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    CENTIMETERS
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-white/10">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-zinc-900 border-b border-white/10 text-zinc-400">
                    <tr>
                      <th className="py-3 px-4">SIZE</th>
                      <th className="py-3 px-4">CHEST</th>
                      <th className="py-3 px-4">LENGTH</th>
                      <th className="py-3 px-4">SHOULDER</th>
                      <th className="py-3 px-4">BODY WEIGHT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {SIZE_CHART.map((row) => (
                      <tr key={row.size} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{row.size}</td>
                        <td className="py-3 px-4 text-zinc-300">
                          {unit === 'in' ? row.chestIn : `${row.chestCm} cm`}
                        </td>
                        <td className="py-3 px-4 text-zinc-300">
                          {unit === 'in' ? row.lengthIn : `${row.lengthCm} cm`}
                        </td>
                        <td className="py-3 px-4 text-zinc-300">
                          {unit === 'in' ? row.shoulderIn : `${row.shoulderCm} cm`}
                        </td>
                        <td className="py-3 px-4 text-zinc-500">{row.recommendedWeight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fit Features */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10 pt-5 text-xs font-mono text-zinc-400">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span>PRE-SHRUNK (LESS THAN 1% WATER SHRINKAGE)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span>320+ GSM HIGH-DENSITY FABRIC WEIGHT</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span>REINFORCED 1.25" RIB COLLAR STRUCTURE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
