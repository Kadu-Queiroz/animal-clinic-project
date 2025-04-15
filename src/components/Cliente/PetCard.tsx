import type { PetData } from '@/types/dados-cliente';

export function PetCard({
  nome,
  especie,
  raca,
  sexo,
  cor,
  pelagem,
  chip,
  data_nascimento,
}: PetData) {
  const nascimentoFormatado = new Date(data_nascimento).toLocaleDateString('pt-BR');

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      {/* Imagem temporária, substituir por avatar ou foto real no futuro */}
      <img
        src="https://placekitten.com/400/200"
        alt={`Foto de ${nome}`}
        className="h-48 w-full object-cover"
      />
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
