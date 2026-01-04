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
import { Loader2, MessageSquare, BookOpen, Clock, BarChart, Users, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function CourseDetailClient({ 
  initialCourse, 
  slug 
}: { 
  initialCourse: any, 
  slug: string 
}) {
  const [course, setCourse] = useState<any>(initialCourse);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    if (course) {
      fetchReviews(course.id);
    }
  }, [course]);

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
      </div>
    );
  }

  const syllabus = Array.isArray(course.syllabus) ? course.syllabus : [];

  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container-base relative z-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-600 border-0">{course.tag || '熱門課程'}</Badge>
                <Badge variant="outline" className="text-white border-white/20">{course.level || '進階'}</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-400 max-w-[700px]">
                {course.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="text-yellow-400 font-bold">{course.rating || '5.0'}</span>
                  <span className="text-slate-500">({reviews.length || course.review_count || 0} 則評論)</span>
                </div>
                <div className="text-slate-500">
                  <span className="text-white font-bold">{course.student_count || 0}</span> 位學員已加入
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container-base py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
          <div className="space-y-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-950 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full" />
                課程試聽
              </h3>
              <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 shadow-inner">
                <img 
                  src={course.image_url || "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&h=800&fit=crop"} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/50 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-slate-950 border-b-[12px] border-b-transparent ml-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-950">課程介紹</h3>
              <div 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: course.content || course.description }}
              />
            </div>

            {syllabus.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-slate-950">課程大綱</h3>
                  <span className="text-sm text-slate-500 font-medium">{syllabus.length} 個單元</span>
                </div>
                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {syllabus.map((phase: any, idx: number) => (
                    <div key={idx} className="p-6 bg-white">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 text-white text-[10px]">{idx + 1}</span>
                        {phase.title}
                      </h4>
                      <ul className="space-y-3 pl-9">
                        {phase.lessons?.map((lesson: string, lIdx: number) => (
                          <li key={lIdx} className="text-sm text-slate-500 flex items-center justify-between">
                            <span className="flex items-center gap-3">
                              <div className="w-1 h-1 rounded-full bg-slate-300" />
                              {lesson}
                            </span>
                            <Badge variant="muted" className="text-[9px] bg-slate-50 border-0">Video</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-950">學員評論</h3>
              <div className="grid gap-6">
                {loadingReviews ? (
                  <div className="flex items-center justify-center py-10 text-slate-400">
                    <Loader2 className="animate-spin mr-2" /> 評論讀取中...
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="p-10 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-400">
                    <MessageSquare className="mx-auto mb-2 opacity-20" size={32} />
                    <p>目前尚無評論，成為第一個留下評論的人吧！</p>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900">{rev.user_name}</span>
                        <span className="text-xs text-slate-400">
                          {new Date(rev.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex text-yellow-400 text-xs">
                        {"★".repeat(rev.rating)}
                        <span className="text-slate-200">{"★".repeat(5 - rev.rating)}</span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {rev.content}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full py-6 rounded-xl font-bold">發表評論</Button>
              </div>
            </div>
          </div>

          <aside className="sticky top-28 space-y-8">
            <Card className="border-slate-200 shadow-2xl rounded-3xl overflow-hidden bg-white">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.image_url || "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&h=400&fit=crop"} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-slate-950">NT$ {course.discount_price?.toLocaleString()}</span>
                    <span className="text-lg text-slate-400 line-through font-medium">NT$ {course.original_price?.toLocaleString()}</span>
                  </div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">限時優惠中</p>
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full h-14 text-lg font-black bg-slate-950 hover:bg-blue-600 transition-all rounded-2xl shadow-xl">
                    立即購買課程
                  </Button>
                  <p className="text-[10px] text-slate-400 text-center font-medium">30 天無條件退款保證</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">包含內容</h5>
                  <ul className="space-y-3">
                    {[
                      { icon: <Clock size={16} />, val: course.duration + " 高畫質影片" },
                      { icon: <BookOpen size={16} />, val: "專屬提示詞模板庫" },
                      { icon: <Users size={16} />, val: "VIP 社群討論權限" },
                      { icon: <BarChart size={16} />, val: "結業實戰證書" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <span className="text-blue-500">{item.icon}</span>
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
    </div>
  );
}

