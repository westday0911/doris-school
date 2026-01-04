-- Comprehensive Admin RLS Policies for all tables

-- Function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Articles Admin Policies
DO $$ BEGIN
  CREATE POLICY "Admin full access on articles" ON articles 
  FOR ALL TO authenticated USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Tools Admin Policies
DO $$ BEGIN
  CREATE POLICY "Admin full access on tools" ON tools 
  FOR ALL TO authenticated USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. Courses Admin Policies
DO $$ BEGIN
  CREATE POLICY "Admin full access on courses" ON courses 
  FOR ALL TO authenticated USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 4. Profiles Admin Policies
-- Admins need to be able to see and update all profiles
DO $$ BEGIN
  CREATE POLICY "Admin full access on profiles" ON profiles 
  FOR ALL TO authenticated USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 5. Orders Admin Policies
DO $$ BEGIN
  CREATE POLICY "Admin full access on orders" ON orders 
  FOR ALL TO authenticated USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 6. Reviews Admin Policies
DO $$ BEGIN
  CREATE POLICY "Admin full access on reviews" ON reviews 
  FOR ALL TO authenticated USING (public.is_admin());
EXCEPTION WHEN duplicate_object THEN null; END $$;

