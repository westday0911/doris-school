"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Save, Eye, LayoutGrid, Clock, Award, DollarSign } from "lucide-react";
import Link from "next/link";

export default function AdminCourseEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/courses" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors"
        >
          <ChevronLeft size={16} /> 返回課程列表
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold">
            <Eye size={16} /> 預覽
          </Button>
          <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700">
            <Save size={16} /> {isNew ? "建立課程" : "儲存變更"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">基本資訊</h3>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">課程名稱</label>
                <input 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" 
                  defaultValue={isNew ? "" : "Vibe Coding 系統實戰課"}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">短簡介</label>
                <textarea 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 h-24 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm leading-relaxed" 
                  defaultValue={isNew ? "" : "掌握最新的 Vibe Coding 趨勢，打造具備極致體驗的現代化應用。"}
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">售價與規格</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <DollarSign size={14} /> 原價 (NT$)
                </label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="12,800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <DollarSign size={14} className="text-blue-600" /> 優惠價 (NT$)
                </label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-blue-600" defaultValue="8,800" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Clock size={14} /> 總時數 (小時)
                </label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" defaultValue="12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Award size={14} /> 難度
                </label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option>入門</option>
                  <option>中級</option>
                  <option selected>進階</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">課程內容詳情</h3>
            <textarea 
              className="w-full px-4 py-4 rounded-xl border border-slate-200 min-h-[300px] outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-sm leading-relaxed" 
              placeholder="輸入完整的課程介紹內容..."
            />
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">課程狀態</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <input type="radio" name="status" defaultChecked className="accent-blue-600" />
                  <span className="text-sm font-medium">招生中</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <input type="radio" name="status" className="accent-blue-600" />
                  <span className="text-sm font-medium">已額滿</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <input type="radio" name="status" className="accent-blue-600" />
                  <span className="text-sm font-medium">已下架</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">課程分類</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none">
                <option>進階課</option>
                <option>效率課</option>
                <option>商業課</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">課程縮圖</label>
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center text-slate-400 relative group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&h=400&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold">更換圖片</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



