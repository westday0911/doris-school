"use client";

import { useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push(redirect || '/member/dashboard');
      } else {
        router.push('/auth/login');
      }
    };

    handleAuthCallback();
  }, [router, redirect]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>驗證中，請稍候...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">驗證中...</div>}>
      <CallbackContent />
    </Suspense>
  );
}

