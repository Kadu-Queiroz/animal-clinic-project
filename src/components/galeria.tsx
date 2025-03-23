import { motion } from 'framer-motion';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
}

interface GaleriaProps {
  images: GalleryImage[];
  onImageClick: (title: string) => void;
}

export function Galeria({ images, onImageClick }: GaleriaProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative group overflow-hidden rounded-xl cursor-pointer"
          onClick={() => onImageClick(image.title)}
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
              alt={image.title}
              className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
            />
          </div>
          {/* Overlay sempre visível */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white text-xl font-bold">{image.title}</h3>
            <p className="text-blue-200">{image.category}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}