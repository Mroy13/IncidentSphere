import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';

interface ComingSoonPageProps {
  module: string;
}

export function ComingSoonPage({ module }: ComingSoonPageProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-16 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-surface-800 ring-1 ring-border-strong">
        <Construction className="size-8 text-slate-400" />
      </div>
      <Card title={`${module} module`} description="Planned for the unified IncidentSphere platform">
        <p className="text-sm text-slate-400">
          This area is scaffolded for future integration. Stream Operations is available now.
        </p>
        <Link to="/stream-ops" className="mt-4 inline-block">
          <Button variant="secondary">Go to Stream Ops</Button>
        </Link>
      </Card>
    </div>
  );
}
