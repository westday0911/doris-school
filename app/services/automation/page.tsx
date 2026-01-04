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

export default function AutomationServicePage() {
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
            <Link className="transition-colors hover:text-slate-950" href="/tools">AI 工具</Link>
            <Link className="text-slate-950 font-bold" href="/services/consulting">服務</Link>
          </nav>
          <Button size="sm">立即加入</Button>
        </div>
      </header>

      <main className="py-12 sm:py-20">
        <div className="container-base">
          {/* 服務切換 Tag */}
          <div className="flex justify-center gap-4 mb-16">
            <Link href="/services/consulting">
              <Badge variant="muted" className="px-6 py-2 rounded-full text-sm font-bold bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-950 transition-all cursor-pointer">
                AI 轉型顧問
              </Badge>
            </Link>
            <Link href="/services/automation">
              <Badge className="px-6 py-2 rounded-full text-sm font-bold bg-slate-950 text-white border-slate-950 shadow-lg cursor-pointer">
                AI 自動化工具開發
              </Badge>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-indigo-50 rounded-[3rem] blur-3xl opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1518433278984-132d71329c2c?w=800&h=600&fit=crop" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl"
                alt="Automation Development"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <Badge className="bg-indigo-600 border-0">Custom Development</Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
                  客製化 AI <span className="text-indigo-600">自動化工具開發</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  將繁瑣的重複性工作交給 AI。我們為您量身打造自動化工具，提升團隊 10 倍生產力，讓人才專注於更具創造力的任務。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "AI Agent 開發", icon: "🤖" },
                  { label: "流程自動化 (RPA)", icon: "⚡" },
                  { label: "API 系統整合", icon: "🔌" },
                  { label: "自定義 LLM 應用", icon: "🧠" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                    <span>{item.icon}</span>
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="h-14 px-10 rounded-full shadow-xl bg-indigo-600 hover:bg-indigo-700">提出開發需求</Button>
            </div>
          </div>

          <div className="bg-slate-950 rounded-[3rem] p-12 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold">為什麼選擇我們的自動化服務？</h2>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-3">
                  <div className="text-4xl">🚀</div>
                  <h4 className="font-bold">極速開發</h4>
                  <p className="text-slate-400 text-sm">採用最新 AI 輔助開發技術，將交付週期縮短 50%。</p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl">🛠️</div>
                  <h4 className="font-bold">深度客製</h4>
                  <p className="text-slate-400 text-sm">完全貼合您的業務場景，不使用生硬的套殼方案。</p>
                </div>
                <div className="space-y-3">
                  <div className="text-4xl">📈</div>
                  <h4 className="font-bold">持續優化</h4>
                  <p className="text-slate-400 text-sm">提供完善的售後維護與模型微調，確保工具與時俱進。</p>
                </div>
              </div>
            </div>
          </div>
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
            <Link href="/tools" className="hover:text-slate-950 transition-colors">AI 工具</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}



