-- 1. 新增複數類別欄位 (陣列)
ALTER TABLE articles ADD COLUMN categories text[] DEFAULT '{}';

-- 2. 將舊的單一類別資料轉移過來
UPDATE articles 
SET categories = ARRAY[category] 
WHERE category IS NOT NULL AND categories = '{}';

-- 3. 為陣列欄位建立 GIN 索引，確保篩選效能
CREATE INDEX IF NOT EXISTS idx_articles_categories ON articles USING GIN (categories);

