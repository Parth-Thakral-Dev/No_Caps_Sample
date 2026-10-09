import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ShieldCheck, ArrowRight, Truck, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const DemoCheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, subtotal, discountAmount, shippingAmount, total, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: 'Kabir Varma',
    phone: '+91 98200 12345',
    email: 'kabir.streetwear@example.com',
    address: 'Flat 402, Skyline Residency, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    paymentMethod: 'upi',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderNumber(`VD-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderComplete(true);
      clearCart();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#a1a1aa', '#3f3f46', '#e2f700'],
        });
      } catch (err) {
        console.error('Confetti failed', err);
      }
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setTimeout(() => {
      setOrderComplete(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0d0d11] border border-white/10 text-white shadow-2xl p-6 sm:p-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>

              {orderComplete ? (
                /* Order Success View */
                <div className="text-center py-8 space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white border border-white/20">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                      DEMO ORDER CONFIRMED
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                      WELCOME TO THE NO CAPS ARCHIVE
                    </h3>
                    <p className="font-mono text-xs text-zinc-400 mt-2">
                      ORDER ID: <span className="text-white font-bold">{orderNumber}</span>
                    </p>
                  </div>

                  <div className="bg-zinc-900/80 border border-white/10 p-5 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">DISPATCH TIMELINE</span>
                      <span className="text-white">Ships in 24 Hours</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">DELIVERY TO</span>
                      <span className="text-white truncate max-w-[200px]">{formData.city}, {formData.pincode}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-zinc-400">PAYMENT STATUS</span>
                      <span className="text-emerald-400 font-bold">PAID (DEMO SIMULATION)</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-zinc-400">TOTAL</span>
                      <span className="text-white font-bold text-sm">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    This was a demo simulated checkout. No real funds were deducted. Your order is recorded in the demo state!
                  </p>

                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 font-mono text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors"
                  >
                    <span>RETURN TO ATELIER ↗</span>
                  </button>
                </div>
              ) : (
                /* Checkout Form View */
                <div>
                  <div className="mb-6 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                      <ShieldCheck className="w-4 h-4 text-white" />
                      <span>DEMO CHECKOUT // SIMULATED ORDER GATEWAY</span>
                    </div>
                    <h2 className="font-display font-bold text-xl sm:text-2xl mt-1 tracking-tight">
                      SHIPPING & PAYMENT
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Information */}
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5" />
                        <span>1. Shipping Details</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                        <div>
                          <label className="block text-zinc-400 text-[11px] mb-1">FULL NAME</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-white"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-400 text-[11px] mb-1">CONTACT NUMBER</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-zinc-400 text-[11px] mb-1">DELIVERY ADDRESS</label>
                          <input
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-white"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-400 text-[11px] mb-1">CITY</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-zinc-900 border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-zinc-400 text-[11px] mb-1">STATE</label>
                            <input
                              type="text"
                              required
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="w-full bg-zinc-900 border border-white/10 px-2.5 py-2 text-white focus:outline-none focus:border-white"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 text-[11px] mb-1">PIN CODE</label>
                            <input
                              type="text"
                              required
                              value={formData.pincode}
                              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                              className="w-full bg-zinc-900 border border-white/10 px-2.5 py-2 text-white focus:outline-none focus:border-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                      <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>2. Payment Option (Demo Simulation)</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'upi', label: 'UPI / QR', sub: 'GPay / PhonePe', icon: Smartphone },
                          { id: 'card', label: 'CARDS', sub: 'Visa / MC / Amex', icon: CreditCard },
                          { id: 'netbanking', label: 'NET BANK', sub: 'All Indian Banks', icon: ShieldCheck },
                          { id: 'cod', label: 'CASH ON DEL', sub: 'Pay on Arrival', icon: Banknote },
                        ].map((m) => {
                          const Icon = m.icon;
                          const isSelected = formData.paymentMethod === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                              className={`p-3 border text-left transition-all ${
                                isSelected
                                  ? 'border-white bg-white/10 text-white'
                                  : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/30'
                              }`}
                            >
                              <Icon className="w-4 h-4 mb-2 text-white" />
                              <div className="font-mono text-xs font-bold leading-tight">{m.label}</div>
                              <div className="text-[10px] text-zinc-500 mt-0.5">{m.sub}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Summary Recap */}
                    <div className="bg-zinc-950 p-4 border border-white/10 space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-zinc-400">
                        <span>BAG ITEMS ({cart.length})</span>
                        <span>₹{subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>VIP PROMO DISCOUNT</span>
                          <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-zinc-400">
                        <span>DELIVERY</span>
                        <span>{shippingAmount === 0 ? 'FREE' : `₹${shippingAmount}`}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                        <span>TOTAL AMOUNT PAYABLE</span>
                        <span>₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-zinc-200 py-3.5 font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>PROCESSING DEMO ORDER...</span>
                      ) : (
                        <>
                          <span>AUTHORIZE & PLACE DEMO ORDER (₹{total.toLocaleString('en-IN')})</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
