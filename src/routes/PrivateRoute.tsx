import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando acesso seguro...</div>; // ou um spinner estilizado
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
