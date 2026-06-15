export type RegistrationDesignTheme =
  | "classic"
  | "modern"
  | "minimal"
  | "bold"
  | "glass";

export const REGISTRATION_DESIGN_THEMES: {
  id: RegistrationDesignTheme;
  label: string;
  description: string;
  preview: {
    page: string;
    card: string;
    accent: string;
    button: string;
  };
}[] = [
  {
    id: "classic",
    label: "Classic",
    description: "Corporate card with accent stripe & stacked form",
    preview: {
      page: "bg-slate-100",
      card: "bg-white border border-slate-200 shadow-lg",
      accent: "text-sky-600",
      button: "bg-sky-600 hover:bg-sky-700 text-white",
    },
  },
  {
    id: "modern",
    label: "Modern",
    description: "Split layout — visit info sidebar + form panel",
    preview: {
      page: "bg-gradient-to-br from-indigo-50 via-white to-sky-50",
      card: "bg-white/90 border-0 shadow-xl ring-1 ring-indigo-100",
      accent: "text-indigo-600",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Editorial layout with underline-only fields",
    preview: {
      page: "bg-white",
      card: "bg-white border border-slate-200 shadow-none",
      accent: "text-slate-700",
      button: "bg-slate-900 hover:bg-slate-800 text-white",
    },
  },
  {
    id: "bold",
    label: "Bold",
    description: "Two-column dark layout with accent sidebar",
    preview: {
      page: "bg-slate-950",
      card: "bg-slate-900 border border-slate-800 shadow-2xl",
      accent: "text-emerald-400",
      button: "bg-emerald-500 hover:bg-emerald-600 text-slate-950",
    },
  },
  {
    id: "glass",
    label: "Glass",
    description: "Floating frosted card with info pills",
    preview: {
      page: "bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400",
      card: "bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl",
      accent: "text-white",
      button: "bg-white/90 hover:bg-white text-violet-700",
    },
  },
];

export function getRegistrationDesignTheme(id: string) {
  return (
    REGISTRATION_DESIGN_THEMES.find((theme) => theme.id === id) ??
    REGISTRATION_DESIGN_THEMES[0]
  );
}

export type PublicPhoneFieldVariant = "light" | "dark" | "glass";

export function getPublicPhoneFieldVariant(
  themeId: string
): PublicPhoneFieldVariant {
  if (themeId === "bold") return "dark";
  if (themeId === "glass") return "glass";
  return "light";
}

export const REGISTRATION_DESIGN_THEME_IDS = REGISTRATION_DESIGN_THEMES.map(
  (theme) => theme.id
);
