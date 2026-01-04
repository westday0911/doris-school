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
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function HomeClient({ 
  initialCourses, 
  initialArticles 
}: { 
  initialCourses: any[], 
  initialArticles: any[] 
}) {
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

  const testimonials = [
    {
      name: "陳雅婷 · 產品經理",
      quote: "課程內容非常實戰，讓我把 AI 變成工作流程的一部分。",
    },
    {
      name: "黃志明 · 創業者",
      quote: "Doris 的拆解方式清楚又有邏輯，團隊效率提升非常明顯。",
    },
    {
      name: "李小芸 · 行銷專家",
      quote: "我第一次感受到 AI 學習不再是冷冰冰的技術，而是解決問題的方法。",
    },
  ];

  return (
    <div className="relative">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="section-spacing bg-white overflow-visible min-h-[600px] lg:min-h-[700px] pb-32 lg:pb-40" id="hero">
          <div className="container-base relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-6 relative z-10">
                <Badge variant="muted">用 AI 和科技 解決問題</Badge>
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-slate-950">
                    <span className="gradient-text">學習 AI</span>
                    <span className="block mt-2 gradient-text-blue text-4xl sm:text-5xl lg:text-6xl">
                    把想法變成真正跑得動的產品與流程
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
                  <Button variant="outline" size="lg">
                    下載課程企劃
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                  <span>50+ 企業合作</span>
                  <span>1200+ 學員</span>
                  <span>8 週實戰陪跑</span>
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
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-200 border border-slate-300 shadow-sm z-10">
                <div className="absolute inset-0 rounded-full bg-slate-300 animate-ping"></div>
              </div>
            </div>

            {/* 年輕人圖片 */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 sm:-bottom-24 lg:-bottom-32 z-40 w-[300px] sm:w-[400px] lg:w-[500px]" id="young-person">
              <img
                src="/young.png"
                alt="年輕人"
                className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-all duration-700"
              />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-200 border border-slate-300 shadow-sm z-10">
                <div className="absolute inset-0 rounded-full bg-slate-300 animate-ping"></div>
              </div>
            </div>

            {/* 連接線 SVG */}
            <div className="absolute inset-0 pointer-events-none z-[15]" style={{ overflow: 'hidden' }}>
              <svg 
                className="absolute w-full h-full"
                style={{ height: '100%', width: '100%', overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="connectionLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#cbd5e1" opacity="0.6" />
                  </marker>
                </defs>
                <path
                  d="M 50% 92% Q 65% 70%, 85% 25%"
                  stroke="url(#connectionLineGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8,8"
                  markerEnd="url(#arrowhead)"
                  className="connection-line"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Latest Course Section */}
        <section className="section-spacing bg-slate-50/30 overflow-hidden" id="latest">
          <div className="container-base">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="bg-blue-600 text-white border-0">NEW</Badge>
                    <span className="text-sm font-bold tracking-widest uppercase text-blue-600">最新課程發佈</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950 leading-tight">
                    {latestCourse.title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-[600px]">
                    {latestCourse.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">開課日期</h4>
                    <p className="text-lg font-bold text-slate-900">2025 春季招生</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">適合對象</h4>
                    <p className="text-lg font-bold text-slate-900">{latestCourse.level}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href={`/courses/${latestCourse.slug}`}>
                    <Button size="lg" className="h-14 px-8 text-lg font-bold bg-slate-950 text-white hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                      立即報名課程
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-2xl blur-2xl group-hover:opacity-75 transition-opacity" />
                <Card className="relative border-slate-200 shadow-2xl overflow-hidden rounded-2xl bg-white">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={latestCourse.image_url || "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&h=1000&fit=crop&crop=center"}
                      alt={latestCourse.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                </Card>
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
                        <span className="text-[10px] text-slate-400 line-through leading-none mb-1">NT$ {course.original_price?.toLocaleString()}</span>
                        <span className="text-xl font-bold text-slate-950 leading-none">NT$ {course.discount_price?.toLocaleString()}</span>
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
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-60" />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop&crop=face"
                  alt="Founder Doris"
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="w-full lg:w-1/2 space-y-10 relative z-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-blue-600 font-bold tracking-[0.2em] text-xs uppercase">Founder of Doris AI Academy</span>
                    <h2 className="text-5xl font-black tracking-tight text-slate-950">
                      我是 Doris
                    </h2>
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    我教的不是 AI 技術，而是如何成為那個 <span className="text-slate-950 underline decoration-blue-500 underline-offset-8 decoration-4">懂的運用 AI 的人</span>。
                  </p>
                  <div className="space-y-4 text-slate-500 leading-relaxed">
                    <p>
                      擁有超過 10 年的數位轉型經驗，近年專注於生成式 AI 的商業落地應用。我深信 AI 不應只是工程師的玩具，而是每個人都能掌握的效率武器。
                    </p>
                    <p>
                      曾協助超過 50 家企業導入 AI 工作流，並透過結構化的教學方式，帶領 1200+ 名學員從零建立自己的 AI 能力。
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { label: "實戰企業", val: "50+" },
                    { label: "授課學員", val: "1200+" },
                    { label: "顧問時數", val: "2000+" },
                    { label: "專案落地", val: "100+" },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-3xl font-black text-slate-950 tracking-tighter">{stat.val}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <Button className="rounded-full h-14 px-10 shadow-xl hover:shadow-2xl transition-all">合作洽談</Button>
                  <Link href="/blog" className="text-sm font-bold text-slate-950 hover:text-blue-600 transition-colors border-b-2 border-slate-950 hover:border-blue-600 pb-1">
                    個人專欄 →
                  </Link>
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
                        <span>{article.date}</span>
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

        {/* Features Section */}
        <section className="section-spacing bg-white" id="features">
          <div className="container-base">
            <div className="max-w-[800px] mx-auto text-center space-y-4 mb-16">
              <Badge variant="muted" className="rounded-md">我們的核心價值</Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">
                不只是學工具，更是掌握 <span className="text-blue-600">不被取代的 AI 思維</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                技術會變，但解決問題的能力不會。我們教你如何運用最新科技，將腦中的想法轉化為真實跑得動的產品。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "持續進化的 AI 思維",
                  desc: "超越單一工具的操作，教你如何拆解問題，建立一套能適應任何 AI 演進的邏輯底層。",
                  icon: "🧠"
                },
                {
                  title: "從的想法到產品",
                  desc: "不只是 Demo。我們專注於實戰，教你如何串接不同技術，將創意真正落地成為可用的工作流或產品。",
                  icon: "🚀"
                },
                {
                  title: "掌握最新科技趨勢",
                  desc: "緊跟 Vibe Coding 等最新開發模式，讓你在 AI 浪潮中始終站在技術應用的最前線。",
                  icon: "⚡"
                }
              ].map((feature) => (
                <div key={feature.title} className="space-y-4 p-8 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="text-4xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-950">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-spacing bg-white" id="testimonials">
          <div className="container-base space-y-12">
            <div className="text-center space-y-4">
              <Badge variant="muted">學員見證</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                來自學員的真實回饋
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.name} className="border-slate-200 shadow-sm pt-8">
                  <div className="mx-auto -mt-14 h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md">
                    <img
                      src={`https://images.unsplash.com/photo-${index === 0 ? '1494790108755-2616b612b786' : index === 1 ? '1472099645785-5658abf4ff4e' : '1438761681033-6461ffad8d80'}?w=100&h=100&fit=crop&crop=face`}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="text-center p-6">
                    <CardTitle className="text-base font-bold text-slate-950">{testimonial.name}</CardTitle>
                    <CardDescription className="text-slate-600 italic leading-relaxed pt-2">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                </Card>
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

        {/* CTA Section */}
        <section className="section-spacing bg-slate-950" id="cta">
          <div className="container-base">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="space-y-4 text-center md:text-left">
                <Badge variant="muted">準備開始你的 AI 學習旅程？</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  加入 Doris AI學院
                </h2>
                <p className="text-slate-500 text-lg">
                  立即取得課程資訊與最新招生通知。
                </p>
              </div>
              <Button size="lg" className="px-12 h-14 text-lg" asChild>
                <Link href="/courses">立即報名</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container-base flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-xl font-bold tracking-tight text-slate-950">
              Doris AI學院
            </div>
            <p className="text-sm text-slate-500 font-medium">用 AI 和科技 解決問題</p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
            <Link className="hover:text-slate-950 transition-colors" href="/">首頁</Link>
            <Link className="hover:text-slate-950 transition-colors" href="/courses">課程</Link>
            <Link className="hover:text-slate-950 transition-colors" href="/blog">文章</Link>
            <a className="hover:text-slate-950 transition-colors" href="#cta">聯絡我們</a>
          </div>
        </div>
        <div className="container-base mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2024 Doris AI Academy. All rights reserved.</p>
          <p>Made with passion for the future of AI.</p>
        </div>
      </footer>
    </div>
  );
}

