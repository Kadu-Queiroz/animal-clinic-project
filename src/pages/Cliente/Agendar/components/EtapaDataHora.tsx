import { useFormContext } from 'react-hook-form';

interface EtapaDataHoraProps {
  onNext: () => void;
  onBack: () => void;
}

export function EtapaDataHora({ onNext, onBack }: EtapaDataHoraProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const dataSelecionada = watch('data');
  const horaSelecionada = watch('hora');

  return (
    <div className="rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-[#05334D]">Escolha Data e Hora</h2>

      {/* Data */}
      <label className="mb-1 block text-sm font-medium text-gray-700">Data</label>
      <input
        type="date"
        {...register('data')}
        className="mb-4 w-full rounded border border-gray-300 p-2"
      />
      {errors.data && (
        <p className="mb-3 mt-[-12px] text-sm text-red-600">{errors.data.message as string}</p>
      )}

      {/* Hora */}
      <label className="mb-1 block text-sm font-medium text-gray-700">Hora</label>
      <select
        {...register('hora')}
        defaultValue=""
        className="w-full rounded border border-gray-300 p-2"
      >
        <option value="" disabled>
          Selecione um horário
        </option>
        {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(hora => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>
      {errors.hora && <p className="mt-2 text-sm text-red-600">{errors.hora.message as string}</p>}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded bg-gray-300 px-6 py-2 text-gray-800 transition hover:bg-gray-400"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!dataSelecionada || !horaSelecionada}
          className="rounded bg-[#CC6E28] px-6 py-2 text-white transition hover:bg-[#b55f22]"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
