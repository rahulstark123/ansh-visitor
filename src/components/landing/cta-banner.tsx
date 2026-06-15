"use client";

import Link from "next/link";
import { ArrowRight, QrCode } from "lucide-react";

interface CtaBannerProps {
  isLoggedIn: boolean;
}

export function CtaBanner({ isLoggedIn }: CtaBannerProps) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #064e3b 0%, #0f172a 50%, #134e4a 100%)" }}
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative container mx-auto px-6 text-center space-y-8">
        {/* Icon */}
        <div className="inline-flex h-14 w-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 items-center justify-center mx-auto">
          <QrCode className="h-7 w-7 text-emerald-400" />
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to transform{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              your lobby?
            </span>
          </h2>
          <p className="text-base text-slate-300 font-medium leading-relaxed">
            Set up your workspace in under two minutes. No credit card required.<br className="hidden sm:block" />
            Free forever — upgrade only when you're ready.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="h-12 px-10 rounded-2xl text-base font-bold text-white flex items-center gap-2.5 transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#10b981,#0d9488,#06b6d4)", boxShadow: "0 10px 32px -4px rgba(16,185,129,0.5)" }}
            >
              Go to Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="h-12 px-10 rounded-2xl text-base font-bold text-white flex items-center gap-2.5 transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#10b981,#0d9488,#06b6d4)", boxShadow: "0 10px 32px -4px rgba(16,185,129,0.5)" }}
              >
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="h-12 px-10 rounded-2xl text-base font-bold text-white/70 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-all"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Trust line */}
        <p className="text-[11px] text-slate-500 font-semibold">
          SSL encrypted · Secured by Razorpay · 99.9% Uptime SLA
        </p>
      </div>
    </section>
  );
}
