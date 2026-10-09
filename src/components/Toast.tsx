import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#141418] border border-white/20 text-white p-4 shadow-2xl flex items-center gap-3 backdrop-blur-md"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-zinc-300 flex-shrink-0" />}

          <p className="font-mono text-xs tracking-wide flex-1 text-zinc-200">
            {toast.message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
