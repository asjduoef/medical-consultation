
'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const checkRecoverySession = async () => {
      try {
        const code = searchParams.get('code');

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw exchangeError;
          }
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!active) return;

        if (session) {
          setRecoveryReady(true);
        } else {
          setError(
            'This password reset link is invalid or has expired. Please request a new link.'
          );
        }
      } catch {
        if (!active) return;

        setError(
          'This password reset link is invalid or has expired. Please request a new link.'
        );
      } finally {
        if (active) {
          setCheckingLink(false);
        }
      }
    };

    void checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === 'PASSWORD_RECOVERY' && session) {
        setRecoveryReady(true);
        setError(null);
        setCheckingLink(false);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [searchParams]);

  const validatePassword = () => {
    if (!password) {
      return 'Please enter your new password.';
    }

    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }

    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }

    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one digit.';
    }

    if (!confirmPassword) {
      return 'Please confirm your new password.';
    }

    if (password !== confirmPassword) {
      return 'The passwords do not match.';
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving || !recoveryReady) return;

    setError(null);

    const validationError = validatePassword();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        setRecoveryReady(false);
        setError(
          'Your reset session has expired. Please request a new password reset link.'
        );
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(
          'We could not update your password. Please try again or request a new reset link.'
        );
        return;
      }

      setSuccess(true);
      setPassword('');
      setConfirmPassword('');
      toast.success('Your password has been updated successfully.');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const loginHref =
    redirectTo !== '/'
      ? `/login?redirect=${encodeURIComponent(redirectTo)}`
      : '/login';

  if (checkingLink) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">
          Verifying your password reset link...
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            Password Updated
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            Your password has been changed successfully. Please sign in using
            your new password.
          </p>

          <Button
            type="button"
            className="mt-6 w-full"
            onClick={async () => {
              try {
                const supabase = createClient();
                const { error: signOutError } =
                  await supabase.auth.signOut();

                if (signOutError) {
                  toast.error(
                    'Your password was changed, but automatic sign-out failed. Please sign out before continuing.'
                  );
                  return;
                }

                router.replace(loginHref);
                router.refresh();
              } catch {
                toast.error(
                  'Your password was changed, but automatic sign-out failed. Please sign out before continuing.'
                );
              }
            }}
          >
            Continue to Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (!recoveryReady) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <AlertCircle className="h-10 w-10 text-red-600" />

          <h1 className="mt-3 text-xl font-bold text-foreground">
            Reset Link Unavailable
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            {error ||
              'This password reset link is invalid or has expired.'}
          </p>

          <Link href="/forgot-password" className="mt-6 w-full">
            <Button className="w-full">Request a New Reset Link</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg">
      <div className="space-y-2 p-6 pb-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Lock className="h-6 w-6" />
        </div>

        <h1 className="text-center text-2xl font-bold text-foreground">
          Set a New Password
        </h1>

        <p className="text-center text-sm text-muted-foreground">
          Choose a secure password for your account.
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
            <Label htmlFor="new-password">New password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(null);
                }}
                className="pl-10 pr-10"
                autoComplete="new-password"
                aria-invalid={Boolean(error)}
                disabled={saving}
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              At least 8 characters, one uppercase letter, and one digit.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-new-password">
              Confirm new password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirm-new-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Enter your new password again"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError(null);
                }}
                className="pl-10 pr-10"
                autoComplete="new-password"
                aria-invalid={Boolean(error)}
                disabled={saving}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirmation password'
                    : 'Show confirmation password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating password...
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-medical-mesh px-4 py-12">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
