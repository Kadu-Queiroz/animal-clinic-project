import { Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import Dashboard from '@pages/Tutor/Dashboard';
import Exames from '@pages/Tutor/Exames';
import Historico from '@pages/Tutor/Historico';
import LayoutTutor from '@/pages/Tutor/TutorLayout';
import { PrivateRoute } from '@/routes/Tutor/PrivateRouteTutor';

export const tutorRoutes = (
  <>
    <Route path="/" element={<LandingPage />} />
    <Route
      path="/tutor"
      element={
        <PrivateRoute>
          <LayoutTutor />
        </PrivateRoute>
      }
    >
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="exames" element={<Exames />} />
      <Route path="historico" element={<Historico />} />
    </Route>
  </>
);
