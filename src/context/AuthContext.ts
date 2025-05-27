import { createContext } from 'react';
import type { TutorData } from '@/types/tutor/auth';

export type AuthContextType = {
  tutor: TutorData | null;
  login: (tutor: TutorData) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
