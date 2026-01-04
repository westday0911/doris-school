import { supabase } from "@/lib/supabase";
import HomeClient from "@/components/home/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "首頁 | Doris AI學院 - 把想法變成跑得動的產品",
  description: "專業 AI 實戰教學，提供 Vibe Coding、Prompt Engineering 等尖端科技課程，協助您將想法轉化為產品。",
};

export default async function Home() {
  const [coursesRes, articlesRes] = await Promise.all([
    supabase.from('courses').select('*').limit(3),
    supabase.from('articles').select('*').neq('status', '草稿').order('date', { ascending: false }).limit(3)
  ]);

  const courses = coursesRes.data || [];
  const articles = articlesRes.data || [];

  return <HomeClient initialCourses={courses} initialArticles={articles} />;
}
