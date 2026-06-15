"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("Security & Operations");
  const [locationName, setLocationName] = useState("Corporate Headquarters");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Simulate completing onboarding
      sessionStorage.setItem("ansh_auth_session", "true");
      sessionStorage.setItem("ansh_auth_token", "mock-token-onboarded");
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070809] px-6 py-12 select-none">
      <title>Onboarding | Ansh Visitor</title>
      <div className="w-full max-w-[460px] rounded-[2rem] border border-white/5 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500 text-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Set up your Host Profile
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Let's finish setting up your workspace environment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white shadow-sm outline-none transition-all placeholder:text-slate-650 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Contact Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white shadow-sm outline-none transition-all placeholder:text-slate-650 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white shadow-sm outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="Security & Operations">Security & Operations</option>
              <option value="HR & Talent">HR & Talent</option>
              <option value="Engineering & IT">Engineering & IT</option>
              <option value="Sales & Marketing">Sales & Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Office Location
            </label>
            <input
              type="text"
              required
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Main Headquarters"
              className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white shadow-sm outline-none transition-all placeholder:text-slate-650 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Profile...
                </>
              ) : (
                "Complete Setup"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
