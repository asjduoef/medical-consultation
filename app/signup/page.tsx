
'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  Stethoscope,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmationNeeded, setConfirmationNeeded] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
    setFormError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setFieldErrors({});
    setFormError(null);

    const errors: FieldErrors = {};
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName) {
      errors.name = 'Please enter your full name.';
    }

    if (!normalizedEmail) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(normalizedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Please create a password.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(password)) {
      errors.password = 'Password must contain at least one digit.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            full_name: normalizedName,
          },
        },
      });

      if (authError) {
        if (
          authError.message.includes('User already registered')
        ) {
          setFormError(
            'An account with this email already exists. Please sign in instead.'
          );
        } else if (
          authError.message.toLowerCase().includes('password')
        ) {
          setFieldErrors({
            password:
              'Your password was not accepted. Please check the password requirements and try again.',
          });
        } else {
          setFormError(
            'We could not create your account. Please check your details and try again.'
          );
        }

        return;
      }

      if (data.user) {
        if (data.session) {
          toast.success('Account created successfully.');
          router.push(redirectTo);
          router.refresh();
        } else {
          setConfirmationNeeded(true);
          toast.success('Account created. Please check your email to confirm.');
        }
      }
    } catch {
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loginHref =
    redirectTo !== '/'
      ? `/login?redirect=${encodeURIComponent(redirectTo)}`
      : '/login';

  if (confirmationNeeded) {
    return (
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>

            <h2 className="text-xl font-bold text-foreground">
              Check Your Email
            </h2>

            <p className="mt-3 text-sm text-muted-foreground">
              We&apos;ve sent a confirmation link to{' '}
              <strong>{email.trim()}</strong>. Click the link in the email to
              activate your account, then sign in.
            </p>

            <p className="mt-4 text-xs text-muted-foreground">
              If you haven&apos;t received an email, check your spam folder.
            </p>

            <Link href={loginHref}>
              <Button className="mt-6">Go to Sign In</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-6 w-6" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold text-foreground">
          Create an Account
        </h1>

        <p className="text-center text-sm text-muted-foreground">
          Sign up to book and manage your consultations
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          noValidate
        >
          {formError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  clearFieldError('name');
                }}
                className={`pl-10 ${
                  fieldErrors.name
                    ? 'border-red-600 focus-visible:ring-red-600'
                    : ''
                }`}
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                disabled={loading}
              />
            </div>

            {fieldErrors.name && (
              <p id="name-error" className="text-sm text-red-600" role="alert">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearFieldError('email');
                }}
                className={`pl-10 ${
                  fieldErrors.email
                    ? 'border-red-600 focus-visible:ring-red-600'
                    : ''
                }`}
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={
                  fieldErrors.email ? 'email-error' : undefined
                }
                disabled={loading}
              />
            </div>

            {fieldErrors.email && (
              <p id="email-error" className="text-sm text-red-600" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a secure password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearFieldError('password');

                  if (confirmPassword) {
                    setFieldErrors((previous) => ({
                      ...previous,
                      confirmPassword:
                        event.target.value === confirmPassword
                          ? undefined
                          : 'Passwords do not match.',
                    }));
                  }
                }}
                className={`pl-10 pr-10 ${
                  fieldErrors.password
                    ? 'border-red-600 focus-visible:ring-red-600'
                    : ''
                }`}
                autoComplete="new-password"
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={
                  fieldErrors.password ? 'password-error' : 'password-hint'
                }
                disabled={loading}
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

            <p id="password-hint" className="text-xs text-muted-foreground">
              At least 8 characters, one uppercase letter, and one digit.
            </p>

            {fieldErrors.password && (
              <p
                id="password-error"
                className="text-sm text-red-600"
                role="alert"
              >
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) => {
                  const value = event.target.value;
                  setConfirmPassword(value);

                  setFieldErrors((previous) => ({
                    ...previous,
                    confirmPassword:
                      value && value !== password
                        ? 'Passwords do not match.'
                        : undefined,
                  }));

                  setFormError(null);
                }}
                className={`pl-10 ${
                  fieldErrors.confirmPassword
                    ? 'border-red-600 focus-visible:ring-red-600'
                    : ''
                }`}
                autoComplete="new-password"
                aria-invalid={Boolean(fieldErrors.confirmPassword)}
                aria-describedby={
                  fieldErrors.confirmPassword
                    ? 'confirm-password-error'
                    : undefined
                }
                disabled={loading}
              />
            </div>

            {fieldErrors.confirmPassword && (
              <p
                id="confirm-password-error"
                className="text-sm text-red-600"
                role="alert"
              >
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href={loginHref}
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-medical-mesh px-4 py-12">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          }
        >
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}
