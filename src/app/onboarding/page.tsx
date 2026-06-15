"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building2, User, Phone, Briefcase, MapPin, ChevronDown } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { createSupabaseClient } from "@/lib/supabase";
import { AuthFormSkeleton, ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";

const STEPS = [
  { 
    id: 1, 
    label: "Your Profile", 
    desc: "Tell us who you are, your contact info, and role within the company." 
  },
  { 
    id: 2, 
    label: "Workspace Setup", 
    desc: "Configure your company's workspace name and primary office branch." 
  },
  { 
    id: 3, 
    label: "Ready to go", 
    desc: "Finalizing your dashboard setup and initializing secure systems." 
  },
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
  const [customDepartment, setCustomDepartment] = useState("");

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
      const metaName =
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.user_metadata?.given_name;
      if (metaName && !savedName) {
        setFullName(metaName);
        localStorage.setItem("ansh_onboarding_name", metaName);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Step 1 submit — just advance to step 2 ──────────────────────────
  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    if (department === "Other" && !customDepartment.trim()) return;
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

      const finalDepartment = department === "Other" ? customDepartment.trim() : department;

      await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: fullName.trim(),
          email: user.email,
          role,
          department: finalDepartment,
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
        <AuthFormSkeleton />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#070809] text-slate-200 select-none overflow-x-hidden font-sans">
      <title>Onboarding | Ansh Visitor</title>
      
      {/* ── LEFT SIDEBAR (Desktop split layout) ────────────────── */}
      <div className="hidden md:flex w-[380px] lg:w-[440px] bg-[#090b10] border-r border-white/5 flex-col justify-between p-12 relative overflow-hidden flex-shrink-0">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.72_0.17_160_/_0.08),transparent_50%)] animate-pulse duration-10000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,oklch(0.65_0.18_190_/_0.08),transparent_50%)]" />

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <img src="/logoAnshapps.png" alt="Ansh Visitor" className="h-10 w-10 object-contain" />
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-wider text-white uppercase block">Ansh Visitor</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Visitor Management</span>
          </div>
        </div>

        {/* Step List stepper */}
        <div className="relative z-10 my-auto py-12 space-y-10">
          {STEPS.map((s, idx) => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            
            return (
              <div key={s.id} className="relative flex gap-6">
                {/* Line */}
                {idx < STEPS.length - 1 && (
                  <div className={`absolute left-[18px] top-9 bottom-[-32px] w-[2px] transition-all duration-500 ${
                    isCompleted ? "bg-emerald-500" : "bg-white/10"
                  }`} />
                )}

                {/* Circle Icon */}
                <div className="relative flex-shrink-0">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                    isCompleted 
                      ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                      : isActive
                      ? "bg-slate-950 text-emerald-400 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-white/5 text-slate-600 border border-white/10"
                  }`}>
                    {isCompleted ? "✓" : s.id}
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex flex-col justify-center">
                  <span className={`text-sm font-bold tracking-wide transition-all ${
                    isActive ? "text-white" : isCompleted ? "text-slate-300" : "text-slate-500"
                  }`}>
                    {s.label}
                  </span>
                  <span className={`text-xs mt-1 transition-all max-w-[280px] leading-relaxed ${
                    isActive ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {s.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            ✨ Powering Smart Lobby & Visitor Management
          </p>
        </div>
      </div>

      {/* ── RIGHT CONTENT CONTAINER ───────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-16 lg:px-24 min-h-screen relative overflow-y-auto">
        
        {/* Mobile Stepper Header (Only shown on small screens) */}
        <div className="md:hidden w-full max-w-[480px] mb-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <span className="text-sm font-extrabold tracking-wider text-white uppercase">Ansh Visitor</span>
            <span className="text-xs font-bold text-slate-500">Step {step} of 2</span>
          </div>
          <div className="flex gap-2">
            {STEPS.slice(0, 2).map((s) => (
              <div 
                key={s.id} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  step >= s.id ? "bg-emerald-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form area wrapper */}
        <div className="w-full max-w-[480px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white mb-1">Set Up Your Profile</h2>
                <p className="text-sm text-slate-400">Tell us a bit about yourself so your team knows who is host.</p>
              </div>

              <div className="space-y-5">
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
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Phone Number
                  </label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(val) => setPhone(val || "")}
                    defaultCountry="IN"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Department
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-slate-900 pl-4 pr-10 py-3 text-sm text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none"
                    >
                      <option value="HR & Operations">HR &amp; Operations</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product Management">Product Management</option>
                      <option value="Enterprise Sales">Enterprise Sales</option>
                      <option value="Security & Operations">Security &amp; Operations</option>
                      <option value="Finance">Finance</option>
                      <option value="Other">Other (Write Custom)</option>
                    </select>
                    {/* Premium Custom Dropdown Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Conditional Custom Department Field */}
                {department === "Other" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Custom Department Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customDepartment}
                      onChange={(e) => setCustomDepartment(e.target.value)}
                      placeholder="e.g., Marketing, Research & Development"
                      className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] cursor-pointer mt-4"
              >
                Continue →
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2} className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white mb-1">Configure Your Workspace</h2>
                <p className="text-sm text-slate-400">Set up organizational details for guest check-ins.</p>
              </div>

              {errorMsg && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs font-semibold text-amber-400">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-5">
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

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Your Role
                  </label>
                  <div className="relative mt-2">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="block w-full rounded-xl border border-white/10 bg-slate-900 pl-4 pr-10 py-3 text-sm text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer appearance-none"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="HR">HR</option>
                      <option value="Employee">Employee</option>
                      <option value="Security">Security</option>
                    </select>
                    {/* Premium Custom Dropdown Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    </div>
                  </div>
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
                    <ButtonLoadingSkeleton className="h-4 w-28 rounded bg-white/30" />
                  ) : (
                    "Complete Setup 🚀"
                  )}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
