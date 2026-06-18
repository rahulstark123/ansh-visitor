"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, CheckCircle2, ShieldCheck } from "lucide-react";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";
import { GoogleAuthButton, AuthDivider } from "@/components/auth/google-auth-button";
import { PasswordRules } from "@/components/auth/password-rules";
import { createSupabaseClient } from "@/lib/supabase";
import { getPasswordStrength } from "@/lib/password-strength";
import { toast } from "@/components/ui/toast";

const LEGAL_VERSION = "2026-04-16";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  // ── Password match indicator ─────────────────────────────────────────────────
  const passwordMismatch = confirmPassword.length > 0 && confirmPassword !== password;
  const passwordMatch    = confirmPassword.length > 0 && confirmPassword === password;
  const allLegalAccepted = acceptedTerms && acceptedPrivacy;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation → show toasts
    if (!fullName.trim()) {
      toast.error("Name required", "Please enter your full name.");
      return;
    }
    if (!allLegalAccepted) {
      toast.warning("Please accept legal terms", "Accept the Terms & Conditions and Privacy Policy to continue.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", "Make sure both passwords are identical.");
      return;
    }
    if (strength.score < 2) {
      toast.warning("Weak password", "Use at least 8 characters, a number and an uppercase letter.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            company_name: "",
            accepted_terms: acceptedTerms,
            accepted_privacy: acceptedPrivacy,
            consent_at: new Date().toISOString(),
            terms_version: LEGAL_VERSION,
            privacy_version: LEGAL_VERSION,
          },
          emailRedirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) {
        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          toast.error("Email already in use", "Try logging in instead.");
        } else if (error.message.includes("Password should be")) {
          toast.error("Password too short", "Minimum 6 characters required.");
        } else {
          toast.error("Sign up failed", error.message);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        // Auto-confirmed — redirect immediately
        localStorage.setItem("ansh_onboarding_name", fullName.trim());
        toast.success("Account created! 🎉", "Setting up your workspace...");
        router.push("/onboarding");
      } else if (data.user) {
        // Email confirmation required
        localStorage.setItem("ansh_onboarding_name", fullName.trim());
        setEmailSent(true);
        setLoading(false);
      }
    } catch {
      toast.error("Network error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ── Email sent screen ────────────────────────────────────────────────────────
  if (emailSent) {
    return (
      <div className="flex min-h-screen bg-white text-slate-800">
        <title>Check Your Email | Ansh Visitor</title>
        <AuthMarketingPanel />
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
          <div className="w-full max-w-[420px] space-y-6 animate-in fade-in duration-500 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 mx-auto">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Check your email</h2>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                We sent a confirmation link to{" "}
                <span className="font-bold text-slate-800">{email}</span>.
                <br />Click it to activate your account and continue.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="inline-block h-3.5 w-3.5 mr-1.5 -mt-0.5" />
              Didn't receive it? Check spam or{" "}
              <button
                type="button"
                onClick={() => setEmailSent(false)}
                className="underline underline-offset-2 cursor-pointer hover:text-emerald-600"
              >
                go back
              </button>.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Signup form ──────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <title>Sign Up | Ansh Visitor</title>
      <AuthMarketingPanel />

      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-[420px] space-y-6 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">
              Create an account
            </h2>
            <p className="mt-2.5 text-sm text-slate-500">
              Get started with Ansh Visitor today. Free forever.
            </p>
          </div>

          <GoogleAuthButton
            label="Sign up with Google"
            disabled={loading}
          />

          <AuthDivider />

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Vikram Raj"
                className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Password + Strength */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
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

              {/* Strength bars */}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Confirm Password
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
                  ✗ Passwords don't match
                </p>
              )}
              {passwordMatch && (
                <p className="mt-1.5 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Legal acceptance */}
            <div className="pt-2 space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[12px] leading-5 text-slate-500">
                  I agree to the{" "}
                  <Link href="/terms" className="font-bold text-emerald-600 hover:text-emerald-500 underline underline-offset-2">
                    Terms &amp; Conditions
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={acceptedPrivacy}
                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[12px] leading-5 text-slate-500">
                  I agree to the{" "}
                  <Link href="/privacy" className="font-bold text-emerald-600 hover:text-emerald-500 underline underline-offset-2">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || passwordMismatch || !allLegalAccepted}
                className="flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <ButtonLoadingSkeleton className="h-4 w-36 rounded bg-white/30" />
                ) : (
                  "Create Free Workspace"
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm font-semibold text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
