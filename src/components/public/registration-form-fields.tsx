"use client";

import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  fieldLabel,
  type RegistrationFieldConfig,
} from "@/lib/registration-link-fields";
import {
  getPublicPhoneFieldVariant,
  type RegistrationDesignTheme,
} from "@/config/registration-link-designs";
import { getFieldStyles } from "@/components/public/registration-form-styles";

export interface RegistrationFormValues {
  name: string;
  phone: string;
  email: string;
  company: string;
  purpose: string;
  idProofType: string;
  idProofNumber: string;
  notes: string;
}

interface RegistrationFormFieldsProps {
  themeId: RegistrationDesignTheme | string;
  fieldConfig: RegistrationFieldConfig;
  values: RegistrationFormValues;
  onChange: <K extends keyof RegistrationFormValues>(
    key: K,
    value: RegistrationFormValues[K]
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  preview: boolean;
  error: string | null;
  buttonClass: string;
  submitLabel?: string;
}

export function RegistrationFormFields({
  themeId,
  fieldConfig,
  values,
  onChange,
  onSubmit,
  submitting,
  preview,
  error,
  buttonClass,
  submitLabel = "Pre-register Visit",
}: RegistrationFormFieldsProps) {
  const variant = (themeId as RegistrationDesignTheme) || "classic";
  const styles = getFieldStyles(variant);
  const phoneFieldVariant = getPublicPhoneFieldVariant(themeId);

  return (
    <form onSubmit={onSubmit} className={styles.formSpacing}>
      <div>
        <label className={styles.label}>
          {fieldLabel("Your Full Name", fieldConfig.nameRequired)}
        </label>
        <Input
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Jane Doe"
          required={fieldConfig.nameRequired}
          className={styles.input}
        />
      </div>

      <div className={styles.gridSpacing}>
        <div>
          <label className={styles.label}>
            {fieldLabel("Phone Number", fieldConfig.phoneRequired)}
          </label>
          <div
            className={cn(
              "public-phone-field",
              `public-phone-field--${phoneFieldVariant}`,
              variant === "minimal" && "public-phone-field--minimal"
            )}
          >
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              value={values.phone}
              onChange={(val) => onChange("phone", val || "")}
              defaultCountry="IN"
              placeholder="Enter phone number"
            />
          </div>
        </div>
        <div>
          <label className={styles.label}>
            {fieldLabel("Email", fieldConfig.emailRequired)}
          </label>
          <Input
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="jane@company.com"
            required={fieldConfig.emailRequired}
            className={styles.input}
          />
        </div>
      </div>

      {fieldConfig.companyEnabled && (
        <div>
          <label className={styles.label}>
            {fieldLabel("Company Name", fieldConfig.companyRequired)}
          </label>
          <Input
            value={values.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Acme Corp"
            required={fieldConfig.companyRequired}
            className={styles.input}
          />
        </div>
      )}

      <div>
        <label className={styles.label}>
          {fieldLabel("Visit Purpose", fieldConfig.purposeRequired)}
        </label>
        <Select
          value={values.purpose}
          onChange={(e) => onChange("purpose", e.target.value)}
          required={fieldConfig.purposeRequired}
          className={styles.select}
        >
          <option value="Meeting">Meeting</option>
          <option value="Interview">Interview</option>
          <option value="Vendor">Vendor</option>
          <option value="Delivery">Delivery</option>
          <option value="Other">Other</option>
        </Select>
      </div>

      <div className={styles.gridSpacing}>
        <div>
          <label className={styles.label}>
            {fieldLabel("Govt ID Type", fieldConfig.idProofRequired)}
          </label>
          <Select
            value={values.idProofType}
            onChange={(e) => onChange("idProofType", e.target.value)}
            required={fieldConfig.idProofRequired}
            className={styles.select}
          >
            <option value="">
              {fieldConfig.idProofRequired ? "Select ID type" : "No ID Card Provided"}
            </option>
            <option value="Aadhaar Card">Aadhaar Card</option>
            <option value="PAN Card">PAN Card</option>
            <option value="Driving License">Driving License</option>
            <option value="Passport">Passport</option>
            <option value="Voter ID">Voter ID</option>
          </Select>
        </div>
        <div>
          <label className={styles.label}>
            {fieldLabel("Govt ID Number", fieldConfig.idProofRequired)}
          </label>
          <Input
            value={values.idProofNumber}
            onChange={(e) => onChange("idProofNumber", e.target.value)}
            placeholder="e.g. ABCD1234E"
            disabled={!values.idProofType && !fieldConfig.idProofRequired}
            required={fieldConfig.idProofRequired}
            className={styles.input}
          />
        </div>
      </div>

      {fieldConfig.notesEnabled && (
        <div>
          <label className={styles.label}>
            {fieldLabel("Special Notes", fieldConfig.notesRequired)}
          </label>
          <textarea
            value={values.notes}
            onChange={(e) => onChange("notes", e.target.value)}
            placeholder="Parking, accessibility, or other details..."
            required={fieldConfig.notesRequired}
            className={cn(
              "block w-full text-sm outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
              styles.textarea
            )}
          />
        </div>
      )}

      {error && (
        <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={preview || submitting}
        className={cn(
          "h-11 w-full border-0 font-semibold",
          buttonClass,
          variant === "minimal" && "rounded-none",
          variant === "bold" && "rounded-lg font-black uppercase tracking-wider text-sm"
        )}
      >
        {preview ? "Preview Only" : submitting ? "Submitting..." : submitLabel}
      </Button>
    </form>
  );
}
