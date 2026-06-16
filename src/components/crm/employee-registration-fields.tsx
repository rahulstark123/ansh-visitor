"use client";

import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { isOwnCompany } from "@/lib/own-company";

export interface EmployeeOption {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface EmployeeRegistrationFieldsProps {
  workspaceName: string;
  company: string;
  employees: EmployeeOption[];
  isEmployee: boolean;
  onIsEmployeeChange: (value: boolean) => void;
  selectedEmployeeId: string;
  onEmployeeSelect: (employeeId: string) => void;
  /** Always show on public My Link forms; CRM shows when company matches workspace. */
  alwaysVisible?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export function EmployeeRegistrationFields({
  workspaceName,
  company,
  employees,
  isEmployee,
  onIsEmployeeChange,
  selectedEmployeeId,
  onEmployeeSelect,
  alwaysVisible = false,
  className,
  labelClassName = "block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400",
  selectClassName = "mt-2 bg-card border-input text-foreground",
}: EmployeeRegistrationFieldsProps) {
  const visible =
    alwaysVisible || isOwnCompany(company, workspaceName) || isEmployee;

  if (!visible) return null;

  const activeEmployees = employees.filter((e) => e.name?.trim());

  return (
    <div
      className={cn(
        "rounded-xl border border-emerald-200/60 bg-emerald-50/40 p-4 space-y-3 dark:border-emerald-900/40 dark:bg-emerald-950/20",
        className
      )}
    >
      <label className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
        <input
          type="checkbox"
          checked={isEmployee}
          onChange={(e) => onIsEmployeeChange(e.target.checked)}
          className="h-4 w-4 rounded border-emerald-400 text-emerald-600 focus:ring-emerald-500"
        />
        Employee
        <span className="text-[10px] font-normal uppercase tracking-wider text-slate-400">
          (Optional)
        </span>
      </label>
      <p className="text-xs text-slate-500 leading-relaxed">
        Visiting from {workspaceName}? Toggle on to pick yourself or a colleague from the directory.
      </p>

      {isEmployee && (
        <div>
          <label className={labelClassName}>
            Select Employee (Optional)
          </label>
          {activeEmployees.length > 0 ? (
            <Select
              value={selectedEmployeeId}
              onChange={(e) => onEmployeeSelect(e.target.value)}
              className={selectClassName}
            >
              <option value="">Choose an employee...</option>
              {activeEmployees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                  {employee.email ? ` · ${employee.email}` : ""}
                </option>
              ))}
            </Select>
          ) : (
            <p className="mt-2 text-xs text-slate-400 italic">
              No employees found in your team directory.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function applyEmployeeSelection(
  employee: EmployeeOption | undefined,
  workspaceName: string
): { name: string; email: string; phone: string; company: string } | null {
  if (!employee) return null;
  return {
    name: employee.name,
    email: employee.email || "",
    phone: employee.phone || "",
    company: workspaceName,
  };
}
