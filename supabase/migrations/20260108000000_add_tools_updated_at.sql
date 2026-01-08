-- Add updated_at column to tools table
ALTER TABLE tools ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());

-- Create a trigger to automatically update updated_at for tools
-- (Reusing the function if it exists, or creating it)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_tools_updated_at ON tools;
CREATE TRIGGER update_tools_updated_at
    BEFORE UPDATE ON tools
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Add increment_tool_access RPC function
CREATE OR REPLACE FUNCTION increment_tool_access(tool_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE tools
  SET access_count = access_count + 1
  WHERE id = tool_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


