import { apiRequest } from './api';

/**
 * Fetch paginated list of hotels with optional search & filter criteria
 * @param {Object} [params]
 * @returns {Promise<{ hotels: Array, pagination: Object }>}
 */
export async function fetchHotels(params = {}) {
  const query = new URLSearchParams();

  if (params.destination && params.destination.trim()) {
    query.set('destination', params.destination.trim());
  }
  if (params.minPrice !== undefined && params.minPrice !== null && params.minPrice !== '') {
    query.set('minPrice', String(params.minPrice));
  }
  if (params.maxPrice !== undefined && params.maxPrice !== null && params.maxPrice !== '') {
    query.set('maxPrice', String(params.maxPrice));
  }
  if (params.starRatings && params.starRatings.length > 0) {
    query.set('starRating', params.starRatings.join(','));
  }
  if (params.minRating !== undefined && params.minRating !== null && params.minRating !== '') {
    query.set('minRating', String(params.minRating));
  }
  if (params.propertyTypes && params.propertyTypes.length > 0) {
    query.set('propertyType', params.propertyTypes.join(','));
  }
  if (params.amenities && params.amenities.length > 0) {
    query.set('amenities', params.amenities.join(','));
  }
  if (params.freeCancellation) {
    query.set('freeCancellation', 'true');
  }
  if (params.breakfastIncluded) {
    query.set('breakfastIncluded', 'true');
  }
  if (params.sortBy) {
    query.set('sortBy', params.sortBy);
  }
  if (params.page) {
    query.set('page', String(params.page));
  }
  if (params.limit) {
    query.set('limit', String(params.limit));
  }

  const endpoint = `/hotels${query.toString() ? `?${query.toString()}` : ''}`;
  const response = await apiRequest(endpoint);

  return {
    hotels: response.data || [],
    pagination: response.pagination || {
      page: 1,
      limit: 10,
      totalCount: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
  };
}

/**
 * Fetch single hotel details by ID or slug
 * @param {string} id - UUID or slug
 * @returns {Promise<Object>}
 */
export async function fetchHotelById(id) {
  if (!id) throw new Error('Hotel ID is required');
  const response = await apiRequest(`/hotels/${encodeURIComponent(id)}`);
  return response.data;
}

/**
 * Fetch available destinations for search suggestions
 * @returns {Promise<Array>}
 */
export async function fetchDestinations() {
  const response = await apiRequest('/destinations');
  return response.data || [];
}
