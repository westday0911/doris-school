"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, X, UploadCloud, FileArchive, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  bucket?: string;
  folder?: string;
  accept?: string;
  label?: string;
}

export function FileUpload({
  value,
  onChange,
  className,
  bucket = "ai-tools",
  folder = "templates",
  accept = ".zip,.rar,.7z",
  label = "壓縮檔 (ZIP, RAR)"
}: FileUploadProps) {
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
      uploadFile(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
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

      onChange(publicUrl);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      alert("檔案上傳失敗：" + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFile = () => {
    onChange("");
  };

  return (
    <div className={cn("space-y-3", className)}>
      {!value ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center p-6 cursor-pointer group min-h-[120px]",
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
            accept={accept}
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="animate-spin text-blue-600" size={24} />
              <p className="text-xs font-bold text-slate-500">檔案上傳中...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-500 transition-all">
                <UploadCloud size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">
                  拖移或點擊上傳 {label}
                </p>
                <p className="text-[10px] text-slate-400">支援 {accept}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 group animate-in fade-in slide-in-from-top-1">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <FileArchive size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">
              已上傳檔案
            </p>
            <p className="text-[10px] text-slate-400 truncate max-w-[200px]">
              {value}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 hover:bg-white rounded-md text-slate-400 hover:text-blue-600 transition-all"
            >
              <ExternalLink size={14} />
            </a>
            <button
              type="button"
              onClick={removeFile}
              className="p-1.5 hover:bg-white rounded-md text-slate-400 hover:text-red-500 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

