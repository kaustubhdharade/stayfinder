import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchHotels, fetchHotelById, fetchDestinations } from '../hotelService';

describe('Frontend Hotel Service Layer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchHotels formats query parameters and returns hotels with pagination', async () => {
    const mockData = {
      success: true,
      data: [{ id: 'hotel-1', name: 'Test Hotel', minPrice: 20000, pricePerNight: 200 }],
      pagination: { page: 1, limit: 10, totalCount: 1, totalPages: 1 },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchHotels({ destination: 'Paris', minPrice: 150, maxPrice: 300, starRatings: [4, 5] });
    expect(result.hotels.length).toBe(1);
    expect(result.pagination.totalCount).toBe(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/hotels\?destination=Paris&minPrice=150&maxPrice=300&starRating=4%2C5$/),
      expect.any(Object)
    );
  });

  it('fetchHotelById returns single hotel data', async () => {
    const mockHotel = { id: 'the-grand-elysee-palace', name: 'The Grand Élysée Palace' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockHotel }),
    });

    const result = await fetchHotelById('the-grand-elysee-palace');
    expect(result.name).toBe('The Grand Élysée Palace');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/hotels\/the-grand-elysee-palace$/),
      expect.any(Object)
    );
  });

  it('fetchDestinations retrieves destinations list', async () => {
    const mockDestinations = [{ name: 'Paris', country: 'France', hotelCount: 2 }];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockDestinations }),
    });

    const result = await fetchDestinations();
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Paris');
  });

  it('throws structured error on non-ok status', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ error: { message: 'Hotel not found', status: 404 } }),
    });

    await expect(fetchHotelById('invalid-id')).rejects.toThrow();
  });
});
