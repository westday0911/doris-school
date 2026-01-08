"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrowserMockup } from "@/components/BrowserMockup";
import { TechBackground } from "@/components/TechBackground";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/components/providers/auth-provider";
import { formatDate } from "@/lib/utils";
import { Brain, Rocket, Zap, Target, Layers, Cpu } from "lucide-react";

export default function HomeClient({ 
  initialCourses, 
  initialArticles 
}: { 
  initialCourses: any[], 
  initialArticles: any[] 
}) {
  const { user, loading } = useAuth();
  const courses = initialCourses;
  const articles = initialArticles;

  const latestCourse = courses.find(c => c.slug === 'vibe-coding') || courses[0] || {
    title: "Vibe Coding 系統實戰課",
    description: "掌握最新的 Vibe Coding 趨勢，從系統架構到實戰開發，打造具備極致體驗的現代化應用。",
    tag: "進階課",
    level: "進階實戰",
    duration: "12 小時",
    original_price: 12800,
    discount_price: 8800,
    image_url: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&h=1000&fit=crop&crop=center"
  };

  return (
    <div className="relative">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="section-spacing bg-white overflow-visible min-h-[600px] lg:min-h-[700px] pb-32 lg:pb-40 relative" id="hero">
          <TechBackground />
          <div className="container-base relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-6 relative z-10">
                <Badge variant="muted">用 AI 和科技 解決問題</Badge>
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-5xl font-bold leading-tight tracking-tighter text-slate-950">
                    <span className="gradient-text">學習 AI</span>
                    <span className="block mt-2 gradient-text-blue text-4xl sm:text-5xl lg:text-6xl">
                    把想法變成真正開始營運的產品與流程
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-[600px]">
                    從策略、工具到實戰案例，陪你一步步建立 AI
                    能力，讓團隊與個人都能快速看見成果。
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="shadow-md" asChild>
                    <Link href="/courses">探索最新課程</Link>
                  </Button>
                  
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    <span>Vibe Coding 實戰導向</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                    <span>AI 自動化工作流</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
                    <span>科技新創產品化</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Browser Mockup */}
            <div className="absolute top-8 right-4 lg:top-16 lg:right-8 z-30 w-[400px] sm:w-[500px] lg:w-[600px]" id="browser-mockup">
              <BrowserMockup 
                images={[
                  "/hero-right-image.png",
                  "/hero-right-image.png", 
                  "/hero-right-image.png",
                  "/hero-right-image.png"
                ]}
                autoSlideInterval={3000}
              />
            </div>

            {/* 年輕人圖片 */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 sm:-bottom-24 lg:-bottom-32 z-40 w-[300px] sm:w-[400px] lg:w-[500px]" id="young-person">
              <img
                src="/young.png"
                alt="年輕人"
                className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-all duration-700"
              />
            </div>

            
          </div>
        </section>

        {/* Latest Course Section - Vibe Coding Redesign */}
        <section className="py-24 sm:py-32 relative overflow-hidden bg-slate-950" id="latest">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
          </div>

          <div className="container-base relative z-10">
            <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-400">Vibe Coding Era</span>
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.1]">
                      {latestCourse.title.split(' ')[0]} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                        {latestCourse.title.split(' ').slice(1).join(' ')}
                      </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-[540px] font-medium">
                      不只是寫程式，而是與 AI 共舞。掌握這套「直覺驅動」的開發模式，讓你的創意在瞬間轉化為產品。
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: "從「做出畫面」到「完成系統」", desc: "Vibe Coding 讓開始變得很快，但真正能用的完整系統是不一樣的，我們教你如何真正完成前端到後端完整體驗。" },
                    { label: "使用 Cursor 讓開發速度 x10", desc: "深度運用 Cursor AI 輔助，將開發效率提升 10 倍以上，讓技術不再是創意實現的阻礙。" },
                    { label: "無痛跨越技術門檻", desc: "無論你是沒有程式基礎、或是純設計師，都能體驗親手從零完成一個完整系統的成就感。" },
                    { label: "商業購物系統實戰", desc: "最終會做出一套商業購物系統，包含完整的資料庫、金流與前後端串接實務。" }
                  ].map((item) => (
                    <div key={item.label} className="group flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all duration-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white tracking-wide">{item.label}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <Link href={`/courses/${latestCourse.slug}`} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full h-16 px-10 text-lg font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] border-0 rounded-2xl">
                      立即預購
                    </Button>
                  </Link>
                  
                </div>
              </div>

              <div className="relative group">
                {/* Image Glass Card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl">
                  <img
                    src={latestCourse.image_url || "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&h=1000&fit=crop&crop=center"}
                    alt={latestCourse.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Floating UI Elements */}
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-bounce-slow">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold text-white">早鳥預購中</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-950/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">目前售價</p>
                        <p className="text-2xl font-black text-white">
                          {latestCourse.discount_price === 0 ? "免費課程" : `NT$ ${latestCourse.discount_price?.toLocaleString()}`}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {latestCourse.status === "預購中" ? "預計開課" : "開課日期"}
                        </p>
                        <p className="text-sm font-bold text-white">
                          {latestCourse.launch_date 
                            ? new Date(latestCourse.launch_date).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
                            : (latestCourse.created_at ? new Date(latestCourse.created_at).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') : "即將開課")
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vibe Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="section-spacing bg-white" id="popular">
          <div className="container-base space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="muted" className="rounded-md px-2">課程列表</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  精選實戰課程
                </h2>
              </div>
              <p className="text-slate-500 text-sm max-w-xs">
                從基礎到進階，陪你一步步建立 AI 能力，讓團隊都能快速看見成果。
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="flex flex-col h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 rounded-xl bg-white">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-black/80 backdrop-blur-md text-white border-0 text-[10px] px-2 py-0">
                        {course.tag}
                      </Badge>
                      <Badge variant="muted" className="bg-white/90 backdrop-blur-md text-slate-900 border-0 text-[10px] px-2 py-0">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 space-y-2">
                    <div className="flex items-center text-[11px] font-medium text-slate-400">
                      <span>{course.duration}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-950 leading-tight group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-slate-500 line-clamp-2 text-xs leading-normal">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-5 mt-auto">
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        {course.discount_price === 0 ? (
                          <span className="text-xl font-bold text-emerald-600 leading-none">免費課程</span>
                        ) : (
                          <>
                            <span className="text-[10px] text-slate-400 line-through leading-none mb-1">NT$ {course.original_price?.toLocaleString()}</span>
                            <span className="text-xl font-bold text-slate-950 leading-none">NT$ {course.discount_price?.toLocaleString()}</span>
                          </>
                        )}
                      </div>
                      <Link href={`/courses/${course.slug}`}>
                        <Button size="sm" variant="default" className="rounded-lg h-8 text-xs">
                          立即查看
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="section-spacing bg-white overflow-hidden" id="about">
          <div className="container-base">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="relative w-full lg:w-1/2">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60" />
                <img
                  src="/avatar.png"
                  alt="Founder Doris"
                  className="relative z-10 w-full h-auto rounded-[2.5rem] shadow-2xl hover:scale-[1.02] transition-all duration-700"
                />
              </div>
              
              <div className="w-full lg:w-1/2 space-y-10 relative z-10">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Badge variant="muted" className="bg-blue-50 text-blue-600 border-0 px-3 py-1">我也是從「自己摸索」一路走過來的</Badge>
                    <h2 className="text-5xl font-black tracking-tight text-slate-950">
                      Hi, 我是 Doris
                    </h2>
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-6">
                    「學習開發的路上我不是一路都很順的人。很多你現在卡住的地方，我其實都卡過。」
                  </p>
                  <div className="space-y-6 text-slate-600 leading-relaxed">
                    <p>
                      我經營一個 YouTube 頻道，分享開發、AI 與產品實作的經驗；也曾獨自完成一個線上開店平台<strong>『海浪商店 HiinPay』</strong>，從前台、後台、會員、金流到部署，所有功能都是自己一個人完成。
                    </p>
                    <p>
                      過去我也開過兩門線上課程，慢慢發現：大家真正需要的，不是更多語法，而是<strong>「怎麼把東西完成」</strong>。
                    </p>
                    <p className="font-bold text-slate-950">
                      這個學院，目的就是希望我把自己一路走來的做法和經驗，整理成一套可以重複使用的流程，分享給和我有同樣夢想，喜歡十座產品、想要嘗試一人創業或是想要親手做出最符合需求的系統的人們，陪你少走一點冤枉路。
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {[
                    { label: "專案開發", val: "300+" },
                    { label: "服務客戶", val: "1000+" },
                    { label: "創造價值", val: "20億+" },
                    { label: "實戰經驗", val: "10年+" },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-3xl font-black text-slate-950 tracking-tighter">{stat.val}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                  <Button className="w-full sm:w-auto rounded-2xl h-14 px-10 shadow-xl hover:shadow-2xl transition-all bg-slate-950 text-white">了解更多關於我</Button>
                  <a href="https://www.youtube.com/@DorisALiao" target="_blank" rel="noopener noreferrer">
                    YouTube 頻道 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="section-spacing bg-white" id="articles">
          <div className="container-base space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3">
                <Badge variant="muted" className="rounded-md">資源中心</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  最新 AI 觀點
                </h2>
                <p className="text-slate-500 text-sm">
                  分享我們在 AI 實戰中的觀察與實踐方法。
                </p>
              </div>
              <Link href="/blog">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-950 group h-auto p-0">
                  查看所有文章 <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </Link>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <Card key={article.id} className="group overflow-hidden border-slate-200 rounded-lg hover:shadow-md transition-all duration-300 flex flex-col">
                  <Link href={`/blog/${article.slug}`} className="flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-slate-200 text-[10px] px-2 py-0.5 rounded-sm">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                        <span>{formatDate(article.published_at || article.created_at)}</span>
                      </div>
                      <CardTitle className="text-base font-bold text-slate-950 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-slate-500 text-[13px] leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Redesigned for Premium Look */}
        <section className="py-24 sm:py-32 bg-slate-50/50" id="features">
          <div className="container-base">
            <div className="max-w-[800px] mx-auto text-center space-y-6 mb-20">
              <Badge variant="muted" className="rounded-full px-4 py-1 bg-white border-slate-200 text-slate-600 shadow-sm uppercase tracking-widest">Core Values</Badge>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
                掌握 <span className="text-blue-600">AI 時代</span> 的生存法則
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-[600px] mx-auto">
                技術框架會不斷演進，唯有「解決問題的邏輯」與「與 AI 協作的能力」才是你最核心的競爭力。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "應用導向的學習歷程",
                  desc: "拒絕純理論灌輸。從真實場景出發，將每個知識點直接對接到實際應用，讓學習效果立即被看見。",
                  icon: <Target className="w-8 h-8 text-blue-600" />,
                  bg: "bg-blue-50"
                },
                {
                  title: "極大化 AI 資源效率",
                  desc: "教你如何整合並自動化各種 AI 資源，不僅是學會工具，更是學會如何精準達成商業目標。",
                  icon: <Layers className="w-8 h-8 text-indigo-600" />,
                  bg: "bg-indigo-50"
                },
                {
                  title: "實戰案例深度分享",
                  desc: "活用 AI 及技術知識，結合講師多年開發與創業經驗，拆解豐富的實作案例，帶你避開所有地雷。",
                  icon: <Rocket className="w-8 h-8 text-amber-500" />,
                  bg: "bg-amber-50"
                }
              ].map((feature) => (
                <div 
                  key={feature.title} 
                  className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Decorative Background Element */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 ${feature.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700`} />
                  
                  <div className="relative z-10 space-y-6">
                    <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                      {feature.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-950 tracking-tight leading-tight">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed font-medium">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-spacing bg-white" id="newsletter">
          <div className="container-base">
            <div className="relative rounded-3xl bg-slate-950 p-8 md:p-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-600/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    不想錯過任何 <span className="text-blue-400">AI 實戰新知</span>？
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    每週分享最新的 AI 工具評測、提示詞框架以及自動化工作流案例。加入 2000+ 訂閱者的行列。
                  </p>
                  <ul className="space-y-3">
                    {[
                      "最新 AI 趨勢分析",
                      "獨家 Prompt 模板分享",
                      "課程優先報名權"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                        <div className="h-1 w-1 rounded-full bg-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="輸入您的 Email 地址" 
                    className="flex-1 bg-transparent border-0 px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                  />
                  <Button className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all">
                    訂閱電子報
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Redesigned with Background Illustration */}
        <section className="py-24 sm:py-32 relative overflow-hidden" id="cta">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/future-school.png" 
              alt="Future School Illustration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 backdrop-blur-xs" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          </div>

          <div className="container-base relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <div className="space-y-6">
                <Badge variant="muted" className="bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold uppercase tracking-[0.2em]">
                  Ready to Start?
                </Badge>
                <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  加入 Doris AI 學院 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    開啟你的 AI 學習旅程
                  </span>
                </h2>
                <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                  不只是學習工具，更是掌握不被取代的實戰能力。立即取得課程資訊與最新招生通知，與我們一起在 AI 浪潮中前行。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {!loading && !user ? (
                  <>
                    <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-lg font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] border-0 rounded-2xl" asChild>
                      <Link href="/auth/register">立即加入會員</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-12 text-lg font-bold text-white border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl" asChild>
                      <Link href="/auth/login">已有帳號登入</Link>
                    </Button>
                  </>
                ) : (
                  <Button size="lg" className="w-full sm:w-auto h-16 px-16 text-lg font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] border-0 rounded-2xl" asChild>
                    <Link href="/courses">進入課程大廳</Link>
                  </Button>
                )}
              </div>
              
              <p className="text-slate-500 text-sm font-medium">
                已有超過 1,200+ 位學員加入我們的行列
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

