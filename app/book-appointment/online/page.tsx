import { Suspense } from 'react';
import { BookingEntry } from '@/components/site/booking-entry';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Online Video Consultation | Medical Consultation',
  description: 'Book an online video consultation with the doctor.',
};

export default function BookOnlinePage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse bg-muted" />}>
      <BookingEntry serviceType="online" />
    </Suspense>
  );
}
