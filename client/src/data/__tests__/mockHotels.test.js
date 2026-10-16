import { describe, it, expect } from 'vitest';
import { getHotels, getHotelById, getFeaturedHotels, MOCK_HOTELS } from '../mockHotels';

describe('Mock Hotel Data & Query Engine', () => {
  it('returns all hotels when no filters are applied', () => {
    const hotels = getHotels();
    expect(hotels.length).toBe(MOCK_HOTELS.length);
  });

  it('filters hotels by destination keyword', () => {
    const parisHotels = getHotels({ destination: 'Paris' });
    expect(parisHotels.length).toBeGreaterThan(0);
    parisHotels.forEach((h) => {
      expect(
        h.destination.toLowerCase().includes('paris') ||
        h.name.toLowerCase().includes('paris')
      ).toBe(true);
    });
  });

  it('filters hotels by star rating', () => {
    const fiveStarHotels = getHotels({ starRatings: [5] });
    expect(fiveStarHotels.length).toBeGreaterThan(0);
    fiveStarHotels.forEach((h) => {
      expect(h.starRating).toBe(5);
    });
  });

  it('filters hotels by maximum price', () => {
    const budgetHotels = getHotels({ maxPrice: 200 });
    budgetHotels.forEach((h) => {
      expect(h.pricePerNight).toBeLessThanOrEqual(200);
    });
  });

  it('sorts hotels by price ascending', () => {
    const sorted = getHotels({}, 'price-asc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].pricePerNight).toBeGreaterThanOrEqual(sorted[i - 1].pricePerNight);
    }
  });

  it('sorts hotels by rating descending', () => {
    const sorted = getHotels({}, 'rating-desc');
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].ratingScore).toBeLessThanOrEqual(sorted[i - 1].ratingScore);
    }
  });

  it('retrieves hotel by unique ID', () => {
    const sample = MOCK_HOTELS[0];
    const retrieved = getHotelById(sample.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved.name).toBe(sample.name);
  });

  it('returns null for nonexistent hotel ID', () => {
    const retrieved = getHotelById('non-existent-hotel-id');
    expect(retrieved).toBeNull();
  });

  it('returns featured hotels list', () => {
    const featured = getFeaturedHotels();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach((h) => {
      expect(h.featured).toBe(true);
    });
  });
});
