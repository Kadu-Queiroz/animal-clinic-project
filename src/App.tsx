import { AppRouter } from '@/routes/AppRouter';
import { AuthProvider } from '@context/AuthProvider';
import { ModalProvider } from '@context/ModalProvider';

export default function App() {
  console.log('[DEBUG] App carregado');
  return (
    <ModalProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ModalProvider>
  );
}
