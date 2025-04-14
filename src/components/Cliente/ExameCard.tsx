interface ExameCardProps {
    pet: string;
    tipo: string;
    data: string;
    status: 'Disponível' | 'Em análise' | 'Aguardando coleta' | string;

  }
  
  export function ExameCard({ pet, tipo, data, status }: ExameCardProps) {
    const statusColor = {
      'Disponível': 'text-green-600',
      'Em análise': 'text-yellow-600',
      'Aguardando coleta': 'text-gray-500',
    }[status];
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg">
        <h2 className="text-lg font-semibold text-[#05334D] mb-2">{tipo}</h2>
        <p className="text-sm text-gray-500 mb-1">{pet}</p>
        <p className="text-sm text-gray-600 mb-1">Realizado em {data}</p>
        
        {/* Status */}
        <p className={`text-sm font-medium mb-4 ${statusColor}`}>
          {status}
        </p>
  
        <div className="flex justify-between gap-2">
          <button className="flex-1 bg-[#05334D] text-white px-4 py-2 rounded hover:bg-[#042736] transition">
            Visualizar
          </button>
          <button className="flex-1 bg-[#CC6E28] text-white px-4 py-2 rounded hover:bg-[#b55f22] transition">
            Baixar PDF
          </button>
        </div>
      </div>
    );
  }  