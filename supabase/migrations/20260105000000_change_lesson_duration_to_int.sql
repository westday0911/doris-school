-- 1. 先建立一個暫時的欄位來存轉換後的數字
ALTER TABLE public.course_lessons ADD COLUMN duration_int integer DEFAULT 0;

-- 2. 將現有的文字資料轉換為分鐘數
-- 邏輯：如果是 '15:30' -> 15 分鐘；如果只是 '15' -> 15 分鐘
UPDATE public.course_lessons 
SET duration_int = (
    CASE 
        WHEN duration ~ '^[0-9]+:[0-9]+$' THEN split_part(duration, ':', 1)::integer
        WHEN duration ~ '^[0-9]+:[0-9]+:[0-9]+$' THEN (split_part(duration, ':', 1)::integer * 60) + split_part(duration, ':', 2)::integer
        WHEN duration ~ '^[0-9]+$' THEN duration::integer
        ELSE 0
    END
);

-- 3. 刪除舊欄位並重新命名新欄位
ALTER TABLE public.course_lessons DROP COLUMN duration;
ALTER TABLE public.course_lessons RENAME COLUMN duration_int TO duration;

-- 4. 加上說明註釋
COMMENT ON COLUMN public.course_lessons.duration IS '課堂長度 (單位：分鐘)';

