-- Add status column to articles table
ALTER TABLE articles ADD COLUMN IF NOT EXISTS status text DEFAULT '草稿';

-- Optional: Add published_at for better tracking
ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_at timestamp with time zone DEFAULT timezone('utc'::text, now());

