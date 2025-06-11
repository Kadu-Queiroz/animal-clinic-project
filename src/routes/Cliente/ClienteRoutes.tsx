import { Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import Dashboard from '@pages/Cliente/Dashboard';
import Exames from '@pages/Cliente/Exames';
import Historico from '@pages/Cliente/Historico';
import LayoutCliente from '@/pages/Cliente/ClienteLayout';
import { PrivateRoute } from '@/routes/Cliente/PrivateRouteCliente';

export const clienteRoutes = (
  <>
    <Route path="/" element={<LandingPage />} />
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
  </>
);
