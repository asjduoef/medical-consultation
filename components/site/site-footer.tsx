import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, MessageCircle, PhoneCall, ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#243d65] bg-[#102747] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.8fr_1.2fr]">
          <div className="space-y-4"><Link href="/" className="inline-flex items-center gap-3"><span className="relative h-14 w-14 overflow-hidden rounded-xl bg-white p-1"><Image src="/Modern_Orthopaedic_Knee_Clinic_Logo.png" alt="Bone Ka Doctor logo" fill sizes="56px" className="object-contain" /></span><span><span className="block text-2xl font-black tracking-tight">Bone Ka Doctor</span><span className="mt-1 block text-base font-semibold text-[#f6b7ca]">Bone and Joint Care</span></span></Link><p className="max-w-xs text-sm leading-6 text-white/80">Orthopaedic consultation for Knee, Spine, Shoulder, and other joint concerns.</p></div>
          <div><h3 className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#ffb4ca]">Explore</h3><ul className="space-y-3">{[['Home','/'],['About the doctor','/#about'],['Consultation services','/#services'],['Areas of practice','/#practice-areas'],['Contact us','/contact']].map(([label,href])=><li key={label}><Link href={href} className="text-sm text-white/75 transition hover:text-white">{label}</Link></li>)}</ul></div>
          <div><h3 className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#ffb4ca]">Information</h3><ul className="space-y-3">{[['Help centre','/help'],['Privacy policy','/privacy-policy'],['Terms of use','/terms']].map(([label,href])=><li key={label}><Link href={href} className="text-sm text-white/75 transition hover:text-white">{label}</Link></li>)}</ul></div>
          <div><h3 className="mb-4 text-xs font-black uppercase tracking-[.18em] text-[#ffb4ca]">Contact us</h3><ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#25d366]"/><a href="https://wa.me/919811116156" className="text-white/90 hover:text-white">9811116156 (Available on Whatsapp)</a></li>
            <li className="flex items-start gap-3"><PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ca]"/><a href="tel:9971725395" className="text-white/90 hover:text-white">9971725395</a></li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ca]"/><a href="mailto:bonekadoctor@gmail.com" className="break-all text-white/90 hover:text-white">bonekadoctor@gmail.com</a></li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb4ca]"/><span className="text-white/90">AD-80/A, Shalimar Bagh, Delhi-110088</span></li>
          </ul></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"><p>© {year} Bone Ka Doctor. All rights reserved.</p><Link href="/#top" className="inline-flex items-center gap-1 transition hover:text-white">Back to top <ArrowUpRight className="h-3.5 w-3.5"/></Link></div>
      </div>
    </footer>
  );
}
