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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          profiles (name)
        `)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error("Error fetching orders:", fetchError);
        setError(fetchError.message);
      } else {
        setOrders(data || []);
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (order.order_number || "").toLowerCase().includes(s) ||
      (order.profiles?.name || "").toLowerCase().includes(s) ||
      (order.customer_name || "").toLowerCase().includes(s) ||
      (order.customer_email || "").toLowerCase().includes(s)
    );
  });

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

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold">
          讀取訂單失敗：{error}
        </div>
      )}

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
                  <Loader2 className="animate-spin mx-auto text-slate-400" />
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400">目前尚無訂單。</td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                // 確保我們拿到的是完整的 ID
                const fullOrderId = order.id;
                // 僅在顯示時使用短 ID
                const displayId = order.order_number || (fullOrderId && fullOrderId.length > 8 ? fullOrderId.substring(0, 8) : fullOrderId);

                return (
                  <tr key={fullOrderId} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-bold text-slate-900">{displayId}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-slate-800">{order.profiles?.name || order.customer_name || '未知會員'}</p>
                        <p className="text-[11px] text-slate-400">{order.customer_email}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-medium">{order.items_summary}</p>
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
                        <OrderActions orderId={fullOrderId} status={order.status} onUpdate={fetchOrders} />
                        <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
