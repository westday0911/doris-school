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
  Info, Lock, Download, FileText, Globe
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/components/providers/auth-provider";

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
  const [course, setCourse] = useState<any>(initialCourse);
  const [modules, setModules] = useState<any[]>(initialModules);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(true);
  const [openModules, setOpenModules] = useState<string[]>(initialModules.length > 0 ? [initialModules[0].id] : []);

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

  // 解析影片連結並產生 Iframe (更強健的解析)
  const renderVideo = (url: string) => {
    if (!url) return null;
    
    let embedUrl = "";
    try {
      const cleanUrl = url.trim();
      if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
        let id = "";
        if (cleanUrl.includes("v=")) {
          id = cleanUrl.split("v=")[1].split("&")[0];
        } else {
          id = cleanUrl.split("/").pop() || "";
        }
        embedUrl = `https://www.youtube.com/embed/${id}`;
      } else if (cleanUrl.includes("vimeo.com")) {
        const id = cleanUrl.split("/").pop();
        embedUrl = `https://player.vimeo.com/video/${id}`;
      }
    } catch (e) {
      console.error("Video URL parsing error:", e);
    }

    if (!embedUrl) return null;

    return (
      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800">
        <iframe 
          src={embedUrl}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container-base py-40 text-center space-y-4">
          <h1 className="text-4xl font-black text-slate-900">找不到該課程</h1>
          <p className="text-slate-500">抱歉，您所尋找的課程可能已下架或網址有誤。</p>
          <Link href="/courses">
            <Button className="mt-8">返回課程列表</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pricingOptions = Array.isArray(course.pricing_options) ? course.pricing_options : [];
  const categories = Array.isArray(course.categories) ? course.categories : (course.tag ? [course.tag] : []);

  const statusColors: any = {
    "預購中": "bg-orange-100 text-orange-600",
    "已上架": "bg-emerald-100 text-emerald-600",
    "招生中": "bg-blue-100 text-blue-600",
    "已額滿": "bg-rose-100 text-rose-600",
    "已下架": "bg-slate-100 text-slate-500"
  };

  return (
    <div className="relative bg-white min-h-screen">
      {course.custom_code?.css && (
        <style dangerouslySetInnerHTML={{ __html: course.custom_code.css }} />
      )}
      
      <Navbar />

      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 overflow-hidden relative border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container-base relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* 最新消息 - 顯眼標示 */}
            {course.news && (
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-black shadow-lg shadow-orange-500/20 animate-in fade-in slide-in-from-top-4 duration-700">
                <Megaphone size={16} className="animate-bounce" />
                <span className="border-r border-white/20 pr-3 mr-1 uppercase tracking-widest text-[10px]">Latest News</span>
                {course.news}
              </div>
            )}

            <div className="space-y-6">
              <div className="flex flex-wrap justify-center gap-3">
                <Badge className={`${statusColors[course.status] || "bg-blue-600"} border-0 px-3 py-1 font-bold`}>{course.status}</Badge>
                {categories.map((cat: string) => (
                  <Badge key={cat} variant="outline" className="text-white border-white/20 px-3 py-1 font-medium">{cat}</Badge>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
                {course.title}
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="text-white text-lg font-bold">{course.rating || '5.0'}</span>
                <span>({reviews.length || course.review_count || 0} 則學員好評)</span>
              </div>
              <div className="h-4 w-px bg-slate-800 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Users className="text-blue-500" size={18} />
                <span className="text-white text-lg font-bold">{course.student_count || 0}</span>
                <span>人已加入學習</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container-base py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
          <div className="space-y-20">
            
            {/* 介紹影片 - 換到課程介紹上方，寬度稍微縮小一點避免視覺壓迫 */}
            {(course.intro_video_url || course.image_url) && (
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">課程預覽</h3>
                </div>
                <div className="w-full max-w-4xl mx-auto">
                  {course.intro_video_url ? (
                    renderVideo(course.intro_video_url)
                  ) : (
                    <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 flex items-center justify-center">
                      <img src={course.image_url} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 課程介紹 */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">課程詳情</h3>
              </div>
              {course.custom_code?.html ? (
                <div 
                  className="course-custom-intro-html"
                  dangerouslySetInnerHTML={{ __html: course.custom_code.html }}
                />
              ) : (
                <div 
                  className="prose prose-slate max-w-none prose-headings:font-black prose-img:rounded-3xl prose-a:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: course.content || course.description }}
                />
              )}
            </div>

            {/* 課程大綱 */}
            {modules.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-end justify-between border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">課程大綱</h3>
                  </div>
                  <span className="text-sm text-slate-500 font-bold bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    共 {modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)} 堂課堂
                  </span>
                </div>
                
                <div className="space-y-4">
                  {modules.map((module: any, mIdx: number) => (
                    <div key={module.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                      <button 
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-950 text-white text-xs font-black">
                            {mIdx + 1}
                          </div>
                          <h4 className="font-black text-slate-900 text-lg">{module.title}</h4>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-slate-400 font-bold hidden sm:block">{module.lessons?.length || 0} Lessons</span>
                          <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openModules.includes(module.id) ? "rotate-180" : ""}`} size={20} />
                        </div>
                      </button>
                      
                      {openModules.includes(module.id) && (
                        <div className="px-6 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-300">
                          {module.lessons?.map((lesson: any, lIdx: number) => (
                            <div key={lesson.id} className={`flex flex-col gap-3 p-5 rounded-2xl border transition-all ${hasPurchased ? 'bg-blue-50/20 border-blue-100' : 'bg-slate-50/50 border-slate-100'}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  {hasPurchased ? <PlayCircle size={20} className="text-blue-600" /> : <Lock size={18} className="text-slate-300" />}
                                  <div>
                                    <p className={`text-sm font-bold ${hasPurchased ? 'text-blue-950' : 'text-slate-700'}`}>{lesson.title}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                      {lesson.duration && (
                                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                          <Clock size={10} /> {lesson.duration}
                                        </span>
                                      )}
                                      {lesson.video_url && <Badge variant="secondary" className="text-[9px] h-4 leading-none">{hasPurchased ? 'VIDEO' : 'PRIVATE'}</Badge>}
                                    </div>
                                  </div>
                                </div>
                                {hasPurchased && (lesson.supplemental_info || (lesson.attachments && lesson.attachments.length > 0)) && (
                                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 text-[10px] gap-1">
                                    <FileText size={10} /> 附資源
                                  </Badge>
                                )}
                              </div>

                              {/* 已購課學員顯示影片區與補充資訊 */}
                              {hasPurchased && (
                                <div className="pl-9 space-y-4">
                                  {lesson.video_url && (
                                    <div className="aspect-video bg-black rounded-xl overflow-hidden mt-2">
                                      <iframe 
                                        src={lesson.video_url.includes('vimeo') 
                                          ? `https://player.vimeo.com/video/${lesson.video_url.split('/').pop()}` 
                                          : lesson.video_url.includes('youtube') || lesson.video_url.includes('youtu.be')
                                            ? `https://www.youtube.com/embed/${lesson.video_url.includes('v=') ? lesson.video_url.split('v=')[1].split('&')[0] : lesson.video_url.split('/').pop()}`
                                            : lesson.video_url
                                        }
                                        className="w-full h-full"
                                        allow="autoplay; fullscreen"
                                        allowFullScreen
                                      ></iframe>
                                    </div>
                                  )}
                                  {lesson.supplemental_info && (
                                    <div className="p-4 rounded-xl bg-white border border-blue-100 text-xs text-slate-600 leading-relaxed">
                                      <div className="flex items-center gap-2 mb-2 font-bold text-blue-900">
                                        <Info size={14} /> 補充資訊與下載
                                      </div>
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
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">學員真心心得</h3>
              </div>
              {loadingReviews ? (
                <div className="flex items-center justify-center py-10 text-slate-400"><Loader2 className="animate-spin" /></div>
              ) : reviews.length === 0 ? (
                <div className="p-16 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-200 text-slate-400">
                  <p className="font-bold text-lg">目前尚無評論</p>
                  <p className="text-sm">成為第一個留下評論的學員吧！</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-sm">{(rev.user_name?.[0] || 'U').toUpperCase()}</div>
                          <span className="font-black text-slate-900">{rev.user_name}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-bold">{new Date(rev.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-yellow-400 gap-0.5">{"★".repeat(rev.rating)}</div>
                      <p className="text-slate-600 leading-relaxed font-medium">{rev.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="pt-4">
                {!user ? (
                  <Button variant="outline" className="w-full py-8 rounded-2xl font-black border-2 border-dashed border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all" asChild>
                    <Link href="/auth/login">登入後發表評論</Link>
                  </Button>
                ) : !hasPurchased ? (
                  <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-3">
                    <Lock className="mx-auto text-slate-300" size={32} />
                    <p className="font-black text-slate-500">只有購課學員可以發表評論</p>
                  </div>
                ) : (
                  <Button className="w-full py-8 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/10">發表課程學習心得</Button>
                )}
              </div>
            </div>
          </div>

          {/* 側邊欄 */}
          <aside className="sticky top-28 space-y-8">
            <Card className="border-slate-200 shadow-2xl rounded-[32px] overflow-hidden bg-white border-t-8 border-t-blue-600">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">選擇購買方案</h5>
                  <div className="space-y-3">
                    {pricingOptions.length > 0 ? pricingOptions.map((opt: any, idx: number) => (
                      <div key={idx} className={`p-5 rounded-2xl border-2 transition-all group cursor-pointer ${hasPurchased ? 'border-slate-50 opacity-50 pointer-events-none' : 'border-slate-100 bg-slate-50/50 hover:border-blue-600 hover:bg-white'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{opt.label}</span>
                          <div className="text-right">
                            <div className="font-black text-slate-900 text-lg">NT$ {opt.price?.toLocaleString()}</div>
                            {opt.original_price > opt.price && (
                              <div className="text-[10px] text-slate-400 line-through font-bold">NT$ {opt.original_price?.toLocaleString()}</div>
                            )}
                          </div>
                        </div>
                        {opt.description && <p className="text-xs text-slate-500 leading-relaxed font-medium mt-2">{opt.description}</p>}
                      </div>
                    )) : (
                      <div className="p-6 rounded-2xl border-2 border-blue-100 bg-blue-50/30">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-black text-slate-950">NT$ {course.discount_price?.toLocaleString()}</span>
                          <span className="text-sm text-slate-400 line-through font-bold">NT$ {course.original_price?.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {hasPurchased ? (
                    <Button size="lg" className="w-full h-16 text-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xl">
                      您已加入本課程
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full h-16 text-xl font-black bg-slate-950 hover:bg-blue-600 transition-all rounded-2xl shadow-xl disabled:bg-slate-300" disabled={course.status === "已額滿" || course.status === "已下架"}>
                      {course.status === "已額滿" ? "名額已滿" : course.status === "預購中" ? "立即預購課程" : "立即購買課程"}
                    </Button>
                  )}
                  <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">30 天無條件退款保證</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">學習包含內容</h5>
                  <ul className="space-y-4">
                    {[
                      { icon: <Clock size={18} />, val: course.duration || "終身重複觀看" },
                      { icon: <FileText size={18} />, val: "完整講義與專案檔下載" },
                      { icon: <Users size={18} />, val: "專屬學員社群討論區" },
                      { icon: <Globe size={18} />, val: "全載具支援隨時學習" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-600">
                        <span className="text-blue-600 p-2 rounded-lg bg-blue-50">{item.icon}</span>
                        {item.val}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
