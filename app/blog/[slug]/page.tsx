import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 從 Supabase 獲取單篇文章
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!article) {
    // 如果找不到文章且不是 preview 模式，可以選擇導向 notFound
    // 這裡我們維持原本的靜態顯示作為備援，或是直接 notFound()
    if (params.slug === "ai-agent-automation") {
      // 這裡可以放原本的 fallback 資料
    } else {
      notFound();
    }
  }

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

      <main className="py-12">
        <div className="container-base max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors mb-8">
            <ChevronLeft size={16} />
            返回文章列表
          </Link>

          <article className="space-y-10">
            {/* Header */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-600 border-0">{article?.category || "AI 實戰"}</Badge>
                {article?.tags?.map((tag: string) => (
                  <Badge key={tag} variant="muted">#{tag}</Badge>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-[1.2]">
                {article?.title || "如何利用 AI Agent 打造自動化市場分析流程？"}
              </h1>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Doris</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{article?.date || "2024-01-03"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={article?.image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"} 
                className="w-full h-full object-cover"
                alt="article"
              />
            </div>

            {/* Content */}
            <div 
              className="prose prose-slate lg:prose-xl max-w-none prose-headings:font-black prose-headings:text-slate-950 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-950 prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: article?.content || "" }}
            />
            
            {/* 如果沒有 HTML content，顯示原本的文字內容 (作為備援) */}
            {!article?.content && (
              <div className="prose prose-slate lg:prose-xl max-w-none prose-headings:font-black prose-headings:text-slate-950 prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-slate-950 prose-a:text-blue-600">
                <p>
                  在資訊爆炸的時代，手動收集市場情報已經不再高效。隨著生成式 AI 技術的成熟，開發一個專屬的 <strong>AI Agent</strong> 來協助我們進行全自動化的數據抓取、整理與分析，已經成為每位行銷人與創業者的標配。
                </p>
                {/* ... 其他內容 ... */}
              </div>
            )}
          </article>

          {/* Footer CTA */}
          <div className="mt-20 p-10 bg-slate-950 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">想學會更多 AI 實戰技巧？</h3>
              <p className="text-slate-400">訂閱電子報，每週獲取最新的 AI 工具評測與實戰案例。</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input className="flex-1 md:w-64 px-6 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="您的 Email" />
              <Button className="rounded-xl px-8 h-auto font-bold bg-blue-600 hover:bg-blue-700">訂閱</Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50/50 py-12 mt-20">
        <div className="container-base flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-xl font-bold tracking-tight text-slate-950">Doris AI學院</div>
            <p className="text-sm text-slate-500 font-medium">用 AI 和科技 解決問題</p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-950 transition-colors">首頁</Link>
            <Link href="/courses" className="hover:text-slate-950 transition-colors">熱門課程</Link>
            <Link href="/blog" className="hover:text-slate-950 transition-colors">部落格</Link>
            <Link href="/tools" className="hover:text-slate-950 transition-colors">AI 工具</Link>
            <Link href="/services/consulting" className="hover:text-slate-950 transition-colors">服務</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
