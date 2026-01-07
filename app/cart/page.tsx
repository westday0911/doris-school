"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CartPage() {
  const { items, removeFromCart, totalAmount } = useCart();

  return (
    <div className="relative bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="container-base max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-black text-slate-950 flex items-center gap-3">
              <ShoppingBag className="text-blue-600" /> 我的購物車
            </h1>
            <Link href="/courses" className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors">
              <ArrowLeft size={16} /> 繼續選購課程
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row p-6 gap-6">
                    <div className="w-full sm:w-40 h-28 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                      <img src={item.image_url} className="w-full h-full object-cover" alt={item.title} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-slate-950 text-white border-0 text-[10px] font-black">{item.level || "實戰課"}</Badge>
                          <Badge variant="outline" className="text-[10px] font-bold text-blue-600 border-blue-100">{item.pricing_label}</Badge>
                        </div>
                        <h3 className="text-xl font-black text-slate-950 leading-snug">{item.title}</h3>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-blue-600">NT$ {item.price.toLocaleString()}</span>
                          {item.original_price > item.price && (
                            <span className="text-sm text-slate-400 line-through font-bold">NT$ {item.original_price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all self-start sm:self-center"
                      title="移除項目"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </Card>
              ))}
              
              {items.length === 0 && (
                <div className="py-32 text-center space-y-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
                  <div className="flex justify-center">
                    <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                      <ShoppingBag size={40} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black text-slate-950">購物車目前是空的</p>
                    <p className="text-slate-500">快去挑選適合您的 AI 實戰課程吧！</p>
                  </div>
                  <Button asChild size="lg" className="rounded-full px-8 font-black bg-blue-600 hover:bg-blue-700">
                    <Link href="/courses">瀏覽所有課程</Link>
                  </Button>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div>
                <Card className="border-slate-100 shadow-xl rounded-[2rem] sticky top-24 overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
                    <CardTitle className="text-xl font-black">訂單摘要</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-bold">課程小計 ({items.length} 門)</span>
                        <span className="text-slate-950 font-black">NT$ {totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 font-bold">活動折扣</span>
                        <span className="text-green-600 font-black">- NT$ 0</span>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                      <span className="font-black text-slate-950">應付總計</span>
                      <div className="text-right">
                        <p className="text-3xl font-black text-blue-600">NT$ {totalAmount.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">含稅與所有平台費用</p>
                      </div>
                    </div>

                    <div className="pt-4 space-y-4">
                      <Button className="w-full h-16 rounded-2xl font-black text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 group" asChild>
                        <Link href="/checkout">
                          確認結帳 <ArrowLeft className="ml-2 h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <div className="flex items-center justify-center gap-2 text-slate-400">
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">PayUni 安全支付加密</span>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
