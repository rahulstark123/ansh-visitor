"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Building2, User, Phone, Briefcase, MapPin } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase";

const STEPS = [
  { id: 1, label: "Your Profile" },
  { id: 2, label: "Workspace" },
  { id: 3, label: "Done" },
];

export default function OnboardingPage() {
  const router = useRouter();

  // Step state
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1 — Personal profile
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Admin");
  const [department, setDepartment] = useState("HR & Operations");

  // Step 2 — Workspace info
  const [companyName, setCompanyName] = useState("");
  const [officeBranch, setOfficeBranch] = useState("HQ - Main Office");

  // Pre-fill full name from signup localStorage / Supabase metadata
  useEffect(() => {
    // 1. Read name saved during signup
    const savedName = localStorage.getItem("ansh_onboarding_name");
    if (savedName) setFullName(savedName);

    // 2. Also try Supabase user metadata as fallback
    const supabase = createSupabaseClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.user_metadata?.full_name && !savedName) {
        setFullName(user.user_metadata.full_name);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Step 1 submit — just advance to step 2 ──────────────────────────
  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setStep(2);
  };

  // ── Step 2 submit — write to DB then redirect ───────────────────────
  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    setErrorMsg("");
    setLoading(true);

    try {
      const supabase = createSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // 1️⃣  Create workspace
      const wsRes = await fetch("/api/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: companyName.trim(), plan: "free" }),
      });

      let wid = 1; // fallback if DB not yet available
      if (wsRes.ok) {
        const { workspace } = await wsRes.json();
        wid = workspace.id;
      }

      // 2️⃣  Create user profile linked to workspace
      const avatarInitials = fullName
        .trim()
        .split(" ")
        .map((n) => n[0] ?? "")
        .join("")
        .toUpperCase()
        .substring(0, 2);

      await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: fullName.trim(),
          email: user.email,
          role,
          department,
          officeBranch: officeBranch.trim(),
          phoneNumber: phone.trim(),
          avatarInitials,
          wid,
        }),
      });

      // 3️⃣  Update user metadata with full_name for display
      await supabase.auth.updateUser({
        data: { full_name: fullName.trim(), company_name: companyName.trim() },
      });

      // 4️⃣  Cleanup and advance to done state
      localStorage.removeItem("ansh_onboarding_name");
      setStep(3);

      // Brief "Done" display then redirect
      setTimeout(() => {
        router.push("/dashboard");
      }, 1800);

    } catch {
      setErrorMsg("Workspace setup failed. Don't worry — you can configure it later in Settings.");
      setLoading(false);

      // Still allow them in — app works with Zustand fallback
      setTimeout(() => {
        localStorage.removeItem("ansh_onboarding_company");
        router.push("/dashboard");
      }, 2500);
    }
  };

  // ── Done screen ──────────────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070809] px-6">
        <title>Setting Up | Ansh Visitor</title>
        <div className="w-full max-w-[420px] rounded-[2rem] border border-white/5 bg-slate-950/80 p-10 text-center shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 mx-auto mb-6">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mb-2">Workspace Ready!</h2>
          <p className="text-sm text-slate-400">Taking you to your dashboard...</p>
          <Loader2 className="h-5 w-5 animate-spin text-emerald-500 mx-auto mt-6" />
        </div>
      </div>
    );
  }

  // ── Step progress indicator ──────────────────────────────────────────
  const StepIndicator = () => (
    <div className="flex items-center gap-2 mb-8">
      {STEPS.slice(0, 2).map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
            step >= s.id
              ? "bg-emerald-500 text-white"
              : "bg-white/5 text-slate-500"
          }`}>
            {s.id}
          </div>
          <span className={`text-xs font-semibold ${step >= s.id ? "text-white" : "text-slate-500"}`}>
            {s.label}
          </span>
          {i < 1 && (
            <div className={`h-px w-8 mx-1 transition-all ${step > s.id ? "bg-emerald-500" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070809] px-6 py-12 select-none">
      <title>Onboarding | Ansh Visitor</title>
      <div className="w-full max-w-[480px] rounded-[2rem] border border-white/5 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500 text-slate-200">

        <StepIndicator />

        {/* ── STEP 1 — Personal Profile ─────────────────────────────── */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-6">
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight text-white">Your Profile</h2>
                  <p className="text-xs text-slate-400">Tell us a bit about yourself</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Vikram Raj"
                className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Phone Number
              </label>
              <div className="relative mt-2">
                <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="block w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Your Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="HR & Operations">HR &amp; Operations</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Enterprise Sales">Enterprise Sales</option>
                  <option value="Security & Operations">Security &amp; Operations</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] cursor-pointer mt-2"
            >
              Continue →
            </button>
          </form>
        )}

        {/* ── STEP 2 — Workspace Setup ──────────────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="space-y-6">
            <div className="mb-2">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight text-white">Workspace Setup</h2>
                  <p className="text-xs text-slate-400">Configure your organization details</p>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs font-semibold text-amber-400">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Organization / Company Name
              </label>
              <div className="relative mt-2">
                <Briefcase className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Acme Technologies Pvt. Ltd."
                  className="block w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Primary Office Location
              </label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                <input
                  type="text"
                  required
                  value={officeBranch}
                  onChange={(e) => setOfficeBranch(e.target.value)}
                  placeholder="Corporate Headquarters, Bangalore"
                  className="block w-full rounded-xl border border-white/10 bg-slate-900 pl-10 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3.5 text-sm font-bold text-slate-400 transition-all hover:border-white/20 hover:text-white cursor-pointer"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex justify-center items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Complete Setup 🚀"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
