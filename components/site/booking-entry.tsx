'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Building2, Calendar, ArrowRight, Info, LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

type ServiceType = 'online' | 'clinic';

const serviceConfig: Record<ServiceType, {
  title: string;
  icon: React.ReactNode;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
}> = {
  online: {
    title: 'Online Video Consultation',
    icon: <Video className="h-6 w-6" />,
    price: "500/-",
    description: 'Connect with the doctor through a secure video call from anywhere.',
    image: 'https://images.pexels.com/photos/8376236/pexels-photo-8376236.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Doctor conducting an online video consultation',
  },
  clinic: {
    title: 'Clinic Consultation',
    icon: <Building2 className="h-6 w-6" />,
    price: "700/-",
    description: 'Visit the clinic for a face-to-face consultation and physical examination.',
    image: 'https://images.pexels.com/photos/7578798/pexels-photo-7578798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Doctor consulting with a patient in a clinic',
  },
};

export function BookingEntry({ serviceType }: { serviceType: ServiceType }) {
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const config = serviceConfig[serviceType];
  const loginRedirect = `/book-appointment/${serviceType}`;

  return (
    <div className="bg-medical-mesh py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/#services" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to services
        </Link>

        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
          <div className="relative h-48 overflow-hidden">
            <img
              src={config.image}
              alt={config.imageAlt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/95 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {config.icon}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{config.title}</h1>
                <p className="text-sm text-muted-foreground">₹{config.price} per consultation</p>
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            <p className="text-muted-foreground">{config.description}</p>

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-foreground">Appointment Scheduling Coming Soon</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our online appointment booking system is currently being implemented. Soon you&apos;ll
                  be able to select available time slots, confirm your booking, and complete payment —
                  all from this page.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {loading ? (
                <div className="h-12 animate-pulse rounded-md bg-muted" />
              ) : user ? (
                <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    You&apos;re signed in as <strong>{user.email}</strong>. Once appointment
                    scheduling is live, you&apos;ll be able to book immediately.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-secondary/30 p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Please sign in or create an account to continue. After signing in, you&apos;ll
                    be brought back to this page to complete your booking.
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link href={`/login?redirect=${encodeURIComponent(loginRedirect)}`}>
                      <Button className="w-full sm:w-auto">
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href={`/signup?redirect=${encodeURIComponent(loginRedirect)}`}>
                      <Button variant="outline" className="w-full sm:w-auto">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
                <Link href={`/${serviceType === 'online' ? '' : '#services'}${serviceType === 'online' ? '' : ''}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                {serviceType === 'online' ? (
                  <Link href="/contact" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Building2 className="mr-2 h-4 w-4" />
                      Clinic Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/contact" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Video className="mr-2 h-4 w-4" />
                      Online Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Calendar className="mr-1 inline h-3 w-3" />
          Appointment scheduling, slot management, and online payment will be available in a future stage.
        </p>
      </div>
    </div>
  );
}
