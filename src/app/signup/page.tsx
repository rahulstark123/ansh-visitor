"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";
import { createSupabaseClient } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false); // for email confirmation flow

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const supabase = createSupabaseClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          // Store user's name in metadata — onboarding will read it
          data: {
            full_name: fullName.trim(),
            company_name: "", // will be filled during onboarding
          },
          // After email confirmation, redirect back to onboarding
          emailRedirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) {
        // Map Supabase error codes to user-friendly messages
        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          setErrorMsg("This email is already registered. Try logging in instead.");
        } else if (error.message.includes("Password should be")) {
          setErrorMsg("Password must be at least 6 characters.");
        } else if (error.message.includes("valid email")) {
          setErrorMsg("Please enter a valid email address.");
        } else {
          setErrorMsg(error.message);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        // Auto-confirmed — store name for onboarding greeting
        localStorage.setItem("ansh_onboarding_name", fullName.trim());
        router.push("/onboarding");
      } else if (data.user) {
        // Email confirmation required
        localStorage.setItem("ansh_onboarding_name", fullName.trim());
        setEmailSent(true);
        setLoading(false);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // ── Email confirmation pending screen ────────────────────────────────
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
                <br />
                Click the link to activate your account and continue onboarding.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="inline-block h-3.5 w-3.5 mr-1.5 -mt-0.5" />
              Didn't receive it? Check your spam folder or{" "}
              <button
                type="button"
                onClick={() => setEmailSent(false)}
                className="underline underline-offset-2 cursor-pointer hover:text-emerald-600"
              >
                go back
              </button>
              .
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Signup form ──────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <title>Sign Up | Ansh Visitor</title>
      <AuthMarketingPanel />

      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-[420px] space-y-8 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">
              Create an account
            </h2>
            <p className="mt-2.5 text-sm text-slate-500">
              Get started with Ansh Visitor today. Free forever.
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-xs font-bold text-rose-600 animate-in fade-in duration-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
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

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating workspace...
                  </>
                ) : (
                  "Create Free Workspace"
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm font-semibold text-slate-400">
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
