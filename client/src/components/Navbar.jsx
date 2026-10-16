import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Menu, 
  X, 
  User, 
  Search, 
  Compass, 
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center">
              Stay<span className="text-blue-600">Finder</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
              Compare &amp; Discover Stays
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <Link
            to="/hotels"
            className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              isActive('/hotels')
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>Discover Hotels</span>
          </Link>

          <Link
            to="/#destinations"
            className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Destinations</span>
          </Link>

          <Link
            to="/#why-us"
            className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-slate-400" />
            <span>Why StayFinder</span>
          </Link>
        </nav>

        {/* Right Actions: Login & Register */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            to="/login"
            className="px-3.5 py-2 rounded-xl text-xs lg:text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl text-xs lg:text-sm font-bold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm shadow-blue-600/20 hover:shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/login"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            aria-label="User sign in"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/hotels"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600"
            >
              <Search className="w-4 h-4 text-blue-600" />
              Discover Hotels
            </Link>
            <Link
              to="/#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Compass className="w-4 h-4 text-slate-400" />
              Popular Destinations
            </Link>
            <Link
              to="/#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Sparkles className="w-4 h-4 text-slate-400" />
              Why StayFinder
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-blue-600 font-bold text-xs text-white hover:bg-blue-700 shadow-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
