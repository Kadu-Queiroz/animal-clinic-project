import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { LogOut, Home, Calendar, FileText, Users, CalendarCheck } from 'lucide-react';

export function LayoutVet() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redireciona se não for veterinário
  useEffect(() => {
    if (!isAuthenticated || user?.funcao !== 'VETERINARIO') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  const menu = [
    { label: 'Dashboard', icon: Home, path: '/intranet/veterinario/dashboard' },
    { label: 'Agenda', icon: CalendarCheck, path: '/intranet/veterinario/agenda' },
    { label: 'Consultas', icon: Calendar, path: '/intranet/veterinario/consultas' },
    { label: 'Exames', icon: FileText, path: '/intranet/veterinario/exames' },
    { label: 'Pacientes', icon: Users, path: '/intranet/veterinario/pacientes' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="flex w-64 flex-col justify-between bg-white p-4 shadow-md">
        <div>
          <h2 className="mb-6 text-xl font-bold">🐾 Toka dos Pets</h2>
          <nav className="space-y-4">
            {menu.map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex w-full items-center gap-2 rounded p-2 text-left transition hover:bg-gray-200"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded p-2 text-red-600 transition hover:bg-red-100"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
