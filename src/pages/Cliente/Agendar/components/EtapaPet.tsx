import { useFormContext } from 'react-hook-form';

interface EtapaPetProps {
  onNext: () => void;
}

export function EtapaPet({ onNext }: EtapaPetProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const petSelecionado = watch('pet');

  return (
    <div className="rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-[#05334D]">Escolha o Pet</h2>

      <select
        {...register('pet')}
        defaultValue=""
        className="w-full rounded border border-gray-300 p-2"
      >
        <option value="" disabled>
          Selecione um pet
        </option>
        <option value="Totó">Totó (Cachorro)</option>
        <option value="Luna">Luna (Gato)</option>
      </select>

      {errors.pet && <p className="mt-1 text-sm text-red-600">{errors.pet.message as string}</p>}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!petSelecionado}
          className="rounded bg-[#CC6E28] px-6 py-2 text-white transition hover:bg-[#b55f22]"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
