import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import HotelCard from '../components/HotelCard';
import FilterPanel from '../components/FilterPanel';
import SortControl from '../components/SortControl';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { fetchHotels } from '../services/hotelService';

const PAGE_SIZE = 9;

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameters from URL
  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;
  const rooms = Number(searchParams.get('rooms')) || 1;

  // Sorting and view state
  const [sortBy, setSortBy] = useState('recommended');
  const [layout, setLayout] = useState('list');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Data & Async states
  const [hotels, setHotels] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    totalCount: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    destination,
    minPrice: '',
    maxPrice: '',
    starRatings: [],
    minRating: '',
    propertyTypes: [],
    amenities: [],
    freeCancellation: false,
    breakfastIncluded: false,
  });

  // Sync destination filter when URL query changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      destination,
    }));
  }, [destination]);

  // Fetch hotels from real PostgreSQL backend API
  const loadHotels = useCallback(
    async (isLoadMore = false, targetPage = 1) => {
      try {
        if (isLoadMore) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        const result = await fetchHotels({
          ...filters,
          sortBy,
          page: targetPage,
          limit: PAGE_SIZE,
        });

        if (isLoadMore) {
          setHotels((prev) => [...prev, ...result.hotels]);
        } else {
          setHotels(result.hotels);
        }

        setPagination(result.pagination);
      } catch (err) {
        setError(err.message || 'Unable to load hotels from server. Please verify your connection.');
        if (!isLoadMore) {
          setHotels([]);
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [filters, sortBy]
  );

  // Trigger search on filter or sort change
  useEffect(() => {
    loadHotels(false, 1);
  }, [loadHotels]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleResetFilters = () => {
    setFilters({
      destination: '',
      minPrice: '',
      maxPrice: '',
      starRatings: [],
      minRating: '',
      propertyTypes: [],
      amenities: [],
      freeCancellation: false,
      breakfastIncluded: false,
    });
    setSortBy('recommended');
    setSearchParams({});
  };

  const handleLoadMore = () => {
    if (pagination.hasNextPage && !isLoadingMore) {
      loadHotels(true, pagination.page + 1);
    }
  };

  const activeFilterCount =
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.starRatings?.length || 0) +
    (filters.minRating ? 1 : 0) +
    (filters.propertyTypes?.length || 0) +
    (filters.amenities?.length || 0) +
    (filters.freeCancellation ? 1 : 0) +
    (filters.breakfastIncluded ? 1 : 0);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Compact Top Search Bar */}
      <div className="bg-slate-100/90 border-b border-slate-200/80 py-4 px-4 sm:px-6 lg:px-8 -mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto">
          <SearchForm variant="compact" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 2. Search Summary Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>
                {destination ? `Hotels in ${destination}` : 'All Discoverable Stays'}
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
              {checkIn && checkOut && (
                <span className="flex items-center gap-1 font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {checkIn} &rarr; {checkOut}
                </span>
              )}
              <span className="flex items-center gap-1 font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Main Search Results Grid: Sidebar + Results Column */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Filter Sidebar */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
            totalResultsCount={pagination.totalCount}
          />

          {/* Right Results Column */}
          <div className="flex-1 w-full space-y-4">
            {/* Sort & View Controls */}
            <SortControl
              currentSort={sortBy}
              onSortChange={handleSortChange}
              currentLayout={layout}
              onLayoutChange={setLayout}
              totalCount={pagination.totalCount}
              onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
              activeFilterCount={activeFilterCount}
            />

            {/* Error State */}
            {error ? (
              <ErrorState
                title="Unable to load hotel results"
                message={error}
                onRetry={() => loadHotels(false, 1)}
              />
            ) : isLoading ? (
              <LoadingState count={4} layout={layout} />
            ) : hotels.length === 0 ? (
              <EmptyState
                title={
                  destination
                    ? `No stays found in "${destination}"`
                    : 'No hotels match the current filters'
                }
                message="Try relaxing your budget, removing amenity restrictions, or searching for a different city."
                onReset={handleResetFilters}
              />
            ) : (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} layout={layout} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {!isLoading && pagination.hasNextPage && (
              <div className="pt-6 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoadingMore
                    ? 'Loading more stays...'
                    : `Load More Stays (${pagination.totalCount - hotels.length} remaining)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
