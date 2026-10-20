import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#17345d] via-[#17345d] to-[#e50050] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,.18),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(255,177,194,.22),transparent_35%)]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Take the first step towards recovery
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">
          Book your consultation today. Whether you prefer online video consultation or clinic consultation, professional medical care is just a click away.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="w-full bg-white text-[#17345d] hover:bg-gray-200 hover:text-[#17345d] sm:w-auto">
              <Calendar className="mr-2 h-5 w-5" />
              Book Online Consultation
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="w-full border-white bg-white text-[#17345d] hover:bg-gray-200 hover:text-[#17345d] sm:w-auto">
              <Calendar className="mr-2 h-5 w-5" />
              Book Clinic Visit
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
