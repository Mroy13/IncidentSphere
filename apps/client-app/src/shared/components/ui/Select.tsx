import { cn } from '@/shared/utils/cn';
import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Select({ label, hint, error, className, id, children, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full rounded-lg border bg-surface-850 px-3 py-2.5 text-sm text-white',
          'transition-colors focus:border-accent-500/50 focus:outline-none focus:ring-2 focus:ring-accent-500/20',
          error
            ? 'border-red-500/50'
            : 'border-border-subtle hover:border-border-strong',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}
