"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2, Globe, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminToolsPage() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching tools:", error);
    } else {
      setTools(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("確定要刪除這個工具嗎？此操作無法復原。")) {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting tool:", error);
        alert("刪除失敗：" + error.message);
      } else {
        alert("工具已成功刪除！");
        fetchTools();
      }
    }
  };

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="搜尋工具名稱或類型..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/tools/new">
          <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700">
            <Plus size={18} /> 新增 AI 工具
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-40 text-slate-400">
          <Loader2 className="animate-spin mr-2" /> 載入中...
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool: any) => (
            <div key={tool.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all space-y-4 flex flex-col h-full">
              <div className="flex justify-between items-start">
                <Badge variant="muted" className="text-[10px] font-bold rounded-sm">{tool.type}</Badge>
                <div className="flex gap-2">
                  <Badge className={`rounded-sm text-[10px] font-bold ${tool.price === 0 ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
                    {tool.price === 0 ? "免費" : `NT$ ${tool.price}`}
                  </Badge>
                  <Badge className={`rounded-sm text-[10px] font-bold ${tool.status === "上架中" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {tool.status || "上架中"}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-1 flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 line-clamp-1">{tool.title}</h3>
                  <Link href={`/tools/${tool.slug}`} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <ExternalLink size={14} />
                  </Link>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium pt-2">
                  <Globe size={12} />
                  <span>累積使用次數: {tool.access_count || 0}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] text-slate-300 font-mono">ID: {tool.id.substring(0, 8)}...</span>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/tools/${tool.id}`}>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </Link>
                  <button 
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => handleDelete(tool.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredTools.length === 0 && (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400">目前尚無工具資料，請先點擊「新增 AI 工具」。</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
