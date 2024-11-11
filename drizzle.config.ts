import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import config from './src/utils/config';

export default defineConfig({
  out: '../src/db/migrations',
  schema: './src/db/schemas/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.POSTGRES_URL as string,
  },
  verbose: true,
});