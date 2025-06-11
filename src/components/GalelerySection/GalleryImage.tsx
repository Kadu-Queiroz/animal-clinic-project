import { useModal } from '@/hooks/shared/useModal';

interface GalleryImageProps {
  url: string;
  title: string;
  category: string;
}

export function GalleryImage({ url, title, category }: GalleryImageProps) {
  const { openModal } = useModal();

  const handleClick = () => {
    if (title === 'Farmácia') {
      openModal('produtos');
    }
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
      onClick={handleClick}
    >
      <img
        src={url}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-xs opacity-90">{category}</p>
      </div>
    </div>
  );
}
