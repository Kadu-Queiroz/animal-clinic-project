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
    <div className="convenios-wrapper">
      <div className="convenios-container">
        
        {/* TÍTULO CENTRALIZADO COM ANIMAÇÃO */}
        <h3 className="convenios-title">
          Convênios Aceitos
        </h3>

        <div className="convenios-carousel-container">
          
          {/* BOTÃO ANTERIOR */}
          <button 
            className="convenios-button convenios-prev -left-12"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[#002B3D]" />
          </button>

          {/* SWIPER */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            autoplay={{ 
              delay: 3000, 
              pauseOnMouseEnter: true,
              disableOnInteraction: false 
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            navigation={{
              nextEl: '.convenios-next',
              prevEl: '.convenios-prev',
            }}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3, spaceBetween: 24 },
              768: { slidesPerView: 4, spaceBetween: 28 },
              1024: { slidesPerView: 5, spaceBetween: 32 }
            }}
            className="convenios-carousel"
          >
            {convenios.map((convenio, index) => (
              <SwiperSlide key={index} className="w-auto px-4 md:px-6">
                <div className="convenios-slide">
                  <img
                    src={convenio}
                    alt={`Convênio ${index + 1}`}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain w-auto h-auto"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* BOTÃO PRÓXIMO */}
          <button 
            className="convenios-button convenios-next -right-12"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-6 h-6 text-[#002B3D]" />
          </button>
        </div>
      </div>
    </div>
  );
}