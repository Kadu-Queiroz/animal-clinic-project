import { CalendarClock, Dog, Clipboard } from 'lucide-react';
import type { ConsultaResumoVet } from '@/types/intranet/consulta_intranet';
import { TituloSecao } from '@/Intranet/components/ui/typography/TituloSecao';

interface ListaConsultasResumoVetProps {
  consultas: ConsultaResumoVet[];
}

export function ListaConsultasResumoVet({ consultas }: ListaConsultasResumoVetProps) {
  return (
    <div className="p-4">
      <TituloSecao>Consultas Atribuídas</TituloSecao>

      {consultas.length === 0 ? (
        <p className="text-gray-500">Nenhuma consulta atribuída no momento.</p>
      ) : (
        <div className="space-y-4">
          {consultas.map(consulta => (
            <div key={consulta.id} className="rounded border border-gray-200 p-4 shadow-sm">
              <div className="mb-1 flex items-center gap-2 text-sm text-blue-600">
                <CalendarClock className="h-4 w-4" />
                <span>
                  {consulta.data} às {consulta.hora}
                </span>
              </div>
              <div className="text-sm text-gray-800">
                <div className="mb-1 flex items-center gap-2">
                  <Dog className="h-4 w-4 text-pink-600" />
                  <span>
                    {consulta.paciente.nome} ({consulta.paciente.especie})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clipboard className="h-4 w-4" />
                  <span>{consulta.procedimento}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
