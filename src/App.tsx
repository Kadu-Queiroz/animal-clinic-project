import { AppRouter } from '@routes/Router';
import { AuthProvider } from '@context/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
