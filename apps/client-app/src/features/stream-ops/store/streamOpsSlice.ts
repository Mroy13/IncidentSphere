import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ActiveStreamSession,
  JoinRoomResponse,
  StreamSessionMeta,
} from '@/features/stream-ops/types/stream.types';
import type { RootState } from '@/app/store';

const STORAGE_KEY = 'incidentsphere.streamSessions';

function loadSessions(): ActiveStreamSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as ActiveStreamSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistSessions(sessions: ActiveStreamSession[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

interface StreamOpsState {
  sessions: ActiveStreamSession[];
  activeSessionId: string | null;
}

const initialState: StreamOpsState = {
  sessions: loadSessions(),
  activeSessionId: null,
};

const streamOpsSlice = createSlice({
  name: 'streamOps',
  initialState,
  reducers: {
    registerStreamSession(state, action: PayloadAction<StreamSessionMeta>) {
      const existing = state.sessions.find((s) => s.streamId === action.payload.streamId);
      if (existing) {
        Object.assign(existing, action.payload);
      } else {
        state.sessions.unshift({ ...action.payload });
      }
      persistSessions(state.sessions);
    },
    attachRoomCredentials(
      state,
      action: PayloadAction<{ streamId: string; room: JoinRoomResponse }>,
    ) {
      const session = state.sessions.find((s) => s.streamId === action.payload.streamId);
      if (session) {
        session.room = action.payload.room;
        session.status = 'active';
        state.activeSessionId = action.payload.streamId;
        persistSessions(state.sessions);
      }
    },
    markStreamEnded(state, action: PayloadAction<string>) {
      const session = state.sessions.find((s) => s.streamId === action.payload);
      if (session) {
        session.status = 'ended';
        session.room = undefined;
      }
      if (state.activeSessionId === action.payload) {
        state.activeSessionId = null;
      }
      persistSessions(state.sessions);
    },
    setActiveSession(state, action: PayloadAction<string | null>) {
      state.activeSessionId = action.payload;
    },
    clearEndedSessions(state) {
      state.sessions = state.sessions.filter((s) => s.status !== 'ended');
      persistSessions(state.sessions);
    },
  },
});

export const {
  registerStreamSession,
  attachRoomCredentials,
  markStreamEnded,
  setActiveSession,
  clearEndedSessions,
} = streamOpsSlice.actions;

export const streamOpsReducer = streamOpsSlice.reducer;

export const selectStreamSessions = (state: RootState) => state.streamOps.sessions;
export const selectActiveSession = (state: RootState) =>
  state.streamOps.sessions.find((s) => s.streamId === state.streamOps.activeSessionId) ?? null;
export const selectSessionById = (streamId: string) => (state: RootState) =>
  state.streamOps.sessions.find((s) => s.streamId === streamId) ?? null;
export const selectLiveSessions = (state: RootState) =>
  state.streamOps.sessions.filter((s) => s.status !== 'ended');
