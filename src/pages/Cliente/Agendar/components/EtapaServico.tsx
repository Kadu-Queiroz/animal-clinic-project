import { useFormContext } from 'react-hook-form';

interface EtapaServicoProps {
  onNext: () => void;
  onBack: () => void;
}

export function EtapaServico({ onNext, onBack }: EtapaServicoProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const servicoSelecionado = watch('servico');

  return (
    <div className="rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-[#05334D]">Escolha o Serviço</h2>

      <select
        {...register('servico')}
        defaultValue=""
        className="w-full rounded border border-gray-300 p-2"
      >
        <option value="" disabled>
          Selecione um serviço
        </option>
        <option value="Consulta">Consulta Veterinária</option>
        <option value="Vacina">Vacinação</option>
        <option value="Retorno">Retorno</option>
        <option value="Outro">Outro</option>
      </select>

      {errors.servico && (
        <p className="mt-1 text-sm text-red-600">{errors.servico.message as string}</p>
      )}

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
          disabled={!servicoSelecionado}
          className="rounded bg-[#CC6E28] px-6 py-2 text-white transition hover:bg-[#b55f22]"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
