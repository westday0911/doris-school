"use client";

import { Button } from "@/components/ui/button";
import { Globe, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

interface ToolActionButtonsProps {
  toolId: string;
  toolUrl?: string;
  downloadUrl?: string;
  slug: string;
}

export function ToolActionButtons({ toolId, toolUrl, downloadUrl, slug }: ToolActionButtonsProps) {
  const [isIncrementing, setIsIncrementing] = useState(false);

  const handleIncrementAccess = async () => {
    if (isIncrementing) return;
    setIsIncrementing(true);
    
    try {
      // 使用 rpc 或直接 update。這裡簡單用 update
      // 注意：這需要 RLS 允許大眾更新 access_count，或者寫一個專門的 RPC
      const { error } = await supabase.rpc('increment_tool_access', { tool_id: toolId });
      
      if (error) {
        console.error("Error incrementing access count:", error);
        // 如果 RPC 不存在，則回退到普通更新 (但通常會被 RLS 擋住)
        // 建議在資料庫增加 RPC
      }
    } catch (err) {
      console.error("Unexpected error incrementing access count:", err);
    } finally {
      setIsIncrementing(false);
    }
  };

  if (toolUrl) {
    return (
      <Button 
        className="w-full h-12 rounded-lg font-black bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 group" 
        onClick={handleIncrementAccess}
        asChild
      >
        <a href={toolUrl} target="_blank" rel="noopener noreferrer">
          前往工具網站
          <Globe className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    );
  }

  if (downloadUrl) {
    return (
      <Button 
        className="w-full h-12 rounded-lg font-black bg-slate-950 hover:bg-slate-900 shadow-lg group" 
        onClick={handleIncrementAccess}
        asChild
      >
        <a href={downloadUrl} download>
          立即下載原始碼
          <Download className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </Button>
    );
  }

  return (
    <Button className="w-full h-12 rounded-lg font-black bg-slate-950 hover:bg-slate-900 shadow-lg group" asChild>
      <Link href="/auth/register">
        立即加入獲取
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Button>
  );
}

