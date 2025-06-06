import { X } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

export function DetalhesServicoModal() {
  const { modal, modalData, closeModal } = useModal();

  if (modal !== 'detalhesServico') return null;

  const title = typeof modalData?.title === 'string' ? modalData.title : 'Detalhes';
  const items = Array.isArray(modalData?.items) ? modalData.items : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-[#002B3D]">{title}</h2>
          <button onClick={closeModal} className="text-gray-600 transition hover:text-[#002B3D]">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="mr-3 h-2 w-2 rounded-full bg-[#002B3D]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t p-6">
          <button
            onClick={closeModal}
            className="w-full rounded-lg bg-[#002B3D] px-6 py-3 text-white transition hover:bg-blue-900"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
