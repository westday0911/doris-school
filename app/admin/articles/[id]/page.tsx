"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Save, Eye, Image as ImageIcon, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TiptapEditor from "@/components/editor/TiptapEditor";

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
    categories: [] as string[],
    status: "草稿",
    image: "",
    tags: [] as string[]
  });

  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [existingCategories, setExistingCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchExistingCategories();
    if (!isNew) {
      fetchArticle();
    }
  }, [params.id]);

  const fetchExistingCategories = async () => {
    const { data } = await supabase.from('articles').select('categories');
    if (data) {
      const allCats = data.flatMap(item => item.categories || []);
      const uniqueCats = Array.from(new Set(allCats)).filter(Boolean);
      setExistingCategories(uniqueCats as string[]);
    }
  };

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
        categories: data.categories || (data.category ? [data.category] : []),
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
    
    // 確保只傳送資料庫有的欄位，避免 schema 衝突
    const { ...submitData } = formData;
    
    // 為了相容性，也更新舊的單一類別欄位 (取第一個類別)
    const category = formData.categories.length > 0 ? formData.categories[0] : null;
    
    console.log("正在儲存文章 ID:", params.id);
    console.log("提交資料:", { ...submitData, category });

    let error;
    let resultData;

    if (isNew) {
      const { data, error: insertError } = await supabase
        .from('articles')
        .insert([{
          ...submitData,
          category,
          date: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString()
        }])
        .select();
      error = insertError;
      resultData = data;
    } else {
      const { data, error: updateError } = await supabase
        .from('articles')
        .update({
          ...submitData,
          category,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
        .select();
      error = updateError;
      resultData = data;
    }

    if (error) {
      console.error("Supabase Error:", error);
      alert("儲存失敗：" + error.message);
    } else if (!resultData || resultData.length === 0) {
      // 這是最關鍵的檢查：如果回傳資料為空，代表根本沒更新到
      console.warn("No rows updated. Check if the ID is correct.");
      alert("儲存失敗：找不到對應的文章紀錄，請嘗試重新整理頁面。");
    } else {
      console.log("儲存成功，回傳資料:", resultData);
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

  const addCategory = (cat?: string) => {
    const newCat = cat || categoryInput;
    if (newCat && !formData.categories.includes(newCat)) {
      setFormData({ ...formData, categories: [...formData.categories, newCat] });
      setCategoryInput("");
    }
  };

  const removeCategory = (catToRemove: string) => {
    setFormData({ ...formData, categories: formData.categories.filter(c => c !== catToRemove) });
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
                <span>Rich Text Editor</span>
              </div>
            </div>
            <TiptapEditor 
              content={formData.content} 
              onChange={(content) => setFormData({ ...formData, content })} 
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
              <label className="text-sm font-bold text-slate-700 block">文章類別 (Categories)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.categories.map(cat => (
                  <Badge key={cat} className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none gap-1">
                    {cat} <span className="cursor-pointer hover:text-red-500" onClick={() => removeCategory(cat)}>×</span>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:ring-1 focus:ring-blue-500" 
                  placeholder="新增類別..." 
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                />
                <Button size="sm" variant="outline" onClick={() => addCategory()}>新增</Button>
              </div>
              {existingCategories.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">常用類別</p>
                  <div className="flex flex-wrap gap-1.5">
                    {existingCategories
                      .filter(cat => !formData.categories.includes(cat))
                      .slice(0, 10)
                      .map(cat => (
                        <button
                          key={cat}
                          onClick={() => addCategory(cat)}
                          className="text-[10px] px-2 py-1 rounded bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors border border-slate-200"
                        >
                          + {cat}
                        </button>
                      ))}
                  </div>
                </div>
              )}
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
