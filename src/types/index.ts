export type Colaborador = {
  id?: string;
  nombre: string;
  apellido: string;
  dni: string;
  fecha_nacimiento: string | null;
  sexo: 'Masculino' | 'Femenino' | 'Otro' | null;
  email: string;
  telefono_pais: string;
  telefono_numero: string | null;
  domicilio: string | null;
  foto_url: string | null;
  fecha_ingreso: string;
  cargo: string;
  organizacion?: string | null;
  linkedin_url?: string | null;
  instagram_url?: string | null;
  facebook_url?: string | null;
  website_url?: string | null;
  personal_linkedin_url?: string | null;
  color_principal?: string | null;
};

export type Country = {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
};
