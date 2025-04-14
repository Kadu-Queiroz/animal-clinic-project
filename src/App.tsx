import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Cliente/Dashboard';
import Historico from '@/pages/Cliente/Historico';
import Exames from '@/pages/Cliente/Exames';
import Agendar from '@/pages/Cliente/Agendar';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cliente/dashboard" element={<Dashboard />} />
      <Route path="/cliente/historico" element={<Historico />} />
      <Route path="/cliente/exames" element={<Exames />} />
      <Route path="/cliente/agendar" element={<Agendar />} />
    </Routes>
  );
}