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

import { buscarSlotsDisponiveis, type AgendaSlotDTO } from '@/services/Tutor/tutor-service';
import type { AgendamentoData } from '@/pages/Tutor/Agendar/schema';

interface EtapaDataHoraProps {
  onNext: () => void;
  onBack: () => void;
}

const VETERINARIO_ID_FIXO = 1;

export function EtapaDataHora({ onNext, onBack }: EtapaDataHoraProps) {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<AgendamentoData>();

  const hoje = startOfToday();

  const [currentMonth, setCurrentMonth] = useState<Date>(hoje);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [slots, setSlots] = useState<AgendaSlotDTO[]>([]);
  const [selectedSlotStart, setSelectedSlotStart] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rangeStart = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
  const rangeEnd = useMemo(() => endOfMonth(currentMonth), [currentMonth]);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    buscarSlotsDisponiveis({
      veterinario_id: VETERINARIO_ID_FIXO,
      date_from: format(rangeStart, 'yyyy-MM-dd'),
      date_to: format(rangeEnd, 'yyyy-MM-dd'),
    })
      .then(lista => {
        if (!alive) return;
        setSlots(lista || []);
      })
      .catch(err => {
        if (!alive) return;
        console.error('Erro ao carregar slots', err);
        setSlots([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [rangeStart, rangeEnd]);

  const datasComSlots = useMemo(() => {
    const set = new Set<string>();
    for (const s of slots) set.add(s.start_at.slice(0, 10));
    return set;
  }, [slots]);

  const diasDoMes = useMemo(
    () => eachDayOfInterval({ start: rangeStart, end: rangeEnd }),
    [rangeStart, rangeEnd],
  );

  const slotsDoDia = useMemo(() => {
    if (!selectedDate) return [];
    const iso = format(selectedDate, 'yyyy-MM-dd');
    return slots
      .filter(s => s.start_at.slice(0, 10) === iso)
      .sort((a, b) => a.start_at.localeCompare(b.start_at));
  }, [slots, selectedDate]);

  const limparSlot = () => {
    setSelectedSlotStart(null);
    setValue('slot_start_at', '', { shouldValidate: true });
    setValue('slot_end_at', '', { shouldValidate: true });
  };

  const handleSelectDate = (day: Date) => {
    const iso = format(day, 'yyyy-MM-dd');
    if (!datasComSlots.has(iso)) return;

    setSelectedDate(day);
    setValue('data', iso, { shouldValidate: true });
    limparSlot();
  };

  const handleSelectSlot = (s: AgendaSlotDTO) => {
    setSelectedSlotStart(s.start_at);
    setValue('slot_start_at', s.start_at, { shouldValidate: true });
    setValue('slot_end_at', s.end_at, { shouldValidate: true });
  };

  const handleNext = async () => {
    const ok = await trigger(['data', 'slot_start_at', 'slot_end_at']);
    if (ok) onNext();
  };

  const irMesAnterior = () => {
    const prev = addMonths(currentMonth, -1);
    if (isBefore(endOfMonth(prev), hoje)) return;

    setCurrentMonth(prev);

    if (selectedDate && !isSameDay(startOfMonth(prev), startOfMonth(selectedDate))) {
      setSelectedDate(null);
      setValue('data', '', { shouldValidate: true });
      limparSlot();
    }
  };

  const irProximoMes = () => {
    const next = addMonths(currentMonth, 1);
    setCurrentMonth(next);

    if (selectedDate && !isSameDay(startOfMonth(next), startOfMonth(selectedDate))) {
      setSelectedDate(null);
      setValue('data', '', { shouldValidate: true });
      limparSlot();
    }
  };

  const valorData = watch('data');
  const valorSlotStart = watch('slot_start_at');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#05334D]">
          Escolha a data e o horário da consulta
        </h2>
        <p className="text-sm text-gray-600">
          Selecione um dia disponível e, em seguida, um horário.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
              const isSelected = !!selectedDate && isSameDay(day, selectedDate);
              const temSlot = datasComSlots.has(iso);
              const noPassado = isBefore(day, hoje);
              const disabled = !temSlot || noPassado;

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

        <div className="flex flex-col rounded-lg border border-gray-200 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-[#05334D]">
              {selectedDate
                ? `Horários em ${format(selectedDate, 'dd/MM/yyyy')}`
                : 'Escolha um dia no calendário'}
            </span>
          </div>

          {loading && <p className="text-sm text-gray-500">Carregando horários...</p>}

          {!loading && selectedDate && slotsDoDia.length === 0 && (
            <p className="text-sm text-gray-500">Sem horários disponíveis para este dia.</p>
          )}

          {!loading && selectedDate && slotsDoDia.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {slotsDoDia.map(s => {
                const selecionado = selectedSlotStart === s.start_at;
                const label = s.start_at.slice(11, 16);

                return (
                  <button
                    key={s.start_at}
                    type="button"
                    onClick={() => handleSelectSlot(s)}
                    className={[
                      'rounded-full border px-3 py-1 text-xs font-medium',
                      'border-gray-300 text-gray-700 hover:bg-[#FCE9D8]',
                      selecionado && '!border-[#F37021] !bg-[#F37021] !text-white',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {(errors.slot_start_at || errors.slot_end_at) && (
            <p className="mt-2 text-xs text-red-500">
              {String(errors.slot_start_at?.message || errors.slot_end_at?.message)}
            </p>
          )}
        </div>
      </div>

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
          disabled={!valorData || !valorSlotStart}
          className="rounded bg-[#F37021] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
