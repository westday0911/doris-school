"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Save, Eye, Image as ImageIcon, Tag } from "lucide-react";
import Link from "next/link";

export default function AdminArticleEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/articles" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors"
        >
          <ChevronLeft size={16} /> 返回文章列表
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold">
            <Eye size={16} /> 預覽
          </Button>
          <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700">
            <Save size={16} /> {isNew ? "建立文章" : "儲存變更"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">文章標題</label>
            <input 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500/20" 
              placeholder="請輸入文章標題..."
              defaultValue={isNew ? "" : "如何利用 AI Agent 打造自動化市場分析流程？"}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">內容編輯</label>
              <div className="flex gap-2 text-xs text-slate-400">
                <span>Markdown 支援</span>
              </div>
            </div>
            <textarea 
              className="w-full px-4 py-4 rounded-xl border border-slate-200 min-h-[500px] outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-sm leading-relaxed" 
              placeholder="開始撰寫您的內容..."
              defaultValue={isNew ? "" : "在資訊爆炸的時代，手動收集市場情報已經不再高效..."}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">文章狀態</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none">
                <option>草稿</option>
                <option>已發佈</option>
                <option>排程發佈</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">文章分類</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none">
                <option>AI 實戰</option>
                <option>趨勢分析</option>
                <option>技術分享</option>
                <option>專欄文章</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">標籤 (Tags)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="muted" className="gap-1">AI Agent <span className="cursor-pointer">×</span></Badge>
                <Badge variant="muted" className="gap-1">自動化 <span className="cursor-pointer">×</span></Badge>
              </div>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm outline-none" placeholder="新增標籤..." />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">封面圖片</label>
              <div className="aspect-video bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer">
                <ImageIcon size={24} />
                <span className="text-xs font-medium">上傳封面圖片</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
