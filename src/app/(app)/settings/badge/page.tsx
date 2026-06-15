"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/crm/page-header";
import { QrCode, Printer, Save, RefreshCw } from "lucide-react";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

export default function BadgeCustomizerPage() {
  const [badgeTitle, setBadgeTitle] = useState("VISITOR PASS");
  const [showQr, setShowQr] = useState(true);
  const [showHost, setShowHost] = useState(true);
  const [showCompany, setShowCompany] = useState(true);
  const [showPurpose, setShowPurpose] = useState(true);
  const [badgeColor, setBadgeColor] = useState("emerald");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const colors = [
    { id: "emerald", label: "Emerald Green", swatch: "#10b981", text: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { id: "indigo", label: "Electric Indigo", swatch: "#6366f1", text: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    { id: "sapphire", label: "Sapphire Blue", swatch: "#0ea5e9", text: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
    { id: "graphite", label: "Modern Graphite", swatch: "#1e293b", text: "text-slate-800 dark:text-slate-200", bg: "bg-slate-100 dark:bg-slate-850", border: "border-slate-300 dark:border-slate-800" },
  ];

  const selectedColor = colors.find((c) => c.id === badgeColor) || colors[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Badge Customizer | Ansh Visitor</title>
      <PageHeader
        eyebrow="Badge Templates"
        title="Badge Customizer"
        description="Design the layout, text fields, and color theme printed on visitor entry passes."
      />

      <div className="grid gap-8 lg:grid-cols-5">
        {/* CUSTOMIZER OPTIONS */}
        <Card className="crm-card lg:col-span-2">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Badge Fields & Layout
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSave} className="space-y-6 text-slate-800 dark:text-slate-100">
              {/* Badge Text */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Pass Header Title
                </label>
                <Input value={badgeTitle} onChange={(e) => setBadgeTitle(e.target.value)} className="mt-2" />
              </div>

              {/* Toggles */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Toggle Print Information
                </span>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showQr}
                      onChange={(e) => setShowQr(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>Show Guest check-in QR Code</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCompany}
                      onChange={(e) => setShowCompany(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>Show Guest company name</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showHost}
                      onChange={(e) => setShowHost(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>Show Host employee name</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPurpose}
                      onChange={(e) => setShowPurpose(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>Show Purpose of visit</span>
                  </label>
                </div>
              </div>

              {/* Accent Color picker */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Badge Accent Color
                </span>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setBadgeColor(c.id)}
                      className={cn(
                        "h-8 w-8 rounded-lg shadow-inner ring-1 ring-black/5 flex items-center justify-center transition-all cursor-pointer hover:scale-105",
                        badgeColor === c.id ? "ring-2 ring-emerald-500 border border-white" : ""
                      )}
                      style={{ backgroundColor: c.swatch }}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-border/40 pt-4">
                {saved && (
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                    ✓ Badge saved
                  </span>
                )}
                <Button type="submit" disabled={saving} className="btn-primary border-0 gap-2 cursor-pointer">
                  {saving ? (
                    <ButtonLoadingSkeleton />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Template
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* LIVE PREVIEW COMPONENT */}
        <Card className="crm-card lg:col-span-3 flex flex-col items-center bg-slate-50/50 dark:bg-slate-900/10 py-10">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Badge Print Preview (Real-time)
            </CardTitle>
          </CardHeader>
          
          {/* Lanyard Strap Frame Mock */}
          <div className="flex flex-col items-center select-none group">
            {/* Lanyard Strap Loop */}
            <div className="h-16 w-8 bg-slate-800 rounded-b-xl border border-slate-700 shadow-inner group-hover:scale-y-105 transition-transform" />
            <div className="h-4 w-5 bg-slate-600 rounded-md border border-slate-500 z-10 -mt-1 shadow" />
            
            {/* Badge Card Wrapper */}
            <div className="printable-pass w-64 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl z-20 dark:border-slate-800 dark:bg-slate-950/90 text-slate-800 dark:text-slate-100 flex flex-col items-center text-center">
              {/* Badge Custom Title */}
              <h3 className={cn("text-xs font-black tracking-widest uppercase border-b border-border/60 pb-2.5 w-full", selectedColor.text)}>
                {badgeTitle}
              </h3>

              {/* QR Mock */}
              {showQr && (
                <div className={cn("mt-6 h-36 w-36 rounded-xl border flex items-center justify-center bg-white", selectedColor.border)}>
                  <QRCodeSVG
                    value="PASSCODE-837194"
                    size={96}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="M"
                  />
                </div>
              )}

              {/* Guest Details */}
              <div className="mt-6 space-y-1">
                <span className="block font-black text-slate-900 dark:text-white text-base">
                  Aarav Mehta
                </span>
                {showCompany && (
                  <span className="block text-xs text-slate-400">
                    Acme Corp
                  </span>
                )}
              </div>

              {/* Metadata */}
              <div className="mt-6 w-full space-y-1 text-[11px] text-slate-450 border-t border-border/40 pt-4 font-semibold">
                {showHost && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Host</span>
                    <span className="text-slate-700 dark:text-slate-350">Vikram Raj</span>
                  </div>
                )}
                {showPurpose && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Purpose</span>
                    <span className="text-slate-700 dark:text-slate-350">Meeting</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-400">Date</span>
                  <span className="text-slate-700 dark:text-slate-350">
                    {new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button className="btn-primary border-0 gap-2 cursor-pointer" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print Test Badge
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
