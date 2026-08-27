import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Add it to .env.local and Vercel project env.');
}

// Default client — used by content queries (services, gallery, settings)
// that intentionally rely on Next's fetch cache for static generation / ISR.
export const sql = neon(process.env.DATABASE_URL);

// Neon's serverless driver queries over HTTP via fetch(), and Next.js patches
// the global fetch to cache by default. For live booking data that's wrong —
// it was silently serving stale results (a slot could look free seconds
// after being booked). Use this client for anything touching the `bookings`
// table so every read is always live.
export const sqlLive = neon(process.env.DATABASE_URL, {
  fetchOptions: { cache: 'no-store' },
});
