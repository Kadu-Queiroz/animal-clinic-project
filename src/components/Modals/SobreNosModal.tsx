import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { useModal } from '@/hooks/useModal';
import imgGuilhermeCugini from '@/assets/img/institucional/Staff/DrGuilhermeCugini.webp';

const professionals = [
  {
    name: 'Dr. Guilherme Cugini',
    role: 'Veterinário Chefe Oftamologia',
    image: imgGuilhermeCugini,
  },
  {
    name: 'Dra. Maria Oliveira',
    role: 'Cirurgiã Veterinária',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?fit=crop&w=300&h=300&q=80',
  },
  {
    name: 'Dr. Pedro Souza',
    role: 'Veterinário',
    image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?fit=crop&w=300&h=300&q=80',
  },
];

export function SobreNosModal() {
  const { modal, closeModal } = useModal();
  if (modal !== 'sobreNos') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-[#002B3D]">Sobre Nós</h2>
          <button onClick={closeModal} className="text-gray-600 transition hover:text-[#002B3D]">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-gray-600">
            Somos uma clínica veterinária dedicada ao cuidado e bem-estar dos seus animais de
            estimação. Nossa equipe de profissionais altamente qualificados está pronta para
            oferecer o melhor atendimento.
          </p>

          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              className="professionals-carousel"
            >
              {professionals.map((professional, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col items-center rounded-lg bg-gray-100 p-8 text-center">
                    <img
                      src={professional.image}
                      alt={professional.name}
                      className="mb-6 h-48 w-48 rounded-full object-cover"
                    />
                    <h3 className="text-2xl font-bold text-[#002B3D]">{professional.name}</h3>
                    <p className="text-lg text-gray-600">{professional.role}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-3 shadow-lg transition hover:bg-white">
              <ChevronLeft className="h-6 w-6 text-[#002B3D]" />
            </div>
            <div className="swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-3 shadow-lg transition hover:bg-white">
              <ChevronRight className="h-6 w-6 text-[#002B3D]" />
            </div>
          </div>
        </div>

        <div className="border-t p-6">
          <button
            onClick={closeModal}
            className="w-full rounded-lg bg-[#002B3D] px-6 py-3 text-white transition hover:bg-blue-900"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
