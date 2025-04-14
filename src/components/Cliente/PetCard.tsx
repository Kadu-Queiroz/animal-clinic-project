interface PetCardProps {
  nome: string;
  especie: string;
  raca: string;
  sexo: string;
  cor: string;
  pelagem: string;
  chip: string;
  data_nascimento: string;
}

export function PetCard({
  nome,
  especie,
  raca,
  sexo,
  cor,
  pelagem,
  chip,
  data_nascimento,
}: PetCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      {/* Como ainda não temos imagem no backend, podemos usar uma imagem genérica por enquanto */}
      <img
        src={`https://placekitten.com/400/200`} // você pode trocar por avatar dinâmico no futuro
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
        <p className="mt-1 text-sm text-gray-400">
          Nascimento: {new Date(data_nascimento).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
