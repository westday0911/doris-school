'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Supabase 會自動處理 URL 中的 code 並交換 session
      const { data, error } = await supabase.auth.getSession();
      
      if (data.session) {
        router.push('/member/dashboard');
      } else {
        router.push('/auth/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
        <p className="text-slate-500 font-medium">正在驗證您的帳號，請稍候...</p>
      </div>
    </div>
  );
}



