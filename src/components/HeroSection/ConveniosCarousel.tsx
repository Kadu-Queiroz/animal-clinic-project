import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

interface ConveniosCarouselProps {
  convenios: string[];
}

export function ConveniosCarousel({ convenios }: ConveniosCarouselProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#002B3D]/20 backdrop-blur-sm py-4 md:py-8">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-white text-lg md:text-xl mb-4 md:mb-6">Convênios Aceitos</h3>
        
        {/* Container do Carrossel com Setas Externas */}
        <div className="relative">
          {/* Seta Esquerda */}
          <button className="swiper-button-prev hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-10 h-10 items-center justify-center shadow-lg hover:bg-white transition-all z-10">
            <ChevronLeft className="w-6 h-6 text-[#002B3D]" />
          </button>

          {/* Carrossel */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={2}
            autoplay={{ delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="convenios-carousel"
          >
            {convenios.map((convenio, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white/90 rounded-lg p-4 h-32 md:h-40 flex items-center justify-center backdrop-blur-sm">
                  <img
                    src={convenio}
                    alt={`Convênio ${index + 1}`}
                    className="w-full h-full object-contain" // Ajuste para ocupar o card
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Seta Direita */}
          <button className="swiper-button-next hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-10 h-10 items-center justify-center shadow-lg hover:bg-white transition-all z-10">
            <ChevronRight className="w-6 h-6 text-[#002B3D]" />
          </button>
        </div>
      </div>
    </div>
  );
}