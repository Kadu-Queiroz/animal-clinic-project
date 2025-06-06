import { useEffect } from 'react';
import type { PetData } from '@/types/tutor';

export function PetCard({
  nome,
  especie,
  raca,
  sexo,
  cor,
  pelagem,
  chip,
  data_nascimento,
  foto,
}: PetData) {
  const nascimentoFormatado = data_nascimento
    ? new Date(data_nascimento).toLocaleDateString('pt-BR')
    : 'Data não informada';

  const imagemPet = foto ? `http://localhost:8000/uploads/${foto}` : null;

  useEffect(() => {
    console.groupCollapsed(`[🐶 PetCard] Renderizando: ${nome}`);
    if (!foto) {
      console.warn(`[PetCard] Nenhuma foto disponível para ${nome}`);
    } else {
      console.log(`[PetCard] Caminho original da foto: ${foto}`);
      console.log(`[PetCard] URL final da imagem: ${imagemPet}`);
    }
    console.groupEnd();
  }, [nome, foto, imagemPet]);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      {imagemPet ? (
        <img
          src={imagemPet}
          alt={`Foto de ${nome}`}
          className="h-48 w-full object-cover"
          onError={e => {
            console.error(`[PetCard] Erro ao carregar imagem de ${nome}: ${imagemPet}`);
            (e.target as HTMLImageElement).src = '/img/fallback-pet.jpg'; // Fallback genérico opcional
          }}
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-red-100 text-sm text-red-700">
          Imagem não disponível
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#05334D]">{nome}</h3>
        <p className="text-sm text-gray-500">
          {[especie, raca].filter(Boolean).join(' • ') || 'Informações não disponíveis'}
        </p>
        <p className="mt-1 text-sm text-[#8B947F]">
          {[sexo, cor, pelagem].filter(Boolean).join(' • ') || 'Características não informadas'}
        </p>
        {chip && <p className="mt-1 text-sm text-gray-400">Chip: {chip}</p>}
        <p className="mt-1 text-sm text-gray-400">Nascimento: {nascimentoFormatado}</p>
      </div>
    </div>
  );
}
