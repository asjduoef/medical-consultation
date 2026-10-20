
'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

function ForgotPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setError(null);

    const normalizedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const resetUrl = new URL('/reset-password', window.location.origin);

      if (redirectTo !== '/') {
        resetUrl.searchParams.set('redirect', redirectTo);
      }

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(normalizedEmail, {
          redirectTo: resetUrl.toString(),
        });

      if (resetError) {
        setError(
          'We could not send the password reset email. Please try again.'
        );
        return;
      }

      setEmail(normalizedEmail);
      setSent(true);
      toast.success('Password reset link sent to your email.');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card shadow-lg">
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>

            <h2 className="text-xl font-bold text-foreground">
              Check Your Email
            </h2>

            <p className="mt-3 text-sm text-muted-foreground">
              If an account exists for <strong>{email}</strong>, you should
              receive a password reset link. Open the link to set a new
              password.
            </p>

            <p className="mt-4 text-xs text-muted-foreground">
              If you do not receive an email within a few minutes, check your
              spam folder.
            </p>

            <Link
              href={`/login${
                redirectTo !== '/'
                  ? `?redirect=${encodeURIComponent(redirectTo)}`
                  : ''
              }`}
            >
              <Button className="mt-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg">
      <div className="space-y-1 p-6 pb-4">
        <h1 className="text-center text-2xl font-bold text-foreground">
          Reset Password
        </h1>

        <p className="text-center text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset
          your password.
        </p>
      </div>

      <div className="px-6 pb-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reset-email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="pl-10"
                autoComplete="email"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'reset-email-error' : undefined}
                disabled={loading}
              />
            </div>

            {error && (
              <p
                id="reset-email-error"
                className="text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      </div>

      <div className="border-t border-border p-4">
        <Link
          href={`/login${
            redirectTo !== '/'
              ? `?redirect=${encodeURIComponent(redirectTo)}`
              : ''
          }`}
          className="mx-auto flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-medical-mesh px-4 py-12">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          }
        >
          <ForgotPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
