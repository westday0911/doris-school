import { Badge } from "@/components/ui/badge";
import { Search, Mail, Phone, MoreHorizontal, ShieldCheck } from "lucide-react";

export default function AdminMembersPage() {
  const members = [
    { id: 1, name: "王小明", email: "wang@example.com", role: "付費學員", joinDate: "2024-01-01", status: "有效" },
    { id: 2, name: "李大同", email: "lee@example.com", role: "付費學員", joinDate: "2023-12-15", status: "有效" },
    { id: 3, name: "張曉華", email: "chang@example.com", role: "免費會員", joinDate: "2023-11-20", status: "停權" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
            placeholder="搜尋姓名、Email..."
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">會員資料</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">角色</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">加入日期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">狀態</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">管理</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{member.name}</p>
                      <p className="text-[11px] text-slate-400">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="muted" className="font-bold text-[10px]">{member.role}</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{member.joinDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${member.status === "有效" ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className={`text-xs font-bold ${member.status === "有效" ? "text-emerald-600" : "text-red-600"}`}>
                      {member.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

