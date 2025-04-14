import { useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { TutorData } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [tutor, setTutor] = useState<TutorData | null>(() => {
    try {
      const saved = localStorage.getItem('tutor');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (tutor: TutorData) => {
    setTutor(tutor);
    localStorage.setItem('tutor', JSON.stringify(tutor));
  };

  const logout = () => {
    setTutor(null);
    localStorage.removeItem('tutor');
  };

  const isAuthenticated = !!tutor;

  return (
    <AuthContext.Provider value={{ tutor, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
