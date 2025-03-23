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
    <header className="fixed w-full bg-[#002B3D] z-50 shadow-sm">
      <div className="container mx-auto px-5 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 p-2 border-2 border-white rounded-lg shadow-lg">
            <a href="#" className="focus:outline-none">
              <img
                src={logoPrincipalColorido}
                alt="Toka dos Pets"
                className="h-20 md:h-20 lg:h-40"
              />
            </a>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-white hover:text-blue-200 transition text-lg">
              Início
            </a>
            <button onClick={openAboutModal} className="text-white hover:text-blue-200 transition text-lg">
              Sobre Nós
            </button>
            <button onClick={scrollToServicos} className="text-white hover:text-blue-200 transition text-lg">
              Serviços
            </button>
            <a href="#galeria" className="text-white hover:text-blue-200 transition text-lg">
              Galeria
            </a>
            <a href="#contato" className="text-white hover:text-blue-200 transition text-lg">
              Contato
            </a>
            <button
              className="bg-white text-[#002B3D] px-6 py-2 rounded-full hover:bg-[#D96E30] transition text-lg"
              onClick={() => window.open('https://wa.me/5511963551131', '_blank')}
            >
              Agende uma Consulta
            </button>
          </nav>

          {/* Botão do Menu Mobile */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#002B3D] border-t"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#inicio" className="text-white hover:text-blue-200 transition text-left">
                Início
              </a>
              <button onClick={openAboutModal} className="text-white hover:text-blue-200 transition text-left">
                Sobre Nós
              </button>
              <button onClick={scrollToServicos} className="text-white hover:text-blue-200 transition text-left">
                Serviços
              </button>
              <a href="#galeria" className="text-white hover:text-blue-200 transition text-left">
                Galeria
              </a>
              <a href="#contato" className="text-white hover:text-blue-200 transition text-left">
                Contato
              </a>
              <button
                className="bg-white text-[#002B3D] px-6 py-2 rounded-full hover:bg-[#D96E30] transition w-full"
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