/** Supabase password-reset redirect — exchanges code in /auth/callback then lands on reset page. */
export function getPasswordResetRedirectUrl(): string {
  if (typeof window === "undefined") {
    return "/auth/callback?next=/reset-password";
  }
  return `${window.location.origin}/auth/callback?next=/reset-password`;
}
