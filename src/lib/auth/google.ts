import { createSupabaseClient } from "@/lib/supabase";

export async function signInWithGoogle(): Promise<void> {
  const supabase = createSupabaseClient();
  const redirectTo = `${window.location.origin}/auth/callback`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      queryParams: {
        access_type: "online",
        prompt: "select_account",
      },
    },
  });

  if (error) {
    throw error;
  }
}
