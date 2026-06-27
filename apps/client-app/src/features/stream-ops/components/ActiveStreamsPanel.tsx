import { Link } from 'react-router-dom';
import { Radio, Plus, LogIn, Trash2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import {
  clearEndedSessions,
  selectLiveSessions,
  selectStreamSessions,
} from '@/features/stream-ops/store/streamOpsSlice';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { StreamCodeDisplay } from '@/features/stream-ops/components/StreamCodeDisplay';

function statusBadge(status: 'active' | 'scheduled' | 'ended') {
  if (status === 'active') return <Badge variant="live">Live</Badge>;
  if (status === 'scheduled') return <Badge variant="scheduled">Scheduled</Badge>;
  return <Badge variant="ended">Ended</Badge>;
}

export function ActiveStreamsPanel() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(selectStreamSessions);
  const liveSessions = useAppSelector(selectLiveSessions);
  const endedCount = sessions.length - liveSessions.length;

  if (sessions.length === 0) {
    return (
      <Card
        title="No streams yet"
        description="Create a stream or join with a code to get started"
      >
        <div className="flex flex-col items-center py-8 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-surface-800">
            <Radio className="size-7 text-slate-500" />
          </div>
          <p className="max-w-sm text-sm text-slate-400">
            Stream operations let incident commanders broadcast live field video to all
            stakeholders in real time.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/stream-ops/create">
              <Button>
                <Plus className="size-4" />
                Create stream
              </Button>
            </Link>
            <Link to="/stream-ops/join">
              <Button variant="secondary">
                <LogIn className="size-4" />
                Join with code
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Your streams"
      description={`${liveSessions.length} active · ${endedCount} ended`}
      action={
        endedCount > 0 ? (
          <Button variant="ghost" size="sm" onClick={() => dispatch(clearEndedSessions())}>
            <Trash2 className="size-3.5" />
            Clear ended
          </Button>
        ) : undefined
      }
    >
      <ul className="divide-y divide-border-subtle">
        {sessions.map((session) => (
          <li key={session.streamId} className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-white">{session.title}</p>
                {statusBadge(session.status)}
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{session.incidentTitle}</p>
              <StreamCodeDisplay code={session.streamCode} size="md" className="mt-2" />
            </div>
            <div className="flex gap-2">
              {session.status !== 'ended' && (
                <Link to={`/stream-ops/room/${session.streamId}`}>
                  <Button variant="secondary" size="sm">
                    Open room
                  </Button>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
