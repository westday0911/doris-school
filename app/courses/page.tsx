import { supabase } from "@/lib/supabase";
import CourseListClient from "@/components/course/CourseListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "精選實戰課程 | Doris AI學院",
  description: "從基礎思維到實戰開發，我們提供最完整的 AI 課程，包括 Vibe Coding、Prompt Engineering 等，陪你一步步建立不被取代的競爭力。",
};

export default async function CoursesPage() {
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  return <CourseListClient initialCourses={courses || []} />;
}
