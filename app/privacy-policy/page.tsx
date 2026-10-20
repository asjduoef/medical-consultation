import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Medical Consultation',
  description: 'Privacy Policy draft for the Medical Consultation website.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-warm-mesh py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Draft &mdash; This document is a draft and subject to review and finalisation.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none space-y-6 text-muted-foreground">
            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <p className="text-sm font-medium text-foreground">
                Important: This is a draft privacy policy. It has not been reviewed by a legal
                professional. Please consult a qualified lawyer before publishing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
              <p className="mt-2">
                This Privacy Policy describes how Medical Consultation (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) collects, uses, and protects your information when you use our website
                and services. By accessing this website, you agree to the practices described in
                this policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
              <p className="mt-2">We may collect the following types of information:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Account information: name, email address, and password (for registered users).</li>
                <li>Contact information: phone number and messages submitted through the contact form.</li>
                <li>Appointment-related information: [to be detailed when booking is implemented].</li>
                <li>Technical data: IP address, browser type, and usage data collected automatically.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p className="mt-2">We use your information to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Provide and manage your account and consultations.</li>
                <li>Respond to your enquiries and provide customer support.</li>
                <li>Send appointment-related notifications and reminders.</li>
                <li>Improve our website and services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">4. Data Security</h2>
              <p className="mt-2">
                We implement appropriate technical and organisational measures to protect your
                personal information. These include encrypted authentication, secure data storage,
                and access controls. However, no method of transmission over the Internet is
                completely secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">5. Data Retention</h2>
              <p className="mt-2">
                We retain your personal information for as long as your account is active or as
                necessary to provide our services. Specific retention periods for medical data
                will be defined in accordance with applicable regulations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
              <p className="mt-2">You have the right to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Access your personal information.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your account and associated data.</li>
                <li>Opt out of non-essential communications.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">7. Third-Party Services</h2>
              <p className="mt-2">
                We use third-party services including Supabase (for authentication and database
                hosting). These providers have their own privacy policies, and we encourage you to
                review them. Additional third-party services (payment processing, video
                consultation, email delivery) will be added in later stages.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">8. Cookies</h2>
              <p className="mt-2">
                We use essential cookies to maintain your authentication session and ensure the
                website functions properly. We do not use advertising cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">9. Changes to This Policy</h2>
              <p className="mt-2">
                We may update this Privacy Policy from time to time. Changes will be posted on
                this page with an updated revision date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">10. Contact us</h2>
              <p className="mt-2">
                If you have questions about this Privacy Policy, please contact us at
                [email to be added].
              </p>
            </div>

            <div>
              <p className="text-xs">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
