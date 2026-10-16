import { Router } from 'express';
import { getDestinationsHandler } from '../controllers/hotel.controller.js';

const router = Router();

// GET /api/destinations - Destination suggestions
router.get('/', getDestinationsHandler);

export default router;
