import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="relative bg-slate-50 min-h-screen">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="text-blue-600">1. 購物車</span>
            <span className="w-4 h-px bg-slate-200" />
            <span className="text-slate-950">2. 結帳資訊</span>
            <span className="w-4 h-px bg-slate-200" />
            <span>3. 完成訂單</span>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container-base max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">聯絡資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">姓名</label>
                      <input className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="請輸入姓名" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">電子郵件</label>
                      <input className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="example@email.com" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">付款方式</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {[
                      { id: 'credit', label: '信用卡 / 簽帳卡', icon: '💳' },
                      { id: 'transfer', label: 'ATM 轉帳', icon: '🏦' },
                      { id: 'linepay', label: 'Line Pay', icon: '🟢' }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" defaultChecked={method.id === 'credit'} className="w-4 h-4 accent-blue-600" />
                          <span className="text-sm font-bold">{method.label}</span>
                        </div>
                        <span className="text-lg">{method.icon}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-slate-100 shadow-sm sticky top-24 bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">訂單摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-12 h-9 bg-slate-100 rounded object-cover overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=100&h=100&fit=crop" alt="course" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold line-clamp-1">Vibe Coding 系統實戰課</p>
                        <p className="text-[10px] text-slate-400">NT$ 8,800</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">應付金額</span>
                      <span className="text-xl font-black text-slate-950">NT$ 8,800</span>
                    </div>
                  </div>
                  <Button className="w-full h-12 rounded-lg font-bold" asChild>
                    <Link href="/checkout/success">確認支付</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

