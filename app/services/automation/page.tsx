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
import { 
  Bot, 
  Zap, 
  Cpu, 
  Database, 
  Code2, 
  Repeat, 
  Rocket, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Workflow,
  Layers,
  Sparkles,
  BarChart,
  ShieldCheck,
  Globe
} from "lucide-react";
import { ContactModal } from "@/components/service/ContactModal";

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

      <main className="pb-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden relative">
          <div className="container-base relative z-10">
            {/* 服務切換 Tag */}
            <div className="flex justify-center gap-4 mb-12">
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

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-indigo-600 hover:bg-indigo-700 border-0 px-4 py-1 text-sm">Custom Development</Badge>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.1]">
                    打造您的專屬 <br />
                    <span className="text-indigo-600">AI 自動化部隊</span>
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                    擺脫低效的手動操作。我們利用最新的大語言模型 (LLM) 與 Agent 技術，為您開發高度客製化的自動化工具，將團隊從瑣事中解放，專注於真正的戰略創新。
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ContactModal 
                    trigger={
                      <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-xl bg-indigo-600 hover:bg-indigo-700 group">
                        立即預約諮詢
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    }
                  />
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500 font-medium pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                    <span>24/7 全天候運行</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                    <span>精準、零疲勞操作</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-3xl" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-950">
                  <div className="p-8 space-y-6">
                    {/* Mock Code/UI UI */}
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <div className="ml-auto text-xs text-slate-500 font-mono">ai-agent-v2.py</div>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                      <p className="text-indigo-400">class AIAgent:</p>
                      <p className="text-slate-400 pl-4">def __init__(self, task):</p>
                      <p className="text-emerald-400 pl-8">self.brain = "GPT-4o"</p>
                      <p className="text-slate-400 pl-8">self.tools = ["WebSearch", "Database", "Gmail"]</p>
                      <p className="text-slate-400 pl-4">def execute(self):</p>
                      <p className="text-indigo-400 pl-8">print("🚀 Starting automated workflow...")</p>
                      <p className="text-slate-400 pl-8"># Processing data points...</p>
                      <p className="text-emerald-400 pl-8">return "Task Completed"</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[240px]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-black text-slate-900">10x</div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">工作處理速度顯著提升</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 bg-slate-50">
          <div className="container-base">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1 text-indigo-600 border-indigo-200">Our Capabilities</Badge>
              <h2 className="text-4xl font-black text-slate-950 mb-6">我們擅長的 AI 開發領域</h2>
              <p className="text-lg text-slate-600">
                不僅僅是調用 API，我們提供的是深度集成、具備邏輯推理能力且可持續進化的 AI 系統。
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: "AI Agents 開發", 
                  desc: "打造具備自主決策能力的 AI 智能體，能根據目標自動分解任務並調用工具執行。",
                  icon: Bot,
                  color: "border-blue-100 hover:border-blue-400"
                },
                { 
                  title: "RAG 知識庫系統", 
                  desc: "讓 AI 學習您公司的內部文檔。精準回答業務問題，杜絕 AI 幻覺，保護企業隱私。",
                  icon: Database,
                  color: "border-indigo-100 hover:border-indigo-400"
                },
                { 
                  title: "客製化 LLM 應用", 
                  desc: "針對特定垂直領域（如法律、廣告、財務）進行模型微調與提示詞工程優化。",
                  icon: Cpu,
                  color: "border-purple-100 hover:border-purple-400"
                },
                { 
                  title: "系統 API 整合", 
                  desc: "將 AI 無縫嵌入您現有的 ERP、CRM 或通訊工具，實現跨平台、跨系統的自動化。",
                  icon: Workflow,
                  color: "border-slate-100 hover:border-slate-400"
                }
              ].map((item) => (
                <div key={item.title} className={`bg-white p-8 rounded-3xl border ${item.color} transition-all shadow-sm hover:shadow-md group`}>
                  <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24">
          <div className="container-base">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-black text-slate-950 mb-6">解決真實場景中的低效問題</h2>
                <p className="text-lg text-slate-600">
                  AI 不應只是玩具。我們關注的是如何將其轉化為真實的生產力工具，解決企業每天都在發生的重複勞動。
                </p>
              </div>
              <ContactModal 
                trigger={
                  <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50">
                    了解更多行業方案 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Case 1 */}
              <div className="space-y-6">
                <div className="aspect-video rounded-[2rem] overflow-hidden bg-slate-100 relative group">
                  <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-indigo-200" />
                  </div>
                </div>
                <div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mb-4">Marketing & Sales</Badge>
                  <h3 className="text-2xl font-bold mb-4">全自動營銷內容矩陣</h3>
                  <p className="text-slate-600 leading-relaxed">
                    根據產品特性，自動生成多種風格的社群貼文與廣告文案。系統能結合品牌調性進行 24/7 的內容產出，極大化提升數位行銷的產能。
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      大幅提升內容產能
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      顯著降低製作成本
                    </li>
                  </ul>
                </div>
              </div>

              {/* Case 2 */}
              <div className="space-y-6">
                <div className="aspect-video rounded-[2rem] overflow-hidden bg-slate-100 relative group">
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MessageSquare className="h-12 w-12 text-blue-200" />
                  </div>
                </div>
                <div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4">Customer Support</Badge>
                  <h3 className="text-2xl font-bold mb-4">具備解決能力之 AI 客服</h3>
                  <p className="text-slate-600 leading-relaxed">
                    超越簡單的問答。這款 AI 能理解客戶意圖，主動查詢內部資料庫，協助客戶完成查詢、預約等操作，真正減少人工客服的重複性工作。
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      即時秒級回覆速度
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      提高問題自主解決率
                    </li>
                  </ul>
                </div>
              </div>

              {/* Case 3 */}
              <div className="space-y-6">
                <div className="aspect-video rounded-[2rem] overflow-hidden bg-slate-100 relative group">
                  <div className="absolute inset-0 bg-purple-600/10 group-hover:bg-purple-600/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart className="h-12 w-12 text-purple-200" />
                  </div>
                </div>
                <div>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">Data Analytics</Badge>
                  <h3 className="text-2xl font-bold mb-4">AI 自動化經營分析系統</h3>
                  <p className="text-slate-600 leading-relaxed">
                    自動對接業務數據，AI 能自動分析經營現況，並將枯燥的數字轉化為專業的洞察分析與改善建議，協助管理層做出精準決策。
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      節省大量數據整理時間
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                      提供深度商業洞察
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-slate-950 text-white rounded-[3rem] mx-4 sm:mx-8">
          <div className="container-base">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <Badge className="bg-indigo-600 mb-6 px-4 py-1">Development Roadmap</Badge>
                <h2 className="text-4xl font-black mb-8 leading-tight">從想法到交付，<br />僅需 4 個階段</h2>
                <div className="space-y-12">
                  {[
                    { 
                      title: "需求定義與可行性評估", 
                      desc: "梳理您的業務邏輯，確定 AI 導入的關鍵點與技術架構，並提供明確的開發規劃。" 
                    },
                    { 
                      title: "架構設計與模型開發", 
                      desc: "建立數據通道，進行提示詞優化或模型調整，並開發核心自動化邏輯。" 
                    },
                    { 
                      title: "壓力測試與安全過濾", 
                      desc: "模擬複雜場景，確保 AI 穩定運行，並添加數據安全與敏感資訊過濾層。" 
                    },
                    { 
                      title: "部署與迭代優化", 
                      desc: "上線運行，並根據真實表現進行持續的模型微調，確保工具始終高效。" 
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative group">
                      <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold">{step.title}</h4>
                        <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="aspect-square bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-end gap-2 group hover:border-indigo-500/50 transition-colors">
                    <Code2 className="h-8 w-8 text-indigo-400" />
                    <div className="font-bold">敏捷開發</div>
                    <div className="text-xs text-slate-500">定期同步進度，快速響應反饋。</div>
                  </div>
                  <div className="aspect-square bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-end gap-2 group hover:border-emerald-500/50 transition-colors">
                    <Layers className="h-8 w-8 text-emerald-400" />
                    <div className="font-bold">現代化架構</div>
                    <div className="text-xs text-slate-500">基於穩定、可擴展的雲端技術。</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-end gap-2 group hover:border-amber-500/50 transition-colors">
                    <ShieldCheck className="h-8 w-8 text-amber-400" />
                    <div className="font-bold">數據隱私</div>
                    <div className="text-xs text-slate-500">全方位的數據加密與安全保障。</div>
                  </div>
                  <div className="aspect-square bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-end gap-2 group hover:border-purple-500/50 transition-colors">
                    <Globe className="h-8 w-8 text-purple-400" />
                    <div className="font-bold">全球連動</div>
                    <div className="text-xs text-slate-500">支持多語言與跨地域的系統訪問。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24">
          <div className="container-base text-center">
            <h2 className="text-3xl font-black mb-16 text-slate-950">領先的 AI 技術棧支持</h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {["OpenAI", "Anthropic", "LangChain", "Python", "Node.js", "Docker", "Supabase", "HuggingFace", "Vector DB"].map(tech => (
                <span key={tech} className="text-2xl font-black tracking-tighter text-slate-400">{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container-base">
            <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Rocket className="h-64 w-64" />
              </div>
              <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-black leading-tight">
                  讓 AI 成為您的超強隊友，<br />
                  立即開啟自動化之旅。
                </h2>
                <p className="text-xl text-indigo-100">
                  只要您的工作是有邏輯、有規律的，AI 就能做得比人更好、更準確。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <ContactModal 
                    trigger={
                      <Button size="lg" className="h-16 px-12 rounded-full text-xl bg-white text-indigo-600 hover:bg-slate-100 shadow-2xl">
                        與開發顧問聊聊需求
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
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
