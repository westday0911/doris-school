-- Add is_free column to course_lessons table
ALTER TABLE course_lessons ADD COLUMN IF NOT EXISTS is_free boolean DEFAULT false;


