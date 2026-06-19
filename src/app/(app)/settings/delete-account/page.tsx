"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/crm/page-header";
import { UserX, Mail } from "lucide-react";

const SUPPORT_EMAIL = "support@anshapps.com";

export default function DeleteAccountPage() {
  return (
    <div className="space-y-6 select-none animate-in fade-in duration-300">
      <title>Delete Account | Ansh Visitor</title>
      <PageHeader
        eyebrow="Account Management"
        title="Delete Account"
        description="Request permanent deletion of your ANSH Visitor account and associated data."
      />

      <Card className="crm-card max-w-3xl">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100 dark:border-slate-800/60">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
              <UserX className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Delete Your ANSH Visitor Account
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            If you would like to delete your ANSH Visitor account and associated data, please send
            an email from your registered email address to:
          </p>

          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Account%20Deletion%20Request`}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-500/10 dark:text-blue-400"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {SUPPORT_EMAIL}
          </a>

          <p className="text-sm text-slate-600 dark:text-slate-350">
            <span className="font-bold text-slate-800 dark:text-slate-200">Subject:</span>{" "}
            Account Deletion Request
          </p>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            Our team will verify your request and process account deletion within 7 business days.
          </p>

          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Upon successful deletion:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-350">
              <li>Your account will be permanently deleted.</li>
              <li>Your profile information will be removed.</li>
              <li>Your authentication credentials will be deleted.</li>
              <li>Any active subscription will be cancelled and revoked.</li>
              <li>
                Any personal data associated with your account will be removed from our systems.
              </li>
            </ul>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-350">
            If you have any questions regarding account deletion, please contact us at{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>

          <p className="text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800/60">
            Last Updated: June 2026
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
