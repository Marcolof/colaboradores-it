import { Users, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-vortex shadow-vortex-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
            <Users className="w-8 h-8 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">
              Vortex IT
            </h1>
            <p className="text-xs text-white/80 font-medium tracking-wide">
              Gestión de Colaboradores
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-white/80" />
          <span className="text-sm text-white/90 font-medium">
            Sistema de Firmas Digitales
          </span>
        </div>
      </div>
    </header>
  );
}
