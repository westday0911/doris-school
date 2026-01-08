"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { BookOpen, CreditCard, User, LogOut, Loader2, ChevronRight, Settings, Camera, AlertCircle, ArrowUpDown, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/components/providers/auth-provider";
import { formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DashboardSection = "courses" | "orders" | "profile";

export default function MemberDashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<DashboardSection>("courses");

  useEffect(() => {
    const section = searchParams.get("section") as DashboardSection;
    if (section && ["courses", "orders", "profile"].includes(section)) {
      setActiveSection(section);
    }
  }, [searchParams]);
  const [profile, setProfile] = useState<any>(null);
  const [courseSortOrder, setCourseSortOrder] = useState<'newest' | 'oldest' | 'progress-desc' | 'progress-asc' | 'alphabetical'>('newest');

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth/login");
    }
  }, [user, authLoading, router]);

  const [orders, setOrders] = useState<any[]>([]);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [userReviews, setUserReviews] = useState<Record<string, any>>({});
  const [loadingData, setLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Review Form State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewingCourse, setReviewingCourse] = useState<any>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Profile Form State
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
    if (data) setProfile(data);
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        bio: profile.bio || ""
      });
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!user) {
      console.log("fetchDashboardData: No user, skipping");
      return;
    }
    setLoadingData(true);
    setFetchError(null);
    
    console.log("Fetching dashboard data for user:", user.id);

    try {
      // 並行執行請求以提高速度
      const [ordersRes, coursesRes, reviewsRes] = await Promise.all([
        supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('user_courses')
          .select(`
            *,
            courses (*)
          `)
          .eq('user_id', user.id),
        supabase
          .from('reviews')
          .select('*')
          .eq('user_id', user.id)
          .eq('target_type', 'course')
      ]);

      if (ordersRes.error) {
        console.error("Orders fetch error:", ordersRes.error);
        if (ordersRes.error.code === '42501') {
          setFetchError("訂單讀取權限不足 (RLS Error)");
        }
      }

      if (coursesRes.error) {
        console.error("Courses fetch error:", coursesRes.error);
      }

      if (reviewsRes.error) {
        console.error("Reviews fetch error:", reviewsRes.error);
      }
      
      console.log("Dashboard data fetched:", {
        ordersCount: ordersRes.data?.length || 0,
        coursesCount: coursesRes.data?.length || 0,
        reviewsCount: reviewsRes.data?.length || 0
      });

      setOrders(ordersRes.data || []);
      setUserCourses(coursesRes.data || []);
      
      // 將評論整理成 Record 以便快速查詢
      const reviewsMap: Record<string, any> = {};
      reviewsRes.data?.forEach(rev => {
        reviewsMap[rev.target_id] = rev;
      });
      setUserReviews(reviewsMap);
    } catch (err: any) {
      console.error("Dashboard fetch unexpected error:", err);
      setFetchError(err.message);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({
        name: formData.name,
        bio: formData.bio
      })
      .eq('id', user.id);

    if (error) {
      alert("儲存失敗：" + error.message);
    } else {
      alert("個人資料已更新！");
      await fetchProfile();
    }
    setIsSaving(false);
  };

  const compressImage = (file: File, maxWidth: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas to Blob failed"));
          }, 'image/jpeg', 0.8);
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (existing code)
  };

  const handleOpenReviewModal = (course: any) => {
    setReviewingCourse(course);
    setReviewRating(5);
    setReviewContent("");
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!user || !reviewingCourse) return;
    if (!reviewContent.trim()) {
      alert("請輸入評論內容");
      return;
    }

    setIsSubmittingReview(true);
    const { error } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        user_name: profile?.name || user.email?.split('@')[0],
        target_id: reviewingCourse.id,
        target_type: 'course',
        target_title: reviewingCourse.title,
        content: reviewContent,
        rating: reviewRating,
        status: '待審核'
      });

    if (error) {
      alert("提交失敗：" + error.message);
    } else {
      alert("評論已提交，請等待管理員審核");
      setIsReviewModalOpen(false);
      fetchDashboardData();
    }
    setIsSubmittingReview(false);
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
          {fetchError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <span>系統提示：{fetchError}。請檢查 Supabase RLS 設定或重新整理頁面。</span>
            </div>
          )}

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Sidebar */}
            <aside className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <div className="flex flex-col items-center text-center pb-8 border-b border-slate-100 mb-6">
                <div className="h-20 w-20 rounded-full bg-slate-900 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-xl overflow-hidden mb-4 relative group">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} className="w-full h-full object-cover" alt="avatar" />
                  ) : (
                    profile?.name?.[0]?.toUpperCase() || user.email?.[0].toUpperCase()
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="animate-spin text-white" size={20} />
                    </div>
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <h1 className="text-2xl font-black text-slate-950">我的課程</h1>
                      <span className="text-sm text-slate-400 font-bold">{userCourses.length} 門課程</span>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                      <ArrowUpDown size={14} className="text-slate-400" />
                      <select 
                        value={courseSortOrder}
                        onChange={(e) => setCourseSortOrder(e.target.value as any)}
                        className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer hover:text-slate-950 transition-colors"
                      >
                        <option value="newest">最近購買</option>
                        <option value="oldest">最早購買</option>
                        <option value="progress-desc">進度 (高至低)</option>
                        <option value="progress-asc">進度 (低至高)</option>
                        <option value="alphabetical">課程名稱 (A-Z)</option>
                      </select>
                    </div>
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
                      {[...userCourses].sort((a, b) => {
                        if (courseSortOrder === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                        if (courseSortOrder === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                        if (courseSortOrder === 'progress-desc') return b.progress - a.progress;
                        if (courseSortOrder === 'progress-asc') return a.progress - b.progress;
                        if (courseSortOrder === 'alphabetical') return (a.courses?.title || '').localeCompare(b.courses?.title || '');
                        return 0;
                      }).map((uc) => (
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
                          <CardContent className="px-6 pb-6 space-y-3">
                            <Link href={`/courses/${uc.courses?.slug}/learn`} className="block">
                              <Button variant="default" className="w-full font-bold bg-slate-950 rounded-xl">繼續學習</Button>
                            </Link>
                            
                            {userReviews[uc.course_id] ? (
                              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="text-xs font-bold text-slate-500">
                                  {userReviews[uc.course_id].status === '已發佈' ? '已評價' : '評價審核中'}
                                </span>
                                <div className="flex text-amber-400 text-[10px]">
                                  {"★".repeat(userReviews[uc.course_id].rating)}
                                </div>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                className="w-full font-bold border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50/50 rounded-xl flex items-center gap-2"
                                onClick={() => handleOpenReviewModal(uc.courses)}
                              >
                                <MessageSquare size={16} />
                                發表評價
                              </Button>
                            )}
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
                                  購買日期: {formatDate(order.created_at)}
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
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 text-2xl font-bold border-4 border-white shadow-lg overflow-hidden relative">
                            {profile?.avatar_url ? (
                              <img src={profile.avatar_url} className="w-full h-full object-cover" alt="avatar" />
                            ) : (
                              profile?.name?.[0]?.toUpperCase() || user.email?.[0].toUpperCase()
                            )}
                            {isUploading && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Loader2 className="animate-spin text-white" size={24} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Camera className="text-white" size={24} />
                            </div>
                          </div>
                          <div className="absolute bottom-0 right-0 p-2 bg-slate-950 text-white rounded-full shadow-lg border-2 border-white">
                            <Settings size={14} />
                          </div>
                          <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleAvatarUpload}
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900">大頭照</p>
                          <p className="text-xs text-slate-500">建議尺寸 256x256px，系統會自動壓縮。支援 JPG, PNG, WEBP</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">姓名</label>
                          <input 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button 
                          className="font-bold px-10 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                          onClick={handleUpdateProfile}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <><Loader2 className="animate-spin mr-2" size={18} /> 儲存中...</>
                          ) : "儲存所有變更"}
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

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-0 shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Star size={24} fill="currentColor" />
              </div>
              留下您的學習心得
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium text-base">
              正在評價：<span className="text-slate-900 font-bold">{reviewingCourse?.title}</span>
              <br />您的評價將幫助更多同學了解這堂課程。
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">給予評分</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className={`text-4xl transition-all hover:scale-110 ${star <= reviewRating ? 'text-yellow-400 drop-shadow-sm' : 'text-slate-100'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">心得內容</label>
              <textarea
                placeholder="分享您的學習心得、課程中最喜歡的部分或建議..."
                className="w-full min-h-[150px] p-5 rounded-2xl border-2 border-slate-50 bg-slate-50/50 focus:border-blue-500 focus:bg-white focus:ring-0 transition-all font-medium text-slate-700 resize-none outline-none"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="ghost" 
              className="flex-1 h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              onClick={() => setIsReviewModalOpen(false)}
            >
              取消
            </Button>
            <Button 
              className="flex-[2] h-12 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-600/20 disabled:bg-slate-200"
              onClick={handleSubmitReview}
              disabled={isSubmittingReview}
            >
              {isSubmittingReview ? (
                <>提交中 <Loader2 className="ml-2 animate-spin" size={18} /></>
              ) : (
                "提交評論"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
