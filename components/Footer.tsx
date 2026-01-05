"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container-base flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="text-xl font-bold tracking-tight text-slate-950">
            Doris AI學院
          </div>
          <p className="text-sm text-slate-500 font-medium">用 AI 和科技 解決問題</p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
          <Link className="hover:text-slate-950 transition-colors" href="/">首頁</Link>
          <Link className="hover:text-slate-950 transition-colors" href="/courses">課程</Link>
          <Link className="hover:text-slate-950 transition-colors" href="/blog">文章</Link>
          <Link className="hover:text-slate-950 transition-colors" href="/tools">工具</Link>
          <Link className="hover:text-slate-950 transition-colors" href="/services/consulting">服務</Link>
        </div>
      </div>
      <div className="container-base mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2024 Doris AI Academy. All rights reserved.</p>
        <p>Made with passion for the future of AI.</p>
      </div>
    </footer>
  );
}

