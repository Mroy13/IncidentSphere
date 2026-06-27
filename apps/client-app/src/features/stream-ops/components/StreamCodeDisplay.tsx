import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { copyToClipboard, formatStreamCode } from '@/shared/utils/cn';
import { cn } from '@/shared/utils/cn';

interface StreamCodeDisplayProps {
  code: string;
  size?: 'md' | 'lg';
  className?: string;
}

export function StreamCodeDisplay({ code, size = 'md', className }: StreamCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const formatted = formatStreamCode(code);

  const handleCopy = async () => {
    await copyToClipboard(code.replace(/\s/g, ''));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <code
        className={cn(
          'font-mono font-semibold tracking-widest text-accent-400',
          size === 'lg' ? 'text-2xl' : 'text-lg',
        )}
      >
        {formatted}
      </code>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        aria-label="Copy stream code"
        className="text-slate-400"
      >
        {copied ? <Check className="size-4 text-signal-ok" /> : <Copy className="size-4" />}
      </Button>
    </div>
  );
}
