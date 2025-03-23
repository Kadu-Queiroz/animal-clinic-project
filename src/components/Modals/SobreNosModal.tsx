import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

// Caminho relativo corrigido
import imgGuilhermeCugini from "@/assets/img/institucional/Staff/DrGuilhermeCugini.webp";

// Dados dos profissionais (exemplo)
const professionals = [
  {
    name: "Dr. Guilherme Cugini",
    role: "Veterinário Chefe Oftamologia",
    image: imgGuilhermeCugini,
  },
  {
    name: "Dra. Maria Oliveira",
    role: "Cirurgiã Veterinária",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
  },
  {
    name: "Dr. Pedro Souza",
    role: "Veterinário",
    image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb",
  },
];

interface SobreNosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SobreNosModal({ isOpen, onClose }: SobreNosModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-[#002B3D]">Sobre Nós</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-[#002B3D] transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Somos uma clínica veterinária dedicada ao cuidado e bem-estar dos seus animais de estimação. Nossa equipe de profissionais altamente qualificados está pronta para oferecer o melhor atendimento.
          </p>

          {/* Carrossel de Profissionais */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]} // Adicione Navigation
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              className="professionals-carousel"
            >
              {professionals.map((professional, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center text-center">
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="w-48 h-48 rounded-full object-cover mb-6" // Aumente o tamanho da imagem
                    />
                    <h3 className="text-2xl font-bold text-[#002B3D]">{professional.name}</h3>
                    <p className="text-gray-600 text-lg">{professional.role}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Setas de Navegação */}
            <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition">
              <ChevronLeft className="w-6 h-6 text-[#002B3D]" />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition">
              <ChevronRight className="w-6 h-6 text-[#002B3D]" />
            </div>
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="p-6 border-t">
          <button
            onClick={onClose}
            className="w-full bg-[#002B3D] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}