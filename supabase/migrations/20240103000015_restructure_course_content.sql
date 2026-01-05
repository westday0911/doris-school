-- 1. 建立課程單元表 (Modules)
CREATE TABLE IF NOT EXISTS public.course_modules (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 建立課堂表 (Lessons)
CREATE TABLE IF NOT EXISTS public.course_lessons (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id uuid REFERENCES public.course_modules(id) ON DELETE CASCADE NOT NULL,
    course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL, -- 冗餘儲存方便查詢
    title text NOT NULL,
    duration text, -- 課堂長度
    video_url text, -- 影片網址 (Vimeo/YouTube)
    supplemental_info text, -- 補充課程資訊
    attachments jsonb DEFAULT '[]'::jsonb, -- 附件檔案 [{name: "", url: ""}]
    order_index integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. 開啟 RLS 權限
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;

-- 4. 設定權限政策
CREATE POLICY "Allow public read for modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Allow public read for lessons" ON public.course_lessons FOR SELECT USING (true);
CREATE POLICY "Admin full access on modules" ON public.course_modules FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admin full access on lessons" ON public.course_lessons FOR ALL TO authenticated USING (public.is_admin());

-- 5. 修正 profiles 的 RLS，確保 auth.uid() 能讀取自己的資料（避免後台死鎖）
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
    ) THEN
        CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
    END IF;
END $$;

