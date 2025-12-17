import { useMemo, useState } from 'react';
import { CalendarPlus, RefreshCcw, XCircle } from 'lucide-react';

import { AgendamentoModal } from '@/components/Tutor/Modals/AgendamentoModal';
import { CancelarConsultaModal } from '@/components/Tutor/Modals/CancelarConsultaModal';
import type { ConsultaResumoTutor } from '@/types/tutor/consulta_tutor';

export interface GerenciarConsultasCardProps {
  proximaConsulta?: ConsultaResumoTutor;
  onAgendado?: () => void;
  onRemarcado?: () => void;
  onCancelado?: () => void; // opcional (se quiser separar do onRemarcado)
}

function podeRemarcar(prox?: ConsultaResumoTutor): boolean {
  if (!prox?.data_hora) return false;

  const st = (prox.status ?? '').toLowerCase();
  const okStatus = st === 'agendada' || st === 'reagendada';

  const quando = new Date(prox.data_hora).getTime();
  if (Number.isNaN(quando)) return false;

  return okStatus && quando - Date.now() >= 2 * 60 * 60 * 1000;
}

function podeCancelar(prox?: ConsultaResumoTutor): boolean {
  if (!prox?.id) return false;
  const st = (prox.status ?? '').toLowerCase();
  return st === 'agendada' || st === 'reagendada';
}

type ModoAgendamento = 'agendar' | 'remarcar';

export function GerenciarConsultasCard({
  proximaConsulta,
  onAgendado,
  onRemarcado,
  onCancelado,
}: GerenciarConsultasCardProps) {
  const [agendaModalOpen, setAgendaModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [modo, setModo] = useState<ModoAgendamento>('agendar');

  const remarcarHabilitado = useMemo(() => podeRemarcar(proximaConsulta), [proximaConsulta]);
  const cancelarHabilitado = useMemo(() => podeCancelar(proximaConsulta), [proximaConsulta]);

  const abrirAgendar = () => {
    setModo('agendar');
    setAgendaModalOpen(true);
  };

  const abrirRemarcar = () => {
    if (!remarcarHabilitado) return;
    setModo('remarcar');
    setAgendaModalOpen(true);
  };

  const abrirCancelar = () => {
    setCancelModalOpen(true);
  };

  const refetchGeral = () => {
    // se você já usa onRemarcado como "refetch dashboard", reaproveita.
    // se quiser separar, passa onCancelado também.
    onCancelado?.();
    onRemarcado?.();
    onAgendado?.();
  };

  return (
    <div className="rounded-lg border border-[#8B947F]/30 bg-white p-6 shadow-md">
      <h2 className="mb-2 text-lg font-semibold text-[#05334D]">Gerenciar Consultas</h2>
      <p className="mb-4 text-sm text-gray-600">
        Marque uma nova consulta, remarque ou cancele uma consulta.
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
          className={[
            'inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold shadow-sm transition focus:outline-none',
            remarcarHabilitado
              ? 'bg-[#05334D] text-white hover:opacity-90 focus:ring-2 focus:ring-[#05334D]'
              : 'cursor-not-allowed bg-gray-200 text-gray-500',
          ].join(' ')}
          title={
            !remarcarHabilitado ? 'Reagendamento indisponível nas últimas 2 horas.' : undefined
          }
        >
          <RefreshCcw size={18} className="mr-2" />
          Remarcar
        </button>

        <button
          type="button"
          onClick={abrirCancelar}
          disabled={!cancelarHabilitado}
          className={[
            'inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold shadow-sm transition focus:outline-none',
            cancelarHabilitado
              ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-600'
              : 'cursor-not-allowed bg-gray-200 text-gray-500',
          ].join(' ')}
          title={!cancelarHabilitado ? 'Não há consulta ativa para cancelar.' : undefined}
        >
          <XCircle size={18} className="mr-2" />
          Cancelar
        </button>
      </div>

      {/* Modal de Agendar/Remarcar */}
      <AgendamentoModal
        aberto={agendaModalOpen}
        onClose={() => setAgendaModalOpen(false)}
        onAgendado={() => {
          setAgendaModalOpen(false);
          if (modo === 'remarcar') onRemarcado?.();
          else onAgendado?.();
        }}
        modo={modo}
        consultaId={modo === 'remarcar' ? proximaConsulta?.id : undefined}
        animalId={modo === 'remarcar' ? (proximaConsulta?.animal_id ?? undefined) : undefined}
        dataHoraAtual={modo === 'remarcar' ? proximaConsulta?.data_hora : undefined}
      />

      {/* Modal de Cancelar (lista todas as consultas agendadas) */}
      <CancelarConsultaModal
        aberto={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        defaultConsultaId={proximaConsulta?.id}
        onCancelado={() => {
          setCancelModalOpen(false);
          // refetch do dashboard/cards
          refetchGeral();
        }}
      />
    </div>
  );
}
