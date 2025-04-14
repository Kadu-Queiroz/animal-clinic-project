import {
    HeaderLanding,
    HeroSection,
    ServicesSection,
    GallerySection,
    ContactSection,
    Footer,
    GlobalModals,
  } from '@/components';
  import whatsappLogo from '@assets/img/logos/logo_whatsapp.svg';
  import { useScroll } from '@/hooks/useScroll';
  
  export default function LandingPage() {
    const scrollToSection = useScroll();
  
    return (
      <div className="font-['Open_Sans']">
        <HeaderLanding scrollToServicos={() => scrollToSection('servicos')} />
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <ContactSection />
        <Footer />
        <GlobalModals />
  
        <div
          className="whatsapp-fixed"
          onClick={() => window.open('https://wa.me/5511963551131', '_blank')}
        >
          <img src={whatsappLogo} alt="WhatsApp" className="whatsapp-icon" />
        </div>
      </div>
    );
  }  