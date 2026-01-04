/**
 * Server Component
 */
import { supabase } from "@/lib/supabase";
import { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";

export const metadata: Metadata = {
  title: "首頁 | Doris AI學院 - 把想法變成跑得動的產品",
  description: "專業 AI 實戰教學，提供 Vibe Coding、Prompt Engineering 等尖端科技課程，協助您將想法轉化為產品。",
};

export default async function Home() {
  const { data: courses } = await supabase.from('courses').select('*').limit(3);
  const { data: articles } = await supabase.from('articles').select('*').neq('status', '草稿').order('date', { ascending: false }).limit(3);

  return <HomeClient initialCourses={courses || []} initialArticles={articles || []} />;
}
