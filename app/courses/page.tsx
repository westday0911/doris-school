import { supabase } from "@/lib/supabase";
import CourseListClient from "@/components/course/CourseListClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "精選實戰課程 | Doris AI 學院",
    description: "從基礎思維到實戰開發，我們提供最完整的 AI 課程，包括 Vibe Coding、Prompt Engineering 等，陪你一步步建立不被取代的競爭力。",
  };
}

export default async function CoursesPage() {
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false });

  return <CourseListClient initialCourses={courses || []} />;
}
