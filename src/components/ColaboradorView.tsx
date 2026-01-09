import { ArrowLeft, Edit, FileSignature } from 'lucide-react';
import type { Colaborador } from '../types';

type Props = {
  colaborador: Colaborador;
  onBack: () => void;
  onEdit: () => void;
  onGenerateSignature: () => void;
};

export function ColaboradorView({ colaborador, onBack, onEdit, onGenerateSignature }: Props) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
  };

  const InfoField = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <div className="py-3">
      <label className="block text-body-sm font-medium text-vortex-text-secondary mb-1">
        {label}
      </label>
      <p className="text-body-md text-vortex-text-primary">
        {value || 'No especificado'}
      </p>
    </div>
  );

  return (
    <div className="card-vortex animate-slide-up">
      <div className="pb-6 border-b border-vortex-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2.5 hover:bg-vortex-gray-bg rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-vortex-primary" />
            </button>
            <div>
              <h2 className="text-heading-lg font-display text-vortex-text-primary">
                Ver Colaborador
              </h2>
              <p className="text-body-sm text-vortex-text-secondary mt-0.5">
                Detalles del colaborador
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="btn-outline flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Editar
            </button>
            <button
              onClick={onGenerateSignature}
              className="btn-primary flex items-center gap-2"
            >
              <FileSignature className="w-5 h-5" />
              Ver Firma
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6">
        {/* Foto */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-vortex flex items-center justify-center ring-4 ring-vortex-border">
            {colaborador.foto_url ? (
              <img
                src={colaborador.foto_url}
                alt={`${colaborador.nombre} ${colaborador.apellido}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-4xl font-bold">
                {colaborador.nombre[0]}{colaborador.apellido[0]}
              </span>
            )}
          </div>
        </div>

        {/* Datos Personales */}
        <div className="mb-6">
          <h3 className="text-heading-sm font-display text-vortex-text-primary mb-4 pb-3 border-b border-vortex-border">
            📋 Datos Personales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InfoField label="Nombre" value={colaborador.nombre} />
            <InfoField label="Apellido" value={colaborador.apellido} />
            <InfoField label="DNI" value={colaborador.dni} />
            <InfoField 
              label="Fecha de Nacimiento" 
              value={colaborador.fecha_nacimiento ? formatDate(colaborador.fecha_nacimiento) : null} 
            />
            <InfoField label="Sexo" value={colaborador.sexo} />
          </div>
        </div>

        {/* Contacto */}
        <div className="mb-6">
          <h3 className="text-heading-sm font-display text-vortex-text-primary mb-4 pb-3 border-b border-vortex-border">
            📞 Contacto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InfoField label="Email Corporativo" value={colaborador.email} />
            <InfoField 
              label="Teléfono" 
              value={colaborador.telefono_numero ? `${colaborador.telefono_pais} ${colaborador.telefono_numero}` : null} 
            />
            <div className="md:col-span-2">
              <InfoField label="Domicilio" value={colaborador.domicilio} />
            </div>
          </div>
        </div>

        {/* Datos Laborales */}
        <div className="mb-6">
          <h3 className="text-heading-sm font-display text-vortex-text-primary mb-4 pb-3 border-b border-vortex-border">
            💼 Datos Laborales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InfoField label="Cargo/Puesto" value={colaborador.cargo} />
            <InfoField label="Fecha de Ingreso" value={formatDate(colaborador.fecha_ingreso)} />
            <InfoField label="Organización" value={colaborador.organizacion || 'Vortex IT'} />
            <div>
              <label className="block text-body-sm font-medium text-vortex-text-secondary mb-1">
                Color Principal
              </label>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-vortex-border"
                  style={{ backgroundColor: colaborador.color_principal || '#7028e4' }}
                />
                <p className="text-body-md text-vortex-text-primary font-mono">
                  {colaborador.color_principal || '#7028e4'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-heading-sm font-display text-vortex-text-primary mb-4 pb-3 border-b border-vortex-border">
            🌐 Redes Sociales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InfoField label="LinkedIn" value={colaborador.linkedin_url} />
            <InfoField label="Instagram" value={colaborador.instagram_url} />
            <InfoField label="Facebook" value={colaborador.facebook_url} />
            <InfoField label="Sitio Web" value={colaborador.website_url} />
            {colaborador.personal_linkedin_url && (
              <div className="md:col-span-2">
                <InfoField label="LinkedIn Personal" value={colaborador.personal_linkedin_url} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
