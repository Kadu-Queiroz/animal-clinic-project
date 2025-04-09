import { useState } from 'react';
import { useModal } from './hooks/useModal';
import { useScroll } from '@/hooks/useScroll'
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServiceSection';
import { GallerySection } from './components/GalelerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SobreNosModal, ProdutosModal, DetalhesServicoModal } from './components/Modals';
import whatsappLogo from '@/assets/img/logos/logo_whatsapp.svg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string; items: string[] } | null>(null);

  const { isOpen: isAboutModalOpen, openModal: openAboutModal, closeModal: closeAboutModal } = useModal();
  const { isOpen: isProdutosModalOpen, openModal: openProdutosModal, closeModal: closeProdutosModal } = useModal();
  const { isOpen: isDetalhesServicoModalOpen, openModal: openDetalhesServicoModal, closeModal: closeDetalhesServicoModal } = useModal();

  const scrollToSection = useScroll();

  const handleImageClick = (title: string) => {
    if (title === 'Farmácia') {
      openProdutosModal();
    }
  };

  const openServiceDetailsModal = (title: string, items: string[]) => {
    setSelectedService({ title, items });
    openDetalhesServicoModal();
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511963551131', '_blank');
  };

  return (
    <div className="font-['Open_Sans']">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToServicos={() => scrollToSection('servicos')}
        openAboutModal={openAboutModal}
      />
      <HeroSection />
      <ServicesSection openDetalhesServicoModal={openServiceDetailsModal} />
      <GallerySection onImageClick={handleImageClick} />
      <ContactSection />
      <Footer />

      <SobreNosModal isOpen={isAboutModalOpen} onClose={closeAboutModal} />
      <ProdutosModal isOpen={isProdutosModalOpen} onClose={closeProdutosModal} />
      <DetalhesServicoModal
        isOpen={isDetalhesServicoModalOpen}
        onClose={closeDetalhesServicoModal}
        title={selectedService?.title || ''}
        items={selectedService?.items || []}
      />
      
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