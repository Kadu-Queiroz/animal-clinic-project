interface ConsultaCardProps {
  data_hora?: string;
  tipo?: string;
  status?: string;
  veterinario_nome?: string;
}

/**
 * Card informativo da próxima consulta.
 * Exibe data, hora, tipo, veterinário e status.
 * Se não houver consulta, mostra mensagem neutra.
 */
export function ConsultaCard({
  data_hora = '',
  tipo = 'Consulta',
  status = 'AGENDADA',
  veterinario_nome,
}: ConsultaCardProps) {
  let dataFormatada = 'Data inválida';
  let horaFormatada = '--:--';

  try {
    if (data_hora) {
      const dataObj = new Date(data_hora);
      if (!isNaN(dataObj.getTime())) {
        dataFormatada = dataObj.toLocaleDateString('pt-BR');
        horaFormatada = dataObj.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    }
  } catch {
    // ignora erros silenciosamente
  }

  const consultaValida = !!data_hora && status;

  return (
    <div className="rounded-lg border-l-4 border-[#CC6E28] bg-white p-6 shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-[#05334D]">Próxima Consulta</h2>

      {consultaValida ? (
        <>
          <p className="text-gray-600">
            {dataFormatada} às {horaFormatada}
          </p>

          <p className="font-medium text-[#05334D]">{tipo}</p>

          {veterinario_nome && (
            <p className="mt-1 text-sm text-gray-500">
              Veterinário: <span className="font-medium">{veterinario_nome}</span>
            </p>
          )}

          <p className="mt-1 text-sm text-gray-500">Status: {status}</p>
        </>
      ) : (
        <p className="text-sm text-gray-600">Nenhuma consulta agendada no momento.</p>
      )}
    </div>
  );
}
