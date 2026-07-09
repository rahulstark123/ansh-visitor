"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANDING_FAQS } from "@/lib/landing-seo";

const FAQS = LANDING_FAQS.map((faq) => ({ q: faq.question, a: faq.answer }));

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={cn(
        "border border-slate-700/40 rounded-2xl overflow-hidden transition-colors duration-200",
        open ? "border-emerald-500/40 bg-slate-800/60" : "bg-slate-800/20 hover:bg-slate-800/40"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 cursor-pointer group"
      >
        <span className={cn("text-sm font-bold leading-snug transition-colors", open ? "text-white" : "text-slate-300 group-hover:text-white")}>
          {q}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300 text-emerald-400",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {/* Answer — height animation via max-height */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p className="px-5 pb-5 text-xs text-slate-400 font-medium leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 border-b border-slate-700/40"
      style={{ background: "linear-gradient(135deg, oklch(0.12 0.02 200) 0%, oklch(0.14 0.025 160) 100%)" }}
    >
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">Support</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Got questions about ANSH Visitor? Find quick answers below.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => (
            <FaqItem
              key={idx}
              q={faq.q}
              a={faq.a}
              open={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
