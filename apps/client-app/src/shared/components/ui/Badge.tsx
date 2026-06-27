import { cn } from '@/shared/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'live' | 'scheduled' | 'ended' | 'muted';
  className?: string;
}

const variants = {
  default: 'bg-surface-700 text-slate-200',
  live: 'bg-signal-live/15 text-red-300 ring-1 ring-signal-live/30',
  scheduled: 'bg-accent-500/15 text-amber-200 ring-1 ring-accent-500/30',
  ended: 'bg-slate-700/50 text-slate-400',
  muted: 'bg-surface-800 text-slate-400',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {variant === 'live' && (
        <span className="size-1.5 animate-pulse rounded-full bg-signal-live" />
      )}
      {children}
    </span>
  );
}
