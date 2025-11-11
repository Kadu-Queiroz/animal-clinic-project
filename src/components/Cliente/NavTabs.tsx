import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, Clock, LogOut } from 'lucide-react';
import { useAuth } from '@/context/useAuth';

export function NavTabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/cliente/dashboard' },
    { id: 'exames', label: 'Exames', icon: FileText, href: '/cliente/exames' },
    { id: 'historico', label: 'Histórico', icon: Clock, href: '/cliente/historico' },
  ];

  if (!isAuthenticated || !user) return null;

  const activeTab = tabs.find(tab => location.pathname.startsWith(tab.href))?.id;

  return (
    <nav className="sticky top-0 z-40 bg-[#05334D] text-white">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-between border-b border-[#8B947F]/30 py-2">
          {/* Navegação principal */}
          <div className="flex space-x-6">
            {tabs.map(tab => (
              <li key={tab.id}>
                <Link
                  to={tab.href}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                  className={`flex items-center space-x-2 px-4 py-2 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-[#CC6E28] text-[#CC6E28]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="text-sm">{tab.label}</span>
                </Link>
              </li>
            ))}
          </div>

          {/* Logout */}
          <li>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center space-x-1 px-3 text-white/80 transition-colors hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <LogOut size={18} />
              <span className="text-sm">Sair</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
