import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScroll } from '@/hooks/useScroll';

export function HeroContent() {
  const scrollToSection = useScroll();

  const handleScrollToServicos = () => {
    scrollToSection('servicos');
  };

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
      <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">Onde o amor e a expertise se encontram!</h1>
      <p className="text-xl text-white/90 mb-8">Cuidados excepcionais para cães, gatos e animais silvestres</p>
      <div className="flex gap-4">
        <motion.button
          className="bg-[#002B3D] text-white px-8 py-3 rounded-full text-lg hover:bg-[#004B6B] transition cursor-pointer flex items-center gap-2"
          onClick={handleScrollToServicos}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Conheça Nossos Serviços</span>
          <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>
        <motion.button
          className="bg-[#ffffff] text-black px-8 py-3 rounded-full text-lg hover:bg-[#D96E30] transition cursor-pointer"
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