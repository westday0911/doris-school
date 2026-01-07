"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, XCircle, Trash2, User, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from("reviews")
      .update({ status: "已發佈" })
      .eq("id", id);

    if (error) {
      alert("更新失敗：" + error.message);
    } else {
      fetchReviews();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除這條評論嗎？")) return;

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) {
      alert("刪除失敗：" + error.message);
    } else {
      fetchReviews();
    }
  };

  const filteredReviews = reviews.filter(rev => 
    rev.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rev.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rev.target_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="搜尋用戶、內容或項目..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={fetchReviews}>
          重新整理
        </Button>
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
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="animate-spin" />
                    <span>載入中...</span>
                  </div>
                </td>
              </tr>
            ) : filteredReviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                  查無評論資料
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {review.user_name?.[0] || <User size={12} />}
                        </div>
                        <span className="text-sm font-bold text-slate-800">{review.user_name}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-md">{review.content}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 line-clamp-1">{review.target_title}</span>
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
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {formatDate(review.created_at)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {review.status === "待審核" && (
                        <button 
                          onClick={() => handleApprove(review.id)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                          title="核准"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(review.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                        title="刪除"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
