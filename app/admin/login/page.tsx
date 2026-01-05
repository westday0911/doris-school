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
      console.log("AdminLoginPage: Auth state detected, redirecting...");
      router.replace("/admin/dashboard");
    }
  }, [user, profile, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      if (loading) {
        console.warn("Login process is taking too long...");
      }
    }, 15000);

    try {
      console.log("Starting Non-blocking Login...");
      
      // 我們不使用 await 死等這個 Promise，改用 .then()
      // 因為在您的環境中，這個 await 似乎永遠不會 resolve
      supabase.auth.signInWithPassword({
        email,
        password,
      }).then(({ data, error: authError }) => {
        if (authError) {
          console.error("Login Promise Error:", authError);
          setError(authError.message);
          setLoading(false);
        } else {
          console.log("Login Promise Success:", !!data?.user);
          // 成功後的跳轉會由上方的 useEffect 自動偵測 user 變化來執行
        }
      }).catch(err => {
        console.error("Login Promise Fatal Error:", err);
        setError("系統異常，請嘗試重新整理頁面。");
        setLoading(false);
      });

      // 設立一個「強制探測」保險
      // 就算 Promise 沒回應，我們 3 秒後主動問一次 Supabase：到底登入成功沒？
      setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("Session detected via insurance check, hard redirecting...");
          window.location.href = "/admin/dashboard";
        } else {
          // 如果 10 秒後還沒反應，才真正放棄
          setTimeout(() => {
            if (loading) {
              setError("連線反應過慢，請檢查網路或稍後再試。");
              setLoading(false);
            }
          }, 7000);
        }
      }, 3000);

    } catch (err: any) {
      console.error("Outer Login Error:", err);
      setError("發生錯誤，請稍後再試");
      setLoading(false);
    } finally {
      clearTimeout(timeoutId);
    }
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
                {loading ? "處理中..." : "進入管理系統"}
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
