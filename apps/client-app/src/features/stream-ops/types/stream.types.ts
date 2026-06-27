/** Mirrors stream-service DTOs — keep in sync with backend contracts */

export interface CreateStreamRequest {
  incidentId: string;
  title: string;
  isManual: boolean;
  scheduledAt?: string | null;
}

export interface CreateStreamResponse {
  streamId: string;
  streamCode: string;
}

export interface JoinRoomRequest {
  streamCode: string;
}

export interface JoinRoomResponse {
  token: string;
  roomName: string;
  liveKitUrl: string;
}

export interface EndStreamRequest {
  streamId: string;
}

export type StreamStatus = 'active' | 'scheduled' | 'ended';

export interface ActiveStreamSession {
  streamId: string;
  streamCode: string;
  title: string;
  incidentId: string;
  incidentTitle: string;
  status: StreamStatus;
  isManual: boolean;
  scheduledAt?: string | null;
  createdAt: string;
  room?: JoinRoomResponse;
}

export interface StreamSessionMeta {
  streamId: string;
  streamCode: string;
  title: string;
  incidentId: string;
  incidentTitle: string;
  status: StreamStatus;
  isManual: boolean;
  scheduledAt?: string | null;
  createdAt: string;
}
