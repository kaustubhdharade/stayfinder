import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Globe, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/90 bg-white">
      {/* Top Value Promise Banner */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                100% Transparent Price Comparison
              </h4>
              <p className="text-xs text-slate-500">
                We search and compare real-time deals across 100+ global booking providers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-slate-400" />
              USD ($) &bull; English (US)
            </span>
          </div>
        </div>
      </div>

      {/* Main Multi-column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
          {/* Brand info */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Stay<span className="text-blue-600">Finder</span>
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-sm">
              StayFinder is a next-generation hotel discovery and meta-search engine. Compare prices, browse verified guest ratings, and find the perfect stay in destinations worldwide.
            </p>
            <div className="text-[11px] text-slate-400 pt-2">
              Inspired by Trivago &bull; Production Portfolio Demo
            </div>
          </div>

          {/* Destinations Column */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Top Destinations
            </h5>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <Link to="/hotels?destination=Paris" className="hover:text-blue-600 transition-colors">
                  Hotels in Paris
                </Link>
              </li>
              <li>
                <Link to="/hotels?destination=Tokyo" className="hover:text-blue-600 transition-colors">
                  Hotels in Tokyo
                </Link>
              </li>
              <li>
                <Link to="/hotels?destination=New+York" className="hover:text-blue-600 transition-colors">
                  Hotels in New York
                </Link>
              </li>
              <li>
                <Link to="/hotels?destination=London" className="hover:text-blue-600 transition-colors">
                  Hotels in London
                </Link>
              </li>
              <li>
                <Link to="/hotels?destination=Bali" className="hover:text-blue-600 transition-colors">
                  Resorts in Bali
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Company
            </h5>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <Link to="/#why-us" className="hover:text-blue-600 transition-colors">
                  How StayFinder Works
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="hover:text-blue-600 transition-colors">
                  Hotel Comparison
                </Link>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">Careers (Coming Soon)</span>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">Press &amp; Media</span>
              </li>
            </ul>
          </div>

          {/* Support & Legal Column */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Support &amp; Trust
            </h5>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <span className="text-slate-600 hover:text-blue-600 cursor-pointer">
                  Help Center &amp; FAQs
                </span>
              </li>
              <li>
                <span className="text-slate-600 hover:text-blue-600 cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-slate-600 hover:text-blue-600 cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-slate-600 hover:text-blue-600 cursor-pointer">
                  Cookie Preferences
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>&copy; {new Date().getFullYear()} StayFinder, Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
