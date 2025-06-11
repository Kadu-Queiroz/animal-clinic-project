import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';

export function PrivateRouteIntranet({ children }: { children: JSX.Element }) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated || !hasRole('ADMIN', 'RECEPCAO', 'VETERINARIO', 'SYSADMIN')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
