import { Bell } from 'lucide-react';
import { useLembretes } from '@/hooks/Cliente/useLembretes';
import type { LembreteData } from '@/types/tutor/lembrete_tutor';

interface LembreteCardProps {
  /** Se vier por props, o card não faz fetch e não mostra loading */
  lembretes?: LembreteData[];
}

export function LembreteCard({ lembretes: propsLembretes }: LembreteCardProps) {
  const { lembretes, carregando, erro } = useLembretes();

  // Se o pai já passou a lista, prioriza ela
  const lista = propsLembretes ?? lembretes;
  const isLoading = propsLembretes ? false : carregando;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-[#05334D]">Lembretes</h2>

      {isLoading && <p className="text-sm text-[#05334D]">Carregando lembretes...</p>}

      {!isLoading && erro && <p className="text-sm text-red-600">{erro}</p>}

      {!isLoading && !erro && (!lista || lista.length === 0) && (
        <p className="text-sm text-gray-500">Nenhum lembrete por enquanto.</p>
      )}

      {!isLoading && !erro && Array.isArray(lista) && lista.length > 0 && (
        <ul className="space-y-2">
          {lista.map(item => (
            <li key={item.id} className="flex items-start gap-2 text-gray-700">
              <Bell size={16} className="mt-0.5 shrink-0 text-[#CC6E28]" />
              <span className="text-sm">{item.texto}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
