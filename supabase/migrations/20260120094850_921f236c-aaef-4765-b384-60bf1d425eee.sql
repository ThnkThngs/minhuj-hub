-- Add scroll position tracking to reading_progress table
ALTER TABLE public.reading_progress 
ADD COLUMN IF NOT EXISTS last_scroll_position integer DEFAULT 0;