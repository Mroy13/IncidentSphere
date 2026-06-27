import { Link } from 'react-router-dom';
import { Plus, LogIn, Shield, Zap, Video } from 'lucide-react';
import { ActiveStreamsPanel } from '@/features/stream-ops/components/ActiveStreamsPanel';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';

const capabilities = [
  {
    icon: Video,
    title: 'Live field video',
    description: 'Broadcast from the incident site with sub-second latency.',
  },
  {
    icon: Shield,
    title: 'Incident-linked',
    description: 'Every stream ties to an incident record for audit and command context.',
  },
  {
    icon: Zap,
    title: 'Instant join codes',
    description: 'Share short codes so responders join without complex setup.',
  },
];

export function StreamOpsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br from-surface-900 via-surface-900 to-surface-850 p-8">
        <div className="absolute -right-8 -top-8 size-48 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-400">
            Stream Operations
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white">
            Live video for <span className="text-gradient">incident command</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Create incident-linked streams, distribute join codes to field teams, and monitor
            live feeds from a single command surface — built to plug into the full
            IncidentSphere platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/stream-ops/create">
              <Button size="lg">
                <Plus className="size-4" />
                New stream
              </Button>
            </Link>
            <Link to="/stream-ops/join">
              <Button variant="secondary" size="lg">
                <LogIn className="size-4" />
                Join with code
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {capabilities.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="!p-0">
            <div className="p-5">
              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent-500/10 text-accent-400">
                <Icon className="size-5" />
              </div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            </div>
          </Card>
        ))}
      </div>

      <ActiveStreamsPanel />
    </div>
  );
}
