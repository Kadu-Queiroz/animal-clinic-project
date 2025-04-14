import { createContext } from 'react';

export type TutorData = {
  nome: string;
  cpf: string;
};

export type AuthContextType = {
  tutor: TutorData | null;
  login: (tutor: TutorData) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);