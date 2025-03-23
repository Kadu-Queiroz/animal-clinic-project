import { HeroContent } from './HeroContent';
import { ConveniosCarousel } from './ConveniosCarousel';

import convenio1 from '@/assets/img/convenios/IMG_Anilife.png';
import convenio2 from '@/assets/img/convenios/IMG_DogLife.webp';
import convenio3 from '@/assets/img/convenios/IMG_DrPet.webp';
import convenio4 from '@/assets/img/convenios/IMG_AuHappy.png';
import convenio5 from '@/assets/img/convenios/IMG_Lifepet.webp';
import convenio6 from '@/assets/img/convenios/IMG_MIsterDog.webp';
import convenio7 from '@/assets/img/convenios/IMG_CartaoAmigao.png';
import convenio8 from '@/assets/img/convenios/IMG_Pelove.webp';
import convenio9 from '@/assets/img/convenios/IMG_PetMaisVida.webp';
import convenio10 from '@/assets/img/convenios/IMG_Pethealth.jpg';

export function HeroSection() {
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
    convenio10,
  ];

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
        </div>
      </div>
      <ConveniosCarousel convenios={convenios} />
    </section>
  );
}