-- Update tools table with new fields
ALTER TABLE tools ADD COLUMN IF NOT EXISTS slug text UNIQUE;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS price integer DEFAULT 0;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS url text;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS download_url text;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE tools ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE tools ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';

-- Update existing tools with slugs if they don't have them
UPDATE tools SET slug = lower(replace(title, ' ', '-')) WHERE slug IS NULL;

