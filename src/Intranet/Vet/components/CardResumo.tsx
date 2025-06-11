import { ReactNode } from 'react';
import { CalendarDays, FileSearch, PawPrint } from 'lucide-react';

interface CardResumoProps {
  titulo: string;
  quantidade: number;
  cor: 'blue' | 'green' | 'purple';
}

const iconMap: Record<string, ReactNode> = {
  Consultas: <CalendarDays className="h-6 w-6 text-blue-500" />,
  Exames: <FileSearch className="h-6 w-6 text-green-500" />,
  Pacientes: <PawPrint className="h-6 w-6 text-purple-500" />,
};

export function CardResumo({ titulo, quantidade, cor }: CardResumoProps) {
  return (
    <div className={`rounded-xl border-l-4 bg-white p-4 shadow border-${cor}-500`}>
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gray-100 p-2">{iconMap[titulo] || null}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{titulo}</h3>
          <p className="text-2xl font-bold text-gray-800">{quantidade}</p>
        </div>
      </div>
    </div>
  );
}
