/*
  # Create colaboradores management system

  1. New Tables
    - `colaboradores`
      - `id` (uuid, primary key) - Unique identifier
      - `nombre` (text) - First name
      - `apellido` (text) - Last name
      - `dni` (text) - National ID number
      - `fecha_nacimiento` (date) - Birth date
      - `sexo` (text) - Gender (Masculino, Femenino, Otro)
      - `email` (text) - Corporate email
      - `telefono_pais` (text) - Country code for phone
      - `telefono_numero` (text) - Phone number
      - `domicilio` (text) - Address
      - `foto_url` (text) - Profile photo URL
      - `fecha_ingreso` (date) - Company start date
      - `cargo` (text) - Position/Role
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `colaboradores` table
    - Add policies for authenticated users to manage colaboradores data
*/

CREATE TABLE IF NOT EXISTS colaboradores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  apellido text NOT NULL,
  dni text NOT NULL,
  fecha_nacimiento date,
  sexo text,
  email text NOT NULL,
  telefono_pais text DEFAULT '+54',
  telefono_numero text,
  domicilio text,
  foto_url text,
  fecha_ingreso date NOT NULL,
  cargo text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE colaboradores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for authenticated users"
  ON colaboradores
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow read access for anonymous users"
  ON colaboradores
  FOR SELECT
  TO anon
  USING (true);