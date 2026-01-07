import { NextResponse } from "next/server";
import { PayUni } from "@/lib/payuni";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const encryptInfo = formData.get("EncryptInfo") as string;
    const hashInfo = formData.get("HashInfo") as string;

    if (!encryptInfo || !hashInfo) {
      return NextResponse.json({ success: false, message: "Missing params" }, { status: 400 });
    }

    const payuni = new PayUni();
    
    // 1. 驗證雜湊值 (HashInfo)
    const calculatedHash = payuni.sha256(encryptInfo);
    if (calculatedHash !== hashInfo) {
      console.error("PayUni Notify: Hash validation failed");
      return NextResponse.json({ success: false, message: "Hash invalid" }, { status: 400 });
    }

    // 2. 解密交易資訊 (EncryptInfo)
    const decryptedText = payuni.decrypt(encryptInfo);
    // PayUni 內部是以 URL Query String 格式加密
    const params = new URLSearchParams(decryptedText);
    
    const status = params.get("Status"); // 1 為成功
    const merTradeNo = params.get("MerTradeNo");
    const tradeNo = params.get("TradeNo"); // PayUni 交易序號

    console.log(`PayUni Notify Received: Order ${merTradeNo}, Status ${status}`);

    // 3. 如果支付成功 (Status === "1")
    if (status === "1") {
      // 這裡只需要更新訂單狀態為 paid
      // 課程權限的開通建議交由資料庫 Trigger 處理，或是統一呼叫一個 Function
      const { data: order, error: updateError } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          updated_at: new Date().toISOString(),
          payuni_trade_no: tradeNo // 紀錄金流交易序號
        })
        .eq('order_number', merTradeNo)
        .eq('status', 'pending') // 確保只處理待付款的訂單，避免重複處理
        .select()
        .single();

      if (updateError) {
        console.error("Database Update Error:", updateError);
        return NextResponse.json({ success: false, message: "DB Error" }, { status: 500 });
      }

      console.log(`Order ${merTradeNo} marked as PAID via PayUni.`);
    }

    // PayUni 要求回傳 OK 表示收到通知
    return new Response("OK", { status: 200 });

  } catch (error: any) {
    console.error("PayUni Notify Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

