"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/crm/page-header";
import { ProFeatureGate } from "@/components/billing/pro-feature-gate";
import { useVisitorStore } from "@/stores/visitor-store";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { REGISTRATION_DESIGN_THEMES, type RegistrationDesignTheme } from "@/config/registration-link-designs";
import { ThemePreviewThumbnail } from "@/components/public/registration-theme-shell";
import {
  DEFAULT_REGISTRATION_FIELD_CONFIG,
  type RegistrationFieldConfig,
} from "@/lib/registration-link-fields";
import { PublicRegistrationForm } from "@/components/public/public-registration-form";
import { QR_VALIDITY_OPTIONS, type QrValidityPeriod } from "@/lib/qr-validity";
import { Select } from "@/components/ui/select";
import { Copy, ExternalLink, Link2, Save } from "lucide-react";
import { ButtonLoadingSkeleton, MyLinkPageSkeleton } from "@/components/ui/page-skeletons";
import {
  DeskLinkQrButton,
  DeskLinkQrModal,
} from "@/components/public/desk-link-qr-modal";

interface SavedLink {
  id: string;
  slug: string;
  enabled: boolean;
  designTheme: string;
  pageTitle: string | null;
  welcomeMessage: string | null;
  officeBranch: string;
  qrValidityPeriod: string;
  fieldNameRequired: boolean;
  fieldPhoneRequired: boolean;
  fieldEmailRequired: boolean;
  fieldPurposeRequired: boolean;
  fieldIdProofRequired: boolean;
  fieldCompanyEnabled: boolean;
  fieldCompanyRequired: boolean;
  fieldNotesEnabled: boolean;
  fieldNotesRequired: boolean;
}

function fieldConfigFromState(state: RegistrationFieldConfig) {
  return {
    fieldNameRequired: state.nameRequired,
    fieldPhoneRequired: state.phoneRequired,
    fieldEmailRequired: state.emailRequired,
    fieldPurposeRequired: state.purposeRequired,
    fieldIdProofRequired: state.idProofRequired,
    fieldCompanyEnabled: state.companyEnabled,
    fieldCompanyRequired: state.companyRequired,
    fieldNotesEnabled: state.notesEnabled,
    fieldNotesRequired: state.notesRequired,
  };
}

function fieldStateFromLink(link: SavedLink): RegistrationFieldConfig {
  return {
    nameRequired: link.fieldNameRequired,
    phoneRequired: link.fieldPhoneRequired,
    emailRequired: link.fieldEmailRequired,
    purposeRequired: link.fieldPurposeRequired,
    idProofRequired: link.fieldIdProofRequired,
    companyEnabled: link.fieldCompanyEnabled,
    companyRequired: link.fieldCompanyRequired,
    notesEnabled: link.fieldNotesEnabled,
    notesRequired: link.fieldNotesRequired,
  };
}

export default function MyLinkPage() {
  const { currentUser, hosts } = useVisitorStore();
  const wid = currentUser.wid ?? 1;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Workspace");
  const [hostBranch, setHostBranch] = useState(currentUser.officeBranch ?? "Main Office");
  const [slug, setSlug] = useState("");
  const [suggestedSlug, setSuggestedSlug] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [designTheme, setDesignTheme] = useState<RegistrationDesignTheme>("classic");
  const [pageTitle, setPageTitle] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [officeBranch, setOfficeBranch] = useState(currentUser.officeBranch ?? "Main Office");
  const [qrValidityPeriod, setQrValidityPeriod] = useState<QrValidityPeriod>("24h");
  const [fieldConfig, setFieldConfig] = useState<RegistrationFieldConfig>(
    DEFAULT_REGISTRATION_FIELD_CONFIG
  );
  const [deskQrOpen, setDeskQrOpen] = useState(false);

  const displaySlug = slug || suggestedSlug;

  const publicUrl = useMemo(() => {
    if (typeof window === "undefined" || !displaySlug) return "";
    return `${window.location.origin}/register/${displaySlug}`;
  }, [displaySlug]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/registration-links?wid=${wid}&hostId=${encodeURIComponent(currentUser.id)}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load link");

        if (cancelled) return;

        setWorkspaceName(data.workspaceName ?? "Workspace");
        setHostBranch(data.hostBranch ?? currentUser.officeBranch ?? "Main Office");
        setSuggestedSlug(data.suggestedSlug ?? "");
        setOfficeBranch(data.hostBranch ?? currentUser.officeBranch ?? "Main Office");

        if (data.link) {
          const link = data.link as SavedLink;
          setSlug(link.slug);
          setEnabled(link.enabled);
          setDesignTheme(link.designTheme as RegistrationDesignTheme);
          setPageTitle(link.pageTitle ?? "");
          setWelcomeMessage(link.welcomeMessage ?? "");
          setOfficeBranch(link.officeBranch);
          setQrValidityPeriod(link.qrValidityPeriod as QrValidityPeriod);
          setFieldConfig(fieldStateFromLink(link));
        } else {
          setSlug(data.suggestedSlug ?? "");
        }
      } catch (err) {
        if (!cancelled) {
          toast.error(err instanceof Error ? err.message : "Failed to load My Link settings");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [wid, currentUser.id, currentUser.officeBranch]);

  const previewEmployees = useMemo(
    () =>
      hosts
        .filter((h) => h.status === "Active")
        .map((h) => ({
          id: h.id,
          name: h.name,
          email: h.email,
          phone: h.phone,
        })),
    [hosts]
  );

  const previewData = useMemo(
    () => ({
      slug: displaySlug || "preview",
      designTheme,
      pageTitle: pageTitle || `Visit ${workspaceName}`,
      welcomeMessage:
        welcomeMessage ||
        `Pre-register your visit at ${officeBranch}. Host: ${currentUser.name}`,
      officeBranch,
      fieldConfig,
      hostName: currentUser.name,
      hostDepartment: currentUser.department,
      workspaceName,
      employees: previewEmployees,
    }),
    [
      displaySlug,
      designTheme,
      pageTitle,
      welcomeMessage,
      officeBranch,
      fieldConfig,
      currentUser.name,
      currentUser.department,
      workspaceName,
      previewEmployees,
    ]
  );

  const updateField = <K extends keyof RegistrationFieldConfig>(
    key: K,
    value: RegistrationFieldConfig[K]
  ) => {
    setFieldConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/registration-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wid,
          hostId: currentUser.id,
          officeBranch,
          enabled,
          designTheme,
          pageTitle,
          welcomeMessage,
          qrValidityPeriod,
          ...fieldConfigFromState(fieldConfig),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.proRequired) {
          throw new Error("Upgrade to Pro to save your public registration link.");
        }
        throw new Error(data.error || "Failed to save link");
      }
      setSlug(data.link.slug);
      toast.success("My Link saved successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save link");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    toast.success("Public link copied");
  };

  if (loading) {
    return (
      <>
        <title>My Link | Ansh Visitor</title>
        <MyLinkPageSkeleton />
      </>
    );
  }

  return (
    <div className="space-y-8 select-none animate-in fade-in duration-300">
      <title>My Link | Ansh Visitor</title>
      <PageHeader
        eyebrow="Visitors Log"
        title="My Link"
        description="Create a branded public pre-registration page with a unique company + branch slug. Available on Pro."
      />

      <ProFeatureGate
        title="Unlock My Link"
        description="Upgrade to Pro to create a shareable public pre-registration page with custom branding, slug, and field rules for your workspace."
      >
      <div className="grid gap-8 xl:grid-cols-2">
        <Card className="crm-card">
          <CardHeader className="border-b border-border/40 pb-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Link & Form Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="rounded-2xl border border-sky-200/60 bg-sky-50/60 p-4 dark:border-sky-900/40 dark:bg-sky-950/20">
                <div className="flex items-start gap-3">
                  <Link2 className="mt-0.5 h-4 w-4 text-sky-600" />
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-sky-700 dark:text-sky-300">
                        Public URL Slug
                      </p>
                      <p className="mt-2 rounded-lg border border-sky-200/80 bg-white px-3 py-2.5 font-mono text-sm text-slate-800 dark:border-sky-900/50 dark:bg-slate-950/40 dark:text-slate-100">
                        {displaySlug || "Generating..."}
                      </p>
                      {publicUrl && (
                        <p className="mt-2 break-all text-xs text-slate-500">{publicUrl}</p>
                      )}
                      <p className="mt-2 text-xs text-slate-500">
                        Auto-generated from {workspaceName} + {hostBranch}. Cannot be edited.
                      </p>
                    </div>
                    {publicUrl && (
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </Button>
                        <a
                          href={publicUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-8 items-center rounded-lg border border-input bg-background px-3 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-900"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Public Page
                        </a>
                        <DeskLinkQrButton
                          onClick={() => setDeskQrOpen(true)}
                          disabled={!displaySlug}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {publicUrl && (
                <DeskLinkQrModal
                  open={deskQrOpen}
                  onOpenChange={setDeskQrOpen}
                  publicUrl={publicUrl}
                  workspaceName={workspaceName}
                  officeBranch={officeBranch}
                  slug={displaySlug}
                />
              )}

              <label className="flex items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                Link is active and accepting pre-registrations
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Page Title
                  </label>
                  <Input
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    placeholder={`Visit ${workspaceName}`}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Office Branch
                  </label>
                  <Input
                    value={officeBranch}
                    onChange={(e) => setOfficeBranch(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Welcome Message
                </label>
                <textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="mt-2 min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                  placeholder={`Pre-register your visit at ${officeBranch}`}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  QR Pass Validity
                </label>
                <Select
                  value={qrValidityPeriod}
                  onChange={(e) => setQrValidityPeriod(e.target.value as QrValidityPeriod)}
                  className="mt-2"
                >
                  {QR_VALIDITY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Page Design Theme
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {REGISTRATION_DESIGN_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setDesignTheme(theme.id)}
                      className={cn(
                        "rounded-2xl border p-3 text-left transition-all",
                        designTheme === theme.id
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-slate-300"
                      )}
                    >
                      <ThemePreviewThumbnail themeId={theme.id} />
                      <p className="mt-2 text-sm font-bold">{theme.label}</p>
                      <p className="text-xs text-slate-500">{theme.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Field Requirements
                </p>
                <div className="space-y-3 rounded-2xl border border-border/60 p-4">
                  {[
                    { key: "nameRequired" as const, label: "Full Name", canDisable: true },
                    { key: "phoneRequired" as const, label: "Phone Number", canDisable: true },
                    { key: "emailRequired" as const, label: "Email", canDisable: true },
                    { key: "purposeRequired" as const, label: "Visit Purpose", canDisable: true },
                    { key: "idProofRequired" as const, label: "Government ID", canDisable: true },
                  ].map((field) => (
                    <label key={field.key} className="flex items-center justify-between gap-3 text-sm font-medium">
                      <span>{field.label}</span>
                      <input
                        type="checkbox"
                        checked={fieldConfig[field.key]}
                        disabled={!field.canDisable}
                        onChange={(e) => updateField(field.key, e.target.checked)}
                        className="h-4 w-4 rounded"
                      />
                    </label>
                  ))}

                  <div className="border-t border-border/50 pt-3">
                    <label className="flex items-center justify-between gap-3 text-sm font-medium">
                      <span>Show Company field</span>
                      <input
                        type="checkbox"
                        checked={fieldConfig.companyEnabled}
                        onChange={(e) => updateField("companyEnabled", e.target.checked)}
                        className="h-4 w-4 rounded"
                      />
                    </label>
                    {fieldConfig.companyEnabled && (
                      <label className="mt-2 flex items-center justify-between gap-3 text-sm font-medium">
                        <span>Company required</span>
                        <input
                          type="checkbox"
                          checked={fieldConfig.companyRequired}
                          onChange={(e) => updateField("companyRequired", e.target.checked)}
                          className="h-4 w-4 rounded"
                        />
                      </label>
                    )}
                  </div>

                  <div className="border-t border-border/50 pt-3">
                    <label className="flex items-center justify-between gap-3 text-sm font-medium">
                      <span>Show Notes field</span>
                      <input
                        type="checkbox"
                        checked={fieldConfig.notesEnabled}
                        onChange={(e) => updateField("notesEnabled", e.target.checked)}
                        className="h-4 w-4 rounded"
                      />
                    </label>
                    {fieldConfig.notesEnabled && (
                      <label className="mt-2 flex items-center justify-between gap-3 text-sm font-medium">
                        <span>Notes required</span>
                        <input
                          type="checkbox"
                          checked={fieldConfig.notesRequired}
                          onChange={(e) => updateField("notesRequired", e.target.checked)}
                          className="h-4 w-4 rounded"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={saving} className="btn-primary h-11 border-0">
                {saving ? (
                  <ButtonLoadingSkeleton />
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save My Link
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-3xl border border-border/60">
          <div className="border-b border-border/50 bg-slate-50 px-4 py-3 dark:bg-slate-900/50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Live Preview
            </p>
          </div>
          <div className="max-h-[820px] overflow-y-auto">
            <PublicRegistrationForm pageData={previewData} preview />
          </div>
        </div>
      </div>
      </ProFeatureGate>
    </div>
  );
}
