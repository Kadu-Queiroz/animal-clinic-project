interface GalleryImageProps {
  url: string;
  title: string;
  category: string;
  onClick: (title: string) => void;
}

export function GalleryImage({ url, title, category, onClick }: GalleryImageProps) {
  return (
    <div
      className="relative group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]"
      onClick={() => onClick(title)}
    >
      <img
        src={url}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
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