import { useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { loginTutor } from '@/services/tutor-service';
import { NovaSenhaModal } from '@/components/Modals/NovaSenhaModal';
import type { UsuarioAutenticado } from '@/types/common/user';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UsuarioAutenticado | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);

  // Salva dados no localStorage
  const persistAuthData = useCallback((usuario: UsuarioAutenticado, token: string) => {
    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.setItem('token', token);
  }, []);

  // Limpa tudo
  const clearAuthData = useCallback(() => {
    setUser(null);
    setToken(null);
    setMostrarModalSenha(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  // Realiza login
  const login = async ({ cpf, password }: { cpf: string; password: string }) => {
    try {
      const { access_token, user } = await loginTutor(cpf, password);
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

  // Logout manual
  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  // Carrega dados do localStorage na inicialização
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

  // Sincronização entre abas (logout em outra aba)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && !e.newValue) {
        clearAuthData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [clearAuthData]);

  // Encerra o modal quando a senha for atualizada
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
