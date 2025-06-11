import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { clienteRoutes } from '@/routes/Cliente/ClienteRoutes';
import { intranetRoutes } from '@/Intranet/routes/Intranet/IntranetRoutes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {clienteRoutes} {/* Landing + Área do Cliente */}
        {intranetRoutes} {/* Área da Intranet */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
