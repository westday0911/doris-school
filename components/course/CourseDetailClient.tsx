"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  Loader2, MessageSquare, BookOpen, Clock, BarChart, 
  Users, Star, Megaphone, ChevronDown, PlayCircle, 
  Info, Lock, Download, FileText, Globe, MonitorPlay,
  CheckCircle2, ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";

export default function CourseDetailClient({ 
  initialCourse, 
  slug, 
  initialModules
}: { 
  initialCourse: any, 
  slug: string, 
  initialModules: any[]
}) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const [course, setCourse] = useState<any>(initialCourse);
  const [modules, setModules] = useState<any[]>(initialModules);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [openModules, setOpenModules] = useState<string[]>(initialModules.length > 0 ? [initialModules[0].id] : []);
  const [selectedPricingIdx, setSelectedPricingIdx] = useState(0);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  const handleBuyNow = () => {
    if (hasPurchased) {
      alert("您已擁有此課程");
      return;
    }

    const currentPricing = pricingOptions[selectedPricingIdx];
    const item = {
      id: `${course.id}-${selectedPricingIdx}`,
      title: course.title,
      price: currentPricing?.price || course.discount_price || 0,
      original_price: currentPricing?.original_price || course.original_price || 0,
      image_url: course.image_url,
      slug: slug,
      level: course.level,
      pricing_label: currentPricing?.label || "標準入學方案"
    };

    addToCart(item);
    router.push("/cart");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (course) {
      fetchReviews(course.id);
      checkPurchaseStatus(course.id);
      
      // 執行客製化 JS
      if (course.custom_code?.js) {
        try {
          const script = document.createElement('script');
          script.innerHTML = course.custom_code.js;
          script.id = 'course-custom-js';
          document.body.appendChild(script);
        } catch (e) {
          console.error("Custom JS Error:", e);
        }
      }
    }
    return () => {
      const oldScript = document.getElementById('course-custom-js');
      if (oldScript) oldScript.remove();
    };
  }, [course, user]);

  const checkPurchaseStatus = async (courseId: string) => {
    if (!user) {
      setHasPurchased(false);
      setCheckingPurchase(false);
      return;
    }

    const { data } = await supabase
      .from('user_courses')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    setHasPurchased(!!data);
    setCheckingPurchase(false);
  };

  const fetchReviews = async (courseId: string) => {
    setLoadingReviews(true);
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .eq('target_id', courseId)
      .eq('status', '已發佈')
      .order('created_at', { ascending: false });

    if (!reviewsError) {
      setReviews(reviewsData || []);
    }
    setLoadingReviews(false);
  };

  const toggleModule = (id: string) => {
    setOpenModules(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // 解析影片連結並產生影片元件
  const renderVideo = (url: string) => {
    if (!url) return null;
    let embedUrl = "";
    let isDirectVideo = false;
    try {
      const cleanUrl = url.trim();
      if (cleanUrl.startsWith('<iframe')) {
        const srcMatch = cleanUrl.match(/src=["'](.*?)["']/);
        if (srcMatch && srcMatch[1]) {
          return (
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black border border-white/5">
              <iframe src={srcMatch[1]} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
            </div>
          );
        }
      }
      if (cleanUrl.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
        isDirectVideo = true;
        embedUrl = cleanUrl;
      }
      else if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
        let id = "";
        if (cleanUrl.includes("v=")) id = cleanUrl.split("v=")[1].split("&")[0];
        else if (cleanUrl.includes("shorts/")) id = cleanUrl.split("shorts/")[1].split("?")[0];
        else if (cleanUrl.includes("youtu.be/")) id = cleanUrl.split("youtu.be/")[1].split("?")[0];
        else if (cleanUrl.includes("embed/")) id = cleanUrl.split("embed/")[1].split("?")[0];
        else id = cleanUrl.split("/").pop()?.split("?")[0] || "";
        if (id) embedUrl = `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=0`;
      } 
      else if (cleanUrl.includes("vimeo.com")) {
        const id = cleanUrl.split("/").pop()?.split("?")[0];
        if (id) embedUrl = `https://player.vimeo.com/video/${id}`;
      }
      else if (cleanUrl.includes("embed/")) embedUrl = cleanUrl;
    } catch (e) { console.error(e); }

    if (!embedUrl) return null;
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black border border-white/5">
        {isDirectVideo ? (
          <video src={embedUrl} controls className="w-full h-full" controlsList="nodownload" />
        ) : (
          <iframe src={embedUrl} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
        )}
      </div>
    );
  };

  if (!course) return null;

  const pricingOptions = Array.isArray(course.pricing_options) ? course.pricing_options : [];
  const categories = Array.isArray(course.categories) ? course.categories : (course.tag ? [course.tag] : []);
  const statusColors: any = {
    "預購中": "bg-orange-100 text-orange-600",
    "已上架": "bg-emerald-100 text-emerald-600",
    "招生中": "bg-blue-100 text-blue-600",
    "已額滿": "bg-rose-100 text-rose-600",
    "已下架": "bg-slate-100 text-slate-500"
  };

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

  // 輔助函式：將分鐘數或格式化字串轉換為秒數
  const parseDurationToSeconds = (duration: any) => {
    if (duration === null || duration === undefined || duration === "") return 0;
    const d = String(duration).trim();
    if (d.includes(':')) {
      const parts = d.split(':').map(Number);
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      return 0;
    }
    const mins = parseInt(d);
    return isNaN(mins) ? 0 : mins * 60;
  };

  // 輔助函式：格式化課堂時長 (15 -> 00:15)
  const formatLessonDuration = (duration: any) => {
    if (duration === null || duration === undefined || duration === "") return "00:00";
    
    const d = String(duration).trim();
    if (d.includes(':')) return d;
    
    const mins = parseInt(d);
    if (isNaN(mins)) return "00:00";
    
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  // 輔助函式：計算單元總時長
  const getModuleDuration = (lessons: any[]) => {
    let totalSeconds = 0;
    lessons?.forEach(lesson => {
      totalSeconds += parseDurationToSeconds(lesson.duration);
    });

    if (totalSeconds === 0) return null;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-white min-h-screen">
      {course.custom_code?.css && <style dangerouslySetInnerHTML={{ __html: course.custom_code.css }} />}
      <Navbar />

      {/* Sticky Navigation Bar */}
      <div className={`fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-[100] transition-all duration-300 transform ${showStickyNav ? 'translate-y-0' : '-translate-y-full shadow-none'}`}>
        <div className="container-base h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="hidden md:block">
              <span className="text-sm font-black text-slate-900 truncate max-w-[200px] block">{course.title}</span>
            </div>
            <nav className="flex items-center gap-6">
              <button 
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                課程詳情
              </button>
              <button 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                課程大綱
              </button>
              <button 
                onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
              >
                學員評論
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-baseline gap-2 mr-4">
              <span className="text-lg font-black text-slate-950">
                NT$ {(pricingOptions[selectedPricingIdx]?.price || course.discount_price || 0).toLocaleString()}
              </span>
              {(pricingOptions[selectedPricingIdx]?.original_price || course.original_price) > (pricingOptions[selectedPricingIdx]?.price || course.discount_price) && (
                <span className="text-xs text-slate-400 line-through font-bold">
                  NT$ {(pricingOptions[selectedPricingIdx]?.original_price || course.original_price)?.toLocaleString()}
                </span>
              )}
            </div>
            {hasPurchased ? (
              <Button 
                size="sm" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 rounded-full"
                asChild
              >
                <Link href={`/courses/${slug}/learn`}>進入教室</Link>
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 rounded-full"
                onClick={handleBuyNow}
              >
                立即購買
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 新 Hero 區塊：暗底、滿版、佈局重組 */}
      <section className="bg-slate-900 w-full overflow-hidden relative border-b border-white/5 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container-base relative z-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
            {/* 左側：標題、標籤、簡介、基本資料 */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className={`${statusColors[course.status] || "bg-blue-600"} border-0 px-3 py-1 font-bold rounded-lg`}>{course.status}</Badge>
                  {categories.map((cat: string) => (
                    <Badge key={cat} variant="muted" className="bg-white/5 text-slate-300 border-white/10 px-3 py-1 font-medium rounded-lg">{cat}</Badge>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                    {course.title}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* 基本資料區：課程長度、單元、觀看方式、評論、幾人加入 */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-blue-400"><Clock size={18} /></div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">課程時長</span>
                    <span className="text-white font-bold text-sm">{course.duration || "終身重複觀看"}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-emerald-400"><BookOpen size={18} /></div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">課程單元</span>
                    <span className="text-white font-bold text-sm">{totalLessons} 個小單元</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-purple-400"><MonitorPlay size={18} /></div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">觀看方式</span>
                    <span className="text-white font-bold text-sm">全載具線上看</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-yellow-400"><Star size={18} fill="currentColor" /></div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">學員評分</span>
                    <span className="text-white font-bold text-sm">{course.rating || '5.0'} ({reviews.length} 則評論)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 text-rose-400"><Users size={18} /></div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">加入人數</span>
                    <span className="text-white font-bold text-sm">{course.student_count || 0} 人已加入</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右側：影片 (約 1/3 寬度) */}
            <div className="w-full">
              {(course.intro_video_url || course.image_url) ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative">
                    {renderVideo(course.intro_video_url) || (
                      <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/5 bg-slate-800 flex items-center justify-center">
                        <img src={course.image_url} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <main className="container-base py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start text-left">
          {/* 左側內容區 */}
          <div className="space-y-12">
            {/* 最新消息 */}
            {course.news && course.news.trim() !== "" && (
              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-orange-50 border border-orange-100 text-orange-700 text-base font-bold shadow-sm">
                <Megaphone size={20} className="text-orange-500 animate-bounce flex-shrink-0" />
                <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-widest font-black flex-shrink-0">News</span>
                <span className="line-clamp-1">{course.news}</span>
              </div>
            )}

            {/* 課程介紹 */}
            <div id="details" className="space-y-8 scroll-mt-24">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">課程詳情</h3>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${!isDetailsExpanded ? 'max-h-[600px]' : 'max-h-none'}`}
                >
                  {course.custom_code?.html ? (
                    <div className="course-custom-intro-html course-detail" dangerouslySetInnerHTML={{ __html: course.custom_code.html }} />
                  ) : (
                    <div className="prose prose-slate max-w-none prose-headings:font-black prose-img:rounded-2xl prose-a:text-blue-600 text-slate-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: course.content || course.description }} />
                  )}
                </div>
                
                {!isDetailsExpanded && (
                  <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10 flex items-end justify-center pb-4">
                    <Button 
                      variant="outline" 
                      className="bg-white border-slate-200 shadow-lg gap-2 font-bold rounded-full px-8 hover:bg-slate-50 transition-all transform hover:-translate-y-1"
                      onClick={() => setIsDetailsExpanded(true)}
                    >
                      顯示更多課程詳情 <ChevronDown size={16} />
                    </Button>
                  </div>
                )}
                
                {isDetailsExpanded && (
                  <div className="mt-8 flex justify-center">
                    <Button 
                      variant="ghost" 
                      className="text-slate-400 hover:text-slate-600 font-bold"
                      onClick={() => {
                        setIsDetailsExpanded(false);
                        document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      收起詳情
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* 課程大綱 */}
            {modules.length > 0 && (
              <div id="syllabus" className="space-y-8 scroll-mt-24">
                <div className="flex items-end justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">課程大綱</h3>
                  </div>
                  <span className="text-sm text-slate-500 font-bold bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    共 {totalLessons} 個小單元
                  </span>
                </div>
                
                <div className="space-y-4">
                  {modules.map((module: any, mIdx: number) => (
                    <div key={module.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
                      <button onClick={() => toggleModule(module.id)} className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors text-left">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-950 text-white text-xs font-black">{mIdx + 1}</div>
                          <h4 className="font-black text-xl text-slate-900">{module.title}</h4>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold text-slate-400">
                            <span className="hidden sm:block">{module.lessons?.length || 0} 個小單元</span>
                            {getModuleDuration(module.lessons) && (
                              <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg text-slate-500 border border-slate-100 text-[10px] sm:text-xs">
                                <Clock size={12} className="text-blue-500" /> {getModuleDuration(module.lessons)}
                              </span>
                            )}
                          </div>
                          <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openModules.includes(module.id) ? "rotate-180" : ""}`} size={20} />
                        </div>
                      </button>
                      {openModules.includes(module.id) && (
                        <div className="px-6 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-300">
                          {module.lessons?.map((lesson: any, lIdx: number) => (
                            <div key={lesson.id} className={`flex flex-col gap-2 p-5 rounded-2xl border transition-all ${hasPurchased ? 'bg-blue-50/30 border-blue-100' : 'bg-slate-50/50 border-slate-100'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`p-2.5 rounded-full shadow-sm ${hasPurchased ? 'bg-blue-600 text-white cursor-pointer hover:scale-110 transition-transform' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                                    {hasPurchased ? <PlayCircle size={20} /> : <Lock size={18} />}
                                  </div>
                                  <div>
                                    <p className={`text-base font-black ${hasPurchased ? 'text-blue-950' : 'text-slate-800'}`}>
                                      {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                      {lesson.video_url && <Badge variant="muted" className="text-[10px] font-black h-4 px-1.5 bg-slate-100 border-slate-200">{hasPurchased ? 'VIDEO' : 'PRIVATE'}</Badge>}
                                      {hasPurchased && (lesson.supplemental_info || (lesson.attachments && lesson.attachments.length > 0)) && (
                                        <Badge variant="muted" className="text-blue-600 border-blue-200 bg-blue-50 text-[10px] gap-1 px-2 py-1"><FileText size={12} /> 附資源</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                  <span className="text-sm font-bold text-slate-400 font-mono bg-slate-100/50 px-2 py-1 rounded-md">
                                    {formatLessonDuration(lesson.duration)}
                                  </span>
                                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${hasPurchased ? 'bg-blue-600 text-white hover:scale-110 hover:shadow-blue-200' : 'bg-slate-200 text-slate-400'}`}>
                                    <PlayCircle size={18} fill={hasPurchased ? "white" : "none"} />
                                  </div>
                                </div>
                              </div>
                              {hasPurchased && (
                                <div className="pl-12 space-y-4 mt-6">
                                  {lesson.video_url && renderVideo(lesson.video_url)}
                                  {lesson.supplemental_info && (
                                    <div className="p-5 rounded-2xl bg-white border border-blue-100 text-sm text-slate-600 leading-relaxed shadow-sm">
                                      <div className="flex items-center gap-2 mb-3 font-black text-blue-900"><Info size={16} /> 補充資訊與下載</div>
                                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: lesson.supplemental_info }} />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 評價區塊 */}
            <div id="reviews" className="space-y-8 scroll-mt-24">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">學員真心心得</h3>
              </div>
              {loadingReviews ? (
                <div className="flex items-center justify-center py-10 text-slate-400"><Loader2 className="animate-spin" size={32} /></div>
              ) : reviews.length === 0 ? (
                <div className="p-16 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-400">
                  <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
                  <p className="font-black text-lg">目前尚無評論</p>
                  <p className="text-sm mt-1">成為第一個留下評論的學員吧！</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white font-black text-sm">{(rev.user_name?.[0] || 'U').toUpperCase()}</div>
                          <div>
                            <span className="font-black text-base text-slate-900 block">{rev.user_name}</span>
                            <span className="text-xs text-slate-400 font-bold">{formatDate(rev.created_at)}</span>
                          </div>
                        </div>
                        <div className="flex text-yellow-400 gap-0.5 text-xs">{"★".repeat(rev.rating)}</div>
                      </div>
                      <p className="text-base text-slate-600 leading-relaxed font-medium pl-14">{rev.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 側邊欄 - 選擇您的學習方案 */}
          <aside id="pricing-section" className="sticky top-28 space-y-8 z-20 scroll-mt-28">
            <div className="space-y-6">
              <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">選擇您的學習方案</h5>
              
              <div className="space-y-6">
                {pricingOptions.length > 0 ? pricingOptions.map((opt: any, idx: number) => (
                  <Card 
                    key={idx} 
                    className={`relative overflow-hidden transition-all duration-300 border-2 cursor-pointer group ${
                      selectedPricingIdx === idx 
                        ? 'border-blue-600 shadow-2xl shadow-blue-900/15 -translate-y-2' 
                        : 'border-slate-100 hover:border-blue-300 hover:shadow-xl bg-white'
                    } ${hasPurchased ? 'opacity-60 grayscale pointer-events-none' : ''}`}
                    onClick={() => setSelectedPricingIdx(idx)}
                  >
                    {selectedPricingIdx === idx && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-black px-4 py-1.5 rounded-bl-2xl z-20">
                        目前選取
                      </div>
                    )}
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <h4 className={`text-xl font-black transition-colors ${selectedPricingIdx === idx ? 'text-blue-600' : 'text-slate-900'}`}>
                          {opt.label}
                        </h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-slate-950">NT$ {opt.price?.toLocaleString()}</span>
                          {opt.original_price > opt.price && (
                            <span className="text-sm text-slate-400 line-through font-bold">NT$ {opt.original_price?.toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      {opt.description && (
                        <p className="text-sm text-slate-500 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          {opt.description}
                        </p>
                      )}

                      <div className="space-y-4">
                        <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">方案包含內容</h6>
                        <ul className="space-y-3">
                          {opt.features && opt.features.length > 0 ? (
                            opt.features.map((feature: string, i: number) => (
                              <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                <span className="text-emerald-500 bg-emerald-50 p-1 rounded-lg flex-shrink-0">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))
                          ) : (
                            [
                              { icon: <Clock size={16} />, val: course.duration || "終身觀看權限" },
                              { icon: <FileText size={16} />, val: "完整教材與資源下載" },
                              { icon: <Users size={16} />, val: "專屬學員討論區" },
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                <span className="text-emerald-500 bg-emerald-50 p-1 rounded-lg flex-shrink-0">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                                {item.val}
                              </li>
                            ))
                          )}
                        </ul>
                      </div>

                      <Button 
                        size="lg" 
                        className={`w-full h-14 text-base font-black rounded-2xl transition-all ${
                          selectedPricingIdx === idx 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20' 
                            : 'bg-slate-950 hover:bg-blue-600 text-white'
                        }`}
                        onClick={handleBuyNow}
                      >
                        {hasPurchased ? "您已擁有此課程" : "立即購買"}
                      </Button>
                    </CardContent>
                  </Card>
                )) : (
                  <Card className="border-2 border-blue-600 shadow-2xl shadow-blue-900/15">
                    <CardContent className="p-8 space-y-8">
                      <div className="space-y-2 text-center">
                        <h4 className="text-xl font-black text-blue-600">標準入學方案</h4>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-black text-slate-950">NT$ {course.discount_price?.toLocaleString()}</span>
                          <span className="text-base text-slate-400 line-through font-bold">NT$ {course.original_price?.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="w-full h-16 text-lg font-black bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-900/20 disabled:bg-slate-200"
                        disabled={course.status === "已額滿" || course.status === "已下架"}
                        onClick={handleBuyNow}
                      >
                        {course.status === "已額滿" ? "名額已滿" : "立即購買"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-2 py-4">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="w-12 h-px bg-slate-100" />
                  7 天安心退款保證
                  <span className="w-12 h-px bg-slate-100" />
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
