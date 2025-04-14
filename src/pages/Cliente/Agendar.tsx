import { HeaderCliente, NavTabs } from '@/components/Cliente';

export default function Agendar() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="agendar" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold text-[#05334D]">Agendar Consulta</h1>
        <p className="text-gray-600">Em breve você poderá marcar consultas por aqui.</p>
      </main>
    </div>
  );
}
