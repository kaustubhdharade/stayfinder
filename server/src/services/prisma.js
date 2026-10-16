import { PrismaClient } from '@prisma/client';
import { config } from '../utils/config.js';

// Global singleton instance for PrismaClient
const prisma = new PrismaClient({
  log: config.env === 'development' ? ['warn', 'error'] : ['error'],
});

/**
 * Gracefully tests the database connection.
 * Returns connection state without throwing unhandled exceptions.
 * @returns {Promise<{ connected: boolean, message: string }>}
 */
export async function checkDatabaseConnection() {
  try {
    // Attempt a lightweight ping query
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      message: 'PostgreSQL connection active',
    };
  } catch (error) {
    return {
      connected: false,
      message: `Database unreachable: ${error.message || 'Connection refused'}`,
    };
  }
}

export { prisma };
export default prisma;
