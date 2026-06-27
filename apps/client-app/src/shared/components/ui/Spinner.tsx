import { cn } from '@/shared/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const sizes = {
  sm: 'size-4 border-2',
  md: 'size-8 border-2',
  lg: 'size-12 border-[3px]',
};

export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)} role="status">
      <span
        className={cn(
          'animate-spin rounded-full border-accent-500 border-t-transparent',
          sizes[size],
        )}
      />
      {label && <span className="text-sm text-slate-400">{label}</span>}
    </div>
  );
}
