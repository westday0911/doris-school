-- 1. Create the 'blog-images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Policy: Allow public read access to all files in the 'blog-images' bucket
DO $$ BEGIN
  CREATE POLICY "Public Access Blog Images"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'blog-images' );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. Policy: Allow authenticated admins to upload files to the 'blog-images' bucket
DO $$ BEGIN
  CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' 
    AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 4. Policy: Allow admins to delete blog images
DO $$ BEGIN
  CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images'
    AND (
      EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

