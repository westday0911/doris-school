"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Save, Eye, LayoutGrid, Clock, Award, DollarSign, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TiptapEditor from "@/components/editor/TiptapEditor";

export default function AdminCourseEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    price: 0,
    original_price: 0,
    duration: "",
    level: "入門",
    category: "進階課",
    status: "招生中",
    image_url: "",
  });

  useEffect(() => {
    if (!isNew) {
      fetchCourse();
    }
  }, [params.id]);

  const fetchCourse = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error("Error fetching course:", error);
      alert("載入課程失敗");
      router.push("/admin/courses");
    } else {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        content: data.content || "",
        price: data.price || 0,
        original_price: data.original_price || 0,
        duration: data.duration || "",
        level: data.level || "入門",
        category: data.category || "進階課",
        status: data.status || "招生中",
        image_url: data.image_url || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("請填寫課程名稱與 Slug");
      return;
    }

    setSaving(true);
    let error;

    if (isNew) {
      const { error: insertError } = await supabase
        .from('courses')
        .insert([formData]);
      error = insertError;
    } else {
      const { error: updateError } = await supabase
        .from('courses')
        .update(formData)
        .eq('id', params.id);
      error = updateError;
    }

    if (error) {
      alert("儲存失敗：" + error.message);
    } else {
      alert(isNew ? "課程已建立" : "變更已儲存");
      router.push("/admin/courses");
      router.refresh();
    }
    setSaving(false);
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
          href="/admin/courses" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors"
        >
          <ChevronLeft size={16} /> 返回課程列表
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold" onClick={() => window.open(`/courses/${formData.slug}`, '_blank')}>
            <Eye size={16} /> 預覽
          </Button>
          <Button 
            className="gap-2 font-bold bg-blue-600 hover:bg-blue-700" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
            {isNew ? "建立課程" : "儲存變更"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">基本資訊</h3>
            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">課程名稱</label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="請輸入課程名稱"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Slug (網址路徑)</label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" 
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="例如: vibe-coding-basic"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">短簡介</label>
                <textarea 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 h-24 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm leading-relaxed" 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="顯示在列表頁的簡短介紹"
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">售價與規格</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <DollarSign size={14} /> 原價 (NT$)
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" 
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <DollarSign size={14} className="text-blue-600" /> 優惠價 (NT$)
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-blue-600" 
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Clock size={14} /> 總時數 (小時/文字說明)
                </label>
                <input 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20" 
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="例如: 12 小時"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Award size={14} /> 難度
                </label>
                <select 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500/20"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                >
                  <option>入門</option>
                  <option>中級</option>
                  <option>進階</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">課程內容詳情 (Rich Text)</h3>
            <TiptapEditor 
              content={formData.content} 
              onChange={(content) => setFormData({ ...formData, content })} 
            />
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">課程狀態</label>
              <div className="flex flex-col gap-2">
                {["招生中", "已額滿", "已下架"].map((status) => (
                  <label key={status} className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <input 
                      type="radio" 
                      name="status" 
                      checked={formData.status === status} 
                      onChange={() => setFormData({ ...formData, status })}
                      className="accent-blue-600" 
                    />
                    <span className="text-sm font-medium">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">課程分類</label>
              <select 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>進階課</option>
                <option>效率課</option>
                <option>商業課</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">課程縮圖連結</label>
              <input 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none mb-2" 
                placeholder="https://..." 
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center text-slate-400 relative group cursor-pointer">
                {formData.image_url ? (
                  <img src={formData.image_url} alt="Course Preview" className="w-full h-full object-cover group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <ImageIcon size={24} />
                    <span className="text-xs">無預覽圖片</span>
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
