DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'personal_linkedin_url'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN personal_linkedin_url text;
  END IF;
END $$;