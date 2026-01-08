"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Search, 
  Trash2, 
  Loader2, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Archive,
  User,
  PhoneCall
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert("更新失敗：" + error.message);
    } else {
      fetchContacts();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("確定要刪除這筆聯絡紀錄嗎？")) {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) {
        alert("刪除失敗：" + error.message);
      } else {
        fetchContacts();
      }
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.contact_info.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.requirement && contact.requirement.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950">諮詢需求管理</h1>
          <p className="text-sm text-slate-500">查看並管理來自前台的專屬諮詢預約</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          placeholder="搜尋姓名、聯絡資訊或需求內容..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mr-2" /> 載入中...
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="overflow-hidden border-slate-200 hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-[1fr_200px] items-stretch">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{contact.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <PhoneCall size={12} />
                            {contact.contact_info}
                          </div>
                        </div>
                      </div>
                      <Badge className={
                        contact.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                        contact.status === 'processed' ? 'bg-emerald-50 text-emerald-700' :
                        'bg-slate-50 text-slate-500'
                      }>
                        {contact.status === 'pending' ? '待處理' :
                         contact.status === 'processed' ? '已聯繫' : '已封存'}
                      </Badge>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                        <MessageSquare size={10} /> 需求描述
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {contact.requirement || "未提供詳細需求"}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Clock size={10} /> 提交於 {formatDate(contact.created_at)}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 border-l border-slate-100 p-6 flex flex-col justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start gap-2 font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-100"
                      onClick={() => updateStatus(contact.id, 'processed')}
                    >
                      <CheckCircle2 size={14} /> 標記為已聯繫
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start gap-2 font-bold text-slate-600 hover:text-slate-700 hover:bg-white"
                      onClick={() => updateStatus(contact.id, 'archived')}
                    >
                      <Archive size={14} /> 封存此需求
                    </Button>
                    <div className="pt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-start gap-2 font-bold text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 size={14} /> 刪除紀錄
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400">尚無符合條件的諮詢需求</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

