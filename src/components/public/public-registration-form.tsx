"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getRegistrationDesignTheme,
  type RegistrationDesignTheme,
} from "@/config/registration-link-designs";
import { formatQrValidUntil } from "@/lib/qr-validity";
import { QRCodeSVG } from "qrcode.react";
import { PartyPopper, Printer } from "lucide-react";
import {
  RegistrationFormFields,
  type RegistrationFormValues,
} from "@/components/public/registration-form-fields";
import { RegistrationThemeShell } from "@/components/public/registration-theme-shell";
import {
  applyEmployeeSelection,
  type EmployeeOption,
} from "@/components/crm/employee-registration-fields";

export interface PublicRegistrationPageData {
  slug: string;
  designTheme: RegistrationDesignTheme | string;
  pageTitle?: string | null;
  welcomeMessage?: string | null;
  officeBranch: string;
  fieldConfig: import("@/lib/registration-link-fields").RegistrationFieldConfig;
  hostName: string;
  hostDepartment?: string;
  workspaceName: string;
  employees?: EmployeeOption[];
}

interface SuccessPass {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  purpose: string;
  qrCode: string;
  qrValidUntil?: string | null;
  hostName: string;
}

interface PublicRegistrationFormProps {
  pageData: PublicRegistrationPageData;
  preview?: boolean;
}

export function PublicRegistrationForm({
  pageData,
  preview = false,
}: PublicRegistrationFormProps) {
  const theme = getRegistrationDesignTheme(pageData.designTheme);
  const themeId = pageData.designTheme as RegistrationDesignTheme;

  const [values, setValues] = useState<RegistrationFormValues>({
    name: "",
    phone: "",
    email: "",
    company: "",
    purpose: "Meeting",
    idProofType: "",
    idProofNumber: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successPass, setSuccessPass] = useState<SuccessPass | null>(null);
  const [isEmployee, setIsEmployee] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const title = pageData.pageTitle || `Visit ${pageData.workspaceName}`;
  const subtitle =
    pageData.welcomeMessage ||
    `Pre-register your visit at ${pageData.officeBranch}. Host: ${pageData.hostName}`;

  const canSubmit = useMemo(() => !preview && !submitting, [preview, submitting]);

  const updateField = <K extends keyof RegistrationFormValues>(
    key: K,
    value: RegistrationFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleEmployeeToggle = (enabled: boolean) => {
    setIsEmployee(enabled);
    if (enabled && !values.company.trim()) {
      updateField("company", pageData.workspaceName);
    }
    if (!enabled) {
      setSelectedEmployeeId("");
    }
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    const employee = (pageData.employees ?? []).find((e) => e.id === employeeId);
    const filled = applyEmployeeSelection(employee, pageData.workspaceName);
    if (filled) {
      setValues((prev) => ({
        ...prev,
        name: filled.name,
        email: filled.email,
        phone: filled.phone,
        company: filled.company,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/public/register/${pageData.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccessPass({
        name: data.visitor.name,
        email: data.visitor.email,
        phone: data.visitor.phone,
        company: data.visitor.company,
        purpose: data.visitor.purpose,
        qrCode: data.visitor.qrCode,
        qrValidUntil: data.visitor.qrValidUntil,
        hostName: data.visitor.hostName,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const footer = !successPass ? (
    <p
      className={cn(
        "mt-6 text-center text-xs",
        themeId === "bold" || themeId === "glass" ? "text-white/60" : "text-slate-400"
      )}
    >
      Powered by ANSH Visitor
    </p>
  ) : null;

  const successContent = successPass ? (
    <div className="space-y-6">
      <div className="text-center no-print">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <PartyPopper className="h-7 w-7" />
        </span>
        <h2 className="text-2xl font-black text-slate-900">Congratulations!</h2>
        <p className="mt-2 text-sm text-slate-500">
          Your visit is pre-registered. Save or print your visitor pass below.
        </p>
      </div>

      <div className="printable-pass rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm">
        <div className="text-center">
          <p className="visitor-pass-brand text-[10px] font-bold uppercase tracking-[0.25em] text-sky-600">
            {pageData.workspaceName}
          </p>
          <h3 className="mt-2 text-lg font-black tracking-tight">ANSH VISITOR PASS</h3>
          <p className="mt-1 text-xs text-slate-500">
            Present this QR code at the reception desk on your visit day.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="visitor-pass-qr-box flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm">
            <QRCodeSVG
              value={successPass.qrCode}
              size={112}
              bgColor="#ffffff"
              fgColor="#0f172a"
              level="M"
            />
            <span className="font-mono text-[11px] font-extrabold tracking-wider text-slate-500">
              Passcode: {successPass.qrCode}
            </span>
          </div>

          <div className="mt-6 space-y-2 text-center">
            <h4 className="text-lg font-black leading-tight">{successPass.name}</h4>
            <span className="visitor-pass-purpose inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
              {successPass.purpose}
            </span>
            <p className="text-xs text-slate-500">
              Company: <strong className="text-slate-700">{successPass.company || "Individual"}</strong>
            </p>
            {successPass.phone && (
              <p className="text-xs text-slate-500">
                Phone: <strong className="text-slate-700">{successPass.phone}</strong>
              </p>
            )}
            {successPass.email && (
              <p className="text-xs text-slate-500">
                Email: <strong className="text-slate-700">{successPass.email}</strong>
              </p>
            )}
            {successPass.qrValidUntil && (
              <p className="text-xs text-slate-500">
                Valid until:{" "}
                <strong className="text-slate-700">
                  {formatQrValidUntil(successPass.qrValidUntil)}
                </strong>
              </p>
            )}
            <p className="text-xs text-slate-500">
              Branch: <strong className="text-slate-700">{pageData.officeBranch}</strong>
            </p>
            <p className="text-xs text-slate-500">
              Host: <strong className="text-slate-700">{successPass.hostName}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="no-print">
        <Button
          type="button"
          className={cn("h-11 w-full border-0 font-semibold", theme.preview.button)}
          onClick={() => window.print()}
        >
          <Printer className="mr-2 h-4 w-4" />
          Print / Save PDF
        </Button>
      </div>
    </div>
  ) : (
    <RegistrationFormFields
      themeId={themeId}
      fieldConfig={pageData.fieldConfig}
      values={values}
      onChange={updateField}
      onSubmit={handleSubmit}
      submitting={submitting}
      preview={preview}
      error={error}
      buttonClass={theme.preview.button}
      workspaceName={pageData.workspaceName}
      employees={pageData.employees}
      isEmployee={isEmployee}
      onIsEmployeeChange={handleEmployeeToggle}
      selectedEmployeeId={selectedEmployeeId}
      onEmployeeSelect={handleEmployeeSelect}
    />
  );

  return (
    <RegistrationThemeShell
      themeId={themeId}
      workspaceName={pageData.workspaceName}
      officeBranch={pageData.officeBranch}
      hostName={pageData.hostName}
      hostDepartment={pageData.hostDepartment}
      title={title}
      subtitle={subtitle}
      footer={footer}
    >
      {successContent}
    </RegistrationThemeShell>
  );
}
