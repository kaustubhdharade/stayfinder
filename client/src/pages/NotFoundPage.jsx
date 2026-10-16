import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">404 - Page Not Found</h1>
      <p className="text-slate-600 max-w-md text-sm">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all"
      >
        <Home className="w-4 h-4" />
        Return to Overview
      </Link>
    </div>
  );
}
