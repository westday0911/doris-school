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

const courseData = {
  title: "Vibe Coding 系統實戰課",
  slug: "vibe-coding-實戰課",
  description: "掌握 2025 最強開發範式，將想法瞬間轉化為高品質產品。不僅是編碼，更是一種進入高效開發狀態的藝術。",
  longDescription: [
    "在 AI 時代，編碼的本質正在發生劇變。Vibe Coding 不僅僅是關於語法，更是關於如何與 AI 協作，進入一種近乎直覺的開發節奏（Flow State）。",
    "本課程將帶領你深度拆解 Vibe Coding 的核心思維，從環境建構、提示詞工程的極致應用，到自動化工作流的整合，讓你一個人就能發揮一支開發團隊的戰力。",
    "無論你是資深開發者想提升效率，還是初學者想跨越技術門檻，這門課都將刷新你對「創造產品」的認知。"
  ],
  category: "開發實戰",
  level: "進階實戰",
  duration: "12 小時",
  totalLessons: "24 堂課",
  price: "NT$ 8,800",
  originalPrice: "NT$ 12,800",
  rating: 4.9,
  reviewCount: 128,
  studentCount: 850,
  syllabus: [
    { title: "第一階段：Vibe Coding 哲學與環境", lessons: ["AI 時代的開發範式轉移", "打造極速開發環境：Cursor 與工具鏈整合", "進入 Flow State 的心理建設"] },
    { title: "第二階段：極致提示詞工程 (Prompting)", lessons: ["結構化指令的設計藝術", "Context Window 的管理策略", "從需求到架構的 AI 引導術"] },
    { title: "第三階段：全棧產品實戰開發", lessons: ["前端 UI 的感官驅動開發", "後端邏輯與 API 的自動化構建", "資料庫設計與 AI 優化"] },
    { title: "第四階段：部署、優化與維護", lessons: ["一鍵部署工作流", "AI 輔助的 Bug 修復與效能監控", "持續集成的現代化實踐"] }
  ],
  reviews: [
    { name: "張小明", date: "2024-12-20", rating: 5, content: "這門課徹底改變了我寫程式的方式，現在開發速度快了至少三倍！" },
    { name: "王大同", date: "2024-12-15", rating: 5, content: "Doris 老師的講解非常清晰，尤其是關於如何與 AI 對話的部分，受益匪淺。" },
    { name: "李小華", date: "2024-12-10", rating: 4, content: "內容非常紮實，如果是完全沒基礎的人可能需要多看幾遍試聽影片。" }
  ],
  relatedCourses: [
    { title: "AI 自動化生產力", price: "NT$ 4,500", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop" },
    { title: "生成式 AI 商業應用", price: "NT$ 6,900", image: "https://images.unsplash.com/photo-1485828333669-bd5ecd0a37b0?w=400&h=300&fit=crop" }
  ]
};

export default function CourseDetailPage() {
  return (
    <div className="relative bg-white min-h-screen">
      {/* Navbar */}
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition-colors hover:text-slate-950" href="/courses">熱門課程</Link>
            <Link className="transition-colors hover:text-slate-950" href="/blog">AI 學習文章</Link>
            <Link className="transition-colors hover:text-slate-950" href="/tools">AI 工具</Link>
            <Link className="transition-colors hover:text-slate-950" href="/services/consulting">服務</Link>
          </nav>
          <Button size="sm">立即加入</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-950 text-white py-16 lg:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container-base relative z-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-600 border-0">{courseData.category}</Badge>
                <Badge variant="outline" className="text-white border-white/20">{courseData.level}</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {courseData.title}
              </h1>
              <p className="text-lg text-slate-400 max-w-[700px]">
                {courseData.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold">★ {courseData.rating}</span>
                  <span className="text-slate-500">({courseData.reviewCount} 則評論)</span>
                </div>
                <div className="text-slate-500">
                  <span className="text-white font-bold">{courseData.studentCount}</span> 位學員已加入
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container-base py-12 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">
          {/* Left Column: Main Content */}
          <div className="space-y-16">
            
            {/* Trial Video Area */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-950 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full" />
                課程試聽
              </h3>
              <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-200 shadow-inner">
                <img 
                  src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&h=800&fit=crop" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/50 transition-all">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-slate-950 border-b-[12px] border-b-transparent ml-2" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white text-xs font-bold uppercase tracking-widest">
                  <span>免費試看：單元 1.1 - 範式轉移</span>
                  <span>08:45</span>
                </div>
              </div>
            </div>

            {/* Course Introduction */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-950">課程介紹</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                {courseData.longDescription.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <h3 className="text-2xl font-bold text-slate-950">課程大綱</h3>
                <span className="text-sm text-slate-500 font-medium">{courseData.totalLessons}</span>
              </div>
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {courseData.syllabus.map((phase, idx) => (
                  <div key={idx} className="p-6 bg-white">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 text-white text-[10px]">{idx + 1}</span>
                      {phase.title}
                    </h4>
                    <ul className="space-y-3 pl-9">
                      {phase.lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="text-sm text-slate-500 flex items-center justify-between">
                          <span className="flex items-center gap-3">
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            {lesson}
                          </span>
                          <Badge variant="muted" className="text-[9px] bg-slate-50 border-0">Video</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews & Ratings */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-950">學員評論</h3>
              <div className="grid gap-6">
                {courseData.reviews.map((rev, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">{rev.name}</span>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex text-yellow-400 text-xs">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {rev.content}
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full py-6 rounded-xl font-bold">發表評論</Button>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Sidebar */}
          <aside className="sticky top-28 space-y-8">
            <Card className="border-slate-200 shadow-2xl rounded-3xl overflow-hidden bg-white">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&h=400&fit=crop" 
                  alt={courseData.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-slate-950">{courseData.price}</span>
                    <span className="text-lg text-slate-400 line-through font-medium">{courseData.originalPrice}</span>
                  </div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">限時 7 折優惠中</p>
                </div>

                <div className="space-y-4">
                  <Button size="lg" className="w-full h-14 text-lg font-black bg-slate-950 hover:bg-blue-600 transition-all rounded-2xl shadow-xl">
                    立即購買課程
                  </Button>
                  <p className="text-[10px] text-slate-400 text-center font-medium">30 天無條件退款保證</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">包含內容</h5>
                  <ul className="space-y-3">
                    {[
                      { icon: "⏱", val: courseData.duration + " 高畫質影片" },
                      { icon: "📄", val: "專屬提示詞模板庫" },
                      { icon: "💬", val: "VIP 社群討論權限" },
                      { icon: "🏆", val: "結業實戰證書" },
                      { icon: "♾️", val: "終身重複觀看" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <span className="text-lg">{item.icon}</span>
                        {item.val}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Share or Info */}
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                團體報名 3 人以上另有優惠，請聯繫 <a href="#" className="underline font-bold">Doris 助手</a>
              </p>
            </div>
          </aside>
        </div>

        {/* Recommended Courses Section */}
        <section className="mt-32 pt-20 border-t border-slate-100 space-y-12">
          <div className="space-y-2 text-center">
            <h3 className="text-3xl font-black tracking-tight text-slate-950">推薦其他課程</h3>
            <p className="text-slate-500">根據你的興趣，你可能也會喜歡...</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 max-w-[900px] mx-auto gap-8">
            {courseData.relatedCourses.map((rc, i) => (
              <Link key={i} href="#" className="group">
                <Card className="overflow-hidden border-slate-200 hover:shadow-xl transition-all duration-500 rounded-2xl bg-white h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img src={rc.image} alt={rc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg font-bold text-slate-950 group-hover:text-blue-600 transition-colors">{rc.title}</CardTitle>
                    <div className="pt-4 flex justify-between items-center">
                      <span className="font-black text-slate-950">{rc.price}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">查看詳情 →</span>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50/50 py-12">
        <div className="container-base flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="text-xl font-bold tracking-tight text-slate-950">Doris AI學院</div>
            <p className="text-sm text-slate-500 font-medium">用 AI 和科技 解決問題</p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-slate-950 transition-colors">首頁</Link>
            <Link href="/blog" className="hover:text-slate-950 transition-colors">部落格</Link>
            <a href="/#cta" className="hover:text-slate-950 transition-colors">聯絡我們</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

