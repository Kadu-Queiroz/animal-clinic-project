import { useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { UsuarioAutenticado } from '@/types/common/user';
import { loginTutor } from '@/services/tutor-service';
import { NovaSenhaModal } from '@/components/Modals/NovaSenhaModal';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UsuarioAutenticado | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const [loading, setLoading] = useState(true);

  const persistAuthData = useCallback((user: UsuarioAutenticado, token: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }, []);

  const clearAuthData = useCallback(() => {
    setUser(null);
    setToken(null);
    setMostrarModalSenha(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  const login = async ({ cpf, password }: { cpf: string; password: string }) => {
    try {
      const { access_token, user } = await loginTutor(cpf, password);
      setUser(user);
      setToken(access_token);
      persistAuthData(user, access_token);
      if (user.senha_provisoria) setMostrarModalSenha(true);
      return user;
    } catch (error) {
      clearAuthData();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser) as UsuarioAutenticado;
        setUser(parsedUser);
        setToken(savedToken);
        if (parsedUser.senha_provisoria) setMostrarModalSenha(true);
      }
    } catch {
      clearAuthData();
    } finally {
      setLoading(false);
    }
  }, [clearAuthData]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && !e.newValue) clearAuthData();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [clearAuthData]);

  const handleFinalizarSenha = () => {
    if (user && !user.senha_provisoria) {
      setMostrarModalSenha(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
      {mostrarModalSenha && (
        <NovaSenhaModal onFinalizar={handleFinalizarSenha} obrigatorio={user?.senha_provisoria} />
      )}
    </AuthContext.Provider>
  );
}
