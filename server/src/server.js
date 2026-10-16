import app from './app.js';
import { config } from './utils/config.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`[StayFinder API] Server running in ${config.env} mode on port ${PORT}`);
  console.log(`[StayFinder API] Health check available at: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('[StayFinder API] SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('[StayFinder API] Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[StayFinder API] SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('[StayFinder API] Server closed');
    process.exit(0);
  });
});

export default server;
