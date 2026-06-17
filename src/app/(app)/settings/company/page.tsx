"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/crm/page-header";
import { useVisitorStore, type OfficeBranchMeta } from "@/stores/visitor-store";
import { toast } from "@/components/ui/toast";
import {
  Plus,
  MapPin,
  Trash2,
  Building2,
  AlertTriangle,
  Home,
  Wifi,
  PencilLine,
  Save,
  ShieldAlert,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CompanyProfile = {
  name: string;
  address: string;
  employeeCount: string;
  industry: string;
  taxId: string;
  website: string;
  email: string;
  phone: string;
  legalName: string;
  entityType: string;
  incorporationDate: string;
  dunsNumber: string;
  fiscalYearStart: string;
  registeredAddress: string;
  sameAsHq: boolean;
};

const EDITABLE_ROLES = new Set([
  "Admin",
  "Manager",
  "Owner",
  "HR Manager",
  "HR",
]);

const EMPTY_BRANCH_FORM: Omit<OfficeBranchMeta, "name"> & { name: string } = {
  name: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  allowWfh: false,
};

const EMPTY_PROFILE: CompanyProfile = {
  name: "ANSH Apps Workspace",
  address: "",
  employeeCount: "",
  industry: "",
  taxId: "",
  website: "",
  email: "",
  phone: "",
  legalName: "",
  entityType: "",
  incorporationDate: "",
  dunsNumber: "",
  fiscalYearStart: "",
  registeredAddress: "",
  sameAsHq: true,
};

function renderValue(value: string | null | undefined) {
  return value?.trim() ? value : "Not set";
}

export default function CompanySettingsPage() {
  const { currentUser, hosts, workspaceName, officeBranches, officeBranchMeta, addOfficeBranch, deleteOfficeBranch } =
    useVisitorStore();

  const defaultAddress = officeBranches[0]
    ? officeBranchMeta[officeBranches[0]]?.address ?? ""
    : "";

  const [profile, setProfile] = useState<CompanyProfile>({
    ...EMPTY_PROFILE,
    name: workspaceName || EMPTY_PROFILE.name,
    address: defaultAddress,
    registeredAddress: defaultAddress,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [editDraft, setEditDraft] = useState<CompanyProfile>(profile);
  const [savingProfile, setSavingProfile] = useState(false);

  const [addBranchOpen, setAddBranchOpen] = useState(false);
  const [branchForm, setBranchForm] = useState(EMPTY_BRANCH_FORM);
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null);

  const canEdit = EDITABLE_ROLES.has(currentUser.role);

  const branchRows = useMemo(
    () =>
      officeBranches.map((branchName) => {
        const meta = officeBranchMeta[branchName];
        const teammateCount = hosts.filter((h) => h.officeBranch === branchName).length;
        return { branchName, meta, teammateCount };
      }),
    [officeBranches, officeBranchMeta, hosts]
  );

  const resetBranchForm = () => setBranchForm(EMPTY_BRANCH_FORM);

  const updateProfileDraft = <K extends keyof CompanyProfile>(
    key: K,
    value: CompanyProfile[K]
  ) => {
    setEditDraft((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "sameAsHq") {
        if (value) {
          next.registeredAddress = prev.address;
        } else {
          next.registeredAddress = "";
        }
      }
      if (key === "address" && prev.sameAsHq) {
        next.registeredAddress = String(value);
      }
      return next;
    });
  };

  const saveCompanyProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;

    const name = editDraft.name.trim();
    const address = editDraft.address.trim();
    const registeredAddress = editDraft.sameAsHq
      ? address
      : editDraft.registeredAddress.trim();

    if (!name || !address) {
      toast.error("Missing required fields", "Company name and HQ address are required.");
      return;
    }

    if (!editDraft.sameAsHq && !registeredAddress) {
      toast.error("Missing registered address", "Registered address is required when not same as HQ.");
      return;
    }

    setSavingProfile(true);
    setTimeout(() => {
      setProfile({
        ...editDraft,
        name,
        address,
        registeredAddress,
      });
      setSavingProfile(false);
      setEditOpen(false);
      toast.success("Company profile updated", "Company settings are saved.");
    }, 500);
  };

  const updateBranchField = <K extends keyof typeof branchForm>(
    key: K,
    value: (typeof branchForm)[K]
  ) => {
    setBranchForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegisterBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;

    const nextName = branchForm.name.trim();
    if (
      !nextName ||
      !branchForm.address.trim() ||
      !branchForm.city.trim() ||
      !branchForm.state.trim() ||
      !branchForm.pincode.trim()
    ) {
      toast.error("Missing required fields", "Please fill all required branch fields.");
      return;
    }

    if (officeBranches.includes(nextName)) {
      toast.error("Duplicate branch", "A branch with this name already exists.");
      return;
    }

    addOfficeBranch({
      name: nextName,
      address: branchForm.address.trim(),
      city: branchForm.city.trim(),
      state: branchForm.state.trim(),
      pincode: branchForm.pincode.trim(),
      allowWfh: branchForm.allowWfh,
    });

    resetBranchForm();
    setAddBranchOpen(false);
    toast.success("Branch added", `${nextName} is now available for team assignment.`);
  };

  const deleteSelectedBranch = () => {
    if (!branchToDelete) return;
    if (officeBranches.length <= 1) {
      toast.error("Cannot delete branch", "At least one office branch is required.");
      return;
    }

    deleteOfficeBranch(branchToDelete);
    toast.success("Branch removed", `${branchToDelete} has been deleted.`);
    setBranchToDelete(null);
  };

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>Company Settings | Ansh Visitor</title>
      <PageHeader
        eyebrow="Organization Settings"
        title="Company Settings"
        description="Review company details and manage office branches."
      />

      <Card className="crm-card">
        <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/40 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-base sm:text-lg">Company Profile</CardTitle>
            <p className="text-xs text-muted-foreground">
              View company details, compliance info, contacts and addresses.
            </p>
          </div>
          {canEdit ? (
            <Button
              type="button"
              className="rounded-full gap-2"
              onClick={() => {
                setEditDraft(profile);
                setEditOpen(true);
              }}
            >
              <PencilLine className="h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
              <ShieldAlert className="h-3.5 w-3.5" />
              View only for your role ({currentUser.role})
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-border/60 p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Basic Details
              </p>
              <p className="mt-2 text-sm font-semibold">{renderValue(profile.name)}</p>
              <p className="text-xs text-muted-foreground">Legal: {renderValue(profile.legalName)}</p>
              <p className="text-xs text-muted-foreground">Entity: {renderValue(profile.entityType)}</p>
              <p className="text-xs text-muted-foreground">Industry: {renderValue(profile.industry)}</p>
              <p className="text-xs text-muted-foreground">
                Employee Size: {renderValue(profile.employeeCount)}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Compliance
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Tax ID: {renderValue(profile.taxId)}</p>
              <p className="text-xs text-muted-foreground">DUNS: {renderValue(profile.dunsNumber)}</p>
              <p className="text-xs text-muted-foreground">
                Incorporation: {renderValue(profile.incorporationDate)}
              </p>
              <p className="text-xs text-muted-foreground">
                Fiscal Year Start: {renderValue(profile.fiscalYearStart)}
              </p>
            </div>

            <div className="rounded-xl border border-border/60 p-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Contact
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Website: {renderValue(profile.website)}</p>
              <p className="text-xs text-muted-foreground">Email: {renderValue(profile.email)}</p>
              <p className="text-xs text-muted-foreground">Phone: {renderValue(profile.phone)}</p>
            </div>

            <div className="rounded-xl border border-border/60 p-4 md:col-span-2 xl:col-span-3">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Locations</p>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                HQ Address: {renderValue(profile.address)}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-200">
                Registered Address:{" "}
                {profile.sameAsHq ? "Same as HQ" : renderValue(profile.registeredAddress)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="crm-card">
        <CardHeader className="border-b border-border/40 pb-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-4 w-4" />
              </span>
              <div>
                <CardTitle className="text-sm font-semibold">Office Branches</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {officeBranches.length} branch{officeBranches.length === 1 ? "" : "es"} configured
                </p>
              </div>
            </div>
            {canEdit && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full gap-1.5"
                onClick={() => {
                  resetBranchForm();
                  setAddBranchOpen(true);
                }}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Branch
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="space-y-3">
            {branchRows.map(({ branchName, meta, teammateCount }) => (
              <div
                key={branchName}
                className="group rounded-2xl border border-border/60 bg-white dark:bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-semibold truncate">{branchName}</p>
                      <p className="text-xs text-muted-foreground">
                        {renderValue(meta?.address)} · {renderValue(meta?.city)} {renderValue(meta?.state)}{" "}
                        {renderValue(meta?.pincode)}
                      </p>
                      <div className="flex items-center gap-2">
                        {meta?.allowWfh && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                            <Wifi className="h-3 w-3" />
                            WFH Allowed
                          </span>
                        )}
                        <span className="text-[11px] text-muted-foreground">
                          {teammateCount} teammate{teammateCount === 1 ? "" : "s"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => setBranchToDelete(branchName)}
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/30"
                      title="Delete branch"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) setEditDraft(profile);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[760px]">
          <form onSubmit={saveCompanyProfile} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Edit Company Profile</DialogTitle>
              <DialogDescription>
                Update company details used across your workspace.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={editDraft.name}
                  onChange={(e) => updateProfileDraft("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Legal Name</label>
                <Input
                  value={editDraft.legalName}
                  onChange={(e) => updateProfileDraft("legalName", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Entity Type</label>
                <Input
                  value={editDraft.entityType}
                  onChange={(e) => updateProfileDraft("entityType", e.target.value)}
                  placeholder="Private Limited"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Industry</label>
                <Input
                  value={editDraft.industry}
                  onChange={(e) => updateProfileDraft("industry", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Employee Size</label>
                <Input
                  value={editDraft.employeeCount}
                  onChange={(e) => updateProfileDraft("employeeCount", e.target.value)}
                  placeholder="1-10"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Tax ID</label>
                <Input
                  value={editDraft.taxId}
                  onChange={(e) => updateProfileDraft("taxId", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">DUNS Number</label>
                <Input
                  value={editDraft.dunsNumber}
                  onChange={(e) => updateProfileDraft("dunsNumber", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Incorporation Date</label>
                <Input
                  type="date"
                  value={editDraft.incorporationDate}
                  onChange={(e) => updateProfileDraft("incorporationDate", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Fiscal Year Start</label>
                <Input
                  value={editDraft.fiscalYearStart}
                  onChange={(e) => updateProfileDraft("fiscalYearStart", e.target.value)}
                  placeholder="April"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Website</label>
                <Input
                  value={editDraft.website}
                  onChange={(e) => updateProfileDraft("website", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Email</label>
                <Input
                  type="email"
                  value={editDraft.email}
                  onChange={(e) => updateProfileDraft("email", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold">Phone</label>
                <Input
                  value={editDraft.phone}
                  onChange={(e) => updateProfileDraft("phone", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold">
                HQ Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={editDraft.address}
                onChange={(e) => updateProfileDraft("address", e.target.value)}
                rows={3}
                required
                className={cn(
                  "w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm outline-none",
                  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  "dark:bg-input/30 resize-none"
                )}
              />
            </div>

            <div className="space-y-3 rounded-xl border border-border/60 p-3">
              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={editDraft.sameAsHq}
                  onChange={(e) => updateProfileDraft("sameAsHq", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                Registered address same as HQ
              </label>
              {!editDraft.sameAsHq && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold">
                    Registered Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    value={editDraft.registeredAddress}
                    onChange={(e) => updateProfileDraft("registeredAddress", e.target.value)}
                    rows={3}
                    required={!editDraft.sameAsHq}
                    className={cn(
                      "w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-2.5 text-sm outline-none",
                      "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                      "dark:bg-input/30 resize-none"
                    )}
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={savingProfile} className="gap-2">
                <Save className="h-4 w-4" />
                {savingProfile ? "Saving..." : "Save Profile"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                    Add Office Branch
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Add branch details and decide whether WFH is allowed.
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
                  placeholder="e.g. Mumbai HQ"
                  className="h-10 rounded-xl border-border/60"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  Address <span className="text-primary">*</span>
                </label>
                <textarea
                  value={branchForm.address}
                  onChange={(e) => updateBranchField("address", e.target.value)}
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
                  Allow WFH for teammates in this branch
                </span>
              </label>
            </div>

            <DialogFooter className="px-6 py-4 border-t border-border/50 bg-slate-50/50 dark:bg-slate-900/30 gap-2 sm:gap-3">
              <Button type="button" variant="outline" onClick={() => setAddBranchOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-primary border-0">
                Save Branch
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
              from office branches.
              <br />
              <br />
              At least one branch must remain active.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2">
            <Button variant="outline" type="button" onClick={() => setBranchToDelete(null)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={deleteSelectedBranch} className="gap-2">
              <Trash2 className="h-4 w-4" />
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
