import { listHotels, getHotelByIdOrSlug, getDestinations } from '../services/hotel.service.js';

/**
 * GET /api/hotels
 */
export async function getHotelsHandler(req, res, next) {
  try {
    const result = await listHotels(req.query);
    res.status(200).json({
      success: true,
      data: result.hotels,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/hotels/:id
 */
export async function getHotelByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const hotel = await getHotelByIdOrSlug(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: {
          message: `Hotel not found with identifier: ${id}`,
          status: 404,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/destinations
 */
export async function getDestinationsHandler(req, res, next) {
  try {
    const destinations = await getDestinations();
    res.status(200).json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    next(error);
  }
}
