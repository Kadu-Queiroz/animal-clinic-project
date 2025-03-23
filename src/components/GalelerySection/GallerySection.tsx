import { GalleryGrid } from './GalleryGrid';
import imgProdutos from '@/assets/img/institucional/galeria/produtos/IMG_Produtos.webp';

interface GallerySectionProps {
  onImageClick: (title: string) => void;
}

export function GallerySection({ onImageClick }: GallerySectionProps) {
  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c', title: 'Consulta Veterinária', category: 'Atendimento' },
    { url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97', title: 'Cirurgia', category: 'Procedimentos' },
    { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', title: 'Felinos', category: 'Especialidades' },
    { url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d', title: 'Exames', category: 'Diagnóstico' },
    { url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee', title: 'Adicionar algo', category: 'Não existe mais banho e tosa' },
    { url: imgProdutos, title: 'Farmácia', category: 'Produtos' },
  ];

  return (
    <section id="galeria" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#002B3D]">Galeria</h2>
        <GalleryGrid images={galleryImages} onImageClick={onImageClick} />
      </div>
    </section>
  );
}