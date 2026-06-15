"use client";

import { useState } from "react";
import { useVisitorStore } from "@/stores/visitor-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/crm/page-header";
import { ShieldAlert, Save, Loader2 } from "lucide-react";

export default function ProfileSettingsPage() {
  const { currentUser } = useVisitorStore();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState("+91 98765 43210");
  const [dept, setDept] = useState(currentUser.department);
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
      <title>Profile Settings | Ansh Visitor</title>
      <PageHeader
        eyebrow="My Account"
        title="Profile Settings"
        description="View and update your personal employee details and host preferences."
      />

      <div className="max-w-xl mx-auto">
        <Card className="crm-card">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Host Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSave} className="space-y-5 text-slate-800 dark:text-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Host Role
                  </label>
                  <Input disabled value={currentUser.role} className="mt-2 bg-slate-50 dark:bg-slate-900/50" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Department
                  </label>
                  <Input value={dept} onChange={(e) => setDept(e.target.value)} className="mt-2" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Full Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Work Email Address
                </label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Phone Number (for SMS Alerts)
                </label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                {saved && (
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                    ✓ Profile saved successfully
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
                      Save Profile
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
