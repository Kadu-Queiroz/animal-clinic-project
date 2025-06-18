import { Route } from 'react-router-dom';
import IntranetHome from '@/Intranet/IntranetHome';
import { veterinarioRoutes } from '@/Intranet/routes/Intranet/VetRoutes';
// No futuro: import { recepcaoRoutes } from '@/Intranet/routes/Intranet/RecepcaoRoutes';

export const intranetRoutes = (
  <>
    <Route path="/intranet" element={<IntranetHome />} />
    {veterinarioRoutes}
  </>
);
