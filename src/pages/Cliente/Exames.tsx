import { ExameCard } from '@/components/Cliente/ExameCard';

const examesMock = [
    {
      pet: 'Totó',
      tipo: 'Hemograma',
      data: '10/03/2024',
      status: 'Disponível',
    },
    {
      pet: 'Luna',
      tipo: 'Raio-X',
      data: '08/03/2024',
      status: 'Em análise',
    },
    {
      pet: 'Totó',
      tipo: 'Ultrassonografia',
      data: '06/03/2024',
      status: 'Aguardando coleta',
    }
  ];
  

export default function Exames() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#05334D] mb-8">Exames</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examesMock.map((exame, index) => (
            <ExameCard key={index} {...exame} />
          ))}
        </div>
      </div>
    </div>
  );
}