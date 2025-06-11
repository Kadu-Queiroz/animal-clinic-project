import logoAreaClienteColorido from '@assets/img/logos/logo_letras_coloridas.webp';

export function HeaderCliente() {
  return (
    <header className="bg-[#05334D] text-white shadow-lg">
      {/* Container principal */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - lado esquerdo */}
          <div className="flex-shrink-0">
            <img
              src={logoAreaClienteColorido}
              alt="Logo Toka dos Pets"
              className="h-10 transition-all duration-300 hover:opacity-90 md:h-12 lg:h-14"
            />
          </div>

          {/* Título central - mais destacado */}
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <h1 className="bg-gradient-to-r from-[#8B947F] to-[#C1D0B5] bg-clip-text text-xl font-bold tracking-wider text-transparent drop-shadow-md md:text-2xl lg:text-3xl">
              ÁREA DO TUTOR
            </h1>
          </div>

          {/* Espaço reservado para balanceamento (opcional) */}
          <div className="w-10 md:w-12 lg:w-14"></div>
        </div>
      </div>

      {/* Linha decorativa */}
      <div className="h-1.5 bg-gradient-to-r from-[#05334D] via-[#8B947F] to-[#05334D] opacity-90" />
    </header>
  );
}
