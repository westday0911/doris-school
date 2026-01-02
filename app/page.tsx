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
    <div className="relative">
      <header className="border-b border-slate-200/50 bg-white/90 backdrop-blur-lg shadow-sm relative z-20">
        <div className="container-base flex h-16 items-center justify-between">
          <div className="text-lg font-semibold gradient-text-blue">
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
        <section className="section-spacing bg-gradient-to-br from-blue-50/50 via-slate-50 to-indigo-50/30 relative overflow-hidden" id="hero">
          <div className="container-base grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 relative z-10">
              <Badge>用 AI 和科技 解決問題</Badge>
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="gradient-text">學習 AI</span>
                  <span className="block mt-2 gradient-text-blue text-4xl sm:text-5xl lg:text-6xl">
                  把想法變成真正跑得動的產品與流程
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-700 font-medium">
                  從策略、工具到實戰案例，陪你一步步建立 AI
                  能力，讓團隊與個人都能快速看見成果。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 shadow-lg">
                  探索最新課程
                </Button>
                <Button variant="outline" size="lg">
                  下載課程企劃
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm font-medium">
                <span className="text-slate-700">50+ 企業合作</span>
                <span className="text-slate-700">1200+ 學員</span>
                <span className="text-slate-700">8 週實戰陪跑</span>
              </div>
            </div>
            <div className="relative">
              {/* 年輕人圖片 - 重疊在前面 */}

              <img
                src="/young.png"
                alt="年輕人"
                className="absolute -left-[10rem] -bottom-10 z-20 w-full "
              />

              {/* 原本的右側圖片區域 */}
              <div className="relative mt-32 sm:mt-36 lg:mt-40">
              <img
                  src="/hero-right-image.png"
                  alt="AI desk"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-gradient-to-br from-slate-50 to-blue-50/40" id="latest">
          <div className="container-base space-y-10">
            <div className="flex flex-col gap-4">
              <Badge variant="muted">最新課程</Badge>
              <h2 className="text-3xl font-bold gradient-text">
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
              <h2 className="text-3xl font-bold gradient-text">
                所有課程 3 堂
              </h2>
              <p className="text-slate-600">
                聚焦最實用的 AI 能力，從策略到應用一次學會。
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {popularCourses.map((course, index) => (
                <Card key={course.title} className="h-full overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${index === 0 ? '1677442136019-21780ecad995' : index === 1 ? '1555949963-aa79dcee981c' : '1485828333669-bd5ecd0a37b0'}?w=600&h=400&fit=crop&crop=center`}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <Badge>{course.tag}</Badge>
                    <CardTitle className="mt-4 text-xl gradient-text-blue">
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

        <section className="section-spacing bg-gradient-to-br from-blue-50/30 to-slate-50" id="features">
          <div className="container-base grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=500&fit=crop&crop=center"
                alt="AI 科技學習插圖"
                className="w-full h-auto rounded-[32px] shadow-soft hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div className="space-y-6">
              <Badge variant="muted">學院特色</Badge>
              <h2 className="text-3xl font-bold gradient-text">
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
              <h2 className="text-3xl font-bold gradient-text">
                讓 AI 成為你的成長推進器
              </h2>
              <p className="text-slate-600">
                我是 Doris，專注於 AI 策略與教育，曾協助多家企業導入 AI
                工作流。希望用溫度與實戰，帶領更多人找到 AI
                的最佳應用方式。
              </p>
              <Button variant="outline">了解 Doris</Button>
            </div>
            <Card className="flex flex-col justify-between bg-white overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center"
                  alt="教學方式"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="gradient-text-blue">我的教學方式</CardTitle>
                <CardDescription>
                  以 Notion 風格的結構化學習，搭配可落地的實作。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border border-blue-100">
                  每週一次直播 + 影片回放
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border border-blue-100">
                  專屬學習筆記 + 工作表
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border border-blue-100">
                  社群討論 + 個別回饋
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="section-spacing bg-gradient-to-br from-slate-50 to-indigo-50/30" id="articles">
          <div className="container-base space-y-10">
            <div className="space-y-3">
              <Badge variant="muted">AI 學習文章列表</Badge>
              <h2 className="text-3xl font-bold gradient-text">
                精選內容，持續更新
              </h2>
              <p className="text-slate-600">
                每週分享 AI 應用、學習路徑與實戰案例。
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((article, index) => (
                <Card key={article.title} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${index === 0 ? '1485828333669-bd5ecd0a37b0' : index === 1 ? '1451187580459-8049020e7369' : '1460925895917-afdab827c52f'}?w=600&h=400&fit=crop&crop=center`}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg gradient-text-blue">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost">
                      閱讀文章
                    </Button>
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
              <h2 className="text-3xl font-bold gradient-text">
                來自學員的真實回饋
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.name} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-blue-100">
                      <img
                        src={`https://images.unsplash.com/photo-${index === 0 ? '1494790108755-2616b612b786' : index === 1 ? '1472099645785-5658abf4ff4e' : '1438761681033-6461ffad8d80'}?w=100&h=100&fit=crop&crop=face`}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg gradient-text-blue">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-center">{testimonial.quote}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-gradient-to-br from-brand-50 via-blue-50 to-indigo-50" id="cta">
          <div className="container-base">
            <Card className="bg-gradient-to-br from-white to-blue-50/50 border-2 border-blue-200">
              <CardHeader className="items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-3">
                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">準備開始你的 AI 學習旅程？</Badge>
                  <CardTitle className="text-3xl gradient-text">
                    加入 Doris AI學院
                  </CardTitle>
                  <CardDescription>
                    立即取得課程資訊與最新招生通知。
                  </CardDescription>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 shadow-lg">
                  立即報名
                </Button>
              </CardHeader>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/50 bg-gradient-to-t from-slate-50 to-white relative z-10">
        <div className="container-base flex flex-col gap-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-base font-semibold gradient-text-blue">
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
