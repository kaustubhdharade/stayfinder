import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Clock,
  TrendingDown,
  SlidersHorizontal
} from 'lucide-react';
import SearchForm from '../components/SearchForm';
import HotelCard from '../components/HotelCard';
import { POPULAR_DESTINATIONS, getFeaturedHotels } from '../data/mockHotels';
import { fetchHotels } from '../services/hotelService';

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredHotels, setFeaturedHotels] = useState(getFeaturedHotels);

  useEffect(() => {
    fetchHotels({ limit: 6, sortBy: 'recommended' })
      .then((res) => {
        if (res.hotels && res.hotels.length > 0) {
          const featured = res.hotels.filter((h) => h.featured);
          if (featured.length > 0) {
            setFeaturedHotels(featured.slice(0, 3));
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleDestinationClick = (destName) => {
    navigate(`/hotels?destination=${encodeURIComponent(destName)}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-slate-50">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10 text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-blue-700 shadow-sm border border-blue-200/60 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Discover &bull; Compare &bull; Save up to 35% on Top Stays</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Find your perfect stay at the <span className="text-blue-600">best price</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Compare millions of rooms and verified guest ratings across Booking.com, Expedia, Agoda, and hundreds of booking providers in seconds.
            </p>
          </div>

          {/* Prominent Search Form */}
          <div className="max-w-5xl mx-auto pt-2 text-left">
            <SearchForm variant="hero" />
          </div>

          {/* Value Badges Under Search */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100+ Sites Compared
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Real &amp; Verified Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Hidden Fees
            </span>
          </div>
        </div>
      </section>

      {/* 2. Popular Destinations Section */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Inspiration for your next trip
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Trending Global Destinations
            </h2>
          </div>
          <Link
            to="/hotels"
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Browse all cities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleDestinationClick(dest.name)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleDestinationClick(dest.name);
              }}
              aria-label={`Search hotels in ${dest.name}, ${dest.country}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="self-end">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                    {dest.hotelCount}+ Stays
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                    {dest.country}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-200 transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-slate-300 font-medium truncate max-w-[180px]">
                      {dest.tagline}
                    </p>
                    <span className="text-xs font-bold text-white bg-blue-600/90 px-2 py-0.5 rounded-md">
                      from ${dest.averagePrice}/nt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Hotels Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Handpicked by travelers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Top Rated Stays Worldwide
            </h2>
          </div>
          <Link
            to="/hotels?sort=rating-desc"
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>See all top rated</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} layout="grid" />
          ))}
        </div>
      </section>

      {/* 4. Why Choose StayFinder Section */}
      <section id="why-us" className="bg-white border-y border-slate-200/80 py-16 sm:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Smart hotel discovery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why book with StayFinder?
            </h2>
            <p className="text-sm text-slate-500">
              We empower travelers to find the exact room they want at the lowest market rate without browsing dozens of websites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Live Price Comparison</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We compare prices across Booking.com, Agoda, Expedia, and direct hotel sites so you always get the lowest available rate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Verified Guest Reviews</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Read authentic feedback from genuine guests. We combine ratings across platforms to provide an objective score.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Smart Custom Filters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Narrow down by neighborhood, luxury amenities, star rating, free breakfast, and flexible cancellation policies.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Flexible Cancellation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Plans change. Easily identify properties that offer free cancellation and zero fee date changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-8 sm:p-14 text-white overflow-hidden shadow-2xl">
          <div className="absolute -right-12 -bottom-12 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md inline-block">
              Start planning your next getaway
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to find your ideal stay?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Explore thousands of accommodations across the globe. Save favorite stays and unlock member discounts.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/hotels"
                className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition-all cursor-pointer"
              >
                Browse All Hotels
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl bg-blue-600/40 hover:bg-blue-600/60 border border-white/20 text-white font-bold text-sm transition-all cursor-pointer"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
