import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminToolsPage() {
  // 從 Supabase 獲取工具列表
  const { data: tools, error } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false });

  const displayTools = tools || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="搜尋工具名稱或類型..."
          />
        </div>
        <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700">
          <Plus size={18} /> 新增 AI 工具
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTools.map((tool: any) => (
          <div key={tool.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all space-y-4">
            <div className="flex justify-between items-start">
              <Badge variant="muted" className="text-[10px] font-bold">{tool.type}</Badge>
              <Badge className={tool.status === "上架中" ? "bg-emerald-50 text-emerald-700 border-0" : "bg-amber-50 text-amber-700 border-0"}>
                {tool.status || "上架中"}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">{tool.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Globe size={12} />
                <span>累積使用次數: {tool.access_count || 0}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[10px] text-slate-300 font-mono">ID: {tool.id.substring(0, 8)}...</span>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {displayTools.length === 0 && (
          <div className="col-span-full text-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">目前尚無工具資料，請先在 Supabase 建立 tools 資料表。</p>
          </div>
        )}
      </div>
    </div>
  );
}
