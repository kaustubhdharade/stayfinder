import cors from 'cors';
import { config } from '../utils/config.js';

const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || config.env === 'development') {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
});
