import type { EventoHistorico } from '@/types/tutor';

interface TimelineHistoricoProps {
  eventos: EventoHistorico[];
}

export function TimelineHistorico({ eventos }: TimelineHistoricoProps) {
  const corTipo: Record<string, string> = {
    consulta: '#05334D',
    vacina: '#CC6E28',
  };

  if (!eventos || eventos.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">
        Nenhum evento histórico registrado ainda.
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-gray-200 pl-4">
      {eventos.map((evento, i) => (
        <div key={i} className="relative mb-6">
          {/* Ponto indicador */}
          <div
            className="absolute -left-1 top-1.5 h-3 w-3 rounded-full"
            style={{ backgroundColor: corTipo[evento.tipo] ?? '#8B947F' }}
          />

          <p className="text-sm text-gray-500">
            {evento.data ? new Date(evento.data).toLocaleDateString('pt-BR') : 'Data não informada'}
          </p>

          <p className="text-base font-medium text-[#05334D]">
            {evento.descricao || 'Sem descrição'}
          </p>

          {evento.anexo && (
            <a
              href={`http://localhost:8000${evento.anexo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm text-[#CC6E28] hover:underline"
            >
              Ver Anexo (PDF)
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
