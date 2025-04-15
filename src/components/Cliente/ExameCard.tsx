interface ExameCardProps {
  pet: string;
  tipo: string;
  data: string;
  status: 'Disponível' | 'Em análise' | 'Aguardando coleta';
  anexo?: string;
}

export function ExameCard({ pet, tipo, data, status, anexo }: ExameCardProps) {
  const statusLabels: Record<ExameCardProps['status'], string> = {
    Disponível: 'text-green-600',
    'Em análise': 'text-yellow-600',
    'Aguardando coleta': 'text-gray-500',
  };

  const statusColor = statusLabels[status] || 'text-gray-400';
  const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      <img
        src="https://source.unsplash.com/600x300/?veterinary,medical"
        alt={`Imagem ilustrativa do exame ${tipo}`}
        className="h-40 w-full object-cover"
      />
      <div className="p-6">
        <h2 className="mb-2 text-lg font-semibold text-[#05334D]">{tipo}</h2>
        <p className="mb-1 text-sm text-gray-500">{pet}</p>
        <p className="mb-1 text-sm text-gray-600">Realizado em {dataFormatada}</p>

        <p className={`mb-4 text-sm font-medium ${statusColor}`}>
          {status || 'Status não disponível'}
        </p>

        <div className="flex justify-between gap-2">
          <button
            className="flex-1 rounded bg-[#05334D] px-4 py-2 text-white transition hover:bg-[#042736]"
            disabled={!anexo}
          >
            Visualizar
          </button>
          <button
            className="flex-1 rounded bg-[#CC6E28] px-4 py-2 text-white transition hover:bg-[#b55f22]"
            disabled={!anexo}
          >
            Baixar PDF
          </button>
        </div>
      </div>
    </div>
  );
}
