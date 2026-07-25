// config.js
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(__dirname, `.env.${env}`)
});

export default {
  env,
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  logLevel: process.env.LOG_LEVEL || 'info',
  isProduction: env === 'production',
  isDevelopment: env === 'development',
};