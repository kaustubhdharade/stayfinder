import { Router } from 'express';
import { getHotelsHandler, getHotelByIdHandler } from '../controllers/hotel.controller.js';
import { validateHotelQuery, validateHotelIdParam } from '../validators/hotel.validator.js';

const router = Router();

// GET /api/hotels - List, search, filter, paginate, sort
router.get('/', validateHotelQuery, getHotelsHandler);

// GET /api/hotels/:id - Retrieve hotel details by ID or slug
router.get('/:id', validateHotelIdParam, getHotelByIdHandler);

export default router;
