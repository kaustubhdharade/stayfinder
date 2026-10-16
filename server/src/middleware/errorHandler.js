import { config } from '../utils/config.js';

/**
 * Global centralized error-handling middleware
 */
export function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (config.env !== 'test') {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);
  }

  res.status(status).json({
    success: false,
    error: {
      message,
      status,
      ...(config.env === 'development' && { stack: err.stack }),
    },
  });
}
