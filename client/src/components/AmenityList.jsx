import React from 'react';
import {
  Wifi,
  Waves as SwimmingPoolIcon,
  Sparkles,
  Dumbbell,
  Coffee,
  Utensils,
  Car,
  Dog,
  Wind,
  Clock,
  Plane,
  Tv,
  Check,
} from 'lucide-react';

// Map amenity strings to Lucide icons
function getAmenityIcon(name) {
  const lower = name.toLowerCase();
  if (lower.includes('wifi')) return Wifi;
  if (lower.includes('pool')) return SwimmingPoolIcon;
  if (lower.includes('spa')) return Sparkles;
  if (lower.includes('fitness') || lower.includes('gym')) return Dumbbell;
  if (lower.includes('breakfast') || lower.includes('coffee')) return Coffee;
  if (lower.includes('restaurant') || lower.includes('bar') || lower.includes('dining')) return Utensils;
  if (lower.includes('parking') || lower.includes('valet')) return Car;
  if (lower.includes('pet')) return Dog;
  if (lower.includes('air') || lower.includes('conditioning')) return Wind;
  if (lower.includes('front desk') || lower.includes('concierge')) return Clock;
  if (lower.includes('shuttle') || lower.includes('airport')) return Plane;
  if (lower.includes('tv')) return Tv;
  return Check;
}

/**
 * Amenity List
 * @param {Object} props
 * @param {string[]} props.amenities
 * @param {number} [props.maxVisible] - If set, truncates and shows "+X more"
 * @param {'badges'|'grid'|'detailed'} [props.variant='badges']
 */
export default function AmenityList({ amenities = [], maxVisible, variant = 'badges' }) {
  if (!amenities || amenities.length === 0) return null;

  const displayList = maxVisible ? amenities.slice(0, maxVisible) : amenities;
  const remainingCount = maxVisible ? Math.max(0, amenities.length - maxVisible) : 0;

  if (variant === 'grid' || variant === 'detailed') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {displayList.map((amenity, idx) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-100/70 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <span>{amenity}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Default badges variant
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {displayList.map((amenity, idx) => {
        const Icon = getAmenityIcon(amenity);
        return (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100/80 text-slate-700 text-[11px] font-medium border border-slate-200/60"
          >
            <Icon className="w-3 h-3 text-slate-500" />
            {amenity}
          </span>
        );
      })}

      {remainingCount > 0 && (
        <span className="text-[11px] font-medium text-slate-500 px-1.5 py-0.5">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}
