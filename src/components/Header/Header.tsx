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
      <div className="container mx-auto px-5 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a href="#" className="focus:outline-none">
              <img
                src={logoPrincipalColorido}
                alt="Toka dos Pets"
                className="h-16 md:h-20 lg:h-40"
              />
            </a>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-[#002B3D] hover:text-[#D96E30] transition text-lg font-bold">
              Início
            </a>
            <button
              onClick={openAboutModal}
              className="text-[#002B3D] hover:text-[#D96E30] transition text-lg font-bold"
            >
              Sobre Nós
            </button>
            <button
              onClick={scrollToServicos}
              className="text-[#002B3D] hover:text-[#D96E30] transition text-lg font-bold"
            >
              Serviços
            </button>
            <a href="#galeria" className="text-[#002B3D] hover:text-[#D96E30] transition text-lg font-bold">
              Galeria
            </a>
            <a href="#contato" className="text-[#002B3D] hover:text-[#D96E30] transition text-lg font-bold">
              Contato
            </a>
            <button
              className="bg-[#002B3D] text-white px-6 py-2 rounded-full hover:bg-[#D96E30] transition text-lg font-bold"
              onClick={() => window.open('https://wa.me/5511963551131', '_blank')}
            >
              Agende uma Consulta
            </button>
          </nav>

          {/* Botão do Menu Mobile */}
          <button
            className="lg:hidden text-[#002B3D]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Divisão Azul */}
      <div className="h-3 md:h-6 lg:h-10 bg-[#002B3D]"></div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#inicio" className="text-[#002B3D] hover:text-[#D96E30] transition text-left font-bold">
                Início
              </a>
              <button
                onClick={openAboutModal}
                className="text-[#002B3D] hover:text-[#D96E30] transition text-left font-bold"
              >
                Sobre Nós
              </button>
              <button
                onClick={scrollToServicos}
                className="text-[#002B3D] hover:text-[#D96E30] transition text-left font-bold"
              >
                Serviços
              </button>
              <a href="#galeria" className="text-[#002B3D] hover:text-[#D96E30] transition text-left font-bold">
                Galeria
              </a>
              <a href="#contato" className="text-[#002B3D] hover:text-[#D96E30] transition text-left font-bold">
                Contato
              </a>
              <button
                className="bg-[#002B3D] text-white px-6 py-2 rounded-full hover:bg-[#D96E30] transition w-full font-bold"
                onClick={() => window.open('https://wa.me/5511963551131', '_blank')}
              >
                Agende uma Consulta
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}