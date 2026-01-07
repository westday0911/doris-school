"use client";

import { useEffect, useState, useRef } from "react";
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
import { Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export function BlogListClient({ 
  initialArticles, 
  selectedCategory 
}: { 
  initialArticles: any[], 
  selectedCategory?: string 
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArticles.length >= ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  const fetchMoreArticles = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    const from = page * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    let query = supabase
      .from('articles')
      .select('*, author:profiles(name, avatar_url)')
      .neq('status', '草稿')
      .order('published_at', { ascending: false })
      .range(from, to);

    if (selectedCategory) {
      query = query.contains('categories', [selectedCategory]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching more articles:", error);
    } else if (data) {
      if (data.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
      setArticles(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreArticles();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, hasMore, page, loading]);

  // 當類別改變時重置
  useEffect(() => {
    setArticles(initialArticles);
    setPage(1);
    setHasMore(initialArticles.length >= ITEMS_PER_PAGE);
  }, [initialArticles]);

  return (
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
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-medium text-slate-400">
                  {formatDate(article.published_at || article.created_at)}
                </div>
                {article.author && (
                  <div className="flex items-center gap-1.5">
                    <img 
                      src={article.author.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name || 'Doris')}`} 
                      className="w-4 h-4 rounded-full object-cover"
                      alt={article.author.name}
                    />
                    <span className="text-[10px] font-bold text-slate-600">{article.author.name}</span>
                  </div>
                )}
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
      
      {/* 載入中指示器 & Observer Target */}
      <div ref={observerTarget} className="py-10 flex justify-center w-full">
        {loading && (
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <Loader2 className="w-4 h-4 animate-spin" />
            載入更多文章...
          </div>
        )}
        {!hasMore && articles.length > 0 && (
          <div className="text-slate-300 text-xs font-medium uppercase tracking-widest">
            — 已顯示所有文章 —
          </div>
        )}
      </div>
    </div>
  );
}

