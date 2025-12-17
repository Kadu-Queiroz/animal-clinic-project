interface ResumoAgendamentoProps {
  pet: string;
  servico: string;
  data: string; // YYYY-MM-DD
  slotStartAt: string; // ISO
  onBack?: () => void;
}

function formatHora(iso: string) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

export function ResumoAgendamento({
  pet,
  servico,
  data,
  slotStartAt,
  onBack,
}: ResumoAgendamentoProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold text-[#05334D]">Resumo do Agendamento</h3>
      <ul className="space-y-2 text-gray-700">
        <li>
          <strong>Pet:</strong> {pet}
        </li>
        <li>
          <strong>Serviço:</strong> {servico}
        </li>
        <li>
          <strong>Data:</strong> {data}
        </li>
        <li>
          <strong>Hora:</strong> {formatHora(slotStartAt)}
        </li>
      </ul>

      {onBack && (
        <div className="mt-6">
          <button
            onClick={onBack}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
