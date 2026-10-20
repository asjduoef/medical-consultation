import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import { AuthProvider } from '@/lib/auth/auth-context';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bonekadoctor.com'),
  title: 'Bone Ka Doctor | Bone and Joint Care',
  description:
    'Orthopaedic consultation with Dr. Deepak Maheshwari for knee, back, neck and other joint concerns. Online video and clinic consultations.',
  openGraph: {
    title: 'Bone Ka Doctor | Bone and Joint Care',
    description:
      'Orthopaedic consultation with Dr. Deepak Maheshwari for knee, back, neck and other joint concerns.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
