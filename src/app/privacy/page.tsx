import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ansh Visitor",
  description: "Privacy policy for Ansh Visitor and related services.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 lg:px-12">
        <p className="page-eyebrow">Data Protection</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 16 April 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Ansh Visitor collects, uses, stores, and protects personal
              data when you use our website and services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <span className="font-semibold text-foreground">Account information:</span> name, email
                address, profile details.
              </li>
              <li>
                <span className="font-semibold text-foreground">Workspace information:</span> visitor
                records, host details, check-in/check-out logs, pass activity, support tickets, and
                collaboration activity.
              </li>
              <li>
                <span className="font-semibold text-foreground">Payment metadata:</span> transaction IDs,
                subscription status, billing timestamps.
              </li>
              <li>
                <span className="font-semibold text-foreground">Technical data:</span> device/browser
                data, IP-derived region, logs, and diagnostics.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. How We Use Data</h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                To provide visitor check-in, pass management, host notifications, and account features.
              </li>
              <li>To process subscriptions and payment verification.</li>
              <li>To send confirmations, service updates, and support communications.</li>
              <li>To improve reliability, security, and product experience.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Legal Basis and Consent</h2>
            <p>
              Where required, we process personal data based on consent, contractual necessity, legal
              obligations, or legitimate business interests. You may withdraw consent where applicable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Data Sharing</h2>
            <p>
              We may share data with trusted service providers required to deliver core features (for
              example, authentication, hosting, email, calendar, or payments), subject to contractual
              safeguards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">6. Data Retention</h2>
            <p>
              We retain personal data only as long as necessary for service delivery, legal compliance,
              dispute resolution, and security. Data may be deleted or anonymized when no longer required.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">7. Your Rights</h2>
            <p>
              Subject to applicable law, you may request access, correction, or deletion of your personal
              data.
            </p>
            <p>
              For any personal data requests, please contact us at{" "}
              <a className="text-primary hover:underline" href="mailto:support@anshapps.com">
                support@anshapps.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">8. Security</h2>
            <p>
              We implement reasonable technical and organizational safeguards to protect personal data from
              unauthorized access, loss, misuse, or alteration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">9. India-Specific Compliance Note</h2>
            <p>
              We aim to align privacy operations with applicable Indian law, including relevant
              requirements under the Information Technology Act, 2000 and India&apos;s evolving digital
              personal data protection framework.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">10. Billing and Refund Clarification</h2>
            <p>
              Payment and subscription terms (including cancellation and refund position) are described in
              our Terms &amp; Conditions. For clarity, Ansh Visitor does not provide refunds for
              user-initiated subscription cancellation or account deletion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">11. Policy Updates</h2>
            <p>
              We may update this policy from time to time. Material updates will be reflected on this
              page with a revised &quot;Last updated&quot; date.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
