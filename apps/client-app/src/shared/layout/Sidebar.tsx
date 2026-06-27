import { NavLink } from 'react-router-dom';
import { Badge } from '@/shared/components/ui/Badge';
import { primaryNav } from '@/shared/config/navigation';
import { getNavIcon } from '@/shared/config/navIcons';
import { cn } from '@/shared/utils/cn';
import Logo from "@/assets/IncidentSPLogo.png";

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border-subtle bg-surface-900/50">
      <div className="border-b border-border-subtle px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 ring-1 ring-accent-500/30">
            <img
              src={Logo}
              alt="IncidentSphere"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <p className="font-semibold text-white">IncidentSphere</p>
            <p className="text-xs text-slate-500">Command Platform</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Main navigation">
        {primaryNav.map((item) => {
          const Icon = getNavIcon(item.icon);
          const isDisabled = item.status !== 'active';

          return (
            <NavLink
              key={item.id}
              to={isDisabled ? '#' : item.path}
              onClick={(event) => {
                if (isDisabled) {
                  event.preventDefault();
                }
              }}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                  isDisabled && 'cursor-not-allowed opacity-50',
                  !isDisabled && isActive
                    ? 'bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20'
                    : !isDisabled && 'text-slate-400 hover:bg-surface-800 hover:text-slate-200',
                )
              }
              aria-disabled={isDisabled}
            >
              <Icon className="size-4 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.label}</p>
                <p className="truncate text-xs text-slate-500 group-hover:text-slate-400">
                  {item.description}
                </p>
              </div>
              {item.status === 'coming-soon' && (
                <Badge variant="muted" className="shrink-0 text-[10px]">
                  Soon
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border-subtle p-4">
        <div className="rounded-lg bg-surface-850 px-3 py-2.5">
          <p className="text-xs font-medium text-slate-400">Signed in as</p>
          <p className="text-sm font-semibold text-white">Incident Commander</p>
          <p className="font-mono text-[10px] text-slate-500">mock-user · dev</p>
        </div>
      </div>
    </aside>
  );
}
