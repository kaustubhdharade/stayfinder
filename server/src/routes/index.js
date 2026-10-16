import { Router } from 'express';
import healthRoutes from './health.routes.js';
import hotelRoutes from './hotel.routes.js';
import destinationRoutes from './destination.routes.js';

const router = Router();

// Mount API routes
router.use('/health', healthRoutes);
router.use('/hotels', hotelRoutes);
router.use('/destinations', destinationRoutes);

export default router;
