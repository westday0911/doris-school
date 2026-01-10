-- 1. 更新 subscribers 表增加關聯與來源標記
ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS source text DEFAULT 'guest'; -- 'guest' or 'member'

-- 2. 建立同步函式：當 profile 建立時，自動加入訂閱者
CREATE OR REPLACE FUNCTION public.handle_new_member_subscription()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.subscribers (email, user_id, source, status)
    VALUES (NEW.email, NEW.id, 'member', 'active')
    ON CONFLICT (email) DO UPDATE
    SET user_id = EXCLUDED.id,
        source = 'member';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. 建立觸發器
DROP TRIGGER IF EXISTS on_profile_created_subscribe ON public.profiles;
CREATE TRIGGER on_profile_created_subscribe
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_member_subscription();

-- 4. 補齊現有會員到訂閱者清單
INSERT INTO public.subscribers (email, user_id, source, status)
SELECT email, id, 'member', 'active'
FROM public.profiles
ON CONFLICT (email) DO UPDATE
SET user_id = EXCLUDED.user_id,
    source = 'member';
