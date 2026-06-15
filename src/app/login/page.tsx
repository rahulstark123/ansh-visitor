"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";
import { GoogleAuthButton, AuthDivider } from "@/components/auth/google-auth-button";
import { createSupabaseClient } from "@/lib/supabase";
import { toast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createSupabaseClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        if (
          error.message.includes("Invalid login") ||
          error.message.includes("invalid_credentials")
        ) {
          toast.error("Invalid credentials", "Email or password is incorrect.");
        } else if (error.message.includes("Email not confirmed")) {
          toast.warning("Email not confirmed", "Please click the link in your confirmation email.");
        } else {
          toast.error("Login failed", error.message);
        }
        setLoading(false);
        return;
      }

      if (data.session) {
        toast.success("Welcome back!", "Redirecting to your workspace...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Network error", "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <title>Sign In | Ansh Visitor</title>
      <meta
        name="description"
        content="Sign in to your Ansh Visitor workspace to manage invitations, check-ins, and guest passes."
      />
      <AuthMarketingPanel />

      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2 select-none">
        <div className="w-full max-w-[420px] space-y-8 animate-in fade-in duration-500">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p className="mt-2.5 text-sm text-slate-500">
              Log in to your Ansh Visitor workspace.
            </p>
          </div>

          <GoogleAuthButton
            label="Sign in with Google"
            disabled={loading}
          />

          <AuthDivider />

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                {/* Forgot password — can be wired to supabase.auth.resetPasswordForEmail later */}
                <span className="text-[10px] font-bold text-slate-400 cursor-not-allowed">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-slate-200 bg-white pl-4 pr-10 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <ButtonLoadingSkeleton className="h-4 w-32 rounded bg-primary-foreground/30" />
                ) : (
                  "Sign in to Workspace"
                )}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm font-semibold text-slate-400">
            New to ANSH?{" "}
            <Link href="/signup" className="font-bold text-emerald-600 hover:text-emerald-500">
              Create an account
            </Link>
          </p>

          <div className="pt-4 pb-2 text-center">
            <p className="text-[11px] font-semibold text-slate-400">
              © 2026 ANSH Visitor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
