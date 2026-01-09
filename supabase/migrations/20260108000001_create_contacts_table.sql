-- Create contacts table for storing consultation requests
CREATE TABLE IF NOT EXISTS contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  contact_info text NOT NULL,
  requirement text,
  status text DEFAULT 'pending', -- pending, processed, archived
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact requests
CREATE POLICY "Anyone can insert contact requests" 
ON contacts FOR INSERT 
WITH CHECK (true);

-- Policy: Only admins can view and manage contact requests
CREATE POLICY "Admins can view contact requests" 
ON contacts FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update contact requests" 
ON contacts FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete contact requests" 
ON contacts FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);


