import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2, Users } from "lucide-react";
import Link from "next/link";

export default function AdminCoursesPage() {
  const courses = [
    { id: 1, title: "Vibe Coding 系統實戰課", students: 156, price: "8,800", level: "進階", status: "招生中" },
    { id: 2, title: "AI 自動化生產力", students: 98, price: "4,500", level: "入門", status: "招生中" },
    { id: 3, title: "生成式 AI 商業應用", students: 72, price: "6,900", level: "中級", status: "已下架" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="搜尋課程名稱..."
          />
        </div>
        <Link href="/admin/courses/new">
          <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700">
            <Plus size={18} /> 建立新課程
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-32 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
               <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-slate-900">{course.title}</h3>
                <Badge variant="muted" className="text-[10px] font-bold">{course.level}</Badge>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>{course.students} 位學生</span>
                </div>
                <div className="font-bold text-slate-900">NT$ {course.price}</div>
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
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

