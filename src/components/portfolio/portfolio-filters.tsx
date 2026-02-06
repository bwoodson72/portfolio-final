"use client";

import * as React from "react";

import { trackEvent } from "@/lib/analytics/events";
import { type PortfolioCategory } from "@/content/portfolio";

export type PortfolioSortOption = "DEFAULT" | "TITLE" | "TIMELINE";

export type PortfolioFilterState = {
  category: PortfolioCategory | "ALL";
  sort: PortfolioSortOption;
};

export type PortfolioFiltersProps = {
  categories: PortfolioCategory[];
  state: PortfolioFilterState;
  onChange: (next: PortfolioFilterState) => void;
};

export const PortfolioFilters = ({
  categories,
  state,
  onChange,
}: PortfolioFiltersProps): JSX.Element => {
  const allCategories: (PortfolioCategory | "ALL")[] = ["ALL", ...categories];

  const handleCategoryChange = (category: PortfolioCategory | "ALL") => {
    if (category !== state.category) {
      trackEvent("filter_used", { category });
      onChange({ ...state, category });
    }
  };

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = event.target.value as PortfolioSortOption;
    if (value !== state.sort) {
      onChange({ ...state, sort: value });
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => {
          const isActive = category === state.category;
          return (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
              onClick={() => handleCategoryChange(category)}
              type="button"
            >
              {category === "ALL" ? "All work" : category}
            </button>
          );
        })}
      </div>
      <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
        Sort by
        <select
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          onChange={handleSortChange}
          value={state.sort}
        >
          <option value="DEFAULT">Featured order</option>
          <option value="TITLE">Title (A → Z)</option>
          <option value="TIMELINE">Timeline (shortest)</option>
        </select>
      </label>
    </div>
  );
};
