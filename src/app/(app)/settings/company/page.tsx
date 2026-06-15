"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/crm/page-header";
import { Save, Loader2, Building, MessageSquareCode } from "lucide-react";

export default function CompanySettingsPage() {
  const [compName, setCompName] = useState("ANSH Apps Workspace");
  const [address, setAddress] = useState("Sector 62, Electronic City, Noida, Uttar Pradesh, India");
  const [requireId, setRequireId] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      <title>Company Settings | Ansh Visitor</title>
      <PageHeader
        eyebrow="Workspace Configuration"
        title="Company Settings"
        description="Configure your workspace branding, lobby check-in compliance, and visitor notifications."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* CONFIG FORM */}
        <Card className="crm-card lg:col-span-3">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Workspace Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSave} className="space-y-5 text-slate-800 dark:text-slate-100">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Organization Name
                </label>
                <Input value={compName} onChange={(e) => setCompName(e.target.value)} className="mt-2" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Lobby Office Address
                </label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2" />
              </div>

              {/* PROTOCOLS */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Check-in Entry Protocols
                </span>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requireId}
                      onChange={(e) => setRequireId(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>Require photo ID Proof selection for all walk-in registrations</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requireApproval}
                      onChange={(e) => setRequireApproval(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>Hold entry pass check-in until host approves via lobby SMS alert</span>
                  </label>
                </div>
              </div>

              {/* NOTIFICATION CHANNELS */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Arrival Alert Channels
                </span>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendWhatsApp}
                      onChange={(e) => setSendWhatsApp(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>WhatsApp / SMS host ping upon visitor check-in</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>Email notifications to host with guest pass details</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                {saved && (
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                    ✓ Settings updated
                  </span>
                )}
                <Button type="submit" disabled={saving} className="btn-primary border-0 gap-2 cursor-pointer">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Configuration
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* INTEGRATIONS INFO */}
        <Card className="crm-card lg:col-span-2">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Integrations Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <div className="space-y-2 pb-4 border-b border-border/40">
              <h4 className="font-bold text-slate-700 dark:text-slate-300">ANSH HR Sync</h4>
              <p>Hosts database is automatically synchronized from your active employee payroll directory.</p>
            </div>
            <div className="space-y-2 pb-4 border-b border-border/40">
              <h4 className="font-bold text-slate-700 dark:text-slate-300">ANSH CRM pipeline</h4>
              <p>Walk-in clients and business vendor logs are auto-pushed as prospective leads into your pipeline.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-700 dark:text-slate-300">ANSH Tasks automation</h4>
              <p>Automatically triggers follow-up meeting tasks for hosts upon visitor check-out logs.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
