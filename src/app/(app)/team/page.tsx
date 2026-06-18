"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useVisitorStore, Host } from "@/stores/visitor-store";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
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
  FileText,
  MapPin,
  Heart,
  CalendarDays,
  UserCheck,
  MoreVertical,
  QrCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ListPagination,
  paginateList,
} from "@/components/ui/list-pagination";

const TEAM_PAGE_SIZE = 12;

export default function TeamDirectoryPage() {
  const router = useRouter();
  const {
    hosts,
    visitors,
    addHost,
    openRegisterGuest,
    updateHost,
    deleteHost,
    switchUser,
    currentUser,
    workspaceName,
    departments,
    designations,
    officeBranches
  } = useVisitorStore();

  // Directory UI states
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTeammate, setSelectedTeammate] = useState<Host | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "activities">("profile");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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
  const [officeBranch, setOfficeBranch] = useState(officeBranches[0] || "");
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
    setTeammateCode(host.code || "");
    setJoiningDate(host.joiningDate || "");
    setDesignation(host.designation || "Software Engineer");
    setDepartment(host.department);
    setAccessRole(host.role);
    setEmploymentStatus(host.status);
    setOfficeBranch(host.officeBranch || officeBranches[0] || "");
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
    setTeammateCode("");
    setJoiningDate("");
    setDesignation(designations[0] || "Software Engineer");
    setDepartment(departments[0] || "Engineering");
    setAccessRole("Employee");
    setEmploymentStatus("Active");
    setOfficeBranch(officeBranches[0] || "");
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

  const handleDeleteTeammate = (hostId: string) => {
    setDeleteConfirmId(hostId);
  };

  const handleGenerateQr = (teammate: Host) => {
    openRegisterGuest({
      mode: "pre-register",
      isEmployee: true,
      employeeId: teammate.id,
      name: teammate.name,
      email: teammate.email,
      phone: teammate.phone || "",
      company: workspaceName,
    });
  };

  const handleSubmitTeammate = async (e: React.FormEvent) => {
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
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.fullName || newErrors.workEmail || newErrors.password || newErrors.confirmPassword) {
        setStep(1);
      }
      return;
    }

    setIsSubmitting(true);

    const hostPayload = {
      name: fullName,
      email: workEmail,
      role: accessRole,
      department: department,
      phone,
      dob,
      code: teammateCode.trim() || undefined,
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

    try {
      if (wizardMode === "edit" && editingHostId) {
        await updateHost(editingHostId, {
          ...hostPayload,
          status: employmentStatus
        });
      } else {
        await addHost(hostPayload);
      }
      setOpenWizard(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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

  const filteredTeammates = useMemo(() => getFilteredTeammates(), [
    hosts,
    searchQuery,
    deptFilter,
    statusFilter,
  ]);

  const paginatedTeammates = useMemo(
    () => paginateList(filteredTeammates, currentPage, TEAM_PAGE_SIZE),
    [filteredTeammates, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, deptFilter, statusFilter]);

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
        {paginatedTeammates.length > 0 ? (
          paginatedTeammates.map((teammate) => {
            const isSelf = teammate.id === currentUser.id;
            return (
              <Card 
                key={teammate.id} 
                className="crm-card relative overflow-hidden group cursor-pointer"
                onClick={() => {
                  setSelectedTeammate(teammate);
                  setOpenDrawer(true);
                  setActiveTab("profile");
                }}
              >
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

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        onClick={(e) => e.stopPropagation()}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800/50 dark:hover:text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                        title="Teammate actions"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-44 bg-card/95 dark:bg-slate-950/95 shadow-xl backdrop-blur-md border border-border dark:border-slate-800 p-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuItem
                          className="cursor-pointer gap-2 text-sm font-medium"
                          onClick={() => handleEditTeammate(teammate)}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer gap-2 text-sm font-medium"
                          onClick={() => handleGenerateQr(teammate)}
                        >
                          <QrCode className="h-3.5 w-3.5" />
                          Generate QR
                        </DropdownMenuItem>
                        {!isSelf && (
                          <>
                            <DropdownMenuSeparator className="bg-border/40" />
                            <DropdownMenuItem
                              variant="destructive"
                              className="cursor-pointer gap-2 text-sm font-medium"
                              onClick={() => handleDeleteTeammate(teammate.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                      <span>Branch: {teammate.officeBranch || "—"}</span>
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

      <ListPagination
        currentPage={currentPage}
        totalItems={filteredTeammates.length}
        pageSize={TEAM_PAGE_SIZE}
        onPageChange={setCurrentPage}
      />

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
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                        Phone Number
                      </label>
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(val) => setPhone(val || "")}
                        defaultCountry="IN"
                        required
                      />
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
                        Teammate Code <span className="text-slate-400 font-semibold normal-case">(optional)</span>
                      </label>
                      <Input
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
                        placeholder="e.g. EMP-005"
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
                        <option value="Owner">Owner</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="HR">HR</option>
                        <option value="Employee">Employee</option>
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
                            router.push("/settings/company");
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
                        {officeBranches.length === 0 ? (
                          <option value="">Add a branch in Company Settings</option>
                        ) : (
                          officeBranches.map((ob) => (
                            <option key={ob} value={ob}>
                              {ob}
                            </option>
                          ))
                        )}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        Work Location
                      </label>
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
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                          Contact Phone
                        </label>
                        <PhoneInput
                          placeholder="Enter emergency phone"
                          value={emergencyPhone}
                          onChange={(val) => setEmergencyPhone(val || "")}
                          defaultCountry="IN"
                        />
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
                  disabled={isSubmitting}
                  className="w-full sm:w-44 h-11 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 cursor-pointer rounded-2xl flex items-center justify-center gap-2"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  key="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-44 h-11 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 cursor-pointer rounded-2xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <ButtonLoadingSkeleton />
                  ) : (
                    wizardMode === "edit" ? "Update Details" : "Add Teammate"
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* TEAMMATE DETAILS SIDEBAR DRAWER */}
      <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
        <SheetContent className="sm:max-w-lg p-0 overflow-hidden flex flex-col h-full text-slate-800 dark:text-slate-100">
          {selectedTeammate && (
            <>
              {/* Drawer Header */}
              <SheetHeader className="px-6 py-6 border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/50 flex flex-row items-center gap-4 pb-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 font-black text-lg">
                  {selectedTeammate.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-lg font-extrabold truncate leading-tight">
                    {selectedTeammate.name}
                  </SheetTitle>
                  <p className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1.5">
                    <span>{selectedTeammate.designation || selectedTeammate.role}</span>
                    <span>·</span>
                    <span>{selectedTeammate.department}</span>
                  </p>
                </div>
                <div className="mr-6">
                  {selectedTeammate.status === "Active" ? (
                    <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/15 border-0 font-bold text-[10px]">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-500/10 text-slate-400 hover:bg-slate-500/15 border-0 font-bold text-[10px]">
                      Inactive
                    </Badge>
                  )}
                </div>
              </SheetHeader>

              {/* Drawer Tabs Header */}
              <div className="px-6 border-b border-border/50 flex gap-4 text-xs font-bold uppercase tracking-wider bg-slate-50/20 dark:bg-slate-900/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("profile")}
                  className={cn(
                    "py-3 border-b-2 transition-all cursor-pointer",
                    activeTab === "profile" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  )}
                >
                  Profile Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("activities")}
                  className={cn(
                    "py-3 border-b-2 transition-all cursor-pointer",
                    activeTab === "activities" 
                      ? "border-primary text-primary" 
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  )}
                >
                  Recent Activities
                </button>
              </div>

              {/* Drawer Details Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {activeTab === "profile" ? (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Contact Information */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        Contact details
                      </h4>
                      <div className="rounded-xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Work Email</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 select-all">{selectedTeammate.email}</span>
                        </div>
                        {selectedTeammate.phone && (
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Phone Number</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 select-all">{selectedTeammate.phone}</span>
                          </div>
                        )}
                        {selectedTeammate.personalEmail && (
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Personal Email</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 select-all">{selectedTeammate.personalEmail}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Job / Office Details */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" />
                        Employment &amp; job
                      </h4>
                      <div className="rounded-xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Department</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.department || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Designation</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.designation || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Employee Code</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.code || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Role Access</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Work Location</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.workLocation || "Remote"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Office Branch</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.officeBranch || "N/A"}</span>
                        </div>
                        {selectedTeammate.joiningDate && (
                          <div className="flex justify-between">
                            <span className="text-slate-400 font-medium">Joining Date</span>
                            <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                              <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                              {selectedTeammate.joiningDate}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Relationships & Hierarchy */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <UserCheck className="h-3.5 w-3.5" />
                        Reporting lines
                      </h4>
                      <div className="rounded-xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Reporting Manager</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {hosts.find((h) => h.id === selectedTeammate.reportingManager)?.name || "None Specified"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 font-medium">Reporting HR</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {hosts.find((h) => h.id === selectedTeammate.reportingHR)?.name || "None Specified"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    {(selectedTeammate.dob || selectedTeammate.bloodGroup) && (
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          Additional Details
                        </h4>
                        <div className="rounded-xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4 space-y-3 text-sm">
                          {selectedTeammate.dob && (
                            <div className="flex justify-between">
                              <span className="text-slate-400 font-medium">Date of Birth</span>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.dob}</span>
                            </div>
                          )}
                          {selectedTeammate.bloodGroup && (
                            <div className="flex justify-between">
                              <span className="text-slate-400 font-medium">Blood Group</span>
                              <span className="font-semibold text-rose-500 font-bold">{selectedTeammate.bloodGroup}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Emergency Contact */}
                    {(selectedTeammate.emergencyName || selectedTeammate.emergencyPhone) && (
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Heart className="h-3.5 w-3.5 text-rose-500" />
                          Emergency contact
                        </h4>
                        <div className="rounded-xl border border-border/50 bg-slate-50/30 dark:bg-slate-900/20 p-4 space-y-3 text-sm">
                          {selectedTeammate.emergencyName && (
                            <div className="flex justify-between">
                              <span className="text-slate-400 font-medium">Contact Name</span>
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTeammate.emergencyName}</span>
                            </div>
                          )}
                          {selectedTeammate.emergencyPhone && (
                            <div className="flex justify-between">
                              <span className="text-slate-400 font-medium">Contact Phone</span>
                              <span className="font-semibold text-slate-800 dark:text-slate-200 select-all">{selectedTeammate.emergencyPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Filter and display visitor log activities */}
                    {(() => {
                      const teammateVisitors = visitors
                        .filter(v => v.hostId === selectedTeammate.id)
                        .sort((a, b) => new Date(b.preRegisteredAt).getTime() - new Date(a.preRegisteredAt).getTime());

                      const formatActivityTime = (dateStr?: string) => {
                        if (!dateStr) return "";
                        try {
                          const d = new Date(dateStr);
                          return d.toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          });
                        } catch {
                          return dateStr;
                        }
                      };

                      return teammateVisitors.length > 0 ? (
                        <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/60">
                          {teammateVisitors.map((vis) => (
                            <div key={vis.id} className="relative flex gap-4 pl-1">
                              <div className="relative flex-shrink-0 mt-0.5">
                                <div className={cn(
                                  "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold border",
                                  vis.status === "CheckedIn" 
                                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    : vis.status === "CheckedOut"
                                    ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
                                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                )}>
                                  {vis.status === "CheckedIn" ? "IN" : vis.status === "CheckedOut" ? "OUT" : "EXP"}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                                  {vis.name}
                                </p>
                                {vis.company && (
                                  <p className="text-xs text-slate-400 font-semibold truncate mt-0.5">
                                    from {vis.company}
                                  </p>
                                )}
                                <p className="text-[11px] text-slate-400 mt-1 flex flex-col gap-0.5 font-medium">
                                  {vis.checkedInAt && (
                                    <span>Check-in: {formatActivityTime(vis.checkedInAt)}</span>
                                  )}
                                  {vis.checkedOutAt && (
                                    <span>Check-out: {formatActivityTime(vis.checkedOutAt)}</span>
                                  )}
                                  {!vis.checkedInAt && (
                                    <span>Pre-registered: {formatActivityTime(vis.preRegisteredAt)}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-16 text-slate-400 italic">
                          No recent visitor activities recorded for this teammate.
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <SheetFooter className="px-6 py-6 border-t border-border/50 bg-slate-50/50 dark:bg-slate-900/50 flex flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setOpenDrawer(false)}
                  className="flex-1 h-11 text-sm font-semibold rounded-2xl cursor-pointer"
                >
                  Close Panel
                </Button>
                <Button
                  onClick={() => {
                    setOpenDrawer(false);
                    handleEditTeammate(selectedTeammate);
                  }}
                  className="flex-1 h-11 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-2xl cursor-pointer"
                >
                  Edit Details
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* CUSTOM TEAMMATE DELETION CONFIRMATION DIALOG MODAL */}
      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="sm:max-w-[440px] text-slate-800 dark:text-slate-100 p-6 rounded-3xl border border-border/50 shadow-2xl backdrop-blur-xl">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-4">
              <Trash2 className="h-6 w-6 animate-pulse" />
            </div>
            <DialogTitle className="text-lg font-extrabold uppercase tracking-wide">
              Delete Teammate Record?
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xs leading-relaxed">
              Are you sure you want to delete this teammate? This action is permanent and cannot be undone. Visitor logs hosted by them will remain but will be unlinked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              disabled={isSubmitting}
              className="flex-1 h-11 text-sm font-semibold rounded-2xl cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!deleteConfirmId) return;
                setIsSubmitting(true);
                try {
                  await deleteHost(deleteConfirmId);
                  setDeleteConfirmId(null);
                  if (selectedTeammate?.id === deleteConfirmId) {
                    setOpenDrawer(false);
                  }
                } catch (err) {
                  console.error(err);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting}
              className="flex-1 h-11 text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white border-0 rounded-2xl cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <ButtonLoadingSkeleton className="bg-white/30" />
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
