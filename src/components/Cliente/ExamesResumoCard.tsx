interface ExamesResumoCardProps {
    count: number;
  }
  
  export function ExamesResumoCard({ count }: ExamesResumoCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#05334D]">Resultados Pendentes</h2>
          <span className="bg-[#8B947F] text-white px-3 py-1 rounded-full text-sm">
            {count} exames
          </span>
        </div>
        <button className="w-full bg-[#05334D] text-white px-4 py-2 rounded hover:bg-[#042736] transition-colors">
          Ver Exames
        </button>
      </div>
    );
  }  