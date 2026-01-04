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
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 實戰文章 | Doris AI學院",
  description: "分享我們在 AI 實戰中的觀察與實踐方法，從 Prompt Engineering 到 Vibe Coding，助您掌握最新 AI 趨勢。",
};

const fallbackArticles = [
  {
    title: "如何用 AI 做市場研究？",
    excerpt: "這篇文章將深入探討 3 個高效的提示詞框架，協助你在五分鐘內產出具備商業價值的市場洞察報告與競爭對手分析...",
    category: "實戰教學",
    tags: ["Prompt Engineering", "市場分析"],
    date: "2024-03-20",
    image: "https://images.unsplash.com/photo-1485828333669-bd5ecd0a37b0?w=600&h=400&fit=crop&crop=center",
    slug: "ai-market-research"
  }
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category;

  let query = supabase
    .from('articles')
    .select('*')
    .neq('status', '草稿')
    .order('date', { ascending: false });

  if (selectedCategory) {
    query = query.contains('categories', [selectedCategory]);
  }

  const { data: articlesFromDb } = await query;

  const { data: allPublishedArticles } = await supabase
    .from('articles')
    .select('categories')
    .neq('status', '草稿');

  const categoryCounts: Record<string, number> = {};
  if (allPublishedArticles) {
    allPublishedArticles.forEach(article => {
      const cats = article.categories || [];
      cats.forEach((cat: string) => {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
    });
  }

  const dynamicCategories = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const articles = (articlesFromDb && articlesFromDb.length > 0) ? articlesFromDb : (selectedCategory ? [] : fallbackArticles);
  const popularPosts = articles.slice(0, 3);

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
              {selectedCategory ? (
                <>
                  <span className="text-blue-600">{selectedCategory}</span> 相關文章
                </>
              ) : (
                <>
                  最新 AI <span className="text-blue-600">觀點與實踐</span>
                </>
              )}
            </h1>
            {selectedCategory && (
              <Link href="/blog" className="inline-block text-sm text-slate-500 hover:text-slate-950 transition-colors">
                ← 顯示所有文章
              </Link>
            )}
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            <div className="space-y-10">
              <div className="grid gap-8 sm:grid-cols-2">
                {articles.map((article: any) => (
                  <Card key={article.slug} className="group overflow-hidden border-slate-200 rounded-lg hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {(article.categories && article.categories.length > 0) ? (
                          article.categories.map((cat: string) => (
                            <Badge key={cat} className="bg-white/90 backdrop-blur-md text-slate-900 border-slate-200 text-[10px] px-2 py-0.5 rounded-sm font-bold shadow-sm">
                              {cat}
                            </Badge>
                          ))
                        ) : (
                          <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-slate-200 text-[10px] px-2 py-0.5 rounded-sm font-bold shadow-sm">
                            {article.category || "AI 實戰"}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardHeader className="p-5 space-y-3">
                      <div className="text-[10px] font-medium text-slate-400">
                        {article.date}
                      </div>
                      <Link href={`/blog/${article.slug}`}>
                        <CardTitle className="text-xl font-bold text-slate-950 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {article.tags?.map((tag: string) => (
                          <span key={tag} className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-sm border border-slate-100">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/blog/${article.slug}`}>
                        <Button variant="outline" className="w-full h-9 text-xs font-bold rounded-md hover:bg-slate-950 hover:text-white transition-all">
                          閱讀更多
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <aside className="space-y-10 sticky top-28">
              <div className="relative rounded-xl bg-slate-950 p-6 overflow-hidden group border border-slate-800">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 space-y-4">
                  <Badge className="bg-blue-600 border-0 text-[10px] rounded-sm font-bold">HOT COURSE</Badge>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Vibe Coding <br />系統實戰課
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    掌握 2025 最強開發範式，將想法瞬間轉化為高品質產品。
                  </p>
                  <Link href="/courses/vibe-coding" className="block w-full">
                    <Button className="w-full bg-white text-slate-950 hover:bg-blue-50 text-xs font-black rounded-md">
                      立即搶位
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-blue-600" />
                  文章類別
                </h3>
                <div className="flex flex-col gap-1">
                  <Link 
                    href="/blog" 
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors group ${!selectedCategory ? 'bg-slate-100 text-slate-950' : 'hover:bg-slate-50'}`}
                  >
                    <span className={`text-sm font-medium ${!selectedCategory ? 'text-slate-950' : 'text-slate-600 group-hover:text-slate-950'}`}>全部文章</span>
                  </Link>
                  {dynamicCategories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      href={`/blog?category=${encodeURIComponent(cat.name)}`} 
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors group ${selectedCategory === cat.name ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'}`}
                    >
                      <span className={`text-sm font-medium ${selectedCategory === cat.name ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-950'}`}>{cat.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedCategory === cat.name ? 'bg-blue-100 text-blue-700' : 'text-slate-400 bg-slate-100'}`}>{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-blue-600" />
                  熱門文章
                </h3>
                <div className="space-y-6">
                  {popularPosts.map((post: any, idx) => (
                    <Link key={post.title} href={`/blog/${post.slug}`} className="flex gap-4 group">
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
            <Link href="/courses" className="hover:text-slate-950 transition-colors">熱門課程</Link>
            <Link href="/blog" className="text-slate-950 font-bold">部落格</Link>
            <Link href="/tools" className="hover:text-slate-950 transition-colors">AI 工具</Link>
            <Link href="/services/consulting" className="hover:text-slate-950 transition-colors">服務</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
