interface PetCardProps {
    name: string;
    type: string;
    status: string;
    image: string;
  }
  
  export function PetCard({ name, type, status, image }: PetCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
        <img src={image} alt={`Foto de ${name}`} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-[#05334D] text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{type}</p>
          <p className="text-sm mt-2 text-[#8B947F]">{status}</p>
        </div>
      </div>
    );
  }  