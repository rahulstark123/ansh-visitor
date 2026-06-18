"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";
import { PasswordRules } from "@/components/auth/password-rules";
import { createSupabaseClient } from "@/lib/supabase";
import { getPasswordStrength, isPasswordStrongEnough } from "@/lib/password-strength";
import { toast } from "@/components/ui/toast";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [canReset, setCanReset] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const passwordMismatch = confirmPassword.length > 0 && confirmPassword !== password;
  const passwordMatch = confirmPassword.length > 0 && confirmPassword === password;

  useEffect(() => {
    const supabase = createSupabaseClient();

    const verifySession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCanReset(true);
      }
      setCheckingSession(false);
    };

    verifySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setCanReset(true);
        setCheckingSession(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match", "Make sure both passwords are identical.");
      return;
    }

    if (!isPasswordStrongEnough(password)) {
      toast.warning("Weak password", "Use at least 8 characters, a number and an uppercase letter.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast.error("Could not update password", error.message);
        setLoading(false);
        return;
      }

      await supabase.auth.signOut();
      toast.success("Password updated", "Sign in with your new password.");
      router.push("/login?reset=success");
      router.refresh();
    } catch {
      toast.error("Network error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex min-h-screen bg-white text-slate-800">
        <title>Reset Password | Ansh Visitor</title>
        <AuthMarketingPanel />
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
          <ButtonLoadingSkeleton className="h-4 w-48 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!canReset) {
    return (
      <div className="flex min-h-screen bg-white text-slate-800">
        <title>Reset Link Invalid | Ansh Visitor</title>
        <AuthMarketingPanel />
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 select-none">
          <div className="w-full max-w-[420px] space-y-6 animate-in fade-in duration-500 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 mx-auto">
              <KeyRound className="h-8 w-8 text-rose-500" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Link expired or invalid
              </h2>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                This password reset link may have expired or already been used. Request a new one
                to continue.
              </p>
            </div>
            <Link
              href="/forgot-password"
              className="inline-flex w-full justify-center rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800"
            >
              Request new reset link
            </Link>
            <Link
              href="/login"
              className="block text-sm font-bold text-emerald-600 hover:text-emerald-500"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <title>Set New Password | Ansh Visitor</title>
      <meta
        name="description"
        content="Choose a new password for your Ansh Visitor account."
      />
      <AuthMarketingPanel />

      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 select-none">
        <div className="w-full max-w-[420px] space-y-8 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">
              Set new password
            </h2>
            <p className="mt-2.5 text-sm text-slate-500">
              Choose a strong password for your Ansh Visitor account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                New Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="block w-full rounded-xl border border-slate-200 bg-white pl-4 pr-10 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    {strength.bars.map((bar, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${bar}`}
                      />
                    ))}
                    <span className={`ml-1 text-[10px] font-bold transition-colors ${strength.color}`}>
                      {strength.label}
                    </span>
                  </div>
                  <PasswordRules pw={password} />
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Confirm New Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`block w-full rounded-xl border bg-white pl-4 pr-10 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:ring-1 ${
                    passwordMismatch
                      ? "border-rose-400 focus:border-rose-400 focus:ring-rose-200"
                      : passwordMatch
                        ? "border-emerald-400 focus:border-emerald-400 focus:ring-emerald-200"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {passwordMismatch && (
                <p className="mt-1.5 text-[10px] font-bold text-rose-500">
                  Passwords don&apos;t match
                </p>
              )}
              {passwordMatch && (
                <p className="mt-1.5 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Passwords match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || passwordMismatch}
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <ButtonLoadingSkeleton className="h-4 w-36 rounded bg-primary-foreground/30" />
              ) : (
                "Update password"
              )}
            </button>
          </form>

          <p className="text-center text-sm font-semibold text-slate-400">
            <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-500">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
