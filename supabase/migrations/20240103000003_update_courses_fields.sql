-- Add content and syllabus fields to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS syllabus jsonb;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS student_count integer DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS rating numeric(3,1) DEFAULT 5.0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0;

