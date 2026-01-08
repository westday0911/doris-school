import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { 
  CheckCircle2, 
  BarChart3, 
  Target, 
  Zap, 
  Users, 
  ShieldCheck, 
  Search, 
  Layout, 
  Settings, 
  ArrowRight,
  MessageSquare,
  FileSearch,
  LineChart,
  Network
} from "lucide-react";
import { ContactModal } from "@/components/service/ContactModal";

export default function ConsultingServicePage() {
  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />

      <main className="pb-20">
        {/* Hero Section */}
        <section className="pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden relative">
          <div className="container-base relative z-10">
            <div className="flex justify-center gap-4 mb-12">
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

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Badge className="bg-blue-600 hover:bg-blue-700 border-0 px-4 py-1 text-sm">Strategic Consulting</Badge>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-950 leading-[1.1]">
                    引領企業進入 <br />
                    <span className="text-blue-600">AI 優先</span> 的新時代
                  </h1>
                  <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                    我們不只是導入工具，更是協助您的企業重新設計核心競爭力。透過深度的策略佈局、流程優化與人才培訓，確保 AI 技術投資能轉化為長期可持續的商業增長。
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ContactModal 
                    trigger={
                      <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-xl bg-blue-600 hover:bg-blue-700 group">
                        立即預約 1:1 諮詢
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    }
                  />
                  
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500 font-medium pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>專業實戰經驗</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>全方位轉型策略</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[3rem] blur-3xl" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&h=800&fit=crop" 
                    className="w-full h-auto object-cover"
                    alt="Corporate AI Consulting"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">數據驅動轉型</p>
                        <p className="text-xs text-slate-500">協助企業優化流程，實現顯著的成本節降</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-24 bg-slate-50">
          <div className="container-base">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-6">轉型不僅是技術升級，更是競爭力的躍遷</h2>
              <p className="text-lg text-slate-600">
                在 AI 浪潮中，企業面臨的最大挑戰不是缺乏工具，而是缺乏清晰的導入藍圖。我們的顧問服務聚焦於三大核心維度：
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  title: "策略佈局 (Strategy)", 
                  desc: "從商業目標出發，定義 AI 在組織中的角色。我們協助制定短中長期導入路徑圖，確保每一分資源都投在最關鍵的增長點上。",
                  icon: Target,
                  color: "bg-blue-50 text-blue-600"
                },
                { 
                  title: "流程再造 (Optimization)", 
                  desc: "深入現有工作流，辨識可自動化與 AI 增強的環節。透過導入領先技術，將繁瑣的任務轉化為自動化的動力。",
                  icon: Zap,
                  color: "bg-amber-50 text-amber-600"
                },
                { 
                  title: "組織賦能 (Empowerment)", 
                  desc: "建立企業內部 AI 文化。我們提供從管理層到執行層的專業指導，確保團隊具備 AI 思維，主動推動企業持續創新。",
                  icon: Users,
                  color: "bg-emerald-50 text-emerald-600"
                }
              ].map((pillar) => (
                <div key={pillar.title} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className={`h-16 w-16 ${pillar.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <pillar.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">{pillar.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-24">
          <div className="container-base">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <Badge variant="outline" className="mb-4 px-4 py-1 text-blue-600 border-blue-200">Our Services</Badge>
              <h2 className="text-4xl font-black text-slate-950 mb-6">全方位的 AI 轉型解決方案</h2>
              <p className="text-slate-600">我們提供的服務覆蓋了從初步評估到最後落地的每一個細節，確保您的企業能夠平穩、高效地完成 AI 化。</p>
            </div>

            <div className="space-y-32">
              {/* Service 1 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="h-14 w-14 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
                    <Search className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-950">1. 企業 AI 整備度診斷與需求評估</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                    <p>
                      盲目導入 AI 常導致資源浪費。我們的顧問團隊將進駐您的企業，進行深度的流程觀察與訪談。
                    </p>
                    <p>
                      我們將盤點現有的數據資產、技術架構、以及營運痛點。最終交付一份詳細的「AI 整備度報告」，明確指出哪些部門最適合率先轉型，以及預期的優化空間。
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                      {["內部數據質量審查", "現有技術架構分析", "部門自動化潛力評分", "首個 AI 應用場景篩選"].map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-blue-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-[2rem] p-8 aspect-video flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <FileSearch className="h-16 w-16 text-slate-300 mx-auto" />
                    <p className="text-slate-400 font-medium italic">深度診斷報告示意圖</p>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 bg-slate-100 rounded-[2rem] p-8 aspect-video flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Network className="h-16 w-16 text-slate-300 mx-auto" />
                    <p className="text-slate-400 font-medium italic">企業 AI 生態系統架構圖</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="h-14 w-14 bg-amber-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-amber-200">
                    <Layout className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-950">2. 專屬 AI 導入藍圖與技術選型</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                    <p>
                      在技術爆炸的時代，選擇合適的工具至關重要。我們為企業量身設計「AI 架構地圖」。
                    </p>
                    <p>
                      這不僅包含工具建議，更涉及數據流向、隱私保護、以及系統間的無縫串接。我們會根據您的預算、團隊能力與安全要求，提供最具商業效益的方案。
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                      {["技術選型矩陣", "數據安全防護設計", "分階段實施計畫表", "營運成本預估與分析"].map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-amber-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="h-14 w-14 bg-emerald-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-200">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-950">3. AI 治理、安全性與倫理規範</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                    <p>
                      導入 AI 的同時，安全與合規是不可逾越的紅線。我們協助企業建立完善的《AI 使用規範》與管理制度。
                    </p>
                    <p>
                      包含員工使用準則、機密數據過濾機制、以及生成內容的審核流程。確保企業在提升效率的同時，能將數據洩漏與法律風險降至最低。
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                      {["內部 AI 使用手冊", "數據脫敏機制建立", "AI 生成內容合規指導", "隱私性審計與防護"].map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-[2rem] p-8 aspect-video flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <ShieldCheck className="h-16 w-16 text-slate-300 mx-auto" />
                    <p className="text-slate-400 font-medium italic">數據安全防火牆概念模型</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-24 bg-slate-950 text-white rounded-[3rem] mx-4 sm:mx-8">
          <div className="container-base">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-4xl font-black mb-6">標準化轉型路徑</h2>
              <p className="text-slate-400">我們採用經過驗證的 6 步轉型法，確保每一個環節都有跡可循，結果可衡量。</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
              {[
                { step: "01", title: "啟動與對齊", desc: "確立項目目標，統一核心團隊對 AI 的認知與期望。" },
                { step: "02", title: "深度調研", desc: "現場考察業務流程，抓取關鍵數據點與效率瓶頸。" },
                { step: "03", title: "方案設計", desc: "產出詳細的技術方案與實施藍圖，並進行可行性論證。" },
                { step: "04", title: "MVP 試點", desc: "選擇一個核心流程進行小規模實驗，快速驗證成效。" },
                { step: "05", title: "全量擴張", desc: "總結試點經驗後在全公司範圍內推廣，實現規模化效益。" },
                { step: "06", title: "持續優化", desc: "隨技術進步定期微調模型與流程，確保企業領先地位。" }
              ].map((item, idx) => (
                <div key={item.step} className="relative group">
                  <div className="flex flex-col space-y-4">
                    <span className="text-6xl font-black text-slate-800 group-hover:text-blue-600/20 transition-colors">{item.step}</span>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Factors */}
        <section className="py-24">
          <div className="container-base">
            <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <LineChart className="h-64 w-64" />
              </div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black mb-8">我們如何協助您成功？</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xl mb-2">顯著提升營運效率</h5>
                        <p className="text-blue-100">協助企業簡化日常行政與重複性任務，釋放團隊創造力。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xl mb-2">優化資源與成本</h5>
                        <p className="text-blue-100">透過精準決策與自動化，降低不必要的資源耗損。</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xl mb-2">驅動商業創新增長</h5>
                        <p className="text-blue-100">利用 AI 優化客戶體驗，為企業創造新的市場機會。</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                    <div className="text-4xl font-black mb-2">AI</div>
                    <div className="text-sm text-blue-100">優先戰略思維</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                    <div className="text-4xl font-black mb-2">客製</div>
                    <div className="text-sm text-blue-100">量身打造方案</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                    <div className="text-4xl font-black mb-2">安全</div>
                    <div className="text-sm text-blue-100">最高合規標準</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                    <div className="text-4xl font-black mb-2">賦能</div>
                    <div className="text-sm text-blue-100">持續陪伴優化</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50">
          <div className="container-base max-w-4xl">
            <h2 className="text-3xl font-black text-center mb-16">關於 AI 轉型顧問的常見問題</h2>
            <div className="space-y-6">
              {[
                { 
                  q: "為什麼我們需要外部顧問，而不是讓內部 IT 部門處理？", 
                  a: "AI 轉型不僅是技術問題，更涉及商業流程再造與組織變革。外部顧問擁有跨產業視野，能避開技術陷阱，從戰略高度推動變革，縮短企業摸索期。" 
                },
                { 
                  q: "AI 轉型顧問服務如何提供最大的價值？", 
                  a: "我們透過深度的業務洞察，協助企業在最適當的環節導入 AI。不僅是導入工具，更是優化核心競爭力，確保每一分投入都能轉化為實際的營運提升。" 
                },
                { 
                  q: "如果我們的數據尚未整合，也能進行 AI 轉型嗎？", 
                  a: "這正是最需要顧問的時刻。我們會協助您建立數據規範與自動化整合流程，確保數據能成為 AI 發揮效能的基礎。轉型的第一步往往就是數據治理。" 
                },
                { 
                  q: "服務過程會包含對員工的訓練嗎？", 
                  a: "是的，這是成功的關鍵。我們會根據不同職能提供專屬的 AI 操作與思維培訓，確保員工不僅會用工具，更能主動推動企業內部的持續創新。" 
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-slate-600 pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container-base">
            <div className="relative rounded-[3rem] overflow-hidden bg-slate-950 p-12 lg:p-24 text-center">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.5),transparent_70%)]" />
              </div>
              <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                  現在就是轉型的最佳時機，<br />
                  引領您的企業邁向未來。
                </h2>
                <p className="text-xl text-slate-400">
                  我們提供專屬的初步諮詢。針對您的業務需求，提供專業的 AI 優化方向與建議。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <ContactModal 
                    trigger={
                      <Button size="lg" className="h-16 px-12 rounded-full text-xl bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-500/20">
                        立即預約專屬諮詢
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
