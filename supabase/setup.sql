-- Script completo para crear la base de datos de Colaboradores
-- Este script crea la tabla con TODOS los campos del formulario

-- 1. Crear tabla colaboradores
CREATE TABLE IF NOT EXISTS colaboradores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Datos Personales
  nombre text NOT NULL,
  apellido text NOT NULL,
  dni text NOT NULL,
  fecha_nacimiento date,
  sexo text,
  -- Contacto
  email text NOT NULL,
  telefono_pais text DEFAULT '+54',
  telefono_numero text,
  domicilio text,
  -- Foto
  foto_url text,
  -- Datos Laborales
  fecha_ingreso date NOT NULL,
  cargo text NOT NULL,
  organizacion text DEFAULT 'Vortex IT',
  -- Personalización
  color_principal text DEFAULT '#7028e4',
  -- Redes Sociales
  linkedin_url text,
  instagram_url text,
  facebook_url text,
  website_url text,
  personal_linkedin_url text,
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Habilitar Row Level Security
ALTER TABLE colaboradores ENABLE ROW LEVEL SECURITY;

-- 3. Crear políticas de acceso (PERMISIVAS para desarrollo)
-- IMPORTANTE: Permitir TODAS las operaciones para usuarios anónimos
-- Esto permite que la app funcione sin autenticación de usuarios
CREATE POLICY IF NOT EXISTS "Enable all operations for all users"
  ON colaboradores
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- 4. Crear índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_colaboradores_email ON colaboradores(email);
CREATE INDEX IF NOT EXISTS idx_colaboradores_dni ON colaboradores(dni);
CREATE INDEX IF NOT EXISTS idx_colaboradores_apellido ON colaboradores(apellido);

-- 5. Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Crear trigger para updated_at
DROP TRIGGER IF EXISTS update_colaboradores_updated_at ON colaboradores;
CREATE TRIGGER update_colaboradores_updated_at
    BEFORE UPDATE ON colaboradores
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Script completado exitosamente
