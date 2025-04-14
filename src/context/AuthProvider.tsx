import { useState, ReactNode } from 'react';
import { TutorData, AuthContext } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [tutor, setTutor] = useState<TutorData | null>(() => {
    const saved = localStorage.getItem('tutor');
    return saved ? JSON.parse(saved) : null;
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
