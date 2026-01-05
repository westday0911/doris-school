"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';
import Dropcursor from '@tiptap/extension-dropcursor';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Youtube as YoutubeIcon,
  Upload,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRef, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import MediaLibrary from '@/components/media/MediaLibrary';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('輸入連結 URL');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  const addYoutubeVideo = () => {
    const url = window.prompt('輸入 YouTube 影片網址');
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('請上傳圖片檔案');
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      editor.chain().focus().setImage({ src: publicUrl }).run();
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('圖片上傳失敗：' + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const insertImageByUrl = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="border-b border-slate-200 p-2 flex flex-wrap gap-1 bg-slate-50 sticky top-0 z-10 rounded-t-lg">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileUpload}
      />
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(editor.isActive('bold') && 'bg-slate-200')}
        title="粗體"
      >
        <Bold size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(editor.isActive('italic') && 'bg-slate-200')}
        title="斜體"
      >
        <Italic size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(editor.isActive('underline') && 'bg-slate-200')}
        title="底線"
      >
        <UnderlineIcon size={16} />
      </Button>
      <div className="w-[1px] h-6 bg-slate-200 mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(editor.isActive('heading', { level: 1 }) && 'bg-slate-200')}
        title="標題 1"
      >
        <Heading1 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(editor.isActive('heading', { level: 2 }) && 'bg-slate-200')}
        title="標題 2"
      >
        <Heading2 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(editor.isActive('heading', { level: 3 }) && 'bg-slate-200')}
        title="標題 3"
      >
        <Heading3 size={16} />
      </Button>
      <div className="w-[1px] h-6 bg-slate-200 mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive('bulletList') && 'bg-slate-200')}
        title="無序清單"
      >
        <List size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive('orderedList') && 'bg-slate-200')}
        title="有序清單"
      >
        <ListOrdered size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive('blockquote') && 'bg-slate-200')}
        title="引用"
      >
        <Quote size={16} />
      </Button>
      <div className="w-[1px] h-6 bg-slate-200 mx-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addLink}
        className={cn(editor.isActive('link') && 'bg-slate-200')}
        title="插入連結"
      >
        <LinkIcon size={16} />
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        title="上傳圖片"
      >
        {uploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
      </Button>
      
      <MediaLibrary onSelect={insertImageByUrl} />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addYoutubeVideo}
        title="嵌入 YouTube 影片"
      >
        <YoutubeIcon size={16} />
      </Button>

      <div className="flex-1" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        title="還原"
      >
        <Undo size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        title="重做"
      >
        <Redo size={16} />
      </Button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
  const extensions = useMemo(() => [
    StarterKit.configure({
      dropcursor: {
        color: '#3b82f6',
        width: 2,
      },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-600 underline cursor-pointer',
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-lg max-w-full h-auto shadow-md my-4 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all',
      },
    }),
    Youtube.configure({
      controls: true,
      nocookie: true,
      HTMLAttributes: {
        class: 'aspect-video w-full rounded-lg shadow-md my-4',
      },
    }),
    Placeholder.configure({
      placeholder: placeholder || '開始撰寫您的內容...',
    }),
  ], [placeholder]);

  const editor = useEditor({
    extensions,
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[300px] p-4 bg-white rounded-b-lg',
      },
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            uploadDroppedFile(file, view, event);
            return true;
          }
        }
        return false;
      },
    },
  });

  const uploadDroppedFile = async (file: File, view: any, event: DragEvent) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      const { schema } = view.state;
      const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
      
      if (coordinates) {
        const node = schema.nodes.image.create({ src: publicUrl });
        const transaction = view.state.tr.insert(coordinates.pos, node);
        view.dispatch(transaction);
      } else {
        const node = schema.nodes.image.create({ src: publicUrl });
        const transaction = view.state.tr.insert(view.state.selection.from, node);
        view.dispatch(transaction);
      }
    } catch (error) {
      console.error('Drop upload error:', error);
    }
  };

  return (
    <div className="border border-slate-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
