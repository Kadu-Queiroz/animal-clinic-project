import { createContext } from 'react';
import type { UsuarioAutenticado } from '@/types/common/user';

export interface AuthContextType {
  user: UsuarioAutenticado | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  // Realiza login do usuário (atualmente tutor)
  login: (params: { cpf: string; password: string }) => Promise<UsuarioAutenticado>;

  // Encerra a sessão do usuário
  logout: () => void;

  // Permite atualizar manualmente os dados do usuário autenticado
  setUser: (user: UsuarioAutenticado | null) => void;
}

// Esse contexto deve ser usado apenas com o hook useAuth() e dentro de <AuthProvider>
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
