import { useFormContext } from 'react-hook-form';
import { ResumoAgendamento } from './ResumoAgendamento';
import type { AgendamentoData } from '@/pages/Cliente/Agendar/schema';

interface EtapaConfirmacaoProps {
  onBack: () => void;
  loading?: boolean;
}

export function EtapaConfirmacao({ onBack, loading }: EtapaConfirmacaoProps) {
  const { getValues } = useFormContext<AgendamentoData>();
  const { pet = '', servico = '', data = '', hora = '' } = getValues();

  return (
    <div>
      <ResumoAgendamento pet={pet} servico={servico} data={data} hora={hora} onBack={onBack} />

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-[#CC6E28] px-4 py-2 font-semibold text-white transition hover:bg-[#b55f22] disabled:opacity-60"
        >
          {loading ? 'Agendando...' : 'Confirmar Agendamento'}
        </button>
      </div>
    </div>
  );
}
