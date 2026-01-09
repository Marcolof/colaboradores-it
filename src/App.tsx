import { useState } from 'react';
import { Header } from './components/Header';
import { ColaboradoresList } from './components/ColaboradoresList';
import { ColaboradorForm } from './components/ColaboradorForm';
import type { Colaborador } from './types';

function App() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [selectedColaborador, setSelectedColaborador] = useState<Colaborador | null>(null);

  const handleNewColaborador = () => {
    setSelectedColaborador(null);
    setView('form');
  };

  const handleEditColaborador = (colaborador: Colaborador) => {
    setSelectedColaborador(colaborador);
    setView('form');
  };

  const handleBack = () => {
    setSelectedColaborador(null);
    setView('list');
  };

  return (
    <div className="min-h-screen bg-vortex-gray-bg">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === 'list' ? (
          <ColaboradoresList
            onNewColaborador={handleNewColaborador}
            onEditColaborador={handleEditColaborador}
          />
        ) : (
          <ColaboradorForm
            colaborador={selectedColaborador}
            onBack={handleBack}
          />
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-vortex-border bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-display font-bold">
                <span className="text-vortex-primary">VORT</span>
                <span className="text-vortex-accent">E</span>
                <span className="text-vortex-primary">X.</span>
              </div>
              <span className="text-vortex-text-secondary text-body-sm">
                Sistema de Gestión de Colaboradores
              </span>
            </div>
            <p className="text-body-sm text-vortex-text-light">
              © {new Date().getFullYear()} Vortex IT. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
