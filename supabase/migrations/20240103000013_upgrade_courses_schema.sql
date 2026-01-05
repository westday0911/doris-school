-- 1. 調整課程類別為陣列並遷移舊資料
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'courses' AND column_name = 'categories') THEN
        ALTER TABLE courses ADD COLUMN categories text[] DEFAULT '{}';
        -- 遷移舊的單一類別資料
        UPDATE courses SET categories = ARRAY[tag] WHERE tag IS NOT NULL AND categories = '{}';
    END IF;
END $$;

-- 2. 新增最新消息、客製化代碼、多重定價選項
ALTER TABLE courses ADD COLUMN IF NOT EXISTS news text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS custom_code jsonb DEFAULT '{"html": "", "css": "", "js": ""}'::jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS pricing_options jsonb DEFAULT '[]'::jsonb;

-- 3. 確保單元結構 (syllabus) 欄位存在 (之前已有的話會跳過)
ALTER TABLE courses ADD COLUMN IF NOT EXISTS syllabus jsonb DEFAULT '[]'::jsonb;

-- 4. 增加狀態檢查約束 (預購中、已上架、已額滿、已下架)
-- 先移除舊的可能存在的約束
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_status_check;
ALTER TABLE courses ADD CONSTRAINT courses_status_check CHECK (status IN ('預購中', '已上架', '已額滿', '已下架', '招生中'));

