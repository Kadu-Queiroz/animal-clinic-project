import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScroll } from '@/hooks/shared/useScroll';

export function HeroContent() {
  const scrollToSection = useScroll();

  const handleScrollToServicos = () => {
    scrollToSection('servicos');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:mb-6 sm:text-5xl lg:text-6xl">
        Onde o amor e a expertise se encontram!
      </h1>
      <p className="mb-6 text-lg text-white/90 sm:mb-8 sm:text-xl">
        Cuidados excepcionais para cães, gatos e animais silvestres
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
        <motion.button
          className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#002B3D] px-6 py-3 text-base text-white transition hover:bg-[#004B6B] sm:px-8 sm:text-lg"
          onClick={handleScrollToServicos}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Conheça Nossos Serviços</span>
          <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </motion.button>
        <motion.button
          className="cursor-pointer rounded-full bg-white px-6 py-3 text-center text-base text-black transition hover:bg-[#D96E30] sm:px-8 sm:text-lg"
          onClick={() => window.open('https://wa.me/5511963551131', '_blank')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Agende uma Consulta
        </motion.button>
      </div>
    </motion.div>
  );
}
