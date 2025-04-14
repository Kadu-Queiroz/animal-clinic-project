import { X } from 'lucide-react';
import { useModalStore } from '@/hooks/useModalStore';

export function DetalhesServicoModal() {
  const { modal, modalData, closeModal } = useModalStore();
  if (modal !== 'detalhesServico') return null;

  const { title = 'Detalhes', items = [] } = modalData;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-[#002B3D]">{title}</h2>
          <button onClick={closeModal} className="text-gray-600 hover:text-[#002B3D] transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {items.map((item: string, index: number) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-[#002B3D] rounded-full mr-3"></div>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 border-t">
          <button onClick={closeModal} className="w-full bg-[#002B3D] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}