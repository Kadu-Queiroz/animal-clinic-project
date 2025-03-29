import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoPrincipalColorido from '@/assets/img/logos/logo_principal_colorido.png';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollToServicos: () => void;
  openAboutModal: () => void;
}

export function Header({ isMenuOpen, setIsMenuOpen, scrollToServicos, openAboutModal }: HeaderProps) {
  return (
    <header className="fixed w-full bg-white z-50 shadow-sm">
      {/* Header Principal */}
      <div className="container mx-auto px-4 xl:px-6 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Tamanhos ajustados */}
          <div className="flex items-center">
            <a href="#" className="focus:outline-none">
              <img
                src={logoPrincipalColorido}
                alt="Toka dos Pets"
                className="h-12 md:h-14 lg:h-16 xl:h-20 2xl:h-24 transition-all duration-300"
              />
            </a>
          </div>

          {/* Menu Desktop - Layout compacto */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <div className="flex items-center space-x-4 xl:space-x-6">
              <a href="#inicio" className="text-[#002B3D] hover:text-[#D96E30] transition text-sm xl:text-base font-semibold whitespace-nowrap">
                Início
              </a>
              <button
                onClick={openAboutModal}
                className="text-[#002B3D] hover:text-[#D96E30] transition text-sm xl:text-base font-semibold whitespace-nowrap"
              >
                Sobre Nós
              </button>
              <button
                onClick={scrollToServicos}
                className="text-[#002B3D] hover:text-[#D96E30] transition text-sm xl:text-base font-semibold whitespace-nowrap"
              >
                Serviços
              </button>
              <a href="#galeria" className="text-[#002B3D] hover:text-[#D96E30] transition text-sm xl:text-base font-semibold whitespace-nowrap">
                Galeria
              </a>
              <a href="#contato" className="text-[#002B3D] hover:text-[#D96E30] transition text-sm xl:text-base font-semibold whitespace-nowrap">
                Contato
              </a>
            </div>
            <button
              className="bg-[#002B3D] text-white px-4 py-1.5 xl:px-5 xl:py-2 rounded-full hover:bg-[#D96E30] transition text-sm xl:text-base font-semibold whitespace-nowrap"
              onClick={() => window.open('https://wa.me/5511963551131', '_blank')}
            >
              Agendar Consulta
            </button>
          </nav>

          {/* Botão do Menu Mobile */}
          <button
            className="lg:hidden text-[#002B3D] p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Divisão Azul - Altura reduzida */}
      <div className="h-2 md:h-3 lg:h-4 bg-[#002B3D]"></div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-3">
              <a 
                href="#inicio" 
                className="text-[#002B3D] hover:text-[#D96E30] transition py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <button
                onClick={() => { openAboutModal(); setIsMenuOpen(false); }}
                className="text-[#002B3D] hover:text-[#D96E30] transition py-2 font-semibold border-b border-gray-100 text-left"
              >
                Sobre Nós
              </button>
              <button
                onClick={() => { scrollToServicos(); setIsMenuOpen(false); }}
                className="text-[#002B3D] hover:text-[#D96E30] transition py-2 font-semibold border-b border-gray-100 text-left"
              >
                Serviços
              </button>
              <a 
                href="#galeria" 
                className="text-[#002B3D] hover:text-[#D96E30] transition py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Galeria
              </a>
              <a 
                href="#contato" 
                className="text-[#002B3D] hover:text-[#D96E30] transition py-2 font-semibold border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <button
                className="bg-[#002B3D] text-white px-4 py-2 rounded-full hover:bg-[#D96E30] transition mt-2 font-semibold"
                onClick={() => window.open('https://wa.me/5511963551131', '_blank')}
              >
                Agendar Consulta
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}