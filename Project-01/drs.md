# Product Design & Requirement Specification (DRS)

**Project Name:** CTS_SM (Supermarket E-commerce Platform)

**Target Audience:** Local Sri Lankan Consumers

**Tech Stack Required:** HTML5, Tailwind CSS (v3/v4), Alpine.js/Vanilla JS (for simple interactions)

## 1. Design System & Theming

The design must evoke freshness, trust, and energy, typical of top Sri Lankan supermarkets (e.g., Keells, Cargills), while maintaining a highly premium, modern Apple-esque aesthetic.

### 1.1 Color Palette

* **Primary Color (Freshness/Nature):** Emerald Green (`emerald-600` / `#059669`). Used for branding, primary highlights, and trust-building elements.
* **Secondary Color (Energy/Discounts):** Warm Orange (`orange-500` / `#f97316`). Used for promotional badges, discount tags, and urgency.
* **Backgrounds:** Light, neutral off-white (`slate-50` or `gray-50`) to allow the glassmorphic elements to pop and create depth.
* **Text Colors:** Dark slate (`slate-800` to `slate-900`) for primary readability; muted gray (`slate-500`) for secondary text.

### 1.2 UI Trend: iOS-Style Glassmorphism

Buttons, navigation bars, and floating cards MUST utilize a modern frosted-glass effect (Glassmorphism). Do not use flat, boring elements.

* **Glass CSS Formula (Tailwind):** Apply `backdrop-blur-md` or `backdrop-blur-lg` paired with a semi-transparent white background like `bg-white/30` or `bg-white/40`.
* **Borders:** Ensure edges are defined with a thin, semi-transparent white border (e.g., `border border-white/30`).
* **Shadows:** Add subtle depth using soft shadows (`shadow-lg` or `shadow-xl`).
* **Border Radius:** Use smooth, Apple-style rounded corners (`rounded-2xl` or `rounded-full` for buttons).

### 1.3 UX Principles Applied

* **Jakob's Law:** Structure the layout based on familiar e-commerce patterns (logo left, search center, cart right) so users don't have to learn a new interface.
* **Fitts's Law:** Ensure all primary "Add to Cart" and "Checkout" buttons are large, easily clickable, and placed within easy reach, especially on mobile devices.

---

## 2. Page Specifications (4 Core Pages)

### Page 1: Home Page (Storefront)

**Objective:** Capture attention, showcase daily offers, and provide quick category navigation.

* **Sticky Glass Navigation:** A top navbar (`sticky top-0 z-50`) using the glassmorphism formula. Includes Logo, a wide Search Bar, User Profile icon, and a Cart icon with a notification badge.
* **Hero Section:** A vibrant background image of fresh groceries. Overlaid on this is a large, centered Glassmorphic Card containing the main headline ("Fresh Groceries Delivered to Your Doorstep") and a prominent CTA button.
* **Categories Carousel:** A horizontal, scrollable row of circular category icons (Vegetables, Fruits, Meat, Dairy, Household).
* **"Daily Deals" Grid:** A CSS Grid layout (`grid-cols-2 md:grid-cols-4`) displaying product cards. Each card must have a clean white background, product image, title, price, and a Glassmorphic "Add to Cart" button that subtly scales up on hover (`hover:scale-105 transition-transform`).

### Page 2: Product Catalog / Shop Page

**Objective:** Allow users to browse, filter, and easily add items to their cart.

* **Layout:** 2-column layout on desktop (Sidebar filters + Product Grid). Single column on mobile with a slide-out filter drawer.
* **Sidebar Filters:** Glassmorphic sticky sidebar containing checkboxes for categories, price sliders, and brand filters.
* **Product Grid:** Clean, consistent grid of items.
* **Interactive Hover Effects:** When a user hovers over a product card, display a Glassmorphic overlay with quick actions ("Quick View" or "+ Add").

### Page 3: Shopping Cart & Checkout

**Objective:** A frictionless, high-trust checkout experience.

* **Cart Layout:** Split screen. Left side shows listed items with quantity toggles (`+` and `-` buttons). Right side shows the "Order Summary".
* **Order Summary Card:** This must be a highly premium Glassmorphic floating card. It should display Subtotal, Delivery Fee, Total, and a massive, vibrant Orange (`bg-orange-500`) checkout button.
* **Trust Signals:** Include small icons for "Secure Checkout", "Cash on Delivery Available", and "Next Day Delivery" below the checkout button.

### Page 4: Store Locator & Contact

**Objective:** Build local trust and help users find physical CTS_SM outlets.

* **Header:** Simple, clean header "Find a CTS_SM Near You".
* **Split Layout:** * **Left:** A list of store locations (e.g., Colombo 03, Nugegoda, Kandy) styled as interactive Glassmorphic cards. Clicking a card highlights the location.
  * **Right:** An embedded Google Map (or a placeholder `div` styling a map). Overlaid on the map should be floating glassmorphic info-widgets showing the selected store's opening hours and contact number.

---

## 3. General Interactive Requirements (Tailwind Rules)

* **Animations:** Use Tailwind's utility classes for micro-interactions (e.g., `duration-300 ease-in-out`). Buttons should have a slight active click state (`active:scale-95`).
* **Responsiveness:** Use a mobile-first approach. Ensure all grids collapse to `grid-cols-1` or `grid-cols-2` on small screens (`sm:` and `md:` prefixes).
* **Accessibility:** Ensure sufficient text contrast against the glass backgrounds. Dark text (`text-slate-900`) on light glass is preferred.

## Prompt Instructions for the AI Code Generator:

"Please generate fully responsive, production-ready HTML using Tailwind CSS v3/v4 based strictly on the layout, color palette, and Glassmorphism styling rules defined in this specification. Please generate the **Home Page** first."