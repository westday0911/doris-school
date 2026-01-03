-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  tag text,
  level text,
  duration text,
  original_price integer,
  discount_price integer,
  image_url text,
  status text DEFAULT '招生中',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Course Policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Allow public read for courses" ON courses FOR SELECT USING (true);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;


