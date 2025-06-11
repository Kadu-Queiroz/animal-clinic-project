import { useEffect, useState } from 'react';
import type { PetData } from '@/types/tutor';
import { PetModal } from './Modals/PetModal';

export function PetCard(pet: PetData) {
  const [aberto, setAberto] = useState(false);

  const nascimentoFormatado = pet.data_nascimento
    ? new Date(pet.data_nascimento).toLocaleDateString('pt-BR')
    : 'Data não informada';

  const imagemPet = pet.foto ? `http://localhost:8000/uploads/${pet.foto}` : null;

  useEffect(() => {
    console.groupCollapsed(`[🐶 PetCard] Renderizando: ${pet.nome}`);
    if (!pet.foto) {
      console.warn(`[PetCard] Nenhuma foto disponível para ${pet.nome}`);
    } else {
      console.log(`[PetCard] Caminho original da foto: ${pet.foto}`);
      console.log(`[PetCard] URL final da imagem: ${imagemPet}`);
    }
    console.groupEnd();
  }, [pet.nome, pet.foto, imagemPet]);

  return (
    <>
      <div
        onClick={() => setAberto(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') setAberto(true);
        }}
        className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CC6E28]"
      >
        {imagemPet ? (
          <img
            src={imagemPet}
            alt={`Foto de ${pet.nome}`}
            className="h-48 w-full object-cover"
            onError={e => {
              console.error(`[PetCard] Erro ao carregar imagem de ${pet.nome}: ${imagemPet}`);
              (e.target as HTMLImageElement).src = '/img/fallback-pet.jpg';
            }}
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-red-100 text-sm text-red-700">
            Imagem não disponível
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#05334D]">{pet.nome}</h3>
          <p className="text-sm text-gray-500">
            {[pet.especie, pet.raca].filter(Boolean).join(' • ') || 'Informações não disponíveis'}
          </p>
          <p className="mt-1 text-sm text-[#8B947F]">
            {[pet.sexo, pet.cor, pet.pelagem].filter(Boolean).join(' • ') ||
              'Características não informadas'}
          </p>
          {pet.chip && <p className="mt-1 text-sm text-gray-400">Chip: {pet.chip}</p>}
          <p className="mt-1 text-sm text-gray-400">Nascimento: {nascimentoFormatado}</p>
        </div>
      </div>

      {/* Modal de Detalhes do Pet */}
      <PetModal pet={pet} aberto={aberto} onClose={() => setAberto(false)} />
    </>
  );
}
