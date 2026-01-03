'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CreditCard, User, LogOut } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function MemberDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // 獲取目前登入的使用者
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // 獲取個人檔案
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profileData || { name: user.email?.split('@')[0], email: user.email });

        // 獲取訂單紀錄
        const { data: ordersData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        setOrders(ordersData || []);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  return (
    <div className="relative bg-white min-h-screen">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition-colors hover:text-slate-950" href="/courses">熱門課程</Link>
            <Link className="transition-colors hover:text-slate-950" href="/blog">AI 學習文章</Link>
            <Link className="transition-colors hover:text-slate-950" href="/tools">AI 工具</Link>
            <Link className="transition-colors hover:text-slate-950" href="/services/consulting">服務</Link>
          </nav>
          <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
               {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : profile?.name?.[0]?.toUpperCase()}
             </div>
             <span className="text-sm font-bold hidden sm:inline-block">{profile?.name}</span>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container-base">
          <div className="grid lg:grid-cols-[240px_1fr] gap-12">
            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="flex items-center gap-4 p-2">
                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 text-lg font-bold border-2 border-white shadow-sm overflow-hidden">
                  {profile?.avatar_url ? <img src={profile.avatar_url} className="w-full h-full object-cover" /> : profile?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-slate-950">{profile?.name}</h2>
                  <p className="text-xs text-slate-500">{profile?.role || '標準會員'}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-3 font-bold text-slate-950 bg-slate-50">
                  <BookOpen size={18} /> 我的課程
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-slate-500 hover:text-slate-950">
                  <CreditCard size={18} /> 訂單紀錄
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-slate-500 hover:text-slate-950">
                  <User size={18} /> 個人資料
                </Button>
                <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 font-medium text-red-500 hover:text-red-600 hover:bg-red-50 mt-8">
                  <LogOut size={18} /> 登出帳號
                </Button>
              </nav>
            </aside>

            {/* Content */}
            <div className="space-y-8">
              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="bg-slate-100 p-1 rounded-xl mb-8">
                  <TabsTrigger value="courses" className="rounded-lg px-8 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">我的課程</TabsTrigger>
                  <TabsTrigger value="orders" className="rounded-lg px-8 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">訂單紀錄</TabsTrigger>
                  <TabsTrigger value="profile" className="rounded-lg px-8 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">個人資料</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* 這部分通常需要一個 user_courses 的關聯表 */}
                    <p className="text-slate-400 text-sm">目前尚無已購買課程。</p>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="border-slate-100">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-slate-400">訂單編號: {order.order_number || order.id.substring(0, 12)}</p>
                            <p className="font-bold">{order.items_summary || '課程購買'}</p>
                            <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center justify-between sm:text-right gap-8">
                            <div className="space-y-1">
                              <p className="text-xs text-slate-400">金額</p>
                              <p className="font-bold">NT$ {order.total_amount?.toLocaleString()}</p>
                            </div>
                            <Badge className={order.status === "paid" ? "bg-green-50 text-green-700 border-green-100" : "bg-amber-50 text-amber-700 border-amber-100"}>
                              {order.status === "paid" ? "付款成功" : "等待付款"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {orders.length === 0 && <p className="text-slate-400 text-sm">尚無訂單紀錄。</p>}
                </TabsContent>

                <TabsContent value="profile" className="space-y-6">
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle>個人基本資料</CardTitle>
                      <CardDescription>管理您的帳號設定與聯絡資訊</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">姓名</label>
                          <input className="w-full px-4 py-2 rounded-lg border border-slate-200" defaultValue={profile?.name} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">電子郵件</label>
                          <input className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500" defaultValue={profile?.email} disabled />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <label className="text-sm font-medium">自我介紹</label>
                          <textarea className="w-full px-4 py-2 rounded-lg border border-slate-200 h-32" placeholder="分享一些關於您的事情..." defaultValue={profile?.bio} />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button className="font-bold px-8">儲存變更</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
