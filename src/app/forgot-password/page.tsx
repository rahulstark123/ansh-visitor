"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";
import { createSupabaseClient } from "@/lib/supabase";
import { getPasswordResetRedirectUrl } from "@/lib/auth-redirect";
import { toast } from "@/components/ui/toast";

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      toast.error("Email required", "Enter the email address for your account.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
        redirectTo: getPasswordResetRedirectUrl(),
      });

      if (error) {
        toast.error("Could not send reset link", error.message);
        setLoading(false);
        return;
      }

      setEmailSent(true);
      setLoading(false);
    } catch {
      toast.error("Network error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen bg-white text-slate-800">
        <title>Check Your Email | Ansh Visitor</title>
        <AuthMarketingPanel />
        <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 select-none">
          <div className="w-full max-w-[420px] space-y-6 animate-in fade-in duration-500 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 mx-auto">
              <Mail className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Check your email
              </h2>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                We sent a password reset link to{" "}
                <span className="font-bold text-slate-800">{email}</span>.
                <br />
                Click the link to choose a new password.
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs font-semibold text-emerald-700 text-left">
              <CheckCircle2 className="inline-block h-3.5 w-3.5 mr-1.5 -mt-0.5" />
              Look for an email from{" "}
              <span className="font-bold">visitor@anshapps.com</span>. Didn&apos;t receive it?
              Check spam or{" "}
              <button
                type="button"
                onClick={() => setEmailSent(false)}
                className="underline underline-offset-2 cursor-pointer hover:text-emerald-600"
              >
                try again
              </button>
              .
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <title>Forgot Password | Ansh Visitor</title>
      <meta
        name="description"
        content="Reset your Ansh Visitor account password. We'll email you a secure link."
      />
      <AuthMarketingPanel />

      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 select-none">
        <div className="w-full max-w-[420px] space-y-8 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">
              Forgot password?
            </h2>
            <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">
              Enter your account email and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <ButtonLoadingSkeleton className="h-4 w-40 rounded bg-primary-foreground/30" />
              ) : (
                "Send reset link"
              )}
            </button>
          </form>

          <p className="text-center text-sm font-semibold text-slate-400">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-500"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
