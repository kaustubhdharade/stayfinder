import React from 'react';
import { 
  RotateCcw, 
  Star, 
  Check, 
  X,
  SlidersHorizontal
} from 'lucide-react';

const PROPERTY_TYPES = ['Hotel', 'Resort', 'Boutique', 'Apartment'];
const STAR_OPTIONS = [5, 4, 3];
const RATING_OPTIONS = [
  { value: 9.0, label: '9+ Exceptional' },
  { value: 8.5, label: '8.5+ Wonderful' },
  { value: 8.0, label: '8+ Very Good' },
  { value: 7.0, label: '7+ Good' },
];
const POPULAR_AMENITIES = [
  'Free High-Speed WiFi',
  'Swimming Pool',
  'Spa & Wellness',
  'Fitness Center',
  'Restaurant & Bar',
  'Airport Shuttle',
  'Valet Parking',
  'Pet Friendly',
];

export default function FilterPanel({
  filters,
  onFilterChange,
  onResetFilters,
  isOpenMobile,
  onCloseMobile,
  totalResultsCount = 0,
}) {
  // Handlers for individual filter updates
  const handlePriceChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value === '' ? '' : Number(value),
    });
  };

  const handleToggleStar = (star) => {
    const currentStars = filters.starRatings || [];
    const updated = currentStars.includes(star)
      ? currentStars.filter((s) => s !== star)
      : [...currentStars, star];
    onFilterChange({ ...filters, starRatings: updated });
  };

  const handleTogglePropertyType = (type) => {
    const currentTypes = filters.propertyTypes || [];
    const updated = currentTypes.includes(type)
      ? currentTypes.filter((t) => t !== type)
      : [...currentTypes, type];
    onFilterChange({ ...filters, propertyTypes: updated });
  };

  const handleToggleAmenity = (amenity) => {
    const currentAmenities = filters.amenities || [];
    const updated = currentAmenities.includes(amenity)
      ? currentAmenities.filter((a) => a !== amenity)
      : [...currentAmenities, amenity];
    onFilterChange({ ...filters, amenities: updated });
  };

  const hasActiveFilters =
    Boolean(filters.minPrice) ||
    Boolean(filters.maxPrice) ||
    (filters.starRatings && filters.starRatings.length > 0) ||
    Boolean(filters.minRating) ||
    (filters.propertyTypes && filters.propertyTypes.length > 0) ||
    (filters.amenities && filters.amenities.length > 0) ||
    Boolean(filters.freeCancellation) ||
    Boolean(filters.breakfastIncluded);

  const filterContent = (
    <div className="space-y-6 text-sm">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <h2 className="font-bold text-slate-900 text-base">Filter Hotels</h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset all
          </button>
        )}
      </div>

      {/* 1. Price Range */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Price per night (USD)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-slate-500 font-medium">Min Price</label>
            <div className="relative mt-1">
              <span className="absolute left-2.5 top-2 text-slate-400 font-medium">$</span>
              <input
                type="number"
                min="0"
                step="10"
                value={filters.minPrice ?? ''}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                placeholder="0"
                className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-slate-500 font-medium">Max Price</label>
            <div className="relative mt-1">
              <span className="absolute left-2.5 top-2 text-slate-400 font-medium">$</span>
              <input
                type="number"
                min="0"
                step="10"
                value={filters.maxPrice ?? ''}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                placeholder="1000"
                className="w-full pl-7 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Star Rating */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Hotel Class
        </h3>
        <div className="space-y-2">
          {STAR_OPTIONS.map((stars) => {
            const checked = (filters.starRatings || []).includes(stars);
            return (
              <label
                key={stars}
                className="flex items-center justify-between cursor-pointer group py-0.5"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleToggleStar(stars)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium group-hover:text-slate-600">
                  {stars} Stars
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Guest Review Score */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Guest Rating
        </h3>
        <div className="space-y-1.5">
          {RATING_OPTIONS.map((opt) => {
            const selected = Number(filters.minRating) === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    minRating: selected ? '' : opt.value,
                  })
                }
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{opt.label}</span>
                {selected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Property Type */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Property Type
        </h3>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => {
            const checked = (filters.propertyTypes || []).includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer group py-0.5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleTogglePropertyType(type)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium group-hover:text-slate-900">
                  {type}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Booking Policies / Deals */}
      <div className="space-y-2.5 pt-3 border-t border-slate-100">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Booking Policies
        </h3>
        <label className="flex items-center gap-2 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={Boolean(filters.freeCancellation)}
            onChange={(e) =>
              onFilterChange({ ...filters, freeCancellation: e.target.checked })
            }
            className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-xs font-medium text-slate-700">Free Cancellation</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={Boolean(filters.breakfastIncluded)}
            onChange={(e) =>
              onFilterChange({ ...filters, breakfastIncluded: e.target.checked })
            }
            className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-xs font-medium text-slate-700">Breakfast Included</span>
        </label>
      </div>

      {/* 6. Popular Amenities */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Popular Amenities
        </h3>
        <div className="space-y-2">
          {POPULAR_AMENITIES.map((amenity) => {
            const checked = (filters.amenities || []).includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 cursor-pointer group py-0.5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleToggleAmenity(amenity)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs text-slate-700 font-medium group-hover:text-slate-900">
                  {amenity}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs self-start sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
        {filterContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-slate-900/60 backdrop-blur-xs animate-fade-in"
        >
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="font-bold text-slate-900 text-base">Filter Properties</div>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 flex-1 overflow-y-auto">{filterContent}</div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onCloseMobile}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 font-bold text-xs text-white hover:bg-blue-700 shadow-md cursor-pointer"
              >
                Show Results ({totalResultsCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
