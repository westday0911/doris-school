"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ChevronLeft, Save, Eye, Image as ImageIcon, Loader2, Play, Globe, Download, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminToolEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const router = useRouter();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    type: "小工具",
    status: "上架中",
    image_url: "",
    price: 0,
    url: "",
    download_url: "",
    video_url: "",
    images: [] as string[],
    features: [] as string[]
  });

  const [featureInput, setFeatureInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetchTool();
    }
  }, [params.id]);

  const fetchTool = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      console.error("Error fetching tool:", error);
      alert("載入工具失敗");
      router.push("/admin/tools");
    } else {
      setFormData({
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        content: data.content || "",
        type: data.type || "小工具",
        status: data.status || "上架中",
        image_url: data.image_url || "",
        price: data.price || 0,
        url: data.url || "",
        download_url: data.download_url || "",
        video_url: data.video_url || "",
        images: data.images || [],
        features: data.features || []
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("請填寫名稱與 Slug");
      return;
    }

    setSaving(true);
    
    try {
      // 驗證登入狀態 (使用 getUser 確保 Session 有效)
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("登入已過期，請重新整理頁面並登入。");
      }

      let error;
      if (isNew) {
        const { error: insertError } = await supabase
          .from('tools')
          .insert([formData]);
        error = insertError;
      } else {
        const { error: updateError } = await supabase
          .from('tools')
          .update(formData)
          .eq('id', params.id);
        error = updateError;
      }

      if (error) throw error;

      alert(isNew ? "工具已建立" : "變更已儲存");
      router.push("/admin/tools");
      router.refresh();
    } catch (err: any) {
      console.error("Save error:", err);
      alert("儲存失敗：" + (err.message || "未知錯誤"));
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (featureInput && !formData.features.includes(featureInput)) {
      setFormData({ ...formData, features: [...formData.features, featureInput] });
      setFeatureInput("");
    }
  };

  const removeFeature = (idx: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== idx) });
  };

  const addImageUrl = () => {
    if (imageUrlInput && !formData.images.includes(imageUrlInput)) {
      setFormData({ ...formData, images: [...formData.images, imageUrlInput] });
      setImageUrlInput("");
    }
  };

  const removeImageUrl = (idx: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) });
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
          href="/admin/tools" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors"
        >
          <ChevronLeft size={16} /> 返回工具列表
        </Link>
        <div className="flex items-center gap-3">
          {!isNew && (
            <Button variant="outline" className="gap-2 font-bold" onClick={() => window.open(`/tools/${formData.slug}`, '_blank')}>
              <Eye size={16} /> 預覽
            </Button>
          )}
          <Button 
            className="gap-2 font-bold bg-blue-600 hover:bg-blue-700" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
            {isNew ? "建立工具" : "儲存變更"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">工具名稱</label>
                  <input 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-blue-500/20" 
                    placeholder="請輸入工具名稱..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Slug (網址路徑)</label>
                  <input 
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 font-bold outline-none focus:ring-2 focus:ring-blue-500/20" 
                    placeholder="例如: ai-market-analyzer"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">簡短描述 (Description)</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm h-20 resize-none" 
                  placeholder="請輸入工具簡介..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">詳細介紹 (Content / HTML)</label>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 text-sm min-h-[300px] font-mono leading-relaxed" 
                  placeholder="可以使用 HTML 或純文字..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-slate-900 border-b pb-4">功能特點 (Features)</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, idx) => (
                  <Badge key={idx} variant="muted" className="gap-1 py-1 px-3 rounded-md">
                    <CheckCircle2 size={12} className="text-emerald-600" />
                    {feature}
                    <X size={12} className="ml-1 cursor-pointer hover:text-red-500" onClick={() => removeFeature(idx)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  className="flex-grow px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none" 
                  placeholder="新增功能特點..."
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button variant="outline" size="sm" onClick={addFeature}>新增</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-slate-900 border-b pb-4">多圖展示 (Images)</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                {formData.images.map((url, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg border overflow-hidden group">
                    <img src={url} className="w-full h-full object-cover" alt="Tool preview" />
                    <button 
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImageUrl(idx)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  className="flex-grow px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none" 
                  placeholder="輸入圖片網址..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addImageUrl()}
                />
                <Button variant="outline" size="sm" onClick={addImageUrl}>加入</Button>
              </div>
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">工具類型</label>
                <select 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option>AI Agent</option>
                  <option>小工具</option>
                  <option>網頁版型</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">上架狀態</label>
                <select 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option>上架中</option>
                  <option>已下架</option>
                  <option>開發中</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">費用 (NT$)</label>
                <input 
                  type="number"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none font-bold" 
                  placeholder="0 為免費"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                <Globe size={12} /> 工具連結 (URL)
              </label>
              <input 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none font-mono" 
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                <Download size={12} /> 下載連結 (Download)
              </label>
              <input 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none font-mono" 
                placeholder="https://..."
                value={formData.download_url}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                <Play size={12} /> 展示影片連結 (YouTube/Vimeo)
              </label>
              <input 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none font-mono" 
                placeholder="https://..."
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">主圖 (Thumbnail)</label>
            <ImageUpload 
              value={formData.image_url} 
              onChange={(url) => setFormData({ ...formData, image_url: url })}
              folder="tools"
            />
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">或是輸入圖片網址</label>
              <input 
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none font-mono focus:border-blue-500 transition-colors" 
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
