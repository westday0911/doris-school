"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2, Users, Loader2, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching courses:", error);
    } else {
      setCourses(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除這門課程嗎？")) return;

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      alert("刪除失敗：" + error.message);
    } else {
      fetchCourses();
    }
  };

  const updateOrder = async (id: string, newOrder: number) => {
    const { error } = await supabase
      .from('courses')
      .update({ order_index: newOrder })
      .eq('id', id);
    
    if (error) {
      alert("更新排序失敗");
    } else {
      fetchCourses();
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
            placeholder="搜尋課程名稱..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/courses/new">
          <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700">
            <Plus size={18} /> 建立新課程
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16 text-center">排序</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">課程資訊</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">定價方案</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">狀態</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">學生數</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">操作</th>
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
            ) : filteredCourses.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                  目前還沒有課程資料
                </td>
              </tr>
            ) : (
              filteredCourses.map((course: any, idx: number) => (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <input 
                        type="number"
                        className="w-12 text-center text-xs font-bold border border-slate-200 rounded py-1 outline-none focus:border-blue-500"
                        value={course.order_index || 0}
                        onChange={(e) => updateOrder(course.id, parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                        {course.image_url ? (
                          <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 line-clamp-1">{course.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-mono">/{course.slug}</span>
                          <Badge variant="muted" className="text-[9px] px-1 py-0 h-4">{course.level}</Badge>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-700">
                      {course.pricing_options && course.pricing_options.length > 0 ? (
                        <span className="text-blue-600">
                          NT$ {Math.min(...course.pricing_options.map((o: any) => o.price || 0)).toLocaleString()} 起
                          <span className="ml-1 text-[10px] text-slate-400 font-normal">({course.pricing_options.length} 個方案)</span>
                        </span>
                      ) : (
                        <span>NT$ {(course.discount_price || course.original_price || 0).toLocaleString()}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={
                      course.status === "招生中" || course.status === "已上架" 
                        ? "bg-emerald-100 text-emerald-700 border-0" 
                        : course.status === "預購中" 
                          ? "bg-blue-100 text-blue-700 border-0"
                          : "bg-slate-100 text-slate-600 border-0"
                    }>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 text-right font-mono">
                    {(course.student_count || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/courses/${course.id}`}>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Edit2 size={16} />
                        </button>
                      </Link>
                      <Link href={`/courses/${course.slug}`} target="_blank">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <ExternalLink size={16} />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
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

