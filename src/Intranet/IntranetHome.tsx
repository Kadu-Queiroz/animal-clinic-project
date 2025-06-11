import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { LoginFuncionarioModal } from '@/Intranet/components/Modals/LoginFuncionarioModal';

export default function IntranetHome() {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      switch (user.funcao) {
        case 'VETERINARIO':
          navigate('/intranet/veterinario/dashboard');
          break;
        case 'RECEPCAO':
          navigate('/intranet/recepcao/dashboard');
          break;
        case 'ADMIN':
        case 'SYSADMIN':
          navigate('/intranet/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  return (
    <div className="relative flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <img src="/logo-intranet.svg" alt="Logo Toka dos Pets" className="mx-auto mb-6 w-40" />
        <h1 className="text-2xl font-semibold text-gray-700">Intranet da Clínica Toka dos Pets</h1>
      </div>

      {!loading && !isAuthenticated && <LoginFuncionarioModal onClose={() => {}} />}
    </div>
  );
}
