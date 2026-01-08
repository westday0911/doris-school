-- Add launch_date column to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS launch_date timestamp with time zone;

