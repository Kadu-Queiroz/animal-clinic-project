import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { ConsultaResumoTutor } from '@/types/tutor/consulta_tutor';
import { buscarConsultasDoTutor, cancelarConsulta } from '@/services/Tutor/tutor-service';

type Props = {
  aberto: boolean;
  onClose: () => void;
  onCancelado?: () => void;
  defaultConsultaId?: number;
};

function isCancelavel(status?: string | null): boolean {
  const st = (status ?? '').toLowerCase();
  return st === 'agendada' || st === 'reagendada';
}

function safeDate(iso?: string | null): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function labelPet(c: ConsultaResumoTutor): string {
  return c.animal?.nome ?? c.pet ?? `Pet #${c.animal_id ?? '?'}`;
}

function labelProcedimento(c: ConsultaResumoTutor): string {
  return c.procedimento ?? c.tipo ?? 'consulta';
}

export function CancelarConsultaModal({ aberto, onClose, onCancelado, defaultConsultaId }: Props) {
  const [loading, setLoading] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [consultas, setConsultas] = useState<ConsultaResumoTutor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [confirmar, setConfirmar] = useState(false);

  const consultasCancelaveis = useMemo(() => {
    return (consultas ?? [])
      .filter(c => isCancelavel(c.status))
      .sort((a, b) => (a.data_hora ?? '').localeCompare(b.data_hora ?? ''));
  }, [consultas]);

  const selecionada = useMemo(() => {
    if (!selectedId) return null;
    return consultasCancelaveis.find(c => c.id === selectedId) ?? null;
  }, [consultasCancelaveis, selectedId]);

  useEffect(() => {
    if (!aberto) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setConsultas([]);
      setSelectedId(null);
      setConfirmar(false);
      return;
    }

    setLoading(true);
    setConfirmar(false);

    buscarConsultasDoTutor(token)
      .then(list => {
        setConsultas(list ?? []);
        const initial =
          (defaultConsultaId && list?.some(c => c.id === defaultConsultaId) && defaultConsultaId) ||
          (list?.find(c => isCancelavel(c.status))?.id ?? null);
        setSelectedId(initial);
      })
      .catch(() => {
        setConsultas([]);
        setSelectedId(null);
      })
      .finally(() => setLoading(false));
  }, [aberto, defaultConsultaId]);

  const fechar = () => {
    setConfirmar(false);
    onClose();
  };

  const confirmarCancelamento = async () => {
    if (!selectedId) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Sessão expirada. Faça login novamente.');
      return;
    }

    try {
      setCancelando(true);
      await cancelarConsulta(token, selectedId);
      alert('Consulta cancelada com sucesso!');
      setConfirmar(false);
      onCancelado?.();
      fechar();
    } catch (err) {
      console.error('[CANCELAR] erro:', err);
      alert('Não foi possível cancelar. Tente novamente.');
    } finally {
      setCancelando(false);
    }
  };

  return (
    <Dialog open={aberto} onClose={fechar} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-start justify-between">
            <DialogTitle className="text-xl font-bold text-[#05334D]">
              Cancelar consulta
            </DialogTitle>

            <button type="button" onClick={fechar} className="text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>

          {loading && <p className="text-sm text-gray-500">Carregando consultas...</p>}

          {!loading && consultasCancelaveis.length === 0 && (
            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-700">
                Você não tem consultas agendadas para cancelar no momento.
              </p>
            </div>
          )}

          {!loading && consultasCancelaveis.length > 0 && (
            <>
              <div className="space-y-2">
                {consultasCancelaveis.map(c => {
                  const d = safeDate(c.data_hora);
                  const dataLabel = d ? format(d, 'dd/MM/yyyy', { locale: ptBR }) : '—';
                  const horaLabel = d ? format(d, 'HH:mm') : '—';

                  return (
                    <label
                      key={c.id}
                      className={[
                        'flex cursor-pointer items-start gap-3 rounded-md border p-3 transition',
                        selectedId === c.id ? 'border-[#F37021] bg-[#FCE9D8]' : 'border-gray-200',
                      ].join(' ')}
                    >
                      <input
                        type="radio"
                        name="consulta_cancelar"
                        className="mt-1"
                        checked={selectedId === c.id}
                        onChange={() => {
                          setSelectedId(c.id);
                          setConfirmar(false);
                        }}
                      />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-[#05334D]">
                            {dataLabel} às {horaLabel}
                          </span>
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                            {labelProcedimento(c)}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-gray-700">
                          <span className="font-medium">Pet:</span> {labelPet(c)}
                        </p>

                        {c.veterinario_nome && (
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Veterinário:</span> {c.veterinario_nome}
                          </p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={fechar}
                  className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Voltar
                </button>

                {!confirmar ? (
                  <button
                    type="button"
                    disabled={!selectedId}
                    onClick={() => setConfirmar(true)}
                    className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Cancelar consulta
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!selectedId || cancelando || !selecionada}
                    onClick={confirmarCancelamento}
                    className="inline-flex items-center justify-center rounded-md bg-red-700 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {cancelando ? 'Cancelando...' : 'Confirmar cancelamento'}
                  </button>
                )}
              </div>

              {confirmar && selecionada && (
                <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  Você está prestes a cancelar a consulta de <b>{labelPet(selecionada)}</b> em{' '}
                  <b>{selecionada.data_hora?.slice(0, 16).replace('T', ' ')}</b>.
                </div>
              )}
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
