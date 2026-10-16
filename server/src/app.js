import express from 'express';
import { config } from './utils/config.js';
import { corsMiddleware } from './middleware/cors.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();

// Standard middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    name: 'StayFinder API',
    description: 'Hotel discovery and price comparison engine REST API',
    version: '0.1.0',
    documentation: '/api/health',
  });
});

// Mount all API routes
app.use(config.apiPrefix, apiRoutes);

// Catch 404s
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

export default app;
