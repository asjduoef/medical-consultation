'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, MapPin, Send, MessageSquare, MessageCircle, PhoneCall } from 'lucide-react';

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const nextErrors: FormErrors = {};

    if (!name) nextErrors.name = 'Please enter your full name.';
    if (!email) nextErrors.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Please enter a valid email address.';
    if (!message) nextErrors.message = 'Please enter a message.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    toast.success('Thank you for your message. We will get back to you soon.');
    form.reset();
  };

  return (
    <>
      <section className="bg-warm-mesh py-20 sm:py-24"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"><span className="text-sm font-black uppercase tracking-[0.2em] text-primary">Contact us</span><h1 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">Contact us</h1><p className="mt-6 text-lg text-muted-foreground">Have a question or need more information? Send us a message.</p></div></section>
      <section className="bg-background py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2">
        <div><h2 className="text-2xl font-black tracking-tight text-foreground">Contact us</h2><p className="mt-4 text-muted-foreground">Reach out through the form or contact the practice directly.</p><div className="mt-8 space-y-6">
          <div className="flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fbe2e8] text-primary"><MessageCircle className="h-5 w-5" /></div><div><p className="font-bold text-foreground">WhatsApp and Call</p><a href="https://wa.me/919811116156" className="text-sm font-semibold text-[#9f1239] hover:underline">9811116156</a></div></div>
          <div className="flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fbe2e8] text-primary"><PhoneCall className="h-5 w-5" /></div><div><p className="font-bold text-foreground">Call</p><a href="tel:9971725395" className="text-sm font-semibold text-[#9f1239] hover:underline">9971725395</a></div></div>
          <div className="flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fbe2e8] text-primary"><Mail className="h-5 w-5" /></div><div><p className="font-bold text-foreground">Email</p><a href="mailto:bonekadoctor@gmail.com" className="text-sm font-semibold text-[#9f1239] hover:underline">bonekadoctor@gmail.com</a></div></div>
          <div className="flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fbe2e8] text-primary"><MapPin className="h-5 w-5" /></div><div><p className="font-bold text-foreground">Clinic Address</p><p className="text-sm text-muted-foreground">AD-80/A, Shalimar Bagh, Delhi-110088</p></div></div>
        </div></div>
        <div className="rounded-[1.5rem] border border-[#efd1d7] bg-white p-6 shadow-[0_18px_50px_rgba(67,21,43,.10)] sm:p-8"><div className="mb-6 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /><h2 className="text-xl font-black text-foreground">Send a Message</h2></div>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} />{errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}</div>
            <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />{errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}</div>
            <div className="space-y-2"><Label htmlFor="phone">Phone Number (optional)</Label><Input id="phone" name="phone" type="tel" placeholder="Your phone number" /></div>
            <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" placeholder="How can we help you?" rows={5} aria-invalid={Boolean(errors.message)} />{errors.message && <p className="text-sm font-medium text-destructive">{errors.message}</p>}</div>
            <Button type="submit" disabled={loading} className="w-full">{loading ? 'Sending...' : <><Send className="mr-2 h-4 w-4" />Send Message</>}</Button>
          </form>
        </div>
      </div></div></section>
    </>
  );
}
