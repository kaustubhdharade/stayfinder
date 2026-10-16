import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Check, 
  Heart, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import RatingDisplay from './RatingDisplay';
import AmenityList from './AmenityList';

export default function HotelCard({ hotel, layout = 'list' }) {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!hotel) return null;

  const isGrid = layout === 'grid';
  const discountPercent = hotel.originalPrice
    ? Math.round(((hotel.originalPrice - hotel.pricePerNight) / hotel.originalPrice) * 100)
    : 0;

  return (
    <article
      className={`group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
        !isGrid ? 'md:flex-row' : ''
      }`}
    >
      {/* 1. Image & Badges Container */}
      <div
        className={`relative overflow-hidden bg-slate-100 shrink-0 ${
          isGrid ? 'h-52 w-full' : 'h-56 md:h-auto md:w-72 lg:w-80'
        }`}
      >
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 shadow-sm backdrop-blur-xs">
            {hotel.propertyType}
          </span>
          {hotel.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
          aria-label={isFavorite ? 'Remove from saved' : 'Save hotel'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Bottom Image Overlay: Star Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 z-10">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-xs" />
          ))}
          <span className="text-white text-xs font-semibold ml-1 drop-shadow-xs">
            {hotel.starRating}-Star
          </span>
        </div>
      </div>

      {/* 2. Middle Details Section */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Header & Location */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <Link
                to={`/hotels/${hotel.slug || hotel.id}`}
                className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1"
              >
                {hotel.name}
              </Link>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{hotel.destination}</span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-slate-600 truncate">{hotel.distanceFromCenter || `${hotel.city}, ${hotel.country}`}</span>
            </div>
          </div>

          {/* Rating Display */}
          <div className="pt-1">
            <RatingDisplay
              score={hotel.ratingScore}
              word={hotel.ratingWord}
              reviewCount={hotel.reviewCount}
              size="sm"
            />
          </div>

          {/* Perks & Amenities */}
          <div className="space-y-2 pt-1">
            <div className="flex flex-wrap gap-2 text-xs">
              {hotel.freeCancellation && (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Free cancellation
                </span>
              )}
              {hotel.breakfastIncluded && (
                <span className="inline-flex items-center gap-1 text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                  <Check className="w-3 h-3 text-blue-600" />
                  Breakfast included
                </span>
              )}
            </div>

            {/* Amenity tags */}
            <AmenityList amenities={hotel.amenities} maxVisible={3} variant="badges" />
          </div>
        </div>

        {/* 3. Trivago-style Price Comparison & Call to Action */}
        <div
          className={`mt-4 pt-4 border-t border-slate-100 flex ${
            isGrid ? 'flex-col gap-3' : 'flex-col sm:flex-row sm:items-end justify-between gap-3'
          }`}
        >
          {/* Provider Comparison Details */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span>Best rate via</span>
              <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
                {hotel.dealProvider || 'StayFinder Direct'}
              </span>
            </div>

            {hotel.alternativeDeals && hotel.alternativeDeals.length > 0 && (
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Compare: {hotel.alternativeDeals[0].provider} (${hotel.alternativeDeals[0].price})
                {hotel.alternativeDeals[1] &&
                  `, ${hotel.alternativeDeals[1].provider} ($${hotel.alternativeDeals[1].price})`}
              </div>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className={`flex ${isGrid ? 'justify-between items-end' : 'sm:flex-col sm:items-end'} gap-2`}>
            <div className="text-right">
              {hotel.originalPrice && (
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-xs text-slate-400 line-through">
                    ${hotel.originalPrice}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                    Save {discountPercent}%
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-1 justify-end">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  ${hotel.pricePerNight}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ night</span>
              </div>
              <div className="text-[10px] text-slate-400">Includes taxes &amp; fees</div>
            </div>

            <Link
              to={`/hotels/${hotel.slug || hotel.id}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View Deal</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
