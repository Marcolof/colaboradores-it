import { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Colaborador } from '../types';

type Props = {
  onNewColaborador: () => void;
  onEditColaborador: (colaborador: Colaborador) => void;
};

export function ColaboradoresList({ onNewColaborador, onEditColaborador }: Props) {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [filteredColaboradores, setFilteredColaboradores] = useState<Colaborador[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadColaboradores();
  }, []);

  useEffect(() => {
    filterColaboradores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, colaboradores]);

  const loadColaboradores = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('colaboradores')
      .select('*')
      .order('apellido', { ascending: true });

    if (error) {
      console.error('Error loading colaboradores:', error);
    } else {
      setColaboradores(data || []);
    }
    setLoading(false);
  };

  const filterColaboradores = () => {
    if (!searchTerm.trim()) {
      setFilteredColaboradores(colaboradores);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = colaboradores.filter(
      (col) =>
        col.nombre.toLowerCase().includes(term) ||
        col.apellido.toLowerCase().includes(term) ||
        col.cargo.toLowerCase().includes(term)
    );
    setFilteredColaboradores(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar este colaborador?')) {
      return;
    }

    const { error } = await supabase.from('colaboradores').delete().eq('id', id);

    if (error) {
      alert('Error al eliminar colaborador');
      console.error(error);
    } else {
      loadColaboradores();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-vortex-border border-t-vortex-primary"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-vortex opacity-20 blur-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card-vortex animate-slide-up">
        <div className="pb-6 border-b border-vortex-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-heading-lg font-display text-vortex-text-primary">
                Colaboradores
              </h2>
              <p className="text-body-sm text-vortex-text-secondary mt-1">
                {colaboradores.length} {colaboradores.length === 1 ? 'colaborador registrado' : 'colaboradores registrados'}
              </p>
            </div>
            <button
              onClick={onNewColaborador}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuevo Colaborador
            </button>
          </div>

          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-vortex-text-light w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-vortex pl-12"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-vortex-gray-bg to-white">
              <tr>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-vortex-text-primary uppercase tracking-wide">Foto</th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-vortex-text-primary uppercase tracking-wide">
                  Apellido y Nombre
                </th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-vortex-text-primary uppercase tracking-wide">Cargo</th>
                <th className="px-6 py-4 text-left text-body-sm font-semibold text-vortex-text-primary uppercase tracking-wide">
                  Fecha de Ingreso
                </th>
                <th className="px-6 py-4 text-center text-body-sm font-semibold text-vortex-text-primary uppercase tracking-wide">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vortex-border">
              {filteredColaboradores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-vortex-gray-bg flex items-center justify-center">
                        <Search className="w-8 h-8 text-vortex-text-light" />
                      </div>
                      <p className="text-body-md text-vortex-text-secondary">
                        {searchTerm ? 'No se encontraron colaboradores' : 'No hay colaboradores registrados'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredColaboradores.map((colaborador) => (
                  <tr key={colaborador.id} className="hover:bg-vortex-gray-bg/50 transition-all duration-200 group">
                    <td className="px-6 py-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-vortex flex items-center justify-center ring-2 ring-vortex-border group-hover:ring-vortex-primary transition-all duration-200">
                        {colaborador.foto_url ? (
                          <img
                            src={colaborador.foto_url}
                            alt={`${colaborador.nombre} ${colaborador.apellido}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-lg font-bold">
                            {colaborador.nombre[0]}
                            {colaborador.apellido[0]}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-vortex-text-primary text-body-md">
                        {colaborador.apellido}, {colaborador.nombre}
                      </div>
                      <div className="text-body-sm text-vortex-text-secondary mt-0.5">{colaborador.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-vortex-primary/10 text-vortex-primary text-body-sm font-medium">
                        {colaborador.cargo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-vortex-text-primary text-body-md font-medium">{formatDate(colaborador.fecha_ingreso)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEditColaborador(colaborador)}
                          className="p-2.5 text-[#454545] hover:bg-vortex-primary hover:text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                          title="Ver Colaborador"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(colaborador.id!)}
                          className="p-2.5 text-[#454545] hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
