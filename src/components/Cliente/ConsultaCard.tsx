interface ConsultaCardProps {
    date: string;
    time: string;
    pet: string;
    type: string;
  }
  
  export function ConsultaCard({ date, time, pet, type }: ConsultaCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#CC6E28]">
        <h2 className="text-lg font-semibold text-[#05334D] mb-4">Próxima Consulta</h2>
        <p className="text-gray-600">{date} às {time}</p>
        <p className="font-medium">{type}</p>
        <p className="text-sm text-gray-500">{pet}</p>
        <button className="mt-4 bg-[#CC6E28] text-white px-4 py-2 rounded hover:bg-[#b55f22] transition-colors">
          Remarcar
        </button>
      </div>
    );
  }  