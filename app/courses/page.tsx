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

const courses = [
  {
    title: "Vibe Coding 系統實戰課",
    slug: "vibe-coding",
    description: "掌握最新的 Vibe Coding 趨勢，打造具備極致體驗的現代化應用。",
    tag: "進階課",
    level: "進階",
    duration: "12 小時",
    originalPrice: "NT$ 12,800",
    discountPrice: "NT$ 8,800",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "AI 自動化生產力",
    slug: "ai-automation",
    description: "用 No-code 與 AI 工具打造高效率工作流程。",
    tag: "效率課",
    level: "入門",
    duration: "8 小時",
    originalPrice: "NT$ 6,800",
    discountPrice: "NT$ 4,500",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop&crop=center"
  },
  {
    title: "生成式 AI 商業應用",
    slug: "generative-ai-business",
    description: "打造可複製的 AI 變現模式，快速驗證市場。",
    tag: "商業課",
    level: "中級",
    duration: "10 小時",
    originalPrice: "NT$ 9,800",
    discountPrice: "NT$ 6,900",
    image: "https://images.unsplash.com/photo-1485828333669-bd5ecd0a37b0?w=600&h=400&fit=crop&crop=center"
  },
];

export default function CoursesPage() {
  return (
    <div className="relative bg-white min-h-screen">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="text-slate-950 font-bold" href="/courses">熱門課程</Link>
            <Link className="transition-colors hover:text-slate-950" href="/blog">AI 學習文章</Link>
            <Link className="transition-colors hover:text-slate-950" href="/tools">AI 工具</Link>
            <Link className="transition-colors hover:text-slate-950" href="/services/consulting">服務</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hidden text-sm font-medium text-slate-600 hover:text-slate-950 sm:block">
              登入
            </Link>
            <Button size="sm" asChild>
              <Link href="/auth/register">立即加入</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="py-16 sm:py-24">
        <div className="container-base">
          <div className="space-y-4 mb-16 text-center">
            <Badge variant="muted">課程總覽</Badge>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
              開啟你的 <span className="text-blue-600">AI 學習旅程</span>
            </h1>
            <p className="text-slate-500 max-w-[600px] mx-auto text-lg">
              從基礎思維到實戰開發，我們提供最完整的 AI 課程，陪你一步步建立不被取代的競爭力。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.title} className="flex flex-col h-full overflow-hidden group hover:shadow-xl transition-all duration-500 border-slate-200 rounded-xl bg-white">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-black/80 backdrop-blur-md text-white border-0 text-[10px] px-2 py-0">
                      {course.tag}
                    </Badge>
                    <Badge variant="muted" className="bg-white/90 backdrop-blur-md text-slate-900 border-0 text-[10px] px-2 py-0">
                      {course.level}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-5 space-y-3">
                  <div className="flex items-center text-[11px] font-medium text-slate-400">
                    <span>{course.duration}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-950 leading-tight group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-5 pb-6 mt-auto">
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 line-through leading-none mb-1">{course.originalPrice}</span>
                      <span className="text-2xl font-bold text-slate-950 leading-none">{course.discountPrice}</span>
                    </div>
                    <Link href={course.slug === 'vibe-coding' ? '/courses/vibe-coding' : '#'}>
                      <Button size="sm" variant="default" className="rounded-lg h-9 text-xs">
                        立即查看
                      </Button>
                    </Link>
                  </div>
                </CardContent>
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
            <Link href="/courses" className="text-slate-950 font-bold">熱門課程</Link>
            <Link href="/blog" className="hover:text-slate-950 transition-colors">部落格</Link>
            <a href="/#cta" className="hover:text-slate-950 transition-colors">聯絡我們</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

