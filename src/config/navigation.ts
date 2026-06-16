import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UsersRound,
  BarChart3,
  Settings,
  User,
  Building,
  ClipboardList,
  Contact,
  Users,
  CreditCard,
  Link2,
} from "lucide-react";

export type NavSectionId =
  | "dashboard"
  | "visitors"
  | "team"
  | "reports"
  | "settings";

export interface SubNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface MainNavItem {
  id: NavSectionId;
  label: string;
  href: string;
  icon: LucideIcon;
  subNav?: SubNavItem[];
}

export const mainNav: MainNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "visitors",
    label: "Visitors Log",
    href: "/visitors",
    icon: UsersRound,
    subNav: [
      { id: "today-visitors", label: "Today's Guests", href: "/visitors", icon: Contact },
      { id: "pre-registered", label: "Registered Users", href: "/visitors/pre-registered", icon: ClipboardList },
      { id: "all-visitors", label: "All Visitors Log", href: "/visitors/all", icon: UsersRound },
      { id: "my-link", label: "My Link", href: "/visitors/my-link", icon: Link2 },
    ],
  },
  {
    id: "team",
    label: "Team Directory",
    href: "/team",
    icon: Users,
  },
  {
    id: "reports",
    label: "Reports & Audits",
    href: "/reports",
    icon: BarChart3,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings/profile",
    icon: Settings,
    subNav: [
      { id: "profile", label: "Profile Settings", href: "/settings/profile", icon: User },
      { id: "company", label: "Company Settings", href: "/settings/company", icon: Building },
      { id: "billing", label: "Billing", href: "/settings/billing", icon: CreditCard },
      { id: "workspace", label: "Workspace Settings", href: "/settings/workspace", icon: Settings },
    ],
  },
];

export function getSectionFromPath(pathname: string): NavSectionId | null {
  if (pathname === "/dashboard" || pathname === "/") return "dashboard";
  if (pathname === "/our-apps" || pathname.startsWith("/our-apps/")) return null;
  if (pathname === "/help" || pathname.startsWith("/help/")) return null;
  const segment = pathname.split("/")[1] as NavSectionId;
  const match = mainNav.find((item) => item.id === segment);
  return match?.id ?? null;
}

export function getSubNavForSection(sectionId: NavSectionId | null): SubNavItem[] | undefined {
  if (!sectionId) return undefined;
  return mainNav.find((item) => item.id === sectionId)?.subNav;
}

export function getSectionMeta(sectionId: NavSectionId | null) {
  if (!sectionId) return undefined;
  return mainNav.find((item) => item.id === sectionId);
}
