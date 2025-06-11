import { Route } from 'react-router-dom';
import { LayoutVet } from '@/Intranet/layouts/LayoutVet';
import { DashboardVet } from '@/Intranet/Vet/pages/DashboardVet';
import { ConsultasVet } from '@/Intranet/Vet/pages/ConsultasVet';
import ExamesVet from '@/pages/Intranet/Veterinario/ExamesVet';
import PacientesVet from '@/pages/Intranet/Veterinario/PacientesVet';

export const veterinarioRoutes = (
  <Route path="/intranet/veterinario" element={<LayoutVet />}>
    <Route path="dashboard" element={<DashboardVet />} />
    <Route path="consultas" element={<ConsultasVet />} />
    <Route path="exames" element={<ExamesVet />} />
    <Route path="pacientes" element={<PacientesVet />} />
  </Route>
);
