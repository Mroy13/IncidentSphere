import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  className?: string;
}

const config: Record<
  AlertVariant,
  { icon: typeof Info; styles: string }
> = {
  info: {
    icon: Info,
    styles: 'border-signal-info/30 bg-signal-info/10 text-sky-200',
  },
  success: {
    icon: CheckCircle2,
    styles: 'border-signal-ok/30 bg-signal-ok/10 text-emerald-200',
  },
  warning: {
    icon: AlertCircle,
    styles: 'border-accent-500/30 bg-accent-500/10 text-amber-200',
  },
  error: {
    icon: XCircle,
    styles: 'border-red-500/30 bg-red-500/10 text-red-200',
  },
};

export function Alert({ variant = 'info', title, message, className }: AlertProps) {
  const { icon: Icon, styles } = config[variant];

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-lg border px-4 py-3 text-sm',
        styles,
        className,
      )}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <p className={cn(title && 'mt-0.5 opacity-90')}>{message}</p>
      </div>
    </div>
  );
}
