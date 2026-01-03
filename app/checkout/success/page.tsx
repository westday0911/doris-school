import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 size={48} className="text-green-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-slate-950">付款成功！</h1>
          <p className="text-slate-500">
            感謝您的購買！訂單確認信已寄送至您的電子郵件。您現在可以立即開始您的學習旅程。
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">訂單編號</span>
            <span className="font-mono font-bold text-slate-950">#ORD-2026-001</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">付款時間</span>
            <span className="font-bold text-slate-950">2026-01-03 14:30</span>
          </div>
          <div className="flex justify-between text-sm pt-4 border-t border-slate-200">
            <span className="text-slate-400">實付金額</span>
            <span className="text-xl font-black text-blue-600">NT$ 8,800</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 h-12 rounded-xl font-bold" asChild>
            <Link href="/courses/vibe-coding">立即上課</Link>
          </Button>
          <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" asChild>
            <Link href="/">回首頁</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

