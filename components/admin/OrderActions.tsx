"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function OrderActions({ orderId, status }: { orderId: string, status: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMarkAsPaid = async () => {
    if (!confirm("確定要將此訂單標記為「已付款」嗎？這將會自動開通使用者的課程權限。")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid', updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
      
      alert("訂單狀態已更新為已付款！");
      router.refresh();
    } catch (err: any) {
      console.error("Update error:", err);
      alert("更新失敗：" + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'paid') return null;

  return (
    <Button 
      size="sm" 
      variant="outline" 
      className="text-emerald-600 border-emerald-100 hover:bg-emerald-50 hover:text-emerald-700 gap-1.5 font-bold"
      onClick={handleMarkAsPaid}
      disabled={loading}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
      確認收款
    </Button>
  );
}

