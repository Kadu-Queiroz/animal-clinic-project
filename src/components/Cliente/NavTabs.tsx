import { Home, PawPrint, FileText, Calendar, MessageSquare } from 'lucide-react';

interface NavTabsProps {
  active: string;
  onChange?: (tab: string) => void;
}

export function NavTabs({ active, onChange }: NavTabsProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pets', label: 'Pets', icon: PawPrint },
    { id: 'exams', label: 'Exames', icon: FileText },
    { id: 'agendar', label: 'Agendar', icon: Calendar },
    { id: 'mensagens', label: 'Mensagens', icon: MessageSquare },
  ];

  return (
    <nav className="bg-[#05334D] text-white">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-6 border-b border-[#8B947F]/30">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => onChange?.(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 font-semibold ${
                  active === tab.id
                    ? 'border-b-2 border-[#CC6E28] text-[#CC6E28]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                <span className="text-sm">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}