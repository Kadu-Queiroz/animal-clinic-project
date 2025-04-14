import { TimelineHistorico } from '@/components/Cliente/TimelineHistorico';
import type { EventoHistorico } from '@/types/historico';

const eventosMock: EventoHistorico[] = [
  {
    data: '10/03/2024',
    tipo: 'consulta',
    descricao: 'Consulta geral com Dr. Guilherme Cugini',
    anexo: 'https://example.com/laudo-consulta.pdf',
  },
  {
    data: '03/03/2024',
    tipo: 'vacina',
    descricao: 'Vacinação contra raiva',
  },
  {
    data: '15/02/2024',
    tipo: 'consulta',
    descricao: 'Retorno pós-cirurgia de esterilização',
  },
  {
    data: '01/01/2024',
    tipo: 'vacina',
    descricao: 'Vacina V10',
    anexo: 'https://example.com/comprovante-v10.pdf',
  },
];

export default function Historico() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-[#05334D] mb-8">Histórico de Saúde</h1>
        <TimelineHistorico eventos={eventosMock} />
      </div>
    </div>
  );
}