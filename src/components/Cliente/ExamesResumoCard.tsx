interface ExamesResumoCardProps {
  count: number;
}

export function ExamesResumoCard({ count }: ExamesResumoCardProps) {
  const texto = count === 1 ? '1 exame' : `${count} exames`;

  return (
    <div className="flex h-full flex-col justify-between rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#05334D]">Resultados Pendentes</h2>
        <span className="rounded-full bg-[#8B947F] px-3 py-1 text-sm text-white">{texto}</span>
      </div>
      <button className="w-full rounded bg-[#05334D] px-4 py-2 text-white transition-colors hover:bg-[#042736]">
        Ver Exames
      </button>
    </div>
  );
}
