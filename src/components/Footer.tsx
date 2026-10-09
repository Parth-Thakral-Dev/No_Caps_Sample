import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();
  const { isDark } = useTheme();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Subscribed to NO CAPS® Archive. Code NOCAPS10 active.', 'success');
  };

  return (
    <footer className={`border-t pt-16 sm:pt-20 pb-12 overflow-hidden transition-colors duration-300 ${
      isDark
        ? 'bg-[#050507] text-white border-white/10'
        : 'bg-[#f4f4f0] text-[#09090b] border-black/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-block">
              <span className={`font-display font-extrabold text-3xl sm:text-4xl tracking-tighter ${
                isDark ? 'text-white' : 'text-[#09090b]'
              }`}>
                NO CAPS<span className="text-sm align-super font-mono text-zinc-400">®</span>
              </span>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              BUILT FOR THE ONES WHO NEVER FOLLOW THE FRAME. Custom-milled 300+ GSM textiles, architectural drop-shoulder silhouettes, and small-batch craftsmanship engineered in Mumbai & Berlin.
            </p>
            <div className="flex items-center gap-6 pt-2 text-zinc-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={`transition-colors flex items-center gap-1.5 text-xs font-mono ${
                  isDark ? 'hover:text-white' : 'hover:text-black'
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@NOCAPS.ARCHIVE</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={`transition-colors flex items-center gap-1.5 text-xs font-mono ${
                  isDark ? 'hover:text-white' : 'hover:text-black'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>@NOCAPS_STUDIO</span>
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className={`border p-6 sm:p-8 flex flex-col justify-between ${
            isDark ? 'bg-zinc-950/80 border-white/10' : 'bg-white border-black/10'
          }`}>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                EXCLUSIVE ARCHIVE ACCESS
              </span>
              <h3 className={`font-display font-bold text-xl sm:text-2xl mt-1 mb-2 ${
                isDark ? 'text-white' : 'text-[#09090b]'
              }`}>
                JOIN THE NO CAPS PRIVATE DISPATCH
              </h3>
              <p className="text-xs text-zinc-400 font-sans max-w-lg mb-6 leading-relaxed">
                Receive secret drop passwords 1 hour prior to general release, limited production run allocations, and 10% off your first acquisition.
              </p>
            </div>

            {subscribed ? (
              <div className={`border p-4 flex items-center gap-3 ${
                isDark ? 'bg-white/5 border-white/20' : 'bg-zinc-50 border-black/20'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="font-mono text-xs font-bold">ACCESS GRANTED</p>
                  <p className="font-mono text-[11px] text-zinc-500">
                    Use VIP code <span className="underline font-bold">NOCAPS10</span> at checkout for 10% off.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL FOR VIP PASS"
                  className={`flex-1 border px-4 py-3 text-xs font-mono uppercase focus:outline-none transition-colors ${
                    isDark
                      ? 'bg-zinc-900 border-white/15 text-white placeholder:text-zinc-600 focus:border-white'
                      : 'bg-zinc-50 border-black/15 text-black placeholder:text-zinc-400 focus:border-black'
                  }`}
                />
                <button
                  type="submit"
                  className={`px-6 py-3 font-mono font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${
                    isDark
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-black text-white hover:bg-zinc-800'
                  }`}
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b font-mono text-xs ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}>
          <div>
            <h4 className={`font-bold tracking-widest mb-4 uppercase text-[11px] ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}>COLLECTION</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li>
                <Link to="/shop" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>ALL HEAVYWEIGHT TEES</Link>
              </li>
              <li>
                <Link to="/shop?category=Oversized" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>OVERSIZED CUTS</Link>
              </li>
              <li>
                <Link to="/shop?category=Acid+Wash" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>ACID & MINERAL WASH</Link>
              </li>
              <li>
                <Link to="/shop?category=Heavyweight" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>350 GSM MONOLITHS</Link>
              </li>
              <li>
                <Link to="/shop?category=Graphic" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>GRAPHIC STATEMENTS</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold tracking-widest mb-4 uppercase text-[11px] ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}>BRAND & CRAFT</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li>
                <Link to="/about" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>THE MANIFESTO</Link>
              </li>
              <li>
                <Link to="/lookbook" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>SS25 'DISTORTION'</Link>
              </li>
              <li>
                <Link to="/about" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>320 GSM FABRIC MILLING</Link>
              </li>
              <li>
                <Link to="/about" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>ETHICAL ATELIER</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold tracking-widest mb-4 uppercase text-[11px] ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}>CLIENT SERVICES</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li>
                <Link to="/shop" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>ORDER TRACKING (DEMO)</Link>
              </li>
              <li>
                <span className="text-zinc-500">EXPRESS PAN-INDIA SHIPPING</span>
              </li>
              <li>
                <span className="text-zinc-500">7-DAY COMPLIMENTARY EXCHANGES</span>
              </li>
              <li>
                <span className="text-zinc-500">CARE & WASH DIRECTORY</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`font-bold tracking-widest mb-4 uppercase text-[11px] ${
              isDark ? 'text-white' : 'text-[#09090b]'
            }`}>ATELIERS & CONTACT</h4>
            <div className="space-y-2.5 text-zinc-400 text-[11px]">
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#09090b]'}`}>MUMBAI FLAGSHIP & LAB</p>
              <p>42 Lower Parel Mill Compound, Mumbai 400013</p>
              <p className={`pt-2 font-semibold ${isDark ? 'text-white' : 'text-[#09090b]'}`}>CONCIERGE</p>
              <p>concierge@nocaps-atelier.com</p>
              <p>+91 (0) 22 8492 1000</p>
            </div>
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Globe className="w-3.5 h-3.5" /> INDIA (INR ₹)
            </span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED © {new Date().getFullYear()} NO CAPS® APPAREL LTD.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>SAMPLE CLIENT PRESENTATION BUILD</span>
            <span>•</span>
            <span className="text-zinc-400">PARIS / TOKYO / MUMBAI / BERLIN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
