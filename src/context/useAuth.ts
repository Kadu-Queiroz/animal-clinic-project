import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import type { UserRole } from '@/types/common/user';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  }

  const { user, ...rest } = context;

  const is = (role: UserRole): boolean => user?.role === role;

  const hasRole = (...roles: UserRole[]): boolean =>
    user?.role ? roles.includes(user.role) : false;

  return {
    user,
    ...rest,
    is,
    hasRole,
  };
}
