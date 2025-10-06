/*
  # Create leads table for PKI teaser campaign

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `email` (text, unique) - Email address of the lead
      - `name` (text) - First name of the lead
      - `giveaway` (text, nullable) - Selected giveaway participation (session-gratuite, vip-opening, or casque-custom)
      - `created_at` (timestamptz) - Timestamp when the lead was created
      - `updated_at` (timestamptz) - Timestamp when the lead was last updated

  2. Security
    - Enable RLS on `leads` table
    - Add policy to allow anyone to insert their own lead (public form submission)
    - Add policy for authenticated admins to view all leads

  3. Notes
    - Email must be unique to prevent duplicate submissions
    - Giveaway field is optional as users may just want to be notified without participating in giveaways
    - RLS policies allow public inserts but restrict reads to authenticated users only
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  giveaway text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_giveaway ON leads(giveaway) WHERE giveaway IS NOT NULL;
