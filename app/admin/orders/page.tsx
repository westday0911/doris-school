"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import { OrderActions } from "@/components/admin/OrderActions";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    // 從 Supabase 獲取訂單列表，並關聯 profiles 取得會員名稱
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles:user_id (name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const filteredOrders = orders.filter(order => 
    order.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
              placeholder="搜尋訂單編號、姓名、Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Loader2 className="animate-spin" />
                    <span>載入中...</span>
                  </div>
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400">
                  目前尚無訂單資料。
                </td>
              </tr>
            ) : (
              filteredOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900">{order.order_number || order.id.substring(0, 12)}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-800">{order.profiles?.name || order.customer_name || '未知會員'}</p>
                      <p className="text-[11px] text-slate-400">{order.customer_email}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-medium">{order.items_summary || '多項課程'}</p>
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
                      <OrderActions orderId={order.id} status={order.status} onUpdate={fetchOrders} />
                      <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                        <ExternalLink size={18} />
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
