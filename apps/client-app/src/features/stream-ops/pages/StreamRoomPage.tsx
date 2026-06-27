import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, PhoneOff, Radio } from 'lucide-react';
import { useJoinRoomMutation, useEndStreamMutation } from '@/features/stream-ops/api/streamApi';
import {
  attachRoomCredentials,
  markStreamEnded,
  selectSessionById,
} from '@/features/stream-ops/store/streamOpsSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Alert } from '@/shared/components/ui/Alert';
import { Badge } from '@/shared/components/ui/Badge';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { Spinner } from '@/shared/components/ui/Spinner';
import { JoinStreamForm } from '@/features/stream-ops/components/JoinStreamForm';
import { LiveKitRoomView } from '@/features/stream-ops/components/LiveKitRoomView';
import { StreamCodeDisplay } from '@/features/stream-ops/components/StreamCodeDisplay';

interface LocationState {
  streamCode?: string;
  justCreated?: boolean;
}

export function StreamRoomPage() {
  const { streamId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const session = useAppSelector(selectSessionById(streamId));
  const state = location.state as LocationState | null;

  const [joinRoom, { isLoading: isJoining }] = useJoinRoomMutation();
  const [endStream, { isLoading: isEnding }] = useEndStreamMutation();

  const [joinError, setJoinError] = useState<string | null>(null);
  const [liveKitError, setLiveKitError] = useState<string | null>(null);
  const [autoJoinAttempted, setAutoJoinAttempted] = useState(false);

  const streamCode = session?.streamCode ?? state?.streamCode ?? '';
  const room = session?.room;
  const isEnded = session?.status === 'ended';

  const handleJoin = useCallback(async () => {
    if (!streamCode) {
      return;
    }

    setJoinError(null);

    try {
      const credentials = await joinRoom({ streamCode }).unwrap();
      dispatch(attachRoomCredentials({ streamId, room: credentials }));
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'data' in err
          ? String((err as { data?: { message?: string } }).data?.message ?? 'Failed to join room')
          : 'Failed to join room';
      setJoinError(message);
    }
  }, [dispatch, joinRoom, streamCode, streamId]);

  useEffect(() => {
    if (room || isEnded || !streamCode || autoJoinAttempted) {
      return;
    }

    setAutoJoinAttempted(true);
    void handleJoin();
  }, [room, isEnded, streamCode, autoJoinAttempted, handleJoin]);

  const handleEndStream = async () => {
    try {
      await endStream({ streamId }).unwrap();
      dispatch(markStreamEnded(streamId));
      navigate('/stream-ops');
    } catch {
      setJoinError('Failed to end stream. It may already be closed.');
    }
  };

  if (!session && !state?.streamCode) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <Alert variant="warning" message="Stream session not found in local state." />
        <Link to="/stream-ops/join" className="mt-4 inline-block">
          <Button variant="secondary">Join with code</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/stream-ops">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-white">
                {session?.title ?? 'Live stream'}
              </h2>
              {isEnded ? (
                <Badge variant="ended">Ended</Badge>
              ) : room ? (
                <Badge variant="live">Connected</Badge>
              ) : (
                <Badge variant="scheduled">Joining…</Badge>
              )}
            </div>
            {session?.incidentTitle && (
              <p className="text-sm text-slate-500">{session.incidentTitle}</p>
            )}
          </div>
        </div>

        {!isEnded && (
          <Button variant="danger" isLoading={isEnding} onClick={handleEndStream}>
            <PhoneOff className="size-4" />
            End stream
          </Button>
        )}
      </div>

      {state?.justCreated && streamCode && (
        <Alert
          variant="success"
          title="Stream created"
          message="Share the code below with field teams so they can join the live room."
        />
      )}

      {joinError && <Alert variant="error" message={joinError} />}
      {liveKitError && <Alert variant="error" message={liveKitError} />}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          {isJoining && !room && (
            <div className="flex h-[min(70vh,640px)] items-center justify-center rounded-xl border border-border-subtle bg-surface-900">
              <Spinner label="Obtaining room credentials…" />
            </div>
          )}

          {room && !isEnded && (
            <LiveKitRoomView
              token={room.token}
              serverUrl={room.liveKitUrl}
              onError={(error) => setLiveKitError(error.message)}
              onDisconnected={() => setLiveKitError('Disconnected from live room')}
            />
          )}

          {isEnded && (
            <Card>
              <div className="flex flex-col items-center py-16 text-center">
                <Radio className="mb-4 size-10 text-slate-500" />
                <p className="text-slate-400">This stream has ended.</p>
                <Link to="/stream-ops/create" className="mt-4">
                  <Button>Create new stream</Button>
                </Link>
              </div>
            </Card>
          )}

          {!room && !isJoining && !isEnded && (
            <Card title="Manual join" description="Could not auto-connect — enter the stream code">
              <JoinStreamForm initialCode={streamCode} streamIdHint={streamId} />
            </Card>
          )}
        </div>

        <aside className="space-y-4">
          {streamCode && (
            <Card title="Stream code">
              <StreamCodeDisplay code={streamCode} size="lg" />
              <p className="mt-3 text-xs text-slate-500">
                Field teams use this code at Join Stream to enter the room.
              </p>
            </Card>
          )}

          {room && (
            <Card title="Room details">
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-500">Room name</dt>
                  <dd className="font-mono text-white">{room.roomName}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Media server</dt>
                  <dd className="break-all font-mono text-xs text-slate-300">
                    {room.liveKitUrl}
                  </dd>
                </div>
              </dl>
            </Card>
          )}

          <Card title="Command tips">
            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Keep the stream code restricted to authorized personnel.</li>
              <li>• End the stream when the incident phase closes.</li>
              <li>• Scheduled streams activate when the first participant joins.</li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
