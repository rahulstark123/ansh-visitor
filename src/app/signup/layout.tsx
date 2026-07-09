import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sign Up",
  description:
    "Create your free ANSH Visitor workspace. QR passes, lobby check-in, and visitor logs at visitor.anshapps.com.",
  path: "/signup",
});

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
