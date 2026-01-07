"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // 進入成功頁面即清除購物車
    clearCart();
    
    // 開發環境：模擬將課程加入使用者清單 (正式環境應由 Webhook 處理)
    const simulatePurchase = async () => {
      const savedCart = localStorage.getItem("doris_cart");
      if (savedCart) {
        try {
          const items = JSON.parse(savedCart);
          // 這裡可以呼叫 API 來更新資料庫
        } catch (e) {}
      }
    };
    simulatePurchase();
  }, []);

  return (
    <div className="relative bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-20">
        <div className="container-base max-w-2xl text-center space-y-8">
          <div className="flex justify-center">
            <div className="h-24 w-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
              <CheckCircle2 size={64} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black text-slate-900">支付成功！</h1>
            <p className="text-xl text-slate-500 font-medium">
              感謝您的訂購，您現在可以開始學習了。
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 space-y-4 text-left">
            <h3 className="font-bold text-slate-900">接下來您可以：</h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">立即進入教室</p>
                  <p className="text-xs text-slate-500">前往「我的課程」開始觀看影片與教材。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm">檢查電子郵件</p>
                  <p className="text-xs text-slate-500">我們已將訂單收據與登入資訊寄送至您的信箱。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="rounded-full px-10 font-black bg-blue-600 hover:bg-blue-700 h-16 text-lg shadow-xl shadow-blue-900/20" asChild>
              <Link href="/member/dashboard">進入我的教室</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 font-black h-16 text-lg border-2" asChild>
              <Link href="/courses">瀏覽其他課程</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
