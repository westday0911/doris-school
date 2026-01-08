"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function OrderActions({ orderId, status, onUpdate }: { orderId: string, status: string, onUpdate?: () => void }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleMarkAsPaid = async () => {
    // 1. 極度詳細的日誌記錄
    console.log("DEBUG: OrderActions received orderId:", orderId);
    console.log("DEBUG: Type of orderId:", typeof orderId);
    
    if (!orderId || typeof orderId !== 'string') {
      alert("錯誤：無效的訂單 ID 類型");
      return;
    }

    // 2. UUID 格式驗證
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(orderId)) {
      alert(`偵測到無效的 ID 格式: "${orderId}"\n這可能是因為 ID 被錯誤截斷為 8 碼。\n請確保您點擊的是完整的訂單項目。`);
      return;
    }

    if (!confirm("確定要將此訂單標記為「已付款」嗎？")) return;

    setLoading(true);
    try {
      // 1. 先獲取目前的訂單資料，檢查 items_data
      const { data: currentOrder, error: fetchError } = await supabase
        .from('orders')
        .select('items_data, user_id')
        .eq('id', orderId)
        .single();

      if (fetchError) throw fetchError;

      // 2. 檢查是否有 null/empty 的 uuid 字串
      // 網友提到的「empty uuid String foreign key」
      if (currentOrder.user_id === "" || currentOrder.user_id === "null") {
        console.warn("Fixing empty/invalid user_id string to null");
        await supabase.from('orders').update({ user_id: null }).eq('id', orderId);
      }

      // 3. 處理 items_data 裡的截斷 ID (最重要的修復)
      if (currentOrder?.items_data) {
        const fixedItemsData = currentOrder.items_data.map((item: any) => {
          if (typeof item.id === 'string' && item.id.includes('-')) {
            const uuidMatch = item.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
            if (uuidMatch) {
              return { ...item, id: uuidMatch[0] };
            }
          }
          return item;
        });

        const hasChange = JSON.stringify(fixedItemsData) !== JSON.stringify(currentOrder.items_data);
        if (hasChange) {
          console.log("Cleaning invalid IDs in items_data before status update...");
          const { error: patchError } = await supabase
            .from('orders')
            .update({ items_data: fixedItemsData })
            .eq('id', orderId);
          
          if (patchError) {
            console.error("Failed to patch items_data:", patchError);
          }
        }
      }
      
      console.log("orderId before update:", orderId, orderId.length);

      const { data: u } = await supabase.auth.getUser();
console.log("auth user id:", u?.user?.id, u?.user?.id?.length);

const { data: s } = await supabase.auth.getSession();
console.log("jwt sub:", s?.session?.user?.id);

      // 4. 執行更新
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid', 
          updated_at: new Date().toISOString() 
        })
        .eq('id', orderId);

      if (error) {
        console.error("Supabase Update Error:", error);
        throw error;
      }
      
      alert("訂單狀態已更新為已付款！");
      if (onUpdate) onUpdate();
      router.refresh();
    } catch (err: any) {
      console.error("Caught Error:", err);
      alert(`更新失敗：${err.message}\n\n嘗試更新的 ID: ${orderId}`);
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
