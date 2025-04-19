import type { PetData } from '@/types/dados-cliente';
import { useEffect } from 'react';

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
  const nascimentoFormatado = new Date(data_nascimento).toLocaleDateString('pt-BR');
  const imagemPet = foto ? `http://localhost:8000${foto}` : undefined;

  // 🔎 Log diagnóstico
  useEffect(() => {
    console.log(`[PetCard] Renderizando pet: ${nome}`);
    console.log(`[PetCard] Caminho da imagem:`, imagemPet);
  }, [nome, imagemPet]);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      {imagemPet ? (
        <img
          src={imagemPet}
          alt={`Foto de ${nome}`}
          className="h-48 w-full object-cover"
          onError={() =>
            console.error(`[PetCard] Erro ao carregar imagem de ${nome}: ${imagemPet}`)
          }
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-red-100 text-sm text-red-700">
          Imagem não definida
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#05334D]">{nome}</h3>
        <p className="text-sm text-gray-500">
          {especie} • {raca}
        </p>
        <p className="mt-1 text-sm text-[#8B947F]">
          {sexo} • {cor} • {pelagem}
        </p>
        <p className="mt-1 text-sm text-gray-400">Chip: {chip}</p>
        <p className="mt-1 text-sm text-gray-400">Nascimento: {nascimentoFormatado}</p>
      </div>
    </div>
  );
}
