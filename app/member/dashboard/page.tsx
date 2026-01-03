"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { BookOpen, CreditCard, User, LogOut, Loader2, ChevronRight, Settings } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/components/providers/auth-provider";

type DashboardSection = "courses" | "orders" | "profile";

export default function MemberDashboard() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<DashboardSection>("courses");
  const [orders, setOrders] = useState<any[]>([]);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    
    // 獲取訂單紀錄
    const ordersPromise = supabase
      .from('orders')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    // 獲取已購買課程 (關聯 courses 表)
    const coursesPromise = supabase
      .from('user_courses')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', user?.id);

    const [ordersRes, coursesRes] = await Promise.all([ordersPromise, coursesPromise]);
    
    if (!ordersRes.error) setOrders(ordersRes.data || []);
    if (!coursesRes.error) setUserCourses(coursesRes.data || []);
    
    setLoadingData(false);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') window.location.href = '/auth/login';
    return null;
  }

  return (
    <div className="relative bg-slate-50/50 min-h-screen">
      <Navbar />

      <main className="py-12">
        <div className="container-base">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Sidebar */}
            <aside className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100 mb-6">
                <div className="h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-xl overflow-hidden mb-4">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} className="w-full h-full object-cover" />
                  ) : (
                    profile?.name?.[0]?.toUpperCase()
                  )}
                </div>
                <h2 className="font-bold text-lg text-slate-950">{profile?.name || user.email?.split('@')[0]}</h2>
                <Badge variant="muted" className="mt-1 font-bold text-[10px] uppercase tracking-wider">
                  {profile?.role === 'admin' ? '管理員' : '正式學員'}
                </Badge>
              </div>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveSection("courses")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    activeSection === "courses" 
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20 font-bold" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} />
                    <span>我的課程</span>
                  </div>
                  <ChevronRight size={14} className={activeSection === "courses" ? "opacity-100" : "opacity-0"} />
                </button>

                <button 
                  onClick={() => setActiveSection("orders")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    activeSection === "orders" 
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20 font-bold" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} />
                    <span>訂單紀錄</span>
                  </div>
                  <ChevronRight size={14} className={activeSection === "orders" ? "opacity-100" : "opacity-0"} />
                </button>

                <button 
                  onClick={() => setActiveSection("profile")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    activeSection === "profile" 
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20 font-bold" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-950 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User size={18} />
                    <span>個人資料</span>
                  </div>
                  <ChevronRight size={14} className={activeSection === "profile" ? "opacity-100" : "opacity-0"} />
                </button>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={18} />
                    <span>登出帳號</span>
                  </button>
                </div>
              </nav>
            </aside>

            {/* Content Area */}
            <div className="space-y-8">
              {activeSection === "courses" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-black text-slate-950">我的課程</h1>
                    <span className="text-sm text-slate-400 font-bold">{userCourses.length} 門課程</span>
                  </div>

                  {loadingData ? (
                    <div className="flex items-center justify-center py-20 text-slate-400">
                      <Loader2 className="animate-spin mr-2" /> 資料讀取中...
                    </div>
                  ) : userCourses.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-20 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="text-slate-300" size={32} />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">目前尚無已購買課程</h3>
                      <p className="text-sm text-slate-500 mb-8">趕快去探索適合您的 AI 課程吧！</p>
                      <Link href="/courses">
                        <Button className="font-bold px-8">探索課程</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {userCourses.map((uc) => (
                        <Card key={uc.id} className="overflow-hidden border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-500 group">
                          <div className="aspect-video relative overflow-hidden">
                            <img 
                              src={uc.courses?.image_url} 
                              alt={uc.courses?.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-0 font-bold">
                                {uc.progress}% 已完成
                              </Badge>
                            </div>
                          </div>
                          <CardHeader className="p-6">
                            <CardTitle className="text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                              {uc.courses?.title}
                            </CardTitle>
                            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
                              <div 
                                className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                                style={{ width: `${uc.progress}%` }}
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="px-6 pb-6">
                            <Link href={`/courses/${uc.courses?.slug}`}>
                              <Button variant="default" className="w-full font-bold bg-slate-950 rounded-xl">繼續學習</Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === "orders" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-black text-slate-950">訂單紀錄</h1>
                  </div>

                  {loadingData ? (
                    <div className="flex items-center justify-center py-20 text-slate-400">
                      <Loader2 className="animate-spin mr-2" /> 資料讀取中...
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-20 text-center text-slate-400">
                      尚無訂單紀錄。
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-all">
                          <div className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  訂單編號: {order.order_number || order.id.substring(0, 12)}
                                </p>
                                <p className="font-bold text-slate-950">{order.items_summary || '課程購買'}</p>
                                <p className="text-xs text-slate-500 font-medium">
                                  購買日期: {new Date(order.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center justify-between sm:text-right gap-8">
                                <div className="space-y-1">
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">金額</p>
                                  <p className="font-black text-slate-950">NT$ {order.total_amount?.toLocaleString()}</p>
                                </div>
                                <Badge className={`rounded-lg px-3 py-1 border-0 font-bold ${
                                  order.status === "paid" 
                                  ? "bg-emerald-50 text-emerald-700" 
                                  : "bg-amber-50 text-amber-700"
                                }`}>
                                  {order.status === "paid" ? "付款成功" : "等待付款"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === "profile" && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-black text-slate-950">個人資料設定</h1>
                  <Card className="border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <CardHeader className="p-8 border-b border-slate-50">
                      <CardTitle className="text-xl font-bold">基本資料</CardTitle>
                      <CardDescription>管理您的帳號設定與聯絡資訊</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      <div className="flex items-center gap-8 mb-8">
                        <div className="relative group">
                          <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 text-2xl font-bold border-4 border-white shadow-lg overflow-hidden">
                            {profile?.avatar_url ? (
                              <img src={profile.avatar_url} className="w-full h-full object-cover" />
                            ) : (
                              profile?.name?.[0]?.toUpperCase()
                            )}
                          </div>
                          <button className="absolute bottom-0 right-0 p-2 bg-slate-950 text-white rounded-full shadow-lg hover:scale-110 transition-all border-2 border-white">
                            <Settings size={14} />
                          </button>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900">大頭照</p>
                          <p className="text-xs text-slate-500">建議尺寸 256x256px，支援 JPG, PNG, WEBP</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">姓名</label>
                          <input 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                            defaultValue={profile?.name} 
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">電子郵件 (不可修改)</label>
                          <input 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 font-bold outline-none" 
                            defaultValue={profile?.email} 
                            disabled 
                          />
                        </div>
                        <div className="space-y-3 sm:col-span-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">自我介紹</label>
                          <textarea 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 h-32 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none" 
                            placeholder="分享一些關於您的事情..." 
                            defaultValue={profile?.bio} 
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button className="font-bold px-10 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                          儲存所有變更
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
