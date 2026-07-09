import { SITE_NAME, SITE_URL } from "@/lib/site";

export const WHAT_VISITOR_DOES =
  "ANSH Visitor helps offices, schools, colleges, hostels, hospitals, and businesses manage visitor entries digitally. Replace paper registers with QR passes, real-time check-in logs, host approvals, and secure visitor records from visitor.anshapps.com — with Android apps on Google Play and Indus Appstore.";

export const LANDING_FEATURES = [
  "Instant QR visitor passes and 6-digit desk passcodes",
  "Government ID verification (Aadhaar, PAN, Passport)",
  "Public My Links for zero-login visitor pre-registration",
  "Lobby desk quick check-in and check-out",
  "Team directory, branches, and host notifications",
  "Reports, audit logs, and compliance-ready exports",
  "Free plan forever with optional Pro upgrade",
  "Mobile apps for Android reception desks",
] as const;

export const LANDING_FAQS = [
  {
    question: "Is ANSH Visitor free to use?",
    answer:
      "Yes. The Free plan is available forever with no credit card required. It covers visitor check-ins, QR passes, and core lobby tools. Upgrade to Pro anytime for unlimited teammates, My Links, custom badges, and advanced reports.",
  },
  {
    question: "Can visitors register without creating an account?",
    answer:
      "Yes. With My Links, you share your workspace URL at visitor.anshapps.com/register/your-workspace. Visitors fill in their details and receive a QR pass and 6-digit passcode — no login required.",
  },
  {
    question: "How does the QR pass system work?",
    answer:
      "When a visitor is pre-registered, a unique QR code and 6-digit passcode are generated. At check-in, the front desk scans the QR or enters the passcode to verify and check them in instantly.",
  },
  {
    question: "What government IDs are supported for verification?",
    answer:
      "ANSH Visitor supports Aadhaar Card, PAN Card, and Passport for on-arrival ID verification. Verified details can be embedded into the printed visit pass for compliance.",
  },
  {
    question: "Can I customize the public registration page?",
    answer:
      "Yes. My Links registration pages support light, dark, glass, and minimal themes with your workspace name and logo for a professional visitor experience.",
  },
  {
    question: "Is visitor data secure?",
    answer:
      "Yes. Sessions use Supabase authentication, payments are secured by Razorpay, and all connections are SSL encrypted. Visitor records are stored securely in your workspace.",
  },
] as const;

export const ECOSYSTEM_LINKS = [
  { name: "ANSH Tasks", href: "https://tasks.anshapps.com", description: "Team task and project tracker" },
  { name: "ANSH HR", href: "https://hr.anshapps.com", description: "Human resource management" },
  { name: "ANSH Expense", href: "https://expense.anshapps.com", description: "Expense and reimbursement tracking" },
  { name: SITE_NAME, href: SITE_URL, description: "Visitor and lobby management" },
] as const;

export const LANDING_H1 = `${SITE_NAME} — Secure Lobby & Visitor Management`;

export const LANDING_HERO_SUBLINE =
  "Speed up front-desk operations, verify government IDs, generate QR passes, and log every visit from one dashboard at visitor.anshapps.com.";
