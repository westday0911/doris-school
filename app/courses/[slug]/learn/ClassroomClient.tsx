"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  PlayCircle, 
  FileText, 
  Download, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  duration: number;
  video_url: string;
  supplemental_info?: string;
  attachments?: any[];
  order_index: number;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  order_index: number;
}

export default function ClassroomClient({ course, modules, user }: { course: any, modules: Module[], user: any }) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  // Initialize with first lesson
  useEffect(() => {
    if (modules.length > 0 && modules[0].lessons.length > 0) {
      setActiveLesson(modules[0].lessons[0]);
      setExpandedModules([modules[0].id]);
    }
  }, [modules]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const renderVideo = (url: string) => {
    if (!url) return (
      <div className="aspect-video w-full bg-slate-900 flex flex-col items-center justify-center text-slate-500 rounded-2xl border border-slate-800">
        <PlayCircle size={64} className="mb-4 opacity-20" />
        <p className="font-bold">此單元暫無影片內容</p>
      </div>
    );

    let embedUrl = "";
    let isDirectVideo = false;
    
    try {
      const cleanUrl = url.trim();
      if (cleanUrl.startsWith('<iframe')) {
        const srcMatch = cleanUrl.match(/src=["'](.*?)["']/);
        if (srcMatch && srcMatch[1]) {
          return (
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
              <iframe src={srcMatch[1]} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
            </div>
          );
        }
      }
      
      if (cleanUrl.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
        isDirectVideo = true;
        embedUrl = cleanUrl;
      }
      else if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
        let id = "";
        if (cleanUrl.includes("v=")) id = cleanUrl.split("v=")[1].split("&")[0];
        else if (cleanUrl.includes("shorts/")) id = cleanUrl.split("shorts/")[1].split("?")[0];
        else if (cleanUrl.includes("youtu.be/")) id = cleanUrl.split("youtu.be/")[1].split("?")[0];
        else id = cleanUrl.split("/").pop()?.split("?")[0] || "";
        if (id) embedUrl = `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1`;
      } 
      else if (cleanUrl.includes("vimeo.com")) {
        const id = cleanUrl.split("/").pop()?.split("?")[0];
        if (id) embedUrl = `https://player.vimeo.com/video/${id}?autoplay=1`;
      }
    } catch (e) { console.error(e); }

    if (!embedUrl && !isDirectVideo) return null;

    return (
      <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
        {isDirectVideo ? (
          <video src={embedUrl} controls className="w-full h-full" controlsList="nodownload" autoPlay />
        ) : (
          <iframe src={embedUrl} className="w-full h-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
        )}
      </div>
    );
  };

  // Find next/prev lessons
  const allLessons = modules.flatMap(m => m.lessons);
  const currentIndex = activeLesson ? allLessons.findIndex(l => l.id === activeLesson.id) : -1;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      {/* 頂部導覽列 */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href={`/courses/${course.slug}`} className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black line-clamp-1">{course.title}</h1>
            <p className="text-[10px] text-slate-500 font-bold">{activeLesson?.title || '載入中...'}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-400 hover:text-white lg:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <div className="h-8 w-px bg-slate-800 mx-2 hidden sm:block" />
          <Link href="/member/dashboard">
            <Button variant="outline" size="sm" className="border-slate-700 hover:bg-slate-800 rounded-full text-xs font-bold">
              返回會員中心
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 左側：主播放區與內容 */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950">
          <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8">
            {/* 影片播放器 */}
            <div className="w-full">
              {activeLesson ? renderVideo(activeLesson.video_url) : (
                <div className="aspect-video w-full bg-slate-900 animate-pulse rounded-2xl" />
              )}
            </div>

            {/* 單元標題與操作 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600/10 text-blue-400 border-blue-500/20 text-[10px] font-black uppercase tracking-widest">
                    正在觀看
                  </Badge>
                  {activeLesson?.duration && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                      <Clock size={10} /> {activeLesson.duration} 分鐘
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-black text-white">{activeLesson?.title}</h2>
              </div>
              
              <div className="flex items-center gap-3">
                {prevLesson && (
                  <Button 
                    variant="outline" 
                    className="border-slate-800 hover:bg-slate-900 font-bold text-xs rounded-xl"
                    onClick={() => setActiveLesson(prevLesson)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> 上一單元
                  </Button>
                )}
                {nextLesson && (
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 font-bold text-xs rounded-xl"
                    onClick={() => setActiveLesson(nextLesson)}
                  >
                    下一單元 <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* 課程講義與詳細內容 */}
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <section className="space-y-4">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <FileText className="text-blue-500" size={20} /> 單元說明
                  </h3>
                  <div className="bg-slate-900/30 rounded-2xl p-6 border border-slate-800 text-slate-400 text-sm leading-relaxed prose prose-invert max-w-none">
                    {activeLesson?.supplemental_info ? (
                      <div dangerouslySetInnerHTML={{ __html: activeLesson.supplemental_info }} />
                    ) : (
                      <p>本單元目前沒有額外的文字說明。</p>
                    )}
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Download className="text-emerald-500" size={20} /> 下載教材
                  </h3>
                  <div className="space-y-3">
                    {activeLesson?.attachments && activeLesson.attachments.length > 0 ? (
                      activeLesson.attachments.map((file: any, idx: number) => (
                        <a 
                          key={idx}
                          href={file.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                              <FileText size={16} />
                            </div>
                            <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                              {file.name || '課程講義檔案'}
                            </span>
                          </div>
                          <Download size={14} className="text-slate-500 group-hover:text-emerald-500" />
                        </a>
                      ))
                    ) : (
                      <div className="p-8 text-center bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
                        <p className="text-xs text-slate-600 font-bold">本單元暫無可下載檔案</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        {/* 右側：課程大綱 Sidebar */}
        <aside className={cn(
          "w-80 border-l border-slate-800 bg-slate-900 flex flex-col transition-all duration-300 fixed lg:relative inset-y-0 right-0 z-40 lg:z-0 translate-x-full lg:translate-x-0",
          isSidebarOpen && "translate-x-0"
        )}>
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Menu size={16} className="text-blue-500" /> 課程內容
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {modules.map((module, mIdx) => (
              <div key={module.id} className="border-b border-slate-800 last:border-0">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Chapter {mIdx + 1}</p>
                    <p className="text-xs font-bold text-slate-200 line-clamp-1">{module.title}</p>
                  </div>
                  {expandedModules.includes(module.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {expandedModules.includes(module.id) && (
                  <div className="bg-slate-950/50">
                    {module.lessons.map((lesson, lIdx) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 text-left transition-all hover:bg-slate-800",
                          activeLesson?.id === lesson.id ? "bg-blue-600/10 border-l-4 border-blue-600" : "pl-5"
                        )}
                      >
                        <div className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0",
                          activeLesson?.id === lesson.id ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-500"
                        )}>
                          {activeLesson?.id === lesson.id ? <PlayCircle size={14} /> : <span className="text-[10px] font-bold">{lIdx + 1}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-xs font-bold line-clamp-2",
                            activeLesson?.id === lesson.id ? "text-white" : "text-slate-400"
                          )}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {lesson.duration > 0 && (
                              <span className="text-[10px] text-slate-600 font-bold">{lesson.duration} 分鐘</span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

