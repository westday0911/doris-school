"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2, RefreshCw, Check } from "lucide-react";

interface MediaLibraryProps {
  onSelect: (url: string) => void;
}

export default function MediaLibrary({ onSelect }: MediaLibraryProps) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .list('articles', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) throw error;

      const imageUrls = data.map((file) => {
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(`articles/${file.name}`);
        return { name: file.name, url: publicUrl, ...file };
      });

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="從媒體庫選擇">
          <ImageIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>媒體庫</DialogTitle>
          <Button variant="outline" size="sm" onClick={fetchImages} disabled={loading}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto min-h-[400px] p-1">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
              <ImageIcon size={48} className="opacity-20" />
              <p>媒體庫中尚無圖片</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((img) => (
                <div 
                  key={img.url} 
                  className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-blue-500 transition-all"
                  onClick={() => {
                    onSelect(img.url);
                    setOpen(false);
                  }}
                >
                  <img src={img.url} className="w-full h-full object-cover" alt={img.name} />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 flex items-center justify-center transition-all">
                    <Check className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

