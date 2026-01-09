-- Add order_index column to courses table for manual sorting
ALTER TABLE courses ADD COLUMN IF NOT EXISTS order_index integer DEFAULT 0;

