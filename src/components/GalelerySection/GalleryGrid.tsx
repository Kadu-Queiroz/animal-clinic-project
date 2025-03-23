import { GalleryImage } from './GalleryImage';

interface GalleryGridProps {
  images: { url: string; title: string; category: string }[];
  onImageClick: (title: string) => void;
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <GalleryImage
          key={index}
          url={image.url}
          title={image.title}
          category={image.category}
          onClick={onImageClick}
        />
      ))}
    </div>
  );
}