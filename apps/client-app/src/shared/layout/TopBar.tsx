import { Bell, Moon, Search, Sun } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from '@/shared/components/ui/Badge';
import { streamOpsNav } from '@/shared/config/navigation';

interface TopBarProps {
  themeMode: 'light' | 'dark';
  onToggleTheme: () => void;
}

function getPageTitle(pathname: string): { title: string; subtitle: string } {
  if (pathname.startsWith('/stream-ops/create')) {
    return { title: 'Create Stream', subtitle: 'Launch a live incident feed' };
  }
  if (pathname.startsWith('/stream-ops/join')) {
    return { title: 'Join Stream', subtitle: 'Enter with a stream code' };
  }
  if (pathname.startsWith('/stream-ops/room')) {
    return { title: 'Live Room', subtitle: 'Active stream session' };
  }
  if (pathname.startsWith('/stream-ops')) {
    return { title: 'Stream Operations', subtitle: 'Live video command center' };
  }
  return { title: 'IncidentSphere', subtitle: 'Unified incident management' };
}

export function TopBar({ themeMode, onToggleTheme }: TopBarProps) {
  const { pathname } = useLocation();
  const { title, subtitle } = getPageTitle(pathname);
  const isStreamOps = pathname.startsWith('/stream-ops');

  return (
    <header className="sticky top-0 z-20 border-b border-border-subtle bg-surface-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            {isStreamOps && <Badge variant="live">LIVE OPS</Badge>}
          </div>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-border-subtle bg-surface-900 px-3 py-2 md:flex">
            <Search className="size-4 text-slate-500" />
            <span className="text-sm text-slate-500">Search incidents…</span>
            <kbd className="rounded bg-surface-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
              ⌘K
            </kbd>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-lg border border-border-subtle p-2 text-slate-400 transition-colors hover:bg-surface-800 hover:text-white"
            aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
          >
            {themeMode === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            className="rounded-lg border border-border-subtle p-2 text-slate-400 transition-colors hover:bg-surface-800 hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </button>
        </div>
      </div>

      {isStreamOps && (
        <div className="flex gap-1 border-t border-border-subtle px-6 py-2">
          {streamOpsNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/stream-ops'}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-800 hover:text-white ${
                  isActive
                    ? 'bg-accent-500/10 text-accent-400'
                    : 'text-slate-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
