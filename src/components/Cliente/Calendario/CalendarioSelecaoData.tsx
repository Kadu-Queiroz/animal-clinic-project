interface CalendarioInterativoProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const diasDisponiveis = ['2024-04-18', '2024-04-19', '2024-04-22', '2024-04-25', '2024-04-26'];

export function CalendarioInterativo({ selectedDate, onSelectDate }: CalendarioInterativoProps) {
  //const [dataAtual] = useState(new Date()); pode ser usado para mostrar a data atual no calendário, se necessário

  const getLabel = (dataStr: string) => {
    const date = new Date(dataStr);
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {diasDisponiveis.map(data => {
        const isSelected = selectedDate === data;

        return (
          <button
            key={data}
            onClick={() => onSelectDate(data)}
            className={`rounded-lg border p-4 text-sm font-medium transition ${
              isSelected
                ? 'border-transparent bg-[#CC6E28] text-white'
                : 'border-[#8B947F] bg-white text-[#05334D] hover:bg-[#8B947F]/10'
            }`}
          >
            {getLabel(data)}
          </button>
        );
      })}
    </div>
  );
}
