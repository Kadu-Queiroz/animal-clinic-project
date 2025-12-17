import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { tutorRoutes } from '@/routes/Tutor/TutorRoutes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {tutorRoutes} {/* Landing + Área do Tutor */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
