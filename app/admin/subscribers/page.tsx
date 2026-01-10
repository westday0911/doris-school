"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  Mail, 
  User as UserIcon, 
  Download, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  Filter,
  MoreVertical,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchString] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setSubscribers(data || []);
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'unsubscribed' : 'active';
    const { error } = await supabase
      .from('subscribers')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setSubscribers(subscribers.map(s => s.id === id ? { ...s, status: newStatus } : s));
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("確定要刪除此訂閱者嗎？這將會完全移除其記錄。")) return;
    
    const { error } = await supabase
      .from('subscribers')
      .delete()
      .eq('id', id);

    if (!error) {
      setSubscribers(subscribers.filter(s => s.id !== id));
    }
  };

  const exportEmails = () => {
    const activeEmails = subscribers
      .filter(s => s.status === 'active')
      .map(s => s.email)
      .join("\n");
    
    const blob = new Blob([activeEmails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `active_subscribers_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const filteredSubscribers = subscribers.filter(s => {
    const matchesSearch = s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">訂閱管理</h2>
          <p className="text-sm text-slate-500 mt-1">管理電子報名單，包含訪客訂閱與註冊會員。</p>
        </div>
        <Button onClick={exportEmails} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Download size={16} /> 匯出活躍 Email
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              placeholder="搜尋 Email..."
              value={searchTerm}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select 
              className="bg-slate-50 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">所有狀態</option>
              <option value="active">已訂閱</option>
              <option value="unsubscribed">已取消</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-black text-slate-400">
                <th className="px-6 py-4">訂閱者資訊</th>
                <th className="px-6 py-4">來源</th>
                <th className="px-6 py-4">狀態</th>
                <th className="px-6 py-4">訂閱時間</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-600" size={32} />
                  </td>
                </tr>
              ) : filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 font-medium">
                    找不到符合條件的訂閱者
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <Mail size={14} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {sub.source === 'member' ? (
                        <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 gap-1.5 px-2 py-0.5 rounded-full">
                          <UserIcon size={10} /> 註冊會員
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-50 text-slate-500 border-slate-100 gap-1.5 px-2 py-0.5 rounded-full">
                          訪客
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {sub.status === 'active' ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <CheckCircle2 size={14} /> 已訂閱
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <XCircle size={14} /> 已取消
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                      {formatDate(sub.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className={sub.status === 'active' ? "text-slate-400 hover:text-red-500" : "text-slate-400 hover:text-emerald-600"}
                          onClick={() => toggleStatus(sub.id, sub.status)}
                          title={sub.status === 'active' ? "取消訂閱" : "重新訂閱"}
                        >
                          {sub.status === 'active' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-slate-400 hover:text-red-600"
                          onClick={() => deleteSubscriber(sub.id)}
                          title="刪除記錄"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
