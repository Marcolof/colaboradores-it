/*
  # Add Organization and Color Fields to Colaboradores

  1. Changes
    - Add `organizacion` column (text, nullable, default 'Vortex IT')
    - Add `color_principal` column (text, nullable, default '#7028e4')
  
  2. Purpose
    - Enable storage of organization/company name for vCard and signature
    - Support customizable color themes for personalized signatures
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'organizacion'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN organizacion text DEFAULT 'Vortex IT';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'colaboradores' AND column_name = 'color_principal'
  ) THEN
    ALTER TABLE colaboradores ADD COLUMN color_principal text DEFAULT '#7028e4';
  END IF;
END $$;