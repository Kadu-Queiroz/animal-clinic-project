import { GalleryImage } from './GalleryImage';

export interface GalleryGridProps {
  images: {
    url: string;
    title: string;
    category: string;
  }[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <GalleryImage
          key={index}
          url={image.url}
          title={image.title}
          category={image.category}
        />
      ))}
    </div>
  );
}