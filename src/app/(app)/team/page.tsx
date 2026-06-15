"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/crm/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useVisitorStore, Host } from "@/stores/visitor-store";
import {
  Users,
  Search,
  Plus,
  Edit2,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Building,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeamDirectoryPage() {
  const router = useRouter();
  const { hosts, addHost, switchUser, currentUser, departments, designations, officeBranches } = useVisitorStore();

  // Directory UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Teammate Wizard States
  const [openWizard, setOpenWizard] = useState(false);
  const [wizardMode, setWizardMode] = useState<"add" | "edit">("add");
  const [editingHostId, setEditingHostId] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Fields - Step 1: IDENTITY
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("+91");
  const [dob, setDob] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields - Step 2: JOB DETAILS
  const [teammateCode, setTeammateCode] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [designation, setDesignation] = useState(designations[0] || "Software Engineer");
  const [department, setDepartment] = useState(departments[0] || "Engineering");
  const [accessRole, setAccessRole] = useState("Employee");
  const [employmentStatus, setEmploymentStatus] = useState("Active");
  const [officeBranch, setOfficeBranch] = useState(officeBranches[0] || "HQ - Bangalore");
  const [workLocation, setWorkLocation] = useState("Remote");
  const [reportingManager, setReportingManager] = useState("");
  const [reportingHR, setReportingHR] = useState("");

  // Form Fields - Step 3: EMERGENCY CONTACT
  const [personalEmail, setPersonalEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("+91");

  // Departments for filters
  const departmentsFilterList = Array.from(new Set([...departments, ...hosts.map((h) => h.department)]));

  // Populate form for Edit
  const handleEditTeammate = (host: Host) => {
    setWizardMode("edit");
    setEditingHostId(host.id);
    setStep(1);
    setErrors({});

    // Step 1
    setFullName(host.name);
    setWorkEmail(host.email);
    setPassword("********");
    setConfirmPassword("********");
    setPhone(host.phone || "+91");
    setDob(host.dob || "");

    // Step 2
    setTeammateCode(host.code || `ANSH-${Math.floor(100 + Math.random() * 900)}`);
    setJoiningDate(host.joiningDate || "");
    setDesignation(host.designation || "Software Engineer");
    setDepartment(host.department);
    setAccessRole(host.role);
    setEmploymentStatus(host.status);
    setOfficeBranch(host.officeBranch || "HQ - Bangalore");
    setWorkLocation(host.workLocation || "Remote");
    setReportingManager(host.reportingManager || "");
    setReportingHR(host.reportingHR || "");

    // Step 3
    setPersonalEmail(host.personalEmail || "");
    setBloodGroup(host.bloodGroup || "O+");
    setEmergencyName(host.emergencyName || "");
    setEmergencyPhone(host.emergencyPhone || "+91");

    setOpenWizard(true);
  };

  const handleOpenAddWizard = () => {
    setWizardMode("add");
    setEditingHostId(null);
    setStep(1);
    setErrors({});

    // Reset Form Fields
    setFullName("");
    setWorkEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("+91");
    setDob("");
    setTeammateCode(`ANSH-${Math.floor(100 + Math.random() * 900)}`);
    setJoiningDate("");
    setDesignation(designations[0] || "Software Engineer");
    setDepartment(departments[0] || "Engineering");
    setAccessRole("Employee");
    setEmploymentStatus("Active");
    setOfficeBranch(officeBranches[0] || "HQ - Bangalore");
    setWorkLocation("Remote");
    setReportingManager(hosts[0]?.id || "");
    setReportingHR(hosts.find(h => h.department.toLowerCase().includes("hr"))?.id || hosts[0]?.id || "");
    setPersonalEmail("");
    setBloodGroup("O+");
    setEmergencyName("");
    setEmergencyPhone("+91");

    setOpenWizard(true);
  };

  const handleNextStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!fullName.trim()) {
        newErrors.fullName = "Teammate full name is required.";
      }
      if (!workEmail.trim()) {
        newErrors.workEmail = "Work email address is required.";
      } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
        newErrors.workEmail = "Please enter a valid email address.";
      }
      if (wizardMode === "add") {
        if (!password) {
          newErrors.password = "Password is required.";
        } else if (password.length < 6) {
          newErrors.password = "Password must be at least 6 characters.";
        }
        if (password !== confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match.";
        }
      }
    }

    if (step === 2) {
      if (!teammateCode.trim()) {
        newErrors.teammateCode = "Teammate code is required.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep((s) => s + 1);
  };

  const handleBackStep = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmitTeammate = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submit
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Teammate full name is required.";
    if (!workEmail.trim()) {
      newErrors.workEmail = "Work email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
      newErrors.workEmail = "Please enter a valid email address.";
    }
    if (wizardMode === "add") {
      if (!password) {
        newErrors.password = "Password is required.";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }
    if (!teammateCode.trim()) newErrors.teammateCode = "Teammate code is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.fullName || newErrors.workEmail || newErrors.password || newErrors.confirmPassword) {
        setStep(1);
      } else if (newErrors.teammateCode) {
        setStep(2);
      }
      return;
    }

    const hostPayload = {
      name: fullName,
      email: workEmail,
      role: accessRole,
      department: department,
      phone,
      dob,
      code: teammateCode,
      joiningDate,
      designation,
      officeBranch,
      workLocation,
      reportingManager,
      reportingHR,
      personalEmail,
      bloodGroup,
      emergencyName,
      emergencyPhone
    };

    if (wizardMode === "edit" && editingHostId) {
      // In edit mode, we replace/update the host inside store
      // Since it's client-side state, we will update the state directly
      useVisitorStore.setState((state) => ({
        hosts: state.hosts.map((h) =>
          h.id === editingHostId
            ? {
                ...h,
                ...hostPayload,
                avatarInitials: fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2),
                status: employmentStatus
              }
            : h
        )
      }));
    } else {
      // Create new teammate
      addHost(hostPayload);
    }

    setOpenWizard(false);
  };

  // Filter hosts based on search query
  const getFilteredTeammates = () => {
    let list = [...hosts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.email.toLowerCase().includes(q) ||
          (h.designation && h.designation.toLowerCase().includes(q)) ||
          h.department.toLowerCase().includes(q)
      );
    }

    if (deptFilter !== "All") {
      list = list.filter((h) => h.department === deptFilter);
    }

    if (statusFilter !== "All") {
      list = list.filter((h) => h.status === statusFilter);
    }

    return list;
  };

  const filteredTeammates = getFilteredTeammates();

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <title>Team Directory | Ansh Visitor</title>
      <PageHeader
        eyebrow="Organization Controls"
        title="Team Directory"
        description="Oversee your staff profiles, designations, office branches, and security access roles."
        action={{
          label: "Add Teammate",
          icon: Plus,
          onClick: handleOpenAddWizard
        }}
      />

      {/* SEARCH & FILTERS */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teammate by name, email, designation..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="w-40 bg-card border-input text-foreground">
            <option value="All">All Departments</option>
            {departmentsFilterList.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-32 bg-card border-input text-foreground">
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </div>
      </div>

      {/* TEAMMATES GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeammates.length > 0 ? (
          filteredTeammates.map((teammate) => {
            const isSelf = teammate.id === currentUser.id;
            return (
              <Card key={teammate.id} className="crm-card relative overflow-hidden group">
                <CardContent className="p-6 space-y-4">
                  {/* Top Header Card Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 font-black text-sm">
                        {teammate.avatarInitials}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                          {teammate.name}
                          {isSelf && (
                            <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-0 text-[9px] px-1 py-0">
                              You
                            </Badge>
                          )}
                        </h3>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">
                          {teammate.designation || teammate.role} · {teammate.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleEditTeammate(teammate)}
                        title="Edit Teammate Details"
                        className="text-slate-400 hover:text-primary cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <Separator className="opacity-40" />

                  {/* Teammate Contact & Branch */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{teammate.email}</span>
                    </div>
                    {teammate.phone && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{teammate.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-500">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      <span>Branch: {teammate.officeBranch || "HQ - Bangalore"}</span>
                    </div>
                  </div>

                  {/* Badges footer */}
                  <div className="flex flex-wrap gap-2 pt-2 items-center justify-between">
                    <div className="flex gap-2">
                      <Badge className="bg-slate-100 dark:bg-slate-800/80 text-slate-655 dark:text-slate-300 border-0 text-[10px]">
                        {teammate.workLocation || "Remote"}
                      </Badge>
                      <Badge className="bg-blue-500/10 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 border-0 text-[10px]">
                        {teammate.role}
                      </Badge>
                    </div>
                    <div>
                      {teammate.status === "Active" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center text-slate-400 italic">
            No matching teammates found. Add a new teammate.
          </div>
        )}
      </div>

      {/* 3-STEP TEAMMATE WIZARD DIALOG MODAL */}
      <Dialog open={openWizard} onOpenChange={setOpenWizard}>
        <DialogContent className="sm:max-w-[540px] text-slate-800 dark:text-slate-100 p-0 overflow-hidden">
          <form onSubmit={handleSubmitTeammate}>
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                {wizardMode === "edit" ? (
                  <Edit2 className="h-5 w-5 text-primary" />
                ) : (
                  <Users className="h-5 w-5 text-primary" />
                )}
                <DialogTitle className="text-base font-extrabold tracking-wide uppercase">
                  {wizardMode === "edit" ? "EDIT TEAMMATE DETAILS" : "ADD TEAMMATE RECORD"}
                </DialogTitle>
              </div>
            </div>

            {/* Steps Indicator top bar */}
            <div className="px-6 py-4 bg-slate-50/20 dark:bg-slate-900/20 border-b border-border/40 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
              {/* Step 1 Identity indicator */}
              <div className="flex items-center gap-2">
                {step > 1 ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={4} />
                  </span>
                ) : (
                  <span className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
                    step === 1 ? "bg-primary text-primary-foreground border-primary" : "border-slate-300 text-slate-400"
                  )}>
                    1
                  </span>
                )}
                <span className={cn(
                  step > 1 ? "text-emerald-500" : step === 1 ? "text-primary font-black" : "text-slate-400"
                )}>
                  IDENTITY
                </span>
              </div>

              <div className="h-0.5 flex-1 mx-4 bg-border/60" />

              {/* Step 2 Job details indicator */}
              <div className="flex items-center gap-2">
                {step > 2 ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={4} />
                  </span>
                ) : (
                  <span className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
                    step === 2 ? "bg-primary text-primary-foreground border-primary" : "border-slate-300 text-slate-400"
                  )}>
                    2
                  </span>
                )}
                <span className={cn(
                  step > 2 ? "text-emerald-500" : step === 2 ? "text-primary font-black" : "text-slate-400"
                )}>
                  JOB DETAILS
                </span>
              </div>

              <div className="h-0.5 flex-1 mx-4 bg-border/60" />

              {/* Step 3 Emergency contact indicator */}
              <div className="flex items-center gap-2">
                <span className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
                  step === 3 ? "bg-primary text-primary-foreground border-primary" : "border-slate-300 text-slate-400"
                )}>
                  3
                </span>
                <span className={cn(
                  step === 3 ? "text-primary font-black" : "text-slate-400"
                )}>
                  EMERGENCY CONTACT
                </span>
              </div>
            </div>

            {/* STEP VIEWS BODY */}
            <div className="px-6 py-6 space-y-4 max-h-[60vh] overflow-y-auto">
              
              {/* STEP 1: IDENTITY */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Full Name
                    </label>
                    <Input
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.fullName;
                            return next;
                          });
                        }
                      }}
                      placeholder="Rahul Raj"
                      className={cn("mt-2", errors.fullName && "border-rose-500 focus-visible:ring-rose-500/20")}
                    />
                    {errors.fullName && (
                      <p className="text-[10px] text-rose-550 dark:text-rose-400 font-semibold mt-1 animate-in slide-in-from-top-1 duration-150">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Work Email Address
                    </label>
                    <Input
                      required
                      type="email"
                      value={workEmail}
                      onChange={(e) => {
                        setWorkEmail(e.target.value);
                        if (errors.workEmail) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.workEmail;
                            return next;
                          });
                        }
                      }}
                      placeholder="rahulraj9835045@gmail.com"
                      className={cn(
                        "mt-2 bg-slate-100 dark:bg-slate-900 border-border/50 text-slate-800 dark:text-slate-100",
                        errors.workEmail && "border-rose-500 focus-visible:ring-rose-500/20"
                      )}
                    />
                    {errors.workEmail && (
                      <p className="text-[10px] text-rose-550 dark:text-rose-400 font-semibold mt-1 animate-in slide-in-from-top-1 duration-150">
                        {errors.workEmail}
                      </p>
                    )}
                  </div>

                  {/* Passwords */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Password
                      </label>
                      <div className="relative mt-2">
                        <Input
                          required={wizardMode === "add"}
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.password;
                                return next;
                              });
                            }
                          }}
                          placeholder="•••••••••"
                          className={cn("pr-9", errors.password && "border-rose-500 focus-visible:ring-rose-500/20")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-[10px] text-rose-555 dark:text-rose-400 font-semibold mt-1 animate-in slide-in-from-top-1 duration-150">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Confirm Password
                      </label>
                      <div className="relative mt-2">
                        <Input
                          required={wizardMode === "add"}
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (errors.confirmPassword) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.confirmPassword;
                                return next;
                              });
                            }
                          }}
                          placeholder="Repeat password"
                          className={cn("pr-9", errors.confirmPassword && "border-rose-500 focus-visible:ring-rose-500/20")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-[10px] text-rose-555 dark:text-rose-400 font-semibold mt-1 animate-in slide-in-from-top-1 duration-150">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Date of Birth */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Phone Number
                      </label>
                      <div className="flex gap-2 mt-2">
                        {/* Country code prefix card */}
                        <div className="flex items-center gap-1 px-3 border border-input bg-card rounded-lg text-sm shrink-0 select-none">
                          <span>🇮🇳</span>
                          <span className="text-slate-400 text-xs">▼</span>
                        </div>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Date of Birth
                      </label>
                      <div className="relative mt-2">
                        <Input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: JOB DETAILS */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Teammate Code
                      </label>
                      <Input
                        required
                        value={teammateCode}
                        onChange={(e) => {
                          setTeammateCode(e.target.value);
                          if (errors.teammateCode) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.teammateCode;
                              return next;
                            });
                          }
                        }}
                        placeholder="e.g. ANSH-005"
                        className={cn("mt-2", errors.teammateCode && "border-rose-500 focus-visible:ring-rose-500/20")}
                      />
                      {errors.teammateCode && (
                        <p className="text-[10px] text-rose-550 dark:text-rose-400 font-semibold mt-1 animate-in slide-in-from-top-1 duration-150">
                          {errors.teammateCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Joining Date
                      </label>
                      <Input
                        type="date"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Designation
                        </label>
                        <span
                          onClick={() => {
                            setOpenWizard(false);
                            router.push("/settings/workspace");
                          }}
                          className="text-primary text-[9px] font-extrabold uppercase hover:underline cursor-pointer"
                        >
                          + Add
                        </span>
                      </div>
                      <Select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        {designations.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Department
                        </label>
                        <span
                          onClick={() => {
                            setOpenWizard(false);
                            router.push("/settings/workspace");
                          }}
                          className="text-primary text-[9px] font-extrabold uppercase hover:underline cursor-pointer"
                        >
                          + Add
                        </span>
                      </div>
                      <Select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        {departments.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Security Access Role
                      </label>
                      <Select
                        value={accessRole}
                        onChange={(e) => setAccessRole(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                        <option value="Security">Security</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Employment Status
                      </label>
                      <Select
                        value={employmentStatus}
                        onChange={(e) => setEmploymentStatus(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Office Branch
                        </label>
                        <span
                          onClick={() => {
                            setOpenWizard(false);
                            router.push("/settings/workspace");
                          }}
                          className="text-primary text-[9px] font-extrabold uppercase hover:underline cursor-pointer"
                        >
                          + Add
                        </span>
                      </div>
                      <Select
                        value={officeBranch}
                        onChange={(e) => setOfficeBranch(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        {officeBranches.map((ob) => (
                          <option key={ob} value={ob}>
                            {ob}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Work Location
                        </label>
                        <span
                          onClick={() => {
                            setOpenWizard(false);
                            router.push("/settings/workspace");
                          }}
                          className="text-primary text-[9px] font-extrabold uppercase hover:underline cursor-pointer"
                        >
                          + Add
                        </span>
                      </div>
                      <Select
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Reporting Manager
                      </label>
                      <Select
                        value={reportingManager}
                        onChange={(e) => setReportingManager(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        <option value="">Select Manager</option>
                        {hosts.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name} ({h.department})
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Reporting HR
                      </label>
                      <Select
                        value={reportingHR}
                        onChange={(e) => setReportingHR(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        <option value="">Select HR</option>
                        {hosts.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name} ({h.department})
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: EMERGENCY CONTACT */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Personal Email Address
                      </label>
                      <Input
                        type="email"
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                        placeholder="rahul.personal@gmail.com"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Blood Group
                      </label>
                      <Select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="mt-2 bg-card border-input text-foreground"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t border-border/40 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wide">
                      <Phone className="h-4 w-4" />
                      EMERGENCY CONTACTS DETAILS
                    </span>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Contact Name
                        </label>
                        <Input
                          value={emergencyName}
                          onChange={(e) => setEmergencyName(e.target.value)}
                          placeholder="e.g. Sibling or Parent Name"
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          Contact Phone
                        </label>
                        <div className="flex gap-2 mt-2">
                          <div className="flex items-center gap-1 px-3 border border-input bg-card rounded-lg text-sm shrink-0 select-none">
                            <span>🇮🇳</span>
                            <span className="text-slate-400 text-xs">▼</span>
                          </div>
                          <Input
                            type="tel"
                            value={emergencyPhone}
                            onChange={(e) => setEmergencyPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <DialogFooter className="px-6 py-5 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/50 flex sm:items-center sm:justify-between gap-3">
              {step === 1 ? (
                <Button
                  key="cancel-btn"
                  variant="outline"
                  type="button"
                  onClick={() => setOpenWizard(false)}
                  className="w-full sm:w-44 h-11 text-sm font-semibold cursor-pointer rounded-2xl"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  key="back-btn"
                  variant="outline"
                  type="button"
                  onClick={handleBackStep}
                  className="w-full sm:w-44 h-11 text-sm font-semibold cursor-pointer rounded-2xl"
                >
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button
                  key="next-btn"
                  type="button"
                  onClick={handleNextStep}
                  className="w-full sm:w-44 h-11 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 cursor-pointer rounded-2xl flex items-center justify-center gap-2"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  key="submit-btn"
                  type="submit"
                  className="w-full sm:w-44 h-11 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 cursor-pointer rounded-2xl"
                >
                  {wizardMode === "edit" ? "Update Details" : "Add Teammate"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
