import '@livekit/components-styles';
import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from '@livekit/components-react';
import { Alert } from '@/shared/components/ui/Alert';
import { Spinner } from '@/shared/components/ui/Spinner';
import { resolveLiveKitUrl } from '@/shared/config/env';

interface LiveKitRoomViewProps {
  token: string;
  serverUrl: string;
  onDisconnected?: () => void;
  onError?: (error: Error) => void;
}

export function LiveKitRoomView({
  token,
  serverUrl,
  onDisconnected,
  onError,
}: LiveKitRoomViewProps) {
  const resolvedUrl = resolveLiveKitUrl(serverUrl);

  return (
    <div className="relative h-[min(70vh,640px)] overflow-hidden rounded-xl border border-border-strong bg-surface-950">
      <LiveKitRoom
        token={token}
        serverUrl={resolvedUrl}
        connect
        audio
        video
        onDisconnected={onDisconnected}
        onError={onError}
        data-lk-theme="default"
        className="h-full"
      >
        <VideoConference />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </div>
  );
}

interface LiveKitConnectionStateProps {
  status: 'idle' | 'connecting' | 'connected' | 'error';
  errorMessage?: string;
}

export function LiveKitConnectionState({ status, errorMessage }: LiveKitConnectionStateProps) {
  if (status === 'connecting') {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border-subtle bg-surface-900">
        <Spinner label="Connecting to LiveKit room…" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <Alert
        variant="error"
        title="Connection failed"
        message={
          errorMessage ??
          'Could not connect to the media server. Verify LiveKit is running and VITE_LIVEKIT_URL is set.'
        }
      />
    );
  }

  return null;
}
