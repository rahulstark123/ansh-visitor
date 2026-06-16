"use client";

import { useEffect, useState } from "react";
import { useVisitorStore, type Visitor } from "@/stores/visitor-store";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import {
  formatQrValidUntil,
  QR_VALIDITY_OPTIONS,
  type QrValidityPeriod,
} from "@/lib/qr-validity";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  EmployeeRegistrationFields,
  applyEmployeeSelection,
  type EmployeeOption,
} from "@/components/crm/employee-registration-fields";

export function RegisterGuestDialog() {
  const {
    hosts,
    currentUser,
    workspaceName,
    addVisitor,
    registerWalkIn,
    registerGuestOpen,
    registerGuestPrefill,
    registerGuestRequestId,
    closeRegisterGuest,
  } = useVisitorStore();

  const [regMode, setRegMode] = useState<"pre-register" | "walk-in">("pre-register");
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("");
  const [newGuestCompany, setNewGuestCompany] = useState("");
  const [newGuestPurpose, setNewGuestPurpose] = useState<
    "Interview" | "Meeting" | "Delivery" | "Vendor" | "Other"
  >("Meeting");
  const [newGuestNotes, setNewGuestNotes] = useState("");
  const [newGuestIdProofType, setNewGuestIdProofType] = useState("");
  const [newGuestIdProofNumber, setNewGuestIdProofNumber] = useState("");
  const [newGuestQrValidity, setNewGuestQrValidity] = useState<QrValidityPeriod>("24h");
  const [isEmployee, setIsEmployee] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedPass, setSelectedPass] = useState<Visitor | null>(null);
  const [openPass, setOpenPass] = useState(false);

  const employeeOptions: EmployeeOption[] = hosts
    .filter((h) => h.status === "Active")
    .map((h) => ({
      id: h.id,
      name: h.name,
      email: h.email,
      phone: h.phone,
    }));

  const resetRegisterForm = () => {
    setRegMode("pre-register");
    setNewGuestName("");
    setNewGuestEmail("");
    setNewGuestPhone("");
    setNewGuestCompany("");
    setNewGuestPurpose("Meeting");
    setNewGuestNotes("");
    setNewGuestIdProofType("");
    setNewGuestIdProofNumber("");
    setNewGuestQrValidity("24h");
    setIsEmployee(false);
    setSelectedEmployeeId("");
  };

  useEffect(() => {
    if (!registerGuestOpen) return;

    const prefill = registerGuestPrefill;
    if (prefill) {
      setRegMode(prefill.mode ?? "pre-register");
      setIsEmployee(prefill.isEmployee ?? false);
      setSelectedEmployeeId(prefill.employeeId ?? "");
      setNewGuestName(prefill.name ?? "");
      setNewGuestEmail(prefill.email ?? "");
      setNewGuestPhone(prefill.phone ?? "");
      setNewGuestCompany(prefill.company ?? workspaceName);
      setNewGuestPurpose("Meeting");
      setNewGuestNotes("");
      setNewGuestIdProofType("");
      setNewGuestIdProofNumber("");
      setNewGuestQrValidity("24h");
    } else {
      resetRegisterForm();
    }
  }, [registerGuestOpen, registerGuestRequestId, registerGuestPrefill, workspaceName]);

  const handleEmployeeToggle = (enabled: boolean) => {
    setIsEmployee(enabled);
    if (enabled && !newGuestCompany.trim()) {
      setNewGuestCompany(workspaceName);
    }
    if (!enabled) {
      setSelectedEmployeeId("");
    }
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    const employee = employeeOptions.find((e) => e.id === employeeId);
    const filled = applyEmployeeSelection(employee, workspaceName);
    if (filled) {
      setNewGuestName(filled.name);
      setNewGuestEmail(filled.email);
      setNewGuestPhone(filled.phone);
      setNewGuestCompany(filled.company);
    }
  };

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasIdentity =
      Boolean(newGuestName.trim()) ||
      Boolean(newGuestEmail.trim()) ||
      Boolean(newGuestPhone.trim());
    if (!hasIdentity) return;

    const host = currentUser;

    if (regMode === "walk-in") {
      await registerWalkIn({
        name: newGuestName,
        email: newGuestEmail,
        phone: newGuestPhone,
        company: newGuestCompany || undefined,
        purpose: newGuestPurpose,
        hostId: host.id,
        hostName: host.name,
        notes: newGuestNotes || undefined,
        idProofType: newGuestIdProofType || undefined,
        idProofNumber: newGuestIdProofNumber || undefined,
      });
    } else {
      const visitor = await addVisitor({
        name: newGuestName,
        email: newGuestEmail,
        phone: newGuestPhone,
        company: newGuestCompany || undefined,
        purpose: newGuestPurpose,
        hostId: host.id,
        hostName: host.name,
        notes: newGuestNotes || undefined,
        idProofType: newGuestIdProofType || undefined,
        idProofNumber: newGuestIdProofNumber || undefined,
        qrValidityPeriod: newGuestQrValidity,
      });
      if (visitor) {
        setSelectedPass(visitor);
        setOpenPass(true);
      }
    }

    resetRegisterForm();
    closeRegisterGuest();
  };

  return (
    <>
      <Dialog
        open={registerGuestOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetRegisterForm();
            closeRegisterGuest();
          }
        }}
      >
        <DialogContent className="sm:max-w-[540px]">
          <form onSubmit={handleCreateInvitation} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Register Guest</DialogTitle>
              <DialogDescription>
                Schedule a pre-registered entry pass, or perform an immediate desk walk-in check-in.
              </DialogDescription>
            </DialogHeader>

            <div className="flex border-b border-border/60 mb-2">
              <button
                type="button"
                className={cn(
                  "flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
                  regMode === "pre-register"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-400 dark:text-slate-550 hover:text-slate-600 dark:hover:text-slate-300"
                )}
                onClick={() => setRegMode("pre-register")}
              >
                Pre-register (Expected)
              </button>
              <button
                type="button"
                className={cn(
                  "flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
                  regMode === "walk-in"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-400 dark:text-slate-550 hover:text-slate-600 dark:hover:text-slate-300"
                )}
                onClick={() => setRegMode("walk-in")}
              >
                Walk-in Entry (Check In)
              </button>
            </div>

            <div className="space-y-4 py-2 text-slate-800 dark:text-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Guest Full Name (Optional)
                  </label>
                  <Input
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Guest Company Name
                  </label>
                  <Input
                    value={newGuestCompany}
                    onChange={(e) => setNewGuestCompany(e.target.value)}
                    placeholder={workspaceName || "Acme Corp"}
                    className="mt-2"
                  />
                </div>
              </div>

              <EmployeeRegistrationFields
                workspaceName={workspaceName}
                company={newGuestCompany}
                employees={employeeOptions}
                isEmployee={isEmployee}
                onIsEmployeeChange={handleEmployeeToggle}
                selectedEmployeeId={selectedEmployeeId}
                onEmployeeSelect={handleEmployeeSelect}
                alwaysVisible
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                    Guest Phone Number (Optional)
                  </label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={newGuestPhone}
                    onChange={(val) => setNewGuestPhone(val || "")}
                    defaultCountry="IN"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Guest Email (Optional)
                  </label>
                  <Input
                    type="email"
                    value={newGuestEmail}
                    onChange={(e) => setNewGuestEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Visit Purpose (Optional)
                </label>
                <Select
                  value={newGuestPurpose}
                  onChange={(e) =>
                    setNewGuestPurpose(e.target.value as typeof newGuestPurpose)
                  }
                  className="mt-2 bg-card border-input text-foreground"
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Interview">Interview</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Other">Other</option>
                </Select>
              </div>

              {regMode === "pre-register" && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    QR Pass Validity
                  </label>
                  <Select
                    value={newGuestQrValidity}
                    onChange={(e) =>
                      setNewGuestQrValidity(e.target.value as QrValidityPeriod)
                    }
                    className="mt-2 bg-card border-input text-foreground"
                  >
                    {QR_VALIDITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} — {opt.description}
                      </option>
                    ))}
                  </Select>
                  <p className="mt-1.5 text-[10px] text-slate-400 leading-relaxed">
                    The same QR pass can be scanned on multiple days until this period ends.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Govt ID Card Type (Optional)
                  </label>
                  <Select
                    value={newGuestIdProofType}
                    onChange={(e) => setNewGuestIdProofType(e.target.value)}
                    className="mt-2 bg-card border-input text-foreground"
                  >
                    <option value="">No ID Card Provided</option>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="PAN Card">PAN Card</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Passport">Passport</option>
                    <option value="Voter ID">Voter ID</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Govt ID Number (Optional)
                  </label>
                  <Input
                    value={newGuestIdProofNumber}
                    onChange={(e) => setNewGuestIdProofNumber(e.target.value)}
                    placeholder="e.g. ABCD1234E"
                    disabled={!newGuestIdProofType}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Special Notes
                </label>
                <textarea
                  value={newGuestNotes}
                  onChange={(e) => setNewGuestNotes(e.target.value)}
                  placeholder="Need visual board access or parking slot..."
                  className="mt-2 block w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 dark:bg-slate-900/30 min-h-16"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  resetRegisterForm();
                  closeRegisterGuest();
                }}
                className="w-full sm:w-36 h-11 text-sm font-semibold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-36 h-11 text-sm font-semibold btn-primary border-0 cursor-pointer"
              >
                {regMode === "walk-in" ? "Check In Now" : "Issue QR Pass"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openPass} onOpenChange={setOpenPass}>
        <DialogContent className="sm:max-w-[400px] text-slate-800 dark:text-slate-100">
          {selectedPass && (
            <div className="space-y-6 py-2">
              <DialogHeader className="no-print">
                <DialogTitle className="text-center font-bold tracking-tight">
                  ANSH VISITOR PASS
                </DialogTitle>
                <DialogDescription className="text-center text-xs text-slate-400">
                  Present this QR code at the reception desk entryway.
                </DialogDescription>
              </DialogHeader>

              <div className="printable-pass rounded-2xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col items-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="text-center w-full mb-2">
                  <h3 className="text-lg font-black tracking-tight">ANSH VISITOR PASS</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Present this QR code at the reception desk entryway.
                  </p>
                </div>
                <div className="visitor-pass-qr-box h-44 w-44 rounded-xl border border-slate-200 bg-white flex flex-col items-center justify-center dark:border-slate-800 select-none shadow-sm gap-2">
                  <QRCodeSVG
                    value={selectedPass.qrCode || ""}
                    size={112}
                    bgColor="#ffffff"
                    fgColor="#0f172a"
                    level="M"
                  />
                  <span className="font-mono text-[11px] font-extrabold text-slate-500 tracking-wider">
                    Passcode: {selectedPass.qrCode}
                  </span>
                </div>

                <div className="mt-6 text-center space-y-2">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {selectedPass.name}
                  </h4>
                  <span className="visitor-pass-purpose inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                    {selectedPass.purpose}
                  </span>
                  <p className="text-xs text-slate-400">
                    Company:{" "}
                    <strong className="text-slate-700 dark:text-slate-350">
                      {selectedPass.company || "Individual"}
                    </strong>
                  </p>
                  {selectedPass.qrValidUntil && (
                    <p className="text-xs text-slate-400">
                      Valid until:{" "}
                      <strong className="text-slate-700 dark:text-slate-350">
                        {formatQrValidUntil(selectedPass.qrValidUntil)}
                      </strong>
                    </p>
                  )}
                  <p className="text-xs text-slate-400">
                    Branch:{" "}
                    <strong className="text-slate-700 dark:text-slate-350">
                      {hosts.find((h) => h.id === selectedPass.hostId)?.officeBranch ||
                        "HQ - Bangalore"}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-3 no-print">
                <Button
                  variant="outline"
                  className="flex-1 h-11 text-sm font-semibold cursor-pointer"
                  onClick={() => setOpenPass(false)}
                >
                  Close Pass
                </Button>
                <Button
                  className="btn-primary border-0 flex-1 h-11 text-sm font-semibold gap-2 cursor-pointer"
                  onClick={() => window.print()}
                >
                  <Printer className="h-4 w-4" />
                  Print Pass
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
