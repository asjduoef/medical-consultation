'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Building2, Check, ArrowRight } from 'lucide-react';

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  bookingHref: string;
};

const services: Service[] = [
  {
    id: 'online',
    title: 'Online Video Consultation',
    description: 'Connect with the doctor from the comfort of your home through a secure video call.',
    price: "500/-",
    features: ['Secure video call from anywhere', 'Discuss symptoms and medical history', 'Professional assessment and advice', 'Guidance on next steps'],
    image: 'https://images.pexels.com/photos/39192424/pexels-photo-39192424.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Laptop showing a remote doctor consultation',
    icon: <Video className="h-6 w-6" />,
    bookingHref: '/contact',
  },
  {
    id: 'clinic',
    title: 'Clinic Consultation',
    description: 'Visit the clinic for a focused in-person consultation and physical examination.',
    price: "700/-",
    features: ['Face-to-face consultation', 'Physical examination included', 'Detailed discussion of condition', 'Personalised treatment plan'],
    image: 'https://images.pexels.com/photos/5827294/pexels-photo-5827294.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Clean medical clinic interior',
    icon: <Building2 className="h-6 w-6" />,
    bookingHref: '/contact',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-16 bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-[#172d50] sm:text-5xl">Consultation services</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id} className="group overflow-hidden border-2 border-border shadow-md transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
              <div className="relative h-52 overflow-hidden bg-[#43152b]">
                <img src={service.image} alt={service.imageAlt} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#43152b] via-[#43152b]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d71950] shadow-lg">{service.icon}</div>
                  <span className="text-lg font-bold">{service.title}</span>
                </div>
              </div>
              <CardHeader className="pb-2"><span className="text-4xl font-black tracking-tight text-[#43152b]">{service.price}</span></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <ul className="mt-4 space-y-2.5">
                  {service.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm font-medium text-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{feature}</li>)}
                </ul>
              </CardContent>
              <CardFooter className="justify-end border-t border-[#f4e1e5] pt-5">
                <Link href={service.bookingHref}><Button className="group">Book Now<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
