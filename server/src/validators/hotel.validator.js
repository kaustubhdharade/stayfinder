/**
 * StayFinder Hotel Query Validator
 */

const ALLOWED_SORT_VALUES = [
  'recommended',
  'price_asc',
  'price_desc',
  'rating_desc',
  'name_asc',
  'price-asc',
  'price-desc',
  'rating-desc',
];

/**
 * Validates query parameters for GET /api/hotels
 */
export function validateHotelQuery(req, res, next) {
  const errors = [];
  const { page, limit, minPrice, maxPrice, minRating, starRating, sortBy } = req.query;

  // 1. Pagination: page
  if (page !== undefined) {
    const pageNum = Number(page);
    if (!Number.isInteger(pageNum) || pageNum < 1) {
      errors.push({ field: 'page', message: 'Page must be a positive integer greater than or equal to 1' });
    }
  }

  // 2. Pagination: limit
  if (limit !== undefined) {
    const limitNum = Number(limit);
    if (!Number.isInteger(limitNum) || limitNum < 1 || limitNum > 50) {
      errors.push({ field: 'limit', message: 'Limit must be an integer between 1 and 50' });
    }
  }

  // 3. Price range
  let parsedMinPrice = null;
  let parsedMaxPrice = null;

  if (minPrice !== undefined && minPrice !== '') {
    parsedMinPrice = Number(minPrice);
    if (isNaN(parsedMinPrice) || parsedMinPrice < 0) {
      errors.push({ field: 'minPrice', message: 'minPrice must be a non-negative number' });
    }
  }

  if (maxPrice !== undefined && maxPrice !== '') {
    parsedMaxPrice = Number(maxPrice);
    if (isNaN(parsedMaxPrice) || parsedMaxPrice < 0) {
      errors.push({ field: 'maxPrice', message: 'maxPrice must be a non-negative number' });
    }
  }

  if (parsedMinPrice !== null && parsedMaxPrice !== null && parsedMinPrice > parsedMaxPrice) {
    errors.push({ field: 'priceRange', message: 'minPrice cannot be greater than maxPrice' });
  }

  // 4. Rating
  if (minRating !== undefined && minRating !== '') {
    const ratingNum = Number(minRating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
      errors.push({ field: 'minRating', message: 'minRating must be a number between 0 and 10' });
    }
  }

  // 5. Star Rating
  if (starRating !== undefined && starRating !== '') {
    const stars = String(starRating)
      .split(',')
      .map((s) => Number(s.trim()));
    const invalidStars = stars.some((s) => isNaN(s) || s < 1 || s > 5);
    if (invalidStars) {
      errors.push({ field: 'starRating', message: 'starRating must be values between 1 and 5' });
    }
  }

  // 6. Sort By
  if (sortBy !== undefined && sortBy !== '') {
    if (!ALLOWED_SORT_VALUES.includes(sortBy)) {
      errors.push({
        field: 'sortBy',
        message: `sortBy must be one of: ${ALLOWED_SORT_VALUES.join(', ')}`,
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid query parameters',
        status: 400,
        details: errors,
      },
    });
  }

  next();
}

/**
 * Validates hotel ID / slug parameter
 */
export function validateHotelIdParam(req, res, next) {
  const { id } = req.params;
  if (!id || !id.trim()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Hotel identifier is required',
        status: 400,
      },
    });
  }
  next();
}
