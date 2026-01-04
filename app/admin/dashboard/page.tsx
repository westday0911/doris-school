import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "累積會員", value: "1,248", icon: Users, trend: "+12%", color: "text-blue-600" },
    { title: "活躍學員", value: "856", icon: BookOpen, trend: "+5%", color: "text-indigo-600" },
    { title: "本月訂單", value: "324", icon: ShoppingCart, trend: "+18%", color: "text-emerald-600" },
    { title: "本月營收", value: "NT$ 428,500", icon: DollarSign, trend: "+24%", color: "text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <TrendingUp size={12} className="text-emerald-500" />
                <span className="text-emerald-500 font-medium">{stat.trend}</span> 較上月提升
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">近期訂單</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "王小明", course: "Vibe Coding 系統實戰課", price: "NT$ 8,800", date: "2 分鐘前" },
                { name: "李大同", course: "AI 自動化生產力", price: "NT$ 4,500", date: "15 分鐘前" },
                { name: "張曉華", course: "生成式 AI 商業應用", price: "NT$ 6,900", date: "1 小時前" },
                { name: "趙曉明", course: "Vibe Coding 系統實戰課", price: "NT$ 8,800", date: "3 小時前" },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      {order.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{order.name}</p>
                      <p className="text-xs text-slate-400">{order.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{order.price}</p>
                    <p className="text-[10px] text-slate-400">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Courses */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">熱門課程排行</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: "Vibe Coding 系統實戰課", sales: 156, revenue: "NT$ 1,372,800", progress: 85 },
                { title: "AI 自動化生產力", sales: 98, revenue: "NT$ 441,000", progress: 60 },
                { title: "生成式 AI 商業應用", sales: 72, revenue: "NT$ 496,800", progress: 45 },
              ].map((course, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{course.title}</p>
                      <p className="text-xs text-slate-400">累積銷量: {course.sales} | 營收: {course.revenue}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-600">{course.progress}%</p>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



