import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  Syringe,
  Stethoscope,
  Microscope,
  Scissors,
  Menu,
  Package,
  X,
  ChevronRight
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SobreNosModal } from './components/sobreNosModals';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Importe as imagens
import logoWhasapp from './assets/img/logos/logo_whatsapp.svg';
import logoIcon from './assets/img/logos/Logo_icon.png';
import logoIcon2 from './assets/img/logos/Logo_icon2.png';
import logoPrincipal2 from './assets/img/logos/logo_principal2.png';
import convenio1 from './assets/img/convenios/IMG_Anilife.png';
import convenio2 from './assets/img/convenios/IMG_DogLife.webp';
import convenio3 from './assets/img/convenios/IMG_DrPet.webp';
import convenio4 from './assets/img/convenios/IMG_AuHappy.png';
import convenio5 from './assets/img/convenios/IMG_Lifepet.webp';
import convenio6 from './assets/img/convenios/IMG_MIsterDog.webp';
import convenio7 from './assets/img/convenios/IMG_CartaoAmigao.png';
import convenio8 from './assets/img/convenios/IMG_Pelove.webp';
import convenio9 from './assets/img/convenios/IMG_PetMaisVida.webp';
import convenio10 from './assets/img/convenios/IMG_Pethealth.jpg';

<meta name="robots" content="noindex, nofollow"></meta>

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crie um objeto FormData com os dados do formulário
    const formDataToSend = new FormData(e.currentTarget as HTMLFormElement);
    formDataToSend.append("service_id", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    formDataToSend.append("template_id", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    formDataToSend.append("user_id", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send-form", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("E-mail enviado com sucesso!");
        alert("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorText = await response.text();
        console.error("Erro ao enviar e-mail:", errorText);
        alert("Erro ao enviar mensagem.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      alert("Erro ao enviar mensagem.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-[#002B3D] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2"
      >
        <span>Enviar Mensagem</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </form>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Função para rolar até a seção de serviços
  const scrollToServicos = () => {
    const servicosSection = document.getElementById("servicos");
    if (servicosSection) {
      servicosSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      title: "Consultas e Especialidades",
      icon: <Stethoscope className="w-12 h-12 text-[#002B3D]" />,
      items: ["Oftamologia", "Dermatologia", "Ortopedia", "Cardiologia", "Nutrição", "Gastroenterologia", "Endocrinologia", "Oncologia", "Felinos", "Silvestres e Exóticos"]
    },
    {
      title: "Cirurgias",
      icon: <Syringe className="w-12 h-12 text-[#002B3D]" />,
      items: ["Cirurgias Gerais","Oftamologicas", "Esplenectomia", "Colecistectomia", "Nodulectomia", "Mastectomia"]
    },
    {
      title: "Exames Clínicos",
      icon: <Microscope className="w-12 h-12 text-[#002B3D]" />,
      items: ["Ultrassom  abdominal, ocular e cervical","Ecodoplercardiograma","Eletrocardiograma","Radiografias"]
    },
    {
      title: "Demais Serviços",
      icon: <Package className="w-12 h-12 text-[#002B3D]" />,
      items: ["Vendas de Produtos e Acessórios", "Farmácia"]
    }
  ];

  const convenios = [
    convenio1,
    convenio2,
    convenio3,
    convenio4,
    convenio5,
    convenio6,
    convenio7,
    convenio8,
    convenio9,
    convenio10
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1548767797-d8c844163c4c",
      title: "Consulta Veterinária",
      category: "Atendimento"
    },
    {
      url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97",
      title: "Cirurgia",
      category: "Procedimentos"
    },
    {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
      title: "Felinos",
      category: "Especialidades"
    },
    {
      url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      title: "Exames",
      category: "Diagnóstico"
    },
    {
      url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      title: "Banho e Tosa",
      category: "Cuidados"
    },
    {
      url: "https://images.unsplash.com/photo-1587764379873-97837921fd44",
      title: "Farmácia",
      category: "Produtos"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="font-['Open_Sans']">
      {/* Header */}
      <header className="fixed w-full bg-[#002B3D] z-50 shadow-sm">
        <div className="container mx-auto px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
            <a href="#" className="focus:outline-none">
              <img
                src={logoPrincipal2} 
                alt="Toka dos Pets"
                className="h-20 md:h-20 lg:h-40"
              />
            </a>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#inicio" className="text-white hover:text-blue-200 transition">Início</a>
              <button
                onClick={() => setIsAboutModalOpen(true)}
                className="text-white hover:text-blue-200 transition"
              >
                Sobre Nós
              </button>
              <a href="#servicos" className="text-white hover:text-blue-200 transition">Serviços</a>
              <a href="#galeria" className="text-white hover:text-blue-200 transition">Galeria</a>
              <a href="#contato" className="text-white hover:text-blue-200 transition">Contato</a>
              <button className="bg-white text-[#002B3D] px-6 py-2 rounded-full hover:bg-blue-200 transition"
                onClick={() => window.open("https://wa.me/5511963551131", "_blank")}>
                Agende uma Consulta
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
{/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[#002B3D] border-t"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                <a href="#inicio" className="text-white hover:text-blue-200 transition text-left">
                  Início
                </a>
                <button
                  onClick={() => setIsAboutModalOpen(true)}
                  className="text-white hover:text-blue-200 transition text-left"
                >
                  Sobre Nós
                </button>
                <a href="#servicos" className="text-white hover:text-blue-200 transition text-left">
                  Serviços
                </a>
                <a href="#galeria" className="text-white hover:text-blue-200 transition text-left">
                  Galeria
                </a>
                <a href="#contato" className="text-white hover:text-blue-200 transition text-left">
                  Contato
                </a>
                <button
                  className="bg-white text-[#002B3D] px-6 py-2 rounded-full hover:bg-blue-200 transition w-full"
                  onClick={() => window.open("https://wa.me/5511963551131", "_blank")}
                >
                  Agende uma Consulta
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="min-h-screen flex items-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div> {/* Overlay para escurecer a imagem e melhorar a legibilidade do texto */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Título e descrição */}
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
                Onde o amor e a expertise se encontram!
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Cuidados excepcionais para cães, gatos e animais silvestres
              </p>
              <div className="flex gap-4">
                <motion.button
                  className="bg-[#002B3D] text-white px-8 py-3 rounded-full text-lg hover:bg-[#004B6B] transition cursor-pointer"
                  onClick={scrollToServicos}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Conheça Nossos Serviços
                </motion.button>
                <motion.button
                  className="border-2 border-white text-white px-8 py-3 rounded-full text-lg hover:bg-white hover:text-[#002B3D] transition cursor-pointer"
                  onClick={() => window.open("https://wa.me/5511963551131", "_blank")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Agende uma Consulta
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Convênios Carousel */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#002B3D]/20 backdrop-blur-sm py-4 md:py-8">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-white text-lg md:text-xl mb-4 md:mb-6">Convênios Aceitos</h3>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={2}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              className="convenios-carousel"
            >
              {convenios.map((convenio, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white/90 rounded-lg p-4 h-20 md:h-24 flex items-center justify-center backdrop-blur-sm">
                    <img src={convenio} alt={`Convênio ${index + 1}`} className="max-h-full" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 text-[#002B3D]">Nossos Serviços</h2>
            <div className="grid lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group"
                >
                  <div className="flex justify-center mb-6 transform group-hover:scale-110 transition">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4 text-[#002B3D]">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <ChevronRight className="w-4 h-4 text-[#002B3D] mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sessão Gallery */}
      <section id="galeria" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#002B3D]">Galeria</h2>

          {/* Gallery Grid with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
                    alt={image.title}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                  <p className="text-blue-200">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessão de contato */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#002B3D]">Entre em Contato</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Endereço</h3>
                      <p className="text-gray-600">Rua Cerro Corá, 569/577, Alto Pinheiros, São Paulo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Telefones</h3>
                      <p className="text-gray-600">(11) 3205-2390 | (11) 96355-1131</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">E-mail</h3>
                      <p className="text-gray-600">contato@tokadospets.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-[#002B3D] flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-1">Horário de Funcionamento</h3>
                      <p className="text-gray-600">Seg - Sáb: 8:00 am – 20:00 pm</p>
                      <p className="text-gray-600">Domingo: Fechado</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-[#002B3D]">Redes Sociais</h3>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/tokadospetsoficial" className="bg-[#002B3D] text-white p-3 rounded-full hover:bg-blue-900 transition">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/tokadospetsoficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className="bg-[#002B3D] text-white p-3 rounded-full hover:bg-blue-900 transition">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002B3D] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoIcon} alt="Toka dos Pets" className="h-16" />
              </div>
              <p className="text-blue-200">Cuidando com amor e expertise dos seus melhores amigos.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#inicio" className="text-blue-200 hover:text-white transition">Início</a></li>
                <li><a href="#sobre" className="text-blue-200 hover:text-white transition">Sobre Nós</a></li>
                <li><a href="#servicos" className="text-blue-200 hover:text-white transition">Serviços</a></li>
                <li><a href="#galeria" className="text-blue-200 hover:text-white transition">Galeria</a></li>
                <li><a href="#contato" className="text-blue-200 hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contato</h3>
              <ul className="space-y-2 text-blue-200">
                <li>Rua Cerro Corá, 569/577</li>
                <li>Alto Pinheiros, São Paulo</li>
                <li>(11) 3205-2390</li>
                <li>(11) 96355-1131</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Horário de Atendimento</h3>
              <ul className="space-y-2 text-blue-200">
                <li>Segunda a Sábado</li>
                <li>8:00 - 20:00</li>
                <li>Domingo</li>
                <li>Fechado</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            © 2025 Toka dos Pets. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <motion.a
        href="https://wa.me/5511963551131"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="p-1 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all">
          <img
            src={logoWhasapp}
            alt="WhatsApp"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20"
          />
        </div>
      </motion.a>
      {/* Modal "Sobre Nós" */}
      <SobreNosModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;