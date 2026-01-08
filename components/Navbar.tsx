"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { User, LogOut, LayoutDashboard, ShoppingCart, Loader2, BookOpen, ChevronDown } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";

export function Navbar() {
  const { user, profile, loading, signOut } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const displayName = profile?.name || user?.email?.split("@")[0] || "會員";

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
              <div className="relative" 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button 
                  className="flex items-center gap-2 pl-3 py-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold overflow-hidden border border-slate-200 shadow-sm">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      displayName[0].toUpperCase()
                    )}
                  </div>
                  <span className="text-sm font-bold hidden md:inline-block text-slate-700 max-w-[100px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">目前登入</p>
                      <p className="text-xs font-bold text-slate-900 truncate">{user.email}</p>
                    </div>
                    
                    <Link 
                      href="/member/dashboard?section=profile" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      <span>會員中心</span>
                    </Link>
                    
                    <Link 
                      href="/member/dashboard?section=courses" 
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <BookOpen size={16} />
                      <span>我的課程</span>
                    </Link>
                    
                    <div className="h-px bg-slate-50 my-1 mx-2" />
                    
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>登出帳號</span>
                    </button>
                  </div>
                )}
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
