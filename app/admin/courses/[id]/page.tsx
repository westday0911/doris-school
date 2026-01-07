"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { 
  ChevronLeft, Save, Eye, Clock, Award, 
  DollarSign, Loader2, Image as ImageIcon, Plus, 
  Trash2, ListTree, Code2, Megaphone, GripVertical, PlusCircle,
  FileText, Link as LinkIcon, Youtube, X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { useCallback } from "react";

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
    discount_price: 0,
    original_price: 0,
    duration: "",
    level: "入門",
    categories: [] as string[],
    status: "預購中",
    image_url: "",
    news: "",
    intro_video_url: "",
    custom_code: { html: "", css: "", js: "" },
    pricing_options: [] as any[]
  });

  const [modules, setModules] = useState<any[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [existingCategories, setExistingCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchExistingCategories();
    if (!isNew) {
      fetchCourseData();
    }
  }, [params.id]);

  const fetchExistingCategories = async () => {
    const { data } = await supabase.from('courses').select('categories');
    if (data) {
      const allCats = data.flatMap(item => item.categories || []);
      setExistingCategories(Array.from(new Set(allCats)).filter(Boolean) as string[]);
    }
  };

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      // 1. 抓取課程主表
      const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error("Error fetching course:", error);
        alert("載入課程失敗");
        router.push("/admin/courses");
        return;
      }

      setFormData({
        title: course.title || "",
        slug: course.slug || "",
        description: course.description || "",
        content: course.content || "",
        discount_price: course.discount_price || 0,
        original_price: course.original_price || 0,
        duration: course.duration || "",
        level: course.level || "入門",
        categories: course.categories || (course.tag ? [course.tag] : []),
        status: course.status || "預購中",
        image_url: course.image_url || "",
        news: course.news || "",
        intro_video_url: course.intro_video_url || "",
        custom_code: course.custom_code || { html: "", css: "", js: "" },
        pricing_options: Array.isArray(course.pricing_options) ? course.pricing_options : []
      });

      // 2. 抓取單元與課堂 (依 order_index 排序)
      const { data: modulesData, error: modulesError } = await supabase
        .from('course_modules')
        .select(`
          *,
          lessons:course_lessons(*)
        `)
        .eq('course_id', params.id)
        .order('order_index', { ascending: true });

      if (modulesError) {
        console.error("Error fetching modules:", modulesError);
      } else if (modulesData) {
        // 確保 lessons 也按照 order_index 排序
        const sortedModules = modulesData.map(m => ({
          ...m,
          lessons: (m.lessons || []).sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0))
        }));
        setModules(sortedModules);
      }
    } catch (err: any) {
      console.error("Unexpected error in fetchCourseData:", err);
      alert("載入課程資料失敗，請檢查網路。");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert("請填寫課程名稱與 Slug");
      return;
    }

    if (saving) return;

    setSaving(true);
    
    // 增加一個 20 秒強制結束 Loading 的保護機制
    const forceResetLoading = setTimeout(() => {
      if (saving) {
        setSaving(false);
        console.warn("Save operation forced timeout after 20s");
      }
    }, 20000);

    try {
      // 1. 儲存課程主表
      const submitData = {
        ...formData,
        tag: formData.categories.length > 0 ? formData.categories[0] : ""
      };

      let courseId = params.id;
      if (isNew) {
        const { data, error: insertError } = await supabase
          .from('courses')
          .insert([submitData])
          .select()
          .single();
        if (insertError) throw insertError;
        courseId = data.id;
      } else {
        const { error: updateError } = await supabase
          .from('courses')
          .update(submitData)
          .eq('id', params.id);
        if (updateError) throw updateError;
      }

      // 2. 儲存單元與課堂
      const { error: deleteError } = await supabase
        .from('course_modules')
        .delete()
        .eq('course_id', courseId);
      if (deleteError) throw deleteError;
      
      if (modules.length > 0) {
        const modulesToInsert = modules.map((m, i) => ({
          course_id: courseId,
          title: m.title,
          order_index: i
        }));

        const { data: newModules, error: mError } = await supabase
          .from('course_modules')
          .insert(modulesToInsert)
          .select();

        if (mError) throw mError;

        const lessonsToInsert: any[] = [];
        modules.forEach((m, mIdx) => {
          const createdModule = newModules.find(nm => nm.order_index === mIdx);
          if (createdModule && m.lessons && m.lessons.length > 0) {
            m.lessons.forEach((l: any, lIdx: number) => {
              lessonsToInsert.push({
                course_id: courseId,
                module_id: createdModule.id,
                title: l.title,
                duration: l.duration,
                video_url: l.video_url,
                supplemental_info: l.supplemental_info,
                attachments: l.attachments || [],
                order_index: lIdx
              });
            });
          }
        });

        if (lessonsToInsert.length > 0) {
          const { error: lError } = await supabase
            .from('course_lessons')
            .insert(lessonsToInsert);
          if (lError) throw lError;
        }
      }

      clearTimeout(forceResetLoading);
      setSaving(false);
      
      // 延遲顯示成功訊息
      setTimeout(() => {
        alert(isNew ? "課程建立成功！" : "變更儲存成功！");
        if (isNew) {
          router.push(`/admin/courses/${courseId}`);
        } else {
          router.refresh();
        }
      }, 100);

    } catch (err: any) {
      clearTimeout(forceResetLoading);
      console.error("Save error:", err);
      setSaving(false);
      setTimeout(() => {
        alert("儲存失敗：" + (err.message || "發生未知錯誤，請檢查網路連線或重新整理頁面。"));
      }, 100);
    }
  };

  // --- UI 操作邏輯 ---
  const addModule = () => {
    setModules([...modules, { title: "新單元", lessons: [] }]);
  };

  const updateModuleTitle = (mIdx: number, title: string) => {
    const updated = [...modules];
    updated[mIdx].title = title;
    setModules(updated);
  };

  const removeModule = (mIdx: number) => {
    setModules(modules.filter((_, i) => i !== mIdx));
  };

  const addLesson = (mIdx: number) => {
    const updated = [...modules];
    updated[mIdx].lessons.push({ 
      title: "新課堂", 
      duration: "", 
      video_url: "", 
      supplemental_info: "", 
      attachments: [] 
    });
    setModules(updated);
  };

  const updateLesson = (mIdx: number, lIdx: number, field: string, value: any) => {
    const updated = [...modules];
    updated[mIdx].lessons[lIdx][field] = value;
    setModules(updated);
  };

  const removeLesson = (mIdx: number, lIdx: number) => {
    const updated = [...modules];
    updated[mIdx].lessons = updated[mIdx].lessons.filter((_: any, i: number) => i !== lIdx);
    setModules(updated);
  };

  const addCategory = (cat?: string) => {
    const newCat = cat || categoryInput;
    if (newCat && !formData.categories.includes(newCat)) {
      setFormData({ ...formData, categories: [...formData.categories, newCat] });
      setCategoryInput("");
    }
  };

  const updatePricingOption = (idx: number, field: string, value: any) => {
    const updated = [...formData.pricing_options];
    updated[idx][field] = value;
    setFormData({ ...formData, pricing_options: updated });
  };

  const addPricingOption = () => {
    setFormData({
      ...formData,
      pricing_options: [
        ...formData.pricing_options,
        { label: "", price: 0, original_price: 0, description: "", features: [] }
      ]
    });
  };

  const removePricingOption = (idx: number) => {
    setFormData({
      ...formData,
      pricing_options: formData.pricing_options.filter((_, i) => i !== idx)
    });
  };

  const updatePricingFeature = (pIdx: number, fIdx: number, value: string) => {
    const updated = [...formData.pricing_options];
    if (!updated[pIdx].features) updated[pIdx].features = [];
    updated[pIdx].features[fIdx] = value;
    setFormData({ ...formData, pricing_options: updated });
  };

  const addPricingFeature = (pIdx: number) => {
    const updated = [...formData.pricing_options];
    if (!updated[pIdx].features) updated[pIdx].features = [];
    updated[pIdx].features.push("");
    setFormData({ ...formData, pricing_options: updated });
  };

  const removePricingFeature = (pIdx: number, fIdx: number) => {
    const updated = [...formData.pricing_options];
    updated[pIdx].features = updated[pIdx].features.filter((_: any, i: number) => i !== fIdx);
    setFormData({ ...formData, pricing_options: updated });
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
        <Link href="/admin/courses" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-950 transition-colors">
          <ChevronLeft size={16} /> 返回課程列表
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold" onClick={() => window.open(`/courses/${formData.slug}`, '_blank')}>
            <Eye size={16} /> 預覽
          </Button>
          <Button className="gap-2 font-bold bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
            {isNew ? "建立課程" : "儲存變更"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          {/* 基本資訊 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">課程基本資訊</h3>
            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">課程名稱</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none font-bold" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Slug (網址路徑)</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">課程標語 / 短簡介</label>
                <textarea className="w-full px-4 py-2.5 rounded-lg border border-slate-200 h-20 outline-none text-sm" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
            </div>
          </section>

          {/* 課程大綱 (新介面) */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">課程大綱管理 (章節與小單元)</h3>
              <Button size="sm" variant="outline" className="gap-2" onClick={addModule}><Plus size={14} /> 新增章節</Button>
            </div>
            <div className="space-y-6">
              {modules.map((module, mIdx) => (
                <div key={mIdx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-slate-950">章節 {mIdx + 1}</Badge>
                    <input className="flex-1 bg-transparent border-0 border-b border-slate-200 text-lg font-bold focus:border-blue-600 outline-none" placeholder="章節名稱 (例如：第一章：AI 基礎)" value={module.title} onChange={(e) => updateModuleTitle(mIdx, e.target.value)} />
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-red-500" onClick={() => removeModule(mIdx)}><Trash2 size={16} /></Button>
                  </div>
                  
                  <div className="pl-6 space-y-4">
                    {module.lessons.map((lesson: any, lIdx: number) => (
                      <div key={lIdx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">小單元名稱</label>
                            <input className="w-full px-3 py-2 rounded-lg border border-slate-100 text-sm font-medium outline-none focus:ring-1 focus:ring-blue-500" value={lesson.title} onChange={(e) => updateLesson(mIdx, lIdx, 'title', e.target.value)} />
                          </div>
                          <div className="w-32 space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">時長 (分鐘)</label>
                            <input 
                              type="number"
                              className="w-full px-3 py-2 rounded-lg border border-slate-100 text-sm outline-none" 
                              placeholder="15" 
                              value={lesson.duration} 
                              onChange={(e) => updateLesson(mIdx, lIdx, 'duration', parseInt(e.target.value) || 0)} 
                            />
                          </div>
                          <Button size="icon" variant="ghost" className="mt-6 text-slate-300 hover:text-red-500" onClick={() => removeLesson(mIdx, lIdx)}><Trash2 size={14} /></Button>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Youtube size={10} /> 影片網址 (Vimeo/YT)</label>
                            <input className="w-full px-3 py-2 rounded-lg border border-slate-100 text-xs font-mono outline-none" value={lesson.video_url} onChange={(e) => updateLesson(mIdx, lIdx, 'video_url', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><FileText size={10} /> 補充資訊 / 檔案連結</label>
                            <input className="w-full px-3 py-2 rounded-lg border border-slate-100 text-xs outline-none" placeholder="輸入補充文字或下載網址" value={lesson.supplemental_info} onChange={(e) => updateLesson(mIdx, lIdx, 'supplemental_info', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 text-xs text-blue-600 font-bold hover:text-blue-700" onClick={() => addLesson(mIdx)}><PlusCircle size={14} /> 新增小單元</button>
                  </div>
                </div>
              ))}
              {modules.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">
                  <ListTree className="mx-auto mb-2 opacity-20" size={32} />
                  <p className="text-sm font-medium">尚未新增章節</p>
                </div>
              )}
            </div>
          </section>

          {/* 定價方案 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">定價方案 (多重選項)</h3>
              <Button size="sm" variant="outline" className="gap-2" onClick={addPricingOption}><Plus size={14} /> 新增方案</Button>
            </div>
            <div className="space-y-6">
              {(formData.pricing_options || []).map((opt, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-slate-200 bg-slate-50/30 space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 space-y-4">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase">方案名稱</label>
                          <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold" placeholder="例如：進階入學方案" value={opt.label} onChange={(e) => updatePricingOption(idx, 'label', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase">原價</label>
                          <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="原價" value={opt.original_price} onChange={(e) => updatePricingOption(idx, 'original_price', parseInt(e.target.value) || 0)} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase">優惠價</label>
                          <input type="number" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-blue-600" placeholder="售價" value={opt.price} onChange={(e) => updatePricingOption(idx, 'price', parseInt(e.target.value) || 0)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">方案描述</label>
                        <textarea className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm h-20 outline-none resize-none" placeholder="簡單描述此方案的特點..." value={opt.description} onChange={(e) => updatePricingOption(idx, 'description', e.target.value)} />
                      </div>
                      
                      {/* 方案包含內容 (陣列編輯) */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase flex items-center justify-between">
                          方案包含內容 (逐行顯示)
                          <button onClick={() => addPricingFeature(idx)} className="text-blue-600 hover:text-blue-700 flex items-center gap-1 normal-case">
                            <PlusCircle size={12} /> 新增項目
                          </button>
                        </label>
                        <div className="space-y-2">
                          {(opt.features || []).map((feature: string, fIdx: number) => (
                            <div key={fIdx} className="flex gap-2">
                              <input 
                                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs" 
                                placeholder="項目內容 (例如：專屬 Line 群組)" 
                                value={feature} 
                                onChange={(e) => updatePricingFeature(idx, fIdx, e.target.value)}
                              />
                              <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-300 hover:text-red-500" onClick={() => removePricingFeature(idx, fIdx)}>
                                <X size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="text-slate-400 hover:text-red-500" onClick={() => removePricingOption(idx)}><Trash2 size={16} /></Button>
                  </div>
                </div>
              ))}
              {(!formData.pricing_options || formData.pricing_options.length === 0) && (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 text-slate-400">
                  尚未設定任何定價方案
                </div>
              )}
            </div>
          </section>

          {/* 內容介紹 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4">課程介紹內容 (文字與圖片)</h3>
            <TiptapEditor content={formData.content} onChange={(content) => setFormData({ ...formData, content })} />
          </section>

          {/* 客製化代碼 */}
          <section className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-4 flex items-center gap-2"><Code2 size={18} /> 客製化代碼 (會覆蓋內容介紹)</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">HTML</label>
                <textarea className="w-full p-3 rounded-lg border border-slate-200 bg-slate-950 text-emerald-400 font-mono text-xs h-40" value={formData.custom_code.html} onChange={(e) => setFormData({ ...formData, custom_code: { ...formData.custom_code, html: e.target.value } })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">CSS</label>
                  <textarea className="w-full p-3 rounded-lg border border-slate-200 bg-slate-950 text-blue-400 font-mono text-xs h-32" value={formData.custom_code.css} onChange={(e) => setFormData({ ...formData, custom_code: { ...formData.custom_code, css: e.target.value } })} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">JS</label>
                  <textarea className="w-full p-3 rounded-lg border border-slate-200 bg-slate-950 text-amber-400 font-mono text-xs h-32" value={formData.custom_code.js} onChange={(e) => setFormData({ ...formData, custom_code: { ...formData.custom_code, js: e.target.value } })} />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 側邊欄 */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-6 sticky top-24">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block">課程狀態</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white outline-none" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option>預購中</option>
                <option>已上架</option>
                <option>已額滿</option>
                <option>已下架</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 block flex items-center gap-2"><Megaphone size={14} className="text-orange-500" /> 最新消息</label>
              <textarea className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs h-20 outline-none" value={formData.news} onChange={(e) => setFormData({ ...formData, news: e.target.value })} placeholder="例如：1/20 晚上 8 點加開直播..." />
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">課程介紹影片網址</label>
              <input className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none" value={formData.intro_video_url} onChange={(e) => setFormData({ ...formData, intro_video_url: e.target.value })} placeholder="YouTube 或 Vimeo 連結" />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">課程縮圖</label>
              <ImageUpload 
                value={formData.image_url} 
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                folder="courses"
              />
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">或是輸入圖片網址</label>
                <input 
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs outline-none focus:border-blue-500 transition-colors" 
                  value={formData.image_url} 
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} 
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
