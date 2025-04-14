import { Bell } from 'lucide-react';

interface Lembrete {
  pet: string;
  message: string;
}

interface LembreteCardProps {
  lembretes: Lembrete[];
}

export function LembreteCard({ lembretes }: LembreteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-[#05334D] mb-4">Lembretes</h2>
      {lembretes.map((reminder, index) => (
        <div key={index} className="flex items-center space-x-2 text-gray-600 mb-2">
          <Bell size={16} className="text-[#CC6E28]" />
          <p className="text-sm">{reminder.pet}: {reminder.message}</p>
        </div>
      ))}
    </div>
  );
}