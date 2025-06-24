import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { clienteRoutes } from '@/routes/Cliente/ClienteRoutes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {clienteRoutes} {/* Landing + Área do Cliente */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
