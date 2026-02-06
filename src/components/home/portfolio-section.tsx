"use client";

import * as React from "react";
import Link from "next/link";
import { type PortfolioItem, type PortfolioCategory } from "@/content/portfolio";

type SortOption = "Recommended" | "Fastest delivery" | "Lowest price" | "Highest price";

type PortfolioSectionProps = {
  items: PortfolioItem[];
  initialCategory?: PortfolioCategory | "All";
};

export const PortfolioSection = ({ items, initialCategory = "All" }: PortfolioSectionProps) => {
  const [activeCategory, setActiveCategory] = React.useState<PortfolioCategory | "All">(initialCategory);
  const [activeSort, setActiveSort] = React.useState<SortOption>("Recommended");

  const categories: (PortfolioCategory | "All")[] = ["All", "MVP", "BUGFIX", "LANDING", "FIGMA", "ECOM"];

  const filteredAndSortedItems = React.useMemo(() => {
    let result = [...items];

    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (activeSort === "Fastest delivery") {
      result.sort((a, b) => a.deliveryDaysMax - b.deliveryDaysMax);
    } else if (activeSort === "Lowest price") {
      result.sort((a, b) => a.priceUsdMin - b.priceUsdMin);
    } else if (activeSort === "Highest price") {
      result.sort((a, b) => b.priceUsdMax - a.priceUsdMax);
    }

    return result;
  }, [items, activeCategory, activeSort]);

  // Listen for category selection from matcher
  React.useEffect(() => {
    const handleSelectCategory = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioCategory>;
      setActiveCategory(customEvent.detail);
      const grid = document.getElementById("packages");
      if (grid) {
        grid.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("selectPortfolioCategory", handleSelectCategory);
    return () => {
      window.removeEventListener("selectPortfolioCategory", handleSelectCategory);
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24" id="packages">
      {/* Controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition border ${
                activeCategory === cat
                  ? "border-[color:var(--color-accent)] bg-cyan-500/10 text-[color:var(--color-text)]"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted-2)] hover:bg-[color:var(--color-surface-hover)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-bold text-[color:var(--color-text-muted-2)]">
            Sort by:
          </label>
          <select
            id="sort"
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value as SortOption)}
            className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm font-bold text-[color:var(--color-text)] focus:outline-none focus:[box-shadow:var(--ring-accent)]"
          >
            <option>Recommended</option>
            <option>Fastest delivery</option>
            <option>Lowest price</option>
            <option>Highest price</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div id="grid" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--color-border-strong)]"
          >
            <div className="mb-4 inline-block self-start rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-hover)] px-3 py-1 text-[10px] font-bold tracking-wider text-[color:var(--color-text-muted-2)] uppercase">
              {item.category}
            </div>
            <h3 className="text-xl font-bold text-[color:var(--color-text)]">{item.title}</h3>
            <p className="mt-2 text-sm text-[color:var(--color-text-muted-2)] line-clamp-2">{item.description}</p>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[color:var(--color-text-muted-2)] uppercase">Timeline</span>
                <span className="font-bold text-[color:var(--color-text)]">{item.deliveryDaysMin}–{item.deliveryDaysMax} days</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[color:var(--color-text-muted-2)] uppercase">Price</span>
                <span className="font-bold text-[color:var(--color-text)]">${item.priceUsdMin.toLocaleString()}–${item.priceUsdMax.toLocaleString()}</span>
              </div>
            </div>

            <ul className="mt-6 flex-grow space-y-2">
              {item.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[color:var(--color-text-muted-2)]">
                  <span className="text-[color:var(--color-text)] font-bold">•</span>
                  {outcome}
                </li>
              ))}
            </ul>

            <Link
              href={item.links.upworkPackageUrl}
              className="mt-8 block w-full rounded-full bg-[color:var(--color-accent)] py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-[color:var(--color-accent-weak)]"
            >
              View on Upwork
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
