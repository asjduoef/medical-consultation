
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
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

type FieldErrors = {
  email?: string;
  password?: string;
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (value: string) => {
    setEmail(value);

    setFieldErrors((previous) => ({
      ...previous,
      email: undefined,
      password: undefined,
    }));

    setFormError(null);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setFieldErrors((previous) => ({
      ...previous,
      password: undefined,
    }));

    setFormError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setFieldErrors({});
    setFormError(null);

    const errors: FieldErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(normalizedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Please enter your password.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (authError) {
        if (
          authError.message.includes('Invalid login credentials')
        ) {
          setFieldErrors({
            password: 'Incorrect email or password. Please try again.',
          });
        } else if (
          authError.message.includes('Email not confirmed')
        ) {
          setFormError(
            'Please confirm your email address before signing in. Check your inbox for a confirmation link.'
          );
        } else {
          setFormError(
            'We could not sign you in. Please check your details and try again.'
          );
        }

        return;
      }

      if (data.user) {
        toast.success('Signed in successfully.');
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setFormError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="h-6 w-6" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold text-foreground">
          Welcome Back
        </h1>

        <p className="text-center text-sm text-muted-foreground">
          Sign in to your account to manage appointments
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
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  handleEmailChange(event.target.value)
                }
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
              <p
                id="email-error"
                className="text-sm text-red-600"
                role="alert"
              >
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <Link
                href={`/forgot-password${
                  redirectTo !== '/'
                    ? `?redirect=${encodeURIComponent(redirectTo)}`
                    : ''
                }`}
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  handlePasswordChange(event.target.value)
                }
                className={`pl-10 pr-10 ${
                  fieldErrors.password
                    ? 'border-red-600 focus-visible:ring-red-600'
                    : ''
                }`}
                autoComplete="current-password"
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={
                  fieldErrors.password ? 'password-error' : undefined
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

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href={`/signup${
              redirectTo !== '/'
                ? `?redirect=${encodeURIComponent(redirectTo)}`
                : ''
            }`}
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-medical-mesh px-4 py-12">
      <div className="w-full max-w-md">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-xl bg-muted" />
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
