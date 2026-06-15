"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/crm/page-header";
import {
  useVisitorStore,
  type OfficeBranchMeta,
} from "@/stores/visitor-store";
import {
  Save,
  Plus,
  MapPin,
  Trash2,
  Building2,
  AlertTriangle,
  Home,
  Wifi,
} from "lucide-react";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const EMPTY_BRANCH_FORM: Omit<OfficeBranchMeta, "name"> & { name: string } = {
  name: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  allowWfh: false,
};

export default function CompanySettingsPage() {
  const [compName, setCompName] = useState("ANSH Apps Workspace");
  const [address, setAddress] = useState(
    "Sector 62, Electronic City, Noida, Uttar Pradesh, India"
  );
  const [requireId, setRequireId] = useState(true);
  const [requireApproval, setRequireApproval] = useState(false);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    officeBranches,
    officeBranchMeta,
    addOfficeBranch,
    deleteOfficeBranch,
  } = useVisitorStore();

  const [addBranchOpen, setAddBranchOpen] = useState(false);
  const [branchForm, setBranchForm] = useState(EMPTY_BRANCH_FORM);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  const resetBranchForm = () => setBranchForm(EMPTY_BRANCH_FORM);

  const handleRegisterBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchForm.name.trim() || !branchForm.address.trim()) return;
    if (!branchForm.city.trim() || !branchForm.state.trim() || !branchForm.pincode.trim())
      return;

    addOfficeBranch({
      name: branchForm.name.trim(),
      address: branchForm.address.trim(),
      city: branchForm.city.trim(),
      state: branchForm.state.trim(),
      pincode: branchForm.pincode.trim(),
      allowWfh: branchForm.allowWfh,
    });
    resetBranchForm();
    setAddBranchOpen(false);
  };

  const updateBranchField = <K extends keyof typeof branchForm>(
    key: K,
    value: (typeof branchForm)[K]
  ) => {
    setBranchForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Company Settings | Ansh Visitor</title>
      <PageHeader
        eyebrow="Organization Settings"
        title="Company Settings"
        description="Configure your organization's legal identity, headquarters address, and office branches parameter registries."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ── LEFT: OFFICE BRANCHES SIDEBAR ── */}
        <Card className="crm-card lg:col-span-2 flex flex-col h-fit lg:sticky lg:top-6">
          <CardHeader className="border-b border-border/40 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-primary">
                    Office Branches
                  </CardTitle>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {officeBranches.length} location
                    {officeBranches.length !== 1 ? "s" : ""} registered
                  </p>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 text-xs gap-1.5 cursor-pointer rounded-full font-semibold border-border/60 shrink-0"
                onClick={() => {
                  resetBranchForm();
                  setAddBranchOpen(true);
                }}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Branch
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-4 pb-5 flex flex-col gap-2.5">
            {officeBranches.length > 0 ? (
              <div className="space-y-2.5">
                {officeBranches.map((branch) => {
                  const meta = officeBranchMeta[branch];
                  const location =
                    meta?.city && meta?.state
                      ? `${meta.city}, ${meta.state}`
                      : meta?.city || meta?.state || null;

                  return (
                    <div
                      key={branch}
                      className="group relative border border-border/50 rounded-2xl p-4 bg-white dark:bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-200 animate-in fade-in zoom-in-95"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/60 text-primary">
                            <MapPin className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 space-y-1">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate pr-2">
                              {branch}
                            </p>
                            {location && (
                              <p className="text-[11px] text-muted-foreground truncate">
                                {location}
                                {meta?.pincode ? ` · ${meta.pincode}` : ""}
                              </p>
                            )}
                            {meta?.address && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {meta.address}
                              </p>
                            )}
                            {meta?.allowWfh && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                                <Wifi className="h-3 w-3" />
                                WFH Allowed
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setBranchToDelete(branch)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 cursor-pointer p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all shrink-0"
                          title="Delete Branch"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-slate-300 dark:text-slate-600 mb-4">
                  <Building2 className="h-7 w-7" />
                </span>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  No branches yet
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                  Register your first office location to assign teammates and
                  visitors.
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="mt-5 rounded-full text-xs gap-1.5 cursor-pointer"
                  onClick={() => {
                    resetBranchForm();
                    setAddBranchOpen(true);
                  }}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Branch
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── RIGHT: WORKSPACE CONFIG ── */}
        <Card className="crm-card lg:col-span-3">
          <CardHeader className="border-b border-border/40 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-4 w-4" />
              </span>
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-primary">
                Workspace Identity
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form
              onSubmit={handleSave}
              className="space-y-5 text-slate-800 dark:text-slate-100"
            >
              <div className="rounded-2xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                  Organization Name
                </label>
                <Input
                  value={compName}
                  onChange={(e) => setCompName(e.target.value)}
                  className="bg-white dark:bg-card border-border/60"
                />
              </div>

              <div className="rounded-2xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                  Lobby Office Address
                </label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-white dark:bg-card border-border/60"
                />
              </div>

              <div className="rounded-2xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4 space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-primary">
                  Check-in Entry Protocols
                </span>
                <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireId}
                    onChange={(e) => setRequireId(e.target.checked)}
                    className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span>
                    Require photo ID Proof selection for all walk-in
                    registrations
                  </span>
                </label>
                <label className="flex items-center gap-3 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireApproval}
                    onChange={(e) => setRequireApproval(e.target.checked)}
                    className="rounded border-slate-350 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span>
                    Hold entry pass check-in until host approves via lobby SMS
                    alert
                  </span>
                </label>
              </div>

              <div className="rounded-2xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4 space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-primary">
                  Arrival Alert Channels
                </span>
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
                  <span>
                    Email notifications to host with guest pass details
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                {saved && (
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                    ✓ Settings updated
                  </span>
                )}
                <Button
                  type="submit"
                  disabled={saving}
                  className="btn-primary border-0 gap-2 cursor-pointer rounded-full"
                >
                  {saving ? (
                    <ButtonLoadingSkeleton />
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
      </div>

      {/* ── REGISTER BRANCH MODAL ── */}
      <Dialog
        open={addBranchOpen}
        onOpenChange={(open) => {
          setAddBranchOpen(open);
          if (!open) resetBranchForm();
        }}
      >
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden rounded-2xl">
          <form onSubmit={handleRegisterBranch}>
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50 space-y-0">
              <div className="flex items-start gap-3 pr-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Home className="h-5 w-5" />
                </span>
                <div>
                  <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
                    Register Office Branch
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Configure a physical office location parameters for
                    attendance checks.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  Branch Name <span className="text-primary">*</span>
                </label>
                <Input
                  value={branchForm.name}
                  onChange={(e) => updateBranchField("name", e.target.value)}
                  placeholder="e.g. Mumbai HQ, Bengaluru Tech Park"
                  className="h-10 rounded-xl border-border/60"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  Detailed Address <span className="text-primary">*</span>
                </label>
                <textarea
                  value={branchForm.address}
                  onChange={(e) => updateBranchField("address", e.target.value)}
                  placeholder="Full address of the branch..."
                  rows={3}
                  required
                  className={cn(
                    "w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm transition-colors outline-none",
                    "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "dark:bg-input/30 resize-none"
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                    City <span className="text-primary">*</span>
                  </label>
                  <Input
                    value={branchForm.city}
                    onChange={(e) => updateBranchField("city", e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="h-10 rounded-xl border-border/60"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                    State <span className="text-primary">*</span>
                  </label>
                  <Input
                    value={branchForm.state}
                    onChange={(e) => updateBranchField("state", e.target.value)}
                    placeholder="e.g. Maharashtra"
                    className="h-10 rounded-xl border-border/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  Pincode <span className="text-primary">*</span>
                </label>
                <Input
                  value={branchForm.pincode}
                  onChange={(e) => updateBranchField("pincode", e.target.value)}
                  placeholder="e.g. 400001"
                  className="h-10 rounded-xl border-border/60"
                  required
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={branchForm.allowWfh}
                  onChange={(e) => updateBranchField("allowWfh", e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
                  Allow WFH (Work From Home) for teammates at this branch
                </span>
              </label>
            </div>

            <DialogFooter className="px-6 py-4 border-t border-border/50 bg-slate-50/50 dark:bg-slate-900/30 gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetBranchForm();
                  setAddBranchOpen(false);
                }}
                className="rounded-full h-10 px-6 font-semibold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn-primary border-0 rounded-full h-10 px-6 font-semibold cursor-pointer"
              >
                Register Branch
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── DELETE CONFIRMATION ── */}
      <Dialog
        open={branchToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setBranchToDelete(null);
        }}
      >
        <DialogContent className="sm:max-w-[420px]" showCloseButton={false}>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <DialogTitle className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                Delete Branch?
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
              You are about to remove{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                &ldquo;{branchToDelete}&rdquo;
              </span>{" "}
              from the office branches list.
              <br />
              <br />
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                ⚠ Visitors and team members mapped to this branch will need to
                be manually reassigned.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setBranchToDelete(null)}
              className="w-full sm:w-28 h-10 text-sm font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (branchToDelete) deleteOfficeBranch(branchToDelete);
                setBranchToDelete(null);
              }}
              className="w-full sm:w-36 h-10 text-sm font-semibold cursor-pointer gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
