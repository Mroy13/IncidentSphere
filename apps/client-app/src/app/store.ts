import { configureStore } from '@reduxjs/toolkit';
import { streamApi } from '@/features/stream-ops/api/streamApi';
import { streamOpsReducer } from '@/features/stream-ops/store/streamOpsSlice';

export const store = configureStore({
  reducer: {
    streamOps: streamOpsReducer,
    [streamApi.reducerPath]: streamApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(streamApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
