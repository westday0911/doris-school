import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolActionButtons } from "@/components/tool/ToolActionButtons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ExternalLink, Download, Play, Globe, CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/service/ContactModal";
import { Metadata, ResolvingMetadata } from 'next';
import { formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const { data: tool } = await supabase
    .from('tools')
    .select('title, description, image_url, type')
    .eq('slug', decodedSlug)
    .single();

  if (!tool) return {};

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${tool.title} - AI 工具`,
    description: tool.description,
    openGraph: {
      title: `${tool.title} | Doris AI 學院`,
      description: tool.description,
      url: `https://doris-ai-academy.com/tools/${params.slug}`,
      images: [tool.image_url, ...previousImages],
      type: 'website',
    },
  };
}

export default async function ToolDetailPage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  // 1. 從 Supabase 獲取單個工具
  const { data: tool } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  if (!tool) {
    notFound();
  }

  // 2. 獲取其他工具推薦
  const { data: otherTools } = await supabase
    .from('tools')
    .select('*')
    .neq('slug', decodedSlug)
    .limit(3);

  const images = tool.images && tool.images.length > 0 ? tool.images : [tool.image_url];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tool.title,
    description: tool.description,
    image: images,
    brand: {
      '@type': 'Brand',
      name: 'Doris AI 學院',
    },
    offers: {
      '@type': 'Offer',
      price: tool.price,
      priceCurrency: 'TWD',
      availability: 'https://schema.org/InStock',
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
        name: 'AI 工具庫',
        item: 'https://doris-ai-academy.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.title,
        item: `https://doris-ai-academy.com/tools/${params.slug}`,
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
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors mb-8">
            <ChevronLeft size={16} />
            返回工具庫
          </Link>

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
            
            {/* 左側：工具展示與說明 */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600 border-0 rounded-sm font-bold">{tool.type}</Badge>
                  <Badge variant="outline" className="text-slate-500 rounded-sm border-slate-200">
                    {tool.status}
                  </Badge>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                  {tool.title}
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* 圖片/影片展示區 */}
              <div className="space-y-6">
                <div className="aspect-video rounded-xl overflow-hidden border border-slate-100 shadow-xl bg-slate-50 group relative">
                  {tool.video_url ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <Play className="w-16 h-16 text-white opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer" />
                      <span className="absolute bottom-6 left-6 text-white/60 text-sm font-medium">點擊播放展示影片</span>
                    </div>
                  ) : (
                    <img 
                      src={images[0]} 
                      className="w-full h-full object-cover"
                      alt={tool.title}
                    />
                  )}
                </div>
                
                {/* 縮圖列表 */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img: string, idx: number) => (
                      <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-slate-100 cursor-pointer hover:border-blue-500 transition-colors">
                        <img src={img} className="w-full h-full object-cover" alt={`${tool.title}-${idx}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 詳細說明 */}
              <div className="space-y-8 pt-8 border-t border-slate-100">
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-2xl font-black text-slate-950 mb-6">工具介紹</h3>
                  <div className="text-slate-600 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: tool.content || tool.description }} />
                </div>

                {/* 功能特點 */}
                {tool.features && tool.features.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4 pt-6">
                    {tool.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 右側：動作區塊 */}
            <aside className="space-y-6 sticky top-28">
              <Card className="border-slate-200 shadow-xl rounded-xl overflow-hidden bg-white">
                <CardHeader className="p-8 pb-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      取得方式
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-950">
                        {tool.price === 0 ? "免費" : `NT$ ${tool.price}`}
                      </span>
                      {tool.price > 0 && <span className="text-sm text-slate-400 line-through">NT$ {tool.price * 2}</span>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-4">
                  <ToolActionButtons 
                    toolId={tool.id}
                    toolUrl={tool.url}
                    downloadUrl={tool.download_url}
                    slug={tool.slug}
                  />
                  
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>使用人數</span>
                      <span className="font-bold text-slate-950">{tool.access_count || 0}+</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>最後更新</span>
                      <span className="font-bold text-slate-950">{formatDate(tool.updated_at || tool.created_at)}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 leading-relaxed text-center">
                      購買後若有任何安裝或使用問題，歡迎隨時聯繫技術支援。
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* 快速客服 */}
              <ContactModal 
                trigger={
                  <div className="p-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center gap-4 group cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">有任何開發需求？</h4>
                      <p className="text-xs text-slate-500">提供企業級客製化 AI 工具開發</p>
                    </div>
                  </div>
                }
              />
            </aside>
          </div>

          {/* 底部推薦 */}
          <section className="mt-24 pt-16 border-t border-slate-100 space-y-10">
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-950">其他實用工具</h3>
                <p className="text-slate-500">探索更多能提升效率的 AI 輔助利器</p>
              </div>
              <Link href="/tools" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                查看全部 <ChevronLeft className="rotate-180 w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {otherTools?.map((other: any) => (
                <Link key={other.slug} href={`/tools/${other.slug}`} className="group">
                  <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-lg transition-all mb-4">
                    <img src={other.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={other.title} />
                  </div>
                  <Badge className="bg-slate-100 text-slate-600 border-0 text-[10px] rounded-sm mb-2">{other.type}</Badge>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{other.title}</h4>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const ArrowRight = ({ className, ...props }: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

