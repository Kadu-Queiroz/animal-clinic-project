interface GalleryImageProps {
  url: string;
  title: string;
  category: string;
  onClick: (title: string) => void;
}

export function GalleryImage({ url, title, category, onClick }: GalleryImageProps) {
  return (
    <div
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => onClick(title)}
    >
      {/* Imagem */}
      <img
        src={url}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Sombreado com textos sobrepostos */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-xs">{category}</p>
      </div>
    </div>
  );
}