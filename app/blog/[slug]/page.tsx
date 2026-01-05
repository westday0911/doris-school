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
import { Footer } from "@/components/Footer";
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, image, category')
    .eq('slug', decodedSlug)
    .single();

  if (!article) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    description: article.excerpt || `閱讀更多關於 ${article.title} 的詳細內容。`,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://doris-ai-academy.com/blog/${params.slug}`,
      images: [article.image, ...previousImages],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const lowerEncodedSlug = params.slug.toLowerCase();
  
  console.log("--- Debug Slug Start ---");
  console.log("Original slug param:", params.slug);
  console.log("Decoded slug:", decodedSlug);
  console.log("Lower encoded slug:", lowerEncodedSlug);
  
  // 1. 嘗試多種匹配方式：解碼後的中文、原始參數、或是轉小寫後的編碼
  const { data: articlesFound, error: fetchError } = await supabase
    .from('articles')
    .select('*, author:profiles(name, avatar_url)')
    .in('slug', [decodedSlug, params.slug, lowerEncodedSlug])
    .limit(1);

  const article = articlesFound && articlesFound.length > 0 ? articlesFound[0] : null;

  // 2. 如果還是找不到，才嘗試模糊匹配
  let finalArticle = article;
  if (!finalArticle) {
    console.log("Exact matches failed, trying fuzzy match...");
    const { data: fuzzyArticles } = await supabase
      .from('articles')
      .select('*')
      .ilike('slug', `%${decodedSlug.slice(0, 5)}%`)
      .neq('status', '草稿');
    
    if (fuzzyArticles && fuzzyArticles.length > 0) {
      console.log("Found possible matches:", fuzzyArticles.map(a => a.slug));
      finalArticle = fuzzyArticles.find(a => 
        a.slug.toLowerCase() === lowerEncodedSlug || 
        a.slug === decodedSlug ||
        decodeURIComponent(a.slug) === decodedSlug
      );
      if (finalArticle) console.log("Fuzzy match successful!");
    }
  }

  if (fetchError && !finalArticle) {
    console.error("Supabase fetch error:", fetchError);
  }

  if (!finalArticle) {
    console.warn("Article not found for slug:", decodedSlug);
    notFound();
  }

  return BlogPostContent(finalArticle, params.slug);
}

async function BlogPostContent(article: any, slugParam: string) {
  // 獲取所有非草稿文章用於側邊欄和推薦
  const { data: allArticles } = await supabase
    .from('articles')
    .select('*')
    .neq('status', '草稿')
    .order('published_at', { ascending: false });

  const articles = allArticles || [];
  
  // 動態計算類別
  const categoryCounts: Record<string, number> = {};
  articles.forEach(a => {
    const cats = a.categories || [];
    cats.forEach((cat: string) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });
  const dynamicCategories = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // 推薦文章：有共同類別的文章，若不夠則補最新文章
  const currentCats = article.categories || [];
  const recommendedArticles = articles
    .filter(a => a.slug !== article.slug)
    .filter(a => {
      const aCats = a.categories || [];
      return currentCats.some(cat => aCats.includes(cat));
    })
    .slice(0, 3);
  
  if (recommendedArticles.length < 3) {
    const additional = articles
      .filter(a => a.slug !== article.slug && !recommendedArticles.find(r => r.slug === a.slug))
      .slice(0, 3 - recommendedArticles.length);
    recommendedArticles.push(...additional);
  }

  const popularPosts = articles.slice(0, 3);

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    image: article.image,
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.published_at || article.created_at,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Doris',
    },
    description: article.excerpt,
    publisher: {
      '@type': 'Organization',
      name: 'Doris AI學院',
      logo: {
        '@type': 'ImageObject',
        url: 'https://doris-ai-academy.com/logo.png',
      },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: 'https://doris-ai-academy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '部落格',
        item: 'https://doris-ai-academy.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://doris-ai-academy.com/blog/${slugParam}`,
      },
    ],
  };

  return (
    <div className="relative bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
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
                    {article.categories && article.categories.length > 0 ? (
                      article.categories.map((cat: string) => (
                        <Badge key={cat} className="bg-blue-600 border-0 rounded-sm font-bold">{cat}</Badge>
                      ))
                    ) : (
                      <Badge className="bg-blue-600 border-0 rounded-sm font-bold">{article.category || "AI 實戰"}</Badge>
                    )}
                    {article.tags?.map((tag: string) => (
                      <Badge key={tag} variant="muted" className="rounded-sm">#{tag}</Badge>
                    ))}
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.2]">
                    {article.title}
                  </h1>
                  <div className="flex items-center gap-6 text-sm text-slate-500 border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                        {article.author?.avatar_url ? (
                          <img src={article.author.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                            {(article.author?.name?.[0] || 'D').toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-slate-900">{article.author?.name || 'Doris'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : (article.created_at ? new Date(article.created_at).toLocaleDateString() : "N/A")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="w-full rounded-xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                  <img 
                    src={article.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"} 
                    className="w-full h-auto max-h-[600px] object-contain mx-auto"
                    alt={article.title}
                  />
                </div>

                {/* Content */}
                <div 
                  className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-950 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-950 prose-a:text-blue-600 prose-img:rounded-lg"
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
                      <p className="text-[10px] text-slate-400 font-medium">
                        {rec.published_at ? new Date(rec.published_at).toLocaleDateString() : (rec.created_at ? new Date(rec.created_at).toLocaleDateString() : "N/A")}
                      </p>
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
                  {dynamicCategories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      href={`/blog?category=${encodeURIComponent(cat.name)}`} 
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
                        <span className="text-[10px] text-slate-400">
                          {post.published_at ? new Date(post.published_at).toLocaleDateString() : (post.created_at ? new Date(post.created_at).toLocaleDateString() : "N/A")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
