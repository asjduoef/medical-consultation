
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth/auth-context';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About the doctor' },
  { href: '/#practice-areas', label: 'Areas of practice' },
  { href: '/#services', label: 'Consultation services' },
  { href: '/contact', label: 'Contact us' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const { user, loading, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  const closeMenus = () => {
    setAccountMenuOpen(false);
    setMobileOpen(false);
  };

  const handleDashboard = () => {
    closeMenus();
    setDashboardOpen(true);
  };

  const handleSignOut = () => {
    setAccountMenuOpen(false);
    setMobileOpen(false);
    setSignOutOpen(true);
  };

  const confirmSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await signOut();
      setSignOutOpen(false);
      setAccountMenuOpen(false);
      setMobileOpen(false);
      toast.success('You have signed out successfully.');
    } catch {
      toast.error('Unable to sign out. Please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  const accountMenu = (
    <div
      className="absolute right-0 top-full z-[60] mt-2 w-56 overflow-hidden rounded-xl border border-[#ead2d5] bg-white p-1.5 shadow-[0_12px_35px_rgba(67,21,43,0.15)]"
      role="menu"
      aria-label="My account menu"
    >
      <button
        type="button"
        role="menuitem"
        onClick={handleDashboard}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#43152b] transition-colors hover:bg-[#fbe2e8]"
      >
        <User className="h-4 w-4 shrink-0" />
        Patient Dashboard
      </button>

      <div className="my-1 border-t border-[#f0dfe3]" />

      <button
        type="button"
        role="menuitem"
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        Sign out
      </button>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#ead2d5] bg-[#fffaf8]/95 shadow-[0_5px_24px_rgba(67,21,43,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={closeMenus}
            aria-label="Bone Ka Doctor home"
          >
            <span className="relative h-11 w-11 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[#43152b]/10 sm:h-12 sm:w-12">
              <Image
                src="/Modern_Orthopaedic_Knee_Clinic_Logo.png"
                alt="Bone Ka Doctor logo"
                fill
                priority
                sizes="48px"
                className="object-cover object-top"
              />
            </span>

            <div className="flex flex-col leading-none">
              <span className="text-base font-black text-[#43152b]">
                Bone Ka Doctor
              </span>
              <span className="text-xs text-muted-foreground">
                Bone and Joint Care
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-semibold transition-all hover:bg-[#fbe2e8]',
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {loading ? (
              <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
            ) : user ? (
              <div className="relative">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-haspopup="menu"
                  aria-expanded={accountMenuOpen}
                  onClick={() =>
                    setAccountMenuOpen((open) => !open)
                  }
                >
                  <User className="mr-1.5 h-4 w-4" />
                  My account
                  <ChevronDown
                    className={cn(
                      'ml-1 h-4 w-4 transition-transform',
                      accountMenuOpen && 'rotate-180'
                    )}
                  />
                </Button>

                {accountMenuOpen && accountMenu}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button size="sm">Book Appointment</Button>
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={cn(
                    'rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                    isActive(link.href)
                      ? 'bg-accent/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                {loading ? null : user ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setAccountMenuOpen((open) => !open)
                      }
                      className="flex w-full items-center justify-between rounded-xl border border-border px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
                      aria-expanded={accountMenuOpen}
                    >
                      <span className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        My account
                      </span>

                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform',
                          accountMenuOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {accountMenuOpen && (
                      <div className="relative">
                        {accountMenu}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={closeMenus}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/contact" onClick={closeMenus}>
                      <Button size="sm" className="w-full">
                        Book Appointment
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {dashboardOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDashboardOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-dialog-title"
            className="w-full max-w-sm rounded-2xl border border-[#ead2d5] bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fbe2e8]">
              <User className="h-6 w-6 text-[#43152b]" />
            </div>

            <h2
              id="dashboard-dialog-title"
              className="text-lg font-bold text-[#43152b]"
            >
              Patient Dashboard
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              This feature is coming soon
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={() => setDashboardOpen(false)}
              >
                Close
              </Button>
            </div>
          </section>
        </div>
      )}

      {signOutOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !signingOut
            ) {
              setSignOutOpen(false);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="signout-dialog-title"
            aria-describedby="signout-dialog-description"
            className="w-full max-w-sm rounded-2xl border border-[#ead2d5] bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>

            <h2
              id="signout-dialog-title"
              className="text-lg font-bold text-[#43152b]"
            >
              Sign out
            </h2>

            <p
              id="signout-dialog-description"
              className="mt-2 text-sm text-gray-600"
            >
              Are you sure you want to sign out?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={signingOut}
                onClick={() => setSignOutOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={signingOut}
                onClick={confirmSignOut}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {signingOut ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
