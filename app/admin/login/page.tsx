import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <span className="text-2xl font-black tracking-tight text-white">Doris AI <span className="text-blue-500">Admin</span></span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border-slate-800 bg-slate-900 shadow-2xl text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">後台管理登入</CardTitle>
            <CardDescription className="text-center text-slate-400">
              請輸入管理員憑證以繼續
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="email">
                管理員帳號
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@doris-ai.com"
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="password">
                密碼
              </label>
              <input
                id="password"
                type="password"
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button className="w-full h-11 font-bold bg-blue-600 hover:bg-blue-700 mt-2" asChild>
              <Link href="/admin/dashboard">進入管理系統</Link>
            </Button>
            <div className="text-center mt-4">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                返回前台首頁
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


