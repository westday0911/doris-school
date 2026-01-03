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

const latestCourse = {
  title: "AI 啟動營：打造你的第一個 AI 工作流",
  description:
    "從 0 到 1 建立可落地的 AI 工作流，快速提升團隊效率，立即交付成果。",
  date: "2024 夏季招生",
  level: "入門到進階",
};

const popularCourses = [
  {
    title: "AI 產品策略實戰",
    description: "掌握從需求洞察到產品落地的 AI 策略地圖。",
    tag: "策略課",
  },
  {
    title: "AI 自動化生產力",
    description: "用 No-code 與 AI 工具打造高效率工作流程。",
    tag: "效率課",
  },
  {
    title: "生成式 AI 商業應用",
    description: "打造可複製的 AI 變現模式，快速驗證市場。",
    tag: "商業課",
  },
];

const articles = [
  {
    title: "如何用 AI 做市場研究？",
    excerpt: "3 個提示詞框架，幫你快速產出洞察報告。",
  },
  {
    title: "建立你的 AI 學習路徑",
    excerpt: "從基礎概念到實戰案例，建立自己的學習地圖。",
  },
  {
    title: "AI 專案落地的 5 個步驟",
    excerpt: "避免只停留在 demo，真正推進企業流程。",
  },
];

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

export default function Home() {
  return (
    <div className="relative">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <div className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a className="transition-colors hover:text-slate-950" href="#latest">
              最新課程
            </a>
            <a className="transition-colors hover:text-slate-950" href="#popular">
              熱門課程
            </a>
            <a className="transition-colors hover:text-slate-950" href="#features">
              學院特色
            </a>
            <a className="transition-colors hover:text-slate-950" href="#articles">
              AI 學習文章
            </a>
            <a className="transition-colors hover:text-slate-950" href="#testimonials">
              學員見證
            </a>
          </nav>
          <Button size="sm">立即加入</Button>
        </div>
      </header>

      <main>
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
                  <Button size="lg" className="shadow-md">
                    探索最新課程
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

            {/* Browser Mockup - 放在右邊 */}
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
              
              {/* 連接線終點 */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-200 border border-slate-300 shadow-sm z-10">
                <div className="absolute inset-0 rounded-full bg-slate-300 animate-ping"></div>
              </div>
            </div>

            {/* 年輕人圖片 */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 sm:-bottom-24 lg:-bottom-32 z-40 w-[300px] sm:w-[400px] lg:w-[500px]" id="young-person">
              <img
                src="/young.png"
                alt="年輕人"
                className="w-full h-auto drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* 連接線起點 */}
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

        <section className="section-spacing bg-slate-50/50" id="latest">
          <div className="container-base space-y-10">
            <div className="flex flex-col gap-4">
              <Badge variant="muted">最新課程</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                單一推出課程
              </h2>
              <p className="text-slate-500">
                每季精選一門實戰課程，完整帶你從概念到成果。
              </p>
            </div>
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] bg-white p-8">
                <div className="space-y-4">
                  <CardTitle className="text-2xl text-slate-950">{latestCourse.title}</CardTitle>
                  <CardDescription className="text-base text-slate-600">{latestCourse.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
                    <span className="text-slate-500">開課梯次</span>
                    <span className="font-semibold text-slate-950">{latestCourse.date}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
                    <span className="text-slate-500">難度</span>
                    <span className="font-semibold text-slate-950">{latestCourse.level}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-slate-50/50 border-t border-slate-100 p-8">
                <p className="text-sm font-medium text-slate-500">
                  完整課綱 + 8 週陪跑 + 每週實作任務
                </p>
                <Button>查看課程詳情</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section-spacing bg-white" id="popular">
          <div className="container-base space-y-10">
            <div className="space-y-3">
              <Badge variant="muted">熱門課程</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                所有課程 3 堂
              </h2>
              <p className="text-slate-500">
                聚焦最實用的 AI 能力，從策略到應用一次學會。
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {popularCourses.map((course, index) => (
                <Card key={course.title} className="h-full overflow-hidden group hover:shadow-md transition-all duration-300 border-slate-200">
                  <div className="h-48 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img
                      src={`https://images.unsplash.com/photo-${index === 0 ? '1677442136019-21780ecad995' : index === 1 ? '1555949963-aa79dcee981c' : '1485828333669-bd5ecd0a37b0'}?w=600&h=400&fit=crop&crop=center`}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="p-6 space-y-3">
                    <Badge variant="muted" className="w-fit">{course.tag}</Badge>
                    <CardTitle className="text-xl font-bold text-slate-950">{course.title}</CardTitle>
                    <CardDescription className="text-slate-500 leading-relaxed">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 mt-auto">
                    <Button variant="outline" className="w-full">
                      查看課程
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-slate-50/50" id="features">
          <div className="container-base grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=500&fit=crop&crop=center"
                alt="AI 科技學習插圖"
                className="w-full h-auto rounded-3xl shadow-sm border border-slate-200 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="space-y-8 py-4">
              <div className="space-y-4">
                <Badge variant="muted">學院特色</Badge>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  把 AI 變成可行動的解決方案
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  我們用結構化的學習路徑，陪你從問題定義、工具組合到成果驗收，
                  讓每一次學習都能落地成真。
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "AI 問題解構與策略設計",
                  "建立可複製的提示詞與流程",
                  "專屬助教與社群支持"
                ].map((item) => (
                  <li key={item} className="flex gap-4 items-center text-slate-600 font-medium">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

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
                  <div className="mx-auto -mt-14 h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md grayscale">
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
              <Button size="lg" className="px-12 h-14 text-lg">
                立即報名
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container-base flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-xl font-bold tracking-tight text-slate-950">
              Doris AI學院
            </div>
            <p className="text-sm text-slate-500 font-medium">用 AI 和科技 解決問題</p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
            <a className="hover:text-slate-950 transition-colors" href="#hero">首頁</a>
            <a className="hover:text-slate-900 transition-colors" href="#popular">課程</a>
            <a className="hover:text-slate-900" href="#articles">文章</a>
            <a className="hover:text-slate-900" href="#cta">聯絡我們</a>
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
