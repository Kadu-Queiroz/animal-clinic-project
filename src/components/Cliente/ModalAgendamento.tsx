interface ModalAgendamentoProps {
    isOpen: boolean;
    onClose: () => void;
    pet: string;
    servico: string;
    data: string;
  }
  
  export function ModalAgendamento({ isOpen, onClose, pet, servico, data }: ModalAgendamentoProps) {
    if (!isOpen) return null;
  
    const handleConfirm = () => {
      alert(`Agendamento confirmado para ${pet} em ${data} (${servico})`);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-[#05334D] mb-4">Confirmar Agendamento</h2>
  
          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>Pet:</strong> {pet}</p>
            <p><strong>Serviço:</strong> {servico}</p>
            <p><strong>Data:</strong> {new Date(data).toLocaleDateString('pt-BR')}</p>
          </div>
  
          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={onClose}
              className="w-1/2 bg-gray-300 text-[#05334D] px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="w-1/2 bg-[#CC6E28] text-white px-4 py-2 rounded hover:bg-[#b55f22] transition"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }  