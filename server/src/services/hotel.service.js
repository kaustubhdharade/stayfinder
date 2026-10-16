import { prisma } from './prisma.js';

/**
 * Transforms raw database hotel record into API response format
 * Formats price in both integer minor currency units (cents) and standard dollars.
 */
function formatHotelRecord(hotel) {
  const priceInCents = hotel.minPrice || 0;
  const priceInDollars = Math.round(priceInCents / 100);

  return {
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    description: hotel.description,
    address: hotel.address,
    city: hotel.city,
    state: hotel.state,
    country: hotel.country,
    destination: `${hotel.city}, ${hotel.country}`,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    starRating: hotel.starRating,
    propertyType: hotel.propertyType,
    ratingScore: hotel.ratingScore,
    ratingWord: hotel.ratingWord,
    reviewCount: hotel.reviewCount,
    contactPhone: hotel.contactPhone,
    contactEmail: hotel.contactEmail,
    featured: hotel.featured,
    freeCancellation: hotel.freeCancellation,
    breakfastIncluded: hotel.breakfastIncluded,
    
    // Explicit money representations
    priceInCents,
    pricePerNight: priceInDollars,
    currency: hotel.currency || 'USD',
    
    // Flattened images
    images: hotel.images ? hotel.images.map((img) => img.imageUrl) : [],
    imageDetails: hotel.images || [],
    
    // Flattened amenity names
    amenities: hotel.amenities ? hotel.amenities.map((ha) => ha.amenity.name) : [],
    
    // Room types if included
    rooms: hotel.roomTypes
      ? hotel.roomTypes.map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          capacity: r.capacity,
          bedConfiguration: r.bedConfiguration,
          priceInCents: r.basePrice,
          price: Math.round(r.basePrice / 100),
          currency: r.currency,
          totalInventory: r.totalInventory,
          isActive: r.isActive,
        }))
      : undefined,
    
    createdAt: hotel.createdAt,
    updatedAt: hotel.updatedAt,
  };
}

/**
 * Query hotels with filtering, sorting, and pagination
 */
export async function listHotels(queryParams = {}) {
  const page = Math.max(1, parseInt(queryParams.page || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(queryParams.limit || '10', 10)));
  const skip = (page - 1) * limit;

  const where = {};

  // 1. Destination / Keyword Search (case-insensitive)
  if (queryParams.destination && queryParams.destination.trim()) {
    const term = queryParams.destination.trim();
    where.OR = [
      { name: { contains: term, mode: 'insensitive' } },
      { city: { contains: term, mode: 'insensitive' } },
      { country: { contains: term, mode: 'insensitive' } },
      { address: { contains: term, mode: 'insensitive' } },
      { state: { contains: term, mode: 'insensitive' } },
    ];
  }

  // 2. Price Range Filtering (converts dollar inputs into cents)
  if (queryParams.minPrice !== undefined && queryParams.minPrice !== '') {
    const minDollars = Number(queryParams.minPrice);
    where.minPrice = { ...where.minPrice, gte: minDollars * 100 };
  }

  if (queryParams.maxPrice !== undefined && queryParams.maxPrice !== '') {
    const maxDollars = Number(queryParams.maxPrice);
    where.minPrice = { ...where.minPrice, lte: maxDollars * 100 };
  }

  // 3. Star Rating Filtering
  if (queryParams.starRating) {
    const stars = String(queryParams.starRating)
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((s) => !isNaN(s));
    if (stars.length === 1) {
      where.starRating = stars[0];
    } else if (stars.length > 1) {
      where.starRating = { in: stars };
    }
  }

  // 4. Minimum Guest Rating Score
  if (queryParams.minRating !== undefined && queryParams.minRating !== '') {
    const minScore = parseFloat(queryParams.minRating);
    if (!isNaN(minScore)) {
      where.ratingScore = { gte: minScore };
    }
  }

  // 5. Property Type Filtering
  if (queryParams.propertyType) {
    const types = String(queryParams.propertyType)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (types.length === 1) {
      where.propertyType = { equals: types[0], mode: 'insensitive' };
    } else if (types.length > 1) {
      where.propertyType = { in: types };
    }
  }

  // 6. Amenities Filtering
  if (queryParams.amenities) {
    const amenityList = String(queryParams.amenities)
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);
    
    if (amenityList.length > 0) {
      // Must match each of the requested amenities
      where.AND = amenityList.map((amenityName) => ({
        amenities: {
          some: {
            amenity: {
              name: { contains: amenityName, mode: 'insensitive' },
            },
          },
        },
      }));
    }
  }

  // 7. Policy Toggles
  if (queryParams.freeCancellation === 'true' || queryParams.freeCancellation === true) {
    where.freeCancellation = true;
  }
  if (queryParams.breakfastIncluded === 'true' || queryParams.breakfastIncluded === true) {
    where.breakfastIncluded = true;
  }

  // 8. Sorting
  const sortBy = queryParams.sortBy || 'recommended';
  let orderBy = [];

  switch (sortBy) {
    case 'price_asc':
    case 'price-asc':
      orderBy = [{ minPrice: 'asc' }, { ratingScore: 'desc' }];
      break;
    case 'price_desc':
    case 'price-desc':
      orderBy = [{ minPrice: 'desc' }, { ratingScore: 'desc' }];
      break;
    case 'rating_desc':
    case 'rating-desc':
      orderBy = [{ ratingScore: 'desc' }, { minPrice: 'asc' }];
      break;
    case 'name_asc':
      orderBy = [{ name: 'asc' }];
      break;
    case 'recommended':
    default:
      orderBy = [{ featured: 'desc' }, { ratingScore: 'desc' }, { reviewCount: 'desc' }];
      break;
  }

  // Execute Count & Query in transaction
  const [totalCount, hotels] = await prisma.$transaction([
    prisma.hotel.count({ where }),
    prisma.hotel.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
        amenities: {
          include: { amenity: true },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    hotels: hotels.map(formatHotelRecord),
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}

/**
 * Retrieve a single hotel by ID or Slug
 */
export async function getHotelByIdOrSlug(identifier) {
  if (!identifier) return null;

  const hotel = await prisma.hotel.findFirst({
    where: {
      OR: [
        { id: identifier },
        { slug: identifier.toLowerCase() },
      ],
    },
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
      amenities: {
        include: { amenity: true },
      },
      roomTypes: {
        where: { isActive: true },
        orderBy: { basePrice: 'asc' },
      },
    },
  });

  if (!hotel) return null;
  return formatHotelRecord(hotel);
}

/**
 * Retrieve available destinations for search suggestions
 */
export async function getDestinations() {
  const hotels = await prisma.hotel.findMany({
    select: {
      city: true,
      country: true,
      minPrice: true,
      images: {
        take: 1,
        orderBy: { displayOrder: 'asc' },
        select: { imageUrl: true },
      },
    },
  });

  // Group by City, Country
  const destinationMap = new Map();

  for (const h of hotels) {
    const key = `${h.city}, ${h.country}`;
    if (!destinationMap.has(key)) {
      destinationMap.set(key, {
        name: h.city,
        country: h.country,
        destination: key,
        hotelCount: 0,
        lowestPriceInCents: h.minPrice,
        image: h.images?.[0]?.imageUrl || null,
      });
    }

    const current = destinationMap.get(key);
    current.hotelCount += 1;
    if (h.minPrice < current.lowestPriceInCents) {
      current.lowestPriceInCents = h.minPrice;
      if (h.images?.[0]?.imageUrl) current.image = h.images[0].imageUrl;
    }
  }

  return Array.from(destinationMap.values()).map((dest) => ({
    ...dest,
    averagePrice: Math.round(dest.lowestPriceInCents / 100),
  }));
}
