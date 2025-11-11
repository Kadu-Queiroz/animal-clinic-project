import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  buscarHorariosDisponiveis,
  type HorarioDisponivelDTO,
} from '@/services/Cliente/tutor-service';
import type { AgendamentoData } from '@/pages/Cliente/Agendar/schema';

interface EtapaDataHoraProps {
  onNext: () => void;
  onBack: () => void;
}

export function EtapaDataHora({ onNext, onBack }: EtapaDataHoraProps) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<AgendamentoData>();
  const token = localStorage.getItem('token') || '';

  const [currentMonth, setCurrentMonth] = useState<Date>(startOfToday());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [horarios, setHorarios] = useState<HorarioDisponivelDTO[]>([]);
  const [selectedHorarioId, setSelectedHorarioId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const hoje = startOfToday();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    buscarHorariosDisponiveis(token, { dias: 30, limite: 500 })
      .then(lista => setHorarios(lista || []))
      .catch(err => console.error('Erro ao carregar horários disponíveis', err))
      .finally(() => setLoading(false));
  }, [token]);

  const datasComHorarios = useMemo(() => {
    const set = new Set<string>();
    horarios.forEach(h => {
      if (!h.ocupado) set.add(h.data);
    });
    return set;
  }, [horarios]);

  const diasDoMes = useMemo(() => {
    const inicio = startOfMonth(currentMonth);
    const fim = endOfMonth(currentMonth);
    return eachDayOfInterval({ start: inicio, end: fim });
  }, [currentMonth]);

  const horariosDoDia = useMemo(() => {
    if (!selectedDate) return [];
    const iso = format(selectedDate, 'yyyy-MM-dd');
    return horarios.filter(h => h.data === iso).sort((a, b) => a.hora.localeCompare(b.hora));
  }, [horarios, selectedDate]);

  const handleSelectDate = (day: Date) => {
    const iso = format(day, 'yyyy-MM-dd');
    if (!datasComHorarios.has(iso)) return;
    setSelectedDate(day);
    setSelectedHorarioId(null);
    setValue('data', iso, { shouldValidate: true });
  };

  const handleSelectHorario = (h: HorarioDisponivelDTO) => {
    if (h.ocupado) return;
    setSelectedHorarioId(h.id);
    // mantém "HH:MM:SS" para bater 1:1 com a API depois
    setValue('hora', h.hora, { shouldValidate: true });
  };

  const handleNext = async () => {
    const ok = await trigger(['data', 'hora']);
    if (!ok) return;
    onNext();
  };

  const irMesAnterior = () => {
    const prev = addMonths(currentMonth, -1);
    if (isBefore(endOfMonth(prev), hoje)) return;
    setCurrentMonth(prev);
  };

  const irProximoMes = () => setCurrentMonth(addMonths(currentMonth, 1));

  const valorData = watch('data');
  const valorHora = watch('hora');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#05334D]">
          Escolha a data e o horário da consulta
        </h2>
        <p className="text-sm text-gray-600">
          Selecione um dia disponível e, em seguida, o horário.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendário */}
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={irMesAnterior}
              className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              ◀
            </button>
            <span className="text-sm font-medium text-[#05334D]">
              {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <button
              type="button"
              onClick={irProximoMes}
              className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              ▶
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
            <span>D</span>
            <span>S</span>
            <span>T</span>
            <span>Q</span>
            <span>Q</span>
            <span>S</span>
            <span>S</span>
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1 text-sm">
            {diasDoMes.map(day => {
              const iso = format(day, 'yyyy-MM-dd');
              const isHoje = isSameDay(day, hoje);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const temHorario = datasComHorarios.has(iso);
              const noPassado = isBefore(day, hoje);
              const disabled = !temHorario || noPassado;

              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => handleSelectDate(day)}
                  disabled={disabled}
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-full border text-xs',
                    disabled
                      ? 'border-transparent text-gray-300'
                      : 'border-gray-200 text-gray-700 hover:bg-[#FCE9D8]',
                    isSelected && '!border-[#F37021] !bg-[#F37021] !text-white',
                    !isSelected && isHoje && '!border-[#F37021] font-semibold',
                  ].join(' ')}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {errors.data && (
            <p className="mt-2 text-xs text-red-500">{String(errors.data.message)}</p>
          )}
        </div>

        {/* Horários */}
        <div className="flex flex-col rounded-lg border border-gray-200 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-[#05334D]">
              {selectedDate
                ? `Horários em ${format(selectedDate, 'dd/MM/yyyy')}`
                : 'Escolha um dia no calendário'}
            </span>
          </div>

          {loading && <p className="text-sm text-gray-500">Carregando horários...</p>}

          {!loading && selectedDate && horariosDoDia.length === 0 && (
            <p className="text-sm text-gray-500">Sem horários disponíveis para este dia.</p>
          )}

          {!loading && selectedDate && horariosDoDia.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {horariosDoDia.map(h => {
                const disabled = h.ocupado;
                const selecionado = selectedHorarioId === h.id;
                const label = h.hora.slice(0, 5); // exibe HH:MM, mas mantém HH:MM:SS no form

                return (
                  <button
                    key={h.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSelectHorario(h)}
                    className={[
                      'rounded-full border px-3 py-1 text-xs font-medium',
                      disabled
                        ? 'cursor-not-allowed border-gray-200 text-gray-300'
                        : 'border-gray-300 text-gray-700 hover:bg-[#FCE9D8]',
                      selecionado && '!border-[#F37021] !bg-[#F37021] !text-white',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {errors.hora && (
            <p className="mt-2 text-xs text-red-500">{String(errors.hora.message)}</p>
          )}
        </div>
      </div>

      {/* Navegação */}
      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!valorData || !valorHora}
          className="rounded bg-[#F37021] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
