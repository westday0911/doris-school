"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { User, LogOut, LayoutDashboard, ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const { items } = useCart();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container-base flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Doris AI 學院" className="h-8 w-auto" />
          <span className="text-lg font-black tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
            Doris AI 學院
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link className="transition-colors hover:text-slate-950" href="/courses">
            熱門課程
          </Link>
          <Link className="transition-colors hover:text-slate-950" href="/blog">
            AI 學習文章
          </Link>
          <Link className="transition-colors hover:text-slate-950" href="/tools">
            AI 工具
          </Link>
          <Link className="transition-colors hover:text-slate-950" href="/services/consulting">
            服務
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-slate-400 hover:text-slate-950 transition-colors">
            <ShoppingCart size={20} />
            {items.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-black text-white flex items-center justify-center border-2 border-white">
                {items.length}
              </span>
            )}
          </Link>
          
          <div className="flex items-center gap-2">
            {loading ? (
              // 載入中的占位 UI
              <div className="flex items-center gap-2 px-2">
                <Loader2 className="h-4 w-4 animate-spin text-slate-200" />
                <div className="h-8 w-16 bg-slate-50 rounded-lg animate-pulse" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <Link href="/member/dashboard" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="gap-2 font-bold">
                    <LayoutDashboard size={16} /> 會員中心
                  </Button>
                </Link>
                <div className="flex items-center gap-2 border-l border-slate-100 pl-3 sm:pl-4">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold overflow-hidden border border-slate-200">
                    {user.email?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-bold hidden md:inline-block text-slate-700">
                    {user.email?.split("@")[0]}
                  </span>
                  <Button variant="ghost" size="icon" onClick={handleSignOut} title="登出" className="h-8 w-8">
                    <LogOut size={16} className="text-slate-400 hover:text-red-500" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link href="/auth/login" className="text-sm font-bold text-slate-600 hover:text-slate-950 px-2">
                  登入
                </Link>
                <Button size="sm" asChild className="font-bold rounded-full px-4 sm:px-6">
                  <Link href="/auth/register">立即加入</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
