import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '@/hooks/useModal';
import logoPrincipalColorido from '@assets/img/logos/logo_principal_colorido.png';

interface HeaderLandingProps {
  scrollToServicos: () => void;
}

export function HeaderLanding({ scrollToServicos }: HeaderLandingProps) {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 lg:py-4 xl:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="focus:outline-none">
            <img
              src={logoPrincipalColorido}
              alt="Toka dos Pets"
              className="h-12 transition-all duration-300 md:h-14 lg:h-16 xl:h-20 2xl:h-24"
            />
          </a>

          {/* Menu Desktop */}
          <nav className="hidden items-center space-x-4 lg:flex xl:space-x-6">
            <a
              href="#inicio"
              className="text-sm font-semibold text-[#002B3D] transition hover:text-[#D96E30] xl:text-base"
            >
              Início
            </a>
            <button
              onClick={() => openModal('sobreNos')}
              className="text-sm font-semibold text-[#002B3D] transition hover:text-[#D96E30] xl:text-base"
            >
              Sobre Nós
            </button>
            <button
              onClick={scrollToServicos}
              className="text-sm font-semibold text-[#002B3D] transition hover:text-[#D96E30] xl:text-base"
            >
              Serviços
            </button>
            <a
              href="#galeria"
              className="text-sm font-semibold text-[#002B3D] transition hover:text-[#D96E30] xl:text-base"
            >
              Galeria
            </a>
            <a
              href="#contato"
              className="text-sm font-semibold text-[#002B3D] transition hover:text-[#D96E30] xl:text-base"
            >
              Contato
            </a>
            <button
              onClick={() => openModal('loginCliente')}
              className="rounded-full bg-[#002B3D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#D96E30] xl:text-base"
            >
              Área do Cliente
            </button>
          </nav>

          {/* Menu Toggle Mobile */}
          <button
            className="p-1 text-[#002B3D] lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Linha azul inferior */}
      <div className="h-2 bg-[#002B3D] md:h-3 lg:h-4"></div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t bg-white lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-3 px-4 py-3">
              <a
                href="#inicio"
                className="border-b border-gray-100 py-2 font-semibold text-[#002B3D] transition hover:text-[#D96E30]"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <button
                onClick={() => {
                  openModal('sobreNos');
                  setIsMenuOpen(false);
                }}
                className="border-b border-gray-100 py-2 text-left font-semibold text-[#002B3D] transition hover:text-[#D96E30]"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => {
                  scrollToServicos();
                  setIsMenuOpen(false);
                }}
                className="border-b border-gray-100 py-2 text-left font-semibold text-[#002B3D] transition hover:text-[#D96E30]"
              >
                Serviços
              </button>
              <a
                href="#galeria"
                className="border-b border-gray-100 py-2 font-semibold text-[#002B3D] transition hover:text-[#D96E30]"
                onClick={() => setIsMenuOpen(false)}
              >
                Galeria
              </a>
              <a
                href="#contato"
                className="border-b border-gray-100 py-2 font-semibold text-[#002B3D] transition hover:text-[#D96E30]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <button
                className="mt-2 rounded-full bg-[#002B3D] px-4 py-2 font-semibold text-white transition hover:bg-[#D96E30]"
                onClick={() => {
                  openModal('loginCliente');
                  setIsMenuOpen(false);
                }}
              >
                Área do Cliente
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
