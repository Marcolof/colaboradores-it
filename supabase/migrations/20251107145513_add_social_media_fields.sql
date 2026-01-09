/*
  # Add Social Media Fields to Colaboradores

  1. Changes
    - Add `linkedin_url` column (text, nullable)
    - Add `instagram_url` column (text, nullable)
    - Add `facebook_url` column (text, nullable)
    - Add `website_url` column (text, nullable)
  
  2. Purpose
    - Enable storage of social media links for signature generation
    - Support complete digital signature with social icons
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'linkedin_url'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN linkedin_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN instagram_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'facebook_url'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN facebook_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'website_url'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN website_url text;
  END IF;
END $$;