"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2, Users, Loader2 } from "lucide-react";
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

  const filteredCourses = courses.filter(course => 
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
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

      <div className="grid gap-6">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-2">
            <Loader2 className="animate-spin" />
            <span>載入中...</span>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="py-20 text-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
            目前還沒有課程資料
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-32 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                {course.image_url ? (
                  <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900">{course.title}</h3>
                  <Badge variant="muted" className="text-[10px] font-bold">{course.level}</Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Users size={14} />
                    <span>{course.student_count || 0} 位學生</span>
                  </div>
                  <div className="font-bold text-slate-900">NT$ {(course.discount_price || course.price || 0).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge className={course.status === "招生中" ? "bg-blue-100 text-blue-700 border-0" : "bg-slate-100 text-slate-500 border-0"}>
                  {course.status}
                </Badge>
                <div className="flex items-center gap-2 border-l border-slate-100 pl-4">
                  <Link href={`/admin/courses/${course.id}`}>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 size={18} />
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(course.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

