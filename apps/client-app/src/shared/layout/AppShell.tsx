import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/shared/layout/Sidebar';
import { TopBar } from '@/shared/layout/TopBar';

interface AppShellProps {
  themeMode: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function AppShell({ themeMode, onToggleTheme }: AppShellProps) {
  return (
    <div className="flex h-screen min-h-0 overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar themeMode={themeMode} onToggleTheme={onToggleTheme} />
        <main className="grid-bg flex-1 min-h-0 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
