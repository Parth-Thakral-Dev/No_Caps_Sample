# NO CAPS® — Heavyweight Luxury Streetwear E-Commerce Platform

A production-ready, editorial fashion e-commerce web application engineered for high-end streetwear brands.

Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Router**.

---

## 🌟 Key Features

### 1. Creative Direction & Brand Identity
* **Editorial Monochrome Aesthetic**: Architectural obsidian, pure black, bone white, mineral grey, and subtle raw seam details.
* **Luxury Editorial Typography**: Built with *Syne* (brutalist headlines), *Space Grotesk* (technical streetwear typography), and *Plus Jakarta Sans* (refined body text).
* **Brand Name**: Configured as `NO CAPS®` throughout components and data files.

### 2. High-Impact Landing Page (`/`)
* **Cinematic Full-Screen Hero**: Editorial fashion campaign visuals, bold headline (*"NOT MADE TO BLEND IN."*), ambient drop ticker, and subtle animated scroll indicator.
* **Minimal Floating Navigation**: Features the brand identity, collection links, live shopping bag counter, wishlist indicator, and a prominent **`TO SHOP ↗`** CTA.
* **Infinite Marquee Ticker**: Smooth, hardware-accelerated branding ticker.
* **Editorial Manifesto Section**: *"BUILT FOR THE ONES WHO NEVER FOLLOW THE FRAME."* paired with architectural garment metrics (320+ GSM, 100% Ring-Spun Cotton, 150-piece limited runs).
* **Featured Silhouettes**: 4 curated pieces with dual-angle hover transitions (front / back graphics) and direct links to product pages.
* **Full-Width Campaign Banner**: Cinematic lookbook imagery with luxury overlay.
* **320 GSM Anatomy Section**: Breakdown of textile milling, 32mm rib-knit collars, and reactive mineral stone washes.
* **SS25 Lookbook Teaser**: Interactive preview of the campaign.

### 3. Dedicated Shop Catalogue (`/shop`)
* **Real-time Live Search**: Instant filtering across product names, descriptions, GSM weights, and colors.
* **Multi-Facet Filters**:
  * **Silhouette**: *All, Oversized, Heavyweight, Graphic, Acid Wash, Minimalist*
  * **Size**: *S, M, L, XL, XXL*
  * **Colorway**: *Washed Obsidian, Chalk Bone, Mineral Grey, Pitch Black, Vintage Moss, Raw Concrete, Solar Bleach* with live color swatches
  * **Price Tier**: *Under ₹3,000, ₹3,000 - ₹3,500, Above ₹3,500*
* **Sorting Engine**: *Featured Drops, Newest First, Price: Low to High, Price: High to Low, Top Rated*.
* **Grid Layout Switcher**: Toggle between 3-column and 4-column views on desktop.
* **Mobile Filter Drawer**: Responsive slide-over filter controls for mobile viewports.
* **Wishlist Mode**: View saved archive pieces with one click.
* **No-Results Empty State**: Clean reset button when filters return zero matches.

### 4. Dedicated Product Details Route (`/product/:id`)
* **Multi-Image Gallery**: High-resolution image switcher, multi-angle thumbnails, and fullscreen Lightbox mode.
* **Pricing in INR (₹)**: Current price, strike-through original price, and savings badge.
* **Interactive Size Selector**: S through XXL with dynamic low-stock warnings (e.g., *"Only 2 left"*).
* **Mandatory Size Validation**: Prevents adding to bag without selecting a size, displaying an inline prompt and toast notification.
* **Interactive Size Guide Modal**: Toggle between Inches and Centimeters with recommended body weights.
* **Quantity Controls**: Increment / decrement with stock caps.
* **Express Buy Now**: One-click demo checkout.
* **Technical Accordion**:
  1. *Textile & Details* (GSM, weave, ink type)
  2. *Silhouette & Fit* (cut specifications, model measurements)
  3. *Shipping & Dispatch* (24h dispatch guarantee)
  4. *Wash & Preservation* (cold wash inside-out)
* **Verified Customer Appraisals**: Realistic reviews with 5-star ratings and verified buyer tags.
* **Related Silhouettes**: Recommendations from the same aesthetic category.

### 5. Slide-Over Cart & Demo Checkout
* **Persistent Cart**: Automatically saved to `localStorage` across page navigations and browser refreshes.
* **Free Express Shipping Meter**: Dynamic progress bar calculating remaining amount needed to unlock free shipping (threshold: ₹2,999).
* **Working Promo Code Engine**:
  * `NOCAPS10` — 10% VIP archive discount
  * `DROP20` — 20% Drop 04 launch discount
  * `HEAVY300` — 15% Heavyweight cotton discount
* **Demo Checkout Modal**:
  * Step 1: Customer shipping address form (Pan-India & International).
  * Step 2: Payment method simulation (UPI / QR, Cards, Net Banking, COD).
  * Step 3: Order confirmation with dynamic Order ID (e.g. `NC-482019`), dispatch timeline, and celebration confetti via `canvas-confetti`.

### 6. Editorial Lookbook (`/lookbook`)
* Interactive campaign plates featuring hotspots on model garments that open quick preview cards and link directly to product purchase pages.

### 7. Brand Atelier Page (`/about`)
* Comprehensive essay on the NO CAPS® ethos, 320 GSM custom milling, ethical small-batch production (150 pieces per design), and studio locations in Mumbai, Berlin, and Tiruppur.

---

## 🛠️ Tech Stack

* **Framework**: React 19 + Vite
* **Language**: TypeScript
* **Styling**: Tailwind CSS 3.4
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Effects**: Canvas Confetti

---

## 🚀 Running the Project

### Development Server
```bash
cd void-streetwear
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## ✏️ Customization for the Clothing Business

All product data, pricing, images, and descriptions are cleanly isolated in:
```
src/data/products.ts
```

To add new T-shirts or change prices:
1. Open [`src/data/products.ts`](file:///c:/suuuu/void-streetwear/src/data/products.ts).
2. Modify or duplicate items in the `PRODUCTS` array.
3. Replace image URLs with your real campaign photography.
4. Update prices in Indian Rupees (`price: 2999`).
