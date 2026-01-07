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

    // 2. 準備 PayUni 訂單資料 (嚴格遵循文件欄位名稱)
    const payuni = new PayUni();
    const orderData = {
      MerTradeNo: orderNo,
      TradeAmt: amount,
      ProdDesc: items.map((i: any) => i.title).join(", "),
      ReturnURL: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderNo=${orderNo}`,
      NotifyURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/payuni/notify`,
      BackURL: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      UsrMail: customer.email,
      // 開啟所有支付方式供學生在 PayUni 頁面選擇
      Credit: 1,
      LinePay: 1,
      JKoPay: 1,
      ATM: 1,
      CVS: 1
    };

    // 3. 生成加密參數
    const params = payuni.generatePaymentParams(orderData);
    console.log("orderData", orderData);
    console.log("PayUni Request Debug params:", params);

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


