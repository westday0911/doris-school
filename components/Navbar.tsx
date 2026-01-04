"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LayoutDashboard } from "lucide-react";

export function Navbar() {
  const { user, profile, loading, signOut } = useAuth();

  return (
    <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container-base flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
          Doris AI學院
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
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/member/dashboard" className="hidden sm:block">
                    <Button variant="ghost" size="sm" className="gap-2 font-bold">
                      <LayoutDashboard size={16} /> 會員中心
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold overflow-hidden border border-slate-200">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} className="w-full h-full object-cover" />
                      ) : (
                        (profile?.name?.[0] || user.email?.[0])?.toUpperCase()
                      )}
                    </div>
                    <span className="text-sm font-bold hidden md:inline-block text-slate-700">
                      {profile?.name || user.email?.split("@")[0]}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => signOut()} title="登出">
                      <LogOut size={16} className="text-slate-400 hover:text-red-500" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="hidden text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">
                    登入
                  </Link>
                  <Button size="sm" asChild>
                    <Link href="/auth/register">立即加入</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}


