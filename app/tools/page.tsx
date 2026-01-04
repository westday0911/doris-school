'use client';

import { useState, useEffect } from "react";
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

const toolTypes = ["全部", "AI Agent", "小工具", "網頁版型"];

export default function ToolsPage() {
  const [activeType, setActiveType] = useState("全部");
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTools() {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setTools(data);
      setLoading(false);
    }
    fetchTools();
  }, []);

  const filteredTools = activeType === "全部" 
    ? tools 
    : tools.filter(tool => tool.type === activeType);

  return (
    <div className="relative bg-white min-h-screen">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition-colors hover:text-slate-950" href="/courses">熱門課程</Link>
            <Link className="transition-colors hover:text-slate-950" href="/blog">AI 學習文章</Link>
            <Link className="text-slate-950 font-bold" href="/tools">AI 工具</Link>
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

      <main className="py-16 sm:py-24">
        <div className="container-base">
          <div className="space-y-4 mb-12 text-center">
            <Badge variant="muted">工具庫</Badge>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
              實用的 <span className="text-blue-600">AI 輔助工具</span>
            </h1>
            <p className="text-slate-500 max-w-[600px] mx-auto text-lg">
              我們開發了一系列 AI Agent、小工具與網頁模板，協助你將 AI 思維落實到日常工作中。
            </p>
          </div>

          {/* 篩選 Tag */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {toolTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  activeType === type 
                    ? "bg-slate-950 text-white border-slate-950 shadow-lg" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-950"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* 工具列表 */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-slate-400 animate-pulse">載入工具中...</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="group overflow-hidden border-slate-200 rounded-xl hover:shadow-xl transition-all duration-500 flex flex-col">
                  <Link href={`/tools/${tool.slug}`} className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={tool.image_url || "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop"}
                      alt={tool.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/80 backdrop-blur-md text-white border-0 text-[10px] px-3 py-1 rounded-sm font-bold">
                        {tool.type}
                      </Badge>
                    </div>
                  </Link>
                  <CardHeader className="p-6 space-y-3">
                    <Link href={`/tools/${tool.slug}`}>
                      <CardTitle className="text-xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-8 mt-auto">
                    <Button variant="outline" className="w-full rounded-lg font-bold hover:bg-slate-950 hover:text-white transition-all" asChild>
                      <Link href={`/tools/${tool.slug}`}>查看詳情</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400">目前該分類下尚無工具，敬請期待。</p>
            </div>
          )}
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
            <Link href="/blog" className="hover:text-slate-950 transition-colors">部落格</Link>
            <Link href="/tools" className="text-slate-950 font-bold">AI 工具</Link>
            <Link href="/services/consulting" className="hover:text-slate-950 transition-colors">服務</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
