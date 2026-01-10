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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsletterForm } from "@/components/NewsletterForm";
import { formatDate, cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AI 實戰文章 | Doris AI 學院",
  description: "分享我們在 AI 實戰中的觀察與實踐方法，從 Prompt Engineering 到 Vibe Coding，助您掌握最新 AI 趨勢。",
};

const ITEMS_PER_PAGE = 6;

const fallbackArticles = [
  {
    title: "如何用 AI 做市場研究？",
    excerpt: "這篇文章將深入探討 3 個高效的提示詞框架，協助你在五分鐘內產出具備商業價值的市場洞察報告與競爭對手分析...",
    category: "實戰教學",
    categories: ["實戰教學"],
    tags: ["Prompt Engineering", "市場分析"],
    date: "2024-03-20",
    image: "https://images.unsplash.com/photo-1485828333669-bd5ecd0a37b0?w=600&h=400&fit=crop&crop=center",
    slug: "ai-market-research",
    author: { name: "Doris", avatar_url: null }
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
    .select('*, author:profiles(name, avatar_url)')
    .neq('status', '草稿')
    .order('published_at', { ascending: false })
    .range(0, ITEMS_PER_PAGE - 1);

  if (selectedCategory) {
    query = query.contains('categories', [selectedCategory]);
  }

  const { data: articlesFromDb } = await query;

  // 獲取動態廣告設定
  const { data: blogAdConfig } = await supabase
    .from('site_configs')
    .select('value')
    .eq('key', 'blog_sidebar_ad')
    .maybeSingle();
  
  const blogAd = blogAdConfig?.value || {
    badge: "HOT COURSE",
    title: "Vibe Coding \n系統實戰課",
    description: "掌握 2025 最強開發範式，將想法瞬間轉化為高品質產品。",
    button_text: "立即搶位",
    link: "/courses/vibe-coding",
    bg_color: "slate-950"
  };

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

  const articles = (articlesFromDb && articlesFromDb.length > 0) ? articlesFromDb : (selectedCategory ? [] : fallbackArticles.map(a => ({ ...a, published_at: a.date })));
  const popularPosts = articles.slice(0, 3);

  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />

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
              <BlogListClient initialArticles={articles} selectedCategory={selectedCategory} />
            </div>

            <aside className="space-y-10 sticky top-28">
              {/* 廣告區：動態推廣 */}
              <div className={cn(
                "relative rounded-xl p-6 overflow-hidden group border border-slate-800",
                `bg-${blogAd.bg_color || 'slate-950'}`
              )}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 space-y-4">
                  {blogAd.badge && (
                    <Badge className="bg-blue-600 border-0 text-[10px] rounded-sm font-bold">{blogAd.badge}</Badge>
                  )}
                  <h3 className="text-lg font-bold text-white leading-tight whitespace-pre-line">
                    {blogAd.title}
                  </h3>
                  <div 
                    className="text-slate-400 text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blogAd.description }}
                  />
                  <Link href={blogAd.link || "#"} className="block w-full">
                    <Button className="w-full bg-white text-slate-950 hover:bg-blue-50 text-xs font-black rounded-md">
                      {blogAd.button_text}
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
                        <span className="text-[10px] text-slate-400">
                          {formatDate(post.published_at || post.created_at)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-medium mb-4 uppercase tracking-widest text-center">
                  訂閱電子報，獲取最新 AI 觀點
                </p>
                <NewsletterForm 
                  buttonClassName="bg-slate-900 hover:bg-blue-600 text-white"
                  inputClassName="bg-white border-slate-200"
                  buttonText="訂閱"
                />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
