import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Colaborador = {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string | null;
  sexo: string | null;
  email: string;
  telefono_pais: string;
  telefono_numero: string | null;
  domicilio: string | null;
  foto_url: string | null;
  fecha_ingreso: string;
  cargo: string;
  created_at: string;
  updated_at: string;
};
