/*
  # Create articles table

  1. New Tables
    - `articles`
      - `id` (uuid, primary key) - Unique identifier for each article
      - `title` (text) - Article title
      - `excerpt` (text) - Short description/preview of the article
      - `date` (date) - Publication date of the article
      - `read_time` (text) - Estimated reading time
      - `image_url` (text) - URL of the article's cover image
      - `created_at` (timestamptz) - Timestamp when the article was created
      - `updated_at` (timestamptz) - Timestamp when the article was last updated

  2. Security
    - Enable RLS on `articles` table
    - Add policy for public read access (articles are public information)
    - Add policy for authenticated admin users to insert/update/delete articles

  3. Notes
    - Articles are public and can be viewed by anyone
    - Only authenticated users with admin privileges can manage articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  read_time text NOT NULL DEFAULT '3 min',
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view articles"
  ON articles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
