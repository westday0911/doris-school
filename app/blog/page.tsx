import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

const articles = [
  {
    title: "如何用 AI 做市場研究？",
    excerpt: "這篇文章將深入探討 3 個高效的提示詞框架，協助你在五分鐘內產出具備商業價值的市場洞察報告與競爭對手分析...",
    category: "實戰教學",
    tags: ["Prompt Engineering", "市場分析"],
    date: "2024-03-20",
    image: "https://images.unsplash.com/photo-1485828333669-bd5ecd0a37b0?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "建立你的 AI 學習路徑",
    excerpt: "從零基礎到能獨立開發 AI 工作流，你需要掌握的核心能力圖譜。我們整理了 2024 年最值得投資的學習清單與資源...",
    category: "學習指南",
    tags: ["學習路徑", "心法"],
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1451187580459-8049020e7369?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "AI 專案落地的 5 個關鍵步驟",
    excerpt: "為什麼 80% 的 AI 專案都停留在 Demo 階段？本文將揭秘企業級 AI 應用從概念驗證到真正推進生產流程的標準作業程序...",
    category: "商業應用",
    tags: ["專案管理", "企業導入"],
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "Vibe Coding: 2025 年的開發新範式",
    excerpt: "探討如何利用 AI 輔助工具進入高效的開發狀態，這種以「感官」與「節奏」為核心的編碼方式正在改變軟體業...",
    category: "技術趨勢",
    tags: ["Vibe Coding", "開發效能"],
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "自動化工作流的設計藝術",
    excerpt: "不僅僅是串接 API。好的自動化工作流需要考慮異常處理、資料清洗以及人類介入的最佳時機...",
    category: "實戰教學",
    tags: ["自動化", "工作流"],
    date: "2024-03-01",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop&crop=center"
  }
];

const categories = [
  { name: "實戰教學", count: 12 },
  { name: "學習指南", count: 8 },
  { name: "商業應用", count: 15 },
  { name: "技術趨勢", count: 6 },
  { name: "心法分享", count: 10 }
];

const popularPosts = articles.slice(0, 3);

export default function BlogPage() {
  return (
    <div className="relative bg-white min-h-screen">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition-colors hover:text-slate-950" href="/courses">熱門課程</Link>
            <Link className="text-slate-950 font-bold" href="/blog">AI 學習文章</Link>
            <Link className="transition-colors hover:text-slate-950" href="/tools">AI 工具</Link>
            <Link className="transition-colors hover:text-slate-950" href="/services/consulting">服務</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hidden text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">
              登入
            </Link>
            <Button size="sm" asChild>
              <Link href="/auth/register">立即加入</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="py-12 sm:py-20">
        <div className="container-base">
          <div className="space-y-4 mb-16">
            <Badge variant="muted">資源中心</Badge>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
              最新 AI <span className="text-blue-600">觀點與實踐</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            {/* 左側：文章列表 */}
            <div className="space-y-10">
              <div className="grid gap-8 sm:grid-cols-2">
                {articles.map((article) => (
                  <Card key={article.title} className="group overflow-hidden border-slate-200 rounded-lg hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-slate-200 text-[10px] px-2 py-0.5 rounded-sm font-bold">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-5 space-y-3">
                      <div className="text-[10px] font-medium text-slate-400">
                        {article.date}
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-950 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {article.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-sm border border-slate-100">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full h-9 text-xs font-bold rounded-md hover:bg-slate-950 hover:text-white transition-all">
                        閱讀更多
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 右側：側邊欄 */}
            <aside className="space-y-10 sticky top-28">
              {/* 廣告區：最新課程推廣 */}
              <div className="relative rounded-2xl bg-slate-950 p-6 overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 space-y-4">
                  <Badge className="bg-blue-600 border-0 text-[10px]">HOT COURSE</Badge>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Vibe Coding <br />系統實戰課
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    掌握 2025 最強開發範式，將想法瞬間轉化為高品質產品。
                  </p>
                  <Link href="/courses/vibe-coding" className="block w-full">
                    <Button className="w-full bg-white text-slate-950 hover:bg-blue-50 text-xs font-black rounded-lg">
                      立即搶位
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 文章類別 */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-blue-600" />
                  文章類別
                </h3>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      href="#" 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-sm text-slate-600 group-hover:text-slate-950 font-medium">{cat.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 熱門文章 */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-blue-600" />
                  熱門文章
                </h3>
                <div className="space-y-6">
                  {popularPosts.map((post, idx) => (
                    <Link key={post.title} href="#" className="flex gap-4 group">
                      <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-lg">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-slate-950/10" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 標籤雲 (選配) */}
              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium mb-4 uppercase tracking-widest text-center">
                  訂閱電子報，獲取最新 AI 觀點
                </p>
                <div className="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full text-xs px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  <Button size="sm" className="w-full rounded-lg text-[10px] font-bold">訂閱</Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50/50 py-12">
        <div className="container-base flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-xl font-bold tracking-tight text-slate-950">Doris AI學院</div>
            <p className="text-sm text-slate-500 font-medium">用 AI 和科技 解決問題</p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-950 transition-colors">首頁</Link>
            <Link href="/blog" className="text-slate-950 font-bold">部落格</Link>
            <a href="/#cta" className="hover:text-slate-950 transition-colors">聯絡我們</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
