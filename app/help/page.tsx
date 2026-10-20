import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquare, LogIn, FileText, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help & Support | Medical Consultation',
  description: 'Find answers to common questions and get support.',
};

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I book an appointment?',
      answer:
        'You can book an appointment by clicking the "Book an Appointment" button on the homepage. You will be guided through the booking process. Please contact the Clinic directly to arrange and confirm your appointment.',
    },
    {
      question: 'What is the difference between online and clinic consultations?',
      answer:
        'An online video consultation is conducted through a secure video call, while a clinic consultation is an in-person visit. Both include a thorough assessment by the doctor.',
    },
    {
      question: 'How much does a consultation cost?',
      answer:
        'Online video consultation is 500/-. Clinic consultation is 700/-. Please contact the Clinic to confirm an appointment.',
    },
    {
      question: 'Do I need to create an account to book an appointment?',
      answer:
        'Yes, you will need to create an account to book and manage appointments. When you click "Book an Appointment", you will be guided to sign in or sign up if needed.',
    },
    {
      question: 'Is my medical information secure?',
      answer:
        'We take data security seriously. Your account is protected with encrypted authentication, and we implement appropriate security measures to safeguard your information.',
    },
  ];

  return (
    <>
      <section className="bg-warm-mesh py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Support
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Help &amp; Support
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Find answers to common questions or reach out to us for assistance.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#efd1d7] bg-white p-6 shadow-[0_8px_24px_rgba(67,21,43,.05)]"
              >
                <h3 className="flex items-start gap-2 font-semibold text-foreground">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {faq.question}
                </h3>
                <p className="mt-2 pl-7 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-foreground">
            Other Ways to Get Help
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">Contact Form</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Send us a message with your enquiry.
              </p>
              <Link href="/contact" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LogIn className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">Account Access</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to manage your account.
              </p>
              <Link href="/login" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">Legal Documents</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Read our policies and terms.
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Link href="/privacy-policy">
                  <Button variant="outline" size="sm">Privacy</Button>
                </Link>
                <Link href="/terms">
                  <Button variant="outline" size="sm">Terms</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
