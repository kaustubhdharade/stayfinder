import { config } from '../utils/config.js';
import { checkDatabaseConnection } from '../services/prisma.js';

/**
 * Controller for GET /api/health
 */
export async function getHealth(req, res) {
  const dbStatus = await checkDatabaseConnection();

  const isHealthy = dbStatus.connected;
  const statusCode = isHealthy ? 200 : 503;

  res.status(statusCode).json({
    status: isHealthy ? 'ok' : 'degraded',
    service: 'StayFinder API',
    version: '0.2.0',
    environment: config.env,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus.connected,
      message: dbStatus.message,
      engine: 'PostgreSQL',
    },
  });
}
