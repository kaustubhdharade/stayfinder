import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Share2, 
  Heart, 
  Calendar, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { fetchHotelById } from '../services/hotelService';
import HotelGallery from '../components/HotelGallery';
import RatingDisplay from '../components/RatingDisplay';
import AmenityList from '../components/AmenityList';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

export default function HotelDetailsPage() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Booking calculations
  const [nights, setNights] = useState(3);

  // Fetch hotel details from real PostgreSQL API
  const loadHotelDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchHotelById(id);
      setHotel(data);
      if (data?.rooms?.length > 0) {
        setSelectedRoomId(data.rooms[0].id);
      }
    } catch (err) {
      setError(err.message || 'Unable to retrieve hotel details');
      setHotel(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadHotelDetails();
  }, [loadHotelDetails]);

  const selectedRoom = hotel?.rooms?.find((r) => r.id === selectedRoomId) || hotel?.rooms?.[0];
  const roomPrice = selectedRoom?.price || hotel?.pricePerNight || 0;
  const subtotal = roomPrice * nights;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const totalPrice = subtotal + taxesAndFees;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleReserveRoom = (roomId) => {
    setSelectedRoomId(roomId);
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-10 bg-slate-200 rounded w-1/2" />
        <div className="h-96 bg-slate-200 rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="md:col-span-2 h-64 bg-slate-100 rounded-2xl" />
          <div className="h-64 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <ErrorState
          title="Failed to load hotel"
          message={error}
          onRetry={loadHotelDetails}
        />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <EmptyState
          title="Hotel not found"
          message="The hotel you are looking for does not exist or may have been unlisted."
          onReset={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      {/* 1. Breadcrumbs & Top Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <nav className="flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link to="/hotels" className="hover:text-blue-600 transition-colors">
            Hotels
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {hotel.name}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-colors cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-600'
              }`}
            />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* 2. Hotel Title & Summary Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              {hotel.propertyType}
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: hotel.starRating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {hotel.name}
          </h1>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{hotel.address}, {hotel.city}, {hotel.country}</span>
          </div>
        </div>

        {/* Big Rating Box */}
        <div className="shrink-0 flex items-center md:flex-col md:items-end gap-3 md:gap-1 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <RatingDisplay
            score={hotel.ratingScore}
            word={hotel.ratingWord}
            reviewCount={hotel.reviewCount}
            size="lg"
          />
        </div>
      </div>

      {/* 3. Interactive Image Gallery */}
      <HotelGallery images={hotel.images} hotelName={hotel.name} />

      {/* 4. Main Details Grid: Left Content + Right Booking Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Highlights Row */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
            <h2 className="text-sm font-bold text-blue-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Property Highlights &amp; Policies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{hotel.freeCancellation ? 'Free cancellation available' : 'Standard cancellation policy'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{hotel.breakfastIncluded ? 'Complimentary breakfast included' : 'Breakfast available on site'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>24/7 Concierge and Guest Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified PostgreSQL Live Inventory</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">About this property</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Amenities Detailed Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Amenities &amp; Facilities</h2>
            <AmenityList amenities={hotel.amenities} variant="detailed" />
          </div>

          {/* Room Options & Availability */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Available Room Options</h2>
                <p className="text-xs text-slate-500">Live rates from database based on {nights} nights</p>
              </div>
            </div>

            <div className="space-y-4">
              {hotel.rooms && hotel.rooms.length > 0 ? (
                hotel.rooms.map((room) => {
                  const isSelected = selectedRoomId === room.id;
                  return (
                    <div
                      key={room.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-blue-50/40 border-blue-600 shadow-sm'
                          : 'bg-white border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900">{room.name}</h3>
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              Max {room.capacity} Guests
                            </span>
                          </div>

                          <p className="text-xs text-slate-500">{room.description}</p>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                            <span className="font-semibold text-slate-800">{room.bedConfiguration}</span>
                            <span>&bull;</span>
                            <span className="text-emerald-700 font-medium">Free cancellation</span>
                          </div>
                        </div>

                        {/* Room Price & Reserve CTA */}
                        <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                          <div className="text-left sm:text-right">
                            <div className="text-xl font-black text-slate-900">${room.price}</div>
                            <div className="text-[11px] text-slate-500">per night</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleReserveRoom(room.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                                : 'bg-slate-900 hover:bg-slate-800 text-white'
                            }`}
                          >
                            Reserve Room
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500">
                  No specific room configurations found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Widget (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5">
            {/* Header / Deal Provider */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400">Live Database Rate</span>
                <div className="font-bold text-slate-900 text-sm">StayFinder Direct</div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900">${roomPrice}</span>
                <span className="text-xs text-slate-500 font-medium"> / night</span>
              </div>
            </div>

            {/* Date & Nights Selector */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Length of stay
                </label>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <span className="text-xs font-semibold text-slate-800">{nights} Nights</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={nights <= 1}
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      disabled={nights >= 30}
                      onClick={() => setNights(nights + 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Selected Room
                </label>
                <div className="text-xs font-semibold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200 truncate">
                  {selectedRoom?.name || 'Standard Room'}
                </div>
              </div>
            </div>

            {/* Price Breakdown Calculation */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>
                  ${roomPrice} &times; {nights} nights
                </span>
                <span className="font-semibold">${subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  Estimated taxes &amp; fees (12%)
                  <Info className="w-3 h-3 text-slate-400" />
                </span>
                <span className="font-semibold">${taxesAndFees}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Due</span>
                <span className="text-lg text-blue-600 font-black">${totalPrice}</span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-600/25 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Instant Reserve</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Free cancellation up to 48 hours prior</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Simulation Modal */}
      {isBookingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => {
                setIsBookingModalOpen(false);
                setBookingConfirmed(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingConfirmed ? (
              <>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Complete Your Reservation</h3>
                  <p className="text-xs text-slate-500">
                    Phase 2 Database Integration &bull; {hotel.name}
                  </p>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl text-xs border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Room</span>
                    <span className="font-bold text-slate-800">{selectedRoom?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-bold text-slate-800">{nights} Nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Total</span>
                    <span className="font-extrabold text-blue-600 text-sm">${totalPrice}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Real PostgreSQL record ID: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">{hotel.id}</code>
                </p>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(true)}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 font-bold text-xs text-white hover:bg-blue-700 shadow-md cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Booking Confirmed!</h3>
                  <p className="text-xs text-slate-500">
                    Your stay at {hotel.name} has been processed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setBookingConfirmed(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 font-bold text-xs text-white hover:bg-slate-800 cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
