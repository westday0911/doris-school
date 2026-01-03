import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, XCircle, Trash2, User } from "lucide-react";

export default function AdminReviewsPage() {
  const reviews = [
    { 
      id: 1, 
      user: "王小明", 
      target: "Vibe Coding 系統實戰課", 
      content: "這門課內容非常扎實，特別是關於 AI Agent 的部分對我啟發很大！", 
      rating: 5, 
      status: "待審核", 
      date: "2024-01-03" 
    },
    { 
      id: 2, 
      user: "李大同", 
      target: "AI 自動化生產力", 
      content: "希望能有更多關於 Make.com 的實戰案例。", 
      rating: 4, 
      status: "已發佈", 
      date: "2024-01-02" 
    },
    { 
      id: 3, 
      user: "張曉華", 
      target: "如何利用 AI Agent 打造自動化市場分析流程？", 
      content: "寫得很詳細，幫我解決了之前的抓取問題。", 
      rating: 5, 
      status: "已發佈", 
      date: "2023-12-28" 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="搜尋用戶、內容或項目..."
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">評論者 / 內容</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">評論項目</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">評分</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">狀態</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">日期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">管理</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {review.user[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{review.user}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 max-w-md">{review.content}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-600 line-clamp-1">{review.target}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex text-amber-400 text-xs">
                    {"★".repeat(review.rating)}
                    <span className="text-slate-200">{"★".repeat(5 - review.rating)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={review.status === "已發佈" ? "bg-emerald-50 text-emerald-700 border-0" : "bg-amber-50 text-amber-700 border-0"}>
                    {review.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{review.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {review.status === "待審核" && (
                      <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="核准">
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="刪除">
                      <Trash2 size={18} />
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

