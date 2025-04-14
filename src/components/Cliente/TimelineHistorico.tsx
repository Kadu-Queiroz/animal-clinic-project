import type { EventoHistorico } from "@/types/historico";

interface TimelineHistoricoProps {
  eventos: EventoHistorico[];
}

interface TimelineHistoricoProps {
  eventos: EventoHistorico[];
}

export function TimelineHistorico({ eventos }: TimelineHistoricoProps) {
  const corTipo = {
    consulta: "#05334D",
    vacina: "#CC6E28",
  };

  return (
    <div className="relative border-l-2 border-gray-200 pl-4">
      {eventos.map((evento, i) => (
        <div key={i} className="mb-6 relative">
          {/* Ponto indicador */}
          <div
            className="w-3 h-3 rounded-full absolute -left-1 top-1.5"
            style={{ backgroundColor: corTipo[evento.tipo] }}
          ></div>

          <p className="text-sm text-gray-500">{evento.data}</p>
          <p className="text-base font-medium text-[#05334D]">
            {evento.descricao}
          </p>

          {evento.anexo && (
            <a
              href={evento.anexo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#CC6E28] hover:underline mt-1 inline-block"
            >
              Ver Anexo (PDF)
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
