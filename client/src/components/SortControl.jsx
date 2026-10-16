import React from 'react';
import { 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  SlidersHorizontal 
} from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Guest Rating: High to Low' },
  { value: 'reviews-desc', label: 'Most Reviews' },
];

export default function SortControl({
  currentSort = 'recommended',
  onSortChange,
  currentLayout = 'list',
  onLayoutChange,
  totalCount = 0,
  onOpenMobileFilters,
  activeFilterCount = 0,
}) {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
      {/* Left: Total Count & Mobile Filter Trigger */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-slate-900">
          {totalCount} {totalCount === 1 ? 'property' : 'properties'} found
        </span>

        {/* Mobile filter button */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Right: Sort Dropdown & Layout Switcher */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            Sort by:
          </label>
          <select
            id="sort-select"
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-100/80 focus:bg-white focus:border-blue-600 outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Layout Toggle (Grid vs List) */}
        <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => onLayoutChange('list')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              currentLayout === 'list'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            aria-label="List view"
            title="List view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onLayoutChange('grid')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              currentLayout === 'grid'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-400 hover:text-slate-700'
            }`}
            aria-label="Grid view"
            title="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
