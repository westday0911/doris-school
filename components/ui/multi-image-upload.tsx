"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, X, UploadCloud, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  className?: string;
  bucket?: string;
  folder?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  className,
  bucket = "blog-images",
  folder = "tools"
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      uploadImages(Array.from(files));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadImages(Array.from(files));
    }
  };

  const uploadImages = async (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    if (imageFiles.length === 0) {
      alert("請選擇圖片檔案");
      return;
    }

    setUploading(true);
    const newUrls: string[] = [...value];

    try {
      for (const file of imageFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);
        
        newUrls.push(publicUrl);
      }
      
      onChange(newUrls);
    } catch (error: any) {
      console.error("Error uploading images:", error);
      alert("圖片上傳失敗：" + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    const newUrls = [...value];
    newUrls.splice(index, 1);
    onChange(newUrls);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center p-8 cursor-pointer group",
          isDragging 
            ? "border-blue-500 bg-blue-50/50" 
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <p className="text-sm font-bold text-slate-500">圖片上傳中...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-500 group-hover:scale-110 transition-all shadow-inner">
              <UploadCloud size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                拖移圖片至此 或 <span className="text-blue-600">點擊上傳</span>
              </p>
              <p className="text-xs text-slate-400">支援多張圖片上傳 (JPG, PNG, WEBP)</p>
            </div>
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {value.map((url, index) => (
            <div 
              key={index} 
              className="relative aspect-video rounded-xl border border-slate-200 overflow-hidden group shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

