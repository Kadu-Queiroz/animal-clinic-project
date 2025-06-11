import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import Dashboard from '@pages/Cliente/Dashboard';
import Exames from '@pages/Cliente/Exames';
import Historico from '@pages/Cliente/Historico';
import LayoutCliente from '@pages/Cliente/Layout';
import { PrivateRoute } from '@routes/PrivateRoute';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Página pública */}
        <Route path="/" element={<LandingPage />} />

        {/* Área do cliente protegida */}
        <Route
          path="/cliente"
          element={
            <PrivateRoute>
              <LayoutCliente />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exames" element={<Exames />} />
          <Route path="historico" element={<Historico />} />
        </Route>
      </Routes>
    </Router>
  );
}
