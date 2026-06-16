import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Ansh Visitor",
  description: "Terms and conditions for using Ansh Visitor and related services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 lg:px-12">
        <p className="page-eyebrow">Legal Agreement</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 16 April 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              These Terms &amp; Conditions govern your use of Ansh Visitor, including our website, web
              application, and related services. By using Ansh Visitor, you agree to these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Service Description</h2>
            <p>
              Ansh Visitor is a visitor management platform for modern organizations and growing teams.
              Features may include visitor check-ins, QR-based passes, host notifications, visitor logs,
              approvals workflows, and analytics reports.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Account Responsibility</h2>
            <p>
              You are responsible for all activity under your account, including the security of your
              credentials and the accuracy of information you provide. You must promptly report
              unauthorized access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Subscription, Billing, and Renewal</h2>
            <p>
              Paid plans are billed in advance via our payment partner. You authorize us (and our
              payment processor) to charge applicable subscription fees, taxes, and related charges.
              Pricing, feature limits, and plan terms may be updated with prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Cancellation and No-Refund Policy</h2>
            <p>
              You may cancel your subscription at any time. Your access to paid features continues until
              the end of the current billing cycle. However, all fees paid are non-refundable.
            </p>
            <p>
              <span className="font-semibold text-foreground">Important No-Refunds Notice:</span> No
              refunds are provided for subscription cancellations, account deletions, or partial usage of
              paid plans.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">6. Acceptable Use</h2>
            <p>
              You must not misuse the service, attempt unauthorized access, reverse engineer critical
              components, distribute malware, or use the platform in violation of applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">7. Data, Privacy, and Compliance</h2>
            <p>
              Your use of the service is also governed by our Privacy Policy. We follow applicable Indian
              legal requirements, including relevant provisions under the Information Technology Act, 2000
              and evolving requirements under India&apos;s Digital Personal Data Protection framework.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">8. Service Availability</h2>
            <p>
              We aim for reliable availability but do not guarantee uninterrupted service. We may perform
              maintenance, updates, and emergency fixes that can temporarily affect access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Ansh Visitor is not liable for indirect,
              incidental, special, or consequential damages. Our aggregate liability for claims related
              to paid services is limited to the subscription fees paid by you for the affected billing
              cycle.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">10. Governing Law and Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India. Courts with competent jurisdiction in India
              will have jurisdiction over disputes arising out of these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">11. Contact</h2>
            <p>
              For legal, billing, or policy questions, contact us at{" "}
              <a className="text-primary hover:underline" href="mailto:support@anshapps.com">
                support@anshapps.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
