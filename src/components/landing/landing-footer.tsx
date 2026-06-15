"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

const PRODUCT_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "My Links", href: "#mylinks" },
  { label: "Live Sandbox", href: "#demo" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

const ACCOUNT_LINKS = [
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
  { label: "Support Desk", href: "mailto:hello@anshapps.com" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "mailto:hello@anshapps.com" },
];

export function LandingFooter() {
  return (
    <footer className="mt-auto w-full bg-black text-white">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-24 sm:pt-28 pb-16 sm:pb-20">
        {/* Handled by + hero brand */}
        <div className="text-center mb-20 sm:mb-28 lg:mb-32">
          <div className="inline-flex items-center gap-2.5 mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">
              Handled by
            </span>
            <img src="/logoAnshapps.png" alt="Ansh Apps" className="h-5 sm:h-6 w-auto opacity-90" />
          </div>
          <div className="overflow-visible pb-2 sm:pb-4">
            <h2
              className="inline-block font-black tracking-tight leading-[1.1] pb-2 sm:pb-3 bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 bg-clip-text text-transparent text-[clamp(3.75rem,14vw,12rem)]"
            >
              Ansh Apps
            </h2>
          </div>
        </div>

        {/* Columns */}
        <div className="grid w-full gap-12 sm:gap-14 lg:gap-x-16 xl:gap-x-24 sm:grid-cols-2 lg:grid-cols-4 mb-20 sm:mb-24">
          {/* Brand column */}
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-2.5">
              <img src="/logoAnshapps.png" alt="Ansh Visitor" className="h-7 w-auto" />
              <span className="text-sm font-black tracking-wide uppercase">Ansh Visitor</span>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
              A premium visitor management system for modern offices — QR passes, ID verification, and guest logs in one sleek dashboard.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-xs font-black tracking-[0.2em] text-white uppercase">Product</h3>
            <ul className="space-y-3.5">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-slate-500 font-medium hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-xs font-black tracking-[0.2em] text-white uppercase">Account</h3>
            <ul className="space-y-3.5">
              {ACCOUNT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-500 font-medium hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="space-y-5 sm:space-y-6">
            <h3 className="text-xs font-black tracking-[0.2em] text-white uppercase">Get in Touch</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Have questions or need custom business plans? Talk to our creators.
            </p>
            <a
              href="mailto:hello@anshapps.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0" />
              hello@anshapps.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full border-t border-slate-800/80 pt-10 sm:pt-12 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <p className="text-xs text-slate-600 font-medium">
            © 2026 ANSH Visitor. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {LEGAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-slate-600 font-medium hover:text-slate-400 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
