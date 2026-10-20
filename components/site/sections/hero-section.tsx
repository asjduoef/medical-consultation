'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Video, Building2, Calendar, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const slides = [
  { src: '/ad-knee.png', alt: 'Knee osteoarthritis infographic with healthy knee and osteoarthritis comparisons', label: 'Knee pain' },
  { src: '/ad-shoulder.png', alt: 'Shoulder pain infographic with healthy shoulder and shoulder problem anatomy', label: 'Shoulder pain' },
  { src: '/ad-heel.png', alt: 'Heel pain infographic comparing healthy plantar fascia and heel pain', label: 'Heel pain' },
  { src: '/ad-back.png', alt: 'Back pain infographic with healthy spine and spine problems comparison', label: 'Back pain' },
  { src: '/ad-cervical.png', alt: 'Cervical spondylitis infographic showing cervical spine anatomy', label: 'Cervical / neck pain' },
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 10000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const previous = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const next = () => setActive((current) => (current + 1) % slides.length);

  return (
    <section id="top" className="relative overflow-hidden bg-warm-mesh">
      <div className="mx-auto max-w-[90rem] px-3 py-12 sm:px-5 sm:py-16 lg:px-6 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 xl:gap-20">
          <div className="animate-fade-in-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f2a8c0] bg-white px-4 py-2 text-sm font-bold text-[#17345d] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#e50050]" /> Consultant Orthopaedic Surgeon
            </div>
            <h1 className="text-balance text-3xl font-black leading-[1.08] tracking-[-0.035em] text-[#172d50] sm:text-4xl lg:text-[3.35rem]">
              Expert Orthopaedic care for your <span className="text-[#e50050]">Knee</span>, <span className="text-[#e50050]">Back</span>, <span className="text-[#e50050]">Shoulder</span> and Other <span className="text-[#e50050]">Joints</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-[#17345d] sm:text-lg">Consult Senior Orthopaedics Specialist, with 28 years experience, for treatment of your Bone and Joint problems.</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#53637a] sm:text-base">Our focus is on treatment of Bone and Joint diseases without surgery wherever possible and provide clear and compassionate solutions for people.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact"><Button size="lg" className="w-full bg-[#e50050] text-white hover:bg-[#c90046] sm:w-auto"><Calendar className="mr-2 h-5 w-5" />Book your Consultation</Button></Link>
              <Link href="/#services"><Button variant="outline" size="lg" className="w-full border-[#d4d6dc] bg-white text-[#17345d] hover:bg-gray-100 sm:w-auto">Learn More</Button></Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-5">
              <div className="flex items-center gap-2"><Video className="h-5 w-5 text-[#e50050]" /><span className="text-sm font-semibold text-[#53637a]">Online video consultations</span></div>
              <div className="flex items-center gap-2"><Building2 className="h-5 w-5 text-[#e50050]" /><span className="text-sm font-semibold text-[#53637a]">Clinic visits</span></div>
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="relative overflow-hidden rounded-xl bg-transparent shadow-[0_8px_24px_rgba(23,45,80,.08)]">
              <div className="overflow-hidden bg-white">
                {slides.map((slide, index) => <img key={slide.src} src={slide.src} alt={slide.alt} className={`block h-auto max-h-[42rem] w-full object-contain transition-opacity duration-300 ${index === active ? 'opacity-100' : 'hidden opacity-0'}`} />)}
              </div>
              <div className="flex items-center justify-between gap-3 bg-white px-3 py-2 sm:px-3">
                <span className="min-w-0 truncate text-sm font-extrabold text-[#17345d]">{slides[active].label}<span className="ml-2 text-xs font-semibold text-[#6b7890]">{active + 1} / {slides.length}</span></span>
                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" aria-label="Previous image" onClick={previous} className="rounded-full border border-gray-200 p-2 text-[#17345d] transition hover:bg-gray-100"><ChevronLeft className="h-4 w-4" /></button>
                  <button type="button" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused((value) => !value)} className="rounded-full border border-gray-200 p-2 text-[#17345d] transition hover:bg-gray-100">{paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}</button>
                  <button type="button" aria-label="Next image" onClick={next} className="rounded-full border border-gray-200 p-2 text-[#17345d] transition hover:bg-gray-100"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
