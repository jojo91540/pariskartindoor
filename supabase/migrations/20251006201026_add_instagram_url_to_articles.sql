/*
  # Add instagram_url column to articles table

  1. Changes
    - Add `instagram_url` column to the `articles` table
    - Column is optional (nullable) to support articles that may not have an Instagram link
    - Allows storing the Instagram post URL associated with each article

  2. Notes
    - This is a non-destructive change that adds a new optional column
    - Existing articles will have NULL for this field
    - New articles can optionally include an Instagram URL
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE articles ADD COLUMN instagram_url text;
  END IF;
END $$;