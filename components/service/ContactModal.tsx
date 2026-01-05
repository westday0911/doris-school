"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Instagram, Mail, Send } from "lucide-react";
import React from "react";

interface ContactModalProps {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}

export function ContactModal({ 
  trigger, 
  title = "預約專屬諮詢", 
  description = "請填寫以下資訊，我們將由專人與您聯繫。" 
}: ContactModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button>立即諮詢</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">{title}</DialogTitle>
          <DialogDescription className="text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 聯絡資訊 */}
          <div className="grid grid-cols-2 gap-4">
            <a 
              href="https://www.instagram.com/doris_ai_academy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold">Instagram</p>
                <p className="text-sm font-bold text-slate-900">私訊小編</p>
              </div>
            </a>
            <a 
              href="mailto:doris@hiinmusic.com" 
              className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold">Email</p>
                <p className="text-sm font-bold text-slate-900">寄送郵件</p>
              </div>
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-bold tracking-widest">或填寫表單</span>
            </div>
          </div>

          {/* 表單預留 - 目前先做 UI */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">您的稱呼</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                placeholder="例如：王先生 / 陳小姐"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">聯絡方式 (Email 或 電話)</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all" 
                placeholder="請輸入您的聯絡資訊"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">諮詢需求簡述</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all h-24 resize-none" 
                placeholder="請簡述您的需求或痛點..."
              />
            </div>
            <Button className="w-full h-12 rounded-xl font-bold text-base bg-blue-600 hover:bg-blue-700 gap-2">
              <Send className="h-4 w-4" />
              提交需求，由顧問聯繫我
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

