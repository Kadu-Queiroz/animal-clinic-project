import { HeaderCliente, NavTabs } from '@/components/Cliente';

export default function Mensagens() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCliente />
      <NavTabs active="mensagens" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold text-[#05334D]">Mensagens</h1>
        <p className="text-gray-600">Você poderá visualizar mensagens da clínica aqui.</p>
      </main>
    </div>
  );
}
