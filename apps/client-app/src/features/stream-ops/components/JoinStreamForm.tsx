import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJoinRoomMutation } from '@/features/stream-ops/api/streamApi';
import {
  attachRoomCredentials,
  registerStreamSession,
  selectLiveSessions,
  selectSessionById,
} from '@/features/stream-ops/store/streamOpsSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Alert } from '@/shared/components/ui/Alert';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

interface JoinStreamFormProps {
  initialCode?: string;
  streamIdHint?: string;
}

export function JoinStreamForm({ initialCode = '', streamIdHint }: JoinStreamFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [joinRoom, { isLoading }] = useJoinRoomMutation();
  const liveSessions = useAppSelector(selectLiveSessions);

  const [streamCode, setStreamCode] = useState(initialCode);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const normalized = streamCode.replace(/\s/g, '').toUpperCase();
    if (!normalized) {
      setError('Enter a stream code');
      return;
    }

    try {
      const room = await joinRoom({ streamCode: normalized }).unwrap();

      const existingSession = liveSessions.find(
        (s) => s.streamCode.toUpperCase() === normalized,
      );

      const streamId = streamIdHint ?? existingSession?.streamId;

      if (streamId) {
        dispatch(attachRoomCredentials({ streamId, room }));
        navigate(`/stream-ops/room/${streamId}`);
        return;
      }

      // Joined via code only — register minimal session for room page
      const syntheticId = crypto.randomUUID();
      dispatch(
        registerStreamSession({
          streamId: syntheticId,
          streamCode: normalized,
          title: `Stream ${normalized}`,
          incidentId: '',
          incidentTitle: 'Unknown',
          status: 'active',
          isManual: true,
          createdAt: new Date().toISOString(),
        }),
      );
      dispatch(attachRoomCredentials({ streamId: syntheticId, room }));
      navigate(`/stream-ops/room/${syntheticId}`);
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'data' in err
          ? String((err as { data?: { message?: string } }).data?.message ?? 'Failed to join room')
          : 'Failed to join room. Check the code and try again.';
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <Alert variant="error" message={error} />}

      <Input
        label="Stream code"
        name="streamCode"
        placeholder="ABCD-1234"
        value={streamCode}
        onChange={(e) => setStreamCode(e.target.value.toUpperCase())}
        hint="Share this code with field teams to join the live feed"
        className="font-mono uppercase tracking-widest"
        autoComplete="off"
        spellCheck={false}
      />

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Join live room
      </Button>
    </form>
  );
}

export function useStreamSession(streamId: string) {
  return useAppSelector(selectSessionById(streamId));
}
