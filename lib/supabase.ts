import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const SUPABASE_CONFIG_OK = Boolean(supabaseUrl && supabaseAnonKey);
export const SUPABASE_CONFIG_ERROR =
  SUPABASE_CONFIG_OK
    ? null
    : 'Supabase credentials are missing. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, then restart the dev server.';

if (!SUPABASE_CONFIG_OK) {
  console.error(SUPABASE_CONFIG_ERROR);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Rebuild trigger



