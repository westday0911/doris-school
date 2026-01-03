import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, User, Clock, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 1. 從 Supabase 獲取單篇文章
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!article) {
    notFound();
  }

  // 2. 獲取所有文章用於側邊欄和推薦
  const { data: allArticles } = await supabase
    .from('articles')
    .select('*')
    .order('date', { ascending: false });

  const articles = allArticles || [];
  
  // 推薦文章：同分類的其他文章，若不夠則補最新文章
  const recommendedArticles = articles
    .filter(a => a.slug !== params.slug)
    .filter(a => a.category === article.category)
    .slice(0, 3);
  
  if (recommendedArticles.length < 3) {
    const additional = articles
      .filter(a => a.slug !== params.slug && !recommendedArticles.find(r => r.slug === a.slug))
      .slice(0, 3 - recommendedArticles.length);
    recommendedArticles.push(...additional);
  }

  const popularPosts = articles.slice(0, 3);
  const categories = [
    { name: "實戰教學", count: articles.filter(a => a.category === "實戰教學").length || 12 },
    { name: "學習指南", count: articles.filter(a => a.category === "學習指南").length || 8 },
    { name: "商業應用", count: articles.filter(a => a.category === "商業應用").length || 15 },
    { name: "技術趨勢", count: articles.filter(a => a.category === "技術趨勢").length || 6 },
    { name: "心法分享", count: articles.filter(a => a.category === "心法分享").length || 10 }
  ];

  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />

      <main className="py-12 sm:py-20">
        <div className="container-base">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            
            {/* 左側：文章內容 */}
            <div className="space-y-12">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors mb-4">
                <ChevronLeft size={16} />
                返回文章列表
              </Link>

              <article className="space-y-10">
                {/* Header */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-600 border-0 rounded-sm font-bold">{article.category || "AI 實戰"}</Badge>
                    {article.tags?.map((tag: string) => (
                      <Badge key={tag} variant="muted" className="rounded-sm">#{tag}</Badge>
                    ))}
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.2]">
                    {article.title}
                  </h1>
                  <div className="flex items-center gap-6 text-sm text-slate-500 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">D</div>
                      <span className="font-bold text-slate-900">Doris</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="aspect-[21/9] rounded-xl overflow-hidden shadow-xl border border-slate-100">
                  <img 
                    src={article.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"} 
                    className="w-full h-full object-cover"
                    alt={article.title}
                  />
                </div>

                {/* Content */}
                <div 
                  className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-950 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-950 prose-a:text-blue-600 prose-img:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: article.content || "" }}
                />
              </article>

              {/* Recommended Articles Section */}
              <div className="pt-16 border-t border-slate-100 space-y-8">
                <h3 className="text-2xl font-black text-slate-950 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-blue-600 rounded-full" />
                  延伸閱讀
                </h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {recommendedArticles.map((rec: any) => (
                    <Link key={rec.slug} href={`/blog/${rec.slug}`} className="group space-y-3">
                      <div className="aspect-video rounded-lg overflow-hidden border border-slate-100 shadow-sm">
                        <img src={rec.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={rec.title} />
                      </div>
                      <h4 className="font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rec.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">{rec.date}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-8 bg-slate-950 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-bold">想學會更多 AI 實戰技巧？</h3>
                  <p className="text-slate-400 text-sm">訂閱電子報，每週獲取最新的 AI 工具評測與實戰案例。</p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                  <input className="flex-1 md:w-48 px-4 py-2 rounded-lg bg-white/10 border border-white/20 outline-none text-sm focus:ring-1 focus:ring-blue-500" placeholder="您的 Email" />
                  <Button className="rounded-lg px-6 h-10 font-bold bg-blue-600 hover:bg-blue-700 text-xs">訂閱</Button>
                </div>
              </div>
            </div>

            {/* 右側：側邊欄 (與列表頁相同) */}
            <aside className="space-y-10 sticky top-28">
              {/* 廣告區：最新課程推廣 */}
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
                  {popularPosts.map((post: any) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-4 group">
                      <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-md border border-slate-100">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
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
