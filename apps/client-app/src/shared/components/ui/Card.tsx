import { cn } from '@/shared/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
}

export function Card({
  title,
  description,
  action,
  children,
  className,
  variant = 'default',
}: CardProps) {
  return (
    <section
      className={cn(
        'glass-panel overflow-hidden',
        variant === 'highlight' && 'border-accent-500/20 shadow-lg shadow-accent-500/5',
        className,
      )}
    >
      {(title || description || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-4">
          <div>
            {title && <h2 className="text-base font-semibold text-white">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-sm text-slate-400">{description}</p>
            )}
          </div>
          {action}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
