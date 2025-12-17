import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

import { EtapaPet } from '@/pages/Tutor/Agendar/components/EtapaPet';
import { EtapaServico } from '@/pages/Tutor/Agendar/components/EtapaServico';
import { EtapaDataHora } from '@/pages/Tutor/Agendar/components/EtapaDataHora';
import { EtapaConfirmacao } from '@/pages/Tutor/Agendar/components/EtapaConfirmacao';
import { agendamentoSchema, type AgendamentoData } from '@/pages/Tutor/Agendar/schema';
import { agendarConsultaTutor, reagendarConsulta } from '@/services/Tutor/tutor-service';

type ModoModal = 'agendar' | 'remarcar';

export interface AgendamentoModalProps {
  aberto: boolean;
  onClose: () => void;
  onAgendado?: () => void;
  modo?: ModoModal;
  consultaId?: number;
  animalId?: string | number;
  dataHoraAtual?: string; // ISO datetime
}

function toISODate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function addMinutesIso(iso: string, minutes: number): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  d.setMinutes(d.getMinutes() + minutes);
  // mantém ISO sem timezone (YYYY-MM-DDTHH:mm:ss)
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}`;
}

export function AgendamentoModal({
  aberto,
  onClose,
  onAgendado,
  modo = 'agendar',
  consultaId,
  animalId,
  dataHoraAtual,
}: AgendamentoModalProps) {
  const defaultValues = useMemo<AgendamentoData>(() => {
    const start = dataHoraAtual ? addMinutesIso(dataHoraAtual, 0) : '';
    const end = start ? addMinutesIso(start, 30) : '';
    const data = dataHoraAtual ? toISODate(dataHoraAtual) : '';

    return {
      pet: animalId ? String(animalId) : '',
      servico: '',
      data,
      slot_start_at: start,
      slot_end_at: end,
    };
  }, [animalId, dataHoraAtual]);

  const methods = useForm<AgendamentoData>({
    resolver: zodResolver(agendamentoSchema),
    mode: 'onChange',
    defaultValues,
    shouldUnregister: false,
  });

  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, reset, register } = methods;

  useEffect(() => {
    if (!aberto) return;
    reset(defaultValues, { keepDefaultValues: true });
    setEtapa(1);
  }, [aberto, defaultValues, reset]);

  const avancar = () => setEtapa(v => Math.min(v + 1, 4));
  const voltar = () => setEtapa(v => Math.max(v - 1, 1));

  const onSubmit = async (data: AgendamentoData) => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        alert('Sessão expirada. Faça login novamente.');
        return;
      }

      const animal_id = Number(data.pet);
      if (Number.isNaN(animal_id) || animal_id <= 0) {
        alert('Pet inválido.');
        return;
      }

      if (!data.slot_start_at || !data.slot_end_at) {
        alert('Selecione um horário.');
        return;
      }

      if (modo === 'remarcar' && consultaId) {
        await reagendarConsulta(consultaId, data.slot_start_at, null, token);
        alert('Consulta remarcada com sucesso!');
      } else {
        // TODO produção: vetId real (seleção / backend).
        const veterinario_id = 1;

        await agendarConsultaTutor(token, {
          animal_id,
          veterinario_id,
          start_at: data.slot_start_at,
          end_at: data.slot_end_at,
          procedimento: data.servico,
        });

        alert('Consulta agendada com sucesso!');
      }

      reset();
      setEtapa(1);
      onAgendado?.();
      onClose();
    } catch (err) {
      console.error('[AGENDAR/REMARCAR] erro', err);
      alert('Não foi possível concluir a operação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const titulo = modo === 'remarcar' ? 'Remarcar Consulta' : 'Agendamento de Consulta';

  return (
    <Dialog open={aberto} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <DialogTitle className="text-xl font-bold text-[#05334D]">{titulo}</DialogTitle>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* registra campos do wizard (evita undefined no submit) */}
              <input type="hidden" {...register('pet')} />
              <input type="hidden" {...register('servico')} />
              <input type="hidden" {...register('data')} />
              <input type="hidden" {...register('slot_start_at')} />
              <input type="hidden" {...register('slot_end_at')} />

              {etapa === 1 && <EtapaPet onNext={avancar} />}
              {etapa === 2 && <EtapaServico onNext={avancar} onBack={voltar} />}
              {etapa === 3 && <EtapaDataHora onNext={avancar} onBack={voltar} />}
              {etapa === 4 && <EtapaConfirmacao onBack={voltar} loading={loading} />}
            </form>
          </FormProvider>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
