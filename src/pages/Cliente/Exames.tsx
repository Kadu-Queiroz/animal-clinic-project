import { HeaderCliente, NavTabs } from '@/components/Cliente';

export default function Exames() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="exames" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold text-[#05334D]">Meus Exames</h1>
        <p className="text-gray-600">Aqui você poderá visualizar os exames dos seus pets.</p>
      </main>
    </div>
  );
}
