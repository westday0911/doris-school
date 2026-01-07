import { supabase } from "@/lib/supabase";
import { notFound, redirect } from "next/navigation";
import ClassroomClient from "./ClassroomClient";

export default async function CourseLearnPage({ params }: { params: { slug: string } }) {
  // 使用基本 client 獲取使用者 (SSR 模式下若未設定 Auth Helpers 可能無法取得，建議之後安裝 @supabase/ssr)
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?returnTo=/courses/${params.slug}/learn`);
  }

  // 1. Fetch course details
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!course) {
    notFound();
  }

  // 2. Check purchase status
  const { data: purchase } = await supabase
    .from('user_courses')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single();

  if (!purchase) {
    // If not purchased, redirect to detail page
    redirect(`/courses/${params.slug}`);
  }

  // 3. Fetch modules and lessons
  const { data: modules } = await supabase
    .from('course_modules')
    .select(`
      *,
      lessons:course_lessons(*)
    `)
    .eq('course_id', course.id)
    .order('order_index', { ascending: true });

  const sortedModules = (modules || []).map(m => ({
    ...m,
    lessons: (m.lessons || []).sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0))
  }));

  return (
    <ClassroomClient 
      course={course} 
      modules={sortedModules} 
      user={user}
    />
  );
}

