import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Add it to .env.local and Vercel project env.');
}

export const sql = neon(process.env.DATABASE_URL);
