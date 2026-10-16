import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading hotel details. Please try again.',
  onRetry,
}) {
  return (
    <div className="bg-white rounded-2xl border border-rose-200 p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto my-8 shadow-xs">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
