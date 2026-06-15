"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useUiStore } from "@/stores/ui-store";
import {
  QrCode,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Star,
  Moon,
  Sun,
  Clock,
  BarChart3,
  Building,
  ArrowUpRight,
  Lock,
  Check,
  ShieldAlert,
  Smartphone,
  CheckCircle,
  FileText,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingSection } from "@/components/landing/pricing-section";
import { PassPreviewSkeleton, ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";

const MOCK_DEMO_HOSTS = [
  { id: "h-1", name: "Vikram Raj", role: "HR & Operations" },
  { id: "h-2", name: "Priya Sharma", role: "Engineering" },
  { id: "h-3", name: "Amit Patel", role: "Product Management" },
  { id: "h-4", name: "Rohan Gupta", role: "Enterprise Sales" },
];

const DEMO_PURPOSES = ["Meeting", "Interview", "Delivery", "Vendor", "Other"];

export default function LandingPage() {
  const router = useRouter();
  const { appearance, setAppearance, accentTheme } = useUiStore();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Demo Sandbox Widget States
  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [selectedHostId, setSelectedHostId] = useState("h-1");
  const [selectedPurpose, setSelectedPurpose] = useState("Meeting");
  const [demoPass, setDemoPass] = useState<{
    name: string;
    phone: string;
    hostName: string;
    purpose: string;
    passcode: string;
  } | null>(null);
  const [loadingDemo, setLoadingDemo] = useState(false);

  useEffect(() => {
    setMounted(true);
    const session = sessionStorage.getItem("ansh_auth_session");
    const token = sessionStorage.getItem("ansh_auth_token");
    if (session && token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleToggleTheme = () => {
    setAppearance(appearance === "dark" ? "light" : "dark");
  };

  const handleGenerateDemoPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorPhone.trim()) {
      toast.warning("Missing details", "Please enter both visitor name and phone number.");
      return;
    }

    setLoadingDemo(true);
    setTimeout(() => {
      const host = MOCK_DEMO_HOSTS.find((h) => h.id === selectedHostId);
      const passcode = Math.floor(100000 + Math.random() * 900000).toString();
      setDemoPass({
        name: visitorName,
        phone: visitorPhone,
        hostName: host ? host.name : "Vikram Raj",
        purpose: selectedPurpose,
        passcode,
      });
      setLoadingDemo(false);
      toast.success(
        "Demo pass created",
        `${visitorName} · Passcode ${passcode}`
      );
    }, 800);
  };

  const handleResetDemo = () => {
    setVisitorName("");
    setVisitorPhone("");
    setDemoPass(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <title>Ansh Visitor | Secure Lobby Management</title>

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logoAnshapps.png"
              alt="Anshapps Logo"
              className="h-9 w-auto shrink-0 select-none"
            />
            <div className="flex flex-col">
              <span className="text-base font-extrabold leading-tight tracking-wider uppercase bg-linear-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                Ansh Visitor
              </span>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase -mt-0.5">
                Workspace Desk
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors cursor-pointer">
              Features
            </a>
            <a href="#demo" className="hover:text-primary transition-colors cursor-pointer">
              Live Sandbox
            </a>
            <a href="#pricing" className="hover:text-primary transition-colors cursor-pointer">
              Pricing
            </a>
            <a href="#security" className="hover:text-primary transition-colors cursor-pointer">
              Security
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleTheme}
              className="h-9 w-9 rounded-lg border border-border/40 bg-card/50 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {appearance === "dark" ? (
                <Sun className="h-4.5 w-4.5 text-yellow-500" />
              ) : (
                <Moon className="h-4.5 w-4.5 text-slate-600" />
              )}
            </button>

            {isLoggedIn ? (
              <Link href="/dashboard" className="btn-primary flex items-center gap-2 rounded-2xl h-10 px-5 cursor-pointer">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors px-3 py-2 cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary rounded-2xl h-10 px-5 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Colorful glowing background mesh */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-emerald-500 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                Next-Gen Lobby Experience
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                The Front Desk, <br />
                <span className="bg-linear-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Reimagined for Security.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Ansh Visitor is a premium, secure visitor management system for modern offices. Speed up front-desk operations, verify government IDs, generate QR passes, and log visits seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto btn-primary h-12 px-8 text-base rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Enter Workspace Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="w-full sm:w-auto btn-primary h-12 px-8 text-base rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#pricing"
                      className="w-full sm:w-auto px-8 h-12 text-sm font-bold border border-border bg-card hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-slate-700 dark:text-slate-300"
                    >
                      View Pricing
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </>
                )}
              </div>

              {/* Statistics */}
              <div className="pt-8 grid grid-cols-3 gap-6 border-t border-border/40 max-w-lg mx-auto lg:mx-0">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                    99.9%
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Uptime SLA</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                    &lt; 15s
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Check-in Time</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-none">
                    1M+
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold mt-1">Passes Issued</p>
                </div>
              </div>
            </div>

            {/* Hero Right Visual - Interactive Preview Panel */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl border border-border/50 bg-slate-50/20 dark:bg-slate-950/20 p-4 shadow-2xl glass-panel">
                <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-500 to-indigo-500 rounded-3xl blur-md opacity-20 -z-10 animate-pulse" />
                
                {/* Simulated dashboard view */}
                <div className="w-full h-full bg-card rounded-2xl border border-border/40 overflow-hidden flex flex-col p-5 space-y-4 shadow-sm select-none">
                  {/* Mock dashboard top row */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      Operator Desk Panel
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  {/* Header widget */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white leading-none">
                      Checked-In Guests
                    </h3>
                    <p className="text-[10px] text-slate-400 font-semibold">Today's active lobby roster</p>
                  </div>

                  {/* Mock Rows */}
                  <div className="space-y-2.5 flex-1">
                    {[
                      { name: "Aarav Mehta", time: "09:30 AM", status: "CheckedIn", init: "AM", purpose: "Meeting" },
                      { name: "Ananya Roy", time: "Pending Check-in", status: "Expected", init: "AR", purpose: "Interview" },
                      { name: "Kabir Singh", time: "11:45 AM", status: "CheckedOut", init: "KS", purpose: "Vendor" },
                    ].map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8.5 w-8.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                            {row.init}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none">
                              {row.name}
                            </h4>
                            <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                              {row.purpose} · {row.time}
                            </p>
                          </div>
                        </div>
                        <div>
                          {row.status === "CheckedIn" && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          )}
                          {row.status === "Expected" && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-blue-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                              Expected
                            </span>
                          )}
                          {row.status === "CheckedOut" && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                              Checked Out
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mock scanner visual banner */}
                  <div className="p-3 bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QrCode className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="text-[10px] font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                          QR Pass System
                        </h4>
                        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">
                          Verification Active
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase text-primary bg-primary/20 px-2 py-0.5 rounded">
                      Fast
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="py-20 bg-slate-50/30 dark:bg-slate-900/10 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-primary uppercase">
              Full Suite Platform
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Sleek features to streamline front-desk operations
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Equip your lobby with tools built to speed up visitor onboarding, verify identity documents, and safeguard entry logs.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: QrCode,
                title: "Instant QR Passes",
                desc: "Every pre-registered visitor receives a dynamic client-side generated QR pass on their phone, ready to scan at the desk.",
              },
              {
                icon: ShieldCheck,
                title: "Govt ID Card Verification",
                desc: "Optionally verify credentials (Aadhaar, PAN, Passport) upon arrival, embedding ID details securely onto their physical print pass.",
              },
              {
                icon: Clock,
                title: "Desk Quick Check-in",
                desc: "Front-desk managers can use the quick verification scanner modal to check in expected guests via keyboard scanner emulation in under 1 second.",
              },
              {
                icon: BarChart3,
                title: "Reports & Audit Logs",
                desc: "Export visitor history, filter by date and status, and maintain compliance-ready audit trails for your organization.",
              },
              {
                icon: Users,
                title: "Team Directory & Roster",
                desc: "Manage teammates, branches, access credentials, and reporting lines in a 3-step organization wizard modal.",
              },
              {
                icon: Lock,
                title: "6-Digit Passcodes",
                desc: "For visitors without QR access, a random 6-digit passcode is provided to instantly lookup and verify their booking details.",
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="crm-card p-6 flex flex-col items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-900 dark:text-white leading-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SANDBOX WIDGET */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto rounded-3xl border border-border/40 bg-card overflow-hidden shadow-2xl grid lg:grid-cols-12">
            
            {/* Demo registration form */}
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                  Live Try-Out Sandbox
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Try it out: Pre-register a guest
                </h2>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Enter demo details to instantly generate a secure 6-digit visitor passcode and SVG QR code pass.
                </p>
              </div>

              {demoPass ? (
                <div className="p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" strokeWidth={3} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Pass Generated Successfully!
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold">
                      Your guest can check in using this passcode at the reception desk.
                    </p>
                  </div>
                  <button
                    onClick={handleResetDemo}
                    className="btn-primary rounded-xl px-6 h-10 text-xs tracking-wide cursor-pointer"
                  >
                    Register Another Guest
                  </button>
                </div>
              ) : (
                <form onSubmit={handleGenerateDemoPass} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Guest Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rahul Sen"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="mt-2 w-full h-10 px-3.5 rounded-lg border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        className="mt-2 w-full h-10 px-3.5 rounded-lg border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Select Host (Host List)
                      </label>
                      <select
                        value={selectedHostId}
                        onChange={(e) => setSelectedHostId(e.target.value)}
                        className="mt-2 w-full h-10 px-3.5 rounded-lg border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                      >
                        {MOCK_DEMO_HOSTS.map((host) => (
                          <option key={host.id} value={host.id}>
                            {host.name} ({host.role})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Purpose of Visit
                      </label>
                      <select
                        value={selectedPurpose}
                        onChange={(e) => setSelectedPurpose(e.target.value)}
                        className="mt-2 w-full h-10 px-3.5 rounded-lg border border-input bg-card text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                      >
                        {DEMO_PURPOSES.map((purpose) => (
                          <option key={purpose} value={purpose}>
                            {purpose}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loadingDemo}
                    className="w-full btn-primary h-11 rounded-xl font-bold cursor-pointer text-xs uppercase tracking-wider disabled:opacity-50"
                  >
                    {loadingDemo ? (
                      <ButtonLoadingSkeleton className="mx-auto h-4 w-36 rounded bg-primary-foreground/30" />
                    ) : (
                      "Pre-register Visitor"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Demo pass preview */}
            <div className="lg:col-span-5 p-8 border-l border-border/40 bg-slate-50/30 dark:bg-slate-900/30 flex flex-col justify-center items-center">
              {loadingDemo ? (
                <PassPreviewSkeleton />
              ) : demoPass ? (
                <div className="w-full max-w-[270px] bg-card border border-border/40 rounded-2xl p-5 shadow-lg flex flex-col items-center space-y-4 animate-in zoom-in duration-300">
                  <div className="text-center">
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-widest">
                      ANSH GUEST PASS
                    </span>
                    <h3 className="text-xs font-black text-slate-800 dark:text-slate-100 tracking-tight leading-none mt-0.5">
                      ANSH VISITOR APPS
                    </h3>
                  </div>

                  {/* Live SVG QR code */}
                  <div className="h-32 w-32 bg-white border border-slate-200 p-2 rounded-xl flex items-center justify-center shadow-xs shrink-0 select-none">
                    <QRCodeSVG
                      value={demoPass.passcode}
                      size={112}
                      level="M"
                      fgColor="#0f172a"
                    />
                  </div>

                  <div className="text-center space-y-1 w-full">
                    <span className="text-[10px] font-extrabold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                      Passcode: {demoPass.passcode}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate pt-1 leading-none">
                      {demoPass.name}
                    </h4>
                    <p className="text-[9px] text-slate-400 font-semibold leading-tight">
                      Host: {demoPass.hostName} <br />
                      Purpose: {demoPass.purpose}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    EXPECTED VISITOR
                  </span>
                </div>
              ) : (
                <div className="w-full max-w-[270px] space-y-4 text-center">
                  <div className="space-y-3 opacity-50">
                    <Skeleton className="mx-auto h-32 w-32 rounded-xl" />
                    <Skeleton className="mx-auto h-4 w-28 rounded-full" />
                    <Skeleton className="mx-auto h-3 w-40 rounded" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                      Pass Preview
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                      Fill out the demo pre-registration form to generate your interactive QR code pass preview.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECURITY BAR */}
      <section id="security" className="py-16 bg-slate-50/20 dark:bg-slate-950/20 border-y border-border/40">
        <div className="container mx-auto px-6 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black tracking-widest text-primary uppercase">
              Secure Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Enterprise security built for every workspace
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Complete Lobby Logs",
                desc: "Full history tracking of checks in and checks out, complete with government verification notes.",
              },
              {
                title: "Local State Persistence",
                desc: "Workspace configurations, hosts, and logs are persisted client-side for rapid access speeds.",
              },
              {
                title: "Instant Notifications",
                desc: "Ready to log host contacts to ensure hosts are immediately aware of their guests' arrivals.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-5 border border-border/30 bg-card/40 rounded-2xl flex flex-col justify-center items-center text-center space-y-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-primary flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection isLoggedIn={isLoggedIn} />

      {/* FOOTER */}
      <footer className="mt-auto border-t border-border/40 bg-card py-12">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logoAnshapps.png"
              alt="Anshapps Logo"
              className="h-8 w-auto opacity-80"
            />
            <span className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              ANSH VISITOR APPS © 2026
            </span>
          </div>

          <div className="flex gap-6 text-xs font-semibold text-slate-400 dark:text-slate-500">
            <span className="hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              Terms of Use
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              Contact Support
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
