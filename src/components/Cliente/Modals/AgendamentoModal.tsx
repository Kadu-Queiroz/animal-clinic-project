import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

import { EtapaPet } from '@/pages/Cliente/Agendar/components/EtapaPet';
import { EtapaServico } from '@/pages/Cliente/Agendar/components/EtapaServico';
import { EtapaDataHora } from '@/pages/Cliente/Agendar/components/EtapaDataHora';
import { EtapaConfirmacao } from '@/pages/Cliente/Agendar/components/EtapaConfirmacao';
import { agendamentoSchema, type AgendamentoData } from '@/pages/Cliente/Agendar/schema';
import { agendarConsultaTutor, reagendarConsulta } from '@/services/Cliente/tutor-service';

type ModoModal = 'agendar' | 'remarcar';

export interface AgendamentoModalProps {
  aberto: boolean;
  onClose: () => void;
  onAgendado?: () => void;
  modo?: ModoModal;
  consultaId?: number;
  animalId?: string | number;
  dataHoraAtual?: string;
}

function splitISOToDateHour(iso?: string) {
  if (!iso) return { data: '', hora: '' };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { data: '', hora: '' };
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return { data: `${yyyy}-${mm}-${dd}`, hora: `${hh}:${mi}:${ss}` };
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
    const { data, hora } = splitISOToDateHour(dataHoraAtual);
    return { pet: animalId ? String(animalId) : '', servico: '', data, hora };
  }, [animalId, dataHoraAtual]);

  const methods = useForm<AgendamentoData>({
    resolver: zodResolver(agendamentoSchema),
    mode: 'onChange',
    defaultValues,
  });

  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (aberto) {
      reset(defaultValues, { keepDefaultValues: true });
      setEtapa(1);
    }
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

      if (modo === 'remarcar' && consultaId) {
        const novaDataHora = `${data.data}T${data.hora}`;
        await reagendarConsulta(consultaId, novaDataHora, null, token);
        alert('Consulta remarcada com sucesso!');
      } else {
        await agendarConsultaTutor(token, {
          animal_id: Number(data.pet),
          data: data.data,
          hora: data.hora,
          servico: data.servico,
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
