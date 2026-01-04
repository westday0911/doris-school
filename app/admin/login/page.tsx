"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 如果已經是管理員且已登入，直接導向後台
  useEffect(() => {
    if (!authLoading && user && profile?.role === 'admin') {
      router.push("/admin/dashboard");
    }
  }, [user, profile, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      // 1. 登入 Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. 檢查 Profile 中的 Role 是否為 admin
      // 這裡直接查資料庫確保拿到的資料是最新的
      console.log("Checking admin profile for user:", authData.user.id);
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        // 如果找不到 Profile，嘗試建立一個（預防舊帳號沒有 Profile）
        if (profileError.code === 'PGRST116') { // No rows found
           await supabase.from('profiles').insert({
             id: authData.user.id,
             email: authData.user.email,
             name: authData.user.email?.split('@')[0],
             role: 'member' // 預設為 member，所以會再下方被擋掉，但至少有了紀錄
           });
           throw new Error("您的帳號尚未設定管理員權限");
        }
        throw profileError;
      }

      console.log("Profile role:", profileData.role);
      if (profileData.role !== 'admin') {
        // 如果不是管理員，登出並報錯
        await supabase.auth.signOut();
        throw new Error("權限不足：您不是管理員 (目前權限: " + profileData.role + ")");
      }

      console.log("Login successful, redirecting to dashboard...");
      // 3. 成功，導向後台
      router.push("/admin/dashboard");
      // 備案：如果 push 沒反應，3秒後嘗試強制重導
      setTimeout(() => {
        if (window.location.pathname === '/admin/login') {
          window.location.href = '/admin/dashboard';
        }
      }, 3000);
    } catch (err: any) {
      setError(err.message || "登入失敗，請檢查帳號密碼");
      setLoading(false); // 發生錯誤時才停止轉圈
      console.error("Admin Login Error:", err);
    }
    // 注意：成功時不呼叫 setLoading(false)，讓轉圈持續到轉頁完成
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-black tracking-tight text-white">Doris AI <span className="text-blue-500">Admin</span></span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-slate-800 bg-slate-900 shadow-2xl text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">後台管理登入</CardTitle>
            <CardDescription className="text-center text-slate-400">
              請輸入管理員憑證以繼續
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-3 text-red-500 text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}
              
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300" htmlFor="email">
                  管理員帳號
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@doris-ai.com"
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-300" htmlFor="password">
                  密碼
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 font-bold bg-blue-600 hover:bg-blue-700 mt-2" 
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                {loading ? "登入中..." : "進入管理系統"}
              </Button>
              <div className="text-center mt-4">
                <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  返回前台首頁
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
