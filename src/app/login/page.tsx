"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useVisitorStore } from "@/stores/visitor-store";
import { AuthMarketingPanel } from "@/components/auth/auth-marketing-panel";

export default function LoginPage() {
  const router = useRouter();
  const { hosts, switchUser } = useVisitorStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("ansh_auth_session");
    const token = sessionStorage.getItem("ansh_auth_token");
    if (session && token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    // Simulate network latency
    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      const host = hosts.find((h) => h.email.toLowerCase() === trimmedEmail);

      if (host) {
        // Mock success
        sessionStorage.setItem("ansh_auth_session", "true");
        sessionStorage.setItem("ansh_auth_token", `mock-token-${host.id}`);
        
        switchUser(host.id);
        
        setSuccessMsg(`Welcome back, ${host.name}! Redirecting to dashboard...`);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        // Seed new host if it doesn't match but is an ansh.com email
        if (trimmedEmail.endsWith("@ansh.com")) {
          const newHostId = `host-${Math.random().toString(36).substring(2, 9)}`;
          const initials = trimmedEmail.split("@")[0].substring(0, 2).toUpperCase();
          const name = trimmedEmail.split("@")[0].split(".").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");
          
          // Note: in a real app, this would sign up, but we just simulate it
          sessionStorage.setItem("ansh_auth_session", "true");
          sessionStorage.setItem("ansh_auth_token", `mock-token-${newHostId}`);
          
          setSuccessMsg(`Creating guest host session for ${name}...`);
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          setErrorMsg("Invalid email or password. Use demo email: vikram@ansh.com");
          setLoading(false);
        }
      }
    }, 800);
  };

  const handleDemoFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-800">
      <title>Sign In | Ansh Visitor</title>
      <meta name="description" content="Sign in to your Ansh Visitor workspace to manage invitations, check-ins, and guest passes." />
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

          {errorMsg && (
            <div className="rounded-xl bg-rose-50 border border-rose-100 p-4 text-xs font-bold text-rose-600 animate-in fade-in duration-200">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-xs font-bold text-emerald-600 animate-in fade-in duration-200">
              {successMsg}
            </div>
          )}

          <div className="space-y-6">
            {/* Quick Demo Fills */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                Quick Sign-In (Demo Hosts)
              </span>
              <div className="flex flex-wrap gap-2">
                {hosts.slice(0, 2).map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => handleDemoFill(h.email)}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-650 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    {h.name} ({h.role})
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleFormLogin} className="space-y-5">
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
                    placeholder="vikram@ansh.com"
                    className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <div className="mt-2 relative">
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
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in to Workspace"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm font-semibold text-slate-400">
              New to ANSH?{" "}
              <Link
                href="/signup"
                className="font-bold text-emerald-600 hover:text-emerald-500 font-bold"
              >
                Create an account
              </Link>
            </p>
          </div>

          <div className="pt-8 pb-4 text-center">
            <p className="text-[11px] font-semibold text-slate-400">
              © 2026 ANSH Visitor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
