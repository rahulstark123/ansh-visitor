"use client";

import { useState, useEffect } from "react";
import { useVisitorStore } from "@/stores/visitor-store";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { PageHeader } from "@/components/crm/page-header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Building,
  CreditCard,
  Droplet,
  Pencil,
  MapPin,
  HeartPulse,
  Heart,
  Users,
  Shield,
  Clock,
  ArrowRight,
  ShieldCheck,
  Save,
  CheckCircle,
  FileText
} from "lucide-react";
import { ButtonLoadingSkeleton } from "@/components/ui/page-skeletons";

export default function ProfileSettingsPage() {
  const { currentUser, hosts, updateCurrentUser, departments, designations, officeBranches } = useVisitorStore();
  const [openEditModal, setOpenEditModal] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(currentUser.name);
  const [phoneVal, setPhoneVal] = useState(currentUser.phone || "+91");
  const [dobVal, setDobVal] = useState(currentUser.dob || "");
  const [personalEmailVal, setPersonalEmailVal] = useState(currentUser.personalEmail || "");
  const [bloodGroupVal, setBloodGroupVal] = useState(currentUser.bloodGroup || "O+");
  
  const [emergencyNameVal, setEmergencyNameVal] = useState(currentUser.emergencyName || "");
  const [emergencyPhoneVal, setEmergencyPhoneVal] = useState(currentUser.emergencyPhone || "+91");
  
  const [employeeCode, setEmployeeCode] = useState(currentUser.code || "");
  const [joiningDateVal, setJoiningDateVal] = useState(currentUser.joiningDate || "");
  const [designationVal, setDesignationVal] = useState(currentUser.designation || designations[0] || "Software Engineer");
  const [departmentVal, setDepartmentVal] = useState(currentUser.department || departments[0] || "Engineering");
  const [officeBranchVal, setOfficeBranchVal] = useState(currentUser.officeBranch || officeBranches[0] || "HQ - Bangalore");
  const [workLocationVal, setWorkLocationVal] = useState(currentUser.workLocation || "Remote");
  
  const [reportingManagerVal, setReportingManagerVal] = useState(currentUser.reportingManager || "");
  const [reportingHRVal, setReportingHRVal] = useState(currentUser.reportingHR || "");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Sync state values when modal opens or currentUser changes
  useEffect(() => {
    setFullName(currentUser.name);
    setPhoneVal(currentUser.phone || "+91");
    setDobVal(currentUser.dob || "");
    setPersonalEmailVal(currentUser.personalEmail || "");
    setBloodGroupVal(currentUser.bloodGroup || "O+");
    setEmergencyNameVal(currentUser.emergencyName || "");
    setEmergencyPhoneVal(currentUser.emergencyPhone || "+91");
    setEmployeeCode(currentUser.code || "");
    setJoiningDateVal(currentUser.joiningDate || "");
    setDesignationVal(currentUser.designation || "Software Engineer");
    setDepartmentVal(currentUser.department || "Engineering");
    setOfficeBranchVal(currentUser.officeBranch || "HQ - Bangalore");
    setWorkLocationVal(currentUser.workLocation || "Remote");
    setReportingManagerVal(currentUser.reportingManager || "");
    setReportingHRVal(currentUser.reportingHR || "");
  }, [currentUser, openEditModal]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      updateCurrentUser({
        name: fullName,
        phone: phoneVal,
        dob: dobVal,
        personalEmail: personalEmailVal,
        bloodGroup: bloodGroupVal,
        emergencyName: emergencyNameVal,
        emergencyPhone: emergencyPhoneVal,
        code: employeeCode,
        joiningDate: joiningDateVal,
        designation: designationVal,
        department: departmentVal,
        officeBranch: officeBranchVal,
        workLocation: workLocationVal,
        reportingManager: reportingManagerVal,
        reportingHR: reportingHRVal
      });
      
      setSaving(false);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setOpenEditModal(false);
      }, 1000);
    }, 800);
  };

  // Helper formats
  const formatVal = (val: string | undefined, defaultVal: string = "Not specified", isUpper: boolean = false) => {
    if (!val || val.trim() === "" || val === "N/A" || val === "NOT ASSIGNED" || val === "NOT SPECIFIED") {
      return <span className="text-slate-400 dark:text-slate-500 font-medium italic">{defaultVal}</span>;
    }
    return <span className={isUpper ? "uppercase" : ""}>{val}</span>;
  };

  const formatUpperVal = (val: string | undefined, defaultVal: string) => {
    if (!val || val.trim() === "" || val === "N/A" || val === "NOT ASSIGNED" || val === "NOT SPECIFIED") {
      return <span className="text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wide">{defaultVal}</span>;
    }
    return <span className="uppercase font-extrabold text-slate-800 dark:text-slate-200">{val}</span>;
  };

  const getManagerName = (managerId: string | undefined) => {
    if (!managerId) return undefined;
    const manager = hosts.find((h) => h.id === managerId);
    return manager ? manager.name : undefined;
  };

  const getHRName = (hrId: string | undefined) => {
    if (!hrId) return undefined;
    const hr = hosts.find((h) => h.id === hrId);
    return hr ? hr.name : undefined;
  };

  // Filter self from manager/HR lists
  const potentialManagers = hosts.filter((h) => h.id !== currentUser.id);

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <title>Profile Settings | Ansh Visitor</title>
      <PageHeader
        eyebrow="My Account"
        title="Profile Settings"
        description="View and update your personal employee details, emergency contacts, and job profile."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT COLUMN: USER SUMMARY CARD */}
        <Card className="crm-card flex flex-col items-center justify-between p-6 h-full min-h-[420px]">
          <div className="flex flex-col items-center text-center w-full">
            {/* Avatar block with initials */}
            <div className="h-24 w-24 rounded-3xl bg-blue-500/10 text-blue-600 dark:bg-blue-950/30 dark:text-blue-450 border border-blue-500/20 flex items-center justify-center font-black text-3xl shadow-sm mb-4 transition-transform hover:scale-105">
              {currentUser.avatarInitials || "U"}
            </div>
            
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {currentUser.name}
            </h2>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1.5 bg-blue-500/5 px-2.5 py-0.5 rounded-full border border-blue-500/10">
              {currentUser.role || "EMPLOYEE"}
            </span>
          </div>

          <div className="w-full mt-8 divide-y divide-slate-100 dark:divide-slate-800/60 border-t border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center justify-between py-3.5 text-xs">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <Briefcase className="h-4 w-4 text-slate-400" />
                <span>Department</span>
              </div>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                {currentUser.department || "General"}
              </span>
            </div>

            <div className="flex items-center justify-between py-3.5 text-xs">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <Building className="h-4 w-4 text-slate-400" />
                <span>Office Branch</span>
              </div>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                {formatUpperVal(currentUser.officeBranch, "NOT ASSIGNED")}
              </span>
            </div>

            <div className="flex items-center justify-between py-3.5 text-xs">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <CreditCard className="h-4 w-4 text-slate-400" />
                <span>Employee Code</span>
              </div>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                {formatUpperVal(currentUser.code, "N/A")}
              </span>
            </div>

            <div className="flex items-center justify-between py-3.5 text-xs">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <Droplet className="h-4 w-4 text-rose-500/80" />
                <span>Blood Group</span>
              </div>
              <span className="font-extrabold text-slate-800 dark:text-slate-200">
                {formatUpperVal(currentUser.bloodGroup, "NOT SPECIFIED")}
              </span>
            </div>
          </div>
        </Card>

        {/* RIGHT COLUMN: PERSONAL & CONTACT INFORMATION */}
        <Card className="crm-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <User className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-350">
                Personal & Contact Information
              </h3>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenEditModal(true)}
              className="text-xs border-slate-200 dark:border-slate-800 gap-1.5 cursor-pointer h-9 px-4 rounded-xl text-slate-655 hover:bg-slate-50 dark:hover:bg-slate-850 dark:text-slate-300 font-semibold"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
          </div>

          {/* SUBSECTION: IDENTITY DETAILS */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-blue-655 dark:text-blue-400 uppercase tracking-widest block">
              Identity Details
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Full Name
                </span>
                <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
                  {formatVal(currentUser.name)}
                </span>
              </div>

              <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Date of Birth
                </span>
                <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
                  {formatVal(currentUser.dob)}
                </span>
              </div>

              <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Blood Group
                </span>
                <span className="block text-sm font-extrabold text-slate-855 dark:text-white mt-1">
                  {formatUpperVal(currentUser.bloodGroup, "NOT SPECIFIED")}
                </span>
              </div>
            </div>
          </div>

          {/* SUBSECTION: CONTACT COORDINATES */}
          <div className="space-y-4 mt-6">
            <span className="text-[10px] font-bold text-blue-655 dark:text-blue-400 uppercase tracking-widest block">
              Contact Coordinates
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Phone Number
                </span>
                <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
                  {formatVal(currentUser.phone)}
                </span>
              </div>

              <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Personal Email
                </span>
                <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
                  {formatVal(currentUser.personalEmail)}
                </span>
              </div>
            </div>
          </div>

          {/* SUBSECTION: EMERGENCY CONTACT DETAILS */}
          <div className="space-y-4 mt-6">
            <span className="text-[10px] font-bold text-blue-655 dark:text-blue-400 uppercase tracking-widest block">
              Emergency Contact Details
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Contact Name
                </span>
                <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
                  {formatVal(currentUser.emergencyName)}
                </span>
              </div>

              <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Contact Phone
                </span>
                <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
                  {formatVal(currentUser.emergencyPhone)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* FULL WIDTH BOTTOM CARD: PROFESSIONAL DETAILS & EMPLOYMENT STATUS */}
      <Card className="crm-card p-6">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-4 mb-6">
          <Building className="h-4.5 w-4.5 text-blue-650" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-350">
            Professional Details & Employment Status
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Employee Code
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatUpperVal(currentUser.code, "N/A")}
            </span>
          </div>

          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Designation
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatVal(currentUser.designation || currentUser.role)}
            </span>
          </div>

          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Assigned Branch
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatVal(currentUser.officeBranch)}
            </span>
          </div>

          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Reporting Manager
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatVal(getManagerName(currentUser.reportingManager))}
            </span>
          </div>

          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Reporting HR
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatVal(getHRName(currentUser.reportingHR))}
            </span>
          </div>

          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Employment Type
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatVal(currentUser.workLocation)}
            </span>
          </div>

          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Work Location
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatVal(currentUser.workLocation)}
            </span>
          </div>

          <div className="border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-900/10">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Joining Date
            </span>
            <span className="block text-sm font-extrabold text-slate-850 dark:text-white mt-1">
              {formatVal(currentUser.joiningDate)}
            </span>
          </div>
        </div>
      </Card>

      {/* COMPREHENSIVE EDIT PROFILE MODAL DIALOG */}
      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="sm:max-w-[580px] text-slate-800 dark:text-slate-100 p-0 overflow-hidden">
          <form onSubmit={handleSaveProfile}>
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-600" />
                <DialogTitle className="text-base font-extrabold tracking-wide uppercase">
                  EDIT MY PROFILE DETAILS
                </DialogTitle>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <div className="px-6 py-6 space-y-6 max-h-[62vh] overflow-y-auto">
              
              {/* Section 1: Identity & Personal */}
              <div className="space-y-4">
                <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
                  1. Identity & Personal Details
                </span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Full Name
                    </label>
                    <Input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Raj"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Blood Group
                    </label>
                    <Select
                      value={bloodGroupVal}
                      onChange={(e) => setBloodGroupVal(e.target.value)}
                      className="mt-2"
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

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={dobVal}
                    onChange={(e) => setDobVal(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Section 2: Contact coordinates */}
              <div className="space-y-4">
                <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
                  2. Contact Coordinates
                </span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Phone Number
                    </label>
                    <Input
                      value={phoneVal}
                      onChange={(e) => setPhoneVal(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Personal Email
                    </label>
                    <Input
                      type="email"
                      value={personalEmailVal}
                      onChange={(e) => setPersonalEmailVal(e.target.value)}
                      placeholder="e.g. rahul.personal@gmail.com"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Emergency contact info */}
              <div className="space-y-4">
                <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
                  3. Emergency Contact Details
                </span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Emergency Contact Name
                    </label>
                    <Input
                      value={emergencyNameVal}
                      onChange={(e) => setEmergencyNameVal(e.target.value)}
                      placeholder="Sibling or Parent Name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Emergency Contact Phone
                    </label>
                    <Input
                      value={emergencyPhoneVal}
                      onChange={(e) => setEmergencyPhoneVal(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Professional & Job Details */}
              <div className="space-y-4">
                <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
                  4. Professional Details
                </span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Employee Code
                    </label>
                    <Input
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                      placeholder="e.g. ANSH-001"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Joining Date
                    </label>
                    <Input
                      type="date"
                      value={joiningDateVal}
                      onChange={(e) => setJoiningDateVal(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Designation
                    </label>
                    <Select
                      value={designationVal}
                      onChange={(e) => setDesignationVal(e.target.value)}
                      className="mt-2"
                    >
                      {designations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Department
                    </label>
                    <Select
                      value={departmentVal}
                      onChange={(e) => setDepartmentVal(e.target.value)}
                      className="mt-2"
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
                      Office Branch
                    </label>
                    <Select
                      value={officeBranchVal}
                      onChange={(e) => setOfficeBranchVal(e.target.value)}
                      className="mt-2"
                    >
                      {officeBranches.map((ob) => (
                        <option key={ob} value={ob}>
                          {ob}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Work Location
                    </label>
                    <Select
                      value={workLocationVal}
                      onChange={(e) => setWorkLocationVal(e.target.value)}
                      className="mt-2"
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
                      value={reportingManagerVal}
                      onChange={(e) => setReportingManagerVal(e.target.value)}
                      className="mt-2"
                    >
                      <option value="">Select Manager</option>
                      {potentialManagers.map((h) => (
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
                      value={reportingHRVal}
                      onChange={(e) => setReportingHRVal(e.target.value)}
                      className="mt-2"
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

            </div>

            {/* Modal Footer */}
            <DialogFooter className="px-6 py-5 border-t border-border/40 bg-slate-50/50 dark:bg-slate-900/50 flex sm:items-center sm:justify-between gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpenEditModal(false)}
                className="w-full sm:w-36 h-10 text-xs font-semibold cursor-pointer rounded-xl"
              >
                Cancel
              </Button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {saved && (
                  <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                    ✓ Saved!
                  </span>
                )}
                <Button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-44 h-10 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white border-0 cursor-pointer rounded-xl flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <ButtonLoadingSkeleton />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Profile
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
