import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminArticlesPage() {
  const articles = [
    { id: 1, title: "如何利用 AI Agent 打造自動化市場分析流程？", category: "AI 實戰", status: "已發佈", date: "2024-01-03", views: 1248 },
    { id: 2, title: "2024 年最值得關注的 10 個開源 LLM 模型", category: "趨勢分析", status: "草稿", date: "2024-01-02", views: 0 },
    { id: 3, title: "為什麼每個開發者都應該學會 Vibe Coding？", category: "技術分享", status: "已發佈", date: "2023-12-28", views: 3560 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
            placeholder="搜尋文章標題或分類..."
          />
        </div>
        <Link href="/admin/articles/new">
          <Button className="gap-2 font-bold">
            <Plus size={18} /> 新增文章
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">標題</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">分類</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">狀態</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">發佈日期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">瀏覽量</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 line-clamp-1">{article.title}</span>
                    <span className="text-[10px] text-slate-400">ID: #{article.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="muted" className="text-[10px] font-bold">{article.category}</Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge className={article.status === "已發佈" ? "bg-emerald-100 text-emerald-700 border-0" : "bg-slate-100 text-slate-600 border-0"}>
                    {article.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                  {article.date}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 text-right font-mono">
                  {article.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/articles/${article.id}`}>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                    </Link>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

