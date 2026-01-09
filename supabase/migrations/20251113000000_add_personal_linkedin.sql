/*
  # Add personal LinkedIn URL field

  1. Changes
    - Add `personal_linkedin_url` column to `colaboradores` table
    - This field stores the personal LinkedIn profile URL separate from company LinkedIn
    - Used for "Connect with me on LinkedIn" feature in signatures

  2. Notes
    - Field is optional (nullable)
    - No default value
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'personal_linkedin_url'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN personal_linkedin_url text;
  END IF;
END $$;
