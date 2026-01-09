import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Colaborador } from '../types';
import { countries } from '../data/countries';
import { ImageCropper } from './ImageCropper';

type Props = {
  colaborador: Colaborador | null;
  onBack: () => void;
};

export function ColaboradorForm({ colaborador, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Colaborador>({
    nombre: '',
    apellido: '',
    dni: '',
    fecha_nacimiento: null,
    sexo: null,
    email: '',
    telefono_pais: '+54',
    telefono_numero: null,
    domicilio: null,
    foto_url: null,
    fecha_ingreso: '',
    cargo: '',
    organizacion: 'Vortex IT',
    linkedin_url: null,
    instagram_url: null,
    facebook_url: null,
    website_url: null,
    personal_linkedin_url: null,
    color_principal: '#7028e4',
  });
  const [showPersonalLinkedIn, setShowPersonalLinkedIn] = useState(false);

  useEffect(() => {
    if (colaborador?.personal_linkedin_url) {
      setShowPersonalLinkedIn(true);
    }
  }, [colaborador]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor ingrese un email válido');
      setLoading(false);
      return;
    }

    try {
      if (colaborador?.id) {
        const { error } = await supabase
          .from('colaboradores')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', colaborador.id);

        if (error) throw error;
        alert('Colaborador actualizado exitosamente');
      } else {
        const { error } = await supabase.from('colaboradores').insert([formData]);

        if (error) throw error;
        alert('Colaborador creado exitosamente');
      }

      onBack();
    } catch (error) {
      console.error('Error saving colaborador:', error);
      alert('Error al guardar el colaborador');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || null,
    }));
  };

  return (
    <div className="card-vortex animate-slide-up">
      <div className="pb-6 border-b border-vortex-border">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 hover:bg-vortex-gray-bg rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-vortex-primary" />
          </button>
          <div>
            <h2 className="text-heading-lg font-display text-vortex-text-primary">
              {colaborador ? 'Editar Colaborador' : 'Nuevo Colaborador'}
            </h2>
            <p className="text-body-sm text-vortex-text-secondary mt-0.5">
              Completa los datos del colaborador
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex justify-center">
            <div>
              <label className="block text-body-sm font-medium text-vortex-text-secondary mb-3 text-center">
                Foto de Perfil (105x105px)
              </label>
              <ImageCropper
                onImageCropped={(dataUrl) =>
                  setFormData((prev) => ({ ...prev, foto_url: dataUrl }))
                }
                initialImage={formData.foto_url}
              />
            </div>
          </div>

          <div>
            <label htmlFor="nombre" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Nombre <span className="text-vortex-accent">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="input-vortex"
              placeholder="Ingresa el nombre"
            />
          </div>

          <div>
            <label htmlFor="apellido" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Apellido <span className="text-vortex-accent">*</span>
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              required
              value={formData.apellido}
              onChange={handleChange}
              className="input-vortex"
              placeholder="Ingresa el apellido"
            />
          </div>

          <div>
            <label htmlFor="dni" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              DNI <span className="text-vortex-accent">*</span>
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              required
              value={formData.dni}
              onChange={handleChange}
              className="input-vortex"
              placeholder="Ingresa el DNI"
            />
          </div>

          <div>
            <label
              htmlFor="fecha_nacimiento"
              className="block text-body-sm font-medium text-vortex-text-primary mb-2"
            >
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento || ''}
              onChange={handleChange}
              className="input-vortex"
            />
          </div>

          <div>
            <label htmlFor="sexo" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Sexo
            </label>
            <select
              id="sexo"
              name="sexo"
              value={formData.sexo || ''}
              onChange={handleChange}
              className="input-vortex"
            >
              <option value="">Seleccionar...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Email Corporativo <span className="text-vortex-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-vortex"
              placeholder="nombre@vortex-it.com"
            />
          </div>

          <div>
            <label className="block text-body-sm font-medium text-vortex-text-primary mb-2">Teléfono</label>
            <div className="flex gap-2">
              <select
                name="telefono_pais"
                value={formData.telefono_pais}
                onChange={handleChange}
                className="w-32 px-3 py-3 border-2 border-vortex-border rounded-lg focus:border-vortex-primary focus:ring-2 focus:ring-vortex-primary/20 outline-none transition-all duration-200 bg-white text-vortex-text-primary"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.phoneCode}>
                    {country.flag} {country.phoneCode}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="telefono_numero"
                placeholder="Número"
                value={formData.telefono_numero || ''}
                onChange={handleChange}
                className="flex-1 input-vortex"
              />
            </div>
          </div>

          <div>
            <label htmlFor="domicilio" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Domicilio
            </label>
            <input
              type="text"
              id="domicilio"
              name="domicilio"
              value={formData.domicilio || ''}
              onChange={handleChange}
              className="input-vortex"
              placeholder="Calle, número, ciudad"
            />
          </div>

          <div>
            <label
              htmlFor="fecha_ingreso"
              className="block text-body-sm font-medium text-vortex-text-primary mb-2"
            >
              Fecha de Ingreso <span className="text-vortex-accent">*</span>
            </label>
            <input
              type="date"
              id="fecha_ingreso"
              name="fecha_ingreso"
              required
              value={formData.fecha_ingreso}
              onChange={handleChange}
              className="input-vortex"
            />
          </div>

          <div>
            <label htmlFor="cargo" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Cargo/Puesto <span className="text-vortex-accent">*</span>
            </label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              required
              value={formData.cargo}
              onChange={handleChange}
              className="input-vortex"
              placeholder="Director, Desarrollador, etc."
            />
          </div>

          <div>
            <label htmlFor="organizacion" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Organización/Empresa
            </label>
            <input
              type="text"
              id="organizacion"
              name="organizacion"
              value={formData.organizacion || 'Vortex IT'}
              onChange={handleChange}
              className="input-vortex"
              placeholder="Vortex IT"
            />
          </div>

          <div>
            <label htmlFor="color_principal" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Color Principal
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                id="color_principal"
                name="color_principal"
                value={formData.color_principal || '#7028e4'}
                onChange={handleChange}
                className="h-12 w-20 border-2 border-vortex-border rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.color_principal || '#7028e4'}
                onChange={(e) => handleChange({ target: { name: 'color_principal', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="flex-1 input-vortex"
                placeholder="#7028e4"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 pt-6 border-t border-vortex-border">
            <h3 className="text-heading-sm font-display text-vortex-text-primary mb-4">Redes Sociales</h3>
            <p className="text-body-sm text-vortex-text-secondary mb-4">
              Estas URLs aparecerán como íconos en la firma digital
            </p>
          </div>

          <div>
            <label htmlFor="linkedin_url" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url || ''}
              onChange={handleChange}
              className="input-vortex"
              placeholder="https://linkedin.com/in/usuario"
            />
          </div>

          <div>
            <label htmlFor="instagram_url" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Instagram
            </label>
            <input
              type="url"
              id="instagram_url"
              name="instagram_url"
              value={formData.instagram_url || ''}
              onChange={handleChange}
              className="input-vortex"
              placeholder="https://instagram.com/usuario"
            />
          </div>

          <div>
            <label htmlFor="facebook_url" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Facebook
            </label>
            <input
              type="url"
              id="facebook_url"
              name="facebook_url"
              value={formData.facebook_url || ''}
              onChange={handleChange}
              className="input-vortex"
              placeholder="https://facebook.com/usuario"
            />
          </div>

          <div>
            <label htmlFor="website_url" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
              Sitio Web
            </label>
            <input
              type="url"
              id="website_url"
              name="website_url"
              value={formData.website_url || ''}
              onChange={handleChange}
              className="input-vortex"
              placeholder="https://vortex-it.com"
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <h3 className="text-heading-sm font-display text-vortex-text-primary mb-2">
              LinkedIn Personal
            </h3>
            <p className="text-body-sm text-vortex-text-secondary">
              Agrega tu perfil personal de LinkedIn que aparecerá como "Connect with me on LinkedIn" en la firma
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showPersonalLinkedIn}
                onChange={(e) => {
                  setShowPersonalLinkedIn(e.target.checked);
                  if (!e.target.checked) {
                    setFormData((prev) => ({ ...prev, personal_linkedin_url: null }));
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-vortex-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-vortex-primary"></div>
            </label>
            <span className="text-body-sm font-medium text-vortex-text-primary">
              {showPersonalLinkedIn ? 'Habilitado' : 'Deshabilitado'}
            </span>
          </div>

          {showPersonalLinkedIn && (
            <div>
              <label htmlFor="personal_linkedin_url" className="block text-body-sm font-medium text-vortex-text-primary mb-2">
                URL de LinkedIn Personal
              </label>
              <input
                type="url"
                id="personal_linkedin_url"
                name="personal_linkedin_url"
                value={formData.personal_linkedin_url || ''}
                onChange={handleChange}
                className="input-vortex"
                placeholder="https://linkedin.com/in/tu-perfil"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4 justify-end pt-6 border-t border-vortex-border">
          <button
            type="button"
            onClick={onBack}
            className="btn-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Guardando...' : 'Guardar Colaborador'}
          </button>
        </div>
      </form>
    </div>
  );
}
