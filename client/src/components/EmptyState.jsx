import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

export default function EmptyState({
  title = 'No hotels found matching your search',
  message = 'Try modifying your destination, removing some filters, or adjusting your price range.',
  onReset,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center mx-auto shadow-sm">
        <SearchX className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{message}</p>
      </div>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-sm hover:shadow-md cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}
