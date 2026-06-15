"use client";

import { useEffect, useState } from "react";
import {
  UserCheck,
  Bell,
  History,
  QrCode
} from "lucide-react";

interface SlideData {
  id: number;
  badge: string;
  badgeIcon: any;
  badgeColor: string;
  badgeBg: string;
  title: React.ReactNode;
  copy: string;
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    badge: "Smart Desk Check-In",
    badgeIcon: QrCode,
    badgeColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    title: (
      <>
        Self-Serve
        <br />
        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Visitor QR Passes
        </span>
        <br />
        <span className="text-slate-200">in seconds</span>
      </>
    ),
    copy: "Visitors receive custom invitation passes with dynamic QR codes via Email or SMS, allowing quick scan-and-go kiosk verification at entryways.",
  },
  {
    id: 1,
    badge: "Real-Time Host Alerts",
    badgeIcon: Bell,
    badgeColor: "text-teal-400",
    badgeBg: "bg-teal-500/10 border-teal-500/20",
    title: (
      <>
        Automated Host
        <br />
        <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
          Arrival Notifications
        </span>
        <br />
        <span className="text-emerald-400">instantly</span>
      </>
    ),
    copy: "Automatically ping your employees on their workspace dashboard or messaging apps the exact second their invited guest checks in at the reception lobby.",
  },
  {
    id: 2,
    badge: "Security Audit Desk",
    badgeIcon: History,
    badgeColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 border-sky-500/20",
    title: (
      <>
        Trace building
        <br />
        <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Occupancy Logs
        </span>
        <br />
        <span className="text-emerald-500">natively</span>
      </>
    ),
    copy: "Maintain a compliant log of visitor contact records, proof validation details, host mappings, and precise check-in and check-out timestamps.",
  },
];

export function AuthMarketingPanel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#070809] lg:flex border-r border-slate-900/50 min-h-screen">
      {/* Sleek matrix grid background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow point */}
        <div
          className="absolute -left-20 top-1/4 h-[350px] w-[350px] rounded-full blur-[140px] opacity-25 transition-all duration-1000"
          style={{
            backgroundColor:
              currentSlide === 0
                ? "#10b981"
                : currentSlide === 1
                ? "#0d9488"
                : "#0ea5e9",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col p-12 xl:p-20 justify-between">
        {/* Slide Copy */}
        <div className="space-y-6">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-md transition-all duration-500 ${slide.badgeBg}`}
          >
            <BadgeIcon className={`h-4 w-4 ${slide.badgeColor}`} />
            <span className="text-xs font-bold tracking-wide text-slate-300">
              {slide.badge}
            </span>
          </div>

          <h1 className="mt-8 font-sans text-4xl font-extrabold leading-[1.1] tracking-tight text-white xl:text-5xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            {slide.title}
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-400 transition-all duration-500 animate-in fade-in delay-150">
            {slide.copy}
          </p>
        </div>

        {/* Visual Mockups */}
        <div className="relative w-full h-[280px] flex items-center justify-center my-6">
          {/* Slide 0: Pass Card */}
          {currentSlide === 0 && (
            <div className="absolute w-[320px] rounded-2xl border border-white/5 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VISITOR ENTRY PASS</span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">
                  Pre-registered
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold">
                  [QR]
                </div>
                <div className="space-y-1 text-xs">
                  <span className="block font-bold text-white">Aarav Mehta</span>
                  <span className="block text-slate-500">Acme Corp · Purpose: Meeting</span>
                </div>
              </div>
            </div>
          )}

          {/* Slide 1: Notifications */}
          {currentSlide === 1 && (
            <div className="absolute w-[340px] rounded-2xl border border-white/5 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-xs font-extrabold text-white">
                  VR
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Lobby Kiosk Alert</span>
                    <span className="text-[9px] text-slate-500 font-semibold">Just now</span>
                  </div>
                  <span className="block text-[10px] font-bold text-emerald-400">
                    Host: Vikram Raj
                  </span>
                  <p className="text-xs text-slate-400 bg-white/5 p-2 rounded-xl italic">
                    "Your invited guest Aarav Mehta (Acme Corp) has checked in at Desk 1."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 2: Stats */}
          {currentSlide === 2 && (
            <div className="absolute w-[320px] rounded-2xl border border-white/5 bg-slate-950/80 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-white/5 pb-2.5">
                Lobby Traffic Analysis
              </span>
              <div className="mt-3.5 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">Active checked-in inside building</span>
                  <span className="font-black text-emerald-400">12 Guests</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">Expected arrivals today</span>
                  <span className="font-black text-slate-400">8 Guests</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {SLIDES.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentSlide === index
                  ? "w-8 bg-emerald-500"
                  : "w-4 bg-white/10 hover:bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
