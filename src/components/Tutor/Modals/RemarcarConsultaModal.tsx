import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EtapaDataHora } from '@/pages/Cliente/Agendar/components/EtapaDataHora';
import { useAuth } from '@/context/useAuth';
import { buscarConsultasDoTutor, reagendarConsulta } from '@/services/Tutor/tutor-service';
import type { ConsultaResumoTutor } from '@/types/tutor/consulta_tutor';

const schema = z.object({
  data: z.string().min(1, 'Escolha uma data'),
  hora: z.string().min(1, 'Escolha um horário'),
});
type RemarcarData = z.infer<typeof schema>;

type RemarcarConsultaModalProps = {
  aberto: boolean;
  onClose: () => void;
  onRemarcado?: () => void;
  consultaIdOpcional?: number; // se vier, já pré-seleciona
};

const STATUS_VALIDOS = new Set(['agendada', 'reagendada']);

export function RemarcarConsultaModal({
  aberto,
  onClose,
  onRemarcado,
  consultaIdOpcional,
}: RemarcarConsultaModalProps) {
  const { token } = useAuth();
  const [etapa, setEtapa] = useState(1);
  const [loading, setLoading] = useState(false);
  const [consultas, setConsultas] = useState<ConsultaResumoTutor[]>([]);
  const [selecionada, setSelecionada] = useState<number | undefined>(consultaIdOpcional);

  const methods = useForm<RemarcarData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { data: '', hora: '' },
  });

  useEffect(() => {
    if (!aberto || !token) return;

    (async () => {
      try {
        const lista = await buscarConsultasDoTutor(token); // escopo padrão: futuras (ordenadas ASC)
        const filtradas = (lista ?? []).filter(c =>
          STATUS_VALIDOS.has((c.status || '').toLowerCase()),
        );
        setConsultas(filtradas);

        // se veio um id externo e ele existe na lista
        if (consultaIdOpcional && filtradas.some(c => c.id === consultaIdOpcional)) {
          setSelecionada(consultaIdOpcional);
        } else if (!consultaIdOpcional && filtradas.length > 0) {
          setSelecionada(filtradas[0].id);
        }

        setEtapa(1);
        methods.reset({ data: '', hora: '' }, { keepDefaultValues: false });
      } catch (e) {
        console.error('[REMARCAR] erro ao carregar consultas futuras', e);
      }
    })();
  }, [aberto, token, consultaIdOpcional, methods]);

  const consultaAtual = useMemo(
    () => consultas.find(c => c.id === selecionada),
    [consultas, selecionada],
  );

  const avancar = () => setEtapa(prev => Math.min(prev + 1, 3));
  const voltar = () => setEtapa(prev => Math.max(prev - 1, 1));

  const confirmar = methods.handleSubmit(async ({ data, hora }) => {
    if (!token || !consultaAtual) return;
    try {
      setLoading(true);
      const novaDataHora = `${data}T${hora}`;
      await reagendarConsulta(consultaAtual.id, novaDataHora, null, token);
      alert('Consulta remarcada com sucesso!');
      onRemarcado?.();
      onClose();
    } catch (e) {
      console.error('[REMARCAR] falha ao reagendar', e);
      alert('Não foi possível remarcar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <Dialog open={aberto} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <DialogTitle className="text-xl font-bold text-[#05334D]">
              Remarcar Consulta
            </DialogTitle>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>

          {/* Etapa 1: escolher qual consulta remarcar */}
          {etapa === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Selecione a consulta que deseja remarcar (apenas futuras).
              </p>

              <select
                value={selecionada ?? ''}
                onChange={e => setSelecionada(Number(e.target.value))}
                className="w-full rounded border border-gray-300 p-2 text-[#05334D]"
              >
                {consultas.length === 0 && <option value="">Nenhuma consulta futura</option>}
                {consultas.map(c => {
                  const data = new Date(c.data_hora);
                  const dataFmt = isNaN(data.getTime())
                    ? c.data_hora
                    : data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
                  const label = `${c.pet ?? 'Pet'} • ${c.tipo ?? 'Consulta'} • ${dataFmt}`;
                  return (
                    <option key={c.id} value={c.id}>
                      {label}
                    </option>
                  );
                })}
              </select>

              {consultaAtual && (
                <div className="rounded border border-[#8B947F]/30 bg-white p-3 text-sm text-[#05334D]">
                  <div>
                    <strong>Pet:</strong> {consultaAtual.pet ?? '—'}
                  </div>
                  <div>
                    <strong>Serviço:</strong> {consultaAtual.tipo ?? 'Consulta'}
                  </div>
                  <div>
                    <strong>Veterinário:</strong> {consultaAtual.veterinario_nome ?? 'N/D'}
                  </div>
                  <div>
                    <strong>Status:</strong> {consultaAtual.status}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => consultaAtual && avancar()}
                  disabled={!consultaAtual}
                  className="rounded bg-[#F37021] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {/* Etapa 2: escolher nova data/hora (reuso do calendário/horas) */}
          {etapa === 2 && (
            <FormProvider {...methods}>
              <div className="space-y-6">
                <EtapaDataHora onNext={avancar} onBack={voltar} />
              </div>
            </FormProvider>
          )}

          {/* Etapa 3: confirmar */}
          {etapa === 3 && (
            <FormProvider {...methods}>
              <form onSubmit={confirmar} className="space-y-4">
                <div className="rounded border border-[#8B947F]/30 bg-white p-3 text-sm text-[#05334D]">
                  <p className="font-medium">Confirmar novo horário</p>
                  <p className="text-gray-600">
                    Revise a data e horário selecionados antes de confirmar.
                  </p>
                </div>

                <div className="mt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={voltar}
                    className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded bg-[#CC6E28] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {loading ? 'Remarcando...' : 'Confirmar'}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
