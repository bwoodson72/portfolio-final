"use client";

import * as React from "react";

import {
  type PortfolioCategory,
  type PortfolioItem,
} from "@/content/portfolio";
import {
  PortfolioFilters,
  type PortfolioFilterState,
  type PortfolioSortOption,
} from "@/components/portfolio/portfolio-filters";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";

export type PortfolioGridProps = {
  items: PortfolioItem[];
};

const parseTimelineValue = (timeline: string): number => {
  const match = /\d+(?:\.\d+)?/.exec(timeline);
  if (!match) {
    return Number.POSITIVE_INFINITY;
  }
  return Number(match[0]);
};

const sortItems = (
  items: PortfolioItem[],
  sort: PortfolioSortOption
): PortfolioItem[] => {
  const sorted = [...items];
  if (sort === "TITLE") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sort === "TIMELINE") {
    return sorted.sort(
      (a, b) => parseTimelineValue(a.timeline) - parseTimelineValue(b.timeline)
    );
  }
  return sorted;
};

const buildCategories = (items: PortfolioItem[]): PortfolioCategory[] => {
  const unique = new Set<PortfolioCategory>();
  items.forEach((item) => unique.add(item.category));
  return Array.from(unique);
};

export const PortfolioGrid = ({ items }: PortfolioGridProps): JSX.Element => {
  const [state, setState] = React.useState<PortfolioFilterState>({
    category: "ALL",
    sort: "DEFAULT",
  });

  const categories = React.useMemo(() => buildCategories(items), [items]);

  const filteredItems = React.useMemo(() => {
    const scoped =
      state.category === "ALL"
        ? items
        : items.filter((item) => item.category === state.category);
    return sortItems(scoped, state.sort);
  }, [items, state.category, state.sort]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16" id="portfolio">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Portfolio
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Filter by outcome, scope, or category
        </h2>
        <p className="max-w-2xl text-base text-slate-600">
          Every engagement is scoped to a clear goal. Filter by what you need and
          see the outcomes I deliver.
        </p>
      </div>
      <div className="mt-8" id="portfolio-controls">
        <PortfolioFilters
          categories={categories}
          onChange={setState}
          state={state}
        />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filteredItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
