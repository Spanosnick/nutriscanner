import { createClient } from '@supabase/supabase-js';

// In Next.js, any env var exposed to the browser MUST be prefixed
// with NEXT_PUBLIC_ — otherwise it's only available on the server
// and this file (used in Client Components) won't see it.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing Supabase env variables. Check that .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
