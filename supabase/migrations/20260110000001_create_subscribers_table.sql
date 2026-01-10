-- Create subscribers table for email newsletter
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  status text DEFAULT 'active', -- active, unsubscribed
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to subscribe (insert email)
CREATE POLICY "Anyone can subscribe" 
ON subscribers FOR INSERT 
WITH CHECK (true);

-- Policy: Only admins can view and manage subscribers
CREATE POLICY "Admins can view subscribers" 
ON subscribers FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update subscribers" 
ON subscribers FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete subscribers" 
ON subscribers FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);
