/**
 * Supabase Browser Client
 * Use this in all Client Components ("use client").
 * createBrowserClient from @supabase/ssr manages cookies automatically
 * and handles session refresh on the client side.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
