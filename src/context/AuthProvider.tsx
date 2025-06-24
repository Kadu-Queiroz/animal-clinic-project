import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { login as loginRequest } from '@/services/auth/auth-service';
import { NovaSenhaModal } from '@/components/shared/Modals/NovaSenhaModal';
import type { UsuarioAutenticado } from '@/types/common/user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UsuarioAutenticado | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);

  const persistAuthData = useCallback((usuario: UsuarioAutenticado, token: string) => {
    localStorage.setItem('user', JSON.stringify(usuario));
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
      const { access_token, user } = await loginRequest(cpf, password);
      setUser(user);
      setToken(access_token);
      persistAuthData(user, access_token);

      if (user.senha_provisoria) {
        setMostrarModalSenha(true);
      }

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
    const carregarDadosPersistidos = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');

        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser) as UsuarioAutenticado;
          setUser(parsedUser);
          setToken(savedToken);

          if (parsedUser.senha_provisoria) {
            setMostrarModalSenha(true);
          }
        }
      } catch (err) {
        console.warn('⚠️ Erro ao carregar dados do localStorage:', err);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    carregarDadosPersistidos();
  }, [clearAuthData]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && !e.newValue) {
        clearAuthData();
      }
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
        isAuthenticated: !!user && !!token,
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
