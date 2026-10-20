import { Suspense } from 'react';
import { BookingEntry } from '@/components/site/booking-entry';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Clinic Consultation | Medical Consultation',
  description: 'Book an in-clinic consultation with the doctor.',
};

export default function BookClinicPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse bg-muted" />}>
      <BookingEntry serviceType="clinic" />
    </Suspense>
  );
}
