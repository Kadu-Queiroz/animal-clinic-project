import { useFormContext } from 'react-hook-form';
import { ResumoAgendamento } from './ResumoAgendamento';
import type { AgendamentoData } from '@/pages/Tutor/Agendar/schema';

interface EtapaConfirmacaoProps {
  onBack: () => void;
  loading?: boolean;
}

export function EtapaConfirmacao({ onBack, loading }: EtapaConfirmacaoProps) {
  const { watch } = useFormContext<AgendamentoData>();

  const pet = watch('pet') || '';
  const servico = watch('servico') || '';
  const data = watch('data') || '';
  const slotStartAt = watch('slot_start_at') || '';

  const podeConfirmar = !!pet && !!servico && !!data && !!slotStartAt;

  return (
    <div>
      <ResumoAgendamento
        pet={pet}
        servico={servico}
        data={data}
        slotStartAt={slotStartAt}
        onBack={onBack}
      />

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading || !podeConfirmar}
          className="rounded bg-[#CC6E28] px-4 py-2 font-semibold text-white transition hover:bg-[#b55f22] disabled:opacity-60"
        >
          {loading ? 'Agendando...' : 'Confirmar Agendamento'}
        </button>
      </div>
    </div>
  );
}
