import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="bg-white">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="container-base flex h-16 items-center justify-between">
          <div className="text-lg font-semibold text-slate-900">
            Doris AI學院
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a className="hover:text-slate-900" href="#latest">
              最新課程
            </a>
            <a className="hover:text-slate-900" href="#popular">
              熱門課程
            </a>
            <a className="hover:text-slate-900" href="#features">
              學院特色
            </a>
            <a className="hover:text-slate-900" href="#articles">
              AI 學習文章
            </a>
            <a className="hover:text-slate-900" href="#testimonials">
              學員見證
            </a>
          </nav>
          <Button size="sm">立即加入</Button>
        </div>
      </header>

      <main>
        <section className="section-spacing" id="hero">
          <div className="container-base grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Badge>用 AI 和科技 解決問題</Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                  Doris AI學院
                  <span className="block text-brand-600">
                    打造能真正落地的 AI 學習與應用
                  </span>
                </h1>
                <p className="text-lg text-slate-600">
                  從策略、工具到實戰案例，陪你一步步建立 AI
                  能力，讓團隊與個人都能快速看見成果。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg">探索最新課程</Button>
                <Button variant="outline" size="lg">
                  下載課程企劃
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <span>50+ 企業合作</span>
                <span>1200+ 學員</span>
                <span>8 週實戰陪跑</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 left-6 h-36 w-36 rounded-full bg-brand-200/70 blur-3xl" />
              <div className="absolute bottom-4 right-0 h-40 w-40 rounded-full bg-sky-200/70 blur-3xl" />
              <div className="relative rounded-[32px] border border-slate-200/70 bg-gradient-to-br from-white via-white to-brand-50 p-10 shadow-soft">
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>抽象插畫</span>
                    <span>AI Flow</span>
                  </div>
                  <svg
                    className="h-48 w-full"
                    viewBox="0 0 400 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 120C80 20 160 20 220 80C280 140 340 140 380 60"
                      stroke="#4A7DFF"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="80" cy="60" r="28" fill="#C4DBFF" />
                    <circle cx="220" cy="110" r="40" fill="#E6EFFF" />
                    <circle cx="320" cy="70" r="26" fill="#9DC3FF" />
                  </svg>
                  <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-600">
                    以抽象插畫呈現 AI 思維流動，對齊 Notion 風格的溫潤質感。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-slate-50" id="latest">
          <div className="container-base space-y-10">
            <div className="flex flex-col gap-4">
              <Badge variant="muted">最新課程</Badge>
              <h2 className="text-3xl font-semibold text-slate-900">
                單一推出課程
              </h2>
              <p className="text-slate-600">
                每季精選一門實戰課程，完整帶你從概念到成果。
              </p>
            </div>
            <Card>
              <CardHeader className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-3">
                  <CardTitle>{latestCourse.title}</CardTitle>
                  <CardDescription>{latestCourse.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>開課梯次</span>
                    <span className="font-medium text-slate-900">
                      {latestCourse.date}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>難度</span>
                    <span className="font-medium text-slate-900">
                      {latestCourse.level}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                  完整課綱 + 8 週陪跑 + 每週實作任務
                </p>
                <Button>查看課程詳情</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section-spacing" id="popular">
          <div className="container-base space-y-10">
            <div className="space-y-3">
              <Badge variant="muted">熱門課程</Badge>
              <h2 className="text-3xl font-semibold text-slate-900">
                所有課程 3 堂
              </h2>
              <p className="text-slate-600">
                聚焦最實用的 AI 能力，從策略到應用一次學會。
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {popularCourses.map((course) => (
                <Card key={course.title} className="h-full">
                  <CardHeader>
                    <Badge>{course.tag}</Badge>
                    <CardTitle className="mt-4 text-xl">
                      {course.title}
                    </CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button variant="outline" className="w-full">
                      查看課程
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-slate-50" id="features">
          <div className="container-base grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative">
              <div className="absolute -left-8 top-10 h-40 w-40 rounded-full bg-brand-200/60 blur-3xl" />
              <div className="relative rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-soft">
                <div className="space-y-6">
                  <p className="text-sm text-slate-500">學院特色插圖</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-700">
                      AI 策略
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                      實作模板
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                      專案陪跑
                    </div>
                    <div className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-700">
                      社群互助
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Badge variant="muted">學院特色</Badge>
              <h2 className="text-3xl font-semibold text-slate-900">
                把 AI 變成可行動的解決方案
              </h2>
              <p className="text-slate-600">
                我們用結構化的學習路徑，陪你從問題定義、工具組合到成果驗收，
                讓每一次學習都能落地成真。
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                  AI 問題解構與策略設計
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                  建立可複製的提示詞與流程
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                  專屬助教與社群支持
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section-spacing" id="about">
          <div className="container-base grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <Badge variant="muted">我是 Doris</Badge>
              <h2 className="text-3xl font-semibold text-slate-900">
                讓 AI 成為你的成長推進器
              </h2>
              <p className="text-slate-600">
                我是 Doris，專注於 AI 策略與教育，曾協助多家企業導入 AI
                工作流。希望用溫度與實戰，帶領更多人找到 AI
                的最佳應用方式。
              </p>
              <Button variant="outline">了解 Doris</Button>
            </div>
            <Card className="flex flex-col justify-between bg-white">
              <CardHeader>
                <CardTitle>我的教學方式</CardTitle>
                <CardDescription>
                  以 Notion 風格的結構化學習，搭配可落地的實作。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  每週一次直播 + 影片回放
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  專屬學習筆記 + 工作表
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  社群討論 + 個別回饋
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section-spacing bg-slate-50" id="articles">
          <div className="container-base space-y-10">
            <div className="space-y-3">
              <Badge variant="muted">AI 學習文章列表</Badge>
              <h2 className="text-3xl font-semibold text-slate-900">
                精選內容，持續更新
              </h2>
              <p className="text-slate-600">
                每週分享 AI 應用、學習路徑與實戰案例。
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <Card key={article.title}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost">閱讀文章</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing" id="testimonials">
          <div className="container-base space-y-10">
            <div className="space-y-3">
              <Badge variant="muted">學員見證</Badge>
              <h2 className="text-3xl font-semibold text-slate-900">
                來自學員的真實回饋
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.quote}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-brand-50" id="cta">
          <div className="container-base">
            <Card className="bg-white">
              <CardHeader className="items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <Badge>準備開始你的 AI 學習旅程？</Badge>
                  <CardTitle className="text-3xl">
                    加入 Doris AI學院
                  </CardTitle>
                  <CardDescription>
                    立即取得課程資訊與最新招生通知。
                  </CardDescription>
                </div>
                <Button size="lg">立即報名</Button>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="container-base flex flex-col gap-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-base font-semibold text-slate-900">
              Doris AI學院
            </div>
            <p>用 AI 和科技 解決問題</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-slate-900" href="#hero">
              首頁
            </a>
            <a className="hover:text-slate-900" href="#popular">
              課程
            </a>
            <a className="hover:text-slate-900" href="#articles">
              文章
            </a>
            <a className="hover:text-slate-900" href="#cta">
              聯絡我們
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
