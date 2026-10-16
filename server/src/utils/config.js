import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5001', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/stayfinder?schema=public',
  apiPrefix: process.env.API_PREFIX || '/api',
};
