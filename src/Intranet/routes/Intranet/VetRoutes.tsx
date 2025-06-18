import { Route } from 'react-router-dom';
import { LayoutVet } from '@/Intranet/layouts/LayoutVet';
import { DashboardVet } from '@/Intranet/veterinario/pages/DashboardVet';
import { ConsultasVet } from '@/Intranet/veterinario/pages/ConsultasVet';
import { ExamesVet } from '@/Intranet/veterinario/pages/ExamesVet';
import { PacientesVet } from '@/Intranet/veterinario/pages/PacientesVet';

export const veterinarioRoutes = (
  <Route path="/intranet/veterinario" element={<LayoutVet />}>
    <Route path="dashboard" element={<DashboardVet />} />
    <Route path="consultas" element={<ConsultasVet />} />
    <Route path="exames" element={<ExamesVet />} />
    <Route path="pacientes" element={<PacientesVet />} />
  </Route>
);
