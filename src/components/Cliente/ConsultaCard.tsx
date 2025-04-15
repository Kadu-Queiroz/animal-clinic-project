interface ConsultaCardProps {
  data_hora: string;
  tipo: string;
  status: string;
}

export function ConsultaCard({ data_hora, tipo, status }: ConsultaCardProps) {
  const dataObj = new Date(data_hora);
  const data = dataObj.toLocaleDateString('pt-BR');
  const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="rounded-lg border-l-4 border-[#CC6E28] bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-[#05334D]">Próxima Consulta</h2>
      <p className="text-gray-600">
        {data} às {hora}
      </p>
      <p className="font-medium">{tipo}</p>
      <p className="text-sm text-gray-500">Status: {status}</p>
      <button className="mt-4 rounded bg-[#CC6E28] px-4 py-2 text-white transition-colors hover:bg-[#b55f22]">
        Remarcar
      </button>
    </div>
  );
}
