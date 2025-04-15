import { Bell } from 'lucide-react';

interface Lembrete {
  id: number;
  texto: string;
}

interface LembreteCardProps {
  lembretes: Lembrete[];
}

export function LembreteCard({ lembretes }: LembreteCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-[#05334D]">Lembretes</h2>
      {lembretes.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum lembrete por enquanto.</p>
      ) : (
        lembretes.map(lembrete => (
          <div key={lembrete.id} className="mb-2 flex items-center space-x-2 text-gray-600">
            <Bell size={16} className="text-[#CC6E28]" />
            <p className="text-sm">{lembrete.texto}</p>
          </div>
        ))
      )}
    </div>
  );
}
