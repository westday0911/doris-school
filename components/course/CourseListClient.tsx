"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CourseListClient({ initialCourses }: { initialCourses: any[] }) {
  const courses = initialCourses;

  return (
    <div className="relative bg-white min-h-screen">
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="container-base">
          <div className="space-y-4 mb-16 text-center">
            <Badge variant="muted">課程總覽</Badge>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
              開啟你的 <span className="text-blue-600">AI 學習旅程</span>
            </h1>
            <p className="text-slate-500 max-w-[600px] mx-auto text-lg">
              從基礎思維到實戰開發，我們提供最完整的 AI 課程，陪你一步步建立不被取代的競爭力。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col h-full overflow-hidden group hover:shadow-xl transition-all duration-500 border-slate-200 rounded-xl bg-white">
                <Link href={`/courses/${course.slug}`} className="flex flex-col h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-black/80 backdrop-blur-md text-white border-0 text-[10px] px-2 py-0">
                        {course.tag}
                      </Badge>
                      <Badge variant="muted" className="bg-white/90 backdrop-blur-md text-slate-900 border-0 text-[10px] px-2 py-0">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-5 space-y-3">
                    <div className="flex items-center text-[11px] font-medium text-slate-400">
                      <span>{course.duration}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-950 leading-tight group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-5 pb-6 mt-auto">
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 line-through leading-none mb-1">NT$ {course.original_price?.toLocaleString()}</span>
                        <span className="text-2xl font-bold text-slate-950 leading-none">NT$ {course.discount_price?.toLocaleString()}</span>
                      </div>
                      <Button size="sm" variant="default" className="rounded-lg h-9 text-xs">
                        立即查看
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

