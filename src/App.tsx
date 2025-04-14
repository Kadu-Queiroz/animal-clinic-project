import { useState } from 'react';
import { useScroll } from '@/hooks/useScroll';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServiceSection';
import { GallerySection } from './components/GalelerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GlobalModals } from './components/Modals/GlobalModals';
import whatsappLogo from '@/assets/img/logos/logo_whatsapp.svg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = useScroll();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511963551131', '_blank');
  };

  return (
    <div className="font-['Open_Sans']">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToServicos={() => scrollToSection('servicos')}
      />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
      <Footer />

      <GlobalModals />

      <div
        className="whatsapp-fixed"
        onClick={handleWhatsAppClick}
      >
        <img
          src={whatsappLogo}
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </div>
    </div>
  );
}

export default App;