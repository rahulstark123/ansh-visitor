"use client";

import { useState } from "react";
import { useVisitorStore } from "@/stores/visitor-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/crm/page-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Briefcase, Building, MapPin, Trash2, Plus, Sliders, AlertTriangle } from "lucide-react";

type DeleteTarget = {
  type: "department" | "designation" | "officeBranch";
  value: string;
} | null;

export default function WorkspaceSettingsPage() {
  const {
    departments,
    designations,
    officeBranches,
    addDepartment,
    deleteDepartment,
    addDesignation,
    deleteDesignation,
    addOfficeBranch,
    deleteOfficeBranch,
  } = useVisitorStore();

  // Input States
  const [newDept, setNewDept] = useState("");
  const [newDesig, setNewDesig] = useState("");
  const [newBranch, setNewBranch] = useState("");

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteTarget>(null);

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDept.trim()) return;
    addDepartment(newDept.trim());
    setNewDept("");
  };

  const handleAddDesig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesig.trim()) return;
    addDesignation(newDesig.trim());
    setNewDesig("");
  };

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.trim()) return;
    addOfficeBranch(newBranch.trim());
    setNewBranch("");
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === "department") deleteDepartment(deleteConfirm.value);
    else if (deleteConfirm.type === "designation") deleteDesignation(deleteConfirm.value);
    else if (deleteConfirm.type === "officeBranch") deleteOfficeBranch(deleteConfirm.value);
    setDeleteConfirm(null);
  };

  const typeLabel: Record<NonNullable<DeleteTarget>["type"], string> = {
    department: "Department",
    designation: "Designation",
    officeBranch: "Office Branch",
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <title>Workspace Settings | Ansh Visitor</title>
      <PageHeader
        eyebrow="Organization Config"
        title="Workspace Settings"
        description="Manage the default department lists, employee designations, and office branch locations for your directory."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* DEPARTMENTS CARD */}
        <Card className="crm-card h-[500px] flex flex-col">
          <CardHeader className="border-b border-border/40 pb-4 flex flex-row items-center gap-2 space-y-0">
            <Briefcase className="h-4.5 w-4.5 text-primary shrink-0" />
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350">
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col min-h-0">
            {/* Add Input Form */}
            <form onSubmit={handleAddDept} className="flex gap-2 mb-4 shrink-0">
              <Input
                value={newDept}
                onChange={(e) => setNewDept(e.target.value)}
                placeholder="e.g. Sales, Operations"
                className="h-9 text-xs"
              />
              <Button
                type="submit"
                size="icon-sm"
                className="h-9 w-9 shrink-0 cursor-pointer rounded-xl"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </form>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1.5 min-h-0 scrollbar-thin">
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <div
                    key={dept}
                    className="border border-slate-100 dark:border-slate-800/60 rounded-xl p-3 flex items-center justify-between bg-slate-50/20 dark:bg-slate-900/10 hover:border-slate-200 dark:hover:border-slate-700 transition-colors animate-in fade-in zoom-in-95 duration-150"
                  >
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate pr-2">
                      {dept}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm({ type: "department", value: dept })}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                      title="Delete Department"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400 italic text-xs">
                  No departments configured.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* DESIGNATIONS CARD */}
        <Card className="crm-card h-[500px] flex flex-col">
          <CardHeader className="border-b border-border/40 pb-4 flex flex-row items-center gap-2 space-y-0">
            <Sliders className="h-4.5 w-4.5 text-primary shrink-0" />
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350">
              Designations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col min-h-0">
            {/* Add Input Form */}
            <form onSubmit={handleAddDesig} className="flex gap-2 mb-4 shrink-0">
              <Input
                value={newDesig}
                onChange={(e) => setNewDesig(e.target.value)}
                placeholder="e.g. Project Manager"
                className="h-9 text-xs"
              />
              <Button
                type="submit"
                size="icon-sm"
                className="h-9 w-9 shrink-0 cursor-pointer rounded-xl"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </form>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1.5 min-h-0 scrollbar-thin">
              {designations.length > 0 ? (
                designations.map((desig) => (
                  <div
                    key={desig}
                    className="border border-slate-100 dark:border-slate-800/60 rounded-xl p-3 flex items-center justify-between bg-slate-50/20 dark:bg-slate-900/10 hover:border-slate-200 dark:hover:border-slate-700 transition-colors animate-in fade-in zoom-in-95 duration-150"
                  >
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate pr-2">
                      {desig}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm({ type: "designation", value: desig })}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                      title="Delete Designation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400 italic text-xs">
                  No designations configured.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* OFFICE BRANCHES CARD */}
        <Card className="crm-card h-[500px] flex flex-col">
          <CardHeader className="border-b border-border/40 pb-4 flex flex-row items-center gap-2 space-y-0">
            <MapPin className="h-4.5 w-4.5 text-primary shrink-0" />
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350">
              Office Branches
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col min-h-0">
            {/* Add Input Form */}
            <form onSubmit={handleAddBranch} className="flex gap-2 mb-4 shrink-0">
              <Input
                value={newBranch}
                onChange={(e) => setNewBranch(e.target.value)}
                placeholder="e.g. Bangalore Branch, HQ-2"
                className="h-9 text-xs"
              />
              <Button
                type="submit"
                size="icon-sm"
                className="h-9 w-9 shrink-0 cursor-pointer rounded-xl"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </form>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1.5 min-h-0 scrollbar-thin">
              {officeBranches.length > 0 ? (
                officeBranches.map((branch) => (
                  <div
                    key={branch}
                    className="border border-slate-100 dark:border-slate-800/60 rounded-xl p-3 flex items-center justify-between bg-slate-50/20 dark:bg-slate-900/10 hover:border-slate-200 dark:hover:border-slate-700 transition-colors animate-in fade-in zoom-in-95 duration-150"
                  >
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate pr-2">
                      {branch}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirm({ type: "officeBranch", value: branch })}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                      title="Delete Branch"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400 italic text-xs">
                  No office branches configured.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ── DELETE CONFIRMATION DIALOG ── */}
      <Dialog
        open={deleteConfirm !== null}
        onOpenChange={(open) => { if (!open) setDeleteConfirm(null); }}
      >
        <DialogContent className="sm:max-w-[420px]" showCloseButton={false}>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <DialogTitle className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                Delete {deleteConfirm ? typeLabel[deleteConfirm.type] : ""}?
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
              You are about to remove{" "}
              <span className="font-bold text-slate-800 dark:text-slate-200">
                &ldquo;{deleteConfirm?.value}&rdquo;
              </span>{" "}
              from the workspace {deleteConfirm ? typeLabel[deleteConfirm.type].toLowerCase() : ""} list.
              <br />
              <br />
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                ⚠ Team members currently assigned to this {deleteConfirm ? typeLabel[deleteConfirm.type].toLowerCase() : ""} will need to be manually updated to a new option.
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setDeleteConfirm(null)}
              className="w-full sm:w-28 h-10 text-sm font-semibold cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
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
