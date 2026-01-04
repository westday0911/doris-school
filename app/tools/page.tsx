import { supabase } from "@/lib/supabase";
import ToolListClient from "@/components/tool/ToolListClient";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI 工具庫 | Doris AI學院",
    description: "我們開發了一系列 AI Agent、小工具與網頁模板，協助你將 AI 思維落實到日常工作中，提升開發與辦公效率。",
  };
}

export default async function ToolsPage() {
  const { data: tools } = await supabase
    .from('tools')
    .select('*')
    .order('created_at', { ascending: false });

  return <ToolListClient initialTools={tools || []} />;
}
