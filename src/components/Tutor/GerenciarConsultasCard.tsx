import { useMemo, useState } from 'react';
import { CalendarPlus, RefreshCcw } from 'lucide-react';
import { AgendamentoModal } from '@/components/Tutor/Modals/AgendamentoModal';
import type { ConsultaResumoTutor } from '@/types/tutor/consulta_tutor';

export interface GerenciarConsultasCardProps {
  proximaConsulta?: ConsultaResumoTutor;
  onAgendado?: () => void; // refetch após novo agendamento
  onRemarcado?: () => void; // refetch após remarcação
}

function podeRemarcar(prox?: ConsultaResumoTutor): boolean {
  if (!prox?.data_hora) return false;
  const st = (prox.status || '').toLowerCase();
  const ok = st === 'agendada' || st === 'reagendada';
  const quando = new Date(prox.data_hora).getTime();
  if (Number.isNaN(quando)) return false;
  return ok && quando - Date.now() >= 2 * 60 * 60 * 1000;
}

export function GerenciarConsultasCard({
  proximaConsulta,
  onAgendado,
  onRemarcado,
}: GerenciarConsultasCardProps) {
  const [aberto, setAberto] = useState(false);
  const [modo, setModo] = useState<'agendar' | 'remarcar'>('agendar');

  const remarcarHabilitado = useMemo(() => podeRemarcar(proximaConsulta), [proximaConsulta]);

  const abrirAgendar = () => {
    setModo('agendar');
    setAberto(true);
  };

  const abrirRemarcar = () => {
    if (!remarcarHabilitado) return;
    setModo('remarcar');
    setAberto(true);
  };

  return (
    <div className="rounded-lg border border-[#8B947F]/30 bg-white p-6 shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-[#05334D]">Gerenciar Consultas</h2>
      <p className="mb-4 text-sm text-gray-600">
        Marque uma nova consulta ou mude um horário existente.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={abrirAgendar}
          className="inline-flex items-center justify-center rounded-md bg-[#CC6E28] px-4 py-2 font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#CC6E28]"
        >
          <CalendarPlus size={18} className="mr-2" />
          Agendar consulta
        </button>

        <button
          type="button"
          onClick={abrirRemarcar}
          disabled={!remarcarHabilitado}
          className={
            'inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold shadow-sm transition focus:outline-none ' +
            (remarcarHabilitado
              ? 'bg-[#05334D] text-white hover:opacity-90 focus:ring-2 focus:ring-[#05334D]'
              : 'cursor-not-allowed bg-gray-200 text-gray-500')
          }
          title={
            !remarcarHabilitado ? 'Reagendamento indisponível nas últimas 2 horas.' : undefined
          }
        >
          <RefreshCcw size={18} className="mr-2" />
          Remarcar
        </button>
      </div>

      <AgendamentoModal
        aberto={aberto}
        onClose={() => setAberto(false)}
        onAgendado={() => {
          setAberto(false);
          if (modo === 'remarcar') onRemarcado?.();
          else onAgendado?.();
        }}
        modo={modo}
        consultaId={modo === 'remarcar' ? proximaConsulta?.id : undefined}
        animalId={modo === 'remarcar' ? proximaConsulta?.animal_id : undefined}
        dataHoraAtual={modo === 'remarcar' ? proximaConsulta?.data_hora : undefined}
      />
    </div>
  );
}
