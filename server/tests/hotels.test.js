import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('StayFinder Hotel Discovery & Destination APIs', () => {
  // 1. Health check with database
  it('GET /api/health should report operational service and connected database', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('database');
    expect(res.body.database.connected).toBe(true);
    expect(res.body.database.engine).toBe('PostgreSQL');
  });

  // 2. Hotel List & Pagination
  it('GET /api/hotels should return paginated list of hotels with metadata', async () => {
    const res = await request(app).get('/api/hotels?page=1&limit=5');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeLessThanOrEqual(5);

    expect(res.body.pagination).toMatchObject({
      page: 1,
      limit: 5,
      totalCount: expect.any(Number),
      totalPages: expect.any(Number),
    });

    // Check hotel structure
    const sample = res.body.data[0];
    expect(sample).toHaveProperty('id');
    expect(sample).toHaveProperty('name');
    expect(sample).toHaveProperty('slug');
    expect(sample).toHaveProperty('city');
    expect(sample).toHaveProperty('country');
    expect(sample).toHaveProperty('priceInCents');
    expect(sample).toHaveProperty('pricePerNight');
    expect(Array.isArray(sample.images)).toBe(true);
    expect(Array.isArray(sample.amenities)).toBe(true);
  });

  // 3. Destination search
  it('GET /api/hotels?destination=Paris should filter hotels in Paris', async () => {
    const res = await request(app).get('/api/hotels?destination=Paris');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    res.body.data.forEach((hotel) => {
      expect(
        hotel.city.toLowerCase().includes('paris') ||
        hotel.name.toLowerCase().includes('paris') ||
        hotel.country.toLowerCase().includes('paris')
      ).toBe(true);
    });
  });

  // 4. Filtering by Price Range
  it('GET /api/hotels?minPrice=200&maxPrice=300 should filter within price range', async () => {
    const res = await request(app).get('/api/hotels?minPrice=200&maxPrice=300');
    expect(res.status).toBe(200);
    res.body.data.forEach((hotel) => {
      expect(hotel.pricePerNight).toBeGreaterThanOrEqual(200);
      expect(hotel.pricePerNight).toBeLessThanOrEqual(300);
    });
  });

  // 5. Filtering by Star Rating
  it('GET /api/hotels?starRating=5 should return only 5-star hotels', async () => {
    const res = await request(app).get('/api/hotels?starRating=5');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    res.body.data.forEach((hotel) => {
      expect(hotel.starRating).toBe(5);
    });
  });

  // 6. Filtering by Property Type
  it('GET /api/hotels?propertyType=Resort should return only resorts', async () => {
    const res = await request(app).get('/api/hotels?propertyType=Resort');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    res.body.data.forEach((hotel) => {
      expect(hotel.propertyType).toBe('Resort');
    });
  });

  // 7. Filtering by Amenities
  it('GET /api/hotels?amenities=Spa should return hotels with Spa', async () => {
    const res = await request(app).get('/api/hotels?amenities=Spa');
    expect(res.status).toBe(200);
    res.body.data.forEach((hotel) => {
      const hasSpa = hotel.amenities.some((a) => a.toLowerCase().includes('spa'));
      expect(hasSpa).toBe(true);
    });
  });

  // 8. Sorting by Price Ascending
  it('GET /api/hotels?sortBy=price_asc should return hotels sorted by price ascending', async () => {
    const res = await request(app).get('/api/hotels?sortBy=price_asc');
    expect(res.status).toBe(200);
    const hotels = res.body.data;
    for (let i = 1; i < hotels.length; i++) {
      expect(hotels[i].priceInCents).toBeGreaterThanOrEqual(hotels[i - 1].priceInCents);
    }
  });

  // 9. Sorting by Rating Descending
  it('GET /api/hotels?sortBy=rating_desc should return hotels sorted by rating descending', async () => {
    const res = await request(app).get('/api/hotels?sortBy=rating_desc');
    expect(res.status).toBe(200);
    const hotels = res.body.data;
    for (let i = 1; i < hotels.length; i++) {
      expect(hotels[i].ratingScore).toBeLessThanOrEqual(hotels[i - 1].ratingScore);
    }
  });

  // 10. Hotel Details by slug/ID
  it('GET /api/hotels/:id should return complete hotel details including room types', async () => {
    const res = await request(app).get('/api/hotels/the-grand-elysee-palace');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBe('the-grand-elysee-palace');
    expect(Array.isArray(res.body.data.rooms)).toBe(true);
    expect(res.body.data.rooms.length).toBeGreaterThan(0);

    const room = res.body.data.rooms[0];
    expect(room).toHaveProperty('name');
    expect(room).toHaveProperty('priceInCents');
    expect(room).toHaveProperty('price');
    expect(room).toHaveProperty('bedConfiguration');
  });

  // 11. Nonexistent Hotel Details
  it('GET /api/hotels/non-existent-hotel should return 404', async () => {
    const res = await request(app).get('/api/hotels/non-existent-hotel');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.status).toBe(404);
  });

  // 12. Invalid Query Parameters validation
  it('GET /api/hotels?minPrice=500&maxPrice=100 should return 400 Bad Request', async () => {
    const res = await request(app).get('/api/hotels?minPrice=500&maxPrice=100');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toBe('Invalid query parameters');
    expect(res.body.error.details.length).toBeGreaterThan(0);
  });

  it('GET /api/hotels?page=-1 should return 400 Bad Request', async () => {
    const res = await request(app).get('/api/hotels?page=-1');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  // 13. Destination suggestions endpoint
  it('GET /api/destinations should return unique destinations with counts and average prices', async () => {
    const res = await request(app).get('/api/destinations');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    const dest = res.body.data[0];
    expect(dest).toHaveProperty('name');
    expect(dest).toHaveProperty('country');
    expect(dest).toHaveProperty('destination');
    expect(dest).toHaveProperty('hotelCount');
    expect(dest).toHaveProperty('averagePrice');
  });
});
