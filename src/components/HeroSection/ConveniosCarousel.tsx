import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface ConveniosCarouselProps {
  convenios: string[];
}

export function ConveniosCarousel({ convenios }: ConveniosCarouselProps) {
  return (
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
  );
}