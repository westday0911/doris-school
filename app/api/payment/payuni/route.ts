import { NextResponse } from "next/server";
import { PayUni } from "@/lib/payuni";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { items, amount, customer } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase Config:", { 
        url: supabaseUrl ? "Present" : "Missing", 
        key: serviceRoleKey ? "Present" : "Missing" 
      });
      throw new Error("Supabase configuration is missing in environment variables.");
    }

    // 使用 Service Role Key 建立管理員權限的 Supabase Client
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // 0. 嘗試獲取目前登入使用者 ID (透過 Authorization Header)
    // 這樣即便使用 admin client 也能知道是哪位使用者在下單
    const authHeader = req.headers.get("Authorization");
    let userId = null;
    
    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      const { data: { user } } = await supabaseAdmin.auth.getUser(token);
      if (user) userId = user.id;
    }

    // 1. 在資料庫建立訂單 (使用 supabaseAdmin)
    const orderNo = `DORIS${Date.now()}`;
    const itemsSummary = items.map((i: any) => i.title).join(", ");

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert([{
        order_number: orderNo,
        user_id: userId,
        items_summary: itemsSummary,
        total_amount: amount,
        payment_method: 'PayUni',
        status: 'pending',
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        items_data: items
      }])
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error (Admin):", orderError);
      return NextResponse.json({ success: false, message: `資料庫錯誤: ${orderError.message}` }, { status: 500 });
    }

    // 2. 準備 PayUni 訂單資料 (嚴格遵循文件欄位名稱)
    const payuni = new PayUni();
    const paymentUrl = payuni.getPaymentUrl();

    if (!paymentUrl) {
      console.error("PayUni Config Error: PAYUNI_API_URL is missing");
      return NextResponse.json({ success: false, message: "後端金流網址尚未設定" }, { status: 500 });
    }

    const orderData = {
      MerTradeNo: orderNo,
      TradeAmt: amount,
      ProdDesc: itemsSummary,
      ReturnURL: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderNo=${orderNo}`,
      NotifyURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/payuni/notify`,
      BackURL: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      UsrMail: customer.email,
      // 開放主要支付方式
      Credit: 1,
      LinePay: 0,
      JKoPay: 0,
      ATM: 0,
      CVS: 0
    };

    // 3. 生成加密參數
    const params = payuni.generatePaymentParams(orderData);
    
    console.log("Order successfully created and params generated:", orderNo);

    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrl,
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
