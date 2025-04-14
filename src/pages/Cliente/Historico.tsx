import { HeaderCliente, NavTabs } from '@/components/Cliente';

export default function Historico() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="historico" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold text-[#05334D]">Histórico de Saúde</h1>
        <p className="text-gray-600">Aqui ficará o histórico completo de saúde dos seus pets.</p>
      </main>
    </div>
  );
}
