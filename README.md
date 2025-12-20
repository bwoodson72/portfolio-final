# Brian Woodson - Engineering Portfolio

A high-performance personal portfolio engineered with the bleeding-edge React ecosystem. This project serves as a demonstration of modern frontend architecture, accessibility compliance (WCAG AA), and Core Web Vitals optimization.

## ⚡️ Core Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (React 19 RC)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Oxide engine)
* **Animation:** [Motion](https://motion.dev/) (formerly Framer Motion)
* **Validation:** [Zod 4](https://zod.dev/) & React Hook Form
* **Type Safety:** TypeScript 5

## 🛠️ Engineering Highlights

### 1. Performance Optimization (Lighthouse 100/100)
Achieving a perfect Lighthouse score required granular optimization of the rendering pipeline:
* **LCP Optimization:** Refactored entrance animations to use native `text-shadow` instead of expensive `drop-shadow` filters, eliminating main-thread blocking time during hydration.
* **Image Strategy:** Implemented responsive `sizes` prop logic on all `next/image` components to prevent layout shifts (CLS) and minimize payload size on mobile devices.
* **Tree Shaking:** Replaced heavy icon libraries with inline SVGs to eliminate unused bundle weight.

### 2. Next-Gen Form Architecture
The contact form demonstrates a robust, type-safe approach to user input:
* **Validation:** Implemented **Zod 4** schemas with strict refinement logic to handle deprecations in the latest beta API.
* **Accessibility:** Fully accessible error handling using `role="alert"` and `aria-invalid` states to ensure screen reader compatibility.
* **UX:** Optimistic UI states for submission loading and success feedback.

### 3. Tailwind v4 Integration
Leverages the new CSS-first configuration engine:
* Usage of native CSS variables for theme values.
* Implementation of new utility shorthands like `size-*` and `bg-linear-*`.
* Zero runtime overhead for styles.

## 🚀 Running Locally

This project requires **Node.js 18+** due to Next.js 16 dependencies.

```bash
# 1. Clone the repository
git clone [https://github.com/bwoodson72/portfolio-final.git](https://github.com/bwoodson72/portfolio-final.git)

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev