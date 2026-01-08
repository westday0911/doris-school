"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notFound, useRouter } from "next/navigation";
import ClassroomClient from "./ClassroomClient";
import { Loader2 } from "lucide-react";

export default function CourseLearnPage({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function initClassroom() {
      // 0. 解碼 Slug
      const decodedSlug = decodeURIComponent(params.slug);
      
      // 1. 獲取使用者 session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push(`/auth/login?redirect=/courses/${params.slug}/learn`);
        return;
      }
      setUser(session.user);

      // 2. 獲取課程資料
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', decodedSlug)
        .maybeSingle();

      if (courseError) {
        console.error("Course fetch error:", courseError);
      }

      if (!courseData) {
        console.error("Course not found for slug:", decodedSlug);
        notFound();
        return;
      }
      setCourse(courseData);

      // 3. 檢查購買狀態
      const { data: purchase, error: purchaseError } = await supabase
        .from('user_courses')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('course_id', courseData.id)
        .maybeSingle();

      if (purchaseError) {
        console.error("Purchase check error:", purchaseError);
      }

      if (!purchase) {
        console.warn("No purchase found for user on this course");
        router.push(`/courses/${decodedSlug}`);
        return;
      }

      // 4. 獲取單元與課堂
      const { data: modulesData } = await supabase
        .from('course_modules')
        .select(`
          *,
          lessons:course_lessons(*)
        `)
        .eq('course_id', courseData.id)
        .order('order_index', { ascending: true });

      const sortedModules = (modulesData || []).map(m => ({
        ...m,
        lessons: (m.lessons || []).sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0))
      }));

      setModules(sortedModules);
      setLoading(false);
    }

    initClassroom();
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white gap-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-slate-400 font-medium">正在準備您的學習空間...</p>
      </div>
    );
  }

  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0" 
      />
      <ClassroomClient 
        course={course} 
        modules={modules} 
        user={user}
      />
    </>
  );
}
