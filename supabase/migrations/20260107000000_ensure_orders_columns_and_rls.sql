-- Migration to ensure orders table has all required columns and proper RLS
DO $$ 
BEGIN
    -- Add customer_name column if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'customer_name') THEN
        ALTER TABLE orders ADD COLUMN customer_name text;
    END IF;

    -- Add customer_email column if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'customer_email') THEN
        ALTER TABLE orders ADD COLUMN customer_email text;
    END IF;

    -- Add customer_phone column if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'customer_phone') THEN
        ALTER TABLE orders ADD COLUMN customer_phone text;
    END IF;

    -- Add items_data column if missing (for detailed order info)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'items_data') THEN
        ALTER TABLE orders ADD COLUMN items_data jsonb DEFAULT '[]'::jsonb;
    END IF;

    -- Ensure user_id is NOT NULL (Login required for checkout)
    -- If it was previously nullable, we make it mandatory
    ALTER TABLE orders ALTER COLUMN user_id SET NOT NULL;

    -- Add updated_at column if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'updated_at') THEN
        ALTER TABLE orders ADD COLUMN updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());
    END IF;

    -- Fix foreign key relationship to help Supabase Schema Cache
    -- This allows joining orders with profiles directly
    BEGIN
        ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_user_id_fkey;
        ALTER TABLE orders ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN
            NULL; -- Already exists, skip
    END;
END $$;

-- Re-confirm Admin RLS for orders
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'orders' AND policyname = 'Admin full access on orders'
    ) THEN
        CREATE POLICY "Admin full access on orders" ON orders 
        FOR ALL TO authenticated USING (
            EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            )
        );
    END IF;
EXCEPTION WHEN duplicate_object THEN null; END $$;

