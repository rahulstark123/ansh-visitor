export interface RegistrationFieldConfig {
  nameRequired: boolean;
  phoneRequired: boolean;
  emailRequired: boolean;
  purposeRequired: boolean;
  idProofRequired: boolean;
  companyEnabled: boolean;
  companyRequired: boolean;
  notesEnabled: boolean;
  notesRequired: boolean;
}

export const DEFAULT_REGISTRATION_FIELD_CONFIG: RegistrationFieldConfig = {
  nameRequired: true,
  phoneRequired: false,
  emailRequired: false,
  purposeRequired: false,
  idProofRequired: false,
  companyEnabled: true,
  companyRequired: false,
  notesEnabled: true,
  notesRequired: false,
};

export function fieldConfigFromLink(link: {
  fieldNameRequired: boolean;
  fieldPhoneRequired: boolean;
  fieldEmailRequired: boolean;
  fieldPurposeRequired: boolean;
  fieldIdProofRequired: boolean;
  fieldCompanyEnabled: boolean;
  fieldCompanyRequired: boolean;
  fieldNotesEnabled: boolean;
  fieldNotesRequired: boolean;
}): RegistrationFieldConfig {
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

export function validateRegistrationPayload(
  payload: {
    name?: string;
    phone?: string;
    email?: string;
    purpose?: string;
    idProofType?: string;
    idProofNumber?: string;
    company?: string;
    notes?: string;
  },
  config: RegistrationFieldConfig
): string | null {
  if (config.nameRequired && !payload.name?.trim()) {
    return "Full name is required";
  }
  if (config.phoneRequired && !payload.phone?.trim()) {
    return "Phone number is required";
  }
  if (config.emailRequired && !payload.email?.trim()) {
    return "Email is required";
  }
  if (config.purposeRequired && !payload.purpose?.trim()) {
    return "Visit purpose is required";
  }
  if (config.companyRequired && !payload.company?.trim()) {
    return "Company name is required";
  }
  if (config.notesRequired && !payload.notes?.trim()) {
    return "Notes are required";
  }
  if (config.idProofRequired) {
    if (!payload.idProofType?.trim()) return "Government ID type is required";
    if (!payload.idProofNumber?.trim()) return "Government ID number is required";
  }
  if (payload.idProofType && !payload.idProofNumber?.trim()) {
    return "Government ID number is required when ID type is selected";
  }
  if (payload.idProofNumber && !payload.idProofType?.trim()) {
    return "Government ID type is required when ID number is provided";
  }

  const hasIdentity =
    Boolean(payload.name?.trim()) ||
    Boolean(payload.phone?.trim()) ||
    Boolean(payload.email?.trim());

  if (!hasIdentity) {
    return "Provide at least your name, phone, or email";
  }

  return null;
}

export function fieldLabel(label: string, required: boolean): string {
  return required ? label : `${label} (Optional)`;
}
