import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Maheshwari Orthopaedic Clinic',
  description: 'Terms of Use draft for the Maheshwari Orthopaedic Clinic website.',
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-warm-mesh py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms of Use
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
                Important: This is a draft terms of use document. It has not been reviewed by a
                legal professional. Please consult a qualified lawyer before publishing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing and using this website, you accept and agree to be bound by these
                Terms of Use. If you do not agree to these terms, please do not use the website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">2. Medical Disclaimer</h2>
              <p className="mt-2">
                The content on this website is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical advice. Never disregard professional medical advice or delay seeking it because of something you have read on this website.
              </p>
              <p className="mt-2">
                Online video consultations are not a substitute for in-person medical examination
                in all cases. The doctor will advise if an in-person visit is necessary.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">3. Use of the Website</h2>
              <p className="mt-2">You agree to:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Provide accurate and truthful information when creating an account.</li>
                <li>Not share your account credentials with others.</li>
                <li>Not use the website for any unlawful purpose.</li>
                <li>Not attempt to disrupt or compromise the security of the website.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">4. Appointments and Consultations</h2>
              <p className="mt-2">
                Appointment scheduling functionality is being implemented. Pricing, availability,
                and cancellation policies will be published when the booking system is live.
                Until then, no appointments can be booked through this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
              <p className="mt-2">
                All content on this website, including text, graphics, logos, and design, is the
                property of Maheshwari Orthopaedic Clinic or its licensors and is protected by applicable
                intellectual property laws. You may not reproduce, distribute, or create
                derivative works without permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
              <p className="mt-2">
                To the maximum extent permitted by law, Maheshwari Orthopaedic Clinic shall not be liable
                for any indirect, incidental, special, or consequential damages arising from your
                use of the website or services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">7. Third-Party Links</h2>
              <p className="mt-2">
                This website may contain links to third-party websites. We are not responsible for
                the content or practices of these external sites.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">8. Changes to Terms</h2>
              <p className="mt-2">
                We reserve the right to modify these Terms of Use at any time. Changes will be
                posted on this page with an updated revision date. Continued use of the website
                after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">9. Governing Law</h2>
              <p className="mt-2">
                These terms shall be governed by and construed in accordance with applicable laws.
                [Specific jurisdiction to be added.]
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">10. Contact us</h2>
              <p className="mt-2">
                If you have questions about these Terms of Use, please contact us at
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
