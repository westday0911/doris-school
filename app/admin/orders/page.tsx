import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, ExternalLink } from "lucide-react";

export default function AdminOrdersPage() {
  const orders = [
    { id: "ORD-2024-001", member: "王小明", item: "Vibe Coding 系統實戰課", price: "8,800", method: "信用卡", status: "付款成功", date: "2024-01-03 14:30" },
    { id: "ORD-2024-002", member: "李大同", item: "AI 自動化生產力", price: "4,500", method: "Line Pay", status: "等待付款", date: "2024-01-03 12:15" },
    { id: "ORD-2024-003", member: "張曉華", item: "生成式 AI 商業應用", price: "6,900", method: "ATM 轉帳", status: "付款成功", date: "2024-01-02 18:45" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
              placeholder="搜尋訂單編號或會員..."
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={16} /> 篩選
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors">
          <Download size={16} /> 匯出報表
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">訂單編號</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">會員 / 項目</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">金額 / 方式</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">狀態</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">日期</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">詳情</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-800">{order.member}</p>
                    <p className="text-[11px] text-slate-400">{order.item}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-800">NT$ {order.price}</p>
                    <p className="text-[11px] text-slate-400">{order.method}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={order.status === "付款成功" ? "bg-emerald-50 text-emerald-700 border-0" : "bg-amber-50 text-amber-700 border-0"}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                    <ExternalLink size={18} />
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

