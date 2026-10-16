import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2 
} from 'lucide-react';

export default function HotelGallery({ images = [], hotelName = 'Hotel' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e) {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Main Hero & Thumbnails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-3 rounded-2xl overflow-hidden bg-slate-100">
        {/* Main Large Feature Image (spans 3 cols on desktop) */}
        <div className="md:col-span-3 relative h-72 sm:h-96 md:h-[460px] overflow-hidden group cursor-pointer">
          <img
            src={images[selectedIndex]}
            alt={`${hotelName} - photo ${selectedIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Lightbox Trigger overlay */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-all cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
            <span>View all {images.length} photos</span>
          </button>

          {/* Prev/Next arrows on main image */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Column on desktop */}
        <div className="hidden md:flex flex-col gap-2.5 h-[460px] overflow-y-auto pr-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-28 w-full rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? 'ring-3 ring-blue-600 ring-offset-2 opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${hotelName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile thumbnails strip */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setSelectedIndex(idx)}
            className={`w-20 h-16 rounded-lg overflow-hidden shrink-0 cursor-pointer ${
              selectedIndex === idx ? 'ring-2 ring-blue-600' : 'opacity-60'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fade-in"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base">{hotelName}</span>
              <span className="text-xs text-slate-400">
                ({selectedIndex + 1} / {images.length})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close photo gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central Image with controls */}
          <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={images[selectedIndex]}
              alt={`${hotelName} full view`}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
            />

            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="max-w-4xl mx-auto w-full flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer ${
                  selectedIndex === idx
                    ? 'ring-2 ring-blue-500 scale-105 opacity-100'
                    : 'opacity-40 hover:opacity-80'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
