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

export default function ConsultingServicePage() {
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
              <Badge className="px-6 py-2 rounded-full text-sm font-bold bg-slate-950 text-white border-slate-950 shadow-lg cursor-pointer">
                AI 轉型顧問
              </Badge>
            </Link>
            <Link href="/services/automation">
              <Badge variant="muted" className="px-6 py-2 rounded-full text-sm font-bold bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-950 transition-all cursor-pointer">
                AI 自動化工具開發
              </Badge>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-600 border-0">Strategic Consulting</Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
                  企業 AI <span className="text-blue-600">轉型顧問服務</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  不只是導入工具，更是重新定義工作流程。我們協助企業從戰略高度佈局 AI，確保技術投資轉化為真實的商業價值。
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "現有工作流 AI 化評估",
                  "企業專屬 AI 導入路線圖",
                  "團隊 AI 思維與技能培訓",
                  "AI 倫理與數據安全規範"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="h-14 px-10 rounded-full shadow-xl">立即預約諮詢</Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-50 rounded-[3rem] blur-3xl opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl"
                alt="Consulting"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "深度調研", desc: "深入了解您的業務痛點，找出最適合導入 AI 的環節。", icon: "🔍" },
              { title: "方案設計", desc: "量身定制 AI 實施方案，包含工具選擇與流程優化。", icon: "🎨" },
              { title: "落地執行", desc: "陪跑企業完成 AI 導入，並進行持續的效能監控與優化。", icon: "⚙️" }
            ].map((step) => (
              <Card key={step.title} className="p-8 border-slate-100 bg-slate-50/30">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </Card>
            ))}
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



