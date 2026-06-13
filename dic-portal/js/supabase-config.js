/**
 * supabase-config.js
 * ─────────────────────────────────────────────────────────────
 * Shared Supabase configuration for DIC Portal & Dashboard.
 *
 * HOW TO CONFIGURE:
 *   1. Go to https://supabase.com → your project → Settings → API
 *   2. Copy "Project URL" → replace SUPABASE_URL below
 *   3. Copy "anon public" key → replace SUPABASE_ANON_KEY below
 *   4. These are safe to commit — anon key is public by design.
 *      Row Level Security (RLS) enforces all access control.
 * ─────────────────────────────────────────────────────────────
 */

const SUPABASE_URL      = 'https://mgszueovvubfafctglsp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nc3p1ZW92dnViZmFmY3RnbHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDcyNDgsImV4cCI6MjA5NjgyMzI0OH0.gawMahhfpIlWyima30-cGXQ37N-ELOE9aOw7oBuQ5ow';

// Initialise the Supabase JS v2 client (loaded via CDN in HTML)
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: { params: { eventsPerSecond: 10 } }
});

export { _supabase as supabase, SUPABASE_URL };
