"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Save, Eye, Image as ImageIcon, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminArticleEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "AI 實戰",
    status: "草稿",
    image: "",
    tags: [] as string[]
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetchArticle();
    }
  }, [params.id]);

  const fetchArticle = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error("Error fetching article:", error);
      alert("載入文章失敗");
      router.push("/admin/articles");
    } else {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        category: data.category || "AI 實戰",
        status: data.status || "草稿",
        image: data.image || "",
        tags: data.tags || []
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("請填寫標題與 Slug");
      return;
    }

    setSaving(true);
    
    const articleData = {
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };

    let error;
    if (isNew) {
      const { error: insertError } = await supabase
        .from('articles')
        .insert([articleData]);
      error = insertError;
    } else {
      const { error: updateError } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', params.id);
      error = updateError;
    }

    if (error) {
      alert("儲存失敗：" + error.message);
    } else {
      alert(isNew ? "文章已建立" : "變更已儲存");
      router.push("/admin/articles");
      router.refresh();
    }
    setSaving(false);
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40 text-slate-400">
        <Loader2 className="animate-spin mr-2" /> 載入中...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/articles" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors"
        >
          <ChevronLeft size={16} /> 返回文章列表
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold" onClick={() => window.open(`/blog/${formData.slug}`, '_blank')}>
            <Eye size={16} /> 預覽
          </Button>
          <Button 
            className="gap-2 font-bold bg-blue-600 hover:bg-blue-700" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
            {isNew ? "建立文章" : "儲存變更"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">文章標題</label>
              <input 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500/20" 
                placeholder="請輸入文章標題..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Slug (網址路徑)</label>
              <input 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500/20" 
                placeholder="例如: how-to-use-ai"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">文章摘要 (Excerpt)</label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm h-24 resize-none" 
              placeholder="請輸入文章簡介..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">內容編輯</label>
              <div className="flex gap-2 text-xs text-slate-400">
                <span>Markdown 支援</span>
              </div>
            </div>
            <textarea 
              className="w-full px-4 py-4 rounded-xl border border-slate-200 min-h-[500px] outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-sm leading-relaxed" 
              placeholder="開始撰寫您的內容..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">文章狀態</label>
              <select 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>草稿</option>
                <option>已發佈</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">文章分類</label>
              <select 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>AI 實戰</option>
                <option>趨勢分析</option>
                <option>技術分享</option>
                <option>專欄文章</option>
                <option>實戰教學</option>
                <option>技術趨勢</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">標籤 (Tags)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="muted" className="gap-1">
                    {tag} <span className="cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)}>×</span>
                  </Badge>
                ))}
              </div>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm outline-none" 
                  placeholder="新增標籤並按回車..." 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">封面圖片連結</label>
              <input 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none" 
                placeholder="https://..." 
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <div className="aspect-video bg-slate-50 rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-300 flex flex-col items-center gap-1">
                    <ImageIcon size={20} />
                    <span className="text-[10px]">預覽圖片</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
