
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, AlertCircle } from 'lucide-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    let navigating = false;

    const redirectTo = searchParams.get('redirect') || '/';
    const code = searchParams.get('code');
    const isRecovery = searchParams.get('type') === 'recovery';

    const navigate = (destination: string) => {
      if (!active || navigating) return;

      navigating = true;
      router.replace(destination);
      router.refresh();
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;

      if (event === 'PASSWORD_RECOVERY') {
        navigate('/reset-password');
        return;
      }

      if (isRecovery && session) {
        navigate('/reset-password');
        return;
      }

      if (event === 'SIGNED_IN' && session) {
        navigate(redirectTo);
      }
    });

    const completeAuthentication = async () => {
      try {
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw exchangeError;
          }

          if (!active) return;

          if (isRecovery) {
            navigate('/reset-password');
          } else {
            navigate(redirectTo);
          }

          return;
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!active) return;

        if (isRecovery && session) {
          navigate('/reset-password');
          return;
        }

        if (session) {
          navigate(redirectTo);
        }

        // For links that establish a session asynchronously, the
        // auth-state listener above will handle the redirect.
      } catch {
        if (!active) return;

        setError(
          'We could not verify this authentication link. It may have expired. Please request a new link and try again.'
        );
      }
    };

    void completeAuthentication();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>

        <h1 className="mt-4 text-xl font-bold text-foreground">
          Link verification failed
        </h1>

        <p className="mt-2 text-sm text-muted-foreground" role="alert">
          {error}
        </p>

        <a
          href="/forgot-password"
          className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
        >
          Request a new password reset link
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 shadow-lg">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      <p className="text-sm text-muted-foreground">
        Verifying your link...
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-medical-mesh px-4 py-12">
      <Suspense
        fallback={
          <div className="h-48 w-full max-w-md animate-pulse rounded-xl bg-muted" />
        }
      >
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
