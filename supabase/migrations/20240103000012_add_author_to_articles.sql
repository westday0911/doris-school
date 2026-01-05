-- 1. 為 articles 資料表新增 author_id 欄位，並設定預設值
-- 假設 profiles 表中已經存在該 ID
ALTER TABLE articles ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES public.profiles(id) DEFAULT '22426b60-629b-47f8-9699-ffda7ab50a0d';

-- 2. 更新現有文章，將 author_id 設定為預設 ID (如果原本為空)
UPDATE articles SET author_id = '22426b60-629b-47f8-9699-ffda7ab50a0d' WHERE author_id IS NULL;

