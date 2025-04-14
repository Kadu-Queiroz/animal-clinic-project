import { Bell, User } from 'lucide-react';
import logoAreaClienteColorido from '@assets/img/logos/logo_letras_coloridas.webp';

export function HeaderCliente() {
  return (
    <header className="bg-[#05334D] text-white shadow relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logoAreaClienteColorido}
            alt="Logo Toka dos Pets"
            className="h-12 md:h-14 lg:h-16 xl:h-20"
          />
        </div>

        {/* Título central sobreposto */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <span className="text-white text-base sm:text-lg md:text-xl font-semibold tracking-wide opacity-90">
            Área do Cliente
          </span>
        </div>

        {/* Ações */}
        <div className="flex items-center space-x-4">
          <button className="hover:text-[#CC6E28] transition">
            <Bell size={22} />
          </button>
          <button className="hover:text-[#CC6E28] transition flex items-center space-x-1">
            <User size={22} />
            <span className="text-sm">Perfil</span>
          </button>
        </div>
      </div>

      {/* Linha separadora */}
      <div className="h-1 bg-[#8B947F]" />
    </header>
  );
}