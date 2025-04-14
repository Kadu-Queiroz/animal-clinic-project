import { useFormContext } from 'react-hook-form';
import { ResumoAgendamento } from './ResumoAgendamento';

interface EtapaConfirmacaoProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function EtapaConfirmacao({ onBack, onSubmit }: EtapaConfirmacaoProps) {
  const { getValues } = useFormContext();
  const { pet, servico, data, hora } = getValues();

  return (
    <div>
      <ResumoAgendamento pet={pet} servico={servico} data={data} hora={hora} onBack={onBack} />

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded bg-gray-300 px-4 py-2 text-gray-800 transition hover:bg-gray-400"
        >
          Voltar
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="rounded bg-[#CC6E28] px-4 py-2 text-white transition hover:bg-[#b55f22]"
        >
          Confirmar Agendamento
        </button>
      </div>
    </div>
  );
}
