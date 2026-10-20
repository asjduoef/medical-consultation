import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Stethoscope, HeartPulse } from 'lucide-react';

export function AboutPreviewSection() {
  return (
    <section id="about" className="scroll-mt-16 bg-[#fff0ec] py-24 sm:py-28">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] xl:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#43152b] via-[#70213d] to-[#d71950] p-8 shadow-[0_28px_70px_rgba(67,21,43,.24)]">
              <div className="text-center text-white">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-[#ff8aa8] bg-white/10">
                  <Stethoscope className="h-14 w-14" />
                </div>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#ff8aa8]">Doctor profile</p>
                <p className="mt-2 text-2xl font-black">Dr. Deepak Maheshwari</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-[#f2c9d2] bg-white p-5 shadow-lg sm:block">
              <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Award className="h-6 w-6" /></div><div><p className="text-xl font-black text-foreground">28 years</p><p className="text-xs text-muted-foreground">Orthopaedic experience</p></div></div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">About the doctor</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">Dr. Deepak Maheshwari</h2>
            <p className="mt-2 text-lg font-bold text-[#43152b]">CONSULTANT ORTHOPAEDIC SURGEON</p>
            <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-8">
              <div className="rounded-2xl border border-[#f0cbd5] bg-white/80 p-5 sm:p-6">
                <p><strong className="text-foreground">MBBS</strong> — University College of Medicine Sciences, Delhi.</p>
                <p className="mt-2"><strong className="text-foreground">MS (Orthopaedics)</strong> — Central Institute of Orthopaedics, Safdarjung Hospital, New Delhi.</p>
              </div>
              <p>Dr. Deepak Maheshwari is a Senior Consultant Orthopaedic Surgeon with a strong academic and surgical foundation. He completed his M.B.B.S. from University College of Medicine Sciences, Delhi and M.S. (Orthopaedics) from the Central Institute of Orthopaedics, Safdarjung Hospital, New Delhi and further pursued a Fellowship in Arthroplasty with focused training in joint replacement surgery. His education and early years of residency at premier institutions laid the groundwork for a career dedicated to comprehensive orthopaedic care.</p>
              <p>With over 28 years of clinical experience, Dr. Deepak Maheshwari has managed a wide spectrum of Orthopaedic conditions, ranging from everyday joint concerns to complex trauma cases. His professional journey includes key roles at Safdarjung Hospital, V.I.M.H.A.N.S and Sitaram Bhartiya Institute, New Delhi, where he served as Senior Registrar and at Indraprastha Apollo Hospital, New Delhi, where he worked as Associate Consultant of Orthopaedic Surgery. He has also contributed to Medical Education as Assistant Professor in SGT Medical College, Gurgaon, bringing academic depth and practical insight to his clinical work. Patients appreciate his compassionate manner, attentive listening and clear, realistic guidance that supports informed decision-making.</p>
              <p>Since 2003, Dr. Deepak Maheshwari has been in independent practice at his own Orthopaedics Clinic in New Delhi. He currently offers both in-clinic and telemedicine (online video) consultations, enabling patients to seek expert advice from the comfort of their homes. His approach centres on relieving pain, restoring movement and helping patients return to daily life with confidence and reassurance.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border/60 bg-card p-4"><Users className="mb-2 h-5 w-5 text-primary" /><p className="text-sm font-bold text-foreground">Patient-focused</p></div>
              <div className="rounded-lg border border-border/60 bg-card p-4"><Stethoscope className="mb-2 h-5 w-5 text-primary" /><p className="text-sm font-bold text-foreground">Expert assessment</p></div>
              <div className="rounded-lg border border-border/60 bg-card p-4"><HeartPulse className="mb-2 h-5 w-5 text-primary" /><p className="text-sm font-bold text-foreground">Compassionate care</p></div>
            </div>
            <div className="mt-8"><Link href="/#services"><Button variant="outline">Explore consultation services<ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
