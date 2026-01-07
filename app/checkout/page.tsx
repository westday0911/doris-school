"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { 
  CreditCard, 
  ChevronLeft, 
  ShieldCheck, 
  Info, 
  Wallet, 
  Landmark,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { items, totalAmount } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Sync user info if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
        name: user.user_metadata?.full_name || ""
      }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !loading) {
      router.push("/courses");
    }
  }, [items, router, loading]);

  const handleCheckout = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("請完整填寫聯絡資訊");
      return;
    }

    setLoading(true);
    
    try {
      // 獲取目前登入使用者的 session 以便驗證
      const { data: { session } } = await supabase.auth.getSession();

      // 這裡串接後端 API 建立訂單並取得 PayUni 支付表單資訊
      const response = await fetch("/api/payment/payuni", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": session ? `Bearer ${session.access_token}` : "",
        },
        body: JSON.stringify({
          items,
          amount: totalAmount,
          customer: formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        // 建立一個隱藏表單並提交到 PayUni
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.paymentUrl;

        // 將 PayUni 需要的所有加密參數加入
        Object.entries(data.params).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error(data.message || "建立支付訂單失敗");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert("結帳過程發生錯誤：" + error.message);
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="relative bg-slate-50 min-h-screen flex flex-col">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Doris AI 學院" className="h-6 w-auto" />
            <span className="text-sm font-black text-slate-950">Doris AI 學院</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
            <span className="text-slate-400">1. 購物車</span>
            <span className="w-4 h-px bg-slate-200 mx-1" />
            <span className="text-blue-600">2. 結帳資訊</span>
            <span className="w-4 h-px bg-slate-200 mx-1" />
            <span>3. 完成訂單</span>
          </div>
          <div className="w-20 hidden sm:block" /> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container-base max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* 聯絡資訊 */}
              <Card className="border-0 shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50 p-6">
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" /> 聯絡人資訊
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">真實姓名</label>
                      <input 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" 
                        placeholder="填寫收據抬頭姓名"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">手機號碼</label>
                      <input 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" 
                        placeholder="0912-345-678"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">常用電子郵件</label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" 
                      placeholder="用於接收開課通知與發票"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <p className="text-[10px] text-slate-400 font-medium">※ 請務必填寫正確，系統將自動以此 Email 寄送課程登入資訊。</p>
                  </div>
                </CardContent>
              </Card>

              {/* 付款說明 */}
              <Card className="border-0 shadow-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-white border-b border-slate-50 p-6">
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" /> 付款方式
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">跳轉至 PayUni 安全支付頁面</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">
                        您可以在下一步選擇：信用卡 (一次付清/分期)、ATM 轉帳、LINE Pay、街口支付或超商繳費。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 訂單摘要 */}
            <div className="space-y-6">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white sticky top-24">
                <CardHeader className="bg-slate-900 text-white p-6">
                  <CardTitle className="text-lg font-black">訂單摘要</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-50">
                          <img src={item.image_url} className="w-full h-full object-cover" alt="course" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-900 line-clamp-1">{item.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">{item.pricing_label}</p>
                          <p className="text-xs font-black text-blue-600 mt-1">NT$ {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-500">應付總計</span>
                      <span className="text-2xl font-black text-slate-950">NT$ {totalAmount.toLocaleString()}</span>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                          本課程採用 PayUni 統一金流提供之安全加密技術，您的卡號與支付資訊將受到銀行等級保護。
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                          結帳完成後，系統將立即將課程連結發送至您的電子郵件。
                        </p>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-16 rounded-2xl font-black text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 group"
                      onClick={handleCheckout}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          處理中...
                        </>
                      ) : (
                        "確認支付，開始學習"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
