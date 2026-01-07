import { NextResponse } from "next/server";
import { PayUni } from "@/lib/payuni";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { items, amount, customer, method } = await req.json();

    // 1. 在資料庫建立訂單 (supabase)
    // 這裡建議先在 supabase 建立 orders 表並儲存訂單資訊
    // 目前先模擬一個訂單編號
    const orderNo = `DORIS${Date.now()}`;

    // 2. 準備 PayUni 訂單資料 (符合文件規範)
    const payuni = new PayUni();
    const orderData = {
      MerTradeNo: orderNo,
      TradeAmt: amount,             // 修正: TradeAmt
      ProdDesc: items.map((i: any) => i.title).join(", "), // 修正: ProdDesc
      ReturnURL: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderNo=${orderNo}`,
      NotifyURL: `${process.env.NEXT_PUBLIC_api_URL || process.env.NEXT_PUBLIC_APP_URL}/api/payment/payuni/notify`,
      BackURL: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      UsrMail: customer.email,      // 修正: UsrMail
      // 根據前端選擇開啟支付工具
      Credit: method === 'credit' ? 1 : 1, // 預設開啟信用卡
      LinePay: method === 'wallets' ? 1 : 0,
      ATM: method === 'transfer' ? 1 : 0,
    };

    // 3. 生成加密參數
    const params = payuni.generatePaymentParams(orderData);

    return NextResponse.json({
      success: true,
      paymentUrl: payuni.getPaymentUrl(),
      params: params
    });

  } catch (error: any) {
    console.error("PayUni API Error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "建立訂單失敗"
    }, { status: 500 });
  }
}


