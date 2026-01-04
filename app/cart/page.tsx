import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      title: "Vibe Coding 系統實戰課",
      price: 8800,
      image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=200&h=150&fit=crop",
      tag: "進階課"
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="relative bg-white min-h-screen">
      <header className="border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container-base flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
            Doris AI學院
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link className="transition-colors hover:text-slate-950" href="/courses">熱門課程</Link>
            <Link className="transition-colors hover:text-slate-950" href="/blog">AI 學習文章</Link>
            <Link className="transition-colors hover:text-slate-950" href="/tools">AI 工具</Link>
            <Link className="transition-colors hover:text-slate-950" href="/services/consulting">服務</Link>
          </nav>
          <Button size="sm">立即加入</Button>
        </div>
      </header>

      <main className="py-12 sm:py-20">
        <div className="container-base">
          <h1 className="text-3xl font-black text-slate-950 mb-8">我的購物車</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-slate-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row p-4 gap-4">
                    <img src={item.image} className="w-full sm:w-32 h-24 object-cover rounded-lg" alt={item.title} />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Badge variant="muted" className="mb-1 text-[10px]">{item.tag}</Badge>
                        <h3 className="font-bold text-slate-950">{item.title}</h3>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-slate-400">
                          <button className="hover:text-slate-950"><Minus size={16} /></button>
                          <span className="text-slate-950 font-bold">1</span>
                          <button className="hover:text-slate-950"><Plus size={16} /></button>
                        </div>
                        <span className="font-bold text-slate-950">NT$ {item.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors self-start sm:self-center">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </Card>
              ))}
              
              {cartItems.length === 0 && (
                <div className="py-20 text-center space-y-4">
                  <p className="text-slate-500">購物車目前是空的</p>
                  <Button asChild>
                    <Link href="/courses">前往選購課程</Link>
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Card className="border-slate-100 shadow-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">訂單摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">小計</span>
                    <span className="text-slate-950 font-medium">NT$ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">優惠折扣</span>
                    <span className="text-green-600 font-medium">- NT$ 0</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <span className="font-bold">總計</span>
                    <span className="text-xl font-black text-blue-600">NT$ {subtotal.toLocaleString()}</span>
                  </div>
                  <Button className="w-full h-12 rounded-lg font-bold" asChild>
                    <Link href="/checkout">前往結帳</Link>
                  </Button>
                  <p className="text-[10px] text-slate-400 text-center">
                    點擊前往結帳即表示您同意我們的服務條款與隱私權政策。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}



