import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import Dashboard from '@pages/Cliente/Dashboard';
import Exames from '@pages/Cliente/Exames';
import Agendar from '@/pages/Cliente/Agendar/Agendar';
import Historico from '@pages/Cliente/Historico';
import Mensagens from '@pages/Cliente/Mensagens';
import { PrivateRoute } from '@routes/PrivateRoute';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Página pública */}
        <Route path="/" element={<LandingPage />} />

        {/* Áreas protegidas */}
        <Route
          path="/cliente/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/exames"
          element={
            <PrivateRoute>
              <Exames />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/agendar"
          element={
            <PrivateRoute>
              <Agendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/historico"
          element={
            <PrivateRoute>
              <Historico />
            </PrivateRoute>
          }
        />
        <Route
          path="/cliente/mensagens"
          element={
            <PrivateRoute>
              <Mensagens />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
