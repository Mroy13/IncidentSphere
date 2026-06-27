import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/shared/layout/AppShell';
import { StreamOpsPage } from '@/features/stream-ops/pages/StreamOpsPage';
import { CreateStreamPage } from '@/features/stream-ops/pages/CreateStreamPage';
import { JoinStreamPage } from '@/features/stream-ops/pages/JoinStreamPage';
import { ComingSoonPage } from '@/shared/pages/ComingSoonPage';
import { Spinner } from '@/shared/components/ui/Spinner';

interface AppRouterProps {
  themeMode: 'light' | 'dark';
  onToggleTheme: () => void;
}

const StreamRoomPage = lazy(() =>
  import('@/features/stream-ops/pages/StreamRoomPage').then((m) => ({
    default: m.StreamRoomPage,
  })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner label="Loading…" />
    </div>
  );
}

export function AppRouter({ themeMode, onToggleTheme }: AppRouterProps) {
  return (
    <Routes>
      <Route element={<AppShell themeMode={themeMode} onToggleTheme={onToggleTheme} />}>
        <Route index element={<Navigate to="/stream-ops" replace />} />
        <Route path="stream-ops" element={<StreamOpsPage />} />
        <Route path="stream-ops/create" element={<CreateStreamPage />} />
        <Route path="stream-ops/join" element={<JoinStreamPage />} />
        <Route
          path="stream-ops/room/:streamId"
          element={
            <Suspense fallback={<PageLoader />}>
              <StreamRoomPage />
            </Suspense>
          }
        />
        <Route path="incidents" element={<ComingSoonPage module="Incidents" />} />
        <Route path="teams" element={<ComingSoonPage module="Teams" />} />
        <Route path="analytics" element={<ComingSoonPage module="Analytics" />} />
        <Route path="*" element={<Navigate to="/stream-ops" replace />} />
      </Route>
    </Routes>
  );
}
