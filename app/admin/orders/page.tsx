import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import { OrderActions } from "@/components/admin/OrderActions";

export default async function AdminOrdersPage() {
  // 從 Supabase 獲取訂單列表，並關聯 profiles 取得會員名稱
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      profiles:user_id (name)
    `)
    .order('created_at', { ascending: false });

  const displayOrders = orders || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
              placeholder="搜尋訂單編號..."
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
            {displayOrders.map((order: any) => (
              <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900">{order.order_number || order.id.substring(0, 12)}</td>
                <td className="px-6 py-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-800">{order.profiles?.name || '未知會員'}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{order.items_summary || '多項課程'}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-800">NT$ {order.total_amount?.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-400">{order.payment_method}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={order.status === "paid" ? "bg-emerald-50 text-emerald-700 border-0" : "bg-amber-50 text-amber-700 border-0"}>
                    {order.status === "paid" ? "付款成功" : "等待付款"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium whitespace-nowrap">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <OrderActions orderId={order.id} status={order.status} />
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayOrders.length === 0 && (
          <div className="text-center py-20 bg-white">
            <p className="text-slate-400">目前尚無訂單資料。</p>
          </div>
        )}
      </div>
    </div>
  );
}
