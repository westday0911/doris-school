"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Users, 
  ShoppingCart, 
  Wrench, 
  MessageSquare,
  LogOut,
  Bell,
  Loader2,
  PhoneCall
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { supabase } from "@/lib/supabase";

const menuItems = [
  { icon: LayoutDashboard, label: "儀表板", href: "/admin/dashboard" },
  { icon: BookOpen, label: "課程管理", href: "/admin/courses" },
  { icon: FileText, label: "文章管理", href: "/admin/articles" },
  { icon: MessageSquare, label: "評論管理", href: "/admin/reviews" },
  { icon: Bell, label: "訂閱管理", href: "/admin/subscribers" },
  { icon: Users, label: "會員管理", href: "/admin/members" },
  { icon: ShoppingCart, label: "訂單管理", href: "/admin/orders" },
  { icon: Wrench, label: "AI 工具管理", href: "/admin/tools" },
  { icon: PhoneCall, label: "諮詢管理", href: "/admin/contacts" },
  { icon: Bell, label: "網站設定", href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  useEffect(() => {
    if (user) {
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
        .then(({ data }) => setProfile(data));
    }
  }, [user]);

  // 登入頁不需要 layout 且不需要授權檢查
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // 只有在非登入頁面才啟動安全超時
    let safetyTimeoutId: NodeJS.Timeout;
    if (!isLoginPage) {
      safetyTimeoutId = setTimeout(() => {
        if (isAuthorizing) {
          console.warn("AdminLayout: Authorization taking too long, unblocking UI");
          setIsAuthorizing(false);
        }
      }, 10000); // 增加到 10 秒
    }

    // 判斷邏輯
    if (isLoginPage) {
      setIsAuthorizing(false);
    } else if (!loading) {
      if (!user) {
        router.replace("/admin/login");
        setIsAuthorizing(false);
      } else if (profile) {
        setIsAuthorizing(false); 
        if (profile.role !== 'admin') {
          router.replace("/admin/login");
        }
      } else {
        timeoutId = setTimeout(() => {
          if (!profile) {
            setIsAuthorizing(false); 
          }
        }, 4000);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (safetyTimeoutId) clearTimeout(safetyTimeoutId);
    };
  }, [user, profile, loading, pathname, router, isLoginPage]);

  const handleLogout = async () => {
    await signOut();
    router.push("/admin/login");
  };

  const isAdmin = profile?.role === 'admin';
  const showLoader = !isAdmin && (loading || isAuthorizing);

  // 調試資訊（僅開發環境可見）
  useEffect(() => {
    if (showLoader && !isLoginPage) {
      const timer = setTimeout(() => {
        console.log("Auth Status Check:", { loading, isAuthorizing, hasUser: !!user, hasProfile: !!profile, role: profile?.role });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoader, loading, isAuthorizing, user, profile, isLoginPage]);

  if (isLoginPage) return <>{children}</>;

  if (showLoader && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-600" size={40} />
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500">正在驗證權限...</p>
            <p className="text-xs text-slate-400 mt-2">如果長時間沒反應，請嘗試 <button onClick={() => window.location.reload()} className="text-blue-500 underline">重新整理</button> 或 <button onClick={handleLogout} className="text-red-500 underline">重新登入</button></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin/dashboard" className="text-xl font-black tracking-tight">
            Doris AI <span className="text-blue-500 text-sm block">管理系統</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10" 
            onClick={handleLogout}
          >
            <LogOut size={18} /> 登出系統
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="font-bold text-slate-800">
            {menuItems.find(item => pathname.startsWith(item.href))?.label || "管理後台"}
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">{profile?.name || "管理員"}</p>
                <p className="text-[10px] text-slate-400 text-uppercase tracking-wider">SUPER ADMIN</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold overflow-hidden border border-slate-200">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} className="w-full h-full object-cover" />
                ) : (
                  (profile?.name?.[0] || user?.email?.[0])?.toUpperCase()
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

