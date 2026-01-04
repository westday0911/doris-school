-- Create user_courses table to link users and courses
CREATE TABLE IF NOT EXISTS user_courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  progress integer DEFAULT 0,
  status text DEFAULT 'active', -- active, completed, expired
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, course_id)
);

-- RLS Policies
ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view their own courses." ON user_courses
    FOR SELECT USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Admin can do everything
DO $$ BEGIN
  CREATE POLICY "Admins have full access to user_courses" ON user_courses
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role = 'admin'
      )
    );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;


