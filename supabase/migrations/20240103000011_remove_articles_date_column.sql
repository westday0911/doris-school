-- 1. 將現有的 date 欄位資料遷移到 published_at (如果 published_at 為空)
UPDATE articles 
SET published_at = date::timestamp with time zone 
WHERE published_at IS NULL AND date IS NOT NULL;

-- 2. 移除 articles 資料表的 date 欄位
ALTER TABLE articles DROP COLUMN IF EXISTS date;

