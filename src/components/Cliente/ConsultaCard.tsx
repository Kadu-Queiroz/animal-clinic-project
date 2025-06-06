interface ConsultaCardProps {
  data_hora?: string;
  tipo?: string;
  status?: string;
  veterinario_nome?: string;
}

export function ConsultaCard({
  data_hora = '',
  tipo = 'Consulta',
  status = 'agendada',
  veterinario_nome,
}: ConsultaCardProps) {
  let data = 'Data inválida';
  let hora = '--:--';

  try {
    if (data_hora) {
      const dataObj = new Date(data_hora);
      if (!isNaN(dataObj.getTime())) {
        data = dataObj.toLocaleDateString('pt-BR');
        hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      }
    }
  } catch {
    // silenciosamente ignora e usa os valores padrão
  }

  return (
    <div className="rounded-lg border-l-4 border-[#CC6E28] bg-white p-6 shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-[#05334D]">Próxima Consulta</h2>

      <p className="text-gray-600">
        {data} às {hora}
      </p>
      <p className="font-medium text-[#05334D]">{tipo}</p>

      {veterinario_nome && (
        <p className="mt-1 text-sm text-gray-500">
          Veterinário: <span className="font-medium">{veterinario_nome}</span>
        </p>
      )}

      <p className="mt-1 text-sm text-gray-500">Status: {status}</p>

      <button className="mt-4 w-full rounded bg-[#CC6E28] px-4 py-2 text-white transition-colors hover:bg-[#b55f22]">
        Remarcar
      </button>
    </div>
  );
}
