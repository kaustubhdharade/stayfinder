import React from 'react';

export default function LoadingState({ count = 4, layout = 'list' }) {
  const isGrid = layout === 'grid';

  return (
    <div
      className={
        isGrid
          ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'
          : 'space-y-4'
      }
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`bg-white rounded-2xl border border-slate-200/80 p-4 overflow-hidden animate-pulse flex flex-col ${
            !isGrid ? 'md:flex-row gap-4' : 'gap-3'
          }`}
        >
          {/* Image skeleton */}
          <div
            className={`bg-slate-200 rounded-xl shrink-0 ${
              isGrid ? 'h-48 w-full' : 'h-48 md:h-44 md:w-64'
            }`}
          />

          {/* Text skeletons */}
          <div className="flex-1 space-y-3 py-1">
            <div className="flex justify-between items-center">
              <div className="h-5 bg-slate-200 rounded-md w-2/3" />
              <div className="h-6 w-12 bg-slate-200 rounded-lg" />
            </div>

            <div className="h-3.5 bg-slate-200 rounded-md w-1/2" />

            <div className="flex gap-2 pt-2">
              <div className="h-5 w-20 bg-slate-100 rounded-md" />
              <div className="h-5 w-24 bg-slate-100 rounded-md" />
            </div>

            <div className="pt-4 mt-auto flex justify-between items-end border-t border-slate-100">
              <div className="space-y-1">
                <div className="h-3 w-16 bg-slate-100 rounded" />
                <div className="h-6 w-20 bg-slate-200 rounded-md" />
              </div>
              <div className="h-9 w-28 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
