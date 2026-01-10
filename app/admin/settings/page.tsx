"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Loader2, 
  Megaphone, 
  Link as LinkIcon, 
  Layout, 
  Type, 
  Image as ImageIcon,
  Palette
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [blogAd, setBlogAd] = useState({
    badge: "HOT COURSE",
    title: "",
    description: "",
    button_text: "立即搶位",
    link: "",
    image_url: "",
    bg_color: "slate-950"
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('site_configs')
      .select('*')
      .eq('key', 'blog_sidebar_ad')
      .maybeSingle();

    if (data && data.value) {
      setBlogAd({ ...blogAd, ...data.value });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('site_configs')
      .upsert({
        key: 'blog_sidebar_ad',
        value: blogAd,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (error) {
      alert("儲存失敗：" + error.message);
    } else {
      alert("網站設定已更新");
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
        <h2 className="text-2xl font-black text-slate-900">網站全域設定</h2>
        <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
          儲存設定
        </Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-8">
          {/* 部落格廣告設定 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <Megaphone size={20} />
              </div>
              <h3 className="font-bold text-slate-900">部落格側邊欄廣告</h3>
            </div>

            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Type size={14} className="text-slate-400" /> 標籤文字 (Badge)
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" 
                    value={blogAd.badge} 
                    onChange={(e) => setBlogAd({ ...blogAd, badge: e.target.value })} 
                    placeholder="例如：HOT COURSE"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Palette size={14} className="text-slate-400" /> 背景顏色 (Tailwind Class)
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" 
                    value={blogAd.bg_color} 
                    onChange={(e) => setBlogAd({ ...blogAd, bg_color: e.target.value })} 
                    placeholder="例如：slate-950, blue-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Layout size={14} className="text-slate-400" /> 廣告標題
                </label>
                <textarea 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 h-24 outline-none focus:border-blue-600 transition-colors resize-none" 
                  value={blogAd.title} 
                  onChange={(e) => setBlogAd({ ...blogAd, title: e.target.value })} 
                  placeholder="支援換行，例如：Vibe Coding\n系統實戰課"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">廣告描述</label>
                <textarea 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 h-24 outline-none focus:border-blue-600 transition-colors resize-none" 
                  value={blogAd.description} 
                  onChange={(e) => setBlogAd({ ...blogAd, description: e.target.value })} 
                  placeholder="簡短吸引人的描述..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Type size={14} className="text-slate-400" /> 按鈕文字
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" 
                    value={blogAd.button_text} 
                    onChange={(e) => setBlogAd({ ...blogAd, button_text: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <LinkIcon size={14} className="text-slate-400" /> 連結 URL
                  </label>
                  <input 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" 
                    value={blogAd.link} 
                    onChange={(e) => setBlogAd({ ...blogAd, link: e.target.value })} 
                    placeholder="/courses/..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <ImageIcon size={14} className="text-slate-400" /> 圖片網址 (選填，目前主要為背景樣式)
                </label>
                <input 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-600 transition-colors" 
                  value={blogAd.image_url} 
                  onChange={(e) => setBlogAd({ ...blogAd, image_url: e.target.value })} 
                  placeholder="https://..."
                />
              </div>
            </div>
          </section>
        </div>

        {/* 預覽 */}
        <div className="space-y-6">
          <div className="sticky top-24">
            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 pl-1">即時預覽</h5>
            <div className={`relative rounded-xl p-6 overflow-hidden group border border-slate-800 bg-${blogAd.bg_color}`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-4 text-left">
                {blogAd.badge && (
                  <Badge className="bg-blue-600 border-0 text-[10px] rounded-sm font-bold">{blogAd.badge}</Badge>
                )}
                <h3 className="text-lg font-bold text-white leading-tight whitespace-pre-line">
                  {blogAd.title || "廣告標題預覽"}
                </h3>
                <div 
                  className="text-slate-400 text-xs leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogAd.description || "廣告描述預覽內容..." }}
                />
                <Button className="w-full bg-white text-slate-950 hover:bg-blue-50 text-xs font-black rounded-md">
                  {blogAd.button_text}
                </Button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">
              * 預覽樣式僅供參考，實際效果以部落格頁面為準
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
