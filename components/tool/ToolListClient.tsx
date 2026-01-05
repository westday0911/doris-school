"use client";

import { useState } from "react";
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
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const toolTypes = ["全部", "AI Agent", "小工具", "網頁版型"];

export default function ToolListClient({ initialTools }: { initialTools: any[] }) {
  const [activeType, setActiveType] = useState("全部");
  const tools = initialTools;

  const filteredTools = activeType === "全部" 
    ? tools 
    : tools.filter(tool => tool.type === activeType);

  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />

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

          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400">目前該分類下尚無工具，敬請期待。</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

