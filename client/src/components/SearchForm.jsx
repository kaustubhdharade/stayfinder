import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ChevronDown, 
  Plus, 
  Minus, 
  AlertCircle,
  X
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../data/mockHotels';
import { fetchDestinations } from '../services/hotelService';

// Helper to format date to YYYY-MM-DD
function toDateInputValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getDefaultDates() {
  const today = new Date();
  const checkIn = new Date();
  checkIn.setDate(today.getDate() + 1);
  const checkOut = new Date();
  checkOut.setDate(today.getDate() + 4);

  return {
    minCheckIn: toDateInputValue(today),
    defaultCheckIn: toDateInputValue(checkIn),
    defaultCheckOut: toDateInputValue(checkOut),
  };
}

export default function SearchForm({ variant = 'hero', onSearchSubmit }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Live destinations
  const [destinationsList, setDestinationsList] = useState(POPULAR_DESTINATIONS);

  useEffect(() => {
    fetchDestinations()
      .then((data) => {
        if (data && data.length > 0) {
          setDestinationsList(data);
        }
      })
      .catch(() => {});
  }, []);

  // Form State with lazy initializers
  const [destination, setDestination] = useState(() => searchParams.get('destination') || '');
  const [checkIn, setCheckIn] = useState(() => searchParams.get('checkIn') || getDefaultDates().defaultCheckIn);
  const [checkOut, setCheckOut] = useState(() => searchParams.get('checkOut') || getDefaultDates().defaultCheckOut);
  const [adults, setAdults] = useState(() => Number(searchParams.get('adults')) || 2);
  const [children, setChildren] = useState(() => Number(searchParams.get('children')) || 0);
  const [rooms, setRooms] = useState(() => Number(searchParams.get('rooms')) || 1);

  const minCheckIn = getDefaultDates().minCheckIn;

  // Popover & UI States
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [validationError, setValidationError] = useState('');

  const guestPickerRef = useRef(null);
  const destinationInputRef = useRef(null);

  // Sync state if URL search params change
  useEffect(() => {
    if (searchParams.get('destination')) {
      setDestination(searchParams.get('destination'));
    }
    if (searchParams.get('checkIn')) {
      setCheckIn(searchParams.get('checkIn'));
    }
    if (searchParams.get('checkOut')) {
      setCheckOut(searchParams.get('checkOut'));
    }
    if (searchParams.get('adults')) {
      setAdults(Number(searchParams.get('adults')));
    }
    if (searchParams.get('rooms')) {
      setRooms(Number(searchParams.get('rooms')));
    }
  }, [searchParams]);

  // Close popovers when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target)) {
        setShowGuestPicker(false);
      }
      if (destinationInputRef.current && !destinationInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When checkIn changes, adjust checkOut if needed
  const handleCheckInChange = (newCheckIn) => {
    setCheckIn(newCheckIn);
    setValidationError('');
    if (newCheckIn >= checkOut) {
      const nextDay = new Date(newCheckIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(toDateInputValue(nextDay));
    }
  };

  const handleCheckOutChange = (newCheckOut) => {
    setCheckOut(newCheckOut);
    setValidationError('');
    if (newCheckOut <= checkIn) {
      setValidationError('Check-out date must be after check-in date.');
    }
  };

  const handleSelectDestination = (destName) => {
    setDestination(destName);
    setShowSuggestions(false);
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validate destination
    if (!destination.trim()) {
      setValidationError('Please enter a destination, city, or hotel name.');
      return;
    }

    // 2. Validate dates
    if (!checkIn || !checkOut) {
      setValidationError('Please select valid check-in and check-out dates.');
      return;
    }

    if (checkOut <= checkIn) {
      setValidationError('Check-out date must be after check-in date.');
      return;
    }

    setValidationError('');

    const queryParams = new URLSearchParams({
      destination: destination.trim(),
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
      rooms: String(rooms),
    });

    if (onSearchSubmit) {
      onSearchSubmit({
        destination: destination.trim(),
        checkIn,
        checkOut,
        adults,
        children,
        rooms,
      });
    }

    navigate(`/hotels?${queryParams.toString()}`);
  };

  const isHero = variant === 'hero';

  return (
    <div className="w-full relative">
      <form
        onSubmit={handleSubmit}
        className={`bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-3 sm:p-4 transition-all ${
          isHero ? 'lg:p-5' : 'p-3'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* 1. Destination Input */}
          <div className="md:col-span-4 relative" ref={destinationInputRef}>
            <label
              htmlFor="destination-input"
              className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1"
            >
              Where to?
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 absolute left-3 pointer-events-none" />
              <input
                id="destination-input"
                type="text"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setValidationError('');
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="City, region, or hotel name"
                className="w-full pl-10 pr-8 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 font-semibold text-sm sm:text-base rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                autoComplete="off"
              />
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear destination"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Autocomplete / Popular Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 max-h-72 overflow-y-auto animate-fade-in">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                  Popular Destinations
                </div>
                {destinationsList.map((dest, idx) => (
                  <button
                    key={dest.id || idx}
                    type="button"
                    onClick={() => handleSelectDestination(`${dest.name}, ${dest.country}`)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <img
                        src={dest.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80'}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                        {dest.name}, <span className="font-normal text-slate-500">{dest.country}</span>
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {dest.tagline || `${dest.hotelCount || 'Multiple'} verified stays available`}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      from ${dest.averagePrice}/nt
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Check-in Date */}
          <div className="md:col-span-2">
            <label
              htmlFor="checkin-date"
              className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1"
            >
              Check-in
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />
              <input
                id="checkin-date"
                type="date"
                min={minCheckIn}
                value={checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full pl-9 pr-2 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* 3. Check-out Date */}
          <div className="md:col-span-2">
            <label
              htmlFor="checkout-date"
              className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1"
            >
              Check-out
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />
              <input
                id="checkout-date"
                type="date"
                min={checkIn || minCheckIn}
                value={checkOut}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                className="w-full pl-9 pr-2 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* 4. Guests & Rooms Selector */}
          <div className="md:col-span-2 relative" ref={guestPickerRef}>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Guests & Rooms
            </label>
            <button
              type="button"
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full flex items-center justify-between pl-3 pr-2.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all cursor-pointer text-left"
              aria-expanded={showGuestPicker}
              aria-label="Select number of guests and rooms"
            >
              <div className="flex items-center gap-2 truncate">
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">
                  {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showGuestPicker ? 'rotate-180' : ''}`} />
            </button>

            {/* Popover Controls */}
            {showGuestPicker && (
              <div className="absolute right-0 sm:left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-fade-in space-y-4">
                {/* Adults counter */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Adults</div>
                    <div className="text-xs text-slate-400">Ages 18 or above</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Decrease adults"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center font-bold text-sm text-slate-900">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 10}
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Increase adults"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children counter */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Children</div>
                    <div className="text-xs text-slate-400">Ages 0 - 17</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Decrease children"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center font-bold text-sm text-slate-900">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={() => setChildren(Math.min(6, children + 1))}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Increase children"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Rooms counter */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900">Rooms</div>
                    <div className="text-xs text-slate-400">Accommodations</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Decrease rooms"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center font-bold text-sm text-slate-900">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 5}
                      onClick={() => setRooms(Math.min(5, rooms + 1))}
                      className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Increase rooms"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuestPicker(false)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer mt-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* 5. Submit Search Button */}
          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full h-[46px] sm:h-[50px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError}</span>
          </div>
        )}
      </form>
    </div>
  );
}
