import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Intranet/Sidebar';
import { Header } from '@/components/Intranet/Header';

export function IntranetLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
