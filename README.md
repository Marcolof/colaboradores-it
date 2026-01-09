# 🌀 Sistema de Gestión de Colaboradores - Vortex IT

Sistema web para la gestión de colaboradores y generación de firmas digitales corporativas.

## 🌐 Demo en Vivo

**🚀 Aplicación desplegada en Vercel:** [https://colaboradores-ittest.vercel.app/](https://colaboradores-ittest.vercel.app/)

> Deploy automático desde GitHub - Cada push a `main` se despliega automáticamente

## 🚀 Características

- ✅ Gestión completa de colaboradores (CRUD)
- 📸 Editor de fotos con recorte de 105x105px
- 🎨 Colores personalizables por colaborador
- 📧 Generación de firmas digitales para email
- 🔗 Integración con redes sociales
- 📱 Diseño responsive y moderno
- 🗄️ Base de datos Supabase

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7.3
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Iconos**: Lucide React + Font Awesome
- **Utilidades**: html2canvas, qrcode

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta en [Supabase](https://supabase.com/)

## ⚙️ Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Luego edita el archivo `.env` con tus credenciales de Supabase:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
   ```

4. **Configurar Supabase**
   
   Ejecuta las migraciones en tu proyecto de Supabase (en orden):
   - `supabase/migrations/20251105194833_create_colaboradores_table.sql`
   - `supabase/migrations/20251107145513_add_social_media_fields.sql`
   - `supabase/migrations/20251111142711_add_organization_and_color_fields.sql`
   - `supabase/migrations/20251113000000_add_personal_linkedin.sql`
   - `supabase/migrations/20251113200417_add_personal_linkedin_url.sql`

## 🌐 Deploy en Vercel

### Configurar Variables de Entorno en Vercel

**⚠️ IMPORTANTE:** La aplicación no funcionará en Vercel sin estas variables.

1. **Ve a tu proyecto en Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Selecciona tu proyecto

2. **Configurar Variables de Entorno:**
   - Ve a **Settings** → **Environment Variables**
   - Agrega las siguientes variables:

   ```
   VITE_SUPABASE_URL = tu-url-de-supabase
   VITE_SUPABASE_ANON_KEY = tu-clave-anonima
   ```

   - Selecciona: **Production**, **Preview**, y **Development**
   - Click en **Save**

3. **Redeploy:**
   - Ve a **Deployments**
   - Click en el último deployment
   - Click en **⋯** (tres puntos) → **Redeploy**

4. **Verificar:**
   - Espera 1-3 minutos
   - Abre tu URL de Vercel
   - ¡La aplicación debería funcionar! 🎉

### Deploy Automático

Cada vez que hagas `git push` a la rama `main`, Vercel automáticamente:
1. Detecta el cambio
2. Ejecuta `npm run build`
3. Despliega la nueva versión
4. Actualiza tu URL en vivo

## 🚀 Uso

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/` (o el siguiente puerto disponible)

### Build para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

### Preview de Producción

```bash
npm run preview
```

### Linter y TypeCheck

```bash
# Verificar código con ESLint
npm run lint

# Verificar tipos con TypeScript
npm run typecheck
```

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes React
│   ├── ColaboradoresList.tsx   # Lista de colaboradores
│   ├── ColaboradorForm.tsx     # Formulario CRUD
│   ├── Header.tsx              # Encabezado
│   ├── ImageCropper.tsx        # Recortador de imágenes
│   └── SignatureModal.tsx      # Modal de firma digital
├── data/                    # Datos estáticos
│   └── countries.ts            # Lista de países y códigos
├── lib/                     # Configuraciones
│   └── supabase.ts             # Cliente de Supabase
├── types/                   # Tipos TypeScript
│   └── index.ts                # Definiciones de tipos
├── utils/                   # Utilidades
│   ├── qrcode.ts               # Generación de códigos QR
│   ├── signature.ts            # Firma digital v1
│   └── signatureNew.ts         # Firma digital v2
├── App.tsx                  # Componente principal
└── main.tsx                 # Punto de entrada
```

## 🎨 Sistema de Diseño Vortex

El proyecto utiliza un sistema de diseño personalizado con:

- **Color Primario**: `#7028e4` (Morado Vortex)
- **Color de Acento**: `#e428d5` (Rosa)
- **Tipografía**: Montserrat (Display) + Inter (Body)
- **Componentes**: Clases CSS personalizadas (`btn-primary`, `input-vortex`, `card-vortex`)

## 🔧 Configuración de Supabase

### Tabla: colaboradores

La tabla principal contiene los siguientes campos:

- `id` (UUID, primary key)
- `nombre` (text)
- `apellido` (text)
- `dni` (text)
- `fecha_nacimiento` (date)
- `sexo` (text)
- `email` (text)
- `telefono_pais` (text)
- `telefono_numero` (text)
- `domicilio` (text)
- `foto_url` (text)
- `fecha_ingreso` (date)
- `cargo` (text)
- `organizacion` (text)
- `linkedin_url` (text)
- `instagram_url` (text)
- `facebook_url` (text)
- `website_url` (text)
- `personal_linkedin_url` (text)
- `color_principal` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Políticas RLS

Asegúrate de configurar las políticas de Row Level Security (RLS) según tus necesidades en Supabase.

## 📝 Características Principales

### Gestión de Colaboradores

- Crear, editar y eliminar colaboradores
- Búsqueda por nombre, apellido o cargo
- Validación de datos en tiempo real

### Editor de Fotos

- Carga de imágenes
- Recorte a tamaño exacto (105x105px)
- Zoom y posicionamiento
- Vista previa en tiempo real

### Firma Digital

- Generación automática de firma de email
- Códigos QR con vCard
- Enlaces a redes sociales
- Diseño responsive
- Descarga como imagen o HTML

### Personalización

- Color principal personalizable por colaborador
- Soporte para múltiples organizaciones
- LinkedIn personal opcional

## 🐛 Solución de Problemas

### El servidor no inicia

Asegúrate de estar en el directorio correcto y que las dependencias estén instaladas:
```bash
cd "ruta/al/proyecto"
npm install
npm run dev
```

### Errores de conexión con Supabase

Verifica que:
1. Las variables de entorno en `.env` sean correctas
2. Las migraciones se hayan ejecutado en Supabase
3. Las políticas RLS estén configuradas

### Errores de TypeScript

Ejecuta el typecheck para ver los errores específicos:
```bash
npm run typecheck
```

## 📄 Licencia

© 2025 Vortex IT. Todos los derechos reservados.

## 👥 Autor

Desarrollado por Vortex IT

---

**Nota**: Este proyecto requiere una instancia activa de Supabase con las migraciones ejecutadas para funcionar correctamente.
