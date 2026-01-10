-- 1. Add viewing_method to courses table
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS viewing_method text DEFAULT '無限觀看';

-- 2. Create site_configs table for general site settings (like blog ads)
CREATE TABLE IF NOT EXISTS public.site_configs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    key text UNIQUE NOT NULL,
    value jsonb DEFAULT '{}'::jsonb NOT NULL,
    description text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_configs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read for site_configs" ON public.site_configs FOR SELECT USING (true);
CREATE POLICY "Admin full access on site_configs" ON public.site_configs FOR ALL TO authenticated USING (public.is_admin());

-- Insert default blog ad config
INSERT INTO public.site_configs (key, value, description)
VALUES (
    'blog_sidebar_ad',
    '{
        "badge": "HOT COURSE",
        "title": "Vibe Coding\n系統實戰課",
        "description": "掌握 2025 最強開發範式，將想法瞬間轉化為高品質產品。",
        "button_text": "立即搶位",
        "link": "/courses/vibe-coding",
        "image_url": "",
        "bg_color": "slate-950"
    }'::jsonb,
    '部落格側邊欄廣告內容'
) ON CONFLICT (key) DO NOTHING;
