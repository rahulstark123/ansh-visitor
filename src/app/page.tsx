"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useUiStore } from "@/stores/ui-store";
import {
  QrCode,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  ArrowUpRight,
  Clock,
  BarChart3,
  Lock,
  Check,
  Smartphone,
  CheckCircle,
  FileText,
  Link2,
  Zap,
  Globe,
  Eye,
  Share2,
  Menu,
  X,
  ChevronDown,
  ScanLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaBanner } from "@/components/landing/cta-banner";
import { LandingFooter } from "@/components/landing/landing-footer";
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

// Typewriter hook
function useTypewriter(words: string[], speed = 75, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState(words[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= current.length) {
      timer = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx((c) => c + 1); }, speed);
    } else if (!deleting && charIdx > current.length) {
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx >= 0) {
      timer = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx((c) => c - 1); }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pauseMs]);

  return displayed;
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scanVerified, setScanVerified] = useState(false);

  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [selectedHostId, setSelectedHostId] = useState("h-1");
  const [selectedPurpose, setSelectedPurpose] = useState("Meeting");
  const [demoPass, setDemoPass] = useState<{
    name: string; phone: string; hostName: string; purpose: string; passcode: string;
  } | null>(null);
  const [loadingDemo, setLoadingDemo] = useState(false);

  const typewriterWord = useTypewriter(["Reimagined.", "Digitized.", "Secured.", "Supercharged."]);

  useEffect(() => {
    setMounted(true);
    const session = sessionStorage.getItem("ansh_auth_session");
    const token = sessionStorage.getItem("ansh_auth_token");
    if (session && token) setIsLoggedIn(true);

    // Cycle the scan animation
    const interval = setInterval(() => {
      setScanVerified(false);
      setTimeout(() => setScanVerified(true), 2800);
    }, 5000);
    setScanVerified(true);
    return () => clearInterval(interval);
  }, []);

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
      setDemoPass({ name: visitorName, phone: visitorPhone, hostName: host?.name ?? "Vikram Raj", purpose: selectedPurpose, passcode });
      setLoadingDemo(false);
      toast.success("Demo pass created", `${visitorName} · Passcode ${passcode}`);
    }, 800);
  };

  const handleResetDemo = () => { setVisitorName(""); setVisitorPhone(""); setDemoPass(null); };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <title>Ansh Visitor | Secure Lobby Management</title>

      <style>{`
        @keyframes scanLine {
          0%   { top: 8%; }
          50%  { top: 82%; }
          100% { top: 8%; }
        }
        .scan-line {
          animation: scanLine 2.2s ease-in-out infinite;
        }
        @keyframes verifiedPop {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .verified-pop {
          animation: verifiedPop 0.4s ease-out both;
        }
      `}</style>

      {/* ── NAVBAR ────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-700/50" style={{ background: "rgba(10,15,25,0.92)", backdropFilter: "blur(16px)" }}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logoAnshapps.png" alt="Anshapps Logo" className="h-11 w-auto max-h-[44px] shrink-0 select-none object-contain" />
            <span className="text-base font-extrabold leading-tight tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Ansh Visitor
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-400">
            {[["#features","Features"],["#mylinks","My Links"],["#demo","Live Sandbox"],["#pricing","Pricing"],["#security","Security"]].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-emerald-400 transition-colors">{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="md:hidden h-9 w-9 rounded-lg border border-slate-700 flex items-center justify-center text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            {isLoggedIn ? (
              <Link href="/dashboard" className="hidden md:flex btn-primary items-center gap-2 rounded-2xl h-10 px-5">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link href="/login" className="hidden md:inline-flex items-center text-sm font-bold text-slate-400 hover:text-white transition-colors px-3 py-2">Sign In</Link>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 px-6 py-4 space-y-3" style={{ background: "rgba(10,15,25,0.97)" }}>
            {[["#features","Features"],["#mylinks","My Links"],["#demo","Live Sandbox"],["#pricing","Pricing"],["#security","Security"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold text-slate-400 hover:text-emerald-400">{label}</a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              {isLoggedIn ? (
                <Link href="/dashboard" className="btn-primary w-full rounded-xl h-10 flex items-center justify-center gap-2 text-sm font-bold">Dashboard <ArrowRight className="h-4 w-4" /></Link>
              ) : (
                <Link href="/login" className="w-full h-10 flex items-center justify-center rounded-xl border border-slate-700 text-slate-300 text-sm font-bold">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-6 pb-16" style={{ background: "linear-gradient(135deg, #022c22 0%, #0f172a 50%, #042f2e 100%)" }}>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "56px 56px" }}
          />
        </div>

        <div className="container mx-auto px-6 w-full">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            {/* Left content */}
            <div className="lg:col-span-6 flex flex-col gap-10 sm:gap-11 lg:gap-14 text-center lg:text-left">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-400/50 hover:bg-emerald-500/15 transition-all group mx-auto lg:mx-0"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="text-sm font-semibold text-emerald-300">Your lobby dashboard is ready</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mx-auto lg:mx-0 w-fit">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <Sparkles className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-emerald-400/90 whitespace-nowrap">
                    Ditch the paper register — go digital
                  </span>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                The Front Desk,{" "}
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  {typewriterWord}
                </span>
                <span className="inline-block w-0.5 h-[0.85em] bg-emerald-400 ml-0.5 animate-pulse align-middle" />
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl mx-auto lg:mx-0 leading-[1.75]">
                A premium, secure visitor management system for modern offices. Speed up front-desk operations, verify government IDs, generate QR passes, and log visits — all from one sleek dashboard.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                {isLoggedIn ? (
                  <Link href="/dashboard" className="w-full sm:w-auto h-12 px-8 text-base rounded-2xl flex items-center justify-center gap-2 cursor-pointer font-bold text-white" style={{ background: "linear-gradient(135deg,#10b981,#0d9488,#06b6d4)", boxShadow: "0 8px 28px -4px rgba(16,185,129,0.5)" }}>
                    Enter Dashboard <ArrowRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link href="/signup" className="w-full sm:w-auto h-12 px-8 text-base rounded-2xl flex items-center justify-center gap-2 cursor-pointer font-bold text-white" style={{ background: "linear-gradient(135deg,#10b981,#0d9488,#06b6d4)", boxShadow: "0 8px 28px -4px rgba(16,185,129,0.5)" }}>
                      Start 14-Day Free Trial <ArrowRight className="h-5 w-5" />
                    </Link>
                    <a href="https://anshapps.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 h-12 text-sm font-bold border border-white/20 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all text-white/80">
                      Visit ANSH <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </>
                )}
              </div>

              <div className="space-y-2 text-center lg:text-left">
                <p className="text-base sm:text-lg font-bold text-white">
                  Built from Bharat for the World
                </p>
                <p className="text-sm font-semibold text-emerald-400">
                  encouraging Vasudhaiva Kutumbakam
                </p>
              </div>
            </div>

            {/* Right: QR Scanner visual */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="relative w-full max-w-[440px]">

                {/* ── Visitor Pass Card (top-left, slightly tilted) */}
                <div className="absolute -top-6 -left-4 z-10 w-52 bg-white rounded-2xl shadow-2xl p-4 select-none"
                  style={{ transform: "rotate(-6deg)", boxShadow: "0 20px 60px -10px rgba(0,0,0,0.5)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-md bg-emerald-500 flex items-center justify-center">
                      <img src="/logoAnshapps.png" alt="" className="h-4 w-auto" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">ANSH VISITOR</p>
                      <p className="text-[9px] font-black text-slate-700 leading-none">Guest Pass</p>
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    <div className="bg-white border border-slate-100 p-1.5 rounded-lg">
                      <QRCodeSVG value="ANSH-PASS-847231" size={76} level="M" fgColor="#0f172a" />
                    </div>
                  </div>
                  <p className="text-center text-[9px] font-black text-slate-700 leading-none">Aarav Mehta</p>
                  <p className="text-center text-[8px] text-slate-400 mt-0.5">Meeting · 09:30 AM</p>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <span className="text-[8px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Passcode: 847231
                    </span>
                  </div>
                </div>

                {/* ── Main Scanner Panel */}
                <div className="relative mt-16 ml-10 bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl"
                  style={{ boxShadow: "0 30px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)" }}>

                  {/* Scanner top bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/60 bg-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ScanLine className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">QR Scanner — Desk Mode</span>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  {/* Scanner viewport */}
                  <div className="relative p-5">
                    {/* Camera feed simulation */}
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/3] flex items-center justify-center">
                      {/* Subtle camera grain texture */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-950" />

                      {/* QR code "in frame" */}
                      <div className="relative z-10 bg-white p-3 rounded-xl shadow-xl">
                        <QRCodeSVG value="ANSH-PASS-847231" size={110} level="M" fgColor="#0f172a" />
                      </div>

                      {/* Scan line */}
                      {!scanVerified && (
                        <div className="scan-line absolute left-0 right-0 h-0.5 z-20 mx-5"
                          style={{ background: "linear-gradient(90deg, transparent, #10b981, #34d399, #10b981, transparent)", boxShadow: "0 0 12px 3px rgba(16,185,129,0.6)" }}
                        />
                      )}

                      {/* Corner frame markers */}
                      {[
                        "top-3 left-3 border-t-2 border-l-2 rounded-tl-lg",
                        "top-3 right-3 border-t-2 border-r-2 rounded-tr-lg",
                        "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
                        "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
                      ].map((cls, i) => (
                        <div key={i} className={`absolute h-6 w-6 border-emerald-400 z-30 ${cls}`} />
                      ))}

                      {/* Verified overlay */}
                      {scanVerified && (
                        <div className="verified-pop absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-500/15 backdrop-blur-sm rounded-2xl">
                          <div className="h-14 w-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg mb-2">
                            <Check className="h-8 w-8 text-white" strokeWidth={3} />
                          </div>
                          <p className="text-emerald-300 font-black text-sm uppercase tracking-wider">Verified!</p>
                          <p className="text-slate-300 text-[10px] font-semibold mt-0.5">Aarav Mehta</p>
                        </div>
                      )}
                    </div>

                    {/* Status bar below scanner */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", scanVerified ? "bg-emerald-500" : "bg-amber-400 animate-pulse")} />
                        <span className="text-[11px] font-bold text-slate-300">
                          {scanVerified ? "Guest Verified — Checked In" : "Scanning for QR Code..."}
                        </span>
                      </div>
                      <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {scanVerified ? "✓ Done" : "Active"}
                      </span>
                    </div>

                    {/* Guest info row */}
                    {scanVerified && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-black text-sm flex items-center justify-center shrink-0">AM</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">Aarav Mehta</p>
                          <p className="text-[9px] text-slate-400 font-semibold">Meeting · Host: Vikram Raj</p>
                        </div>
                        <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg shrink-0">#847231</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating status badge */}
                <div className="animate-float absolute -bottom-4 -right-4 z-10 bg-slate-800 border border-slate-600/60 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-emerald-400" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">QR Pass System</p>
                    <p className="text-[10px] font-bold text-emerald-400">Verification Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <a href="#our-apps" className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* ── OUR APPS MARQUEE ──────────────────────── */}
      <section id="our-apps" className="py-16 bg-slate-950 border-y border-slate-700/40 overflow-hidden">
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Heading */}
        <div className="container mx-auto px-6 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Ecosystem</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The full <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Ansh Apps</span> suite
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-semibold max-w-xs">
            One ecosystem, every business operation — manage tasks, HR, expenses, bookings and visitors from connected apps.
          </p>
        </div>

        {/* Marquee row */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-slate-950 to-transparent" />

          <div className="marquee-track gap-5 px-4">
            {[...Array(2)].map((_, loopIdx) =>
              [
                {
                  name: "ANSH Visitor",
                  tagline: "Smart lobby & guest management",
                  desc: "QR passes, ID verification, check-in logs",
                  color: "from-emerald-500/20 to-teal-500/20",
                  badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
                  dot: "bg-emerald-400",
                  status: "live" as const,
                  image: "/ANSH Visitor.jpg",
                  href: null,
                  isCurrent: true,
                },
                {
                  name: "ANSH Tasks",
                  tagline: "Team task & project tracker",
                  desc: "Assign, track and close tasks across teams",
                  color: "from-sky-500/20 to-blue-500/20",
                  badge: "bg-sky-500/15 text-sky-400 border-sky-500/25",
                  dot: "bg-sky-400",
                  status: "live" as const,
                  image: "/Ansh Task.jpg",
                  href: "https://tasks.anshapps.com",
                  isCurrent: false,
                },
                {
                  name: "ANSH HR",
                  tagline: "Human resource management",
                  desc: "Employee records, leaves, payroll & more",
                  color: "from-violet-500/20 to-purple-500/20",
                  badge: "bg-violet-500/15 text-violet-400 border-violet-500/25",
                  dot: "bg-violet-400",
                  status: "live" as const,
                  image: "/ANSH HR.jpg",
                  href: "https://hr.anshapps.com",
                  isCurrent: false,
                },
                {
                  name: "ANSH Expense",
                  tagline: "Expense & reimbursement tracking",
                  desc: "Submit, approve and audit business expenses",
                  color: "from-orange-500/20 to-amber-500/20",
                  badge: "bg-orange-500/15 text-orange-400 border-orange-500/25",
                  dot: "bg-orange-400",
                  status: "live" as const,
                  image: "/ANSH Expense.jpg",
                  href: "https://expense.anshapps.com",
                  isCurrent: false,
                },
                {
                  name: "ANSH Booking",
                  tagline: "Meeting room & resource booking",
                  desc: "Reserve rooms, assets and slots with ease",
                  color: "from-pink-500/20 to-rose-500/20",
                  badge: "bg-pink-500/15 text-pink-400 border-pink-500/25",
                  dot: "bg-pink-400",
                  status: "building" as const,
                  image: null,
                  href: null,
                  isCurrent: false,
                },
              ].map((app, idx) => {
                const card = (
                  <div
                    key={`${loopIdx}-${idx}`}
                    className="shrink-0 w-72 rounded-2xl border border-slate-700/50 bg-slate-900 overflow-hidden group transition-all duration-300 select-none"
                    style={app.href ? { cursor: "pointer" } : { cursor: "default" }}
                  >
                    {/* Image / placeholder */}
                    <div className={`relative h-40 bg-gradient-to-br ${app.color} border-b border-slate-700/40 overflow-hidden`}>
                      {app.image ? (
                        <img
                          src={app.image}
                          alt={app.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : app.isCurrent ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <img src="/logoAnshapps.png" alt="Ansh Visitor" className="h-14 w-auto opacity-60" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-40">
                          <div className="h-10 w-10 rounded-xl border-2 border-dashed border-current" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-pink-400">In Development</span>
                        </div>
                      )}

                      {/* Status badges */}
                      {app.isCurrent && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                          <span className="text-[8px] font-black uppercase text-emerald-400 tracking-wider">You are here</span>
                        </div>
                      )}
                      {app.status === "building" && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-pink-500/20 border border-pink-500/30 rounded-full px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-pulse" />
                          <span className="text-[8px] font-black uppercase text-pink-400 tracking-wider">Building</span>
                        </div>
                      )}
                      {!app.isCurrent && app.status === "live" && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-sky-500/20 border border-sky-500/30 rounded-full px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          <span className="text-[8px] font-black uppercase text-sky-400 tracking-wider">Live ↗</span>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${app.dot}`} />
                          <h3 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">{app.name}</h3>
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${app.badge}`}>
                          {app.status === "live" ? "Live" : "Soon"}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-300">{app.tagline}</p>
                      <p className="text-[9px] text-slate-500 font-medium leading-relaxed">{app.desc}</p>
                    </div>
                  </div>
                );

                return app.href ? (
                  <a key={`${loopIdx}-${idx}`} href={app.href} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:-translate-y-1.5 transition-transform duration-300">
                    {/* Re-render the inner card without the key (it's on the <a>) */}
                    <div className="w-72 rounded-2xl border border-slate-700/50 bg-slate-900 overflow-hidden group transition-all duration-300 select-none cursor-pointer hover:border-slate-500/60 hover:shadow-xl hover:shadow-black/40">
                      <div className={`relative h-40 bg-gradient-to-br ${app.color} border-b border-slate-700/40 overflow-hidden`}>
                        <img src={app.image!} alt={app.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-sky-500/20 border border-sky-500/30 rounded-full px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                          <span className="text-[8px] font-black uppercase text-sky-400 tracking-wider">Live ↗</span>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${app.dot}`} />
                            <h3 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">{app.name}</h3>
                          </div>
                          <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${app.badge}`}>Live</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-300">{app.tagline}</p>
                        <p className="text-[9px] text-slate-500 font-medium leading-relaxed">{app.desc}</p>
                      </div>
                    </div>
                  </a>
                ) : card;
              })
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────── */}
      <section id="features" className="py-24 border-b border-border/40" style={{ background: "linear-gradient(135deg, oklch(0.16 0.025 160) 0%, oklch(0.13 0.02 220) 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Full Suite Platform</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Everything your lobby needs
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Equip your front desk with tools built to speed up visitor onboarding, verify identity documents, and safeguard entry logs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: QrCode, title: "Instant QR Passes", desc: "Every pre-registered visitor receives a dynamic client-side generated QR pass on their phone, ready to scan at the desk.", grad: "from-emerald-500/20 to-teal-500/20", iconCls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
              { icon: ShieldCheck, title: "Govt ID Verification", desc: "Verify credentials (Aadhaar, PAN, Passport) upon arrival, embedding ID details securely onto their physical print pass.", grad: "from-sky-500/20 to-indigo-500/20", iconCls: "bg-sky-500/15 text-sky-400 border-sky-500/25" },
              { icon: Clock, title: "Desk Quick Check-in", desc: "Front-desk managers can check in expected guests via keyboard scanner emulation in under 1 second.", grad: "from-violet-500/20 to-purple-500/20", iconCls: "bg-violet-500/15 text-violet-400 border-violet-500/25" },
              { icon: BarChart3, title: "Reports & Audit Logs", desc: "Export visitor history, filter by date and status, and maintain compliance-ready audit trails for your organization.", grad: "from-orange-500/20 to-amber-500/20", iconCls: "bg-orange-500/15 text-orange-400 border-orange-500/25" },
              { icon: Users, title: "Team Directory & Roster", desc: "Manage teammates, branches, access credentials, and reporting lines in a 3-step organization wizard modal.", grad: "from-pink-500/20 to-rose-500/20", iconCls: "bg-pink-500/15 text-pink-400 border-pink-500/25" },
              { icon: Lock, title: "6-Digit Passcodes", desc: "For visitors without QR access, a 6-digit passcode lets them instantly get verified at the reception desk.", grad: "from-teal-500/20 to-cyan-500/20", iconCls: "bg-teal-500/15 text-teal-400 border-teal-500/25" },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="relative overflow-hidden group rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 flex flex-col items-start gap-4 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", feat.grad)} />
                  <div className={cn("relative h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300", feat.iconCls)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="relative space-y-1.5">
                    <h3 className="font-extrabold text-white leading-tight">{feat.title}</h3>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MY LINKS ──────────────────────────────── */}
      <section id="mylinks" className="py-24 overflow-hidden border-b border-border/40" style={{ background: "linear-gradient(135deg, oklch(0.11 0.02 200) 0%, oklch(0.14 0.025 160) 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Zero-Login Access</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Introducing{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">My Links</span>
              {" "}— your public visitor portal
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Share a personal registration link with your visitors and let them pre-register for a QR gate pass — no login required on their end.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-4">
              {[
                { icon: Link2, title: "Your unique workspace URL", desc: "Every workspace gets a custom shareable link. Share it via email, WhatsApp, or a printed QR code on your lobby entrance.", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" },
                { icon: Globe, title: "No login needed for visitors", desc: "Visitors open the link, fill in their name, phone, select a host and purpose — and instantly receive a QR pass and 6-digit passcode.", cls: "bg-sky-500/10 text-sky-400 border-sky-500/25" },
                { icon: Eye, title: "Host is notified instantly", desc: "As soon as the visitor pre-registers, their host is notified with full details so there's zero friction on arrival.", cls: "bg-violet-500/10 text-violet-400 border-violet-500/25" },
                { icon: Smartphone, title: "Beautiful branded registration cards", desc: "Customize your public page with your company theme — dark, light, glass or minimal.", cls: "bg-orange-500/10 text-orange-400 border-orange-500/25" },
              ].map(({ icon: Icon, title, desc, cls }, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border border-slate-700/40 bg-slate-800/30 hover:bg-slate-800/60 hover:border-emerald-500/30 transition-all duration-300 group">
                  <div className={cn("h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300", cls)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-white">{title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mockup */}
            <div className="relative flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              </div>
              <div className="relative w-full max-w-sm">
                <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700/60 rounded-xl shadow-sm">
                  <Globe className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-mono text-slate-400 truncate">
                    anshvisitor.com/register/<span className="text-emerald-400 font-bold">your-workspace</span>
                  </span>
                </div>

                <div className="bg-slate-900 border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white text-center">
                    <div className="h-10 w-10 rounded-xl bg-white/20 mx-auto flex items-center justify-center mb-3">
                      <img src="/logoAnshapps.png" alt="Logo" className="h-7 w-auto" />
                    </div>
                    <h3 className="text-sm font-black tracking-tight">Welcome to Acme Corp</h3>
                    <p className="text-[10px] font-semibold text-white/70 mt-0.5">Pre-register your visit</p>
                  </div>

                  <div className="p-5 space-y-3">
                    {[{ label: "Full Name", placeholder: "Your name" }, { label: "Phone Number", placeholder: "+91 98765 43210" }].map(({ label, placeholder }, i) => (
                      <div key={i}>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                        <div className="h-8 rounded-lg border border-slate-700 bg-slate-800/80 px-3 flex items-center">
                          <span className="text-[10px] text-slate-500">{placeholder}</span>
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-2 gap-2">
                      {[{ label: "Host", placeholder: "Select host" }, { label: "Purpose", placeholder: "Meeting" }].map(({ label, placeholder }, i) => (
                        <div key={i}>
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
                          <div className="h-8 rounded-lg border border-slate-700 bg-slate-800/80 px-3 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">{placeholder}</span>
                            <ChevronDown className="h-3 w-3 text-slate-600" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full h-9 rounded-xl text-[11px] font-bold text-white flex items-center justify-center gap-1.5" style={{ background: "linear-gradient(135deg,#10b981,#0d9488)" }}>
                      <QrCode className="h-3.5 w-3.5" /> Generate My Pass
                    </button>
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                      <div className="h-12 w-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0">
                        <QRCodeSVG value="DEMO" size={40} level="L" fgColor="#0f172a" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-emerald-400 tracking-wider">Pass Ready!</p>
                        <p className="text-[10px] font-bold text-slate-300">Passcode: 847231</p>
                        <span className="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-400">
                          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" /> Expected Visitor
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">Zero Login!</div>
                <div className="absolute -bottom-3 -left-3 bg-slate-800 border border-slate-700/60 rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                  <Share2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[10px] font-bold text-slate-300">Share in 1 click</span>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-20">
            <p className="text-center text-xs font-black uppercase tracking-widest text-emerald-400 mb-10">How My Links works</p>
            <div className="grid sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { step: "1", title: "You share the link", desc: "Copy your unique workspace URL and send it to your upcoming visitor" },
                { step: "2", title: "Visitor fills details", desc: "They open the link, enter their name, phone, host & purpose" },
                { step: "3", title: "QR pass is generated", desc: "A secure QR + 6-digit passcode is issued to them instantly" },
                { step: "4", title: "Seamless check-in", desc: "They arrive, scan the QR or quote the passcode — done in under 15 seconds" },
              ].map(({ step, title, desc }, i) => (
                <div key={i} className="text-center space-y-3 relative">
                  {i < 3 && <div className="absolute top-4 left-[calc(50%+20px)] right-[-50%] h-px bg-gradient-to-r from-emerald-500/40 to-transparent hidden sm:block" />}
                  <div className="h-8 w-8 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">{step}</div>
                  <h4 className="text-xs font-extrabold text-white">{title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DEMO SANDBOX ──────────────────────────── */}
      <section id="demo" className="py-24 border-b border-border/40" style={{ background: "linear-gradient(135deg, oklch(0.13 0.02 160) 0%, oklch(0.12 0.02 240) 100%)" }}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Live Try-Out</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              See it in action — right now
            </h2>
            <p className="text-sm text-slate-400 font-medium">Pre-register a demo guest and get a real QR pass instantly.</p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-700/50 bg-slate-900 overflow-hidden shadow-2xl grid lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live Try-Out Sandbox</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Try it out: Pre-register a guest</h2>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">Enter demo details to instantly generate a secure 6-digit visitor passcode and SVG QR code pass.</p>
              </div>

              {demoPass ? (
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" strokeWidth={3} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-white">Pass Generated Successfully!</h3>
                    <p className="text-[11px] text-slate-400 font-semibold">Your guest can check in using this passcode at the reception desk.</p>
                  </div>
                  <button onClick={handleResetDemo} className="btn-primary rounded-xl px-6 h-10 text-xs tracking-wide cursor-pointer">Register Another Guest</button>
                </div>
              ) : (
                <form onSubmit={handleGenerateDemoPass} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Guest Full Name</label>
                      <input required type="text" placeholder="e.g. Rahul Sen" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="mt-2 w-full h-10 px-3.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-600" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Phone Number</label>
                      <input required type="tel" placeholder="e.g. +91 98765 43210" value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} className="mt-2 w-full h-10 px-3.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Select Host</label>
                      <select value={selectedHostId} onChange={(e) => setSelectedHostId(e.target.value)} className="mt-2 w-full h-10 px-3.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer">
                        {MOCK_DEMO_HOSTS.map((host) => <option key={host.id} value={host.id}>{host.name} ({host.role})</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Purpose of Visit</label>
                      <select value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)} className="mt-2 w-full h-10 px-3.5 rounded-lg border border-slate-700 bg-slate-800 text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer">
                        {DEMO_PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={loadingDemo} className="w-full btn-primary h-11 rounded-xl font-bold cursor-pointer text-xs uppercase tracking-wider disabled:opacity-50">
                    {loadingDemo ? <ButtonLoadingSkeleton className="mx-auto h-4 w-36 rounded bg-primary-foreground/30" /> : "Pre-register Visitor"}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 p-8 border-l border-slate-700/40 bg-slate-950/50 flex flex-col justify-center items-center">
              {loadingDemo ? (
                <PassPreviewSkeleton />
              ) : demoPass ? (
                <div className="w-full max-w-[270px] bg-slate-900 border border-slate-700/50 rounded-2xl p-5 shadow-lg flex flex-col items-center space-y-4">
                  <div className="text-center">
                    <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-widest">ANSH GUEST PASS</span>
                    <h3 className="text-xs font-black text-white tracking-tight leading-none mt-0.5">ANSH VISITOR APPS</h3>
                  </div>
                  <div className="h-32 w-32 bg-white border border-slate-200 p-2 rounded-xl flex items-center justify-center shadow-sm shrink-0 select-none">
                    <QRCodeSVG value={demoPass.passcode} size={112} level="M" fgColor="#0f172a" />
                  </div>
                  <div className="text-center space-y-1 w-full">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Passcode: {demoPass.passcode}</span>
                    <h4 className="text-xs font-extrabold text-white truncate pt-1 leading-none">{demoPass.name}</h4>
                    <p className="text-[9px] text-slate-400 font-semibold leading-tight">Host: {demoPass.hostName}<br />Purpose: {demoPass.purpose}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> EXPECTED VISITOR
                  </span>
                </div>
              ) : (
                <div className="w-full max-w-[270px] space-y-4 text-center">
                  <div className="space-y-3 opacity-40">
                    <Skeleton className="mx-auto h-32 w-32 rounded-xl" />
                    <Skeleton className="mx-auto h-4 w-28 rounded-full" />
                    <Skeleton className="mx-auto h-3 w-40 rounded" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Pass Preview</h4>
                    <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Fill out the demo form to generate your interactive QR code pass preview.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY ──────────────────────────────── */}
      <section id="security" className="py-20 border-b border-border/40" style={{ background: "linear-gradient(135deg, oklch(0.14 0.025 160) 0%, oklch(0.12 0.02 200) 100%)" }}>
        <div className="container mx-auto px-6 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Secure Operations</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Enterprise security built for every workspace
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: "Complete Lobby Logs", desc: "Full history tracking of check-ins and check-outs, complete with government verification notes.", icon: FileText },
              { title: "Local State Persistence", desc: "Workspace configurations, hosts, and logs are persisted client-side for rapid access speeds.", icon: Lock },
              { title: "Instant Notifications", desc: "Hosts are immediately notified the moment their guest pre-registers or arrives.", icon: Zap },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 border border-slate-700/40 bg-slate-800/30 rounded-2xl flex flex-col items-center text-center space-y-3 hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all duration-300 group">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PricingSection />

      {/* ── FAQ ───────────────────────────────────── */}
      <FaqSection />

      {/* ── CTA BANNER ────────────────────────────── */}
      <CtaBanner isLoggedIn={isLoggedIn} />

      <LandingFooter />
    </div>
  );
}
