-- 為 courses 資料表新增介紹影片連結欄位
ALTER TABLE courses ADD COLUMN IF NOT EXISTS intro_video_url text;

